import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from './components/Base/Header';
import Footer from './components/Base/Footer';
import Posts from './components/Posts/Posts';
import SinglePost from './components/Posts/SinglePost';
import Tags from './components/Tags/Tags';
import { LoginRoute,LoggedRoute } from './components/Routing';
import NotFound from './components/NotFound';
import { Login, Register, ForgotPassword } from "./components/Auth";
import { User, UserFavorites, UserAccount } from './components/User';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path='/' exact component={ Posts } />

        <Route exact path='/posts' component={ Posts } />
        <Route path='/posts/:post_id' component={ SinglePost } />
        <Route exact path='/tags' component={ Tags } />
        <Route exact path='/user/:username' component={ User } />
        <Route exact path='/user/:username/favorites' component={ UserFavorites } />
        <LoggedRoute exact path='/account'> <UserAccount /> </LoggedRoute>

        <LoginRoute path='/login'> <Login /> </LoginRoute>
        <LoginRoute path='/register'> <Register /> </LoginRoute>
        <LoginRoute path='/forgot-password'> <ForgotPassword /> </LoginRoute>

        <Route path="*" component={ NotFound } />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}
