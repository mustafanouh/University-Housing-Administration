<?php

namespace App\Services;

use App\Models\Student;
use App\Models\HousingRequest;

class VerifyRelationService
{
    public static function oneRelation(array $student) {

        $records = [];

        foreach($student as $std){

            assert($std instanceof Student);
            $std->housingRequest2 ? $records[$std->id] = false : $records[$std->id] = true;

            $std->housingRequest3 ? $records[$std->id] = false : $records[$std->id] = true;

            $std->housingRequest4 ? $records[$std->id] = false : $records[$std->id] = true;
        }

        return $records;
    }

    public static function getRoommateRequest(Student $student) {
        $log = [];
        return
            ($student->housingRequest2 ? $student->housingRequest2 : null) ||
            ($student->housingRequest3 ? $student->housingRequest3 : null) ||
            ($student->housingRequest4 ? $student->housingRequest4 : null) ;
    }
}
