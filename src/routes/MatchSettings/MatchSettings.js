import React, { useEffect, useState } from 'react';
import NavBar from '../../Components/NavBar/NavBar';
import './style.css';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from 'react-redux';
import { newMatch } from '../../features/matchSlice';

const MatchSettings = () => {
    const matchDataSelector = useSelector(state => state.match.matchData);
    const dispatch = useDispatch();

    const [matchData, setMatchData] = useState({
        type: '',
        category: '',
        winning_score: 21,
        
        player1_name: '',
        player1_country: '',
        player2_name: '',
        player2_country: '',
        
        player1_score: 0,
        player2_score: 0,
        winner: ''
    });
    
    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;

        setMatchData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };
    
    const handleStartBtn = () => {
        dispatch(newMatch(matchData));

        // scorboards open
    }
      

  return (
    <div style={{height:'100vh'}} >
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
                    NEW MATCH/
                </Typography>
            </div>
            <div className='match-form-wrapper' >
                
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography
                            variant="h6"
                            sx={{
                                mr: 2,
                                fontWeight: 600,
                                letterSpacing: '.1rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            MATCH SETTINGS
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FormControl fullWidth>
                            <InputLabel>Match Type</InputLabel>
                            <Select
                                value={matchData.type}
                                name='type'
                                label="Match Type"
                                onChange={(e) => handleChange(e)}
                            >
                                <MenuItem value={'single'}>Single player</MenuItem>
                                <MenuItem value={'double'}>Double player</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                    <FormControl fullWidth>
                            <InputLabel>Match Category</InputLabel>
                            <Select
                                value={matchData.category}
                                name='category'
                                label="Match Category"
                                onChange={(e) => handleChange(e)}
                            >
                                <MenuItem value={'male'}>Male</MenuItem>
                                <MenuItem value={'female'}>Female</MenuItem>
                                <MenuItem value={'mixed'}>Mixed</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField 
                            label="Winning Score" 
                            variant="outlined" 
                            style={{width:'100%'}} 
                            type='number' 
                            value={matchData.winning_score}
                            name='winning_score'
                            onChange={(e) => handleChange(e)}
                        />
                    </Grid>
                </Grid>
            </div>


            <div className='team-form-wrapper' >
                
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography
                            variant="h6"
                            sx={{
                                mr: 2,
                                fontWeight: 600,
                                letterSpacing: '.1rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            PLAYER/TEAM SETTINGS
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField 
                            label="Player/Team-1 Name (Blue)" 
                            variant="outlined" 
                            style={{width:'100%'}}
                            value={matchData.player1_name}
                            name='player1_name'
                            onChange={(e) => handleChange(e)}  
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField 
                            label="Player/Team 1 country" 
                            variant="outlined" 
                            style={{width:'100%'}}
                            value={matchData.player1_country}
                            name='player1_country'
                            onChange={(e) => handleChange(e)}  
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField 
                            label="Player/Team-2 Name (Red)" 
                            variant="outlined" 
                            style={{width:'100%'}}
                            value={matchData.player2_name}
                            name='player2_name'
                            onChange={(e) => handleChange(e)}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField 
                            label="Player/Team 2 country" 
                            variant="outlined" 
                            style={{width:'100%'}}
                            value={matchData.player2_country}
                            name='player2_country'
                            onChange={(e) => handleChange(e)}    
                        />
                    </Grid>
                </Grid>
            </div>
            <div className='button-wrapper' >
                <Button variant="contained" onClick={handleStartBtn} >Start Match</Button>
            </div>
        </div> 
    </div>
  )
}

export default MatchSettings;