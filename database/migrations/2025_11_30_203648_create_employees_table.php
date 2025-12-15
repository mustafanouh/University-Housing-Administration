<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('employees', function (Blueprint $table) {
            $table->id();
            $table->string("first_name");
            $table->string("last_name");
            $table->tinyInteger("age")->check("age > 20");
            $table->string("address");
            $table->string("mobile")->unique()->nullable()->default(null);
            $table->string("email")->unique();
            $table->string("password");
            $table->string("specialization");
            $table->timestamp("leave_date")->nullable()->default(null);
            $table->foreignId("unit_id")->nullable()->constrained()->onUpdate("cascade")->onDelete("set null");
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('employees');
    }
};
