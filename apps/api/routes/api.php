<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TasksController as Task;
use App\Http\Controllers\UserController;

// Protected actions
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/tasks/create', [Task::class, 'store']);
    Route::get('/tasks', [Task::class, 'get_all'])->name('showAllTasks');

    Route::get('/tasks/{id}', [Task::class, 'get'])->name('showTasks');
    Route::patch('/tasks/update/{id}', [Task::class, 'update']);
    Route::delete('/tasks/delete/{id}', [Task::class, 'destroy']);
    Route::get('/tasks/search/{search}', [Task::class, 'search'])->name('searchTasks');
});
// Open actions
Route::post('/login', [UserController::class, 'login']);
Route::post('/register', [UserController::class, 'register']);
