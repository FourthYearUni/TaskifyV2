import { Routes, Route } from 'react-router';
import TaskView from '../views/Tasks.all';
import SingleTaskView from '../views/Tasks.single';

const TaskRouter = () =>  (
    <Routes >
        <Route path='/tasks' element={<TaskView />} />
        <Route path='/tasks/:id' element={<SingleTaskView />} />
    </Routes>
)

export default TaskRouter;