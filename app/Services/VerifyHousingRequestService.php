<?php

namespace App\Services;

use App\Models\Student;
use App\Models\HousingRequest;

class VerifyHousingRequestService
{
    public static function inQueue(array $student) {

        $records = [];

        foreach($student as $std){

            assert($std instanceof Student);
            $std->housingRequest1 ? $records[$std->id] = true : $records[$std->id] = false;

        }

        return $records;
    }
}
