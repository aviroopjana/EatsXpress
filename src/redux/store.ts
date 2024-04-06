import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import { persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import restaurantReducer from './restaurant/restaurantSlice';
import menuReducer from './restaurant/menuSlice';
import cuisineReducer from './restaurant/cuisineSlice';
import cartReducer from './cart/cartSlice';

const rootReducers = combineReducers({
  user: userReducer,
  restaurant: restaurantReducer,
  menu: menuReducer,
  cuisine: cuisineReducer, 
  cart: cartReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
}

const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({ serializableCheck: false }),
})

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch