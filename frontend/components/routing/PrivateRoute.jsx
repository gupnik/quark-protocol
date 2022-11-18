import React from 'react'
import { Route, Redirect } from "react-router-dom"
import { getStoredAuthToken } from "../../utils/currentUser"
import PropTypes from 'prop-types'; 
import { useQWallet } from '../../hooks/useQWallet';

function PrivateRoute({component: Component, ...rest}) {
  const { isSignedIn } = useQWallet();

  return (
    <Route {...rest} render={props => (
      isSignedIn ?
      <Component {...props} />
      : <Redirect to="/login" />
    )}
    />
  )
}
PrivateRoute.propTypes = {
  component: PropTypes.func,
}

export default PrivateRoute
