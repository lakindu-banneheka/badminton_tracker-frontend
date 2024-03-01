import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
  matchData : {
    userId: null,
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
    interval_time: 1,

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
    set_winner_i: [-1],
    winner: -1
  }
}

export const matchSlice = createSlice({
  name: 'match',
  initialState,
  reducers: {
    newMatch: (state, action) => {
      return {
          ...state,
          matchData: action.payload
      };
    },  
    nextSet: (state, action) => {
      const set_no = state.matchData.set_winner_i.length;
  
      const updatedSetWinnerArray = state.matchData.set_winner_i.map((winner, index) => {
          if (index === set_no - 1) {
              return action.payload;
          } else {
              return winner;
          }
      });
  
      let newState = {
          ...state,
          matchData: {
              ...state.matchData,
              set_winner_i: updatedSetWinnerArray,
          }
      };
  
      if (set_no < state.matchData.num_of_sets) {
          const newSetWinnerArray = [...updatedSetWinnerArray, -1];
          const newTeam1GamePointsArray = [...state.matchData.team_1_game_points_set_i, 0];
          const newTeam2GamePointsArray = [...state.matchData.team_2_game_points_set_i, 0];
  
          newState = {
              ...newState,
              matchData: {
                  ...newState.matchData,
                  set_winner_i: newSetWinnerArray,
                  team_1_game_points_set_i: newTeam1GamePointsArray,
                  team_2_game_points_set_i: newTeam2GamePointsArray,
              }
          };
      }
  
      return newState; 
    },

    scoreChange_team_1: (state, action) => {
      const set_no = state.matchData.set_winner_i?.length;

      state.matchData.team_1_game_points_set_i = state.matchData.team_1_game_points_set_i.map((points, index) => {
        if (index === set_no - 1 && points + action.payload >= 0) {
          return points + action.payload;
        } else {
          return points;
        }
      });
    },

    scoreChange_team_2: (state, action) => {
      const set_no = state.matchData.set_winner_i?.length;
      state.matchData.team_2_game_points_set_i = state.matchData.team_2_game_points_set_i.map((points, index) => {
        if (index === set_no - 1 && points + action.payload >= 0) {
          return points + action.payload;
        } else {
          return points;
        }
      });
    },
    
    endGame: (state, action) => {
      let newState = {
        ...state,
        matchData: {
            ...state.matchData,
            winner: action.payload,
        }
      };
      
      return newState;
    }

  },
})

// Action creators are generated for each case reducer function
export const { newMatch, scoreChange_team_1, scoreChange_team_2, nextSet, endGame } = matchSlice.actions

export default matchSlice.reducer;