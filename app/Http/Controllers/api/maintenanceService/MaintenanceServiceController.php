<?php

namespace App\Http\Controllers\api\maintenanceService;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

use App\Models\Maintenance;

use App\Http\Resources\open\MaintenanceResource;

class MaintenanceServiceController extends Controller
{
    public function getMaintenanceLog() {
        return MaintenanceResource::collection(Maintenance::where("status" , "in queue")->get());
    }

    public function getMaintenanceLogAll() {
        return MaintenanceResource::collection(Maintenance::paginate(15));
    }

    public function setMaintenanceLogStatus(Maintenance $maintenance , Request $request) {
        $validated = $request->validate([
            "status" => ["required" , "string" , Rule::in(["in queue" , "pending" , "finished" , "paused" , "interrupted" , "cancled"])]
        ]);

        if(! $validated){
            return response()->json([
                "message" => "invalid status input"
            ] , 422);
        }

        $maintenance->status = $validated["status"];
        $maintenance->save();

        return response()->json([
            "message" => "successfully set maintenance log status"
        ] , 200);
    }
}
