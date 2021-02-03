import React, { FC } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import JoinRoomPage from './pages/JoinRoomPage';
import HomePage from './pages/HomePage';
import CreateRoomPage from './pages/CreateRoomPage';
import RoomPage from './pages/RoomPage';

const App: FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/join" component={JoinRoomPage} />
        <Route path="/create" component={CreateRoomPage} />
        <Route path="/room/:roomCode" component={RoomPage} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
