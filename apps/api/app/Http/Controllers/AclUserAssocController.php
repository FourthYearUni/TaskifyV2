<!-- 
@author: @0verwtch
@desciption: This controller presents methods to query and relate users to ACLs.
Provides basis for authorization carried out by the Watchdog middleware.
-->
<?php
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Models\acl_user_assoc;


class AclUserAssocStructure
{
    // This class represents what a representational object of the principal model
    // looks like. this is essential in creating instances of the principal model without using
    // generic routing.

    public int $user_id;
    public int $acl_id;

    public function __construct(int $user_id, int $acl_id, $action)
    {

    }
}

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