<?php

namespace App\Http\Controllers;

use App\Models\Activities;
use App\Models\Activity;
use Illuminate\Http\Request;

class ActivityController extends Controller
{
    public function index()
    {
        $activities = Activities::all();
        return response()->json($activities);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'user_health_details_id' => 'required|uuid',
            'title' => 'required|string|max:255',
            'time' => 'required|date_format:H:i',
            'duration' => 'required|integer',
            'calories_burn' => 'required|integer',
        ]);

        $activity = Activities::create($validatedData);
        return response()->json($activity, 201);
    }

    public function update(Request $request, $id)
    {
        $activity = Activities::findOrFail($id);

        $validatedData = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'time' => 'sometimes|required|date_format:H:i',
            'duration' => 'sometimes|required|integer',
            'calories_burn' => 'sometimes|required|integer',
        ]);

        $activity->update($validatedData);
        return response()->json($activity);
    }

    public function destroy($id)
    {
        $activity = Activities::findOrFail($id);
        $activity->delete();
        return response()->json(null, 204);
    }
}
