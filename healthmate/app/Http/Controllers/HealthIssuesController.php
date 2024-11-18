<?php

namespace App\Http\Controllers\Users;

use App\Http\Controllers\Controller;
use App\Models\HealthIssues;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class HealthIssuesController extends Controller
{
    // Show the health issues for the authenticated user
    public function show(Request $request) {
        $user = Auth::user();

        // Retrieve health issues specific to the authenticated user
        $healthIssues = HealthIssues::where('user_id', $user->id)->first();

        return inertia("HealthIssues", [
            'user' => $user,
            'healthIssues' => $healthIssues
        ]);
    }

    // Update the health issues for the authenticated user
    public function update(Request $request) {
        // Validate the incoming request data
        $validator = Validator::make($request->all(), [
            'issue_description' => 'nullable|string|max:500',
            'severity' => 'nullable|numeric|min:1|max:10',
            'last_checkup_date' => 'nullable|date',
            'prescribed_medications' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Get the authenticated user
        $user = Auth::user();

        // Retrieve or create the user's health issues record
        $healthIssues = HealthIssues::firstOrNew(['user_id' => $user->id]);

        // Update health issues details
        $healthIssues->issue_description = $request->issue_description;
        $healthIssues->severity = $request->severity;
        $healthIssues->last_checkup_date = $request->last_checkup_date;
        $healthIssues->prescribed_medications = $request->prescribed_medications;

        // Save the updated or new health issues record
        $healthIssues->save();

        return redirect()->route('healthIssues.show')->with('success', 'Health issues updated successfully!');
    }
}
