import Nav from '../components/Nav';

const AllTasks = ({tasks}) => {
    const date  = new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    return (
    <div className="body">

    <div className="container">
       <Nav />
        <div className="container-body">
            <form className="search" action="/tasks/search" method="post">
                @csrf
                <input placeholder="Search tasks" type="text" name="search"/>
                <button type="submit"> Search</button>
            </form>
            <p className="greeting">
                Welcome back,  Alain Christian!  &#128075;
            </p>
            <p className="date">Today, {date}</p>
                { tasks.map(task => {
                    <a className="task-links" href="/tasks/{{$task->id}}">
                        <div className="task">
                            <div className="task-body">
                                <div className="farleft">
                                    <p>{task.title}</p>
                                    <p>{task.description.splice(0, 10)}...</p>

                                </div>
                                <div className="farright">
                                    <p>{`${new Date().toLocaleDateString()}`}</p>
                                    <p>P{task.priority}</p>
                                </div>

                            </div>
                        </div>
                    </a>
                })}
                    <div className="pagination">
                    
                    </div>
        </div>
       
    </div>
</div>
)
}

export default AllTasks;