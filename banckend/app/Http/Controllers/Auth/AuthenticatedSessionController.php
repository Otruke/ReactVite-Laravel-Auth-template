<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\JsonResponse;

class AuthenticatedSessionController extends Controller
{
    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): JsonResponse
    {
        try {
            // Authenticate the user
            if (!Auth::attempt($request->only('email', 'password'))) {
                return response()->json([
                    'message' => 'The provided credentials are incorrect.',
                ], 401);
            }

            // Check if the user's email is verified
            if (!Auth::user()->hasVerifiedEmail()) {
                return response()->json([
                    'message' => 'You must verify your email before logging in.',
                ], 403);
            }

            // Generate a token for the user
            $token = Auth::user()->createToken('auth-token')->plainTextToken;

            return response()->json([
                'user' => Auth::user(),
                'token' => $token,
                'message' => 'Login successful',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Login failed, Please try again.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): JsonResponse
    {
        // Revoke the user's token
        $request->user()->tokens()->delete();

        return response()->json([
            'message' => 'Logout successful',
        ]);
    }
}