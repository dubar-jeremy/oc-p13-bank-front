/**
 * Request generic Interfaces as all responses from the api have the same "payload"
 */
export interface RequestSuccessInterface<T> {
    status: number;
    message: string;
    body: T
}

export interface RequestErrorInterface {
    status: number;
    message: string;
}

/**
 * In a production-mode application, request body and responses would be (ideally) provided by an SDK
 * shared between the backend and the front end to avoid errors
 */


/**
 * Body Interfaces
 */

export interface SignInBodyInterface {
    email: string;
    password: string;
}

export interface EditProfileBodyInterface {
    firstName: string,
    lastName: string,
}

/**
 * Responses Interfaces
 */

export interface Token {
    token: string;
}

export interface UserProfile {
    email: string,
    firstName?: string,
    lastName?: string,
    createdAt: string,
    updatedAt?: string,
    id: string
}

export interface EditProfileResponse {
    id: string,
    email: string,
}
