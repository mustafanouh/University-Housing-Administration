<?php

namespace App\Http\Requests\auth;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class registerRequest extends FormRequest
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
            "age" => ["required", "numeric"],
            "address" => ["present", "nullable"],
            "mobile" => ["present", "nullable", "string"],
            "email" => ["required", "email"],
            "password" => ["required", "min:8", "max:32"],
            "specialization" => ["required", "string"],
            "unit_id" => ["required", "numeric", Rule::exists("units", "id")]
        ];
    }
}
