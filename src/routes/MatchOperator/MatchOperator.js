import React, { useEffect, useState } from 'react';
import './styles.css';
import Typography from '@mui/material/Typography';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import StopIcon from '@mui/icons-material/Stop';
import { useSelector, useDispatch } from 'react-redux';
import { endGame, nextSet, scoreChange_team_1, scoreChange_team_2 } from '../../features/matchSlice';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { addNewMatch } from '../../utils/axios';

const MatchOperator = () => {
    
    const matchData = useSelector(state => state.match.matchData);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    let setNo = matchData.set_winner_i.length;
    let team1Points = matchData.team_1_game_points_set_i[setNo - 1];
    let team2Points = matchData.team_2_game_points_set_i[setNo - 1];

    const [isGamePaused, setIsGamePaused] = useState(true);
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [isGameStoped, setIsGameStoped] = useState(false);
    const [isSetEnd, setIsSetEnd] = useState(false);
    const [isGameEnd, setGameEnd] = useState(false);
    
    const [isAlreadyGotInterval, setIsAlreadyGotInterval] = useState(false);
    const [isIntervalActive, setIsIntervalActive] = useState(false);
    const [intervalSeconds, setIntervalSeconds] = useState(0);

    const [seconds, setSeconds] = useState(0);

    const onClickStartBtn = () => {
        setIsGameStarted(true);
        setIsGamePaused(false);
        toggleTimer();
    } 


    const getSetWinner = () => {
        // console.log(team1Points , team2Points)

        const isGap_2_Or_More = team1Points  <= 21 && team2Points <= 21 && Math.abs(team1Points - team2Points) >= 2; 
        if((team1Points == matchData.game_point && isGap_2_Or_More) || team1Points == matchData.game_cap){
            // handleNextSet(1);
            handleComfiremEndSet()
        } 
        
        if(team2Points == matchData.game_point && isGap_2_Or_More || team2Points == matchData.game_cap) {
            // handleNextSet(2);
            handleComfiremEndSet()
        }
    }

    const handleNextSet = (winner) => {
        if(winner == 1 || winner == 2){
            dispatch(nextSet(winner));
            
            resetTimer();
            setIsGameStarted(false);
            setIsGamePaused(true);
            setIsGameStoped(false);
            setIsSetEnd(false);
            setIsAlreadyGotInterval(false);
        }
    } 

    useEffect(() => {
        handleIntervalPoint()
        getSetWinner()
    }, [matchData]);

    useEffect(() => {
        handleEndGame()
    }, [matchData.set_winner_i]);

    // Timer  
    useEffect(() => {
      let interval;
  
      if (!isGamePaused && !isIntervalActive) {
        interval = setInterval(() => {
          setSeconds((prevSeconds) => prevSeconds + 1);
        }, 1000);
      } else {
        clearInterval(interval);
      }
  
      return () => clearInterval(interval);
    }, [isGamePaused, isIntervalActive]);
  
    const toggleTimer = () => {
        setIsGamePaused(!isGamePaused);
    };
  
    const resetTimer = () => {
      setSeconds(0);
      setIsGamePaused(false);
    };
  
    const formatTime = (time) => {
      const minutes = Math.floor(time / 60);
      const seconds = time % 60;
      return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    // Game force stop
    const onClickEndGameBtn = () => {
        setIsGameStoped(true);
        setIsGamePaused(true);
    }

    const handleComfiremEndSet = () => {
        setIsSetEnd(true);
        setIsGamePaused(true);
    }

    const handleCustomSetWinner = (winner) => {
        handleNextSet(winner);
    }

    // Interval
    useEffect(() => {
        let interval;
    
        if (isIntervalActive ) {
          interval = setInterval(() => {
            setIntervalSeconds((prevSeconds) => prevSeconds + 1);
          }, 1000);
        } else {
          clearInterval(interval);
        }
    
        return () => clearInterval(interval);
      }, [isIntervalActive]);
    
      const resetIntervalTimer = () => {
        setIntervalSeconds(0);
        setIsIntervalActive(false);
      };
    
      const formatIntervalTime = (time) => {
        let minutes = 0;
        let seconds = 0;

        if(isIntervalActive && matchData.interval_time * 60 > time){
            minutes = Math.floor(time / 60);
            seconds = time % 60;
        } else if(isIntervalActive) {
            minutes = Math.floor(matchData.interval_time*60 / 60);
            seconds = matchData.interval_time*60 % 60;
        }

        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
      };

    const handleIntervalPoint = () => {
        const isAlreadyReachedIntervalPoint = team1Points > matchData.interval_point || team2Points > matchData.interval_point;
        if( !isAlreadyGotInterval && !isAlreadyReachedIntervalPoint && (team1Points == matchData.interval_point || team2Points == matchData.interval_point)){
            setIsIntervalActive(true);
            setIsGamePaused(true);
        }
    }


    // End match 
    const getGameWinner = () => {
        let team1WinCount = 0;
        let team2WinCount = 0;
        let winner = -1;
    
        for (let i = 0; i < setNo; i++) {
            if (matchData.set_winner_i[i] === 1) {
                team1WinCount++;
            } else if (matchData.set_winner_i[i] === 2) {
                team2WinCount++;
            }
        }

        winner = team1WinCount > team2WinCount ? 1 : 2;
        return winner;
    }

    const handleEndGame = () => {
        let team1WinCount = 0;
        let team2WinCount = 0;
        let winCount = 0;
    
        for (let i = 0; i < setNo; i++) {
            if (matchData.set_winner_i[i] === 1) {
                team1WinCount++;
            } else if (matchData.set_winner_i[i] === 2) {
                team2WinCount++;
            }
        }

        winCount = team1WinCount > team2WinCount ? team1WinCount : team2WinCount;

        switch (matchData.num_of_sets) {
            case 1:
                if(winCount == 1){
                    setGameEnd(true);
                }
                break;
            case 2:
            case 3:
                if(winCount == 2){
                    setGameEnd(true);
                }
                break;
            case 4:
            case 5:
                if(winCount == 3){
                    setGameEnd(true);
                }
                break;
        
            default:
                break;
        }
    
    };
    
    const startNewGame = async () => {
        dispatch(endGame(getGameWinner()));
        
        let newState = {
            ...matchData,
            winner: getGameWinner(),
        };
        // console.log('match data', newState)
        await addNewMatch(newState);
        
        navigate('/new-match');
    }

    return(
        <div className="container">
            <div className='player-wrapper' >
                <div className='player-name-wrapper' >
                    <Typography
                        variant="body"
                        sx={{
                            fontWeight: 500,
                            color: 'inherit',
                            fontSize: 20,
                            color:'rgba(255, 245, 245, 0.54)',
                            paddingLeft: '15px'
                        }}
                    >
                        Player Name
                    </Typography>
                    <div className='player-name-container' style={{borderColor: '#D21F1F'}}>
                        <Typography
                            variant="body"
                            sx={{
                                fontWeight: 700,
                                letterSpacing: '.2rem',
                                color: 'inherit',
                                textDecoration: 'none',
                                // color:'#D21F1F'
                            }}
                        >
                            { matchData.match_category.charAt(1).toLowerCase() != 'd'
                                ? matchData.team1_player1_name 
                                : (matchData.team1_player1_name.split(' ')[0] + ' & ' + matchData.team1_player2_name.split(' ')[0])
                            }
                        </Typography>
                    </div>
                </div>
                <div className='player-score-wrapper' >
                    <div className='player-sets-wrapper'>
                        { Array.from({length: matchData.num_of_sets}).map((label, index) => (
                            <div key={index} className={`player-set-box ${matchData.set_winner_i[index] == 1?'player-set-box-left-win':''}`}></div>
                        ))}
                    </div>
                    <div className='player-score-container' 
                        style={{
                            borderColor: '#D21F1F',
                        }} 
                        >
                        <Typography
                            sx={{
                                fontSize: 110,
                                fontWeight: 700,
                                letterSpacing: '.rem',
                                color: 'inherit',
                                textDecoration: 'none',
                                // color:'#D21F1F'
                            }}
                        >
                            {
                                matchData.team_1_game_points_set_i[setNo-1]
                            }
                        </Typography>
                    </div>
                </div>
                <div className='player-scorebtn-container' style={{marginLeft: 55}}>
                    <button disabled={isGamePaused} className="left-animated-button" onClick={() => {dispatch(scoreChange_team_1(+1))}} >+1</button>
                </div>
                <div className='player-scorebtn-container' style={{marginLeft: 55}}>
                    <button disabled={isGamePaused} className="left-animated-button" onClick={() => {dispatch(scoreChange_team_1(-1))}} >-1</button>   
                </div>
            </div>
            <div className='match-wrapper' >
                <div className='match-number-wrapper' >
                    <div className='match-number-container' >
                        <Typography
                            variant="body"
                            sx={{
                                fontWeight: 600,
                                letterSpacing: '.2rem',
                                color: 'inherit',
                                textDecoration: 'none',
                                // color:'#D21F1F'
                            }}
                        >
                            {matchData.match_no}
                        </Typography>
                    </div>
                    <Typography
                        variant="body"
                        sx={{
                            fontWeight: 500,
                            color: 'inherit',
                            fontSize: 20,
                            color:'rgba(255, 245, 245, 0.54)'
                        }}
                    >
                        Match Number
                    </Typography>
                </div>
                <div className='timer-wrapper' >
                    <Typography
                        variant="body1"
                        sx={{
                            fontWeight: 500,
                            color: 'inherit',
                            fontSize: 20,
                            color:'rgba(255, 245, 245, 0.54)'
                        }}
                    >
                        Timer
                    </Typography>
                    <div className='timer-container' >
                        <Typography
                            variant="h3"
                            sx={{
                                fontWeight: 700,
                                letterSpacing: '.1rem',
                                color: 'inherit',
                                textDecoration: 'none',
                                color: `${isIntervalActive?'#D21F1F':''}`
                            }}
                        >
                            { !isIntervalActive
                                ? formatTime(seconds)
                                : formatIntervalTime(intervalSeconds)
                            }
                        </Typography>
                    </div>
                </div>
                <div className='action-wrapper'>
                    <button className='action-button' onClick={toggleTimer} >
                        { isGamePaused
                            ? <PlayArrowIcon style={{fontSize: 60}} />
                            : <PauseIcon style={{fontSize: 60}} />
                        }
                    </button>
                    <button className='action-button' onClick={onClickEndGameBtn} >
                        <StopIcon style={{fontSize: 60}} />
                    </button>
                </div>
                <div className='player-setNumber-wrapper' >
                    <div className='player-setNumber-container' >
                        <Typography
                            variant="body"
                            sx={{
                                fontWeight: 600,
                                letterSpacing: '.2rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            {`${setNo}/${matchData.num_of_sets}`}
                        </Typography>
                    </div>
                    <Typography
                        variant="body"
                        sx={{
                            fontWeight: 500,
                            color: 'inherit',
                            fontSize: 20,
                            color:'rgba(255, 245, 245, 0.54)'
                        }}
                    >
                        Set Count
                    </Typography>
                </div>
            </div>
            <div className='player-wrapper' >
                <div className='player-name-wrapper' >
                    <Typography
                        variant="body"
                        sx={{
                            fontWeight: 500,
                            color: 'inherit',
                            fontSize: 20,
                            color:'rgba(255, 245, 245, 0.54)',
                            paddingLeft: '15px'
                        }}
                    >
                        Player Name
                    </Typography>
                    <div className='player-name-container' style={{borderColor: '#2A42BE'}}>
                        <Typography
                            variant="body"
                            sx={{
                                fontWeight: 700,
                                letterSpacing: '.2rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            { matchData.match_category.charAt(1).toLowerCase() != 'd'
                                ? matchData.team2_player1_name 
                                : (matchData.team2_player1_name.split(' ')[0] + ' & ' + matchData.team2_player2_name.split(' ')[0])
                            }
                        </Typography>
                    </div>
                </div>
                <div className='player-score-wrapper' >
                    <div className='player-score-container' style={{borderColor: '#2A42BE'}} >
                        <Typography
                            sx={{
                                fontSize: 110,
                                fontWeight: 700,
                                letterSpacing: '.rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            {
                                matchData.team_2_game_points_set_i[setNo-1]
                            }
                        </Typography>
                    </div>
                    <div className='player-sets-wrapper' >
                        { Array.from({length: matchData.num_of_sets}).map((label, index) => (
                            <div key={index} className={`player-set-box ${matchData.set_winner_i[index] == 2?'player-set-box-right-win':''}`}></div>
                        ))}
                    </div>
                </div>
                <div className='player-scorebtn-container' style={{marginRight: 40}}>
                    <button disabled={isGamePaused} className="right-animated-button" onClick={() => {dispatch(scoreChange_team_2(+1))}} >+1</button>
                </div>
                <div className='player-scorebtn-container' style={{marginRight: 40}}>
                    <button disabled={isGamePaused} className="right-animated-button" onClick={() => {dispatch(scoreChange_team_2(-1))}} >-1</button>   
                </div>
            </div>
            <Modal
                open={!isGameStarted || isGameStoped || isSetEnd || isIntervalActive || isGameEnd}
            >
                <Box 
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 250,
                        backgroundColor: '#fff',
                        padding: 20,
                        borderRadius: 10,

                        display: 'flex',
                        justifyContent: 'center', 
                        flexDirection: 'column',
                        alignItems: 'center'
                        
                    }} 
                >
                    { isSetEnd
                        ?<>
                            <Typography
                                variant="h5" 
                                // fontSize={16}
                                fontWeight={550}
                            >
                                Set {setNo} Winner ?
                            </Typography>
                            <div 
                                style={{width: '100%' ,display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}} >
                                <Button 
                                    variant={team1Points > team2Points ?'contained':'outlined'}
                                    onClick={()=>handleCustomSetWinner(1)}
                                    sx={{
                                        marginTop: 5,
                                        backgroundColor: `${team1Points > team2Points ?'rgba(210, 31, 31, 1)':''}`,
                                        borderColor: `${team1Points < team2Points ?'rgba(210, 31, 31, 1)':''}`,
                                        color: `${team1Points < team2Points ?'rgba(210, 31, 31, 1)':''}`,

                                        "&:hover": {
                                            backgroundColor: `${team1Points > team2Points ?'red':''}`,
                                            borderColor: `${team1Points < team2Points ?'red':''}`,
                                            color: `${team1Points < team2Points ?'red':''}`,
                                            fontWeight: 600
                                          },
                                    }}
                                >
                                    TEAM 1
                                </Button>
                                <Button 
                                    variant={team1Points < team2Points ?'contained':'outlined'}
                                    onClick={()=>handleCustomSetWinner(2)}
                                    sx={{
                                        marginTop: 5,
                                        backgroundColor: `${team1Points < team2Points ?'rgba(42, 66, 190, 1)':''}`,
                                        borderColor: `${team1Points > team2Points ?'rgba(42, 66, 190, 1)':''}`,

                                        "&:hover": {
                                            backgroundColor: `${team1Points < team2Points ?'blue':''}`,
                                            fontWeight: 600
                                          },
                                    }}
                                >
                                    TEAM 2
                                </Button>
                            </div>
                        </>
                        :( isGameStoped
                            ?<>
                                <Typography
                                    variant="h5" 
                                    // fontSize={16}
                                    fontWeight={600}
                                >
                                    End Set ?
                                </Typography>
                                <div style={{width: '100%' ,display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}} >
                                    <Button 
                                        variant='contained'
                                        onClick={()=>{setIsGameStoped(false)}}
                                        sx={{
                                            marginTop: 5
                                        }}
                                    >
                                        CANCEL
                                    </Button>
                                    <Button 
                                        variant='contained'
                                        onClick={handleComfiremEndSet}
                                        sx={{
                                            marginTop: 5
                                        }}
                                    >
                                        END
                                    </Button>
                                </div>
                            </>
                            :<></>
                        )
                    }

                    { !isGameStarted && !isGameEnd
                        ?<>
                            <Typography
                                variant="h5" 
                                // fontSize={16}
                                fontWeight={600}
                            >
                                Start Game ?
                            </Typography>
                            <Button 
                                variant='contained'
                                onClick={onClickStartBtn}
                                sx={{
                                    marginTop: 5
                                }}
                            >
                                START
                            </Button>
                        </>
                        :<></>
                    }

                    { isIntervalActive
                        ?<>
                            <Typography
                                variant="h6" 
                                // fontSize={16}
                                fontWeight={600}
                            >
                                {`Interval : ${formatIntervalTime(intervalSeconds)}`}
                            </Typography>
                            <div 
                                style={{width: '100%' ,display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}} >
                                <Button 
                                    variant='outlined'
                                    onClick={()=>{setIsIntervalActive(false); resetIntervalTimer(); setIsAlreadyGotInterval(false)}}
                                    sx={{
                                        marginTop: 5
                                    }}
                                >
                                    CANCEL
                                </Button>
                                <Button 
                                    variant= {matchData.interval_time * 60 <= intervalSeconds ?'contained':'outlined'}
                                    onClick={()=>{setIsIntervalActive(false); resetIntervalTimer(); setIsAlreadyGotInterval(true);}}
                                    sx={{
                                        marginTop: 5,
                                        backgroundColor: `${matchData.interval_time * 60 <= intervalSeconds ?'red':''}`,
                                        borderColor: `${matchData.interval_time * 60 >= intervalSeconds ?'red':''}`,
                                        color: `${matchData.interval_time * 60 > intervalSeconds ?'red':''}`,
                                        "&:hover": {
                                            backgroundColor: `${matchData.interval_time * 60 <= intervalSeconds ?'red':''}`,
                                            fontWeight: 600,
                                            borderColor: `${matchData.interval_time * 60 >= intervalSeconds ?'red':''}`,
                                        },
                                    }}
                                >
                                    SKIP
                                </Button>
                            </div>
                        </>
                        :<></>
                    }

                    { isGameEnd 
                        ?<>
                            <Typography
                                variant="h5" 
                                // fontSize={16}
                                fontWeight={550}
                            >
                                Winner
                            </Typography>
                            <div 
                                style={{width: '100%', height: '150px' ,display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}} 
                            >

                                <div 
                                    style={{width: '100%' ,display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}} 
                                >
                                    <div 
                                        className='timer-container' 
                                        style={{
                                            height: '60px',
                                            backgroundColor: `${getGameWinner() == 1? 'rgba(210, 31, 31, 1)':(getGameWinner() == 1?'rgba(42, 66, 190, 1)':'#D21F1F')}`
                                        }} >
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                fontWeight: 700,
                                                letterSpacing: '.1rem',
                                                color: 'inherit',
                                                textDecoration: 'none',
                                                color: '#fff'
                                            }}
                                        >
                                            {getGameWinner() === 1 ? 'Team 1' : getGameWinner() === 2 ? 'Team 2' : 'No Winner Yet'}
                                        </Typography>
                                    </div>
                                </div>
                                    <Button 
                                        variant={'outlined'}
                                        onClick={()=>startNewGame()}
                                        sx={{
                                            marginTop: 5,
                                        }}
                                    >
                                        Create New Game
                                    </Button>
                            </div>
                        </>
                        :<></>
                    }
                </Box>
            </Modal>
        </div>
    )
}

export default MatchOperator;