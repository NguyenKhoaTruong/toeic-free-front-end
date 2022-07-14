import React, { Component } from 'react';
import { connect } from 'react-redux';
import './UserManage.scss';
import {
    getAllUsers, deleteUserService, createNewUserService, editUserService
} from '../../../services/userService';
import { toast } from 'react-toastify';
import {
    Button,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddUserAdmin from '../../../routes/AddUserAdmin';
import EditUserAdmin from '../../../routes/EditUserAdmin';
import { emitter } from '../../../utils/emitter';
class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            showModal: false,
            showModalEditUser: false,
            userEdit: {}
        }
    }

    async componentDidMount() {
        await this.getAllUsers();
    }
    getAllUsers = async () => {
        let response = await getAllUsers('ALL');
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users.reverse(),
            });
            // toast.success("get all user succedd");
        }
        console.log('get user from node js:', response)
    }
    open = () => {
        this.setState({ showModal: true });
    }
    openEditUser = () => {
        this.setState({ showModalEditUser: true });
    }
    closeEditUser = () => {
        this.setState({ showModalEditUser: false });
    }
    close = () => {
        this.setState({ showModal: false });
    }
    handleDeleteUser = async (user) => {
        console.log('thông tin user', user)
        try {
            let res = await deleteUserService(user.id);
            toast.success("Xóa Thành Công");
            if (res && res.errCode === 0) {
                await this.getAllUsers('ALL');
            } else {
                alert(res.errMessage)
                toast.error("Người Dùng Không Tồn Tại");
            }
            console.log(res);
        } catch (e) {
            console.log(e);
        }
    }
    createNewUser = async (data) => {
        try {
            let response = await createNewUserService(data);
            // console.log('check response add new user', response)
            if (response && response.errCode !== 0) {
                // alert(response.errMessage)
                toast.success('Tạo Thành Công');
                this.close();
                await this.getAllUsers();
                emitter.emit('EVENT_CLEAR_MODAL_DATA')
            } else {
                // emitter.emit('EVENT_CLEAR_MODAL_DATA')
                // await this.getAllUsers('ALL');
                // this.setState({
                //     showModal: false
                // })
            }

        } catch (e) {
            console.log(e);
        }
    }
    handleEditUser = (user) => {
        this.openEditUser();
        console.log('check edit user', user);
        this.setState({
            userEdit: user
        })
        // alert('ádasdas');

    }
    handleUpdateUser = async (user) => {
        try {
            let res = await editUserService(user);
            console.log('click save user:', res)
            if (res && res.errCode === 0) {
                toast.success('Cập Nhật Thành Công');
                this.setState({
                    showModalEditUser: false
                })
                await this.getAllUsers();
            } else {
                alert(res.errCode);
            }
        } catch (e) {
            console.log(e);
        }


    }
    data = [
        {
            key: "john",
            value: "John Doe",
        },
        {
            key: "jane",
            value: "Jane Doe",
        },
        {
            key: "mary",
            value: "Mary Phillips",
        },
        {
            key: "robert",
            value: "Robert",
        },
        {
            key: "karius",
            value: "Karius",
        },
    ];
    render() {
        // console.log('check render', this.state);
        let arrUsers = this.state.arrUsers;
        return (
            <React.Fragment>

                <div className='content-manage-user'>
                    <div className='users-container'>
                        <div className="manage-user m-3" style={{ fontSize: '25px', textAlign: 'center', fontWeight: 'bolder' }}>Quản Lý Tài Khoản</div>
                        <Button className="btn-login mb-3" variant="primary" onClick={this.open}>Tạo Tài Khoản</Button>
                        <AddUserAdmin showModal={this.state.showModal} onClose={this.close} createNewUser={this.createNewUser} />

                        <div className='users-table' style={{ paddingLeft: '10px' }}>
                            <table id="customers">
                                <tbody>
                                    <tr>
                                        <th>Email</th>
                                        <th>Tên</th>
                                        <th>Địa Chỉ</th>
                                        <th>CMND</th>
                                        <th>Số Điện Thoại</th>
                                        <th>Ngày Sinh</th>
                                        <th>Quyền</th>
                                        <th>Hành Động</th>
                                    </tr>
                                    {
                                        arrUsers && arrUsers.map((item, index) => {
                                            return (
                                                <tr>

                                                    <td>{item.email}</td>
                                                    <td>{item.name}</td>
                                                    <td>{item.address}</td>
                                                    <td>{item.cmnd}</td>
                                                    <td>{item.phoneNumber}</td>
                                                    <td>{item.dateOfBirth}</td>
                                                    <td>{item.roleId}</td>
                                                    <td>
                                                        <button type="button" className="btn btn-danger ml-3" onClick={() => this.handleDeleteUser(item)}>Xóa</button>
                                                        <button type="button" className="btn btn-primary" onClick={() => this.handleEditUser(item)} > Sửa</button>

                                                        {this.state.showModalEditUser &&
                                                            <EditUserAdmin showModalEditUser={this.state.showModalEditUser} onClose={this.closeEditUser} currentUser={this.state.userEdit} editUser={this.handleUpdateUser} />}
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>


                            </table>
                        </div>
                    </div>
                </div>
            </React.Fragment>


        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
