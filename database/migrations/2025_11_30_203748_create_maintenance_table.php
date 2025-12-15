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
            $table->integer("cost")->check("cost > 0")->nullable()->default(null);
            $table->text("description")->nullable();
            $table->enum("status" , ["in queue" , "pending" , "finished" , "paused" , "interrupted" , "cancled"]);
            $table->timestamps();
            $table->timestamp("start_date")->nullable()->default(null);
            $table->timestamp("finish_date")->nullable()->default(null);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('maintenance');
    }
};
