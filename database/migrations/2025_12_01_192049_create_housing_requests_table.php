<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('housing_requests', function (Blueprint $table) {
            $table->id();
            $table->boolean("brothers")->default(false);
            $table->foreignId("student_1_id")->references("id")->on("students");
            $table->foreignId("student_2_id")->references("id")->on("students");
            $table->foreignId("student_3_id")->references("id")->on("students");
            $table->foreignId("student_4_id")->references("id")->on("students");
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('housing_requests');
    }
};
