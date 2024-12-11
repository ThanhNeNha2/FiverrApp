import "./App.scss";
import Footer from "./Components/Footer/Footer";
import Navbar from "./Components/Navbar/Navbar";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Gigs from "./Pages/Gigs/Gigs";
import Gig from "./Pages/Gig/Gig";
import Orders from "./Pages/Orders/Orders";
import Add from "./Pages/Add/Add";
import Messages from "./Pages/Messages/Messages";
import Message from "./Pages/Message/Message";
import MyGigs from "./Pages/MyGigs/MyGigs";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Pay from "./Pages/Pay/Pay";
import Success from "./Pages/Success/Success";
import { Toaster } from "react-hot-toast";
const queryClient = new QueryClient();
function App() {
  const LayOut = () => {
    return (
      <div className="App">
        <QueryClientProvider client={queryClient}>
          <Navbar />
          <Outlet />
          <Footer />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </div>
    );
  };
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LayOut />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/myGigs", element: <MyGigs /> },
        { path: "/gigs", element: <Gigs /> },
        { path: "/gig/:id", element: <Gig /> },
        { path: "/orders", element: <Orders /> },
        { path: "/add", element: <Add /> },
        { path: "/messages", element: <Messages /> },
        { path: "/message/:id", element: <Message /> },

        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/pay/:id",
          element: <Pay />,
        },
        {
          path: "/success",
          element: <Success />,
        },
      ],
    },
  ]);
  return (
    <>
      <div>
        <RouterProvider router={router} />
        <Toaster />
      </div>
    </>
  );
}

export default App;
