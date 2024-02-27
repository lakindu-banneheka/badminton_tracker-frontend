import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  matchData : {
    type: '',
    category: '',
    winning_score: 0,
  
    player1_name: '',
    player1_country: '',
    player2_name: '',
    player2_country: '',
    
    player1_score: 0,
    player2_score: 0,
    winner: ''
  }
}

export const matchSlice = createSlice({
  name: 'match',
  initialState,
  reducers: {
    newMatch: (state, action) => {
        state.matchData = action.payload
        console.log(state.matchData)
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