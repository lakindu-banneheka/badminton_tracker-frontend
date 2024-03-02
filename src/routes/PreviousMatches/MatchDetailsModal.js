import React from 'react';
import Modal from '@mui/material/Modal';
import { Typography, Button } from '@mui/material';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  maxHeight: '80%',
  overflowY: 'auto',
  backgroundColor: '#fff',
  padding: 20,
  borderRadius: 8,
};

const buttonContainerStyle = {
  marginTop: 30,
  textAlign: 'center',
};

const textContainerStyle = {
  marginTop: 20,
};

const MatchDetailsModal = ({ isOpen, onClose, match }) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <div style={modalStyle}>
        <Typography variant="h5" style={{ fontWeight: 'bold', textAlign: 'center', marginBottom: 10 }}>Match Details</Typography>
        <div style={textContainerStyle}>
          <Typography><strong>Tournament Name:</strong> {match.tournament_name}</Typography>
          <Typography><strong>Date:</strong> {match.date}</Typography>
          <Typography><strong>Time:</strong> {match.time}</Typography>
          <Typography><strong>Match No:</strong> {match.match_no}</Typography>
          <Typography><strong>Match Category:</strong> {match.match_category}</Typography>
          <Typography><strong>Age Category:</strong> {match.age_category}</Typography>
          <Typography><strong>Game Point:</strong> {match.game_point}</Typography>
          <Typography><strong>Interval Point:</strong> {match.interval_point}</Typography>
          <Typography><strong>Game Cap:</strong> {match.game_cap}</Typography>
          <Typography><strong>Number of Sets:</strong> {match.num_of_sets}</Typography>
          <Typography><strong>Interval Time:</strong> {match.interval_time}</Typography>
          <Typography><strong>Team 1 Name:</strong> {match.team1_name}</Typography>
          <Typography><strong>Team 1 Player 1 Name:</strong> {match.team1_player1_name}</Typography>
          <Typography><strong>Team 1 Player 2 Name:</strong> {match.team1_player2_name}</Typography>
          <Typography><strong>Team 1 Country:</strong> {match.team1_country}</Typography>
          <Typography><strong>Team 1 Club:</strong> {match.team1_club}</Typography>
          <Typography><strong>Team 2 Name:</strong> {match.team2_name}</Typography>
          <Typography><strong>Team 2 Player 1 Name:</strong> {match.team2_player1_name}</Typography>
          <Typography><strong>Team 2 Player 2 Name:</strong> {match.team2_player2_name}</Typography>
          <Typography><strong>Team 2 Country:</strong> {match.team2_country}</Typography>
          <Typography><strong>Team 2 Club:</strong> {match.team2_club}</Typography>
          <Typography><strong>Team 1 Game Points Set:</strong> {match.team_1_game_points_set_i.join(', ')}</Typography>
          <Typography><strong>Team 2 Game Points Set:</strong> {match.team_2_game_points_set_i.join(', ')}</Typography>
          <Typography><strong>Set Winners:</strong> {match.set_winner_i.join(', ')}</Typography>
          <Typography><strong>Winner:</strong> {match.winner}</Typography>
        </div>
        <div style={buttonContainerStyle}>
          <Button variant="contained" color="primary" onClick={onClose}>Close</Button>
        </div>
      </div>
    </Modal>
  );
};

export default MatchDetailsModal;
