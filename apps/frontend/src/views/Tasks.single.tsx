/**
 * @author: @0verwtch
 * @description: This file contains the view for the Single Task page.
 */

// Core libs
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

// Helpers and utilities
import { RootState } from '../redux/store';

// Components and styles
import Nav from '../components/Nav';
import '../assets/css/styles.css';


const SingleTask = () => {
    const { id } = useParams<{ id: string }>();
    const task = useSelector((state: RootState) => state.tasks.tasks.find(task => task.id === Number(id)));

    if (!task) {
        return <div>Task not found</div>;
    }

    const date = new Date(task.deadline).toLocaleDateString('en-US',
        { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    return (
        <div className="body">

            <div className="container">
                <Nav />
                <div className="container-body">

                    <p className="greeting">
                        {task.title} &#128204;
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
                                        @csrf
                                        @method('delete')
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