import { configureStore } from '@reduxjs/toolkit'
import foldersReducer from './modules/folders/foldersSlice'
import setsReducer from './modules/sets/setsSlice'
//import wordsReducer from './modules/words/wordsSlice'

export default configureStore({
  reducer: {
    folders: foldersReducer,
    sets: setsReducer,
  }
})
