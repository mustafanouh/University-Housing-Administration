<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Employee extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles;

    protected $fillable = [
        "first_name",
        "last_name",
        "age",
        "address",
        "mobile",
        "email",
        "password",
        "specialization",
        "unit_id",
    ];

    protected $hidden = [
        "password",
        "address"
    ];

    protected function casts(): array
    {
        return [];
    }

    public function setPasswordAttribute ($value){
        if (! empty($value)){
            $this->attributes["password"] = Hash::make($value);
        }
    }

    public function unit() {
        return $this->belongsTo(Unit::class , "unit_id" , "id");
    }

}
