<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ArtistRequestController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ArtistController;
use App\Http\Controllers\SongController;
use App\Http\Controllers\PlaylistController;
use App\Http\Controllers\ListenController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('login', [AuthController::class, 'login']);
Route::post('register-listener', [AuthController::class, 'registerListener']);
Route::post('register-artist', [AuthController::class, 'registerArtist']);
Route::post('resend-verification-email', [AuthController::class, 'sendVerificationEmail']);

Route::get('users', [UserController::class, 'getUsers']);
Route::get('artist-requests', [ArtistRequestController::class, 'getArtistRequests']);
Route::get('users/{id}', [UserController::class, 'getUser']);
Route::put('users/{id}', [UserController::class, 'updateUser']);
Route::delete('users/{id}', [UserController::class, 'deleteUser']);

Route::get('album/{id}', [ArtistController::class, 'getAlbum']);
Route::get('album/{id}/songs', [ArtistController::class, 'getAlbumSongs']);
Route::get('albums', [ArtistController::class, 'getAlbums']);
Route::get('artist/{id}', [ArtistController::class, 'getArtist']);
Route::get('albums/{id}', [ArtistController::class, 'getArtistAlbums']);
Route::get('artists', [ArtistController::class, 'getArtists']);
Route::get('songs/{id}', [ArtistController::class, 'getArtistSongs']);
Route::post('upload-song', [ArtistController::class, 'uploadSong']);
Route::post('create-album/upload-songs', [ArtistController::class, 'createAlbumAndUploadSongs']);
Route::delete('songs/{id}', [ArtistController::class, 'deleteSong']);
Route::put('albums/{id}', [ArtistController::class, 'editAlbum']);
Route::put('songs/{id}', [ArtistController::class, 'editSong']);

Route::get('play/{filename}', [SongController::class, 'getSong']);
Route::get('/song/{id}/details', [SongController::class, 'getSongDetails']);
Route::get('/songs', [SongController::class, 'getSongs']);

// listen
Route::post('listen/{song}', [ListenController::class, 'listen']);
Route::get('most-listened-artist/{limit}', [ListenController::class, 'mostListenedArtist']);
Route::get('most-listened-song/{limit}', [ListenController::class, 'mostListenedSong']);
Route::get('most-listened-song-of-artist/{artistId}/{limit}', [ListenController::class, 'mostListenedSongOfArtist']);

// playlists
Route::get('playlists', [PlaylistController::class, 'getPlaylists']);
Route::get('playlist/{id}', [PlaylistController::class, 'getPlaylist']);
Route::get('playlist/{id}/songs', [PlaylistController::class, 'getPlaylistSongs']);
Route::post('playlist/create', [PlaylistController::class, 'createPlaylist']);
Route::post('playlist/{playlist}/{song}/add', [PlaylistController::class, 'addSongToPlaylist']);
Route::delete('playlist/{playlist}/{song}/remove', [PlaylistController::class, 'removeSongFromPlaylist']);
Route::delete('playlist/{id}/delete', [PlaylistController::class, 'deletePlaylist']);

Route::group([

    'middleware' => 'api',
    'prefix' => 'auth'

], function ($router) {
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::get('me', [AuthController::class, 'me']);

    // Artist

    
    Route::get('email/verify/{id}', function (Request $request, $id) {
        $user = App\Models\User::find($id);

        if (!$user) {
            abort(404);
        }

        $user->markEmailAsVerified();

        return redirect(env('FRONT_END_URL') . '/home');
    })->name('verification.verify');
});



