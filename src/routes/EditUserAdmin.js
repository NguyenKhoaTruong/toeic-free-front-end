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
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';


class EditUserAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            smShow: false,
            id: '',
            email: "",
            password: "",
            name: '',
            roleId: '',
            image: '',
            avatar: '',
            address: '',
            cmnd: '',
            phoneNumber: '',
            dateOfBirth: '',
            mode: "editUser",
            isShowPassword: false,
            errMessage: '',
            previewImgURL: '',
            isOpen: false,
        };
    }
    componentDidMount() {
        let user = this.props.currentUser;
        let imageBase64 = '';
        if (user.image) {
            // const imageBuffer = Buffer.from(JSON.stringify(user.image));
            // imageBase64 = `data:image/png;base64,` + imageBuffer.toString('base64');
            imageBase64 = new Buffer(user.image, 'base64').toString('binary');

        }
        console.log('check data props user', user)
        if (user && !_.isEmpty(user)) {
            this.setState({
                id: user.id,
                email: user.email,
                password: 'harcode',
                name: user.name,
                roleId: user.roleId,
                image: user.image,
                address: user.address,
                cmnd: user.cmnd,
                phoneNumber: user.phoneNumber,
                dateOfBirth: user.dateOfBirth,
                // avatar: '',
                previewImgURL: imageBase64,
            }, () => {
                console.log('eidt user check base 64', this.state.previewImgURL)
            })
        }
        console.log('didmoutn edit modal', this.props.currentUser);

    }
    setMode = mode => {
        this.setState({
            mode
        });
    };
    openPreviewImage = () => {
        if (!this.state.previewImgURL) return;
        this.setState({
            isOpen: true
        })
    }
    handleSaveUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid === true) {
            this.props.editUser(this.state);
        }
        console.log('check save user', this.state)


    }

    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['email', 'password', 'name', 'roleId', 'address', 'cmnd', 'phoneNumber', 'dateOfBirth']
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
    handleOnchangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        // chuyen anh da chon tu file sang dang blob va tao url
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            // console.log('chekc base64 image', base64)
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgURL: objectUrl,
                avatar: base64,
            }, () => {
                console.log('chekc base64 image avataer', this.state.previewImgURL)
            })
        }


    }
    onChangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
        console.log('check input good code', copyState)
    }
    renderEditUser = () => {
        return (
            <div>
                <form className="form-horizontal " >
                    <fieldset>
                        <div className="form-row">
                            <div className="form-group col-4">
                                <label className="col">Email</label>
                                <div className="col">
                                    <input
                                        type="text"
                                        name="email"
                                        className="form-control"
                                        placeholder="Nhập Email"
                                        onChange={(event) => this.handleOnChangeEmail(event)}
                                        value={this.state.email}
                                        disabled
                                    />
                                </div>
                            </div>
                            <div className="form-group  col-4">
                                <label className="col">Password</label>
                                <div className="col">
                                    <div className="login-password-wrapper">
                                        <input
                                            type={this.state.isShowPassword ? 'text' : 'password'}
                                            className="form-control"
                                            placeholder="*****"
                                            onChange={(event) => this.handleOnChangePassword(event)}
                                            value={this.state.password}
                                            disabled
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group col-4">
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
                            <div className="form-group col-4">
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
                            <div className="form-group col-4">
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
                            <div className="form-group col-4">
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
                            <div className="form-group col-4">
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
                            <div className="form-group col-4">
                                <label className="col">Quyền</label>
                                <div className="col">
                                    <select className='form-control'
                                        onChange={(event) => { this.onChangeInput(event, 'roleId') }}
                                        value={this.state.roleId}
                                    >
                                        <option >______</option>
                                        <option value='R1'>Quản Trị Viên</option>
                                        <option value='R2'>Người Dùng</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-group col-4">
                                <label className="col">Ảnh</label>
                                <div className="col">
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
                        </div>
                    </fieldset>
                    <div className="col-12 my-3" style={{ color: 'red' }}>
                        {this.state.errMessage}
                    </div>
                    <div className="form-action">
                        <button
                            type="button"
                            className="btn btn-lg btn-warning btn-left"
                            onClick={() => { this.handleSaveUser() }}>Lưu Thay Đổi<span className="icon-arrow-right2 outlined"></span></button>
                    </div>
                </form>
            </div>
        );
    };

    render() {
        console.log('check props from parrent:', this.props)
        return (
            <div>
                {this.state.isOpen === true &&
                    <Lightbox
                        mainSrc={this.state.previewImgURL}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />}
                <Modal
                    show={this.props.showModalEditUser}
                    onHide={this.props.onClose}
                    onSubmit={this.onSubmit}
                    // bsSize="large"
                    size="lg"
                >
                    <Modal.Header closeButton={true}>
                        <h2>{this.state.mode === "editUser" && "Sửa"}</h2>

                    </Modal.Header>
                    <Modal.Body>

                        {this.state.mode === "editUser" && (this.renderEditUser())}
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
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditUserAdmin);


