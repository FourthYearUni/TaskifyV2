/**
 * @author @0verwtch
 * @description Main entry point for the react application
 */

// Core libs

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { Provider } from 'react-redux';
import { Navigate } from 'react-router';

// Redux store

import { store } from './redux/store';

// Components and styles

// Routers
import TaskRouter from './routes/Tasks'
import ProjectRouter from './routes/Project';
import AuthRouter from './routes/auth';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter >
        {localStorage.getItem('taskify-auth-token') ? (<>
          <ProjectRouter />
          <TaskRouter />
        </>) : <Navigate to="/" replace />}
        <AuthRouter />
      </BrowserRouter >
    </Provider>
  </StrictMode>,
)