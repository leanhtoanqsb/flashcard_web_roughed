import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

export const fetchSets = createAsyncThunk ('sets/fetchSets', async () => {
  const resp = await axios
    .get('http://127.0.0.1:8000/api/sets/')
    .then((res) => {return res.data})
    .catch((err) => {return err})
  return resp
})
export const addSet = createAsyncThunk ('sets/addSet', async (data) => {
  const resp = await axios
    .post('http://127.0.0.1:8000/api/sets/', data)
    .then((res) => {return res.data})
    .catch((err) => {return err})
  return resp
})

export const setsSlice = createSlice({
  name: 'sets',
  initialState: {
    sets: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    setsAdded: (state, action) => {
      state.push(action.payload)
    },
  },
  extraReducers: {
    [fetchSets.pending]: (state) => {
      state.status = 'loading'
    },
    [fetchSets.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      state.sets = action.payload
    },
    [fetchSets.rejected]: (state) => {
      state.status = 'failed'
    },
    [addSet.fulfilled]: (state, action) => {
      state.sets.push(action.payload)
    },
  },
})

export const { setsAdded } = setsSlice.actions

export const selectAllSets = (state) => state.sets.sets

export default setsSlice.reducer
