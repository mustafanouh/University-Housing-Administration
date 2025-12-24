<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MaintenanceRequest extends Model
{
    protected $fillable = [
        "room_id",
        "cost",
        "description"
    ];

    protected $hidden = [

    ];

    public function getUnitNameAttribute () {
        return Unit::where("id" , $this->unit_id)->value("name") ?? null;
    }
    public function getRoomNumberAttribute () {
        return Room::where("id" , $this->room_id)->value("room_number") ?? null;
    }

    public function maintenance() {
        return $this->hasOne(Maintenance::class , "maintenance_request_id" , "id");
    }

}
