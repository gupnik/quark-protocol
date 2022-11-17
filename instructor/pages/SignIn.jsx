import React, { useState, useEffect } from 'react'
import styled from "styled-components"
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { connect } from 'react-redux';
import * as actions from "../store/authentication/authentication.actions"
import PropTypes from 'prop-types'; 
import { Link } from 'react-router-dom';
import { removeStoredAuthToken } from '../utils/currentUser';
import { Redirect } from 'react-router';

// components 
import Button from '../components/common/Button';
import FormInput from '../components/form/FormInput';

import logo from "../assets/img/logo.svg"
import { useQWallet } from '../hooks/useQWallet'

function SignIn({login, loading, hasErrors, token}) {
	const { isSignedIn, wallet } = useQWallet();

	const [errors, setError] = useState({})

	function handleSubmit(e){
		e.preventDefault()

		// let user = {email,password} 

		// login(user)
		wallet.signIn();
	}

	if (isSignedIn) return <Redirect to="/dashboard" />
  return (
    <div className="sign_in_up_bg">
		<div className="container">
			<div className="row justify-content-lg-center justify-content-md-center">
				<div className="col-lg-12">
					<div className="main_logo25" id="logo">
						<a href="index.html"> <img src={logo} alt="" /></a>
						<a href="index.html"></a>
					</div>
				</div>
			
				<div className="col-lg-6 col-md-8">
					<div className="sign_form">
						<h2>Welcome Back</h2>
						<p>Log In to Your Quark Account!</p>

						<form onSubmit={handleSubmit}>
							 <Button text="SignIn With NEAR Wallet" className="col-md-12" />
							 {loading && 'Chargement...'}
							 {hasErrors && 'errors'}
						</form>						
					</div>
				</div>				
			</div>				
		</div>				
	</div>
  )
}

SignIn.propTypes = {
  loading: PropTypes.bool,
  login: PropTypes.func,
	hasErrors: PropTypes.bool,
	token: PropTypes.string
}

const mapStateToProps = state => {
	return {
		loading: state.authentication.loading,
		hasErrors: state.authentication.hasErrors,
		token: state.authentication.token
	}
}

const mapDispatchToProps = dispatch => {
	return {
		login: user => dispatch(actions.login(user))
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(SignIn)
