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
import * as Icon from 'react-bootstrap-icons';



class RegistrationForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModalDangKi: false,
            smShow: false,
            email: "",
            password: "",
            modeDangki: "registration",
            isShowPassword: false,
            errMessage: '',
            roleId: 'R2',
            avatar: '',
            previewImgURL: '',
            address: "",
            cmnd: "",
            phoneNumber: "",
            dateOfBirth: ""
        };
    }

    setMode = modeDangki => {
        this.setState({
            modeDangki
        });
    };

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
            avatar: this.state.avatar,
            address: this.state.address,
            cmnd: this.state.cmnd,
            phoneNumber: this.state.phoneNumber,
            dateOfBirth: this.state.dateOfBirth,
        });
        this.setState({
            email: '',
            password: '',
            name: '',
            role: '',
            avatar: '',
            previewImgURL: '',
            address: '',
            cmnd: '',
            phoneNumber: '',
            dateOfBirth: ''

        })
        toast.success("Tạo Tài Khoản Thành Công");
    }
    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['email', 'password', 'name', 'address', 'cmnd', 'phoneNumber', 'dateOfBirth']
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
    renderRegister = () => {
        return (
            <div>
                <div>
                    <form className="form-horizontal form-loanable">

                        <fieldset>



                            <div className="form-row">
                                <div className="form-group col-6 ">
                                    <label className="col">Tên Tài Khoản Hoặc Email</label>
                                    <div className="col">
                                        <input
                                            type="text"
                                            name="email"
                                            className="form-control"
                                            placeholder="abc@gmail.com"
                                            onChange={(event) => { this.onChangeInput(event, 'email') }}
                                            value={this.state.email}

                                        />
                                    </div>

                                </div>
                                <div className="form-group col-6 ">
                                    <label className="col">Mật Khẩu</label>
                                    <div className="col">
                                        <div className="login-password-wrapper" style={{ display: 'flex' }}>
                                            <input
                                                type={this.state.isShowPassword ? 'text' : 'password'}
                                                className="form-control"
                                                placeholder="*****"
                                                onChange={(event) => { this.onChangeInput(event, 'password') }}
                                                value={this.state.password}
                                            />

                                            {/* Xài font awesome đi cha */}
                                            <span className="show-password-dangki" style={{ position: 'absolute', right: '20px' }} onClick={() => { this.handleShowHidePassword() }}>{this.state.isShowPassword && <Icon.EyeSlash size={30} />}{!this.state.isShowPassword && <Icon.Eye size={30} />} </span>

                                        </div>

                                    </div>
                                </div>
                                <div className="form-group col-6 ">
                                    <label className="col">Tên</label>
                                    <div className="col">
                                        <input
                                            type="text"
                                            className="form-control"
                                            onChange={(event) => { this.onChangeInput(event, 'name') }}
                                            value={this.state.name}
                                        />
                                    </div>
                                </div>
                                <div className="form-group col-6 ">
                                    <label className="col">Địa Chỉ</label>
                                    <div className="col">
                                        <input
                                            type="text"
                                            className="form-control"
                                            onChange={(event) => { this.onChangeInput(event, 'address') }}
                                            value={this.state.address}
                                        />
                                    </div>
                                </div>
                                <div className="form-group col-6 ">
                                    <label className="col">Số Điện Thoại</label>
                                    <div className="col">
                                        <input
                                            type="text"
                                            className="form-control"
                                            onChange={(event) => { this.onChangeInput(event, 'phoneNumber') }}
                                            value={this.state.phoneNumber}
                                        />
                                    </div>
                                </div>
                                <div className="form-group col-6">
                                    <label className="col">Chứng Minh Nhân Dân</label>
                                    <div className="col">
                                        <input
                                            type="text"
                                            className="form-control"
                                            onChange={(event) => { this.onChangeInput(event, 'cmnd') }}
                                            value={this.state.cmnd}
                                        />
                                    </div>
                                </div>
                                <div className="form-group col-6">
                                    <label className="col">Ngày Sinh</label>
                                    <div className="col">
                                        <input
                                            type="date"
                                            className="form-control"
                                            onChange={(event) => { this.onChangeInput(event, 'dateOfBirth') }}
                                            value={this.state.dateOfBirth}
                                        />
                                    </div>
                                </div>

                                <div className="form-group col-6 ">
                                    <label className="col">Ảnh Đại Diện</label>
                                    <div className="col">
                                        <div className='preview-img-container'>
                                            <input id='previewImg' type='file' hidden
                                                onChange={(event) => this.handleOnchangeImage(event)}

                                            />
                                            <label className='label-upload border' htmlFor='previewImg' style={{ background: '#bdbdbd', fontSize: '18px', borderRadius: '3px' }}>Chọn File<i className="fa-solid fa-up-from-bracket" ></i></label>
                                            <div className='preview-image border'
                                                style={{
                                                    backgroundImage: `url(${this.state.previewImgURL})`
                                                    , height: '200px',
                                                    backgroundSize: 'cover',
                                                    backgroundPosition: 'center'
                                                }}
                                                onClick={() => this.openPreviewImage()}
                                            ></div>
                                        </div>
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


            </div>
        );
    };
    render() {
        return (
            <div>
                <Modal
                    show={this.props.showModalDangKi}
                    onHide={this.props.onClose}
                    onSubmit={this.onSubmit}
                    // bsSize="large"
                    size="lg"
                >
                    <Modal.Header closeButton={false}>
                        <h2>{this.state.modeDangki === "registration" ? "Đăng Kí" : ''}</h2>
                    </Modal.Header>
                    <Modal.Body>
                        {this.state.modeDangki === "registration" ?
                            this.renderRegister() : ''
                        }
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.props.onClose}>Dóng</Button>
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
export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);


