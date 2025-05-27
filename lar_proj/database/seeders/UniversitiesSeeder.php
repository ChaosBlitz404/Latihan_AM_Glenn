<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class UniversitiesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('universities')->insert([
            [
                'id' => Str::uuid(),
                'pt_code' => 'UI',
                'name' => 'Universitas Indonesia',
                'address' => 'Depok, Jawa Barat',
                'website' => 'https://ui.ac.id',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => Str::uuid(),
                'pt_code' => 'ITB',
                'name' => 'Institut Teknologi Bandung',
                'address' => 'Bandung, Jawa Barat',
                'website' => 'https://itb.ac.id',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => Str::uuid(),
                'pt_code' => 'UGM',
                'name' => 'Universitas Gadjah Mada',
                'address' => 'Yogyakarta',
                'website' => 'https://ugm.ac.id',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
