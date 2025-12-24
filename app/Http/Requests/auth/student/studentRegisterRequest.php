<?php

namespace App\Http\Requests\auth\student;

use Illuminate\Foundation\Http\FormRequest;

class StudentRegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "first_name" => ["required", "string", "min:3", "max:32"],
            "last_name" => ["required", "string", "min:3", "max:32"],
            "country" => ["required" , "string"],
            "mobile" => ["present", "nullable", "string"],
            "email" => ["required", "email"],
            "password" => ["required", "min:8", "max:32"],
            "specialization" => ["required" , "string"],
            "year_of_study" => ["required" , "numeric"],
        ];
    }
}
