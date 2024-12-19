<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    //
    public function login(Request $request){
        $user = User::where("email", $request->email)->first();
        if($user || Hash::check($request->password, $user->password)){
            $token = $user->createToken('api-token')->plainTextToken;
            return response()->json(['token' => $token], 200);
        }
        return response()->json(['error' => 'The provided credentials are incorrect.'], 401);
    }
    public function register(Request $request){
        $user = new User();
        $user->email = $request->email;
        $user->group = $request->group;
        $user->name = $request->name;
        $user->password = Hash::make($request->password);
        $user->save();
        return response()->json(['user' => $user], 200);
    }
}
