/**
 * @author: @0verwtch
 * @description: This file contains the view for the All Tasks page.
 */

// Core libs
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

// Helpers and utilities
import { RootState, AppDispatch } from '../../redux/store';
import { fetchTasks, fetchSearchTasks } from '../../redux/slices/task';


// Components and styles
import Nav from '../../components/Nav';
import '../../assets/css/styles.css';
import PaginatedBox from '../../components/Pagination';


const AllTasks = () => {
    const date = new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    const tasks = useSelector((state: RootState) => state.tasks.tasks);
    const loading = useSelector((state: RootState) => state.tasks.loading);
    const [search, setSearch] = useState("");

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

    const handleRedirect = (route: string) => {
        navigate(route);
    };

    if (!tasks || tasks.length == 0) {
        return (
            <div className="body">

                <div className="container">
                    <Nav />
                    <div className="container-body">

                        <p className="greeting">
                            Welcome back,  {localStorage.getItem('taskify-username')}!  &#128075;
                        </p>
                        <p className="greeting">
                            No tasks found &#128204;
                        </p>
                        <a href="/tasks/create"><i className="fas fa-plus" /> Add a task</a>
                    </div>

                </div>
            </div>
        )
    }
    const handleSearch = (e) => {
        e.preventDefault();
        dispatch(fetchSearchTasks(search));

    }
    return (
        <div className="body">

            <div className="container">
                <Nav />
                <div className="container-body">
                    <form className="search">
                        <input placeholder="Search projects" type="text" name="search" onChange={(e) => setSearch(e.target.value)} />
                        <button type="submit" onClick={(e) => handleSearch(e)}> Search</button>
                    </form>
                    <p className="greeting">
                        Welcome back,  Alain Christian!  &#128075;
                    </p>
                    <a href="/tasks/create"><i className="fas fa-plus" /> Add a task</a>
                    <p className="date">Today, {date}</p>
                    {loading == false ? <PaginatedBox items={RenderTasks()} /> : <span>Loading ...</span>}
                </div>

            </div>
        </div>
    )

    function RenderTasks() {
        return tasks.map(task => <span key={task.id} className="task-links" onClick={() => handleRedirect(`/tasks/${task.id}`)}>
            <div className="item">
                <div className="item-body">
                    <div className="farleft">
                        <p>{task.title}</p>
                        <p>{task.description ? task.description.slice(0, 10) : ''}...</p>

                    </div>
                    <div className="farright">
                        <p>{`${new Date().toLocaleDateString()}`}</p>
                        <p>@{task.assigned_to}</p>
                        <p>P{task.priority}</p>
                    </div>

                </div>
            </div>
        </span>
        );
    }
}

export default AllTasks;