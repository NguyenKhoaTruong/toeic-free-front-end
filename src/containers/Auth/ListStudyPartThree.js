import React, { Component } from 'react';
import './TestOnline.scss';
import Nav from '../../routes/Nav';
import Footer from '../../routes/Footer';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import {


    getAllListenExercise
} from '../../services/userService';
import { toast } from 'react-toastify';
import './ListExamTest.scss';
import LoginForm from '../../routes/LoginForm';
class ListStudyPartThree extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrReadExercise: []
        }
    }
    async componentDidMount() {
        await this.getAllListenExercise();
    }
    getAllListenExercise = async () => {
        try {
            let response = await getAllListenExercise('ALL');
            toast.success("get all listen exercise sucssedd");
            if (response && response.errCode === 0) {
                this.setState({
                    arrReadExercise: response.listeningexercises,

                });
                console.log('get listen exercise from node js:', response)
            }

        } catch (e) {
            console.log(e)
        }

    }

    handleDetailListenExercise = (dataListenExercise) => {
        console.log('check data examtesst', dataListenExercise)
        this.props.history.push(`/luyen-thi-part-3/${dataListenExercise.id}`)
    }
    render() {
        let { arrReadExercise } = this.state;
        let { isLoggedIn, userInfo } = this.props
        return (

            <div>
                {isLoggedIn && userInfo ? <>
                    <Nav />
                    <div className='background-testonline' style={{ height: '1500px' }}>
                        <div className="d-flex flex-row m-3">
                        </div>
                        <div className="d-flex justify-content-around">
                            <a style={{ opacity: '0' }}>.</a>
                            <div className='content-testonline border' >
                                <h1 className='title-list-exam-test'>Danh sách đề luyện thi</h1>
                                <div className='list-exam-test'>
                                    {arrReadExercise && arrReadExercise.length > 0 && arrReadExercise.map((item, index) => {
                                        return (
                                            <>
                                                {item && item.part === 'PART 3' && <div className='exam-test' key={index} onClick={() => this.handleDetailListenExercise(item)}>
                                                    <p className='exam-text-info'>{item.name_listening}{'        '}{item.part} {'    '}{item.test_year}</p>
                                                </div>}



                                            </>
                                        )
                                    })}
                                </div>

                            </div>
                            <a style={{ opacity: '0' }}>.</a>
                        </div>
                    </div>
                    <Footer />
                </> :
                    <>
                        <LoginForm showModal={true} />
                    </>}


            </div>

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListStudyPartThree));
