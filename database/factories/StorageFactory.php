<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Storage>
 */
class StorageFactory extends Factory
{
    static $itemCount = 0;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        static::$itemCount++;
        return [
            // "unit_id" =>
            "item_name" => "item" . (string)static::$itemCount,
            "quantity" => fake()->numberBetween(1 , 200),
        ];
    }
}
