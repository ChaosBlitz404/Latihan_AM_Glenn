<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class FileCategoriesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('file_categories')->insert([
            [
                'id' => Str::uuid(),
                'name' => 'Transcript',
                'image_url' => 'https://example.com/images/transcript.png',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => Str::uuid(),
                'name' => 'Certificate',
                'image_url' => 'https://example.com/images/certificate.png',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => Str::uuid(),
                'name' => 'ID Card',
                'image_url' => 'https://example.com/images/id_card.png',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);
    }
}
