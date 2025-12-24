<?php

namespace App\Http\Requests\student;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class HousingRequestRequest extends FormRequest
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
            "brothers" => ["required" , "boolean" , Rule::in([true , false])],
            "student1" => ["required" , Rule::exists("students" ,"id")],
            "student2" => ["nullable" , Rule::exists("students" ,"id")],
            "student3" => ["nullable" , Rule::exists("students" ,"id")],
            "student4" => ["nullable" , Rule::exists("students" ,"id")],

        ];
    }
}
