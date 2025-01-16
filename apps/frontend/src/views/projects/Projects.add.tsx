/**
 * @author: @0verwtch
 * @description: This file contains the view for the Create Tasks page
 */

// Core libs
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';

// Styles
import '../../assets/css/styles.css';
import '../../assets/css/forms.css';

// Utilities and components
import Nav from '../../components/Nav';
import { CreateProject } from '../../api/projects';


// redux
import { RootState, AppDispatch } from '../../redux/store';
import { useSelector } from 'react-redux';
import { fetchUsers } from '../../redux/slices/user';

interface Errors { 
    name?: string;
    description?: string;
    deadline?: string;
    owner?: string;
}

const AddProject = () => {
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState<Errors>({});
    
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const users = useSelector((state: RootState) => state.users.users);

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | HTMLFormElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        CreateProject(formData).then((response) => {
            // TODO: Handle the response with a toast or alert
            if (response.status === 201) {
                alert('Project created successfully');
                navigate('/projects');
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
        dispatch(fetchUsers());
    },[dispatch]);
    console.log("Errors: ", errors);
    return (
        <div className="container">
            < Nav />
            <div className="container-main">
                <div className='form'>

                    <p className="title">Task creation</p>
                    
                    {/* name */}
                    <label htmlFor="name">Project name</label>
                    <input type="text" name="name" id="title" onChange={(e) => handleOnChange(e)} />
                    {errors && errors.name && <p className='error-box'>{errors.name}</p>}

                    {/* Description */}
                    <label htmlFor="description">Description</label>
                    <textarea name="description" id="description" onChange={(e) => handleOnChange(e)}></textarea>
                    {errors && errors.description && <p className='error-box'>{errors.description}</p>}
                    
                    {/* user */}
                    <label htmlFor="owner">Project manager</label>
                    <select itemType="number" name="owner" id="priority" onChange={(e) => handleOnChange(e)}>
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

                    <button type="submit" className='btn-submit' onClick={(e) => handleSubmit(e)}>Create a project</button>
                 
                </div>

            </div>
        </div>
    )
}

export default AddProject;