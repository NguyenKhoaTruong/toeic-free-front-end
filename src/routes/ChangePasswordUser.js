import React, { Component } from "react";

import { handleLoginApi } from "../services/userService";
import { CommonUtils } from "../utils"
import * as actions from "../store/actions";
import { push } from "connected-react-router";
import { connect } from 'react-redux';
import {
    Button,
    Modal,
} from "react-bootstrap";
import _ from 'lodash';



class ChangePasswordUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModalChangePasswordUser: false,
            smShow: false,
            id: this.props.userInfo.id,
            email: this.props.userInfo.email,
            password: "",
            mode: "editPasswordUser",
            isShowPassword: false,
            errMessage: '',


        };
    }
    componentDidMount() {
        let user = this.props.currenInfotUser;

        console.log('check data props user', user)
        if (user && !_.isEmpty(user)) {
            this.setState({
                id: user.id,
                email: user.email,
                password: user.password,
            })
        }
        console.log('didmoutn edit modal', this.props.currenInfotUser);
        console.log('check props', this.props)
    }
    setMode = mode => {
        this.setState({
            mode
        });
    };
    handleSavePasswordUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid === true) {
            this.props.editPassdUser(this.state);
        }
        console.log('check save user', this.state)


    }
    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['password']
        // let arrCheck = ['email', 'password', 'name', 'image']
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert('Chưa Nhập :' + ' ' + arrCheck[i])
                break;
            }
        }
        return isValid;
    }
    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
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

    renderEditPasswordUser = () => {
        const { isLoggedIn, userInfo, currenInfotUser } = this.props;
        console.log('check props', this.props)
        return (
            <div>
                <form className="form-horizontal " >
                    <fieldset>
                        <div className="row">
                            {isLoggedIn && userInfo ?
                                <>
                                    <div className="form-group  ">
                                        <label className="col-sm-3">Email</label>
                                        <div className="col-sm-12">
                                            <input
                                                type="text"
                                                name="email"
                                                className="form-control"
                                                placeholder="Nhập Email"
                                                onChange={(event) => this.handleOnChangeEmail(event)}
                                                value={currenInfotUser.email}
                                                disabled
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group ">
                                        <label className="col-sm-4">Password</label>
                                        <div className="col-sm-12">
                                            <div className="login-password-wrapper">
                                                <input
                                                    type={this.state.isShowPassword ? 'text' : 'password'}
                                                    className="form-control"
                                                    placeholder="*****"
                                                    onChange={(event) => { this.onChangeInput(event, 'password') }}
                                                    value={this.state.password}

                                                />
                                            </div>
                                        </div>
                                    </div>
                                </>
                                :
                                <>
                                </>}


                        </div>
                    </fieldset>
                    <div className="col-12 my-3" style={{ color: 'red' }}>
                        {this.state.errMessage}
                    </div>
                    <div className="form-action">
                        <button
                            type="button"
                            className="btn btn-lg btn-warning btn-left"
                            onClick={() => { this.handleSavePasswordUser() }}>Lưu Thay Đổi<span className="icon-arrow-right2 outlined"></span></button>
                    </div>
                </form>
            </div>
        );
    };

    render() {
        console.log('check props changepassword:', this.props.onClose)
        return (
            <div>
                <Modal backdrop="static" centered
                    show={this.props.onshow}
                    onHide={this.props.onClose}
                    onSubmit={this.onSubmit}
                    // bsSize="large"
                    size="lg"
                >
                    <Modal.Header >
                        <h2>{this.state.mode === "editPasswordUser" && "Đổi Mật Khẩu"}</h2>

                    </Modal.Header>
                    <Modal.Body>

                        {this.state.mode === "editPasswordUser" && (this.renderEditPasswordUser())}
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
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ChangePasswordUser);


