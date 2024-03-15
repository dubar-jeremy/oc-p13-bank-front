import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {InitialState} from "./InitialState.interface.ts";

const initialState: InitialState = {
    isAuthenticated: false,
    token: undefined,
}

interface setIAuthenticatedPayloadAction {
    isAuthenticated: boolean
}

interface setTokenPayloadAction {
    token: string
}


const authenticationSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        setIsAuthenticated: (state: InitialState, action: PayloadAction<setIAuthenticatedPayloadAction>) => (
            {
                ...state,
                isAuthenticated: action.payload.isAuthenticated,
            }),
        setToken: (state: InitialState, action: PayloadAction<setTokenPayloadAction>) => ({
            ...state,
            token: action.payload.token
        }),
        reset: () => {
            return initialState
        },
    },
})

export const {reset, setIsAuthenticated, setToken} = authenticationSlice.actions

export default authenticationSlice.reducer;
