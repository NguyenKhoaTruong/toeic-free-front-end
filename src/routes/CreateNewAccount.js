import React, { Component } from 'react';
class CreateNewAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            name: '',
            role: '',
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
    handleAddNewUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid === false) return;
        console.log('checl submit state', this.state);
        this.props.createNewUser({
            email: this.state.email,
            password: this.state.password,
            name: this.state.name,
            roleId: this.state.role,
        });
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
    render() {
        return (
            <div>
                <div>
                    <form className="form-horizontal form-loanable">

                        <fieldset>
                            <div className="form-group has-feedback required">
                                <label htmlFor="login-email" className="col-sm-5">Username or email</label>
                                <div className="col-sm-7">
                                    <span className="form-control-feedback" aria-hidden="true"></span>
                                    <input
                                        type="text"
                                        // name="email"
                                        // id="login-email"
                                        className="form-control"
                                        placeholder="Enter username or email"
                                        onChange={(event) => { this.onChangeInput(event, 'email') }}
                                        value={this.state.email}
                                    />
                                </div>
                                { /* console.log('error email ::: ' + JSON.stringify(errors)) */}
                            </div>
                            <div className="form-group has-feedback required">
                                <label htmlFor="login-password" className="col-sm-5">Password</label>
                                <div className="col-sm-7">
                                    <span className="form-control-feedback" aria-hidden="true"></span>
                                    <div className="login-password-wrapper">
                                        <input
                                            type="password"
                                            name="password"
                                            id="login-password"
                                            className="form-control"
                                            placeholder="*****"
                                            required
                                            onChange={(event) => { this.onChangeInput(event, 'password') }}
                                            value={this.state.password}
                                        />

                                    </div>
                                </div>
                            </div>
                            <div className="form-group ">
                                <label className="col-sm-3">Tên</label>
                                <div className="col-sm-12">
                                    <input
                                        type="text"
                                        className="form-control"
                                        onChange={(event) => { this.onChangeInput(event, 'name') }}
                                        value={this.state.name}
                                    />
                                </div>
                            </div>
                            <div className="form-group " style={{ display: "none" }}>
                                <label className="col-sm-3">Quyền</label>
                                <div className="col-sm-12">
                                    <select className='form-control'
                                        onChange={(event) => { this.onChangeInput(event, 'role') }}
                                    >
                                        <option >______</option>
                                        {/* <option value='R1'>Quản Trị Viên</option> */}
                                        <option value='R2'>Người Dùng</option>
                                    </select>
                                </div>
                            </div>
                        </fieldset>
                        <div className="form-action">
                            <button
                                type="submit"
                                className="btn btn-lg btn-primary btn-left">Enter <span className="icon-arrow-right2 outlined"></span></button>

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
                    Log in here
                </a>
            </div>
        );
    }
}

export default CreateNewAccount;