import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from './Nav';
class Home extends Component {
    render() {
        const { isLoggedIn, userInfo } = this.props;
        // let linkToRedirect = isLoggedIn ? '/login' : '/';
        console.log('check home . js', isLoggedIn)

        return (
            <>
                <Nav />
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
