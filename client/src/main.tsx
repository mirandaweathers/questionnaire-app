import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ClientDetailForm from './components/ClientDetailForm';
import { DesignerDashboard } from './components/DesignerDashboard';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/client-details",
    element: <ClientDetailForm />
  },
  {
    path: "/dashboard",
    element: <DesignerDashboard />
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    {/* <App /> */}
  </React.StrictMode>
)
