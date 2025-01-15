<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class acl extends Model
{
    //
    protected $fillable = ['name', 'description', 'route', 'method', 'action'];


    public function users()
    {
        return $this->belongsToMany(User::class, 'acl_user_assocs', 'acl_id', 'user_id');
    }
}
