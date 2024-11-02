<?php

namespace App\Http\Controllers;

use App\Models\UserHealthDetails;
use Illuminate\Http\Request;

class UserHealthDetailsController extends Controller
{
    public function index()
    {
        $userHealthDetails = UserHealthDetails::all();
        return response()->json($userHealthDetails);
    }

    public function show($id)
    {
        $userHealthDetail = UserHealthDetails::findOrFail($id);
        return response()->json($userHealthDetail);
    }

    public function store(Request $request)
    {
        $request->validate([
            'healthmate_user_id' => 'required|uuid',
            'weight' => 'required|numeric',
            'height' => 'required|numeric',
            'activity_level' => 'required|string',
            'daily_steps' => 'required|integer',
            'heart_rate' => 'required|integer',
            'sleep_score' => 'required|integer',
        ]);

        $userHealthDetail = UserHealthDetails::create($request->all());
        return response()->json($userHealthDetail, 201);
    }

    public function update(Request $request, $id)
    {
        $userHealthDetail = UserHealthDetails::findOrFail($id);
        $userHealthDetail->update($request->all());
        return response()->json($userHealthDetail);
    }

    public function destroy($id)
    {
        UserHealthDetails::destroy($id);
        return response()->json(null, 204);
    }
}
