<?php

namespace App\Http\Controllers;

use App\Models\Image;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ImageController extends Controller
{
    public function index()
    {
        $images = Image::all();

        if ($images->isEmpty()) {
            return response()->json([
                "message" => "There are no images available."
            ], 404);
        }

        $images = $images->map(function ($image) {
            return [
                'id' => $image->id,
                'url' => url(Storage::url($image->path))
            ];
        });

        return response()->json($images, 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'image' => ['required', 'file', 'image', 'mimes:jpeg,png,jpg', 'max:2048'],
            'label' => ['nullable', 'string', 'max:255'],
        ]);

        $path = $request->file('image')->store('images', 'public');

        $image = Image::create([
            'path' => $path,
            'label' => $request->label,
        ]);

        return response($image, 201);
    }

    public function destroy(Image $image)
    {
        if ($image->path) {
            Storage::disk('public')->delete($image->path);
        }

        $image->delete();

        return response()->json(['message' => 'Image deleted successfully'], 204);
    }
}
