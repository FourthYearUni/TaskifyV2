import { Routes, Route } from 'react-router';
import TaskView from '../views/Tasks.all';

const TaskRouter = () =>  (
    <Routes >
        <Route path='/tasks' element={<TaskView />}/>
    </Routes>
)

export default TaskRouter;