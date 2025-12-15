<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('storage', function (Blueprint $table) {
            $table->id();
            $table->string("itme_name");
            $table->integer("quantity")->check("quantity >= 0");
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('storage');
    }
};
