<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

use Spatie\Permission\Models\Role;

class Employee extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles;

    protected $table = "employees";
    protected $guard_name = "employee";

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

    public function setPasswordAttribute ($value){
        if (! empty($value)){
            $this->attributes["password"] = Hash::make($value);
        }
    }

    public function unit() {
        return $this->belongsTo(Unit::class , "unit_id" , "id");
    }

    public function treasury() {
        return $this->hasMany(Treasury::class, "employee_id" , "id");
    }

    // public function role() {
    //     return $this->hasMany(Role::class);
    // }

}
