import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Workouts from './components/Workouts';
import reportWebVitals from './reportWebVitals';
import Login from './components/Login'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {CookiesProvider} from 'react-cookie';
import Register from './components/Register';
import Exercises from './components/Exercises';
import Progress from './pages/Progress';
import Calendar from './pages/Calendar';


// Routes the user to the respective pages, example: localhost:3000/home shows the App.js
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>,
  },
  {
    path: "/home",
    element: <App/>,
  },
  {
    path: "/workouts",
    element: <Workouts/>,
  },
  {
    path: "/progress",
    element: <Progress/>,
  },
  {
    path: "/calendar",
    element: <Calendar/>,
  },
  {
    path: "/register",
    element: <Register/>
  },
  {path: "/pages/Progress",
   element: <Progress/>
  },
  {path: "/exercises",
   element: <Exercises/>
  }
]);

// Renders the project in the index.html root div
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CookiesProvider>
    <RouterProvider router = {router} />
    </CookiesProvider>
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
