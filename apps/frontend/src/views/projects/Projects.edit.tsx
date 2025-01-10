/**
 * @author: @0verwtch
 * @description: This file contains the view for the Create Projects page
 */

import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import '../../assets/css/styles.css';
import '../../assets/css/forms.css';

import Nav from '../../components/Nav';
import { UpdateProject } from '../../api/projects';

interface Errors {
    name?: string;
    description?: string;
    deadline?: string;
    owner?: string;
}

const UpdateProjectView = () => {
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState<Errors>({});
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

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
                console.log("Setting errors: ", response.errors);
                setErrors(response.errors);
            }
        }).catch((error) => {
            console.log("Error: ", error);
            console.log("FormData: ", formData);
        });
    }

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
                    <label htmlFor="priority">Project manager</label>
                    <select name="owner" id="priority" onChange={(e) => handleOnChange(e)}>
                        <option value={1}>Low</option>
                        <option value={2}>Medium</option>
                        <option value={3}>High</option>
                        <option value={4}>Urgent</option>
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