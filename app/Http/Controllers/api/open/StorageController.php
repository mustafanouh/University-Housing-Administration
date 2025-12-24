<?php

namespace App\Http\Controllers\api\open;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

use App\Models\Unit;
use App\Models\Storage;

use App\Http\Resources\open\StorageResource;

class StorageController extends Controller
{
    public function getUnitStorageData(Request $request) {
        $storage = $request->user("employee")->load("unit.storage")->unit->flatMap->storage;
        return StorageResource::collection($storage);
    }

    public function getUnitStorageDataGlobal(Request $request) {
        $validated = $request->validate([
            "unitId" => ["required" , "numeric" , Rule::exists("units" , "id")]
        ]);

        if(! $validated){
            return response()->json([
                "message" => "unit not found"
            ] , 404);
        }

        return StorageResource::collection(Storage::where("unit_id" , $validated["unitId"]));
    }
}
