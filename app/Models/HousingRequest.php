<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HousingRequest extends Model
{

    protected $table = "housing_requests";
    protected $fillable = [
        "brothers",
        "student_1_id",
        "student_2_id",
        "student_3_id",
        "student_4_id"
    ];

    protected $hidden = [];

    public function student1() {
        return $this->belongsTo(Student::class , "student_1_id" , "id");
    }
    public function student2() {
        return $this->belongsTo(Student::class , "student_2_id" , "id");
    }
    public function student3() {
        return $this->belongsTo(Student::class , "student_3_id" , "id");
    }
    public function student4() {
        return $this->belongsTo(Student::class , "student_4_id" , "id");
    }


}
