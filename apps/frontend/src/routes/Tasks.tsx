/**
 * @author @0verwtch
 * @description This file contains the routes for the task views.
 */
import { Route } from 'react-router';
import TaskView from '../views/tasks/Tasks.all';
import SingleTaskView from '../views/tasks/Tasks.single';
import AddTask from '../views/tasks/Tasks.add';
import EditTask from '../views/tasks/Tasks.edit';

import ProtectedRouter from '../components/ProtectedRoute';

const TaskRouter = () => (
    <ProtectedRouter >
        <Route path='/tasks' element={<TaskView />} />
        <Route path='/tasks/:id' element={<SingleTaskView />} />
        <Route path='/tasks/create' element={<AddTask />} />
        <Route path='/tasks/edit/:id' element={<EditTask />} />
    </ProtectedRouter>
)

export default TaskRouter;