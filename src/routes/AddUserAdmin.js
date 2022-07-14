import React, { Component } from "react";
import { CommonUtils } from "../utils"
import * as actions from "../store/actions";
import { push } from "connected-react-router";
import { connect } from 'react-redux';
import {
    Button,
    Modal,
} from "react-bootstrap";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { emitter } from '../utils/emitter';



class AddUserAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            smShow: false,
            mode: "addUser",
            isShowPassword: false,
            errMessage: '',
            previewImgURL: '',
            isOpen: false,
            email: '',
            password: '',
            name: '',
            role: '',
            avatar: '',
            address: '',
            cmnd: '',
            phoneNumber: '',
            dateOfBirth: ''
        };
        this.listenToEmiiter();
    }
    listenToEmiiter() {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            // console.log('listen emitter from parent:', data)
            this.setState({
                previewImgURL: '',
                email: '',
                password: '',
                name: '',
                role: '',
                avatar: '',
                address: '',
                cmnd: '',
                phoneNumber: '',
                dateOfBirth: ''
            })
        })
    }

    setMode = mode => {
        this.setState({
            mode
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
    // handleAddNewUser = () => {
    //     let isValid = this.checkValidateInput();
    //     if (isValid === false) return;
    //     console.log('checl submit state', this.state);
    //     this.props.createNewUser(this.state, 'abc');
    // }
    handleAddNewUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid === false) return;
        console.log('checl submit state', this.state);
        this.props.createNewUser({
            email: this.state.email,
            password: this.state.password,
            name: this.state.name,
            roleId: this.state.role,
            avatar: this.state.avatar,
            address: this.state.address,
            cmnd: this.state.cmnd,
            phoneNumber: this.state.phoneNumber,
            dateOfBirth: this.state.dateOfBirth,
        });
    }
    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['email', 'password', 'name', 'role', 'address', 'cmnd', 'phoneNumber', 'dateOfBirth']
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert('Chưa Nhập :' + ' ' + arrCheck[i])
                break;
            }
        }
        return isValid;
    }
    renderAddUser = () => {
        // let { email, password, name, role, avatar } = this.state;
        return (
            <div>

                <form className="form-horizontal " >
                    <fieldset>
                        <div className="form-row">
                            <div className="form-group col-4  ">
                                <label className="col">Email</label>
                                <div className="col">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Nhập Email"
                                        onChange={(event) => { this.onChangeInput(event, 'email') }}
                                        value={this.state.email}
                                    />
                                </div>
                            </div>
                            <div className="form-group col-4">
                                <label className="col">Password</label>
                                <div className="col">
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
                            <div className="form-group col-4 ">
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
                            <div className="form-group col-4 ">
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
                                        onChange={(event) => { this.onChangeInput(event, 'role') }}
                                    >
                                        <option >______</option>
                                        <option value='R1'>Quản Trị Viên</option>
                                        <option value='R2'>Người Dùng</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group col-4 ">
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
                            className="btn btn-lg btn-primary btn-left"
                            onClick={() => { this.handleAddNewUser() }}>Tạo<span className="icon-arrow-right2 outlined"></span></button>
                    </div>
                    {/* {this.state.isOpen === true &&
                        <Lightbox
                            mainSrc={this.state.previewImgURL}
                            onCloseRequest={() => this.setState({ isOpen: false })}
                        />} */}
                </form>

            </div>
        );
    };

    render() {
        return (
            <div>
                <Modal
                    show={this.props.showModal}
                    onHide={this.props.onClose}
                    onSubmit={this.onSubmit}
                    // bsSize="large"
                    size="lg"
                >
                    <Modal.Header closeButton={true}>
                        <h2>{this.state.mode === "addUser" && "Tạo Tài Khoản"}</h2>
                        {this.state.isOpen === true &&
                            <Lightbox
                                mainSrc={this.state.previewImgURL}
                                onCloseRequest={() => this.setState({ isOpen: false })}
                            />}
                    </Modal.Header>
                    <Modal.Body>
                        {this.state.mode === "addUser" && (this.renderAddUser())}
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
export default connect(mapStateToProps, mapDispatchToProps)(AddUserAdmin);


