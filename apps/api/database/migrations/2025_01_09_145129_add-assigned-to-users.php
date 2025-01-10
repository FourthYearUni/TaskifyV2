<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        //
        Schema::table('tasks', function (Blueprint $table) {
            $table->unsignedBigInteger('assigned_to');
            $table
                ->foreign('assigned_to')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
        Schema::table('tasks', function (Blueprint $table) {
            $table->dropForeign('tasks_assigned_to_foreign');
            $table->dropColumn('assigned_to');

        });
    }
};
