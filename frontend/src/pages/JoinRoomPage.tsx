import React, { FC } from 'react';
import { TextField, Button, Grid, Typography } from '@material-ui/core';
import CardComponent from '../components/CardComponent';

const JoinRoomPage: FC = () => {
  return (
    <CardComponent
      title={'Join A Room'}
      actionBtnTitle={'Join A Room'}
      onClickAction={() => {}}
      cancelBtnTitle={'Back'}
      navigateBackTo={'/'}
    >
      <TextField
        error={false}
        label="Code"
        placeholder="Enter a Room Code"
      ></TextField>
    </CardComponent>
  );
};

export default JoinRoomPage;
