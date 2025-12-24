<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Maintenance extends Model
{
    protected $fillable = [
        "maintenance_request_id",
        "treasury_id",
        "description",
        "notes",
        "total_cost"
    ];

    protected $hidden = [];

    public function maintenanceRequest() {
        return $this->belongsTo(MaintenanceRequest::class , "maintenance_request_id" , "id");
    }

    public function treasury() {
        return $this->belongsTo(Treasury::class , "treasury_id" , "id");
    }
}
