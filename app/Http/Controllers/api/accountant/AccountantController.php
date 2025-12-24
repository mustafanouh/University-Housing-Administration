<?php

namespace App\Http\Controllers\api\accountant;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Treasury;
use App\Models\Fee;
use App\Models\MaintenanceRequest;
use App\Models\Maintenance;

use App\Http\Resources\accountant\MaintenanceRequestResource;
use App\Http\Resources\open\EmployeeResource;
use App\Http\Resources\open\TreasuryResource;
use App\Http\Resources\open\FeeResource;


class AccountantController extends Controller
{
    public function getFunds(Request $request) {
        return response()->json([
            "accountant" => EmployeeResource::make($request->user("employee")),
            "totalFund" => Treasury::where("income" , true)->sum("amount"),
            "log" => TreasuryResource::collection(Treasury::paginate(15))
        ]);
    }

    public function getPaidFees() {
        return FeeResource::collection(Fee::where("paid" , true)->paginate(15));
    }

    public function getPendingFees() {
        return FeeResource::collection(Fee::where("paid" , false)->paginate(15));
    }

    public function getAgreedMaintenanceRequest() {
        return MaintenanceRequestResource::collection(MaintenanceRequest::where("agreed" , true)->paginate(15));
    }

    public function fundMaintenanceRequest(MaintenanceRequest $mRequest , Request $request) {
        $totalFund = Treasury::where("income" , true)->sum("amount");

        if ($totalFund <= $mRequest->cost){
            return response()->json([
                "message" => "insufficient fund"
            ] , 422);
        }

        $validated = $request->validate([
            "description" => ["present" , "nullable" , "string" , "max:512"]
        ]);

        if(! $validated){
            return response()->json([
                "message" => "invalid description input"
            ] , 422);
        }

        $treasuryLog = Treasury::query()->create([
            "employee_id" => $request->user("employee")->id,
            "income" => false,
            "amount" => $mRequest->cost,
            "description" => $validated["description"] ?? $mRequest->description
        ]);

        $mRequest->funded = true;
        $mRequest->save();

        Maintenance::query()->create([
            "maintenance_request_id" => $mRequest->id,
            "treasury_id" => $treasuryLog->id,
            "description" => $mRequest->description,
        ]);

        return response()->json([
            "message" => "successfully inserted new treasury record and new maintenance record"
        ] , 200);
    }

    public function approveFeePayment(Fee $fee , Request $request) {

        $treasuryLog = Treasury::query()->create([
            "employee_id" => $request->user("employee")->id,
            "income" => true,
            "amount" => $fee->cost,
            "description" => $fee->type
        ]);

        $fee->paid = true;
        $fee->treasury_id = $treasuryLog->id;
        $fee->save();

        return response()->json([
            "message" => "successfully approved fee payment",
            "feeInfo" => FeeResource::make($fee)
        ] , 200);
    }

}
