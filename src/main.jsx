import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'
import Home from './Pages/Home.jsx'

import Login from './components/Login.jsx'

import EditPost from './Pages/EditPost.jsx'
import AllPost from './Pages/AllPost.jsx'
import Post from './Pages/Post.jsx'
import AddPost from './Pages/AddPost.jsx'
import AuthLayout from './components/AuthLayout';
import Signup from './Pages/Signup.jsx'


const route = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },  
      {
        path: '/login',
        element: (
          <AuthLayout authantication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: '/signup',
        element: (
          <AuthLayout authantication={false}>
            <Signup />
          </AuthLayout>
        ),
      },
      {
        path: '/all-post',
        element: (
          <AuthLayout authantication>
            <AllPost />
          </AuthLayout>
        ),
      },
      {
        path: '/add-posts',
        element: (
          <AuthLayout authantication>
            <AddPost />
          </AuthLayout>
        ),
      },
      {
        path: '/edit-posts/:slug',
        element: (
          <AuthLayout authantication>
            <EditPost />
          </AuthLayout>
        ),
      },
      {
        path: '/post/:slug',
        element: <Post />,
      },
    ],
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={route} />
    </Provider>
  </React.StrictMode>,
)
