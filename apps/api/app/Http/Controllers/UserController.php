<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\AclUserAssocController;
use App\Http\Controllers\Acl;

class UserController extends Controller
{
    //
    public function login(Request $request)
    {
        $user = User::where("email", $request->email)->first();
        if ($user || Hash::check($request->password, $user->password)) {
            $token = $user->createToken('api-token')->plainTextToken;
            return response()->json(['token' => $token, 'name' =>$user->name, 'status' => 200], 200);
        }
        return response()->json(['errors' => 'The provided credentials are incorrect.', 'status' => 401], 401);
    }
    public function register(Request $request)
    {
        //TODO: Implement a check for duplicates.
        $user = new User();
        $duplicates = $user::where('email', $request->email)->get();
        if (count($duplicates)) {
            return response()->json(['errors' => 'Email not available', 'status' => 400], 400);
        }
        $user->email = $request->email;
        $user->name = $request->name;
        $user->password = Hash::make($request->password);
        $user->save();

        //TODO: Add error handling for when the signup returns an error.
        $this->assign_role($request->group, $user->getAuthIdentifier());
        return response()->json(['user' => $user, 'status' => 200], 200);
    }

    public function assign_role(string $role, int $user_id)
    {
        $acl_controller = new Acl();
        $acl_assoc = new AclUserAssocController();

        // Create a map of all basic roles and their permissions.
        $roles_map = [
            "admin" => ["allowed" => [".*"], "denied" => "N/A"],
            "user" => [
                "allowed" => [
                    "GET_:\/api\/.*\/search\/.*",
                    "GET_:\/api\/tasks",
                    "GET_:\/api\/projects",
                    "GET_:\/api\/acls",
                    "GET_:\/api\/users",
                    "GET_:\/api\/.*\/single\/.*",
                    "PATCH_:\/api\/tasks\/update\/.*"
                ],
                "denied" => [
                    "POST_:\/api\/.*\/create",
                    "PATCH_:\/api\/.*\/update\/.*",
                    "DELETE_:\/api\/.*\/delete\/.*"
                ],
            ]
        ];

        //TODO: Add a 2-step verification check before assigning admin rights
        // Assign roles for admin roles.
        if ($role == 'admin') {
            $req = [
                "action" => "allowed",
                "method" => $roles_map['admin']['allowed'][0],
                "name" => "Allow all",
                "description" => "Allows full access to all resources",
                "route" => ".*"
            ];
            $acl = $acl_controller->acl_maker($req);

            //TODO: Add error handling for when the acl wasn't created.
            $acl_assoc->create_assoc($user_id, $acl->id);
            return;
        }


        // If the role passed is user create permissions if they don't exist and them to
        // to the association table.
        $allowed_roles = $roles_map[$role]["allowed"];
        $denied_roles = $roles_map[$role]["denied"];

        // Loop through each permission in both allowed list and denied list
        // check if the permission exist as an ACL instance if not create one.

        $this->assignPermissions($allowed_roles, $user_id, "allowed");
        $this->assignPermissions($denied_roles, $user_id, "denied");


    }

    private function assignPermissions(array $roles, int $user_id, string $action)
    {
        $acl_controller = new Acl();
        $acl_assoc = new AclUserAssocController();

        foreach ($roles as $role) {
            $exploded_data = explode(':', $role);
            $method = explode("_", $exploded_data[0])[0];
            $req = [
                "action" => $action,
                "method" => $method,
                "name" => "Preset/method",
                "description" => "Placeholder description for $exploded_data[1]",
                "route" => $exploded_data[1]
            ];
            $acl = $acl_controller->acl_maker($req);
            $acl_assoc->create_assoc($user_id, $acl->id);
        }
    }

    public function get_users()
    {
        $users = User::select('name', 'id', 'email')->get();
        if (count($users) == 0) {
            return response()->json(["error" => "No users were found", "status" => 404], 404);
        }
        return response()->json(["data" => $users, "status" => 200], 200);

    }

    public function get_single_user(string $id)
    {
        $id = (int) $id;
        $users = User::select('name', 'id', 'email')->where('id', $id)->get();
        if (count($users) == 0) {
            return response()->json(["error" => "No users were found", "status" => 404], 404);
        }
        return response()->json(["data" => $users, "status" => 200], 200);

    }
}
