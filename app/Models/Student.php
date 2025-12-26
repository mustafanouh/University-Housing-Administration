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

    protected $guard_name = "student";

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
            if(empty($student->data_complete)){
                $student->data_complete = false;
            }
            if(empty($student->eligible)){
                $student->eligible = false;
            }
            if(empty($student->house_in)){
                $student->house_id = false;
            }
        } );
    }

    public function room() {
        return $this->belongsToMany(Room::class , "assignment" , "student_id" , "room_id");
    }

    public function housingRequest1() {
        return $this->hasOne(HousingRequest::class , "student_1_id");
    }
    public function housingRequest2() {
        return $this->hasOne(HousingRequest::class , "student_2_id");
    }
    public function housingRequest3() {
        return $this->hasOne(HousingRequest::class , "student_3_id");
    }
    public function housingRequest4() {
        return $this->hasOne(HousingRequest::class , "student_4_id");
    }

    public function fees() {
        return $this->hasMany(Fee::class , "student_id" , "id");
    }

}
