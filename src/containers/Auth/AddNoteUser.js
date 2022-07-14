import React, { Component } from 'react';
import { connect } from 'react-redux';
import './AddNoteUser.scss';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import { getAllNotes, createNewNoteService, deleteNoteServices, editNoteService } from '../../services/userService';
import { toast } from 'react-toastify';
import { Scrollbars } from 'react-custom-scrollbars';
class AddNoteUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            arrNotes: [],
            mode: "create",
            title: '',
            notecontent: '',
            userid: '',
            idUser: this.props.userInfo,

        }
    }
    async componentDidMount() {

        await this.getAllNotes();

    }
    // async componentWillMount() {
    //     await this.getAllNotes();
    //     console.log('check user info form will moutn', this.props)
    //     // khi từ một trang khác vào thì mới hiện được còn không thì isLoggedIn và userInfo k có

    // }
    getAllNotes = async () => {

        try {
            console.log('check usser id from componentdidmoutn', this.props.userInfo)
            // let response = await getAllNotes(1);
            let response = await getAllNotes(this.props.data);

            if (response && response.errCode === 0) {
                this.setState({
                    arrNotes: response.notess,

                });

            }
            console.log('get note from node js:', response)


        } catch (e) {
            console.log(e);
        }
    }
    handleCreate = async () => {

        let isValid = this.checkValidateInput();
        if (isValid === false) return;

        try {
            let response = await createNewNoteService({
                title: this.state.title,
                notecontent: this.state.notecontent,
                // userid: this.state.userid,
                userid: this.props.data,
            })

            console.log('check respone create note', response);
            this.getAllNotes();
            if (response.message.errCode === 0) {

                toast.success("Thêm Ghi Chú Thành Công");



                this.setState({
                    title: '',
                    notecontent: '',
                })
            }
            if (response.message.errCode === 1) {
                await toast.error("Ghi Chú Này Đã  Tồn Tại Xin Thử Lại Với Một Tiêu Đề Khác")
                this.setState({
                    title: '',
                    notecontent: '',

                })
            }
            else {
                console.log('lỗi')

            }
            // console.log('check creat ìno', this.props.userInfo.id)
        } catch (e) {
            console.log(e);
        }
    }

    handleUpdate = async () => {
        let arrupdatenote = {
            id: this.state.id,
            title: this.state.title,
            notecontent: this.state.notecontent,
            userid: this.props.data,
        }
        try {
            let res = await editNoteService(arrupdatenote);
            console.log('click save note:', res)
            if (res && res.errCode === 0) {
                await this.getAllNotes();
                await toast.success("Sửa Thành Công");
                this.setState({
                    // mode: "create",
                    title: "",
                    notecontent: "",
                })
            } else {
                alert(res.errMessage)
                toast.error("Ghi Chú Không Tồn Tại");
            }
            console.log(res);
        } catch (e) {
            console.log(e);
        }

    }

    handleEdit = (note) => {
        console.log('check data note edit note', note)
        if (note && !_.isEmpty(note)) {
            this.setState({
                id: note.id,
                title: note.title,
                notecontent: note.notecontent,
                userid: note.userid,
                mode: "Save"
            })
        }
        console.log('check datat edit', note)
    }

    handleDelete = async (note) => {
        try {
            let res = await deleteNoteServices(note.id);
            toast.success("Xóa Thành Công");
            if (res && res.errCode === 0) {
                await this.getAllNotes();
            } else {
                alert(res.errMessage)
                toast.error("Ghi Chú  Không Tồn Tại");
            }
            console.log(res);
        } catch (e) {
            console.log(e);
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
    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['title', 'notecontent']
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert('Chưa Nhập :' + ' ' + arrCheck[i])
                break;
            }
        }
        return isValid;
    }

    render() {
        const { userInfo, isLoggedIn, data
        } = this.props;
        console.log('check userinro note', userInfo);
        console.log('check state note', this.state);
        let { arrNotes } = this.state;
        console.log('check arrNotes', arrNotes);
        let mode = this.state.mode;
        console.log('check props data', this.props.data)
        return (
            <React.Fragment>
                <>
                    <span className='title-note-user'>
                        <p className='title-note-userinfo text-center'>Ghi Chú</p>
                    </span>
                    <div className="card">
                        <form>
                            <label>
                                <input
                                    className='title-input'
                                    type="text"
                                    value={this.state.title}
                                    placeholder="Tiêu Đề"
                                    onChange={(event) => { this.onChangeInput(event, 'title') }}
                                />
                            </label>
                            <label >
                                <textarea
                                    className='notecontent-input'
                                    value={this.state.notecontent}
                                    placeholder="Nhập Nội Dung"
                                    onChange={(event) => { this.onChangeInput(event, 'notecontent') }}
                                />
                            </label>

                            <label style={{ display: 'none' }}>
                                <div

                                    value={this.state.userid}

                                    onChange={(event) => { this.onChangeInput(event, 'userid') }}
                                ></div>
                            </label>
                            {/* <label value={this.state.userid}>
                        </label> */}
                            {mode === "create" ? <>
                                <button type='button' className='btn-create-notes btn btn-primary' onClick={() => this.handleCreate()}>Tạo</button>

                            </> :
                                <>
                                    <button type='button' className='btn-save-notes btn btn-primary' onClick={() => this.handleUpdate()}>Lưu</button>
                                </>}
                        </form>
                    </div>
                    <div className="card">
                        <Scrollbars autoHeight
                            autoHeightMin={100}
                            autoHeightMax={400}>
                            {arrNotes.data && arrNotes.data.length > 0 && arrNotes.data.map((item, index) => {
                                // console.log('check item arrnotes', item)
                                return (
                                    <>
                                        <div key={index} className="card">
                                            <h4 className="card__title" >{item.title}</h4>
                                            <div >
                                                {item.notecontent}
                                            </div>
                                            <div className="card__action">
                                                <button className='btn btn-danger' onClick={() => this.handleDelete(item)}>Xóa</button>
                                                <button className='btn btn-warning mr-3' onClick={() => this.handleEdit(item)}>Sửa</button>
                                            </div>
                                        </div>
                                    </>
                                )
                            })}
                        </Scrollbars>
                    </div>
                </> : <></>
            </React.Fragment>
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
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddNoteUser));
