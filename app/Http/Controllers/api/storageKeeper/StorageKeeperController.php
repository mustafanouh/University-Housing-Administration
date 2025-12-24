<?php

namespace App\Http\Controllers\api\storageKeeper;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

use App\Models\Unit;
use App\Models\Storage;

use App\Http\Resources\open\StorageResource;

class StorageKeeperController extends Controller
{
    public function setNewStorageItem(Request $request) {

        $validated = $request->validate([
            "itemName" => ["required" , "string" , "min:3"],
            "quantity" => ["required" , "numeric" , "min:1"]
        ]);

        if(! $validated){
            return response()->json([
                "message" => "invalid item data input"
            ] , 422);
        }

        $unit = $request->user("employee")->unit_id;
        $item = Storage::create([
            "item_name" => $validated["itemName"],
            "quantity" => $validated["quantity"]
        ]);

        return response()->json([
            "message" => "successfully inserted new item",
            "itemInfo" => StorageResource::make($item)
        ] , 200);
    }

    public function setStorageItemValue(Request $request) {
        $validated = $request->validate([
            "itemId" => ["required" , "numeric" , Rule::exists("storage" , "id")],
            "value" => ["required" , "numeric" , "min:1"]
        ]);

        if(! $validated){
            return response()->json([
                "message" => "invalid item id or value"
            ] , 422);
        }

        $item = $request->user("employee")->load("unit.storage")->unit->flatMap->storage->where("id" , $validated["itemId"])->first();
        $item->quantity = $validated["value"];
        $item->save();

        return response()->json([
            "message" => "successfuly set item value"
        ] , 200);
    }
}
