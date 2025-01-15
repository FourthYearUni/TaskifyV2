<?php

namespace App\Http\Controllers;

// @author: @0verwtch
// @desciption: This controller presents methods to handle Access control lists (ACLs). They
// are responsible for handling authorization.  

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Database\Eloquent\Collection;

use App\Http\Controllers\Controller;
use App\Models\acl as ACLModel;
use App\Models\User;

class Acl extends Controller
{
    protected $creation_validation_rules = [
        'name' => 'required|string|max:100',
        'description' => 'required|string|max:255',
        'route' => 'required|string|max:255',
        'method' => 'required|string|max:255',
        'action' => 'required|string|max:255'
    ];

    protected $update_validation_rules = [
        'name' => 'nullable|string|max:100',
        'description' => 'nullable|string|max:255',
        'route' => 'nullable|string|max:255',
        'method' => 'nullable|string|max:255',
        'action' => 'nullable|string|max:255'
    ];

    public function create_acl(Request $req)
    {
        $validateRequest = $req->validate($this->creation_validation_rules);
        $acl = $this->acl_maker($validateRequest);
        return response()->json(['data' => $acl, 'status' => 201], 201);
    }

    public function acl_maker($validateRequest): ACLModel
    {
        $acl = new ACLModel();

        $duplicate_acl = ACLModel::
            where('route', $validateRequest['route'])
            ->where('method', $validateRequest['method'])
            ->where('action', $validateRequest["action"])->get()->first();

        if ($duplicate_acl) {
            return $duplicate_acl;
        }

        $acl->name = $validateRequest['name'];
        $acl->description = $validateRequest['description'];
        $acl->route = $validateRequest['route'];
        $acl->method = $validateRequest['method'];
        $acl->action = $validateRequest['action'];

        $acl->save();
        return $acl;
    }

    public function update_acl(Request $req, string $id)
    {
        $id = (int) $id;
        $acl = ACLModel::where('id', $id)->get()->first();
        if (!$acl) {
            return response()->json(['error' => 'ACL not found', 'status' => 404], 404);
        }
        $validation = $req->validate($this->update_validation_rules);
        $updates = $acl->update($validation);
        if (!$updates) {
            return response()->json(['error' => 'Failed to update ACL', 'status' => 500], 500);
        }
        return response()->json(['data' => $acl, 'status' => 200], 200);
    }

    public function delete_acl(string $id)
    {
        $id = (int) $id;
        $acl = ACLModel::where('id', $id)->get()->first();
        if (!$acl) {
            return response()->json(['error' => 'ACL not found', 'status' => 404], 404);
        }
        $acl->delete();
        return response()->json(['status' => 204], 204);
    }

    public function get_all(): JsonResponse
    {
        $acls = ACLModel::all();
        if (count($acls) == 0) {
            return response()->json(['error' => 'No ACLs found', 'status' => 404], 404);
        }
        return response()->json(['data' => $acls, 'status' => 200], 200);
    }

    public function search_by_user(int $user_id, string $method, string $route): Collection|null
    {
        $user = User::find($user_id);
        $acls = $user->acls;

        $filtered_acls = $acls->filter(function ($acl) use ($route, $method) {
            // dd($route, $acl->route);
            $route_status = preg_match("/$acl->route/", $route);
            $method_status = preg_match("/$acl->method/", $method);
            return $route_status and $method_status;
        });
        // dd($filtered_acls->count());
        if (!$filtered_acls) {
            return null;
        }
        return $filtered_acls;
    }
}