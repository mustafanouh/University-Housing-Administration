<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\api\auth\authController;
use App\Http\Controllers\api\auth\studentAuthController;


Route::group([] ,function () {
    Route::post("register", [authController::class, "register"]);
    Route::post("login", [authController::class, "login"]);
});

Route::prefix("std")->group(function () {
    Route::post("register" , [studentAuthController::class , "register"]);
    Route::post("login" , [studentAuthController::class , "login"]);
});




Route::group(["middleware" => "auth:employee"] , function () {

// Admin Routes ::
    Route::group(["auth:admin"] , function () {

    });

// Mentor Routes ::
    Route::group(["auth:mentor"] , function () {

    });

    Route::post("logout", [authController::class, "logout"]);

});



Route::group(["prefix" => "std" , "middleware" => "auth:student"] , function() {

    Route::post("logout" , [studentAuthController::class , "logout"]);

});
