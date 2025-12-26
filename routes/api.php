<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\api\auth\authController;
use App\Http\Controllers\api\auth\studentAuthController;

// Open Controller Classes ::
use App\Http\Controllers\api\open\UnitController;
use App\Http\Controllers\api\open\RoomController;
use App\Http\Controllers\api\open\StorageController;

// Admin Controller Classes ::
use App\Http\Controllers\api\admin\EmployeeManagementController;
use App\Http\Controllers\api\admin\MaintenanceManagementController;
use App\Http\Controllers\api\admin\UnitManagementController;
use App\Http\Controllers\api\admin\MiscController;
use App\Http\Controllers\api\admin\SettingsController;

// Student Controller Classes ::
use App\Http\Controllers\api\student\StudentController;


// Mentor Controller Classes ::
use App\Http\Controllers\api\mentor\MentorController;

// Storage Keeper Controller Classes ::
use App\Http\Controllers\api\storageKeeper\StorageKeeperController;

// Accountant Controller Classes ""
use App\Http\Controllers\api\accountant\AccountantController;

// Maintenance Service Controller Classes ::
use App\Http\Controllers\api\maintenanceService\MaintenanceServiceController;

// ITOffice Controller Classes ::








Route::group([], function () {
    Route::post("register", [authController::class, "register"]);
    Route::post("login", [authController::class, "login"]);
});

Route::prefix("std")->group(function () {
    Route::post("register", [studentAuthController::class, "register"]);
    Route::post("login", [studentAuthController::class, "login"]);
});



// Employee Auth Routes ::
Route::group(["middleware" => "auth:employee"], function () {

    // Admin Routes ::
    Route::group(["middleware" => "role:admin", "prefix" => "admin"], function () {
        Route::group(["prefix" => "management"], function () {
            Route::get("/employees", [EmployeeManagementController::class, "getEmployees"]);
            Route::get("/roles", [EmployeeManagementController::class, "getRoles"]);
            Route::post("/{employee}", [EmployeeManagementController::class, "assignRole"]);
        });
        Route::group(["prefix" => "maintenance"], function () {
            Route::get("/all", [MaintenanceManagementController::class, "getMaintenanceRequests"]);
            Route::get("/progress", [MaintenanceManagementController::class, "getMaintenanceProgress"]);
            Route::post("/{mRequest}/agree", [MaintenanceManagementController::class, "agreeMaintenanceRequest"]);
        });
        Route::group(["prefix" => "units"], function () {
            Route::get("/all", [UnitController::class, "getUnitData"]);
            Route::get("/{unit}/storage", [UnitController::class, "getUnitStorage"]);
            Route::get("/{unit}/rooms", [UnitController::class, "getUnitRooms"]);

            Route::post("/{unit}/roomcap", [UnitManagementController::class, "setUnitRoomCap"]);
            Route::post("/{unit}/gender", [UnitManagementController::class, "setUnitGender"]);
        });
    });

    // Mentor Routes ::
    Route::group(["middleware" => "role:mentor", "prefix" => "mentor"], function () {
        Route::get("/units", [UnitController::class, "getUnitData"]);
        Route::get("/units/{unit}/storage", [UnitController::class, "getUnitStorage"]);
        Route::get("/units/{unit}/rooms", [UnitController::class, "getUnitRooms"]);

        Route::post("/rooms/{room}" , [MentorController::class , "setRoomState"]);
        Route::get("/rooms/{room}/students" , [RoomController::class , "getRoomStudents"]);

        Route::post("/maintenance" , [MentorController::class , "sendMaintenanceRequest"]);
        Route::post("/fees" , [MentorController::class , "sendFeeRequest"]);

    });

    // Storage Keeper Routes ::
    Route::group(["middleware" => "role:storageKeeper" , "prefix" => "storage"] , function () {
        Route::get("/items" , [StorageController::class , "getUnitStorageData"]);
        Route::post("/new" , [StorageKeeperController::class , "setNewStorageItem"]);
        Route::post("/update" , [StorageKeeperController::class , "setStorageItemValue"]);
    });

    // Accountant Routes ::
    Route::group(["middleware" => "role:accountant" , "prefix" => "accountant"] , function () {
        Route::get("/fundlog" , [AccountantController::class , "getFunds"]);
        Route::get("/paidfees" , [AccountantController::class , "getPaidFees"]);
        Route::get("/pendingfees" , [AccountantController::class , "getPendingFees"]);
        Route::get("/maintenance" , [AccountantController::class , "getAgreedMaintenanceRequest"]);

        Route::post("/maintenance/{mRequest}" , [AccountantController::class , "fundMaintenanceRequest"]);
        Route::post("/payments/{fee}" , [AccountantController::class , "approveFeePayment"]);
    });

    // Maintenance Routes ::
    Route::group(["middleware" => "role:maintenanceService" , "prefix" => "maintservice"] , function () {
        Route::get("/all" , [MaintenanceServiceController::class , "getMaintenanceLogAll"]);
        Route::get("/queue" , [MaintenanceServiceController::class , "getMaintenanceLog"]);
        Route::post("/{maintenance}" , [MaintenanceServiceController::class , "setMaintenanceLogStatus"]);
    });

    // ITOffice Routes ::
    Route::group(["middleware" => "role:itOffice" , "prefix" => "itoffice"] , function (){

    });


    Route::post("logout", [authController::class, "logout"]);
});


// Student Auth Routes ::
Route::group(["prefix" => "std", "middleware" => "auth:student"], function () {

    Route::get("/check" , [StudentController::class , "housing"]);
    Route::get("/roommate" , [StudentController::class , "getRoommateRelation"]);
    Route::post("/roommate/cancel/{housingRequest}" , [StudentController::class , "cancleRoommateRelation"]);
    Route::get("/fees" , [StudentController::class , "getFeeLog"]);
    Route::post("/request" , [StudentController::class , "sendHousingRequest"]);

    Route::post("logout", [studentAuthController::class, "logout"]);
});
