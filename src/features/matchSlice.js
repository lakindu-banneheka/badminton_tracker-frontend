import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
  matchData : {
    tournament_name: '',
    date: '',
    time: '',

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
}

export const matchSlice = createSlice({
  name: 'match',
  initialState,
  reducers: {
    newMatch: (state, action) => {
        state.matchData = action.payload;
        console.log(state.matchData);
        const t_name = state.matchData.tournament_name;
        state = initialState;
        state = {
          ...state,
          matchData : {
            ...state.matchData,
            tournament_name: t_name
          }
        } 

    },
    scoreDecrement: (state) => {
        state.current_score -= 1
    },
    scoreIncrement: (state) => {
        state.current_score += 1
    },
    endMatch: (state) => {

    }
  },
})

// Action creators are generated for each case reducer function
export const { newMatch, scoreDecrement, scoreIncrement, endMatch } = matchSlice.actions

export default matchSlice.reducer