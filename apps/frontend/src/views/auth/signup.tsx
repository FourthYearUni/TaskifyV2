/**
 * @author: @0verwtch
 * @description: This file contains the view for the Create Tasks page
 */

import { useState } from 'react';

import '../../assets/css/styles.css';
import '../../assets/css/forms.css';

import Nav from '../../components/Nav';
import { signup, User } from '../../api/users';

interface Errors {
    name?: string,
    email?: string;
    password?: string;
    group?: string;
    misc?:string;
}

const Signup = () => {
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState<Errors>({});

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | HTMLFormElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        signup(formData as User).then((response) => {
            // TODO: Handle the response with a toast or alert
            console.log(response);
            if (response.status === 200) {
                alert('Project created successfully');
                window.location.href = "/";
            } else {
                alert('Email is already used');
                console.log("Setting errors: ", response.errors);
                if (typeof response.errors == 'string') {
                    setErrors({ misc: response.errors });
                }
                setErrors(response.errors);
            }
        }).catch((error) => {
            console.log("Error: ", error);
            console.log("FormData: ", formData);
        });
    }

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
                        <option value="NaN">Select</option>
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