import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AppLayout } from './layout/AppLayout'
import { HomePage } from './pages/Home/HomePage'
import { ServiceDetailPage } from './pages/ServiceDetail/ServiceDetailPage'

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/services/:serviceId', element: <ServiceDetailPage /> },
      { path: '*', element: <HomePage /> },
    ],
  },
])

export function App() {
  return <RouterProvider router={router} />
}

export default App
