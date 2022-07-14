import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../store/actions";
import './Login.scss';
import Nav from '../../routes/Nav';
import HomePage from '../../routes/HomePage';
import Footer from '../../routes/Footer';
import { withRouter } from 'react-router-dom';
import AddNoteUser from './AddNoteUser';
import NoteUser from './NoteUser'
class Login extends Component {
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
                <Nav />
                <div className='home-container'>

                    {isLoggedIn && userInfo ?
                        <>





                            <NoteUser />

                            {/* {isLoggedIn && userInfo &&
                                <>
                                    <input type="checkbox" id="menu-toggle" />
                                    <label for="menu-toggle" className="menu-icon"><i className="fa fa-bars"></i></label>
                                    <div className="slideout-sidebar">
                                        <ul>
                                            <li><AddNoteUser data={userInfo.id} /> </li>

                                        </ul>
                                    </div>
                                </>
                            }
                            {this.state.shownote === true ?
                                this.props.history.push('/note-user') : <></>}
                            <div className='note-user-home' onClick={this.handleShowNote}>
                                <img src='https://cdn-amz.fadoglobal.io/images/I/81nia28xsOL.jpg' className='note-user-home-img' ></img>

                            </div> */}





                        </>
                        :
                        <>
                        </>}
                    <HomePage />
                    <Footer />
                </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
