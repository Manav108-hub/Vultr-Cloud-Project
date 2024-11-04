<?php

namespace App\Http\Controllers\Users;

use App\Http\Controllers\Controller;
use App\Models\UserDetails;
use App\Models\UserHealthDetails;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class UserHealthDetailsController extends Controller
{
    // Show the health details for the authenticated user
    public function show(Request $request) {
        $user = Auth::user();

        // Retrieve the health details using the healthmate_user_id
        $healthDetails = UserHealthDetails::where('healthmate_user_id', $user->id)->first();

        return inertia("Dashboard", [
            'user' => $user,
            'details' => $healthDetails
        ]);
    }

    // Update the health details for the authenticated user
    public function update(Request $request) {
        // Validate the incoming request data
        $validator = Validator::make($request->all(), [
            'weight' => 'nullable|numeric',
            'height' => 'nullable|numeric',
            'activity_level' => 'nullable|string',
            'daily_steps' => 'nullable|numeric',
            'heart_rate' => 'nullable|numeric',
            'sleep_score' => 'nullable|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Get the authenticated user
        $user = Auth::user();

        // Retrieve the user's health details record or create a new one if it doesn't exist
        $userHealthDetails = UserHealthDetails::where('healthmate_user_id', $user->id)->first();

        if (!$userHealthDetails) {
            // Create new health details for the user
            $userHealthDetails = new UserHealthDetails();
            $userHealthDetails->id = Str::uuid(); // Generate a UUID for the id
            $userHealthDetails->healthmate_user_id = $user->id; // Link to the authenticated user
        }

        // Update the health details with the data from the request
        $userHealthDetails->weight = $request->weight;
        $userHealthDetails->height = $request->height;
        $userHealthDetails->activity_level = $request->activity_level;
        $userHealthDetails->daily_steps = $request->daily_steps;
        $userHealthDetails->heart_rate = $request->heart_rate;
        $userHealthDetails->sleep_score = $request->sleep_score;

        // Save the updated or new health details
        $userHealthDetails->save();

        return redirect()->route('dashboard', ['id' => $userHealthDetails->id])->with('success', 'Health details updated successfully!');
    }
}
