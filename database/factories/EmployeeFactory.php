<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Employee>
 */
class EmployeeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "first_name" => fake()->firstName(),
            "last_name" => fake()->lastName(),
            "age" => fake()->numberBetween(21 , 50),
            "address" => fake()->address(),
            "mobile" => "09" . fake()->unique()->randomNumber(8),
            "email" => fake()->unique()->email(),
            "password" => Hash::make("password"),
            "specialization" => fake()->jobTitle(),
            "leave_date" => null,
            // "unit_id" =>
        ];
    }
}
