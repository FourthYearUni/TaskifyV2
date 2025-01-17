<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use App\Models\Task;


class TasksController extends Controller
{
    // Main task controller.
    protected $rules = [
        'title' => 'required|string|max:100',
        'description' => 'required|string|max:255',
        'priority' => 'required|integer|min:1|max:5',
        'deadline' => 'required|string',
        'project_id' => 'nullable|integer',
        'assigned_to' => 'required|integer'
    ];
    protected $update_rules = [
        'title' => 'nullable|string|max:100',
        'description' => 'nullable|string|max:255',
        'priority' => 'nullable|integer|min:1|max:5',
        'deadline' => 'nullable|string',
        'complete' => 'nullable|boolean',
        'project_id' => 'nullable|integer',
        'assigned_to' => 'nullable|integer'
    ];
    public function get(string $id): JsonResponse
    {
        $id = (int) $id;
        $task = Task::where("tasks.id", $id)
            ->join('users', 'tasks.assigned_to', '=', 'users.id')
            ->select('title', 'description', 'priority', 'deadline','complete', 'users.name as assigned_to', 'project_id', 'tasks.id as id')
            ->get()->first();
        if (!$task) {
            return response()->json(["error" => "Task not found", "status" => 404], 404);
        }
        return response()->json(["data" => $task, "status" => 200], 200);
    }

    public function get_all(): JsonResponse
    {
        $tasks = DB::table('tasks')
            ->join('users', 'tasks.assigned_to', '=', 'users.id')
            ->select('title', 'description', 'priority', 'deadline','complete', 'users.name as assigned_to', 'project_id', 'tasks.id as id')
            ->orderBy('priority')->orderBy('deadline')->get();
        if (count($tasks) == 0) {
            return response()->json(["error" => "Task not found", "status" => 404], 404);
        }
        return response()->json(['data' => $tasks, 'status' => 200], 200);
    }

    public function store(Request $req): JsonResponse
    {
        $task = new Task;
        $req->deadline = date('Y-m-d H:i:s', strtotime($req->date));
        $validateRequest = $req->validate($this->rules);

        $task->title = $validateRequest['title'];
        $task->description = $validateRequest['description'];
        $task->priority = $validateRequest['priority'];
        $task->decayFactor = 1.5;
        $task->deadline = $validateRequest['deadline'];
        $task->complete = false;
        $task->project_id = $validateRequest['project_id'];
        $task->assigned_to = (int)$validateRequest['assigned_to'];
        $task->save();

        return response()->json(['data' => $task, 'status' => 201], 201);
    }

    public function update(Request $req, $id): JsonResponse
    {
        $valid_req = $req->validate($this->update_rules);
        $data = array_filter(array_intersect_key($valid_req, array_flip(['title', 'description', 'priority', 'deadline', 'assigned_to', 'complete'])), function ($val) {
            return !is_null($val);
        });
        $update = Task::where('id', $id)->update($data);
        if (!$update) {
            return response()->json(["error" => "Task not found", "status" => 404], 404);
        }
        return response()->json(['data' => $data, 'status' => 200], 200);
    }

    public function destroy($id): JsonResponse
    {
        $id = (int) $id;
        $deletion = Task::where('id', $id)->delete();
        if (!$deletion) {
            return response()->json(["error" => "Task not deleted", "status" => 400], 400);
        }
        $tasks = DB::table('tasks')->orderBy('priority')->orderBy('deadline')->paginate(5);
        return response()->json(['data' => $tasks, 'status' => 200], 200);
    }

    public function search($search): JsonResponse
    {
        $search = filter_var($search, FILTER_SANITIZE_STRING);
        $search = trim(string: $search);
        $data = Task::whereLike('title', "%" . $search . "%")->orderBy('priority')->orderBy('deadline')->get();
        if (!$data || $data->count() == 0) {
            return response()->json(["error" => "Task not found", "status" => 404], 404);
        }
        return response()->json(['data' => $data, 'status' => 200], 200);
    }

}
