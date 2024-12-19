<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;
use App\Models\Task;
use Illuminate\View\View;

class TaskController extends Controller
{
    // Main task controller.
    protected $rules = [
        'title' => 'required|string|max:100',
        'description' => 'required|string|max:255',
        'priority' => 'required|integer|min:1|max:5',
        'deadline' => 'required|date|after_or_equal:today'
    ];
    protected $update_rules = [
        'title' => 'nullable|string|max:100',
        'description' => 'nullable|string|max:255',
        'priority' => 'nullable|integer|min:1|max:5',
        'deadline' => 'nullable|date|after_or_equal:today'
    ];
    public function get(string $id):View
    {
        $id = (int) $id;
        $task = Task::where("id", $id)->get()->first();
        return view('task.show', ['task' => $task]);
    }

    public function get_all():View
    {
        $tasks = DB::table('tasks')->orderBy('priority')->orderBy('deadline')->paginate(5);
        return view('task.show_all', ['tasks' => $tasks]);
    }

    public function store(Request $req): RedirectResponse
    {
        $task = new Task;
        $validateRequest = $req->validate($this->rules);

        $task->title = $validateRequest['title'];
        $task->description = $validateRequest['description'];
        $task->priority = $validateRequest['priority'];
        $task->decayFactor = 1.5;
        $task->deadline = $validateRequest['deadline'];
        $task->complete = false;
        $task->save();
        return redirect()->route('showTasks', ['id' => $task->id]);
    }

    public function update(Request $req, $id): RedirectResponse
    {
        $valid_req = $req->validate($this->update_rules);
        $data = array_filter($req->only(['title', 'description', 'priority', 'deadline']), function ($val) {
            return !is_null($val);
        });
        Task::where('id', $id)->update($data);
        return redirect()->route('showTasks', ['id' => $id]);
    }

    public function destroy($id): View
    {
        $id = (int) $id;
        Task::where('id', $id)->delete();
        return view('task.show_all', ['tasks' => DB::table('tasks')->orderBy('priority')->orderBy('deadline')->paginate(5) ]);
    }

    public function search(Request $req): View
    {
        $search = $req->search;
        $data = Task::whereLike('title', "%".$search."%")->orderBy('priority')->orderBy('deadline')->paginate(5);
        return view('task.show_all', ['tasks' => $data]);
    }

}
