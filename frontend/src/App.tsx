import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AppLayout } from './layout/AppLayout'
import { HomePage } from './pages/Home/HomePage'
import { ServiceDetailPage } from './pages/ServiceDetail/ServiceDetailPage'
import DocumentChecklistPage from './components/chatbot/DocumentChecklistPage'

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/services/:serviceId', element: <ServiceDetailPage /> },
      { path: '*', element: <HomePage /> },
      { path: '/services/:serviceId/checklist', element: <DocumentChecklistPage /> },
    ],
  },
])

export function App() {
  return <RouterProvider router={router} />
}

export default App
