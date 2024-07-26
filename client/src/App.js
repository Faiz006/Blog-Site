import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Write from "./pages/Write";
import Home from "./pages/Home";
import Single from "./pages/Single";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./style.scss";
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import React from 'react';

// Custom component for dynamic responses
const CustomMessage = ({ message }) => (
  <div style={{ margin: '10px', padding: '10px', backgroundColor: '#fff', borderRadius: '5px' }}>
    {message}
  </div>
);

const Layout = () => {
  const theme = {
    background: '#f5f8fb',
    fontFamily: 'Helvetica Neue',
    headerBgColor: '#008afa',
    headerFontColor: '#fff',
    headerFontSize: '15px',
    botBubbleColor: '#008afa',
    botFontColor: '#fff',
    userBubbleColor: '#fff',
    userFontColor: '#4a4a4a',
  };

  const steps = [
    {
      id: '1',
      message: 'Welcome to the blog site! How can I assist you today?',
      trigger: '2',
    },
    {
      id: '2',
      options: [
        { value: 'siteInfo', label: 'Tell me about the site', trigger: '3' },
        { value: 'createPost', label: 'How to create a post?', trigger: '4' },
        { value: 'contactSupport', label: 'Contact support', trigger: '5' },
        { value: 'otherQuestions', label: 'Other questions', trigger: '6' },
      ],
    },
    {
      id: '3',
      message: 'This site is a blog platform where you can create, edit, and read blog posts. You can also manage your posts and interact with other users.',
      trigger: 'end',
    },
    {
      id: '4',
      message: 'To create a post, navigate to the "Write" page from the menu, enter your content, and publish it!',
      trigger: 'end',
    },
    {
      id: '5',
      message: 'You can contact support at support@beblog.com.',
      trigger: 'end',
    },
    {
      id: '6',
      message: 'Please type your question or concern, and I will do my best to assist you.',
      trigger: '8',
    },
    {
      id: '8',
      user: true,
      trigger: '9',
    },
    {
      id: '9',
      message: 'Thank you for your input! I will get back to you shortly.',
      end: true,
    },
    {
      id: 'end',
      component: <CustomMessage message="Thank you for interacting with our chatbot! If you have more questions, feel free to ask." />,
      end: true,
    },
  ];

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
      <ThemeProvider theme={theme}>
        <ChatBot steps={steps} floating={true} />
      </ThemeProvider>
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/post/:id",
        element: <Single />,
      },
      {
        path: "/write",
        element: <Write />,
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

function App() {
  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
