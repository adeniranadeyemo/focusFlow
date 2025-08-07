import { createSlice } from '@reduxjs/toolkit';

const getStoredMode = () => {
  const mode = localStorage.getItem('mode');
  return mode || 'focus';
};

const storedMode = getStoredMode();

const defaultDurations = {
  focus: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60,
};

const storedDurations =
  JSON.parse(localStorage.getItem('durations')) || defaultDurations;

const initialState = {
  mode: storedMode,
  active: '',
  isRunning: false,
  // timeLeft: getDefaultTime(storedMode),
  timeLeft: storedDurations[storedMode],
  session: 1,
  totalSessions: 4,
  durations: storedDurations,
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
      state.timeLeft = 25 * 60;
    },

    switchMode(state, action) {
      const newMode = action.payload;
      state.mode = action.payload;
      // state.timeLeft = getDefaultTime(action.payload);
      state.timeLeft = state.durations[newMode];
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

    updateDurations(state, action) {
      state.durations = {
        ...state.durations,
        ...action.payload,
      };

      const currentMode = state.mode;
      if (action.payload[currentMode]) {
        state.timeLeft = action.payload[currentMode];
      }

      localStorage.setItem('durations', JSON.stringify(state.durations))
    },
  },
});

export function getDefaultTime(mode) {
  switch (mode) {
    case 'shortBreak':
      return 1 * 2;
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
  updateDurations
} = timerSlice.actions;
export const timerReducer = timerSlice.reducer;
