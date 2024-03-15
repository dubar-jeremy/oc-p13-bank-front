import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {
    EditProfileBodyInterface,
    EditProfileResponse,
    RequestSuccessInterface,
    SignInBodyInterface,
    Token,
    UserProfile
} from "../../interfaces/api.interfaces.ts";
import {RootState} from "../store.ts";

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3001/api/v1/user',
        prepareHeaders: async (headers, {getState}) => {
            const state = getState() as RootState;

            const token = state.authentication.token;

            if (token) {
                headers.set('authorization', 'Bearer' + token);
            }
            return headers;
        },
        headers: {
            "Content-Type": "application/json",
        },
        mode: 'cors',
    },),
    tagTypes: ['Profile'],
    endpoints: (builder) => ({
        signIn: builder.mutation<RequestSuccessInterface<Token>, SignInBodyInterface>({
            query: (body) => ({
                url: '/login',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Profile']
        }),
        getProfile: builder.query<RequestSuccessInterface<UserProfile>, void>({
            query: () => ({
                url: '/profile',
                method: 'POST',
            }),
            providesTags: ['Profile'],
        }),
        editProfile: builder.mutation<RequestSuccessInterface<EditProfileResponse>, EditProfileBodyInterface>({
            query: (body) => ({
                url: '/profile',
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['Profile'],

        })
    }),
})

export const {useSignInMutation, useGetProfileQuery, useEditProfileMutation} = api
