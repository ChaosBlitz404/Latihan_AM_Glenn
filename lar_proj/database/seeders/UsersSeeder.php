<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $universities = DB::table('universities')->get();

        DB::table('users')->insert([
            [
                'id' => Str::uuid(),
                'email' => 'admin1@example.com',
                'password' => Hash::make('password'),
                'username' => 'admin1',
                'image_url' => null,
                'phone' => '081234567890',
                'university_id' => $universities[0]->id,
                'role' => 'Admin',
                'approval' => 'Approved',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => Str::uuid(),
                'email' => 'user1@example.com',
                'password' => Hash::make('password'),
                'username' => 'user1',
                'image_url' => null,
                'phone' => '081234567891',
                'university_id' => $universities[1]->id,
                'role' => 'User',
                'approval' => 'Pending',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => Str::uuid(),
                'email' => 'user2@example.com',
                'password' => Hash::make('password'),
                'username' => 'user2',
                'image_url' => null,
                'phone' => '081234567892',
                'university_id' => $universities[2]->id,
                'role' => 'User',
                'approval' => 'Approved',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);
    }
}
