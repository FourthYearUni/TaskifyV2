/**
 * @author: @0verwtch
 * @description: This file contains the view for the Create Tasks page
 */

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import '../../assets/css/styles.css';
import '../../assets/css/forms.css';

import Nav from '../../components/Nav';
import { CreateTask, GetSingleTask } from '../../api/tasks';
import { RootState } from '../../redux/store';
import { fetchSingleTask } from '../../redux/slices/task';

const AddTask = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { id } = useParams<{ id: string }>();
    const [formData, setFormData] = useState({});
    const task = useSelector((state: RootState) => state.tasks.tasks[0]);
    
    
    useEffect(() => {
        GetSingleTask(Number(id)).then((response) => {
            console.log("Response: ", response);
            dispatch(fetchSingleTask(Number(id)) as any);
            console.log("Task: ", task);
        }).catch((error) => {
            console.log("Error: ", error);
        });
    }, []);

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | HTMLFormElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log("Event fired")
        CreateTask(formData).then((response) => {
            console.log(response);
            // TODO: Handle the response with a toast or alert
            if (response.status === 200) {
                alert('Task created successfully');
                navigate('/');
            } else {
                alert('An error occurred while creating the task');
            }
        }).catch((error) => {
            console.log("Error: ", error);
            console.log("FormData: ", formData);
            alert('An error occurred while creating the task');
        });

    }
    console.log("Task: ", task);
    if (!task) {
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

    return (
        <div className="container">
            < Nav />
            <div className="container-main">
                <div className='form'>

                    <p className="title">Task edit</p>
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" id="title" placeholder={task.title} onChange={(e) => handleOnChange(e)} />

                    <label htmlFor="description">Description</label>
                    <textarea name="description" id="description" placeholder={task.description} onChange={(e) => handleOnChange(e)}></textarea>

                    <label htmlFor="priority">Priority</label>
                    <select name="priority" id="priority" defaultValue={task.priority} onChange={(e) => handleOnChange(e)}>
                        <option value={1}>Low</option>
                        <option value={2}>Medium</option>
                        <option value={3}>High</option>
                        <option value={4}>Urgent</option>
                    </select>
                    <label htmlFor="project">Project</label>
                    <select itemType="number" name="project" defaultValue={task.project} id="priority" onChange={(e) => handleOnChange(e)}>
                        <option value={1}>Low</option>
                        <option value={2}>Medium</option>
                        <option value={3}>High</option>
                        <option value={4}>Urgent</option>
                    </select>
                    <label htmlFor="deadline">Deadline </label>
                    <input type="datetime-local" name="deadline" placeholder={new Date(task.deadline).toLocaleDateString()} onChange={(e) => handleOnChange(e)} />

                    <button type="submit" className='btn-submit' onClick={(e) => handleSubmit(e)}>Update a task</button>

                </div>
            </div>
        </div>
    )
}

export default AddTask;