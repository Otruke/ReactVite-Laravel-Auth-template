<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\Http\JsonResponse;

class RegisteredUserController extends Controller
{
    /**
     * Handle an incoming registration request.
     */
    public function store(Request $request): JsonResponse
    {
        try {
            $request->validate([
                'name' => ['required', 'string', 'max:255'],
                'email' => ['required', 'string', 'lowercase', 'email', 'max:255'],
                'password' => ['required', 'confirmed', Rules\Password::defaults()],
            ]);

            // Check if the user already exists
            $user = User::where('email', $request->email)->first();

            if ($user) {
                if ($user->hasVerifiedEmail()) {
                    return response()->json([
                        'message' => 'You already have an account. Please log in instead.',
                        'redirect' => '/login', // Redirect to login page
                    ], 409); // 409 Conflict status code
                } else {
                    return response()->json([
                        'message' => 'You have already registered but have not verified your email. Please check your email for the verification link.',
                        'redirect' => '/check-email', // Redirect to check-email page
                    ], 409); // 409 Conflict status code
                }
            }

            // Create a new user
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->string('password')),
            ]);

            event(new Registered($user));

            return response()->json([
                'message' => 'User registered successfully. Please check your email for verification.',
                'redirect' => '/check-email', // Redirect to check-email page
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'User registration failed. Please try again.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}

