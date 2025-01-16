/**
 * @author: @0verwtch
 * @description: This file contains the view for the Single Project page.
 */

// Core libs
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { MouseEvent as ReactMouseEvent } from 'react';

// Helpers and utilities
import { AppDispatch, RootState } from '../../redux/store';
import { fetchSingleProject, deleteProject } from '../../redux/slices/project';

// Components and styles
import Nav from '../../components/Nav';
import '../../assets/css/styles.css';
import { useEffect } from 'react';



const SingleProject = () => {
    const { id } = useParams<{ id: string }>();
    const loading = useSelector((state: RootState) => state.projects.loading);
    const projects = useSelector((state: RootState) => state.projects.projects);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Dispatching fetchSingleProject");
        dispatch(fetchSingleProject(Number(id)));
    }, [dispatch, id]);

    const deleteHandler = (e: ReactMouseEvent<HTMLButtonElement>, id: number) => {
        e.preventDefault();
        console.log("Deleting project with id: ", id);
        dispatch(deleteProject(id));
        navigate('/projects');
    }

    const handleRedirect = (e, route: string) => {
        e.preventDefault();
        navigate(route);
    }
    if (projects.length == 0) {
        return (
            <div className="body">

                <div className="container">
                    <Nav />
                    <div className="container-body">

                        <p className="greeting">
                            Loading ... &#128204;
                        </p>
                    </div>

                </div>
            </div>
        )
    }

    if (projects[0] == null) {
        return (
            <div className="body">

                <div className="container">
                    <Nav />
                    <div className="container-body">

                        <p className="greeting">
                            Project not found &#128204;
                        </p>
                    </div>

                </div>
            </div>
        )
    }
    const project = projects[0];

    const date = new Date(project.deadline).toLocaleDateString('en-US',
        { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    return (
        <div className="body">

            <div className="container">
                <Nav />
                <div className="container-body">

                    <p className="greeting">
                        {loading == true ? 'Loading ...' : project.name} &#128204;
                    </p>
                    <p className="date">Due, {date}</p>
                  
                        <div className="item">
                            <div className="item-body" style={{ flexDirection: "column" }}>
                                <h3>Description</h3>
                                <div className="farleft">
                                    <p>{project.description}</p>
                                    <div className="bottom">
                                        <p>Project Manager: @{project.owner}</p>
                                    </div>
                                </div>


                            <div className="action">
                                <form>
                                    <button type="submit" className="btn-delete" onClick={(e) => deleteHandler(e, project.id)}> <i className='fas fa-trash' style={{ color: "white" }} /> Delete</button>
                                    <button className='btn-delete' style={{ marginLeft: "-10%", marginTop: "1%" }} onClick={(e) => handleRedirect(e, `/projects/edit/${project.id}`)}><i className='fas fa-pen' style={{ color: "white" }} /> Edit</button>
                                </form>

                            </div>
                            </div>
                        </div>
                    {/* </a> */}
                </div>

            </div>
        </div>
    )
}

export default SingleProject;