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
import { getDate, getTime } from '../../Components/getDateTime';

const MatchSettings = () => {
    const matchDataSelector = useSelector(state => state.match.matchData);
    const dispatch = useDispatch();

    // step form 
    const [step, setStep] = useState(1);
    const handleNext = () => {
        setStep(step + 1);
      };
    
    const handlePrevious = () => {
        if(step > 1){
            setStep(step - 1);
        }
    }

    // match state
    const initialMatchState = {
        tournament_name: '',
        date: getDate(),
        time: getTime(),
    
        match_no: '',
        match_category: '',
        age_category: '',
        game_point: 21,
        interval_point: 11,
        game_cap: 30,
        num_of_sets: 3,
        
        team1_name: '',
        team1_player1_name: '',
        team1_player2_name: '',
        team1_country: '',
        team1_club: '',
    
        team2_name: '',
        team2_player1_name: '',
        team2_player2_name: '',
        team2_country: '',
        team2_club: '',
        
        team_1_game_points_set_i: [0],
        team_2_game_points_set_i: [0],
        winner: ''
    }
    const [matchData, setMatchData] = useState(initialMatchState);


    const isDoubleGame = () => {
        return matchData.match_category.charAt(1).toLowerCase() == 'd';
    }

    // match on change handller
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
        setMatchData(initialMatchState);
    }
      

  return (
    <div style={{height:'100vh'}} >
        <NavBar />  
        <div className='container_' style={{overflowY: 'scroll'}}>
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
            {/* <ProgressBar now={(step / 3) * 100} /> */}
            <div className='match-form-wrapper' >
                <Grid container spacing={2}>
                    {step === 1 && (
                        <Grid item xs={12}>
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
                                <Grid item xs={12} >
                                    <TextField 
                                        label="Tournament Name" 
                                        variant="outlined" 
                                        style={{width:'100%'}} 
                                        type='text' 
                                        value={matchData.tournament_name}
                                        name='tournament_name'
                                        onChange={(e) => handleChange(e)}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <TextField 
                                        label="Date" 
                                        variant="outlined" 
                                        style={{width:'100%'}} 
                                        type='text' 
                                        value={matchData.date}
                                        name='date'
                                        onChange={(e) => handleChange(e)}
                                        required
                                        disabled
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <TextField 
                                        label="Time" 
                                        variant="outlined" 
                                        style={{width:'100%'}} 
                                        type='text' 
                                        value={matchData.time}
                                        name='time'
                                        onChange={(e) => handleChange(e)}
                                        required
                                        disabled
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <TextField 
                                        label="Match No" 
                                        variant="outlined" 
                                        style={{width:'100%'}} 
                                        type='text' 
                                        value={matchData.match_no}
                                        name='match_no'
                                        onChange={(e) => handleChange(e)}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <FormControl fullWidth>
                                        <InputLabel>Match Category</InputLabel>
                                        <Select
                                            value={matchData.match_category}
                                            name='match_category'
                                            label="Match Category"
                                            onChange={(e) => handleChange(e)}
                                        >
                                            <MenuItem value={'MS'}>Men's singles</MenuItem>
                                            <MenuItem value={'WS'}>Women's singles</MenuItem>
                                            <MenuItem value={'MD'}>Men's doubles</MenuItem>
                                            <MenuItem value={'WD'}>Women's Doubles</MenuItem>
                                            <MenuItem value={'XD'}>Mixed doubles</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                <FormControl fullWidth>
                                        <InputLabel>Age Category</InputLabel>
                                        <Select
                                            value={matchData.age_category}
                                            name='age_category'
                                            label="Age Category"
                                            onChange={(e) => handleChange(e)}
                                        >
                                            <MenuItem value={'Kids'}>Kids</MenuItem>
                                            <MenuItem value={'Junior'}>Junior</MenuItem>
                                            <MenuItem value={'Senior'}>Senior</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <TextField 
                                        label="Number of Sets" 
                                        variant="outlined" 
                                        style={{width:'100%'}} 
                                        type='number' 
                                        value={matchData.num_of_sets}
                                        name='num_of_sets'
                                        onChange={(e) => handleChange(e)}
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <TextField 
                                        label="Interval Point" 
                                        variant="outlined" 
                                        style={{width:'100%'}} 
                                        type='number' 
                                        value={matchData.interval_point}
                                        name='interval_point'
                                        onChange={(e) => handleChange(e)}
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <TextField 
                                        label="Game Point" 
                                        variant="outlined" 
                                        style={{width:'100%'}} 
                                        type='number' 
                                        value={matchData.game_point}
                                        name='game_point'
                                        onChange={(e) => handleChange(e)}
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <TextField 
                                        label="Game Cap" 
                                        variant="outlined" 
                                        style={{width:'100%'}} 
                                        type='number' 
                                        value={matchData.game_cap}
                                        name='game_cap'
                                        onChange={(e) => handleChange(e)}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    )}
                </Grid>
            </div>

            <div className='team-form-wrapper' >
                {step === 2 && (
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
                                TEAM-1 SETTINGS
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                                label="Team Name" 
                                variant="outlined" 
                                style={{width:'100%'}}
                                value={matchData.team1_name}
                                name='team1_name'
                                onChange={(e) => handleChange(e)}
                            />
                        </Grid>
                        
                        <Grid item xs={12} md={6}>
                            <TextField 
                                label="Player-1 Name" 
                                variant="outlined" 
                                style={{width:'100%'}}
                                value={matchData.team1_player1_name}
                                name='team1_player1_name'
                                onChange={(e) => handleChange(e)}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField 
                                label="Player-2 Name" 
                                variant="outlined" 
                                style={{width:'100%'}}
                                value={matchData.team1_player2_name}
                                name='team1_player2_name'
                                onChange={(e) => handleChange(e)}
                                required={isDoubleGame()}
                                disabled={!isDoubleGame()}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField 
                                label="Club Name" 
                                variant="outlined" 
                                style={{width:'100%'}}
                                value={matchData.team1_club}
                                name='team1_club'
                                onChange={(e) => handleChange(e)}  
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField 
                                label="Country Code" 
                                variant="outlined" 
                                style={{width:'100%'}}
                                value={matchData.team1_country}
                                name='team1_country'
                                onChange={(e) => handleChange(e)}  
                            />
                        </Grid>
                    </Grid>
                )}

                {step === 3 && (
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
                                TEAM-2 SETTINGS
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                                label="Team Name" 
                                variant="outlined" 
                                style={{width:'100%'}}
                                value={matchData.team2_name}
                                name='team2_name'
                                onChange={(e) => handleChange(e)}
                            />
                        </Grid>
                        
                        <Grid item xs={12} md={6}>
                            <TextField 
                                label="Player-1 Name" 
                                variant="outlined" 
                                style={{width:'100%'}}
                                value={matchData.team2_player1_name}
                                name='team2_player1_name'
                                onChange={(e) => handleChange(e)}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField 
                                label="Player-2 Name" 
                                variant="outlined" 
                                style={{width:'100%'}}
                                value={matchData.team2_player2_name}
                                name='team2_player2_name'
                                onChange={(e) => handleChange(e)}
                                required={isDoubleGame()}
                                disabled={!isDoubleGame()}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField 
                                label="Club Name" 
                                variant="outlined" 
                                style={{width:'100%'}}
                                value={matchData.team2_club}
                                name='team2_club'
                                onChange={(e) => handleChange(e)}  
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField 
                                label="Country Code" 
                                variant="outlined" 
                                style={{width:'100%'}}
                                value={matchData.team2_country}
                                name='team2_country'
                                onChange={(e) => handleChange(e)}  
                            />
                        </Grid>
                    </Grid>
                )}
            </div>

            <div className='button-wrapper' >
            {step != 1 ? (
                    <Button style={{margin: '0px 15px'}} variant="contained" onClick={handlePrevious} >Back</Button>
                ) : (
                    <></>
                )
            }
            {step < 3 ? (
                    <Button variant="contained" onClick={handleNext} >Next</Button>
                ) : (
                    <Button variant="contained" onClick={handleStartBtn} >Start Match</Button>
                )
            }
                
            </div>
        </div> 
    </div>
  )
}

export default MatchSettings;