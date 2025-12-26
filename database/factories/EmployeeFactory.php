<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Employee>
 */
class EmployeeFactory extends Factory
{
    protected static $password = null;

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
            "password" => bcrypt('password'),
            "specialization" => fake()->jobTitle(),
            "leave_date" => null,
        ];
    }
}

