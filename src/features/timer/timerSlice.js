import { createSlice } from '@reduxjs/toolkit';

const getStoredMode = () => {
  const mode = localStorage.getItem('mode');
  return mode || 'focus';
};

const storedMode = getStoredMode();

const initialState = {
  mode: 'focus',
  active: '',
  isRunning: false,
  timeLeft: getDefaultTime(storedMode), // 25 minutes
  session: 1,
  totalSessions: 4,
};

const timerSlice = createSlice({
  name: 'timer',
  initialState,

  reducers: {
    setActive: (state, action) => {
      state.active = action.payload;
    },

    startTimer(state) {
      state.isRunning = true;
    },

    pauseTimer(state) {
      state.isRunning = false;
    },

    resetTimer(state) {
      state.isRunning = false;
      state.timeLeft = getDefaultTime(state.mode);
    },

    switchMode(state, action) {
      state.mode = action.payload;
      state.timeLeft = getDefaultTime(action.payload);
      localStorage.setItem('mode', action.payload);
    },

    tick(state) {
      if (state.timeLeft > 0) {
        state.timeLeft -= 1;
      }
    },

    nextSession(state) {
      state.session += 1;
      state.isRunning = false;
      state.timeLeft = getDefaultTime(state.mode);
    },
  },
});

export function getDefaultTime(mode) {
  switch (mode) {
    case 'shortBreak':
      return 5 * 60;
    case 'longBreak':
      return 15 * 60;
    default:
      return 25 * 60;
  }
}

export const {
  setActive,
  startTimer,
  pauseTimer,
  resetTimer,
  switchMode,
  tick,
  nextSession,
  setTimeAndMode,
} = timerSlice.actions;
export const timerReducer = timerSlice.reducer;
