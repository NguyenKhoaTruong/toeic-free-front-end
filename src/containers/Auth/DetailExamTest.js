import React, { Component } from 'react';
import './TestOnline.scss';
import Nav from '../../routes/Nav';
import Footer from '../../routes/Footer';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import {

    getDetailExamTest
} from '../../services/userService';

class DetailExamTest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailExamTest: []
        }
    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let res = await getDetailExamTest(id);
            console.log(' check res', res)
            if (res && res.infor.errCode === 0) {
                this.setState({
                    detailExamTest: res.infor.data
                })
            }
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {

    }
    handleDetailReadingTest = (data) => {
        console.log('check data', data)
        this.props.history.push(`/ReadingTest/${data.id}`)
    }
    handleDetailListeningTest = (data) => {
        console.log('check data', data)
        this.props.history.push(`/ListeningTest/${data.id}`)
    }
    render() {
        let { detailExamTest } = this.state;
        console.log('check detai exam test', detailExamTest)
        console.log('check ', this.state)
        console.log('check params', this.props.match.params.id)
        return (
            <div>
                <Nav />
                <div className='background-testonline' style={{ height: '1500px' }} >
                    <div className="d-flex flex-row m-3">

                        {/* <div className="p-2 border"><Link to='/ReadingTest' style={{ textDecoration: 'none' }}>Làm Bài Đọc</Link></div>
                        <div className="p-2 border"><Link to='/ListeningTest' style={{ textDecoration: 'none' }}>Làm Bài Nghe</Link></div> */}
                    </div>
                    <div className="d-flex justify-content-around">
                        <a style={{ opacity: '0' }}>.</a>
                        <div className='content-testonline border' >
                            <div className='list-exam-test'>
                                {detailExamTest && detailExamTest.length > 0 && detailExamTest.map((item, index) => {
                                    console.log('check item', item.examtestData)

                                    return (
                                        <>
                                            {index === 1 ?
                                                <>
                                                    <p className='reading-test' key={index} onClick={() => this.handleDetailReadingTest(item)}>Làm Bài Đọc :Reading</p>
                                                    <p className='listening-test' key={index} onClick={() => this.handleDetailListeningTest(item)}>Làm Bài Nghe: Listening</p></>
                                                :
                                                <>
                                                    {/* <div className='notification'>
                                                        <p className='none-data-test'> Không có dữ liệu đề thi.</p>
                                                    </div> */}
                                                </>}
                                        </>
                                    )
                                })}
                            </div>

                        </div>
                        <a style={{ opacity: '0' }}>.</a>
                    </div>
                </div>
                <Footer />

            </div >

        )
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailExamTest));
