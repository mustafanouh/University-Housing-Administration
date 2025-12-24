<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HousingRequest extends Model
{
    protected $fillable = [];

    protected $hidden = [];

    public function student1() {
        return $this->belongsTo("students" , "student_1_id" , "id");
    }
    public function student2() {
        return $this->belongsTo("students" , "student_2_id" , "id");
    }
    public function student3() {
        return $this->belongsTo("students" , "student_3_id" , "id");
    }
    public function student4() {
        return $this->belongsTo("students" , "student_4_id" , "id");
    }


}
