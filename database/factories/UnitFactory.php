<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Unit>
 */
class UnitFactory extends Factory
{
    protected static $unitCount = 0;
    protected static $specs = ["spec1" , "spec1" , "spec2" , "spec2" , "spec3" , "spec3" , "spec4" , "spec4" , "spec5" , "spec5"];
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        static::$unitCount++;
        return [
            "name" => "Unit " . (string)static::$unitCount,
            "gender" => fake()->randomElement(["males" , "females"]),
            "room_cap" => fake()->randomElement([2 , 3 , 4]),
            "room_count" => fake()->numberBetween(50 , 200),
            "specialization" => array_pop(static::$specs),
        ];
    }
}
