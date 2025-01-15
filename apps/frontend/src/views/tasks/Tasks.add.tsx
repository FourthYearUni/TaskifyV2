/**
 * @author: @0verwtch
 * @description: This file contains the view for the Create Tasks page
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';

import '../../assets/css/styles.css';
import '../../assets/css/forms.css';

import Nav from '../../components/Nav';
import { CreateTask } from '../../api/tasks';
import { GetAllProjects } from '../../api/projects';

// Redux
import { RootState, AppDispatch } from '../../redux/store';
import { fetchProjects } from '../../redux/slices/project';
import { useSelector } from 'react-redux';


interface Errors {
    title?: string;
    description?: string;
    priority?: string;
    project?: string;
    deadline?: string;
    user_id?: string;
}

const AddTask = () => {
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState<Errors>({});

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const projects = useSelector((state: RootState) => state.projects.projects);

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | HTMLFormElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        CreateTask(formData).then((response) => {
            // TODO: Handle the response with a toast or alert
            if (response.status === 201) {
                alert('Task created successfully');
                navigate('/tasks');
            } else {
                console.log("Setting errors: ", response.errors);
                setErrors(response.errors);
            }
        }).catch((error) => {
            console.log("Error: ", error);
            console.log("FormData: ", formData);
        });
    }

    useEffect(() => {
        dispatch(fetchProjects());
    }, [dispatch])

    console.log("Projects: ", projects);
    return (
        <div className="container">
            < Nav />
            <div className="container-main">
                <div className='form'>

                    <p className="title">Task creation</p>

                    {/* Title */}
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" id="title" onChange={(e) => handleOnChange(e)} />
                    {errors && errors.title && <p className='error-box'>{errors.title}</p>}

                    {/* Description */}
                    <label htmlFor="description">Description</label>
                    <textarea name="description" id="description" onChange={(e) => handleOnChange(e)}></textarea>
                    {errors && errors.description && <p className='error-box'>{errors.description}</p>}

                    {/* Priority */}
                    <label htmlFor="priority">Priority</label>
                    <select name="priority" id="priority" onChange={(e) => handleOnChange(e)}>
                        <option value={1}>Low</option>
                        <option value={2}>Medium</option>
                        <option value={3}>High</option>
                        <option value={4}>Urgent</option>
                    </select>
                    {errors && errors.priority && <p className='error-box'>{errors.priority}</p>}

                    {/* user */}
                    <label htmlFor="priority">User</label>
                    <select name="user_id" id="priority" onChange={(e) => handleOnChange(e)}>
                        <option value={1}>Low</option>
                        <option value={2}>Medium</option>
                        <option value={3}>High</option>
                        <option value={4}>Urgent</option>
                    </select>
                    {errors && errors.user_id && <p className='error-box'>{errors.user_id}</p>}

                    {/* Project */}
                    <label htmlFor="project">Project</label>
                    <select itemType="number" name="project" id="priority" onChange={(e) => handleOnChange(e)}>
                        {projects.length > 0 ?
                            projects.map((project) => (
                                <option value={project.id} key={project.id}>{project.name}</option>
                            )) : <option value={0}>No project was selected</option>}
                    </select>
                    {errors && errors.project && <p className='error-box'>{errors.project}</p>}

                    {/* Deadline */}
                    <label htmlFor="deadline">Deadline </label>
                    <input type="datetime-local" name="deadline" onChange={(e) => handleOnChange(e)} />
                    {errors && errors.deadline && <p className='error-box'>{errors.deadline}</p>}

                    <button type="submit" className='btn-submit' onClick={(e) => handleSubmit(e)}>Create a task</button>

                </div>

            </div>
        </div>
    )
}

export default AddTask;