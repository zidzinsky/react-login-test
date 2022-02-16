import { userConstants } from '../constants';
import { userService } from '../services';
import { alertActions } from './';
import { history } from '../helpers';

export const userActions = {
  login,
  logout,
  register,
};

function login(email, password, from) {
  return (dispatch) => {
    dispatch({ type: userConstants.LOGIN_REQUEST });

    userService.login(email, password).then(
      ({ user }) => {
        dispatch({ type: userConstants.LOGIN_SUCCESS, user });
        history.push(from);
      },
      (error) => {
        dispatch({ type: userConstants.LOGIN_FAILURE, error: error.toString() });
        dispatch(alertActions.error(error.toString()));
      }
    );
  };
}

function logout() {
  userService.logout();
  return { type: userConstants.LOGOUT };
}

function register(user) {
  return (dispatch) => {
    dispatch(request(user));

    userService.register(user).then(
      (user) => {
        dispatch(success());
        history.push('/login');
        dispatch(alertActions.success('Registration successful'));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: userConstants.REGISTER_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.REGISTER_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.REGISTER_FAILURE, error };
  }
}
