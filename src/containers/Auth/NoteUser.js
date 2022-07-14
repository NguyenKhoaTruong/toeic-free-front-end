import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../store/actions";
import './NoteUser.scss';
import { withRouter } from 'react-router-dom';
import AddNoteUser from './AddNoteUser';
class NoteUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shownote: false,
        }
    }
    handleShowNote = () => {
        this.setState({
            shownote: true
        })
    }
    render() {
        const { userInfo, isLoggedIn } = this.props;
        return (
            <>
                {isLoggedIn && userInfo &&
                    <>
                        <input type="checkbox" id="menu-toggle" />
                        {/* <label for="menu-toggle" className="menu-icon"><i className="fa fa-bars"></i></label> */}
                        <label for="menu-toggle" className="menu-icon"><img src='https://saohaivuong.com/wp-content/uploads/2021/11/an-ghi-chu.jpg' className='note-user-home-img' title='Tạo ghi chú của bạn' ></img></label>
                        <div className="slideout-sidebar">
                            <ul>
                                <li><AddNoteUser data={userInfo.id} /> </li>

                            </ul>
                        </div>
                    </>
                }
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

    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NoteUser));
