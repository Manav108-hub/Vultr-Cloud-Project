<?php

namespace App\Http\Controllers;

use App\Models\MedicineHistory;
use Illuminate\Http\Request;

class MedicineHistoryController extends Controller
{
    // Fetch all medicine history records
    public function index()
    {
        $medicineHistories = MedicineHistory::all();
        return response()->json($medicineHistories);
    }

    // Store a new medicine history record
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'healthmate_user_id' => 'required|uuid',
            'health_issue' => 'required|string|max:255',
            'date_of_diagnosis' => 'required|date',
            'progress' => 'required|string|max:50',
        ]);

        $medicineHistory = MedicineHistory::create($validatedData);
        return response()->json($medicineHistory, 201);
    }

    // Fetch a specific medicine history record
    public function show($id)
    {
        $medicineHistory = MedicineHistory::findOrFail($id);
        return response()->json($medicineHistory);
    }

    // Update a medicine history record
    public function update(Request $request, $id)
    {
        $medicineHistory = MedicineHistory::findOrFail($id);

        $validatedData = $request->validate([
            'health_issue' => 'sometimes|required|string|max:255',
            'date_of_diagnosis' => 'sometimes|required|date',
            'progress' => 'sometimes|required|string|max:50',
        ]);

        $medicineHistory->update($validatedData);
        return response()->json($medicineHistory);
    }

    // Delete a medicine history record
    public function destroy($id)
    {
        $medicineHistory = MedicineHistory::findOrFail($id);
        $medicineHistory->delete();
        return response()->json(null, 204);
    }
}
