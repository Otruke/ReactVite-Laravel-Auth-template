<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class EmailVerificationNotificationController extends Controller
{
    /**
     * Send a new email verification notification.
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'email' => ['required', 'string', 'email', 'max:255'],
        ]);

        // Find the user by email
        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json([
                'message' => 'User not found.',
            ], 404);
        }

        if ($user->hasVerifiedEmail()) {
            return response()->json([
                'message' => 'Your email is already verified. Please log in.',
                'redirect' => '/login', // Redirect to login page
            ], 409); // 409 Conflict status code
        }

        // Send the verification email
        $user->sendEmailVerificationNotification();

        return response()->json([
            'message' => 'Verification link sent! Please check your email.',
        ], 200);
    }
}