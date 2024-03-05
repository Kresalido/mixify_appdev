<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;


class SuperAdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Insert super admin data into the database
        DB::table('users')->insert([
            'username' => 'MixifyAdmin',
            'email' => 'Mixify@gmail.com',
            'password' => Hash::make('MixifyAdmin'), // Hash the password for security
        ]);
    }
}