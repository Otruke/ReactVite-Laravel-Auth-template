<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Verified;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class VerifyEmailController extends Controller
{
    /**
     * Mark the user's email address as verified.
     */
    public function __invoke(Request $request): RedirectResponse
    {
        // Log the request parameters for debugging
        Log::info('Email verification request received:', [
            'id' => $request->route('id'),
            'hash' => $request->route('hash'),
            'expires' => $request->query('expires'),
            'signature' => $request->query('signature'),
        ]);

        // Fetch the user from the database
        $user = User::find($request->route('id'));

        // Log the user for debugging
        Log::info('User fetched:', ['user' => $user]);

        // Check if the user exists
        if (!$user) {
            Log::error('User not found:', ['id' => $request->route('id')]);
            return redirect(config('app.frontend_url') . '/login?error=user_not_found');
        }

        // Check if the hash matches the user's email
        if (!hash_equals((string) $request->route('hash'), sha1($user->getEmailForVerification()))) {
            Log::error('Invalid verification link:', [
                'id' => $request->route('id'),
                'hash' => $request->route('hash'),
            ]);
            return redirect(config('app.frontend_url') . '/login?error=invalid_verification_link');
        }

        // Check if the user's email is already verified
        if ($user->hasVerifiedEmail()) {
            Log::info('Email already verified:', ['user' => $user]);
            return redirect(config('app.frontend_url') . '/login?verified=1');
        }

        // Mark the email as verified
        if ($user->markEmailAsVerified()) {
            event(new Verified($user));
            Log::info('Email marked as verified:', ['user' => $user]);
        }

        // Redirect to the frontend login page with a success message
        return redirect(config('app.frontend_url') . '/verication-success');
    }
}
