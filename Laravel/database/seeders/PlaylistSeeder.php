<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Playlist;
use App\Models\Song;
use App\Models\PlaylistSong;

class PlaylistSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = \Faker\Factory::create();

        $songIds = Song::pluck('id')->toArray();

        $playlist = Playlist::create([
            'name' => $faker->sentence(1),
            'creator_id' => 13, // specify what user to create the playlist
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        shuffle($songIds);

        for ($j = 0; $j < min(1000, count($songIds)); $j++) {
            $playlist->songs()->attach($songIds[$j]);
        }
    }
}
