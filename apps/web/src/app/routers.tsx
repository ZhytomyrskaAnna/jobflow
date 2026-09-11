import { createBrowserRouter } from "react-router-dom";

import { HomePage} from "../pages/Homepage";
import { HealthPage } from "../pages/HealthPage";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
    },
    {
        path: '/health',
        element: <HealthPage />,
    },
]);