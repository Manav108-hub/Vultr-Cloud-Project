<?php

namespace App\Http\Controllers\Users;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Str;
use App\Models\UserDetails;

class UserDetailsController extends Controller
{
    // Show the user's details
    public function show(Request $request) {
        $user = Auth::user();
        $details = $user->details;
        return inertia("UserDetails", [
            'user' => $user,
            'details' => $details
        ]);
    }

    public function update(Request $request) {
        $validator = Validator::make($request->all(), [
            'phone_no' => 'nullable|string|max:15',
            'dob' => 'nullable|date',
            'gender' => 'nullable|string|max:10',
            'address' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Get the authenticated user
        $user = Auth::user();
        $userDetails = $user->details;

        if (!$userDetails) {
            // Create new user details
            $userDetails = new UserDetails();
            $userDetails->id = Str::uuid(); // Generate a UUID for the id
            $userDetails->user_id = $user->id; // Link to the authenticated user
        }

        // Update the user details
        $userDetails->phone_no = $request->phone_no;
        $userDetails->dob = $request->dob;
        $userDetails->gender = $request->gender;
        $userDetails->address = $request->address;

        $userDetails->save(); // Save the updated or new user details

        return redirect()->route('user.details', ['id' => $userDetails->id])->with('success', 'User details saved successfully!');
    }
}
