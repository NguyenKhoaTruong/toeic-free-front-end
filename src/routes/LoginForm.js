import React, { Component } from "react";

import { handleLoginApi, createNewUserService } from "../services/userService";
import { toast } from 'react-toastify';
import * as actions from "../store/actions";
import { push } from "connected-react-router";
import { connect } from 'react-redux';
import { CommonUtils } from "../utils";
import {

    Button,
    Modal,

} from "react-bootstrap";

import CreateNewAccount from "./CreateNewAccount";
import * as Icon from 'react-bootstrap-icons';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            smShow: false,
            email: "",
            password: "",
            mode: "login",
            isShowPassword: false,
            errMessage: '',
            roleId: 'R2',
            avatar: '',
            previewImgURL: '',
        };
    }

    setMode = mode => {
        this.setState({
            mode
        });
    };
    // bỏ
    renderForgot = () => {
        return (
            <div>
                <p>inside of forgot! :) </p>
                <a
                    href="#"
                    onClick={e => {
                        e.preventDefault();
                        this.setMode("login");
                    }}
                >
                    Back to login
                </a>
            </div>
        );
    };
    //bỏ


    handleOnchangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];

        // chuyen anh da chon tu file sang dang blob va tao url
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            console.log('chekc base64 image', base64)
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgURL: objectUrl,
                avatar: base64
            })
        }


    }
    openPreviewImage = () => {
        if (!this.state.previewImgURL) return;
        this.setState({
            isOpen: true
        })
    }
    onChangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
        console.log('check input good code', copyState)
    }
    handleAddNewUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid === false) return;
        console.log('checl submit state', this.state);
        createNewUserService({
            email: this.state.email,
            password: this.state.password,
            name: this.state.name,
            roleId: this.state.roleId,
            avatar: this.state.avatar


        });
        this.setState({
            email: '',
            password: '',
            name: '',
            role: '',
            avatar: '',
            previewImgURL: '',

        })
        toast.success("Tạo Tài Khoản Thành Công");
    }
    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['email', 'password', 'name']
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert('Chưa Nhập :' + ' ' + arrCheck[i])
                break;
            }
        }
        return isValid;
    }
    renderRegister = () => {
        return (
            <div>
                <div>
                    <form className="form-horizontal form-loanable">

                        <fieldset>
                            <div className="form-group ">
                                <label className="col-sm-5">Tên Tài Khoản Hoặc Email</label>
                                <div className="col-sm-7">
                                    <input
                                        type="text"
                                        name="email"
                                        className="form-control"
                                        placeholder="abc@gmail.com"
                                        onChange={(event) => { this.onChangeInput(event, 'email') }}
                                        value={this.state.email}

                                    />
                                </div>
                                { /* console.log('error email ::: ' + JSON.stringify(errors)) */}
                            </div>

                            <div className="form-group ">
                                <label className="col-sm-5">Mật Khẩu</label>
                                <div className="col-sm-7">
                                    <div className="login-password-wrapper">
                                        <input
                                            type={this.state.isShowPassword ? 'text' : 'password'}
                                            className="form-control"
                                            placeholder="*****"
                                            onChange={(event) => { this.onChangeInput(event, 'password') }}
                                            value={this.state.password}
                                        />

                                        {/* Xài font awesome đi cha */}
                                        <span onClick={() => { this.handleShowHidePassword() }}>{this.state.isShowPassword && <b>Ẩn Mật Khẩu</b>}{!this.state.isShowPassword && <b>Hiển Thị Mật Khẩu</b>} </span>

                                    </div>

                                </div>
                            </div>
                            <div className="form-group ">
                                <label className="col-sm-3">Biệt Danh</label>
                                <div className="col-sm-6">
                                    <input
                                        type="text"
                                        className="form-control"
                                        onChange={(event) => { this.onChangeInput(event, 'name') }}
                                        value={this.state.name}
                                    />
                                </div>
                            </div>
                            <div className="form-group ">
                                <label className="col-sm-3">Ảnh Đại Diện</label>
                                <div className="col-sm-6">
                                    <div className='preview-img-container'>
                                        <input id='previewImg' type='file' hidden
                                            onChange={(event) => this.handleOnchangeImage(event)}

                                        />
                                        <label className='label-upload' htmlFor='previewImg'>Tải Ảnh<i className="fa-solid fa-up-from-bracket"></i></label>
                                        <div className='preview-image'
                                            style={{ backgroundImage: `url(${this.state.previewImgURL})` }}
                                            onClick={() => this.openPreviewImage()}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group " style={{ display: "none" }}>
                                <label className="col-sm-3">Quyền</label>
                                <div className="col-sm-12">
                                    <select className='form-control'
                                        value={this.state.roleId}
                                    >
                                    </select>
                                </div>
                            </div>
                        </fieldset>
                        <div className="form-action">
                            <button
                                type="button"
                                className="btn btn-lg btn-primary btn-left"
                                onClick={() => { this.handleAddNewUser() }}
                            >Tạo Tài Khoản<span className="icon-arrow-right2 outlined"></span></button>

                        </div>
                    </form>

                </div>
                <a
                    href="#"
                    onClick={e => {
                        e.preventDefault();
                        this.setMode("login");
                    }}
                >
                    Đăng Nhập Ngay
                </a>
            </div>
        );
    };
    handleOnChangeEmail = (event) => {
        this.setState({
            email: event.target.value
        })
        console.log(event.target.value); // lấy giá trị
    }
    handleOnChangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
        console.log(event.target.value); // lấy giá trị
    }
    handleLogin = async () => {

        this.setState({
            errMessage: ''
        })
        try {
            let data = await handleLoginApi(this.state.email, this.state.password);
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message
                })
            }
            if (data && data.errCode === 0) {
                //to lo login succedd
                this.props.userLoginSuccess(data.user);
                // this.props.history.push('/');
                console.log('login succedd');
            }

            console.log("check data login", data);
        } catch (error) {
            if (error.response) {
                if (error.response.data) {
                    this.setState({
                        errMessage: error.response.data.message
                    })
                }
            }
            console.log('console bug', error.response)

        }

    }
    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }
    renderLogin = () => {
        return (
            <div>
                <form className="form-horizontal " >
                    <fieldset>
                        <div className="form-group ">
                            <label className="col-sm-5">Email</label>
                            <div className="col-sm-7">
                                <input
                                    type="text"
                                    name="email"
                                    className="form-control"
                                    placeholder="abc@gmail.com"
                                    onChange={(event) => this.handleOnChangeEmail(event)}
                                    value={this.state.email}

                                />
                            </div>
                            { /* console.log('error email ::: ' + JSON.stringify(errors)) */}
                        </div>
                        <div className="form-group ">
                            <label className="col-sm-5">Mật Khẩu</label>
                            <div className="col-sm-7">
                                <div className="login-password-wrapper" style={{ display: 'flex' }}>
                                    <input
                                        type={this.state.isShowPassword ? 'text' : 'password'}
                                        className="form-control"
                                        placeholder="*****"
                                        onChange={(event) => this.handleOnChangePassword(event)}
                                        value={this.state.password}
                                    />

                                    {/* Xài font awesome đi cha */}
                                    <span className="show-password-dangnhap" style={{ position: 'absolute', right: '20px' }} onClick={() => { this.handleShowHidePassword() }}>{this.state.isShowPassword && <Icon.EyeSlash size={30} />}{!this.state.isShowPassword && <Icon.Eye size={30} />} </span>

                                </div>

                            </div>
                        </div>
                    </fieldset>
                    <div className="col-12 my-3" style={{ color: 'red' }}>
                        {this.state.errMessage}
                    </div>
                    <div className="form-action">
                        <button
                            type="button"
                            className="btn btn-lg btn-primary btn-left"
                            onClick={() => { this.handleLogin() }}>Đăng Nhập<span className="icon-arrow-right2 outlined"></span></button>
                    </div>
                </form>
                {/* <a
                    href="#"
                    onClick={e => {
                        e.preventDefault();
                        this.setMode("register");
                    }}
                >
                    Tạo Tài Khoản
                </a> */}
            </div>
        );
    };

    render() {
        console.log('ckeck props login', this.props)
        console.log('ckeck props login', this.props.onClose)
        return (
            <div>
                <Modal
                    show={this.props.showModal}
                    onHide={this.props.onClose}
                    onSubmit={this.onSubmit}
                    // bsSize="large"
                    size="lg"
                >
                    <Modal.Header closeButton={false}>
                        <h2>{this.state.mode === "login" ? "Đăng Nhập" : this.state.mode === "register" ? "Đăng Kí" : "Forgot Password"}</h2>
                    </Modal.Header>
                    <Modal.Body>
                        {this.state.mode === "login" ? (this.renderLogin()) : this.state.mode === "register" ? (this.renderRegister()) : (this.renderForgot())}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.props.onClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {

    };
};
const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        userLoginSuccess: (userInfor) => dispatch(actions.userLoginSuccess(userInfor))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
// export default LoginForm;

