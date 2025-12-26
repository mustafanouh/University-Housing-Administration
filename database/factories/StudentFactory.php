<?php

namespace Database\Factories;

use App\Services\UserCodeService;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Student>
 */
class StudentFactory extends Factory
{
    protected static $password = null;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // if(is_null(static::$password)){
        //     static::$password = Hash::make("password");
        // }

        return [
            "first_name" => fake()->firstName(),
            "last_name" => fake()->lastName(),
            "age" => fake()->numberBetween(18 , 25),
            "country" => fake()->country(),
            "mobile" => "09" . fake()->unique()->randomNumber(8),
            "email" => fake()->unique()->email(),
            // "password" => static::$password,
            "password" => bcrypt('password'),
            "identification_code" => UserCodeService::generateUserCode(12),
            "specialization" => fake()->randomElement(["spec1" , "spec2" , "spec3" , "spec4" , "spec5"]),
            "year_of_study" => fake()->numberBetween(1 , 6),
        ];
    }
}
