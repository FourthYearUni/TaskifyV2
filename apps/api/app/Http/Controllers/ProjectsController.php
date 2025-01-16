<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Models\Projects;
use Illuminate\Support\Facades\DB;



class ProjectsController extends Controller
{
    // Main project controller.
    protected $creation_validation_rues = [
        'name' => 'required|string|max:100',
        'description' => 'required|string|max:255',
        'deadline' => 'required|date|after_or_equal:today',
    ];

    protected $update_validation_rules = [
        'name' => 'nullable|string|max:100',
        'description' => 'nullable|string|max:255',
        'deadline' => 'nullable|string',
        'complete' => 'nullable|boolean'
    ];

    public function get_single(string $id): JsonResponse
    {
        $id = (int) $id;
        $project = Projects::where('projects.id', $id)
            ->join('users', 'projects.owner', '=', 'users.id')
            ->select('users.name as owner', 'projects.name as name', 'description', 'deadline', 'projects.id as id', 'complete')
            ->get()->first();

        if (!$project) {
            return response()->json(['error' => 'Project not found', 'status' => 404], 404);
        }
        return response()->json(['data' => $project, 'status' => 200], 200);
    }

    public function create(Request $req): JsonResponse
    {
        $project = new Projects;
        $validateRequest = $req->validate($this->creation_validation_rues);
        $project->name = $validateRequest['name'];
        $project->description = $validateRequest['description'];
        $project->deadline = $validateRequest['deadline'];
        $project->complete = false;

        $project->owner = $req->user()->id;

        $project->save();

        return response()->json(['data' => $project, 'status' => 201], 201);

    }

    public function update(Request $req, string $i)
    {
        // Update a project.

        // Cast the project ID to an integer.
        $id = (int) $i;

        // validate fields to update.
        $validateRequest = $req->validate($this->update_validation_rules);

        // Filter out fields that are not set.

        // Update the project.
        $project = Projects::where('id', $id)->get()->first();
        if (!$project) {
            return response()->json(['error' => 'Project not found', 'status' => 404], 404);
        }

        $update = $project->update($validateRequest);
        if (!$update) {
            return response()->json(['error' => 'Project not updated', 'status' => 500], 500);
        }
        return response()->json(['data' => $project, 'status' => 200], 200);
    }

    public function delete(string $id): JsonResponse
    {
        $id = (int) $id;
        $deletion = Projects::where('id', $id)->delete();
        if (!$deletion) {
            return response()->json(['error' => 'Project not deleted', 'status' => 400], 400);
        }
        return response()->json(['status' => 200], 200);
    }

    public function get_all(): JsonResponse
    {
        $projects = DB::table('projects')
            ->join('users', 'projects.owner', '=', 'users.id')
            ->select('users.name as owner', 'projects.name as name', 'description', 'deadline', 'projects.id as id', 'complete')
            ->orderBy('deadline')->get();
        if (count($projects) == 0) {
            return response()->json(['error' => 'No projects found', 'status' => 404], 404);
        }
        return response()->json(['data' => $projects, 'status' => 200], 200);
    }

    public function search(string $search): JsonResponse
    {
        $search = filter_var($search, FILTER_SANITIZE_STRING);
        $projects = Projects::where('name', 'like', '%' . $search . '%')->get();
        if (!$projects) {
            return response()->json(['Error' => 'No projects found', 'status' => 404], 404);
        }
        return response()->json(
            [
                'data' => $projects,
                'status' => 200
            ],
            200
        );
    }
}