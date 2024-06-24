import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import Login from './components/Login';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import GameList from './components/GameList';
import GameDetails from './components/GameDetails';

const ProtectedRoute = ({ element: Element }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated')
  return isAuthenticated === "true" ? <Element /> : <Navigate to="/" />
}

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/games",
    element: <ProtectedRoute element={GameList} />
  },
  {
    path: "/games/:id",
    element: <ProtectedRoute element={GameDetails} />
  }
])

function App() {
  return (
    <ChakraProvider >
      <RouterProvider router={routes} />
    </ChakraProvider>
  )
}

export default App;
