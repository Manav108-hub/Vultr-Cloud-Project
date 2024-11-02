<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('healthmate_users', function (Blueprint $table) {
            $table->uuid('id')->primary()->default(Str::uuid());
            $table->string('full_name');
            $table->string('email')->unique();
            $table->string('password');
            $table->date('birth_date');
            $table->string('phone_no');
            $table->enum('gender', ['male', 'female', 'other'])->default('not specified');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
