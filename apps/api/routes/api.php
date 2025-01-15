<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TasksController as Task;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProjectsController as Project;
use App\Http\Controllers\Acl as ACL;

// Protected actions
Route::middleware('auth:sanctum')->group(function () {

    // Tasks
    Route::group(['middleware' => 'guard'], function () {
        Route::get('/tasks', [Task::class, 'get_all'])->name('showAllTasks');
        Route::post('/tasks/create', [Task::class, 'store']);
        Route::get('/tasks/single/{id}', [Task::class, 'get'])->name('showTasks');
        Route::get('/tasks/search/{search}', [Task::class, 'search'])->name('searchTasks');
        Route::patch('/tasks/update/{id}', [Task::class, 'update']);
        Route::delete('/tasks/delete/{id}', [Task::class, 'destroy']);
    });


    // Projects
    Route::group(['middleware' => 'guard'], function () {
        Route::post('/projects', [Project::class, 'get_all']);
        Route::post('/projects/create', [Project::class, 'create']);
        Route::get('/projects/search/{search}', [Project::class, 'search']);
        Route::get('/projects/single/{id}', [Project::class, 'get_single']);
        Route::patch('/projects/update/{id}', [Project::class, 'update']);
        Route::delete('/projects/delete/{id}', [Project::class, 'delete']);
    });

    // ACLs
    Route::group(['middleware' => 'guard'], function () {
        Route::get('/acl', [ACL::class, 'get_all']);
        Route::post('/acls/create', [ACL::class, 'create_acl']);
        Route::patch('/acl/update/{id}', [ACL::class, 'update_acl']);
        Route::delete('/acl/delete/{id}', [ACL::class, 'delete_acl']);

    });
});
// Open actions
Route::post('/login', [UserController::class, 'login']);
Route::post('/register', [UserController::class, 'register']);
