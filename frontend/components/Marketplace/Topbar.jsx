import React, { useState } from 'react'
import {Link} from "react-router-dom"
import PropTypes from "prop-types"
import { connect } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css';
// images 
import logo from "../../assets/img/logo.png"
//icons 
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import { useQWallet } from '../../hooks/useQWallet';
function Topbar({user}) {
  const { isSignedIn, wallet } = useQWallet();
  const [userDropdown, setUserDropdown] = useState(false)

	const toggleUserDropdown = () => {
		setUserDropdown(!userDropdown);
	}

  return (
    <div>
      <header className="header_area">
        <div id="sticky-header" className="header_bottom white_bg pl-130 pr-130" 
        style={{paddingLeft: '140px', paddingRight: '140px'}}>
            <div className="container-fluid">
                <div className="row align-items-center">
                    <div className="col-xl-2 col-lg-2 col-6">
                        <div className="logo">
                        <Link to="/"><img src={logo} alt="" /></Link> 
                        </div>
                    </div>
                    <div className="col-xl-7 col-lg-8 d-none d-lg-block">
                        <nav className="main_menu">
                          <ul>
                            <li><Link to="/">Home</Link></li>
                            <li>
                              <Link to="/courses">Courses</Link>
                            </li>
                            <li>
                              <Link to="/forum">Forum</Link>
                            </li>
                          </ul>
                        </nav>
                    </div>
                    <div className="col-xl-3 col-lg-2 col-6 d-flex justify-content-end">
                        

                        { !isSignedIn ? 
                          <div className="header_right">
                              <div className="account">
                                  <Link to="/login">account</Link>
                              </div>
                          </div>: 
                          <div className="header_search_wrap" onClick={toggleUserDropdown}>
                            <div className="search_main">
                                {userDropdown ? <CloseIcon /> : <MenuIcon />}
                            </div>
                          </div>
                        }
                        
                        { userDropdown && 
                          <div className="topbar_dropdown">
                           <ul>
                             <li> {wallet.accountId} </li>
                             <li> <Link to="/dashboard"><PersonIcon /> Dashboard</Link> </li>
                             <li> <Link to="/settings"><SettingsIcon/> Settings</Link> </li>
                             <li onClick={() => wallet.signOut()}> <LogoutIcon/> Logout</li>
                           </ul>
                          </div>
                        }
                        
                    </div>
                </div>
            </div>
        </div>
      </header>
    </div>
  )
}
Topbar.propTypes = {
  user: PropTypes.object
}

const mapStateToProps = state => {
  return{
    user: state.authentication.user
  }
}

export default connect(mapStateToProps)(Topbar)
