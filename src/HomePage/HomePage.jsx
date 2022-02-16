import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { userActions } from '../actions';

function HomePage() {
    const user = useSelector(state => state.authentication.user);
    const dispatch = useDispatch();

    function handleLogout () {
        dispatch(userActions.logout())
    }

    return (
        <div className="col-lg-8 offset-lg-2">
            <h1>Welcome {`${user.firstName} ${user.lastName}`}!</h1>
            <p>To logout click <a href="" onClick={handleLogout}>here</a></p>
        </div>
    );
}

export { HomePage };