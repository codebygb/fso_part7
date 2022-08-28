import "./App.css";
import Login from "./components/Login/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BlogCard from "./components/BlogCard/BlogCard";
import BlogList from "./components/BlogList/BlogList";
import NavBar from "./components/NavBar/NavBar";
import RequireAuth from "./components/RequiredAuth/RequireAuth";
import BlogForm from "./components/BlogForm/BlogForm";
import BlogView from "./components/BlogView/BlogView";
import UserList from "./components/UserList/UserList";

function App() {
  return (
    <Router>
      <NavBar />
      <main className="app">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/blogform"
            element={
              <RequireAuth>
                <BlogForm />
              </RequireAuth>
            }
          />
          <Route
            path="/blogcard"
            element={
              <RequireAuth>
                <BlogCard />
              </RequireAuth>
            }
          />
          <Route
            path="/bloglist"
            element={
              <RequireAuth>
                <BlogList />
              </RequireAuth>
            }
          />
          <Route
            path="/blog"
            element={
              <RequireAuth>
                <BlogView />
              </RequireAuth>
            }
          />
          <Route
            path="/blog/:blogId"
            element={
              <RequireAuth>
                <BlogView />
              </RequireAuth>
            }
          />
          <Route
            path="/users"
            element={
              <RequireAuth>
                <UserList />
              </RequireAuth>
            }
          />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
