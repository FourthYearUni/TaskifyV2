<?php

namespace App\Http\Controllers;

/*
@author: @0verwtch
@desciption: This controller presents methods to query and relate users to ACLs.
Provides basis for authorization carried out by the Watchdog middleware.
*/
use App\Http\Controllers\Controller;
use App\Models\acl_user_assoc;


class AclUserAssocController extends Controller {

    public function create_assoc(int $user_id, int $acl_id)
    {
        $assoc = new acl_user_assoc();
        $assoc->user_id = $user_id;
        $assoc->acl_id = $acl_id;

        $assoc->save();

        return $assoc;
    }

}