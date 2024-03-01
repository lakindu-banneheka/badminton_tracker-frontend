import React, { useEffect, useState } from 'react';
import NavBar from '../../Components/NavBar/NavBar';
import './style.css';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import MatchDetailsModal from './MatchDetailsModal';

const PreviousMatches = () => {
  const [matchData, setMatchData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMatch, setSelectedMatch] = useState(false);

  // Fetch data from the database
  useEffect(() => {
    // Fetch your data here and update matchData state
    const fetchData = async () => {
      try {
        // Example fetch call
        const response = await fetch('http://localhost:3001/matches/get');
        const data = await response.json();
        setMatchData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Filter matches based on search term
  const filteredMatches = matchData.filter(match => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      match.tournament_name.toLowerCase().includes(searchTermLower) ||
      match.match_category.toLowerCase().includes(searchTermLower) ||
      match.age_category.toLowerCase().includes(searchTermLower) ||
      match.match_no.toString().includes(searchTermLower) || // Convert match_no to string for comparison
      match.team1_name.toLowerCase().includes(searchTermLower) ||
      match.team2_name.toLowerCase().includes(searchTermLower)
    );
  });
  
  const handleMoreDetails = (match) => {
    setSelectedMatch(match);
  };

  const handleCloseModal = () => {
    setSelectedMatch(null);
  };

  return (
    <div style={{ height: '100vh' }}>
      <NavBar />
      <div className='container_'>
        <div className='title-wrapper'>
          <Typography
              variant="h4"
              sx={{
                  mr: 2,
                  fontWeight: 700,
                  letterSpacing: '.2rem',
                  color: 'inherit',
                  textDecoration: 'none',
              }}
          >
              PREVIOUS MATCHES/
          </Typography>
        </div>
        <div className='search-wrapper' >
          <div className='search-container'>
            <input
              type="text"
              placeholder="Search by Tournament Name, Match Category, Age Category, Match Number, Team Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <SearchIcon className="search-icon" />
          </div>
        </div>

        <div className='table-wrapper'>
          <Paper 
            style={{ width: '100%', backgroundColor: '#fff', color: '#fff' }}
          >
            <TableContainer 
              sx={{
                backgroundColor: '#fff'
              }} 
            >
              <Table sx={{ minWidth: 650, color: '#fff' }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold', width: '150px', color: '#fff' }}>Date</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', width: '100px', color: '#fff' }}>Match No</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', width: '150px', color: '#fff' }}>Tournament Name</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', width: '150px', color: '#fff' }}>Match Category</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', width: '150px', color: '#fff' }}>Age Category</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', width: '150px', color: '#fff' }}>Team 1 Name</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', width: '150px', color: '#fff' }}>Team 2 Name</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', width: '100px', color: '#fff' }}>Winner</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', width: '150px', color: '#fff' }}>More Details</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredMatches.map((match) => (
                    <TableRow key={match.match_no}>
                      <TableCell sx={{color: '#ddd'}} >{match.date}</TableCell>
                      <TableCell sx={{color: '#ddd'}} >{match.match_no}</TableCell>
                      <TableCell sx={{color: '#ddd'}} >{match.tournament_name}</TableCell>
                      <TableCell sx={{color: '#ddd'}} >{match.match_category}</TableCell>
                      <TableCell sx={{color: '#ddd'}} >{match.age_category}</TableCell>
                      <TableCell sx={{color: '#ddd'}} >{match.team1_name}</TableCell>
                      <TableCell sx={{color: '#ddd'}} >{match.team2_name}</TableCell>
                      <TableCell sx={{color: '#ddd'}} >{match.winner}</TableCell>
                      <TableCell sx={{color: '#fff'}} >
                        <Button variant="contained" color="primary" onClick={() => handleMoreDetails(match)}>
                          More Details
                        </Button>
                        <MatchDetailsModal isOpen={selectedMatch} onClose={handleCloseModal} match={match} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </div>
      </div>
    </div>
  );
};

export default PreviousMatches;
