import React, { Component } from 'react';
import './TestOnline.scss';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {


    getAllListenExercise
} from '../../services/userService';
import { toast } from 'react-toastify';
import './ListExamTest.scss';
import LoginForm from '../../routes/LoginForm';
class ListStudyPartOne extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrReadExercise: [],
            showModal: true,

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

    close = () => {
        this.setState({
            showModal: false,

        });
    }
    handleDetailListenExercise = (dataListenExercise) => {
        console.log('check data examtesst', dataListenExercise)
        this.props.history.push(`/luyen-thi-part-1/${dataListenExercise.id}`)
    }
    render() {
        let { arrReadExercise, showModal } = this.state;
        let { isLoggedIn, userInfo } = this.props
        console.log('check showModal', showModal)
        return (

            <div>
                {isLoggedIn && userInfo ? <>
                    <div className='background-testonline border' style={{ height: '550px', marginTop: '12px', textAlign: 'center' }}>
                        <div className='content-testonline border' >
                            <h1 className='title-list-exam-test'>Danh sách đề luyện thi</h1>
                            <div className='list-exam-test'>
                                {arrReadExercise && arrReadExercise.length > 0 && arrReadExercise.map((item, index) => {
                                    return (
                                        <>
                                            {item && item.part === 'PART 1' && <div className='exam-test' key={index} onClick={() => this.handleDetailListenExercise(item)}>
                                                <p className='exam-text-info'>{item.name_listening}{'        '}{item.part} {'    '}{item.test_year}</p>
                                            </div>}
                                        </>
                                    )
                                })}
                            </div>
                        </div>
                    </div>

                </> :
                    <>
                        {showModal === true ? <LoginForm showModal={showModal} onClose={this.close} /> : 'Vui lòng đăng nhập'}

                    </>
                }


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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListStudyPartOne));
