<?php

namespace App\Http\Controllers\api\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Unit;



class UnitManagementController extends Controller
{
    public function setUnitRoomCap(Unit $unit , Request $request) {
        $validated = $request->validate([
            "roomCap" => ["required" , "numeric" , "min:1"]
        ]);

        if(! $validated){
            return response()->json([
                "message" => "invalid room capacity input"
            ] , 422);
        }

        $unit->room_cap = $validated["roomCap"];
        $unit->save();

        return response()->json([
            "message" => "successfully updated room cap"
        ] , 200);
    }

    public function setUnitGender(Unit $unit , Request $request) {
        $validated = $request->validate([
            "gender" => ["required" , "string" , "in:males,females"]
        ]);

        if(! $validated){
            return response()->json([
                "message" => "invalid gender input"
            ] , 422);
        }

        $unit->gender = $validated["gender"];
        $unit->save();

        return response()->json([
            "message" => "Successfully set unit gender"
        ] , 200);
    }
}
