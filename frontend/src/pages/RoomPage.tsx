import React, { FC, useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import { useParams } from 'react-router-dom';

export type RoomType = {
  id: number;
  code: string;
  host: string;
  guest_can_pause: boolean;
  votes_to_skip: number;
  created_at: string;
  is_host?: boolean;
};

interface MatchParams {
  roomCode: string;
}

const RoomPage: FC = () => {
  const { roomCode } = useParams<MatchParams>();
  const [roomData, setRoomData] = useState<RoomType>();
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    if (hasLoaded || roomData) return;

    const getRoomDetails = async () => {
      const response = await fetch(`/api/get-room?code=${roomCode}`);
      const data: RoomType = await response.json();

      setRoomData(data);
      setHasLoaded(true);

      console.log('🚀 ~ file: RoomPage.tsx', data);
    };

    getRoomDetails();
  }, [hasLoaded, roomCode, roomData]);

  return (
    <div>
      <p>Code: {roomData?.code}</p>
      <p>Votes To Skip: {roomData?.votes_to_skip}</p>
      <p>Guest Can Pause: {roomData?.guest_can_pause.toString()}</p>
      <p>Is Host: {roomData?.is_host?.toString()}</p>
    </div>
  );
};

export default RoomPage;
