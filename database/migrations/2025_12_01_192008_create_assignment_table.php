<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('assignment', function (Blueprint $table) {
            $table->id();

            $table->foreignId("student_id")->constrained();
            $table->foreignId("room_id")->constrained();
            $table->enum("status" , ["in-housing" , "left"]);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('assignment');
    }
};
