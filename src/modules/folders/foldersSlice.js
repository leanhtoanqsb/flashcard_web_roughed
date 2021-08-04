import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

export const fetchFolders = createAsyncThunk ('folders/fetchFolders', async () => {
  const resp = await axios
    .get('/api/folder/')
    .then((res) => {return res.data})
    .catch((err) => {return err})
  return resp
})

export const addFolders = createAsyncThunk ('folders/addFolders', async (data) => {
  const resp = await axios
    .post('/api/folder/', data)
    .then((res) => {return res.data})
    .catch((err) => {return err})
  return resp
})

export const foldersSlice = createSlice({
  name: 'folders',
  initialState: {
    folders: [],
    status: 'idle',
    error: null,
  },
  reducers: {
  },
  extraReducers: {
    [fetchFolders.pending]: (state) => {
      state.status = 'loading'
    },
    [fetchFolders.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      state.folders = action.payload
    },
    [fetchFolders.rejected]: (state) => {
      state.status = 'failed'
    },

    [addFolders.fulfilled]: (state, action) => {
      state.folders.push(action.payload)
    },

  },
})



export const selectAllFolders = (state) => state.folders.folders

export default foldersSlice.reducer
