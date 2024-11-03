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
        // Create user_health_details table
        Schema::create('user_health_details', function (Blueprint $table) {
            $table->uuid('id')->primary(); // UUID as primary key
            $table->unsignedBigInteger('healthmate_user_id'); // Connects to healthmate_user table
            $table->float('weight'); // Weight in kg
            $table->float('height'); // Height in cm or meters
            $table->string('activity_level'); // e.g., 'low', 'moderate', 'high'
            $table->integer('daily_steps'); // Daily steps count
            $table->integer('heart_rate'); // Heart rate in bpm
            $table->integer('sleep_score'); // Sleep score (out of 100 or similar)
            $table->timestamps(); // Created at and updated at
            // Foreign key constraint linking to healthmate_user table
            $table->foreign('healthmate_user_id')->references('id')->on('users')->onDelete('cascade');
        });
        // Create medicine_history table
        Schema::create('medicine_history', function (Blueprint $table) {
            $table->uuid('id')->primary(); // UUID as primary key
            $table->unsignedBigInteger('healthmate_user_id'); // Connects to healthmate_user table
            $table->string('health_issue');
            $table->date('date_of_diagnosis');
            $table->string('progress'); // e.g., 'improving', 'stable', 'worsening'
            $table->timestamps(); // Created at and updated at
            // Foreign key constraint linking to healthmate_user table
            $table->foreign('healthmate_user_id')->references('id')->on('users')->onDelete('cascade');
        });
        // Create activities table
        Schema::create('activities', function (Blueprint $table) {
            $table->uuid('id')->primary(); // UUID as primary key
            $table->unsignedBigInteger('user_health_details_id'); // Connects to user_health_details table
            $table->string('title'); // Title of the activity
            $table->time('time'); // Time of the activity
            $table->integer('duration'); // Duration in minutes
            $table->integer('calories_burn'); // Calories burned during the activity
            $table->timestamps(); // Created at and updated at
            // Foreign key constraint linking to user_health_details table
            $table->foreign('user_health_details_id')->references('id')->on('user_health_details')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
        Schema::dropIfExists('activities');
        Schema::dropIfExists('medicine_history');
        Schema::dropIfExists('user_health_details');
    }
};
