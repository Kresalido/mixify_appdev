<?php

namespace App\Http\Controllers;

use App\Models\Song;
use App\Models\User;
use App\Models\Album;
use App\Jobs\UploadSongJob;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;

class ArtistController extends Controller
{
    public function getArtistCount()
    {
        $artistCount = User::where('role', 'artist')->count();

        return response()->json(['artistCount' => $artistCount]);
    }
    
    public function getAlbumOfSong($songId)
    {
        $song = Song::find($songId);

        if ($song) {
            $album = $song->album;
            return response()->json($album);
        } else {
            return response()->json(['error' => 'Song not found'], 404);
        }
    }
    
    public function getArtist($id)
    {
        $artist = User::find($id);

        return response()->json($artist);
    }
    
    public function getArtists(Request $request)
    {
        $artists = User::where('role', 'artist')->get();

        return response()->json($artists);
    }

    public function getAlbum($album_id)
    {
        $album = Album::find($album_id);

        return response()->json($album);
    }

    public function getAlbumSongs($album_id)
    {
        $album = Album::find($album_id);
        if ($album) {
            $songs = $album->songs()->with(['user', 'album'])->get();
            return response()->json($songs);
        } else {
            return response()->json(['error' => 'Album not found'], 404);
        }
    }

    public function getAlbums(Request $request)
    {
        $user = auth()->user();
        $albums = $user->albums;

        return response()->json($albums);
    }
    
    public function getArtistAlbums($id)
    {
        $user = User::find($id);
        if ($user) {
            $albums = $user->albums()->with(['songs', 'user'])->get();
            return response()->json($albums);
        } else {
            return response()->json(['error' => 'User not found'], 404);
        }
    }

    public function getArtistSongs($id)
    {
        $user = User::find($id);
        if ($user) {
            $songs = $user->songs()->with(['user', 'album'])->get();
            return response()->json($songs);
        } else {
            return response()->json(['error' => 'User not found'], 404);
        }
    }

    public function uploadSong(Request $request)
    {
        if (!$request->hasFile('image')) {
            return response()->json(['message' => 'Image file is empty'], 400);
        }
        
        if (!$request->hasFile('song')) {
            return response()->json(['message' => 'Song file is empty'], 400);
        }

        $request->validate([
            'display_name' => 'required',
            'song' => 'required|file|mimes:mp3,wav,ogg',
            'image' => 'required|file|mimes:jpeg,png,jpg,gif', // validate the image file
            'new_album_name' => 'sometimes|required',
            'new_album_description' => 'sometimes|required',
            'new_album_photo' => 'sometimes|required|file|mimes:jpeg,png,jpg,gif',
        ]);

        $currentTime = time();
        $hashedTime = hash('sha256', $currentTime);
    
        $songExtension = $request->file('song')->getClientOriginalExtension();
        $imageExtension = $request->file('image')->getClientOriginalExtension();
    
        $hashedSongName = $hashedTime . '.' . $songExtension;
        $hashedImageName = $hashedTime . '.' . $imageExtension;
    
        $request->file('song')->storeAs('songs', $hashedSongName, 'public');
        $request->file('image')->storeAs('images', $hashedImageName, 'public');
    
        $song = new Song;
        $song->display_name = $request->display_name;
        $song->hashed_name = $hashedSongName;
        $song->photo_hashed_name = $hashedImageName;
        $song->user_id = auth()->id();
        

        if ($request->has('new_album_name')) {
            $album = new Album;
            $album->album_name = $request->new_album_name;
            $album->album_description = $request->new_album_description;
            $album->photo_hashed_name = $request->file('new_album_photo')->hashName();
            $album->user_id = auth()->id();
    
            $request->file('new_album_photo')->storeAs('album_images', $album->photo_hashed_name);
    
            $album->save();
    
            $song->album_id = $album->id;
        } else {
            $song->album_id = $request->album_id;
        }
    
        $song->save();
    
        return response()->json(['message' => 'Song Uploaded Successfully'], 201);
    }

    public function deleteSong(Request $request, $id)
    {
        $song = Song::find($id);

        if ($song && auth()->id() == $song->user_id) {
            Storage::delete('songs/' . $song->hashed_name);
            $song->delete();
        }

        return response()->json(null, 204);
    }

    public function editAlbum(Request $request, $id)
    {
        $request->validate([
            'album_name' => 'required',
            'album_description' => 'required',
        ]);

        $album = Album::find($id);

        if ($album && auth()->id() == $album->user_id) {
            $album->album_name = $request->album_name;
            $album->album_description = $request->album_description;
            $album->save();
        }

        return response()->json($album);
    }

    public function editSong(Request $request, $id)
    {
        $request->validate([
            'display_name' => 'required',
        ]);

        $song = Song::find($id);

        if ($song && auth()->id() == $song->user_id) {
            $song->display_name = $request->display_name;
            $song->save();
        }

        return response()->json($song);
    }
    

    public function createAlbumAndUploadSongs(Request $request)
    {
        $validatedData = $request->validate([
            'album_name' => 'required',
            'album_description' => 'required',
            'album_photo' => 'required|file|mimes:jpeg,png,jpg,gif',
            'songs' => 'required|array',
            'songs.*' => 'file|mimes:mp3,wav,ogg|max:40000',
            'displayNames' => 'required|array', 
            'displayNames.*' => 'required|string',
            'genres' => 'required|array',
            'genres.*' => 'required'
        ]);
    
        $currentTime = time();
        $hashedTime = hash('sha256', $currentTime);
        $photoExtension = $request->file('album_photo')->getClientOriginalExtension();
        $hashedPhotoName = $hashedTime . '.' . $photoExtension;
    
        $request->file('album_photo')->storeAs('album_images', $hashedPhotoName, 'public');
    
        $album = new Album;
        $album->album_name = $validatedData['album_name'];
        $album->album_description = $validatedData['album_description'];
        $album->cover_photo = $hashedPhotoName;
        $album->user_id = auth()->id();
        $album->save();
    
        $displayNames = $request->input('displayNames');

        foreach ($request->file('songs') as $index => $song) {
            $currentTime = time();
            $hashedTime = hash('sha256', $song->getClientOriginalName() . $currentTime);
            $songExtension = $song->getClientOriginalExtension();
            $hashedSongName = $hashedTime . '.' . $songExtension;
        
            $songPath = $song->storeAs('songs', $hashedSongName, 'public');
        
            $displayName = $displayNames[$index];
        
            UploadSongJob::dispatch($songPath, $album->album_id, $displayName, $hashedSongName);
        }
    
        return response()->json(['message' => 'Album created and songs upload requested'], 200);
    }
}
