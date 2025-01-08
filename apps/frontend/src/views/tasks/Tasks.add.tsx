/**
 * @author: @0verwtch
 * @description: This file contains the view for the Create Tasks page
 */

import { useState } from 'react';
import { useNavigate } from 'react-router';

import '../../assets/css/styles.css';
import '../../assets/css/forms.css';

import Nav from '../../components/Nav';
import { CreateTask } from '../../api/tasks';

const AddTask = () => {
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();

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

    return (
            <div className="container">
                < Nav />
                <div className="container-main">
                    <div  className='form'>

                        <p className="title">Task creation</p>
                        <label htmlFor="title">Title</label>
                        <input type="text" name="title" id="title" onChange={(e) => handleOnChange(e)} />

                        <label htmlFor="description">Description</label>
                        <textarea name="description" id="description" onChange={(e) => handleOnChange(e)}></textarea>

                        <label htmlFor="priority">Priority</label>
                        <select name="priority" id="priority" onChange={(e) => handleOnChange(e)}>
                            <option value={1}>Low</option>
                            <option value={2}>Medium</option>
                            <option value={3}>High</option>
                            <option value={4}>Urgent</option>
                        </select>
                        <label htmlFor="project">Project</label>
                        <select itemType="number" name="project" id="priority" onChange={(e) => handleOnChange(e)}>
                            <option value={1}>Low</option>
                            <option value={2}>Medium</option>
                            <option value={3}>High</option>
                            <option value={4}>Urgent</option>
                        </select>
                        <label htmlFor="deadline">Deadline </label>
                        <input type="datetime-local" name="deadline" onChange={(e) => handleOnChange(e)} />

                        <button type="submit" className='btn-submit' onClick={(e) => handleSubmit(e)}>Create a task</button>

                    </div>
                </div>
            </div>
    )
}

export default AddTask;