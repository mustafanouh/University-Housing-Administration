<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->string("first_name");
            $table->string("last_name");
            $table->integer("age")->check("age > 0");
            $table->string("country");
            $table->string("mobile")->unique()->nullable()->default(null);
            $table->string("email")->unique();
            $table->string("password");
            $table->string("identification_code")->unique();
            $table->string("specialization");
            $table->tinyInteger("year_of_study")->check("year_of_study > 0 AND year_of_study < 6");
            $table->boolean("data_complete")->default(false);
            $table->boolean("eligible")->default(false);
            $table->boolean("house_in")->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('students');
    }
};
