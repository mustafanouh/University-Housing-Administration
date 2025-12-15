<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('fees', function (Blueprint $table) {
            $table->id();
            $table->enum("type" , ["registeration" , "damage" , "punishment" , "maintenance"]);
            $table->integer("amount")->check("amount > 0");
            $table->timestamp("created_at");
            $table->timestamp("payment_date")->nullable()->default(null);
            $table->string("process_number")->nullable()->unique()->default(null);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('fees');
    }
};
