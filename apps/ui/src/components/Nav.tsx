import { useNavigate } from "react-router";


const Nav = () => {
    const navigate = useNavigate();
    const token = window.localStorage.getItem('taskify-auth-token');
    console.log("Token is below", token);
    const handleRedirect = (e, route: string, exit: boolean = false) => {
        e.preventDefault();
        if (exit) {
            localStorage.clear();
        }
        console.log('redirecting')
        navigate(route);
    }
    return (
        <nav className="container-nav">
            <div className="nav-header">
                <p>Taskify</p>
            </div>

            <div className="nav-body">
                {token != null ? (
                    <>
                        <a onClick={(e) => handleRedirect(e, '/projects')}> <i className="fas fa-diagram-project" /> Projects</a>
                        <a onClick={(e) => handleRedirect(e, '/tasks')}> <i className="fas fa-list-check" /> Tasks</a>
                    </>) : (<>
                        <a onClick={(e) => handleRedirect(e, '/')}> <i className="fas fa-angle-double-right" /> Login</a>
                        <a onClick={(e) => handleRedirect(e, '/signup')}> <i className="fas fa-plus" /> Signup</a></>
                )}

            </div>

            <div className="nav-footer">
                <p>Built in Huddersfield by <a href="https://github.com/0verwtch">@0verwtch</a></p>
                {token != null && (<a style={{ "cursor": "pointer" }} onClick={(e) => handleRedirect(e, '/', true)}> <i className="fas fa-angle-double-left" /> Logout </a>
                )}
            </div>
        </nav>
    )
}

export default Nav;