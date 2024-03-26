import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Item from './components/Item';
import RatingList from './components/RatingList';
import ItemList from './components/ItemList';
import './index.css';
import Rating from './components/Rating';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <ItemList />,
      },
    ],
  },
  {
    path: '/create',
    element: <App />,
    children: [
      {
        path: '/create',
        element: <Item />,
      },
    ],
  },
  {
    path: '/edit/:id',
    element: <App />,
    children: [
      {
        path: '/edit/:id',
        element: <Item />,
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
