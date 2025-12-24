<?php

namespace App\Http\Controllers\api\auth;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

use Illuminate\Http\Request;
use App\Models\Employee;

use App\Http\Requests\auth\registerRequest;
use App\Http\Requests\auth\loginRequest;

use App\Http\Resources\open\EmployeeResource;


class authController extends Controller
{
    public function register(registerRequest $request){

        $newEmployee = Employee::query()->create($request->validated());
        $token = $newEmployee->createToken("API")->plainTextToken;

        return response()->json([
            "employee" => EmployeeResource::make($newEmployee),
            "token" => $token
        ]);
    }

    public function login(loginRequest $request){

        $credentials = $request->only("email" , "password");

        $employee = Auth::guard("employee")->getProvider()->retrieveByCredentials(["email" => $credentials["email"]]);
        if(! $employee || ! Hash::check($credentials["password"] , $employee->password)){
            return response()->json([
                "message" => "invalid credentials"
            ] , 422);
        }

        $token = $employee->createToken("API")->plainTextToken;

        return response()->json([
            "token" => $token,
            "employee" => EmployeeResource::make($employee),
        ]);
    }

    public function logout(Request $request){
        $employee = $request->user("employee");

        $employee->tokens()->delete();

        return response()->json([
            "message" => "logout successful",
        ]);
    }

}
