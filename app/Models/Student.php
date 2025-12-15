<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Factories\HasFactory;

use App\Services\UserCodeService;

class Student extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles;

    protected $fillable = [
        "first_name",
        "last_name",
        "country",
        "mobile",
        "email",
        "password",
        "specialization",
        "year_of_study"
    ];

    protected $hidden = [
        "password"
    ];

    public function setPasswordAttribute ($value){
        if (! empty($value)){
            $this->attributes["password"] = Hash::make($value);
        }
    }

    protected static function boot() {
        parent::boot();
        static::creating( function ($student) {
            if(empty($student->identification_code)){
                $student->identification_code = UserCodeService::generateUserCode(12);
            }
        } );
    }
}
