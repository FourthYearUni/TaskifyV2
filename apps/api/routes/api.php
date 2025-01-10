<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TasksController as Task;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProjectsController as Project;

// Protected actions
Route::middleware('auth:sanctum')->group(function () {
    // Tasks
    Route::post('/tasks/create', [Task::class, 'store']);
    Route::get('/tasks', [Task::class, 'get_all'])->name('showAllTasks');

    Route::get('/tasks/{id}', [Task::class, 'get'])->name('showTasks');
    Route::patch('/tasks/update/{id}', [Task::class, 'update']);
    Route::delete('/tasks/delete/{id}', [Task::class, 'destroy']);
    Route::get('/tasks/search/{search}', [Task::class, 'search'])->name('searchTasks');

    // Projects
    Route::post('/projects/create', [Project::class, 'create']);
    Route::get('/projects', [Project::class, 'get_all']);
    Route::get('/projects/search/{search}', [Project::class, 'search']);
    Route::get('/projects/single/{id}', [Project::class, 'get_single']);
    Route::patch('/projects/update/{id}', [Project::class, 'update']);
    Route::delete('/projects/delete/{id}', [Project::class, 'delete']);
});
// Open actions
Route::post('/login', [UserController::class, 'login']);
Route::post('/register', [UserController::class, 'register']);
