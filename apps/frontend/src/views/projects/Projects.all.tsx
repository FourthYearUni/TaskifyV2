/**
 * @author: @0verwtch
 * @description: This file contains the view for the All Projects page.
 */

// Core libs
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';


// Helpers and utilities
import { RootState, AppDispatch } from '../../redux/store';
import { fetchProjects } from '../../redux/slices/project';


// Components and styles
import Nav from '../../components/Nav';
import '../../assets/css/styles.css';


const AllProjects = () => {
    const date = new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    const projects = useSelector((state: RootState) => state.projects.projects);
    const loading = useSelector((state: RootState) => state.projects.loading);

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchProjects());
    }, [dispatch]);

    const handleRedirect = (route: string) => {
        navigate(route);
    };
    console.log(projects);
    return (
        <div className="body">

            <div className="container">
                <Nav />
                <div className="container-body">
                    <form className="search" action="/projects/search" method="post">
                        <input placeholder="Search projects" type="text" name="search" />
                        <button type="submit"> Search</button>
                    </form>
                    <p className="greeting">
                        Welcome back,  Alain Christian!  &#128075;
                    </p>
                    <a href="/projects/create"><i className="fas fa-plus" /> Add project</a>
                    <p className="date">Today, {date}</p>
                    {loading == false ? projects.map(project =>
                        <span key={project.id} className="project-links" onClick={() => handleRedirect(`/projects/${project.id}`)}>
                            <div className="item">
                                <div className="item-body">
                                    <div className="farleft">
                                        <p>{project.name}</p>
                                        <p>{project.description ? project.description.slice(0, 10) : ''}</p>

                                    </div>
                                    <div className="farright">
                                        {/* <p>{`${new Date().toLocaleDateString()}`}</p> */}
                                        <p>@{project.owner}</p>
                                    </div>

                                </div>
                            </div>
                        </span>
                    ) : <span>Loading ...</span>}
                </div>

            </div>
        </div>
    )
}

export default AllProjects;