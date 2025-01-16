/**
 * @author: @0verwtch
 * @description: This file contains the view for the Create Tasks page
 */

import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router';

import '../../assets/css/styles.css';
import '../../assets/css/forms.css';

import Nav from '../../components/Nav';
import { login, User } from '../../api/users';

interface Errors {
    email?: string;
    password?: string;
}

const Login = () => {
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
        login(formData as User).then((response) => {
            // TODO: Handle the response with a toast or alert
            if (response.status === 200) {
                localStorage.setItem('taskify-auth-token', response.token);
                localStorage.setItem('taskify-username', response.name);
                alert('Logged in successfully');
                window.location.href = "/tasks";
                console.log("Attempted a redirection");

            } else {
                alert('Wrong credentials');
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

                    <p className="title">Login</p>

                    {/* Email */}
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" id="email" onChange={(e) => handleOnChange(e)} />
                    {errors && errors.email && <p className='error-box'>{errors.email}</p>}

                    {/* Password */}
                    <label htmlFor="password">Password</label>
                    <input name="password" id="passsword" type="password" onChange={(e) => handleOnChange(e)} />
                    {errors && errors.password && <p className='error-box'>{errors.password}</p>}

                    <button type="submit" className='btn-submit' onClick={(e) => handleSubmit(e)}>Login here.</button>

                </div>

            </div>
        </div>
    )
}

export default Login;