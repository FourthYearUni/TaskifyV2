/**
 * @author: @0verwtch
 * @description: This file contains the view for the Create Projects page
 */

// Core libs
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';

// Styles
import '../../assets/css/styles.css';
import '../../assets/css/forms.css';

// Components and utilities
import Nav from '../../components/Nav';
import { UpdateProject } from '../../api/projects';

// Redux
import { RootState, AppDispatch } from '../../redux/store';
import { fetchUsers } from '../../redux/slices/user';
import { fetchSingleProject } from '../../redux/slices/project';
interface Errors {
    name?: string;
    description?: string;
    deadline?: string;
    owner?: string;
}

const UpdateProjectView = () => {
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState<Errors>({});
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const { id } = useParams<{ id: string }>();
    const users = useSelector((state: RootState) => state.users.users);
    const project = useSelector((state: RootState) => state.projects.projects)[0];

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | HTMLFormElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        UpdateProject(Number(id), formData).then((response) => {
            console.log("Response: zzzz ", response);
            // TODO: Handle the response with a toast or alert
            if (response.status === 200) {
                alert('Project updated successfully');
                navigate(`/projects/${id}`);
            } else {
                alert('Project update failed');
                console.log("Setting errors: ", response.errors);
                setErrors(response.errors);
            }
        }).catch((error) => {
            console.log("Error: ", error);
            console.log("FormData: ", formData);
        });
    }

    useEffect(() => { 
        dispatch(fetchUsers())
        if (!project) {
            dispatch(fetchSingleProject(Number(id)));
        }
    }, [])

   
    console.log("Errors: ", errors);
    return (
        <div className="container">
            < Nav />
            <div className="container-main">
                <div className='form'>

                    <p className="title">Project update</p>

                    {/* name */}
                    <label htmlFor="name">Project name</label>
                    <input type="text" name="name" id="title" placeholder={project.name} onChange={(e) => handleOnChange(e)} />
                    {errors && errors.name && <p className='error-box'>{errors.name}</p>}

                    {/* Description */}
                    <label htmlFor="description">Description</label>
                    <textarea name="description" id="description" placeholder={project.description} onChange={(e) => handleOnChange(e)}></textarea>
                    {errors && errors.description && <p className='error-box'>{errors.description}</p>}

                    {/* user */}
                    <label htmlFor="owner">Project manager</label>
                    <select itemType="number" name="owner" id="priority" defaultValue={project.owner} onChange={(e) => handleOnChange(e)}>
                        <option value={0}>Select a user</option>
                        {users.length > 0 ?
                            users.map((user) => (
                                <option value={user.id} key={user.id}>{user.name}</option>
                            )) : <option value={0}>No user was found</option>}
                    </select>
                    {errors && errors.owner && <p className='error-box'>{errors.owner}</p>}
                    
                    {/* Deadline */}
                    <label htmlFor="deadline">Deadline </label>
                    <input type="datetime-local" name="deadline" onChange={(e) => handleOnChange(e)} />
                    {errors && errors.deadline && <p className='error-box'>{errors.deadline}</p>}

                    <button type="submit" className='btn-submit' onClick={(e) => handleSubmit(e)}>Update a project</button>

                </div>

            </div>
        </div>
    )
}

export default UpdateProjectView;