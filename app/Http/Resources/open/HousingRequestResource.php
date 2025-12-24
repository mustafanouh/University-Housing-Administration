<?php

namespace App\Http\Resources\open;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

use App\Models\Student;

class HousingRequestResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // return parent::toArray($request);
        return [
            "createdAt" => $this->created_at,
            "signedBy" => StudentTinyResource::make(Student::find($this->student_1_id)),
            "roommate1" => StudentTinyResource::make(Student::find($this->student_2_id)),
            "roommate2" => StudentTinyResource::make(Student::find($this->student_3_id)),
            "roommate3" => StudentTinyResource::make(Student::find($this->student_4_id))
        ];
    }
}
