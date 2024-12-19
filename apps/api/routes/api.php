<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController as Task;
use App\Http\Controllers\UserController;

// Protected actions
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/', [Task::class, 'get_all'])->name('showAllTasks');
    Route::post('/tasks/store', [Task::class, 'store']);

    Route::view('/tasks/create', 'task.create');
    Route::view('/tasks/edit/{id}', 'task.edit');

    Route::get('/tasks/{id}', [Task::class, 'get'])->name('showTasks');
    Route::patch('/tasks/update/{id}', [Task::class, 'update']);
    Route::delete('/tasks/delete/{id}', [Task::class, 'destroy']);
    Route::post('/tasks/search', [Task::class, 'search'])->name('searchTasks');
});
// Open actions
Route::post('/login', [UserController::class, 'login']);
Route::post('/register', [UserController::class, 'register']);
