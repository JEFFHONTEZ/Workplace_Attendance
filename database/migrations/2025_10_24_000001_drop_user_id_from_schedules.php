<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasTable('schedules') && Schema::hasColumn('schedules', 'user_id')) {
            Schema::table('schedules', function (Blueprint $table) {
                // drop FK then column
                $table->dropConstrainedForeignId('user_id');
            });
        }
    }

    public function down(): void
    {
        if (Schema::hasTable('schedules') && ! Schema::hasColumn('schedules', 'user_id')) {
            Schema::table('schedules', function (Blueprint $table) {
                $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            });
        }
    }
};
