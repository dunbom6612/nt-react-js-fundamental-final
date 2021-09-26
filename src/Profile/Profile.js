import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Login from '../Login/Login';
import axios from 'axios';
import { authContext } from '../AuthContext/authContext';

Profile.propTypes = {};

const GET_USER_URL = 'https://60dff0ba6b689e001788c858.mockapi.io/users/';

function Profile() {
  const [user] = useContext(authContext);
  const [userInfo, setUserInfo] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    axios({
      method: 'GET',
      url: `${GET_USER_URL}${user.userId}`,
      headers: {
        Authorization: user.token
      }
    }).then((res) => {
      console.log(res.data);
      setUserInfo(res.data);
      setLoading(false);
    });
  }, []);

  return loading ? (
    <div> {'LOADING...'}</div>
  ) : (
    <div className='profile'>
      <h1>{'Profile'}</h1>
      <div>
        <label>Name:</label> {userInfo.name}
      </div>
      <div>
        <label>UserId:</label>
        {userInfo.id}
      </div>
    </div>
  );
}

export default Profile;
