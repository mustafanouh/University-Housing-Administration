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


class StudentController extends Controller
{

    public function housing(Request $request)
    {
        $exists = $request->user("student")->housingRequest1()->housingRequest1;
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
        if($housingRequest->student_2_id == $student){
            $housingRequest->student_2_id = null;
            $housingRequest->save();
        } else if($housingRequest->student_3_id == $student){
            $housingRequest->student_2_id = null;
            $housingRequest->save();
        } else if($housingRequest->student_4_id == $student){
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

    public function sendHousingRequest(HousingRequestRequest $hRequest , Request $request) {
        $exists = $request->user("student")->housingRequest1()->housingRequest1;
        if ($exists) {
            return response()->json(["message" => "student already have housing request in queue"], 422);
        }

        if(in_array($request->validated("student1") , [$request->validated("student2") , $request->validated("student3") , $request->validated("student4")])){
            return response()->json([
                "message" => "student is referenced as a roommate in the same request"
            ] , 422);
        }

        $validated = $hRequest->validated();
        $students = [];
        foreach ($validated["students"] as $std)
            $students[] = Student::find($std , "identification_code");

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
                "info" => collect($oneRelationArray)->map(function ($valid , $student){
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
            "brothers" => $validated["brothers"],
            "student_1_id" => $request->user("student")->id,
            "student_2_id" => $validated["student2"],
            "student_3_id" => $validated["student3"],
            "student_4_id" => $validated["student4"]
        ]);

        return response()->json([
            "message" => "successfully signed housing request"
        ] , 200);


    }
}
