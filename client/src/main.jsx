import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Record from './components/Record';
import RatingList from './components/RatingList';
import RecordList from './components/RecordList';
import './index.css';
import Rating from './components/Rating';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <RecordList />,
      },
    ],
  },
  {
    path: '/create',
    element: <App />,
    children: [
      {
        path: '/create',
        element: <Record />,
      },
    ],
  },
  {
    path: '/edit/:id',
    element: <App />,
    children: [
      {
        path: '/edit/:id',
        element: <Record />,
      },
    ],
  },
  {
    path: '/rate/:id',
    element: <App />,
    children: [
      {
        path: '/rate/:id',
        element: <Rating />,
      },
    ],
  },
  {
    path: '/:id',
    element: <App />,
    children: [
      {
        path: '/:id',
        element: <RatingList />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
