<?php

namespace App\Http\Requests\mentor;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class MaintenanceRequestRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "roomId" => ["required" , Rule::exists("rooms" , "id")->where( "unit_id" , $this->user("employee")->unit_id)],
            "cost" => ["required" , "numeric" , "min:1"],
            "description" => ["nullable" , "string" , "max:512"]
        ];
    }
}
