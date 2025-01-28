/**
 * @author @0verwtch
 * @description This is the routing file the authX views.
 */

import { Route, Routes } from "react-router";
import Login from "../views/auth/login";
import Signup from "../views/auth/signup";

const AuthRouter = () => (
    <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
    </Routes>
)

export default AuthRouter;