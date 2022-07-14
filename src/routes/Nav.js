import React from "react";
import './Nav.scss'
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";
import { connect } from 'react-redux';
import * as Icon from 'react-bootstrap-icons';
import { Link, withRouter } from 'react-router-dom';
import * as actions from "../store/actions";
class Nav extends React.Component {
    constructor() {
        super();
        this.state = {
            showModal: false,
            showModalDangKi: false,
            form: '',
        }
    }
    close = () => {
        this.setState({
            showModal: false,

        });
    }
    closeDangKi = () => {
        this.setState({

            showModalDangKi: false
        });
    }

    handleLogout = () => {
        this.props.processLogout() && this.props.history.push('/login');

    }

    open = () => {
        this.setState({
            showModal: true,

        });
    }
    openDangKi = () => {
        this.setState({

            showModalDangKi: true
        });
    }
    exit = () => {
        this.setState({
            userInfo: this.props.userInfo === null,
            isLoggedIn: false
        })
    }
    render() {
        const { processLogout, userInfo, isLoggedIn } = this.props;
        console.log('check user infor nav', userInfo);
        console.log('check user infor nav', isLoggedIn);
        let imageBase64 = '';
        if (userInfo) {
            imageBase64 = new Buffer(userInfo.image, 'base64').toString('binary');
        }
        return (
            <>

                <div className="topnav  sticky-top">
                    <nav className="navbar navbar-expand-lg navbar-dark  bg-primary  sticky-top">
                        <Link to="/" style={{ textDecoration: 'none' }}><span className="tittle-home-nav" style={{ color: 'white', fontSize: '35px', fontWeight: 'bolder' }}>TOEIC FREE</span></Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item active">
                                    <Link to='/' style={{ textDecoration: 'none' }}><p className="nav-link" >Trang Chủ </p></Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/nguphap" style={{ textDecoration: 'none' }}><p className="nav-link " >Ngữ Pháp</p></Link>
                                </li>
                                {isLoggedIn && userInfo.roleId === 'R1' ? <li className="nav-item">
                                    <Link to="/admin" style={{ textDecoration: 'none' }}><p className="nav-link " >Admin</p></Link>
                                </li> : ''}

                                <li className="nav-item dropdown">
                                    <p className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Luyện Thi
                                    </p>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <Link to="/luyenthi/part-1" style={{ textDecoration: 'none' }}><p className="dropdown-item">PART 1</p></Link>
                                        <div className="dropdown-divider"></div>
                                        <Link to="/luyenthi/part-2" style={{ textDecoration: 'none' }}><p className="dropdown-item">PART 2</p></Link>
                                        <div className="dropdown-divider"></div>
                                        <Link to="/luyenthi/part-3" style={{ textDecoration: 'none' }}><p className="dropdown-item">PART 3</p></Link>
                                        <div className="dropdown-divider"></div>
                                        <Link to="/luyenthi/part-4" style={{ textDecoration: 'none' }}><p className="dropdown-item">PART 4</p></Link>
                                        <div className="dropdown-divider"></div>
                                        <Link to="/luyenthi/part-5" style={{ textDecoration: 'none' }}><p className="dropdown-item">PART 5</p></Link>
                                        <div className="dropdown-divider"></div>
                                        <Link to="/luyenthi/part-6" style={{ textDecoration: 'none' }}><p className="dropdown-item">PART 6</p></Link>
                                        <div className="dropdown-divider"></div>
                                        <Link to="/luyenthi/part-7" style={{ textDecoration: 'none' }}><p className="dropdown-item">PART 7</p></Link>
                                    </div>
                                </li>
                                {/* <li className="nav-item">
                                    <Link to="/system/vocabulary-manage" style={{ textDecoration: 'none' }}><p className="nav-link">Mẹo Thi</p></Link>
                                </li> */}
                                <li className="nav-item">
                                    <Link to="/tuvung" style={{ textDecoration: 'none' }}><p className="nav-link" >Từ Vựng</p></Link>
                                </li>
                                {/* <li className="nav-item">
                                    <Link to="/note-user" style={{ textDecoration: 'none' }}><p className="nav-link" >Note</p></Link>
                                </li> */}
                                <li className="nav-item">

                                    <Link to="/thi-thu-online" style={{ textDecoration: 'none' }}><p className="nav-link" >Thi Thử Online</p></Link>
                                </li>

                            </ul>

                            {/* <img src={imageBase64} className='avatar-nav'
                                style={{ width: '50px', height: '50px', borderRadius: '50%', float: 'right' }}
                            /> */}
                            {isLoggedIn && userInfo && userInfo.roleId === 'R2' ?
                                <React.Fragment>
                                    <ul className="navbar-nav mr-0">
                                        <li className="nav-item dropdown">
                                            {userInfo && userInfo.image ? <div className='img-user' style={{ backgroundImage: `url(${imageBase64})` }}></div> : <div className='img-user' style={{ backgroundImage: 'none' }}></div>}
                                            <p className="nav-link dropdown-toggle " id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{ color: 'white' }}>
                                                {userInfo && userInfo.name ? userInfo.name : ''}
                                            </p>
                                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                <div className="btn btn-logout" onClick={this.handleLogout} >
                                                    <i className="fas fa-sign-out-alt" > {' '}Thoát</i>
                                                </div>
                                                <div className="dropdown-divider"></div>
                                            </div>
                                        </li>
                                    </ul>

                                    {/* <p className="name-user" style={{ color: 'white' }}>{userInfo.name}</p>
                                    <div className="btn btn-logout" onClick={this.handleLogout} >
                                        <i className="fas fa-sign-out-alt" ></i>
                                    </div> */}
                                </React.Fragment> :

                                <React.Fragment>
                                    {isLoggedIn && userInfo.roleId === 'R1' ?
                                        <>
                                            <ul className="navbar-nav mr-0">

                                                <li className="nav-item dropdown">

                                                    <p className="nav-link dropdown-toggle " id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{ color: 'white' }}>
                                                        {userInfo && userInfo.name ? userInfo.name : ''}

                                                    </p>



                                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                        <div className="btn btn-logout" onClick={this.handleLogout} >
                                                            <i className="fas fa-sign-out-alt" > {' '}Thoát</i>
                                                        </div>
                                                        <div className="dropdown-divider"></div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </>
                                        : <>
                                            <button className="btn btn-success my-2 my-sm-0 mr-3 button-dangki" onClick={this.openDangKi} >Đăng Ký</button>
                                            <RegistrationForm showModalDangKi={this.state.showModalDangKi} onClose={this.closeDangKi} />
                                            <button className="btn btn-warning my-2 my-sm-0 button-dangnhap " onClick={this.open} >Đăng Nhập</button>
                                            <LoginForm showModal={this.state.showModal} onClose={this.close} />
                                        </>}


                                </React.Fragment>}
                            {/* {isLoggedIn && userInfo.roleId === 'R1' ?
                                <React.Fragment>

                                    <ul className="navbar-nav mr-0">
                                        <li className="nav-item dropdown">
                                            <p className="nav-link dropdown-toggle " id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{ color: 'white' }}>
                                                {userInfo && userInfo.name ? userInfo.name : ''}
                                            </p>
                                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                <div className="btn btn-logout" onClick={this.handleLogout} >
                                                    <i className="fas fa-sign-out-alt" > {' '}Thoát</i>
                                                </div>
                                                <div className="dropdown-divider"></div>
                                            </div>
                                        </li>
                                    </ul>

                                 
                                </React.Fragment> : <React.Fragment>
                                

                                </React.Fragment>} */}

                        </div>
                    </nav>




                </div>

            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Nav));