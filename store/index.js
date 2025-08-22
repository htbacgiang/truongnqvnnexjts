import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import cartReducers from "./cartSlice";
import expandSidebar from "./ExpandSlice";
import dialog from "./DialogSlice";
import favoritesReducer from "./favoritesSlice";

const reducers = combineReducers({
  cart: cartReducers,
  expandSidebar,
  dialog,
  favorites: favoritesReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ['favorites'],
  stateReconciler: (inboundState, originalState) => {
    const favorites = inboundState.favorites || {};
    return {
      ...inboundState,
      favorites: {
        favoriteFonts: favorites.favoriteFonts || [],
        status: favorites.status || 'idle',
        error: favorites.error || null,
      },
    };
  },
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;