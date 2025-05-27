<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Mail\UserStatusUpdateEmail;
use App\Models\User;
use App\Models\UserFile;
use Illuminate\Validation\Rule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class UserController extends Controller
{
    protected $casts = [
        'id' => 'string',
    ];

    public function index()
    {
        $users = User::all();
        
        return response()->json($users->map(function ($user) {
            $user->id = (string) $user->id;
            return $user;
        }));
    }

    public function show(User $user)
    {
        $user->load(['university','userFiles.fileCategory']);
        return response()->json($user);
    }

    public function store(Request $request){
        //
        $formFields = $request->validate([
            'username' => ['required','min:3'],
            'email' => ['required','email',Rule::unique('users','email')],
            'password' => 'required|confirmed|min:6',
            'phone' => ['required'],
            'university_id' => ['required'],
        ]);

        $formFields['password'] = bcrypt($formFields['password']);
        
        $user = User::create($formFields);

        foreach ($request->file('files') as $fileCategoryId => $file) {
            $path = $file->store('user_files', 'public');
    
            UserFile::create([
                'user_id' => $user->id,
                'file_category_id' => $fileCategoryId,
                'file_url' => $path,
            ]);
        }
        
        return response()->json(['message' => 'User created']);
    }

    public function logout(Request $request)
    {
        auth()->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json(['message' => 'You have been logged out!']); 
    }

    public function change(Request $request, User $user)
    {
        $request->validate([
            'approval' => 'required|in:Approved,Rejected,Pending',
        ]);

        $user->approval = $request->approval;
        $user->save();

        return response()->json([
            'message' => 'User approval updated successfully',
            'user' => $user
        ]);
    }

    public function authenticate(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required','email'],
            'password' => 'required'
        ]);

        if(auth()->attempt($credentials)){
            $request->session()->regenerate();
            if (auth()->user()->approval == 'Pending') {
                auth()->logout();
                return response()->json([
                    'message' => 'Access denied. User still in pending'
                ], 403); 
            }

            return response()->json([
                'message' => 'Login successful',
                'user' => auth()->user()
            ]);
        }

        return response()->json([
            'message' => 'Invalid credentials'
        ], 401);
    }
}
