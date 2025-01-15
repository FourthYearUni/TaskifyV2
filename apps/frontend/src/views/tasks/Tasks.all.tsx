/**
 * @author: @0verwtch
 * @description: This file contains the view for the All Tasks page.
 */

// Core libs
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

// Helpers and utilities
import { RootState, AppDispatch } from '../../redux/store';
import { fetchTasks, } from '../../redux/slices/task';


// Components and styles
import Nav from '../../components/Nav';
import '../../assets/css/styles.css';


const AllTasks = () => {
    const date = new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    const tasks = useSelector((state: RootState) => state.tasks.tasks);
    const loading = useSelector((state: RootState) => state.tasks.loading);

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
                            No tasks found &#128204;
                        </p>
                        <a href="/tasks/create"><i className="fas fa-plus" /> Add a task</a>
                    </div>

                </div>
            </div>
        )
    }
    return (
        <div className="body">

            <div className="container">
                <Nav />
                <div className="container-body">
                    <form className="search" action="/tasks/search" method="post">
                        <input placeholder="Search tasks" type="text" name="search" />
                        <button type="submit"> Search</button>
                    </form>
                    <p className="greeting">
                        Welcome back,  Alain Christian!  &#128075;
                    </p>
                    <a href="/tasks/create"><i className="fas fa-plus" /> Add a task</a>
                    <p className="date">Today, {date}</p>
                    {loading == false ? tasks.map(task =>
                        <span key={task.id} className="task-links" onClick={() => handleRedirect(`/tasks/${task.id}`)}>
                            <div className="item">
                                <div className="item-body">
                                    <div className="farleft">
                                        <p>{task.title}</p>
                                        <p>{task.description ? task.description.slice(0, 10) : ''}...</p>

                                    </div>
                                    <div className="farright">
                                        <p>{`${new Date().toLocaleDateString()}`}</p>
                                        <p>P{task.priority}</p>
                                    </div>

                                </div>
                            </div>
                        </span>
                    ) : <span>Loading ...</span>}
                </div>

            </div>
        </div>
    )
}

export default AllTasks;