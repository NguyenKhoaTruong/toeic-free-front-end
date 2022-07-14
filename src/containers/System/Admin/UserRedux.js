import React, { Component } from 'react';
import { connect } from 'react-redux';
import './UserRedux.scss';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import * as actions from "../../../store/actions";
import { CommonUtils } from "../../../utils"
class UserRedux extends Component {
    // edit de xem hinh xem laij video thu 62
    constructor(props) {
        super(props);
        this.state = {
            previewImgURL: '',
            isOpen: false,
            email: '',
            password: '',
            name: '',
            role: '',
            avatar: '',


        }
    }


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
    handleSaveUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid === false) return;
        this.props.createNewUser({
            email: this.state.email,
            password: this.state.password,
            name: this.state.name,
            roleId: this.state.role,
            avatar: this.state.avatar
        })
        console.log('checl submit state', this.state)
    }
    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['email', 'password', 'name', 'role']
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert('Chưa Nhập :' + ' ' + arrCheck[i])
                break;
            }
        }
        return isValid;
    }
    onChangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })

    }
    // viet vao ham edit
    // let imageBase64 = '';
    // if(user.image) {
    //     const imageBuffer = Buffer.from(JSON.stringify(user.image));
    //      imageBase64 = `data:image/jpeg;base64,`+imageBuffer.toString('base64');

    // }
    render() {
        let { email, password, name, role, avatar } = this.state;

        return (
            <>
                <div className='user-redux-container'>
                    <div className='title'>
                        QUẢN LÝ TÀI KHOẢN (REACT_REDUX)
                    </div>
                    <div className='user-redux-body'>
                        <div className='container'>
                            <div className='row'>
                                <div className='col-12 my-3'>Thêm Mới Người Dùng</div>
                                <div className='col-6'>
                                    <label>Email</label>
                                    <input className='form-control mt-2'
                                        type='email'
                                        value={email}
                                        onChange={(event) => { this.onChangeInput(event, 'email') }}
                                    />
                                </div>
                                <div className='col-6'>
                                    <label>Password</label>
                                    <input className='form-control  mt-2'
                                        type='password'
                                        value={password}
                                        onChange={(event) => { this.onChangeInput(event, 'password') }}
                                    />
                                </div>
                                <div className='col-6'>
                                    <label>Name</label>
                                    <input className='form-control mt-2' type='text'
                                        value={name}
                                        onChange={(event) => { this.onChangeInput(event, 'name') }}
                                    />
                                </div>
                                <div className='col-6'>
                                    <label>Image</label>
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
                                <div className='col-3'>
                                    <label>RoleID</label>
                                    <select className='form-control'
                                        onChange={(event) => { this.onChangeInput(event, 'role') }}
                                    >
                                        <option >______</option>
                                        <option value='R1'>Admin.</option>
                                        <option value='R2'>User.</option>
                                    </select>
                                </div>
                                <div className='col-12'>
                                    <button
                                        className='btn btn-primary mt-3'
                                        onClick={() => this.handleSaveUser()}
                                    >Save</button></div>

                            </div>
                        </div>
                    </div>
                    {this.state.isOpen === true &&
                        <Lightbox
                            mainSrc={this.state.previewImgURL}
                            onCloseRequest={() => this.setState({ isOpen: false })}
                        />}
                </div>

            </>

        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
