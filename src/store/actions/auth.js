import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
	return {
		type: actionTypes.AUTH_START,
	};
};

export const authSuccess = (token, userId) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		idToken: token,
		userId: userId,
	};
};

export const authFail = (error) => {
	return {
		type: actionTypes.AUTH_FAIL,
		error: error,
	};
};

export const logout = () => {
	return {
		type: actionTypes.AUTH_LOGOUT,
	};
};

export const checkAuthTimeout = (expirationTime) => {
	return (dispatch) => {
		setTimeout(() => {
			dispatch(logout());
		}, expirationTime * 1000);
	};
};

export const auth = (email, password, isSignup) => {
	return (dispatch) => {
		dispatch(authStart());
		const authData = {
			email: email,
			password: password,
			returnSecureToken: true,
		};
		let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAt547OmrfMl5wKdr8dt1HKyU2oJOrxxwM';
		if (!isSignup) {
			url =
				'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAt547OmrfMl5wKdr8dt1HKyU2oJOrxxwM';
		}
		axios
			.post(url, authData)
			.then((res) => {
				console.log(res);
				dispatch(authSuccess(res.data.idToken, res.data.localId));
				dispatch(checkAuthTimeout(res.data.expiresIn));
			})
			.catch((err) => {
				console.log(err.response.data);
				dispatch(authFail(err.response.data.error.message));
			});
	};
};

export const setAuthRedirectPath = (path) => {
	return {
		type: actionTypes.SET_AUTH_REDIRECT_PATH,
		path: path,
	};
};
