import { createSlice } from '@reduxjs/toolkit'

const getStoredMode = () => {
  const mode = localStorage.getItem('mode')
  return mode || 'focus'
}

const storedMode = getStoredMode()

export const savedSettings = JSON.parse(localStorage.getItem('settings'))

const defaultDurations = {
  focus: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 10 * 60,
}

const durationFromStorage = savedSettings?.durations || defaultDurations

const initialState = {
  ...savedSettings,
  durations: durationFromStorage,
  totalSessions: savedSettings?.totalSessions ?? 4,
  // theme: savedSettings?.theme ?? 'light',

  // runtime
  mode: storedMode,
  active: storedMode,
  isRunning: false,
  timeLeft: durationFromStorage[storedMode],
  session: 1,
}

const timerSlice = createSlice({
  name: 'timer',
  initialState,

  reducers: {
    setActive: (state, action) => {
      state.active = action.payload
    },

    startTimer(state) {
      state.isRunning = true
    },

    pauseTimer(state) {
      state.isRunning = false
    },

    resetTimer(state) {
      state.isRunning = false

      state.mode = 'focus'
    },

    switchMode(state, action) {
      const newMode = action.payload
      state.mode = action.payload

      state.timeLeft = state.durations[newMode]
      localStorage.setItem('mode', action.payload)
      localStorage.setItem('timeLeft', state.timeLeft)
    },

    tick(state) {
      if (state.timeLeft > 0) {
        state.timeLeft -= 1
      }
    },

    nextSession(state) {
      state.session += 1
      state.isRunning = false
      state.timeLeft = state.durations[state.mode]
    },

    resetSession(state) {
      state.session = 1
    },

    updateSettings(state, action) {
      const payload = action.payload || {}
      const durationKeys = ['focus', 'shortBreak', 'longBreak']

      let newDurations = { ...state.durations }

      if (payload.durations && typeof payload.durations === 'object') {
        newDurations = { ...newDurations, ...payload.durations }
        //
      } else {
        const hasAnyDurationKey = durationKeys.some((key) => key in payload)

        if (hasAnyDurationKey) {
          durationKeys.forEach((key) => {
            if (key in payload && payload[key] != null) {
              newDurations[key] = payload[key]
            }
          })
        }
      }

      const allowedSettings = ['theme', 'autoStart', 'timeLeft', 'session']
      const otherSettings = {}

      allowedSettings.forEach((key) => {
        if (key in payload) {
          otherSettings[key] = payload[key]
          state[key] = payload[key]
        }
      })

      state.durations = newDurations

      const currentMode = state.mode
      if (newDurations[currentMode] != null) {
        if (!state.isRunning) {
          state.timeLeft = newDurations[currentMode]
        }
      }

      // const currentMode = state.mode;
      // if (action.payload[currentMode]) {
      //   state.timeLeft = action.payload?.[currentMode];
      // }

      const settingsToSave = {
        durations: state.durations,
        ...allowedSettings.reduce((acc, key) => {
          if (state[key] !== undefined) acc[key] = state[key]
          return acc
        }, {}),
      }

      // Object.assign(state, action.payload);
      localStorage.setItem('settings', JSON.stringify(settingsToSave))
    },
  },
})

export const {
  setActive,
  startTimer,
  pauseTimer,
  resetTimer,
  switchMode,
  tick,
  nextSession,
  resetSession,
  updateSettings,
} = timerSlice.actions
export const timerReducer = timerSlice.reducer
