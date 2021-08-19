import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchFolders = createAsyncThunk(
  "folders/fetchFolders",
  async () => {
    const resp = await axios
      .get("https://flashcardserverroughed.herokuapp.com/api/folder/")
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return err;
      });
    return resp;
  }
);

export const addFolders = createAsyncThunk(
  "folders/addFolders",
  async (data) => {
    const resp = await axios
      .post("https://flashcardserverroughed.herokuapp.com/api/folder/", data)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return err;
      });
    return resp;
  }
);

export const editFolder = createAsyncThunk(
  "folders/editFolders",
  async ({ folderId, data }) => {
    const resp = await axios
      .patch(
        `https://flashcardserverroughed.herokuapp.com/api/folder/${folderId}/`,
        data
      )
      .then((res) => {
        return res.data;
      });
    return resp;
  }
);
export const deleteFolder = createAsyncThunk(
  "folders/deleteFolders",
  async (folderId) => {
    const resp = await axios.delete(
      `https://flashcardserverroughed.herokuapp.com/api/folder/${folderId}/`
    );
  }
);

export const foldersSlice = createSlice({
  name: "folders",
  initialState: {
    folders: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: {
    [fetchFolders.pending]: (state) => {
      state.status = "loading";
    },
    [fetchFolders.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.folders = action.payload;
    },
    [fetchFolders.rejected]: (state) => {
      state.status = "failed";
    },

    [addFolders.fulfilled]: (state, action) => {
      state.folders.push(action.payload);
    },
    [editFolder.fulfilled]: (state, action) => {
      const { id } = action.payload;
      const existFolder = state.folders.find(
        (folder) => folder.id === id
      );
      const folderIndex = state.folders.indexOf(existFolder);
      state.folders[folderIndex] = action.payload;
    },
    [deleteFolder.fulfilled]: (state) => {
      state.status = "idle";
    },
  },
});

export const selectAllFolders = (state) => state.folders.folders;

export default foldersSlice.reducer;
