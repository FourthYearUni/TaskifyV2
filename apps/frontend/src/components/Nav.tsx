const Nav = () => {
    return (<nav className="container-nav">
    <div className="nav-header">
        <p>Taskify</p>
    </div>

    <div className="nav-body">
        <a href="/"> <span className="chevron"> > </span> All tasks</a>
        <a href="/tasks/create"><span className="chevron"> + </span> Add tasks</a>
    </div>

    <div className="nav-footer">
        <p>Built in Huddersfield by <a href="https://github.com/avici1">@avici1</a></p>
    </div>
</nav>
)
}

export default Nav;