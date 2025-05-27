<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class UserFilesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = DB::table('users')->get();
        $categories = DB::table('file_categories')->get();

        DB::table('user_files')->insert([
            [
                'id' => Str::uuid(),
                'user_id' => $users[0]->id,
                'file_category_id' => $categories[0]->id,
                'file_url' => 'https://example.com/files/transcript1.pdf',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => Str::uuid(),
                'user_id' => $users[1]->id,
                'file_category_id' => $categories[1]->id,
                'file_url' => 'https://example.com/files/certificate1.pdf',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => Str::uuid(),
                'user_id' => $users[2]->id,
                'file_category_id' => $categories[2]->id,
                'file_url' => 'https://example.com/files/idcard1.pdf',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);
    }
}