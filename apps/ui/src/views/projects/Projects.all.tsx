/**
 * @author: @0verwtch
 * @description: This file contains the view for the All Projects page.
 */

// Core libs
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';


// Helpers and utilities
import { RootState, AppDispatch } from '../../redux/store';
import { fetchProjects, fetchSearchProjects } from '../../redux/slices/project';


// Components and styles
import Nav from '../../components/Nav';
import '../../assets/css/styles.css';
import PaginatedBox from '../../components/Pagination';


const AllProjects = () => {
    const date = new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    const projects = useSelector((state: RootState) => state.projects.projects);
    const loading = useSelector((state: RootState) => state.projects.loading);
    const [search, setSearch] = useState("");

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Dispatching fetchProjects");
        dispatch(fetchProjects());
    }, [dispatch]);

    const handleRedirect = (route: string) => {
        navigate(route);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        dispatch(fetchSearchProjects(search));

    }

    if (projects.length == 0) {
        return (
            <div className="body">

                <div className="container">
                    <Nav />
                    <div className="container-body">

                        <p className="greeting">
                            Welcome back,  {localStorage.getItem('taskify-username')}!  &#128075;
                        </p>
                        <p className="greeting">
                            No Projects found &#128204;
                        </p>
                        <a href="/projects/create"><i className="fas fa-plus" /> Add project</a>
                    </div>

                </div>
            </div>
        )
    }

    return (
        <div className="body">

            <div className="container">
                <Nav />
                <div className="container-body">
                    <form className="search">
                        <input placeholder="Search projects" type="text" name="search" onChange={(e) => setSearch(e.target.value)}/>
                        <button type="submit" onClick={(e) => handleSearch(e)}> Search</button>
                    </form>
                    <p className="greeting">
                        Welcome back,  {localStorage.getItem('taskify-username')}!  &#128075;
                    </p>
                    <a href="/projects/create"><i className="fas fa-plus" /> Add project</a>
                    <p className="date">Today, {date}</p>
                    {loading == false ? <PaginatedBox items={GetProjectDivs()} /> : <span>Loading ...</span>}
                </div>

            </div>
        </div>
    )

    function GetProjectDivs() {
        return projects.map(project => <span key={project.id} className="project-links" onClick={() => handleRedirect(`/projects/${project.id}`)}>
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
        );
    }
}

export default AllProjects;