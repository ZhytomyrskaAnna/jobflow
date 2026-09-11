import { RouterProvider } from 'react-router-dom';
import { router } from './routers.tsx';

export function App() {
  return <RouterProvider router={router} />;
}