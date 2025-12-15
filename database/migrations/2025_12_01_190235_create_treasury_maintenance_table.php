<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('treasury_maintenance', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger("treasury_log_id");
            $table->foreign("treasury_log_id")->references("id")->on("treasury")->onUpdate("cascade")->onDelete("cascade");

            $table->unsignedBigInteger("maintenance_event_id");
            $table->foreign("maintenance_event_id")->references("id")->on("maintenance")->onUpdate("cascade")->onDelete("cascade");

            $table->unique(["treasury_log_id" , "maintenance_event_id"]);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('treasury_maintenance');
    }
};
