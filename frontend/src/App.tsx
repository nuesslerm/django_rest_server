import React, { FC } from 'react';
import JoinRoomPage from './pages/JoinRoomPage';
import HomePage from './pages/HomePage';
import CreateRoomPage from './pages/CreateRoomPage';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

const App: FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/join" component={JoinRoomPage} />
        <Route path="/create" component={CreateRoomPage} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
