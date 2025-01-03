/**
 * @author: @0verwtch
 * @description: This file contains the view for the Single Task page.
 */

// Core libs
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';

// Helpers and utilities
import { AppDispatch, RootState } from '../redux/store';
import { fetchSingleTask } from '../redux/slices/task';

// Components and styles
import Nav from '../components/Nav';
import '../assets/css/styles.css';
import { useEffect } from 'react';

const deleteHandler = (id: number) => { 

}

const SingleTask = () => {
    const { id } = useParams<{ id: string }>();
    const loading = useSelector((state: RootState) => state.tasks.loading);
    const tasks = useSelector((state: RootState) => state.tasks.tasks);
    const dispatch = useDispatch<AppDispatch>();
    
    useEffect(() => { 
        console.log("Dispatching fetchSingleTask");
        dispatch(fetchSingleTask(Number(id)));
    }, [dispatch, id]);

    if (tasks.length == 0) {
        return (
            <div className="body">

                <div className="container">
                    <Nav />
                    <div className="container-body">

                        <p className="greeting">
                            Loading ... &#128204;
                        </p>
                    </div>

                </div>
            </div>
        )
    }
    const task = tasks[0];

    const date = new Date(task.deadline).toLocaleDateString('en-US',
        { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    return (
        <div className="body">

            <div className="container">
                <Nav />
                <div className="container-body">

                    <p className="greeting">
                        {loading == true? 'Loading ...' : task.title} &#128204;
                    </p>
                    <p className="date">Due, {date}</p>
                    <a className="task-links" href="/tasks/{{$task->id}}">
                        <div className="task">
                            <div className="task-body" style={{ flexDirection: "column" }}>
                                <h3>Description</h3>
                                <div className="farleft">
                                    <p>{ task.description }</p>

                                </div>
                                <div className="action">
                                    <form method="post" action="/tasks/delete/{id}">
                                        <button type="submit" className="btn-delete"> Delete</button>
                                    </form>

                                    <a href={`/tasks/edit/${task.id}`} style={{ marginLeft: "5%" }}>&#128221; Edit</a>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>

            </div>
        </div>
    )
}

export default SingleTask;