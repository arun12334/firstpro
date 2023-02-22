
import HRIMG from './img/h-t-img.png';
import LOGO from './img/logo-main.png';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useLocation, useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import StyleIcon from '@mui/icons-material/Style';
import RefreshIcon from '@mui/icons-material/Refresh';
import ArticleIcon from '@mui/icons-material/Article';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { useState } from 'react';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

const Header = () => {
    let userType = localStorage.getItem("userType");
    const navigate = useNavigate();
    const url = useLocation();
    console.log(url)
    const handleLogout = () => {
        localStorage.clear();
        sessionStorage.clear()
        navigate('/');
    }

    const [color, setColor] = useState();
    return (
        <div className="header-wrapper ">
            <div className="header bo-bottom">
                <div className="inner">
                    <nav class="navbar navbar-expand-lg remove-padding shadow-header">
                        <img className='ctrl-wi' src={LOGO} alt="logo-main" />
                        <div class="collapse navbar-collapse" id="collapsibleNavbar">
                            <ul class="navbar-nav">
                                <li class="nav-item">

                                    <a class={url.pathname === '/managerDashBoard' || '/ptDashboard' ? "nav-link-active" : "nav-link"} href={userType === 'Manager' ? '/#/managerDashBoard' : '/#/ptDashboard'}> <DashboardIcon /> Dashboard</a>
                                </li>
                                {userType === 'Manager' && (
                                    <li class="nav-item">
                                        <a class={url.pathname === '/managerImport' ? "nav-link-active" : "nav-link"} href="/#/managerImport"> <CloudDownloadIcon /> Imports</a>
                                    </li>
                                )}
                                {userType === 'Manager' && (

                                    <li class="nav-item">
                                        <a class={url.pathname === '/managerMasters/allocation' ? "nav-link-active" : "nav-link"} href="/#/managerMasters/allocation"> <ManageAccountsIcon /> Allocation</a>
                                    </li>
                                )}
                                {userType === 'Manager' && (

                                    <li class="nav-item">
                                        <a class={url.pathname === '/managerExports' ? "nav-link-active" : "nav-link"} href="/#/managerExports"> <UnarchiveIcon /> Exports</a>
                                    </li>
                                )}
                                {userType === 'Manager' && (

                                    <li class="nav-item dropdown" >
                                        <a class={(url.pathname === '/managerMasters/Project' || url.pathname === '/managerMasters/process' || url.pathname === '/managerMasters/field' || url.pathname === '/managerMasters/user' || url.pathname === '/managerMasters/errortype') ? "nav-link-dropdown-active" : "nav-link dropdown-toggle"} href="www.rt.com" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            <SettingsSuggestIcon /> Masters <ArrowDropDownIcon />
                                        </a>
                                        <ul class="dropdown-menu">
                                            <li><a class={url.pathname === '/managerMasters/Project' ? "dropdown-item-active" : "dropdown-item"} href="/#/managerMasters/Project"><StyleIcon />Project</a></li>
                                            <li><a class={url.pathname === '/managerMasters/process' ? "dropdown-item-active" : "dropdown-item"} href="/#/managerMasters/process"> <RefreshIcon /> Process</a></li>
                                            <li><a class={url.pathname === '/managerMasters/field' ? "dropdown-item-active" : "dropdown-item"} href="/#/managerMasters/field"> <ArticleIcon /> Field</a></li>
                                            <li><a class={url.pathname === '/managerMasters/user' ? "dropdown-item-active" : "dropdown-item"} href="/#/managerMasters/user"> <AccountCircleIcon /> User</a></li>
                                            {/* <li><a class={url.pathname === '/managerMasters/errortype' ? "dropdown-item-active" : "dropdown-item"} href="/#/managerMasters/errortype"> <ReportProblemIcon/> Error Type</a></li> */}

                                        </ul>
                                    </li>
                                )}

                                {/* <li class="nav-item">
                                    <a class="nav-link" href="/#/Forgetpassword">Reset Password</a>
                                </li> */}
                            </ul>

                        </div>
                        <ul class="nav navbar-nav navbar-right">
                            <div class="nav-right-content fo-flx">
                                <div className="header-img-wrp">
                                    <img src={HRIMG} alt="logo-main" />
                                </div>
                                <div class="content fo-flx">
                                    <div class="prof fo-flx">
                                        <div class="dd">
                                            <h6>DB manager</h6>
                                            <p>Welcome</p>
                                        </div>
                                        <div class="img-wr">
                                            <PowerSettingsNewIcon className="primary-ic" fontSize="small" onClick={handleLogout} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default Header