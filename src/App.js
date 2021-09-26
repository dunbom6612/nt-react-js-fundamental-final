import { useContext } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import './App.css';
import { authContext } from './AuthContext/authContext';
import Home from './Home/Home';
import Login from './Login/Login';
import PostDetail from './Posts/PostDetail';
import Posts from './Posts/Posts';
import Profile from './Profile/Profile';

const LINK = {
  HOME: '/',
  POSTS: '/posts',
  PROFILE: '/profile',
  LOGIN: '/login',
  POST_DETAIL: '/post/:idPost'
};

function App() {
  const [user, setUser] = useContext(authContext);

  const onHandleLogout = () => {
    setUser(null);
  }
  return (
    <div className='app'>
      <Router>
        <nav className='app__nav'>
          <ul>
            <li>
              <Link to={LINK.HOME}>Home</Link>
            </li>
            <li>
              <Link to={LINK.POSTS}>Posts</Link>
            </li>
            <li>
              <Link to={LINK.PROFILE}>Profile</Link>
            </li>
            <li>
              {user ? (
                <button onClick={onHandleLogout}>{'Log out'}</button>
              ) : (
                <Link to={LINK.LOGIN}>Login</Link>
              )}
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path={LINK.HOME} exact>
            <Home />
          </Route>
          <Route path={LINK.POSTS} exact>
            <Posts />
          </Route>
          <Route path={LINK.PROFILE} exact>
            {user ? <Profile /> : <Login />}
          </Route>
          <Route path={LINK.LOGIN} exact>
            <Login />
          </Route>
          <Route path={LINK.POST_DETAIL} exact>
            <PostDetail />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
