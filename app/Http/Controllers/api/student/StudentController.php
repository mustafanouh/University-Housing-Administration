<?php

namespace App\Http\Controllers\api\student;

use App\Http\Controllers\Controller;
use App\Http\Requests\student\HousingRequestRequest;
use App\Http\Resources\open\FeeResource;
use App\Models\HousingRequest;
use App\Models\Student;
use Illuminate\Http\Request;


use App\Services\VerifyRelationService;
use App\Services\VerifyHousingRequestService;

use App\Http\Resources\open\HousingRequestResource;
use Illuminate\Queue\Middleware\Skip;

class StudentController extends Controller
{

    public function housing(Request $request)
    {
        $exists = $request->user("student")->load("housingRequest1")->housingRequest1;
        if (! $exists) {
            return response()->json(["message" => "clear to send housing request"], 404);
        }

        return response()->json([
            "messsage" => "student already has housing request in queue",
            "housingRequest" => HousingRequestResource::make($exists)
        ], 200);
    }

    public function getFeeLog(Request $request) {
        $fees = $request->user("student")->load(["fees" => function($q) {$q->where("paid" , false);}])->fees;
        return FeeResource::collection($fees);
    }

    public function getRoommateRelation(Request $request) {
        return HousingRequestResource::make(VerifyRelationService::getRoommateRequest($request->user("student")));
    }

    public function cancleRoommateRelation(HousingRequest $housingRequest , Request $request) {
        $student = $request->user("student")->id;
        if(Student::find($housingRequest->student2 , "identification_code") == $student){
            $housingRequest->student_2_id = null;
            $housingRequest->save();
        } else if(Student::find($housingRequest->student3 , "identification_code") == $student){
            $housingRequest->student_2_id = null;
            $housingRequest->save();
        } else if(Student::find($housingRequest->student4 , "identification_code") == $student){
            $housingRequest->student_3_id = null;
            $housingRequest->save();
        } else{
            return response()->json([
                "message" => "student is not a roommate with anyone, no reference found"
            ] , 404);
        }

        return response()->json([
            "message" => "successfully cancled roommate relation"
        ] ,200);
    }

    public function sendHousingRequest(HousingRequestRequest $hRequest) {
        $exists = $hRequest->user("student")->load("housingRequest1")->housingRequest1;
        if ($exists) {
            return response()->json(["message" => "student already have housing request in queue"], 422);
        }

        if(in_array($hRequest->user("student")->identification_code , [$hRequest->validated("student2") , $hRequest->validated("student3") , $hRequest->validated("student4")   ])){
            return response()->json([
                "message" => "student is referenced as a roommate in the same request"
            ] , 422);
        }

        $validated = $hRequest->validated();
        $studentsData = [];
        $students = [];

        $studentsData[] = $validated["student2"] ?? null;
        $studentsData[] = $validated["student3"] ?? null;
        $studentsData[] = $validated["student4"] ?? null;
        foreach ($studentsData as $std){
            if($std){
                $students[] = Student::where("identification_code" , $std)->first();
            }
        }


        // $existsArray = VerifyHousingRequestService::inQueue($students);

        // if(in_array(false , $existsArray)){
        //     $array = [];
        //     return response()->json([
        //         "message" => "invaid student reference",
        //         "info" => collect($existsArray)->map(function($exists , $student) {
        //             if(! $exists){
        //                 $ID = Student::find($student)->identification;
        //                 $array[] = $ID;
        //                 return $ID . " has not made a housing request yet";
        //             }
        //         }),
        //         "array" => $array
        //     ] , 404);
        // }

        $oneRelationArray = VerifyRelationService::oneRelation($students);

        if(in_array(false , $oneRelationArray)){
            $array = [];
            return response()->json([
                "message" => "duplicate roommate reference",
                "info" => collect($oneRelationArray)->map(function ($valid , $student) use (&$array){
                    if(! $valid){
                        $ID = Student::find($student)->identification;
                        $array[] = $ID;
                        return (string)$ID . " is currently a roommate with other students";
                    }
                }),
                "array" => $array
            ]);
        }

        HousingRequest::create([
            "brothers" => $validated["brothers"] ?? false,
            "student_1_id" => $hRequest->user("student")->id,
            "student_2_id" => $students[0]->id ?? null,
            "student_3_id" => $students[1]->id ?? null,
            "student_4_id" => $students[2]->id ?? null
        ]);

        return response()->json([
            "message" => "successfully signed housing request"
        ] , 200);

    }
}
