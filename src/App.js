import Navigation from "./components/Navigation";
import {BrowserRouter, Switch ,Route} from "react-router-dom";
import SignIn from './components/Page/SignIn';
import SignUp from './components/Page/SignUp';
import Home from './components/Page/Home';
import Collection from './components/Page/Collection';
import SongTor from './components/Page/SongTor';
import SongTor_post from "./components/Page/SongTor_post";
import Footer from './components/Page/Footer';
import Profile from './components/Page/Profile';
import EditProfilePost from "./components/Page/EditProfilePost";
import Fav from"./components/Page/Fav";
import UserRoute from "./UserRoute";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navigation/>
        <Switch>
          <Route path="/sign-in" exact component={SignIn}/>
          <Route path="/sign-up" exact component={SignUp}/>
          <Route path='/' exact component={Home}/>        {/* exact made website know that's the 1st page */}
          <Route path="/collection" exact component={Collection}/>
          <UserRoute path="/sell-book" exact component={SongTor}/>
          <Route path="/footer" exact component={Footer}/>
          <UserRoute path="/sell-book-post" exact component={SongTor_post}/>
          <UserRoute path="/profile" exact component={Profile}/>
          <UserRoute path="/edit-post/:slug" exact component={EditProfilePost}/>
          <UserRoute path="/fav-book" exact component={Fav}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;