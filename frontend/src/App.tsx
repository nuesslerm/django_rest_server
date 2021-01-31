import React, { FC } from 'react';
import CreateRoomPage from './pages/CreateRoomPage';
import HomePage from './pages/HomePage';
import JoinRoomPage from './pages/JoinRoomPage';
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom';

const App: FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/join" component={JoinRoomPage} />
        <Route path="/create" component={CreateRoomPage} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
