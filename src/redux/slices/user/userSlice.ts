import {createSlice} from '@reduxjs/toolkit';
import {InitialState} from "./InitialState.interface.ts";
import {api} from "../../queries/authenticationApi.ts";

const initialState: InitialState = {
    userProfile: undefined,
}

const userProfileSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserProfile: (state: InitialState, action) => {
            state.userProfile = action.payload.userProfile
        },
        reset: () => {
            return initialState
        },
    },
    extraReducers: (builder) => {
        // each time getProfile will be called with success, userProfile state will be hydrated
        builder.addMatcher(
            api.endpoints.getProfile.matchFulfilled,
            (state, { payload }) => {
                state.userProfile = payload.body
            }
        )
    },
})

export const {reset, setUserProfile} = userProfileSlice.actions

export default userProfileSlice.reducer;
