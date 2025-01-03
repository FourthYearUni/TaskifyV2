import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { Provider } from 'react-redux';
import { store } from './redux/store';

// import './index.css'
import TaskRouter from './routes/Tasks'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter >
        <>
          <TaskRouter />
        </>
      </BrowserRouter >
    </Provider>
  </StrictMode>,
)