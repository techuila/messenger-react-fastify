import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from '~/components/Login'
import { authenticate } from './lib/utils'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
    loader: authenticate,
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
