import { configureStore } from "@reduxjs/toolkit";
import animalReducer from "../slices/animalSlice";
import adoptionReducer from "../slices/adoptionSlice";
import userReducer from "../slices/userSlice";

const store = configureStore({
  reducer: {
    animals: animalReducer,
    adoptions: adoptionReducer,
    users: userReducer,
  },
});

export default store;
