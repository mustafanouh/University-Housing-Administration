<?php

namespace App\Services;

use App\Models\Student;

class UserCodeService
{
    public static function generateUserCode(int $length = 8): string
    {
        $characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        $code = '';

        do {
            $code = '';
            for ($i = 0; $i < $length; $i++) {
                $code.= $characters[rand(0, strlen($characters) - 1)];
            }
            // Check if unique
        } while (Student::where('identification_code', $code)->exists());

        return $code;
    }
}
