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
        Schema::create('users', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('email')->unique();
            $table->string('password');
            $table->string('username');
            $table->string('image_url')->nullable();
            $table->string('phone');
            $table->uuid('university_id');
            $table->enum('role', ['Admin', 'User']);
            $table->enum('approval', ['Approved', 'Pending', 'Rejected']);
            $table->timestamps();
    
            $table->foreign('university_id')->references('id')->on('universities')->onDelete('cascade');
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
