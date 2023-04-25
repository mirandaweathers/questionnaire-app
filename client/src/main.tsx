import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ClientDetailForm from './components/ClientForms/ClientDetailForm';
import { DesignerDashboard } from './components/DesignerDashboard';
import { RoomFormSelection } from './components/ClientForms/RoomFormSelection';
import { LivingRoomForm } from './components/ClientForms/LivingRoomForm';
import { DiningRoomForm } from './components/ClientForms/DiningRoomForm';
import { BedRoomForm } from './components/ClientForms/BedroomForm';

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
  },
  {
    path: "/rooms",
    element: <RoomFormSelection />
  },
  {
    path: "/living-room",
    element: <LivingRoomForm />
  },
  {
    path: "/dining-room",
    element: <DiningRoomForm />
  },
  {
    path: "/bedroom",
    element: <BedRoomForm />
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    {/* <App /> */}
  </React.StrictMode>
)
