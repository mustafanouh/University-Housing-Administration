<?php

namespace App\Http\Resources\open;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TreasuryResource extends JsonResource
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
            "transaction" => $this->income == true ? "income" : "spendings",
            "amount" => $this->amount,
            "description" => $this->description,
            "createdAt" => $this->created_at
        ];
    }
}
