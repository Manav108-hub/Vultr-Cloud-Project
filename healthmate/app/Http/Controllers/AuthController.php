<?php

namespace App\Http\Controllers;

use App\Models\Users;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Cookie;
use Inertia\Inertia;

class AuthController extends Controller
{
    public function showLogin() {
        return Inertia::render('Auth/Login');
    }

    public function login(Request $request) {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $user = Users::where('email', $request->email)->first();

        if ($user && Hash::check($request->password, $user->password)) {
            Auth::login($user);
            // Save auth token
            $token = $user->createToken('authToken', ['*'])->plainTextToken;
            $cookie = cookie('token', $token, 60 * 24);
            return redirect()->intended('/')->withCookie($cookie);
        }

        return back()->withErrors(['email' => 'Email or password is incorrect.']);
    }

    public function showRegister()
    {
        return Inertia::render('Auth/Register');
    }

    public function register(Request $request) {
        $request->validate([
            'full_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:healthmate_users',
            'password' => 'required|string|min:8|confirmed',
            'birth_date' => 'required|date',
            'phone_no' => 'nullable|string',
            'gender' => 'required|in:male,female,other',
        ]);

        Users::create([
            'full_name' => $request->full_name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'birth_date' => $request->birth_date,
            'phone_no' => $request->phone_no,
            'gender' => $request->gender,
        ]);

        return redirect('/auth/login')->with('success', 'Registration successful!');
    }

    public function logout()
    {
        if (Auth::check()) {
            Auth::user()->tokens()->delete();
        }

        $cookie = Cookie::forget('token');
        Auth::logout();
        return redirect('/auth/login')->withCookie($cookie);
    }

    public function refreshToken() {
        if (Auth::check()) {
            // Delete old tokens
            Auth::user()->tokens()->delete();

            // Create new token
            $token = Auth::user()->createToken('auth_token', ['*'], now()->addHours(24))->plainTextToken;

            // Store new token in cookie
            $cookie = cookie('auth_token', $token, 60 * 24);

            return response()->json(['message' => 'Token refreshed successfully'])
                ->withCookie($cookie);
        }

        return response()->json(['message' => 'Unauthorized'], 401);
    }

    public function checkAuth()
    {
        if (Auth::check()) {
            return response()->json([
                'authenticated' => true,
                'user' => Auth::user()
            ]);
        }

        return response()->json([
            'authenticated' => false
        ], 401);
    }
}
