<?php

namespace App\Http\Controllers\api\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;



use App\Models\MaintenanceRequest;
use App\Models\Maintenance;

use App\Http\Resources\admin\MaintenanceRequestResource;

// use App\Http\Resources\admin\MaintenanceProgressResource;
use App\Http\Resources\open\MaintenanceResource;

class MaintenanceManagementController extends Controller
{
    public function getMaintenanceRequests() {
        return MaintenanceRequestResource::collection(MaintenanceRequest::all());
    }

    public function getMaintenanceProgress() {
        return MaintenanceResource::collection(Maintenance::all());
    }

    public function agreeMaintenanceRequest(MaintenanceRequest $mRequest , Request $request) {
        if(! $mRequest->agreed){
            $mRequest->update(["agreed" => true]);
            return response()->json([
                "message" => "maintenance request agreed successfully"
            ] , 200);
        }

        return response()->json([
            "message" => "maintenance request already agreed"
        ] , 200);

    }
}
