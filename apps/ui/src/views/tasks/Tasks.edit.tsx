/**
 * @author: @0verwtch
 * @description: This file contains the view for the Create Tasks page
 */

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useDispatch } from 'react-redux';

import '../../assets/css/styles.css';
import '../../assets/css/forms.css';

import Nav from '../../components/Nav';
import { UpdateTask } from '../../api/tasks';

// Redux
import { RootState, AppDispatch } from '../../redux/store';
import { fetchProjects } from '../../redux/slices/project';
import { fetchUsers } from '../../redux/slices/user';
import { useSelector } from 'react-redux';


interface Errors {
    title?: string;
    description?: string;
    priority?: string;
    project?: string;
    deadline?: string;
    user_id?: string;
}

const UpdateTaskView = () => {
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState<Errors>({});

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const { id } = useParams<{ id: string }>();
    const projects = useSelector((state: RootState) => state.projects.projects);
    const users = useSelector((state: RootState) => state.users.users);
    const task = useSelector((state: RootState) => state.tasks.tasks).filter((task) => task.id == Number(id))[0];
   
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | HTMLFormElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        UpdateTask(Number(id), formData).then((response) => {
            console.log("Response: zzzz ", response);
            // TODO: Handle the response with a toast or alert
            if (response.status === 200) {
                alert('Task updated successfully');
                navigate(`/tasks/${id}`);
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
        dispatch(fetchUsers());
    }, [dispatch])
    console.log("Errors: ", errors);
    return (
        <div className="container">
            < Nav />
            <div className="container-main">
                <div className='form'>

                    <p className="title">Task update</p>

                    {/* Title */}
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" id="title" placeholder={task.title}  onChange={(e) => handleOnChange(e)} />
                    {errors && errors.title && <p className='error-box'>{errors.title}</p>}

                    {/* Description */}
                    <label htmlFor="description">Description</label>
                    <textarea name="description" id="description" placeholder={task.description} onChange={(e) => handleOnChange(e)}></textarea>
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
                    <select itemType="number" name="assigned_to" id="priority" onChange={(e) => handleOnChange(e)}>
                        <option value={0}>Select a user</option>
                        {users.length > 0 ?
                            users.map((user) => (
                                <option value={user.id} key={user.id}>{user.name}</option>
                            )) : <option value={0}>No user was found</option>}
                    </select>
                    {errors && errors.user_id && <p className='error-box'>{errors.user_id}</p>}

                    {/* Project */}
                    <label htmlFor="project">Project</label>
                    <select itemType="number" name="project"  id="priority" onChange={(e) => handleOnChange(e)}>
                        <option value={0}>Select a project</option>
                        {projects.length > 0 ?
                            projects.map((project) => (
                                <option value={project.id} key={project.id}>{project.name}</option>
                            )) : <option value={0}>No project was found</option>}
                    </select>
                    {errors && errors.project && <p className='error-box'>{errors.project}</p>}

                    {/* Deadline */}
                    <label htmlFor="deadline">Deadline </label>
                    <input type="datetime-local" name="deadline" onChange={(e) => handleOnChange(e)} />
                    {errors && errors.deadline && <p className='error-box'>{errors.deadline}</p>}
                    {/* Completion */}
                    <label htmlFor="complete">Is Task complete</label>
                    <input  type="checkbox" id="complete" onChange={(e) => { setFormData({"complete": e.target.value == "on" ? true : false})}} />
                    <button type="submit" className='btn-submit' onClick={(e) => handleSubmit(e)}>Update a task</button>

                </div>

            </div>
        </div>
    )
}

export default UpdateTaskView;