import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import { api } from './queries/authenticationApi.ts'
import userReducer from './slices/user/userSlice.ts'
import authenticationReducer from './slices/authentication/authenticationSlice.ts';


const authenticationPersistConfig = {
    key: 'authentication',
    version: 1,
    storage,
};

const userPersistConfig = {
    key: 'user',
    version: 1,
    storage,
};

const persistedAuthenticationReducer = persistReducer(
    authenticationPersistConfig,
    authenticationReducer
);

const persistedUserReducer = persistReducer(userPersistConfig, userReducer);


export const store = configureStore({
    reducer: {
        authentication: persistedAuthenticationReducer,
        user: persistedUserReducer,
        [api.reducerPath]: api.reducer,
    },
    devTools: true,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },

        }).concat(api.middleware),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

