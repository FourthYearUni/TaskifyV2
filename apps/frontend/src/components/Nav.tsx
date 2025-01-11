import { useNavigate } from "react-router";


const Nav = () => {
    const navigate = useNavigate();
    const handleRedirect = (e,route: string) => { 
        e.preventDefault();
        navigate(route);
    }
    return (
        <nav className="container-nav">
        <div className="nav-header">
            <p>Taskify</p>
        </div>

        <div className="nav-body">
                <a onClick={(e) => handleRedirect(e, '/projects')}> <i className="fas fa-diagram-project" /> Projects</a>
                <a onClick={(e) => handleRedirect(e, '/')}> <i className="fas fa-list-check" /> Tasks</a>
        </div>

        <div className="nav-footer">
            <p>Built in Huddersfield by <a href="https://github.com/0verwtch">@0verwtch</a></p>
        </div>
    </nav>
    )
}

export default Nav;