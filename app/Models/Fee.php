<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use App\Services\PaymentCodeService;

class Fee extends Model
{
    protected $fillable = [
        "student_id",
        "type",
        "cost"
    ];

    protected  $hidden = [];

    protected static function boot() {
        parent::boot();
        static::creating( function ($fee) {
            if(empty($fee->process_number)){
                $fee->process_number = PaymentCodeService::generateProcessNumber(8);
            }
        } );
    }

    public function student() {
        return $this->belongsTo(Student::class , "student_id" , "id");
    }

    public function treasury() {
        return $this->belongsTo(Treasury::class , "treasury_id" , "id");
    }
}
