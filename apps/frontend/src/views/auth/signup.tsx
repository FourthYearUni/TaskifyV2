/**
 * @author: @0verwtch
 * @description: This file contains the view for the Create Tasks page
 */

import { useState } from 'react';
import { useNavigate } from 'react-router';

import '../../assets/css/styles.css';
import '../../assets/css/forms.css';

import Nav from '../../components/Nav';
import { CreateProject } from '../../api/projects';

interface Errors {
    name?: string,
    email?: string;
    password?: string;
    group?: string;
}

const Signup = () => {
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState<Errors>({});
    const navigate = useNavigate();

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
                // alert('Project created successfully');
                navigate('/');
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

                    <p className="title">Add user</p>

                    {/* Email */}
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" id="email" onChange={(e) => handleOnChange(e)} />
                    {errors && errors.email && <p className='error-box'>{errors.email}</p>}

                    {/* Password */}
                    <label htmlFor="password">Password</label>
                    <input name="password" type="password" id="description" onChange={(e) => handleOnChange(e)} />
                    {errors && errors.password && <p className='error-box'>{errors.password}</p>}
                    
                    {/* Name */}
                    <label htmlFor="name">Name</label>
                    <input name="name" type="text" id="description" onChange={(e) => handleOnChange(e)} />
                    {errors && errors.password && <p className='error-box'>{errors.password}</p>}

                    {/* Group */}
                    <label htmlFor="group">Group</label>
                    <select name="group" id="group" onChange={(e) => handleOnChange(e)}>
                        <option value="user">User</option>
                        <option value="admin">Administrator</option>
                    </select>
                    {errors && errors.group && <p className='error-box'>{errors.group}</p>}

                    <button type="submit" className='btn-submit' onClick={(e) => handleSubmit(e)}>Add user</button>

                </div>

            </div>
        </div>
    )
}

export default Signup;