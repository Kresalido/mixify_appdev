<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Playlist;
use App\Models\Song;
use App\Models\PlaylistSong;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $faker = \Faker\Factory::create();

        for ($i = 0; $i < 10; $i++) {
            $user = User::create([
                'name' => $faker->name,
                'email' => $faker->unique()->safeEmail,
                'password' => Hash::make('password'), // password
                'role' => 'artist',
            ]);

            $album = $user->albums()->create([
                'album_name' => $faker->sentence(1),
                'album_description' => $faker->sentence(2),
                'user_id' => $user->id,
                'cover_photo' => 'fb4dcfa229d0d07683dccd6d4b27f8c2b3671e58119779c6a3b6cf54831f623c.png', // Change cover photo
                'created_at' => now(),
                'updated_at' => now(),
            ]);
            
            for ($j = 0; $j < 400; $j++)
            $song = $album->songs()->create([
                'display_name' => $faker->sentence(1),
                'hashed_name' => 'd2a4c32b1072c6b6f6dbc26e715a1dfa388de1a0d2fd7d32b5ff3229ccae4c60.mp3', // Change song
                'album_id' => $album->album_id,
                'user_id' => $user->id,
                'created_at' => now(),
                'updated_at' => now(),
            ]);


        }
    }
}
