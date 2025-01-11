<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Projects extends Model
{
    //
    protected $fillable = ['name', 'description', 'owner', 'deadline', 'complete'];

    public function owner()
    {
        return $this->belongsTo(User::class, 'owner');
    }
    public function tasks()
    {
        return $this->hasMany(Task::class, 'project_id');
    }
}
