import React, { FC, useState } from 'react';
import styled from 'styled-components';
import fetch from 'isomorphic-unfetch';
import {
  Grid,
  TextField,
  Typography,
  FormHelperText,
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { RoomType } from './RoomPage';
import CardComponent from '../components/CardComponent';

const StyledTextField = styled(TextField)`
  > label {
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 225px;
    overflow: hidden;
  }

  input {
    text-align: center;
  }
`;

const CreateRoomPage: FC = () => {
  const defaultVotes = 2;

  const [guestCanPause, setGuestCanPause] = useState<boolean>(true);
  const [votesToSkip, setVotesToSkip] = useState<number>(defaultVotes);

  const history = useHistory();

  const handleGuestCanPauseChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setGuestCanPause(event.target.value == 'true' ? true : false);
  };

  const handleVoteChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setVotesToSkip(parseInt(event.target.value, 10));
  };

  const handleCreateRoomButtonClick = async () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        votes_to_skip: votesToSkip,
        guest_can_pause: guestCanPause,
      }),
    };

    const response = await fetch('/api/create-room', requestOptions);
    const { code }: RoomType = await response.json();
    history.push(`/room/${code}`);
  };

  return (
    <CardComponent
      title={'Create A Room'}
      actionBtnTitle={'Create A Room'}
      onClickAction={handleCreateRoomButtonClick}
      cancelBtnTitle={'Back'}
      navigateBackTo={'/'}
    >
      <FormControl component="form">
        <Grid
          container
          direction="column"
          alignItems="center"
          style={{ padding: '15px 0' }}
        >
          <FormHelperText>Guest Control of Playback State</FormHelperText>
          <RadioGroup
            row
            defaultValue="true"
            onChange={handleGuestCanPauseChange}
          >
            <FormControlLabel
              value="true"
              control={<Radio color="primary" />}
              label={
                <Typography style={{ fontSize: '0.95rem' }}>
                  Play/Pause
                </Typography>
              }
              labelPlacement="bottom"
            />
            <FormControlLabel
              value="false"
              control={<Radio color="secondary" />}
              label={
                <Typography style={{ fontSize: '0.95rem' }}>
                  No Control
                </Typography>
              }
              labelPlacement="bottom"
            />
          </RadioGroup>
          <StyledTextField
            variant="standard"
            label="Votes To Skip Song"
            margin="normal"
            required={true}
            type="number"
            defaultValue={defaultVotes}
            inputProps={{
              min: 1,
            }}
            onChange={handleVoteChange}
          />
        </Grid>
      </FormControl>
    </CardComponent>
  );
};

export default CreateRoomPage;
