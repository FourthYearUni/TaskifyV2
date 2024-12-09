import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'

// import './index.css'
import TaskRouter  from './routes/Tasks'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter >
      <>
        <TaskRouter />
      </>
    </BrowserRouter >
  </StrictMode>,
)
