<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Storage extends Model
{
    protected $fillable = [
        "unit_id",
        "item_name",
        "quantity"
    ];

    protected $hidden = [

    ];

    public function unit() {
        return $this->belongsTo(Unit::class , "unit_id" , "id");
    }
}
