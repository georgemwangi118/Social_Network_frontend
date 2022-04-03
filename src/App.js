import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./core/Navbar";
import Home from "./core/Home";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Profile from "./user/Profile";
import Users from "./user/Users";
import EditProfile from "./user/EditProfile";
import FindPeople from "./user/FindPeople";
import NewPost from "./post/NewPost";
import EditPost from "./post/EditPost";
import SinglePost from "./post/SinglePost";
import PrivateRoute from "./auth/PrivateRoute";
import ForgotPassword from "./user/ForgotPassword";
import ResetPassword from "./user/ResetPassword";
import Admin from "./admin/Admin";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <PrivateRoute path="/admin" component={Admin} />
          <Route path="/forgot-password" component={ForgotPassword} />
          <Route
            path="/reset-password/:resetPasswordToken"
            component={ResetPassword}
          />
          <PrivateRoute path="/post/create" component={NewPost} />
          <Route path="/post/:postId" component={SinglePost} />
          <PrivateRoute path="/post/edit/:postId" component={EditPost} />
          <Route path="/users" component={Users} />
          <Route path="/signup" component={Signup} />
          <Route path="/signin" component={Signin} />
          <PrivateRoute path="/user/edit/:userId" component={EditProfile} />
          <PrivateRoute path="/findpeople" component={FindPeople} />
          <PrivateRoute path="/user/:userId" component={Profile} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
