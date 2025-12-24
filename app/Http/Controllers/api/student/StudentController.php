<?php

namespace App\Http\Controllers\api\student;

use App\Http\Controllers\Controller;
use App\Http\Requests\student\HousingRequestRequest;
use App\Models\HousingRequest;
use App\Models\Student;
use Illuminate\Http\Request;


use App\Services\VerifyRelationService;
use App\Services\VerifyHousingRequestService;


class StudentController extends Controller
{

    public function housing(Request $request)
    {
        $exists = $request->user("student")->housingRequest1;
        if (! $exists) {
            return response()->json(["message" => "clear to send housing request"], 404);
        }

        return response()->json([
            "messsage" => "student already has housing request in queue",
            "housingRequest" => $exists
        ], 200);
    }

    public function getFeeLog(Request $request) {
        return $request->user("student")->fee()->where("paid" , false)->latest()->paginate(15);
    }

    public function getRoommateRelation(Request $request) {
        return VerifyRelationService::getRoommateRequest($request->user("student"));
    }

    public function cancleRoommateRelation(HousingRequest $housingRequest , Request $request) {
        $student = $request->user("student")->id;
        if($housingRequest->student_2_id == $student){
            $housingRequest->student_2_id = null;
            $housingRequest->save();
        } else if($housingRequest->student_2_id == $student){
            $housingRequest->student_2_id = null;
            $housingRequest->save();
        } else {
            $housingRequest->student_3_id = null;
            $housingRequest->save();
        }
    }

    public function sendHousingRequest(HousingRequestRequest $hRequest , Request $request) {
        $exists = $request->user("student")->housingRequest1;
        if (! $exists) {
            return response()->json(["message" => "clear to send housing request"], 404);
        }

        $validated = $hRequest->validated();
        $students = [];
        foreach ($validated["students"] as $std)
            $students[] = Student::find($std);

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
                        return $ID . " is currently a roommate with other students";
                    }
                }),
                "array" => $array
            ]);
        }

        HousingRequest::create($validated);

        return response()->json([
            "message" => "successfully signed housing request"
        ] , 200);


    }
}
