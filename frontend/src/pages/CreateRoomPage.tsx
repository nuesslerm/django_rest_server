import React, { FC, useState } from 'react';
import styled from 'styled-components';
import fetch from 'isomorphic-unfetch';
import {
  Button,
  Grid,
  TextField,
  Typography,
  FormHelperText,
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
  Card,
} from '@material-ui/core';
import { Link } from 'react-router-dom';

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
    const data = await response.json();

    console.log(
      '🚀 ~ file: CreateRoomPage.tsx ~ line 61 ~ handleCreateRoomButtonClick ~ json',
      data
    );
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      style={{ marginTop: '30px', width: '100%' }}
    >
      <Card raised style={{ padding: '30px', borderRadius: '13px' }}>
        <Typography
          component="h4"
          variant="h4"
          style={{ borderBottom: '2px solid black' }}
        >
          Create A Room
        </Typography>
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
            <Grid
              container
              direction="row"
              justify="space-between"
              style={{ padding: '10px 0', width: '100%' }}
            >
              <Button
                color="secondary"
                variant="contained"
                to="/"
                component={Link}
                style={{ padding: '5px 15px' }}
              >
                Back
              </Button>
              <Button
                color="primary"
                variant="contained"
                style={{ padding: '5px 15px' }}
                onClick={handleCreateRoomButtonClick}
              >
                Create A Room
              </Button>
            </Grid>
          </Grid>
        </FormControl>
      </Card>
    </Grid>
  );
};

export default CreateRoomPage;
