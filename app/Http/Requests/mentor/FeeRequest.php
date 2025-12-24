<?php

namespace App\Http\Requests\mentor;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class FeeRequest extends FormRequest
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
            "studentId" => ["nullable" , Rule::exists("students" , "id")],
            "type" => ["required" , Rule::in(["registeration" , "punishment"])],
            "cost" => ["required" , "numeric" , "min:1"],
        ];
    }
}
