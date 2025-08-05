import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mode: 'focus',
  timeLeft: 25 * 60,
  status: 'idle',
  sessionCount: 0,
};

const timerSlice = createSlice({
  name: 'timer',
  initialState,

  reducers: {
    setMode: (state, action) => {
      state.mode = action.payload;
    },

    setTimeLeft: (state, action) => {
      state.timeLeft = action.payload;
    },

    startTime: (state) => {
      state.status = 'running';
    },

    pauseTimer: (state) => {
      state.status = 'paused';
    },

    resetTimer: (state) => {
      state.status = 'idle';
      state.timeLeft = 25 * 60;
    },

    incrementSessionCount: (state) => {
      state.sessionCount++;
    },
  },
});

export const {
  setMode,
  setTimeLeft,
  startTime,
  pauseTimer,
  resetTimer,
  incrementSessionCount,
} = timerSlice.actions;
export const timerReducer = timerSlice.reducer;