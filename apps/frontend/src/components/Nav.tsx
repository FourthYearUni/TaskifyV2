

const Nav = () => {
    return (
        <nav className="container-nav">
        <div className="nav-header">
            <p>Taskify</p>
        </div>

        <div className="nav-body">
                <a href="/projects"> <i className="fas fa-diagram-project" /> Projects</a>
                <a href="/"> <i className="fas fa-list-check" /> Tasks</a>
        </div>

        <div className="nav-footer">
            <p>Built in Huddersfield by <a href="https://github.com/0verwtch">@0verwtch</a></p>
        </div>
    </nav>
    )
}

export default Nav;