import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './Components/RootLayout/RootLayout';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login'; 
import SignUp from './Components/SignUp/SignUp';
import AdminProfile from './Components/AdminProfile/AdminProfile';
import UserProfile from './Components/UserProfile/UserProfile';
import AddScheme from './Components/AddScheme/AddScheme';
import ViewDetails from './Components/ViewDetails/ViewDetails';

function App() {
  const browserRouter = createBrowserRouter([
    {
      path: '',
      element: <RootLayout />,
      children: [
        {
          path:'/admin=rk',
          element:<AdminProfile/>,
        },
        {
          path:'/admin=rk/add-scheme',
          element:<AddScheme/>,
        },
        {
          path: '',
          element: <Home />,
        },
        {
          path: '/home',
          element: <Home />,
        },
        {
          path: '/login',
          element: <Login />, 
        },
        {
          path: '/signup',
          element: <SignUp />,
        },
        {
          path:'/user-profile/:uname',
          element:<UserProfile/>
        },
        {
          path:'/user-profile/:uname/scheme-view/:schemeid',
          element:<ViewDetails/>
        }
      ],
    },
  ]);

  return <RouterProvider router={browserRouter} />;
}

export default App;
