/**
 * @author @0verwtch
 * @description Main entry point for the react application
 */

// Core libs

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { Provider } from 'react-redux';

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
        <ProjectRouter />
        <TaskRouter />
        <AuthRouter />
      </BrowserRouter >
    </Provider>
  </StrictMode>,
)