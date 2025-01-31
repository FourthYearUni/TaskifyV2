/**
 * @author @0verwtch
 * @description This file contains the routes for the project views.
 */
import { Route } from 'react-router';

import AllProjectsView from '../views/projects/Projects.all';
import SingleProjectView from '../views/projects/Projects.single';
import AddProjectView from '../views/projects/Projects.add';
import UpdateProjectView from '../views/projects/Projects.edit';

import ProtectedRouter from '../components/ProtectedRoute';


const ProjectRouter = () => (
    <ProtectedRouter>
        <Route path='/projects' element={<AllProjectsView />} />
        <Route path='/projects/:id' element={<SingleProjectView />} />
        <Route path='/projects/create' element={<AddProjectView />} />
        <Route path='/projects/edit/:id' element={<UpdateProjectView />} />
    </ProtectedRouter>
)

export default ProjectRouter;
