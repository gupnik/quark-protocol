export const GET_USER_LOADING = 'GET USER LOADING';
export const GET_USER_SUCCESS = 'GET USER SUCCESS';
export const GET_USER_FAILURES = 'GET USER FAILURES';

export const getUser = () => ({ type: GET_USER_LOADING });
export const getUserSuccess = (user) => ({ type: GET_USER_SUCCESS, payload: user });
export const getUserFailures = () => ({ type: GET_USER_FAILURES });

export function fetchUser(id) {
    return async (dispatch) => {
        dispatch(getUser());
        try {
            const data = {
                user: {
                    name: 'N',
                },
            };

            dispatch(getUserSuccess(data.user));
        } catch (error) {
            dispatch(getUserFailures());
        }
    };
}
