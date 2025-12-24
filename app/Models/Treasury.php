<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Treasury extends Model
{
    protected $fillable = [
        "employee_id",
        "income",
        "amount",
        "description"
    ];

    protected $hidden = [];

    public function employee() {
        return $this->belongsTo(Employee::class , "employee_id" , "id");
    }

    public function fee() {
        return $this->hasOne(Fee::class , "treasury_id" , "id");
    }

    public function maintenance() {
        return $this->hasOne(Maintenance::class , "treasury_id" , "id");
    }
}
