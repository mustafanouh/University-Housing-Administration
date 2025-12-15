<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('treasury', function (Blueprint $table) {
            $table->id();
            $table->boolean("income")->default(false);
            $table->foreignId("fee_id")->nullable()->constrained()->onDelete("set null");
            $table->text("description")->nullable()->default(null);
            $table->foreignId("employee_id")->nullable()->constrained()->onDelete("set null");
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('treasury');
    }
};
