<?php

namespace App\Http\Controllers\api\auth;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

use Illuminate\Http\Request;
use App\Models\Student;

use App\Http\Requests\auth\student\studentRegisterRequest;
use App\Http\Requests\auth\student\studentLoginRequest;
use App\Http\Requests\studentLogoutRequest;

use App\Http\Resources\student\StudentResource;


class studentAuthController extends Controller
{
    public function register(studentRegisterRequest $request){

        $newStudent = Student::query()->create($request->validated());
        $token = $newStudent->createToken("SAPI")->plainTextToken;

        return response()->json([
            "token" => $token,
            "newStudent" => StudentResource::make($newStudent)
        ]);
    }

    public function login(studentLoginRequest $request){

        $credentials = $request->only("email" , "password");

        $student = Auth::guard("student")->getProvider()->retrieveByCredentials(["email" => $credentials["email"]]);
        if(! $student || ! Hash::check($credentials["password"] , $student->password)){
            return response()->json([
                "message" => "invalid credentials"
            ] , 422);
        }

        $token = $student->createToken("API")->plainTextToken;

        return response()->json([
            "token" => $token,
            "student" => StudentResource::make($student)
        ]);
    }

    public function logout(Request $request){
        $student = $request->user("student");

        $student->tokens()->delete();

        return response()->json([
            "message" => "logout successful",
            "student" => $student
        ]);
    }
}
