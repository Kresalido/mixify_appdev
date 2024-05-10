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
                'cover_photo' => '0c24cc5fb4fd12c6388b17f3c333fae5ed6cac6ad191e4820749209fd1008898.png', // Change cover photo
                'created_at' => now(),
                'updated_at' => now(),
            ]);
            
            for ($j = 0; $j < 1000; $j++)
            $song = $album->songs()->create([
                'display_name' => $faker->sentence(1),
                'hashed_name' => 'e45cdfe3a62b96aaa968efad794eb505fb413ed91007d56dc30104d2bf25dd31.mp3', // Change song
                'album_id' => $album->album_id,
                'user_id' => $user->id,
                'created_at' => now(),
                'updated_at' => now(),
            ]);


        }
    }
}
