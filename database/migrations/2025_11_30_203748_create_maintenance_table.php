<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('maintenance', function (Blueprint $table) {
            $table->id();
            $table->foreignId("maintenance_request_id")->nullable()->constrained()->onUpdate("cascade")->onDelete("set null");
            $table->foreignId("treasury_id")->nullable()->constrained()->onUpdate("cascade")->onDelete("set null");
            $table->text("description")->nullable();
            $table->enum("status" , ["in queue" , "pending" , "finished" , "paused" , "interrupted" , "cancled"])->default("in queue");
            $table->text("notes")->nullable()->default(null);
            $table->double("total_cost")->nullable()->default(null)->check("total_cost >= 0");
            $table->timestamp("start_date")->nullable()->default(null);
            $table->timestamp("finish_date")->nullable()->default(null);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('maintenance');
    }
};
