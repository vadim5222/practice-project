import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router'
import './index.css'
import App from './App.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import LoginPage from './pages/LoginPage.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <h1>Привет</h1>
  },
  {
    path: "/register",
    element: <RegisterPage />
  },
  {
    path: "/login",
    element: <LoginPage/>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </StrictMode>,
)
