import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from './components/core/Home'
import Detail from "./components/core/Detail";
import Search from "./components/core/Search";
import Category from "./components/core/Category";
import About from "./components/pages/About";
import Contact from "./components/pages/Contact";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Logout from "./components/auth/Logout";
import ForgotPassword from "./components/auth/ForgotPassword";
import CreatePassword from "./components/auth/CreatePassword";
import Dashboard from "./components/dashboard/Dashboard";
import Posts from "./components/dashboard/Posts";
import AddPost from "./components/dashboard/AddPost";
import EditPost from "./components/dashboard/EditPost";
import Comments from "./components/dashboard/Comments";
import Notifications from "./components/dashboard/Notifications";
import Profile from "./components/dashboard/Profile";

import MainWrapper from "./Layouts/MainWrapper";

function App() {
    return (
      <BrowserRouter>
        <MainWrapper>
          <Routes>
            {/* Top-level routes */}
            <Route path="/" element={<Home />} />
            <Route path="/detail/:slug" element={<Detail />} />
            <Route path="/search" element={<Search />} />
            <Route path="/category/:slug" element={<Category />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/create-password" element={<CreatePassword />} />
  
            {/* Dashboard nested routes */}
            <Route path="/dashboard" element={<Dashboard />}>
              <Route index element={<Posts />} />  {/* This replaces the path="/" */}
              <Route path="add-post" element={<AddPost />} />
              <Route path="edit-post/:id" element={<EditPost />} />
              <Route path="comments" element={<Comments />} />
              <Route path="notifications" element={<Notifications />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          </Routes>
        </MainWrapper>
      </BrowserRouter>
    );
  }
  

export default App;