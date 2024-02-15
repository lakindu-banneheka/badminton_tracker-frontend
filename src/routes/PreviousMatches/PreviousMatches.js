import React from 'react';
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

const PreviousMatches = () => {

  function createData(matchNo, player1, player2, player1Score, player2Score, winner) {
    return { matchNo, player1, player2, player1Score, player2Score, winner };
  }
  
  const rows = [
    createData('12', 'navod', 'aruna', 18, 21, 'navod'),
    createData('15', 'navod', 'aruna', 18, 21, 'navod'),
    createData('18', 'navod', 'aruna', 18, 21, 'navod'),
    createData('22', 'navod', 'aruna', 18, 21, 'navod'),
    createData('23', 'navod', 'aruna', 18, 21, 'navod'),
  ];
  return (
    <div style={{height:'100vh'}} >
        <NavBar />  
        <div className='container_' >

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
                    PREVIOUS MATCHS/
                </Typography>
            </div>
            <div className='table-wrapper' >
              <Paper style={{ height: 400, width: '100%', backgroundColor: 'gray', }}>
                <TableContainer >
                  <Table sx={{ minWidth: 650,}} aria-label="simple table">
                    <TableHead>
                      <TableRow  >
                        <TableCell sx={{ fontWeight:'600' }} > Match No </TableCell>
                        <TableCell sx={{ fontWeight:'600' }} > Player/Team 1 </TableCell>
                        <TableCell sx={{ fontWeight:'600' }} > Player/Team 2 </TableCell>
                        <TableCell sx={{ fontWeight:'600' }} > player-1 score </TableCell>
                        <TableCell sx={{ fontWeight:'600' }} > Player-2 score </TableCell>
                        <TableCell sx={{ fontWeight:'600' }} > Winner </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row) => (
                        <TableRow
                          key={row.matchNo}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell component="th" scope="row">
                            {row.matchNo}
                          </TableCell>
                          <TableCell>{row.player1}</TableCell>
                          <TableCell>{row.player2}</TableCell>
                          <TableCell>{row.player1Score}</TableCell>
                          <TableCell>{row.player2Score}</TableCell>
                          <TableCell>{row.winner}</TableCell>

                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </div>
        </div> 
    </div>
  )
}

export default PreviousMatches;