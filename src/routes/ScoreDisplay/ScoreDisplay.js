import React, { useEffect, useState } from 'react';
import './style.css';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { WEB_SOCKET_URL } from '../../baseURL';

const Scoreboard = () => {
    const matchDataSelector = useSelector(state => state.match.matchData);

    const [matchData, setMatchData] = useState(matchDataSelector);
    const [seconds, setSeconds] = useState(0);
    const [intervalSeconds, setIntervalSeconds] = useState(0);
    const [isIntervalActive, setIsIntervalActive] = useState(false);
    let setNo = matchData.set_winner_i.length;

    
    useEffect(() => {
        const socket = new WebSocket(WEB_SOCKET_URL);
        socket.onopen = () => {
            console.log('WebSocket connection established.');
        };
        socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        socket.onmessage = (event) => {
          const data = JSON.parse(event.data);
          if (data.type == 'TIMER_UPDATE') {
            const timer = data.timer;
            setSeconds(timer.seconds);
            setIntervalSeconds(timer.intervalSeconds);
            setIsIntervalActive(timer.isIntervalActive);
          }
          if (data.type == 'MATCH_UPDATE') {
            setMatchData(data.matchData)
          }
        };
    
        return () => {
            socket.close();
        };
      }, []);
      

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

    // Timer  


    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

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
                    Player 1 Name
                </Typography>
                <div className='player-name-container' style={{borderColor: '#D21F1F'}}>
                    <Typography
                        variant="body"
                        sx={{
                            fontWeight: 700,
                            letterSpacing: '.2rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        { matchData.team1_player1_name }
                    </Typography>
                </div>
            </div>
            
            { matchData.match_category.charAt(1).toLowerCase() == 'd'
                ? <div className='player-name-wrapper' >
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
                        Player 2 Name
                    </Typography>
                    <div className='player-name-container' style={{borderColor: '#D21F1F'}}>
                        <Typography
                            variant="body"
                            sx={{
                                fontWeight: 700,
                                letterSpacing: '.2rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            {  matchData.team1_player2_name }
                        </Typography>
                    </div>
                </div>
                :<></>
            }

            <div className='player-score-wrapper' >
                <div className='player-sets-wrapper'>
                    { Array.from({length: matchData.num_of_sets}).map((label, index) => (
                        <div key={index} className={`player-set-box ${matchData.set_winner_i[index] == 1?'player-set-box-left-win':''}`}></div>
                    ))}
                </div>
                <div className='_player-score-container' 
                    style={{
                        borderColor: '#FFFFFF',
                        backgroundColor: 'rgba(210, 31, 31, 0.48)'
                    }} 
                    >
                    <Typography
                        sx={{
                            fontSize: 220,
                            fontWeight: 700,
                            letterSpacing: '.rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        {
                            matchData.team_1_game_points_set_i[setNo-1]
                        }
                    </Typography>
                </div>
            </div>
        </div>

        <div className='match-wrapper' >
           
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
            <div>
                <Typography
                    variant="h1"
                    sx={{
                        fontSize: 150,
                        fontWeight: 700,
                        letterSpacing: '.1rem',
                        color: 'inherit',
                        textDecoration: 'none',
                    }}
                >
                    VS
                </Typography>
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
                    Player 1 Name
                </Typography>
                <div className='player-name-container' style={{borderColor: 'rgba(42, 66, 190, 1)'}}>
                    <Typography
                        variant="body"
                        sx={{
                            fontWeight: 700,
                            letterSpacing: '.2rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        { matchData.team2_player1_name }
                    </Typography>
                </div>
            </div>
            
            { matchData.match_category.charAt(1).toLowerCase() == 'd'
                ? <div className='player-name-wrapper' >
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
                        Player 2 Name
                    </Typography>
                    <div className='player-name-container' style={{borderColor: 'rgba(42, 66, 190, 1)'}}>
                        <Typography
                            variant="body"
                            sx={{
                                fontWeight: 700,
                                letterSpacing: '.2rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            {  matchData.team2_player2_name }
                        </Typography>
                    </div>
                </div>
                :<></>
            }

            <div className='player-score-wrapper' >
                <div 
                    className='_player-score-container' 
                    style={{
                        borderColor: '#fff',
                        backgroundColor: 'rgba(42, 66, 190, 0.48)'    
                    }} >
                    <Typography
                        sx={{
                            fontSize: 220,
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
        </div>
    </div>
)

};

export default Scoreboard;
