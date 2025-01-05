import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import SubmitImage from './components/SubmitImage.jsx'
import DownloadImage from './components/DownloadImage.jsx'
import DecodeMessage from './components/DecodeMessage.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "",
        element: <SubmitImage/>
      },
      {
        path: "download",
        element: <DownloadImage/>
      },
      {
        path: "decode",
        element: <DecodeMessage/>
      }
    ]
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
