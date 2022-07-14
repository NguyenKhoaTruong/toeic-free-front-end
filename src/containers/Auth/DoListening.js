import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Icon from 'react-bootstrap-icons';
import { Link, withRouter } from 'react-router-dom';
import Countdown from 'react-countdown';
import Footer from '../../routes/Footer';
import {
    getAllTest,
    createNewResultService
} from '../../services/userService';
import { toast } from 'react-toastify';
import './DoListening.scss';
import Confetti from "react-confetti";
import ShowResult from '../../routes/ShowResult';
import Tour from "reactour";
const Completionist = () => <span style={{ color: 'red' }}>Hết thời gian làm bài..</span>;

class DoListening extends Component {
    constructor(props) {
        super(props);
        this.state = {

            arrTest: [],
            myAnswer: null,
            score: 0,
            disabled: true,
            option_1: '',
            option_2: '',
            option_3: '',
            option_4: '',
            isEnd: false,
            pointquiz: '',
            // moiw
            animationDone: true,
            showModal: false,
            smShow: false,
            mode: "showResult",
            showResult: false,
            color: 'null',
            start: false,
            // hom nay
            itemsPerPage: 25,
            currentPage: 1,
            end: false,
            isTourOpen: false,

            //

        }


    }
    async componentDidMount() {
        // await this.getAllTest();
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let res = await getAllTest(id);
            // toast.success("get all quiz test sucssedd");
            if (res && res.errCode === 0) {
                this.setState({
                    arrTest: res.test.test,

                });
                console.log('get quiz test from node js:', res)
            }
        }
        setTimeout(() => {
            this.toggleConfetti();
        }, 10000000);

    }
    componentDidUpdate(prevProps, prevState) {

        // if (this.state.score !== prevState.score) {
        //     this.setState(() => {
        //         return {
        //             disabled: true,
        //             question: this.state.arrTest.question,

        //             correct_answer: this.state.arrTest.correct_answer,

        //             option_1: this.state.arrTest.option_1,
        //             option_2: this.state.arrTest.option_2,
        //             option_3: this.state.arrTest.option_3,
        //             option_4: this.state.arrTest.option_4,
        //         };
        //     });
        // }
        // console.log('check did update', this.state)
    }
    // getAllTest = async () => {
    //     try {
    //         let response = await getAllTest(3);
    //         toast.success("get all quiz test sucssedd");
    //         if (response && response.errCode === 0) {
    //             this.setState({
    //                 arrTest: response.test.test,

    //             });
    //             console.log('get quiz test from node js:', response)
    //         }

    //     } catch (e) {
    //         console.log(e)
    //     }

    // }
    checkAnswer = (correct_answer, correct_answer1, id) => {
        console.log('check id chon ', id)
        if (id) {
            let indexclick = '';
            this.setState({
                indexclick: id,

            }, console.log('check indexclick ', this.state.indexclick))
        }



        const { score } = this.state;
        // const { score } = this.state;
        // console.log('check state myAnswer == correact answer 1', correct_answer)
        // console.log('check state correct answer', correct_answer1)




        // this.setState({ myAnswer: correct_answer })
        // console.log('check state myAnswer checkanswer', this.state.myAnswer)
        // console.log('this.state.myAnswer === correct_answer1', this.state.myAnswer === correct_answer1)
        // const { myAnswer } = this.state;
        // console.log('check myAnserw', myAnswer)
        // if (myAnswer === correct_answer1) {
        //     this.setState({
        //         score: score + 1,
        //         myAnswer: null,
        //     });
        // }

        // gần đúng
        // console.log('check state myAnswer myAnswer 1', this.state.correct_answer)
        // console.log('check state myAnswer == correact answer 1', correct_answer)
        // console.log('check state correct answer', correct_answer1)
        // this.setState({ myAnswer: correct_answer, disabled: false })
        // const { myAnswer, score } = this.state;
        // console.log('this.state.myAnswer === correct_answer1', correct_answer1 === myAnswer)
        // if (myAnswer === correct_answer1) {
        //     this.setState({
        //         score: score + 1,
        //         myAnswer: null,
        //     });
        // }
        // console.log('check state myAnswer checkanswer', this.state.myAnswer)
        // cải tiến
        console.log('check state correact answer ', correct_answer)
        console.log('check state correct answer 1', correct_answer1)
        if (correct_answer) {
            this.setState({
                myAnswer: correct_answer,
                disabled: false
            }, () => {
                // tức là khi đúng thì tính điểm không đúng thì không tính điểm oke
                // chưa giải quyết được khi ban đầu chọn câu đúng sau chọn câu sau thì chưa trừ đc điểm
                if (this.state.myAnswer === correct_answer1) {
                    this.setState({
                        score: score + 1,
                        myAnswer: null,


                    })

                } else {
                    this.setState({
                        score: score,
                        myAnswer: this.state.myAnswer,
                        color: 'black'
                    })

                }

            })
        }

        // console.log('check state myAnswer checkanswer', this.state.myAnswer)
        // let { myAnswer, score } = this.state;
        // console.log('this.state.myAnswer === correct_answer1', correct_answer1 === myAnswer)
        // if (myAnswer === correct_answer1) {
        //     this.setState({
        //         score: score + 1,
        //         myAnswer: null,
        //     });
        // }


    }
    handleEnd = () => {

        if (this.state.myAnswer === this.state.correct_answer) {
            this.setState({

                score: this.state.score + 1,

            });
        }

        this.setState({
            showModal: true,
            isEnd: true,

        })
        if (this.state.score >= 0 && this.state.score < 7) {
            this.setState({

                pointquiz: this.state.score * 5,

            });
        }
        // for (this.state.score = 7; this.state.score <= 100; this.state.score++) {

        // }
        // if (this.state.score >= 7 && this.state.score <= 100) {

        //     this.setState({

        //         pointquiz: this.state.score,

        //     });
        // }
    }
    handleSaveResult = async (data, dataUser) => {
        console.log('check data save result', data)
        console.log('check dataUser save result', dataUser.id)


        // console.log('check data save result1', this.props.userInfo[0].id)

        //cần sửa cái này
        // console.log('check arrTest', this.state.arrTest[0].testid)

        // console.log('check data arr exam test update', arrResult)
        // console.log('check userinfo', this.props.userInfo.id)

        console.log('check testid', this.state.arrTest[0].testid)
        console.log('check userid', this.props.userInfo.id)
        try {
            let arrupdate = {
                correct_listen: '',
                correct_read: data,
                number_correct: data,
                number_wrong: 100 - data,
                testid: this.state.arrTest[0].testid,
                userid: dataUser.id,
            }
            let response = await createNewResultService(
                arrupdate
            )
            if (response.message.errCode === 0) {
                await toast.success("Lưu Kết Quả Thành Công");
            }
            else {
                await toast.error("Kết quả không tồn tại")


            }
        } catch (e) {
            console.log(e);
        }
    }
    toggleConfetti = () => {
        this.setState({ animationDone: !this.state.animationDone });
    }
    setMode = mode => {
        this.setState({
            mode
        });
    }
    handleCloseModalResult = () => {
        this.setState({
            showModal: false
        })
    }
    renderShowResult = () => {

        return (
            <div className='show-ressult'>
                <p className='result-number'> Số câu đúng của bạn là: {this.state.score}</p>

            </div>
        );
    };
    close = () => {
        this.setState({ showModal: false });
    }
    // changeColor = () => {
    //     this.setState({
    //         color: 'red'
    //     })
    // }
    handleReading = () => {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            // this.props.history.push(`/ReadingTest/${id}`)

        }
    }
    handleStartTest = () => {
        this.setState({
            start: true
        })
    }
    handleEndTest = () => {
        this.setState({
            end: true,
            start: false
        })
    }

    handleShowQuestion = (data) => {
        let letToShow = '';
        // this.setState({
        //     letToShow:d
        // })
        console.log('check data number', data)
    }
    //hoom nay
    pageClick = (e) => {
        console.log('check event ', Number(e.target.id))
        this.setState({
            currentPage: Number(e.target.id)
        });
    };
    handleNextNumber = () => {
        // if (this.state.currentPage === 5) {

        //     return <></>
        // }
        if (this.state.currentPage === 5) {
            alert('Không có dữ liệu')

        }
        else {
            this.setState({
                currentPage: this.state.currentPage + 1,


            });

        }

    }

    handlePreNumber = () => {

        if (this.state.currentPage === 1) {
            alert('Không có dữ liệu')

        }
        else {
            this.setState({
                currentPage: this.state.currentPage - 1,


            });

        }

    }
    closeTour = () => {
        this.setState({ isTourOpen: false });
    };

    openTour = () => {
        this.setState({ isTourOpen: true });
    };
    //
    render() {

        const { arrTest } = this.state;

        const { pointquiz, option_1, option_2, option_3, option_4, myAnswer, isEnd, question, correct_answer, image, audio_mp3, letterquestion, letterquestiontwo, letterquestionthree
            , showModal, start, end, isTourOpen } = this.state;
        let indexclick = this.state.indexclick;

        console.log('check state arrtest', arrTest);

        console.log('check prop', this.props)
        console.log('check state all', this.state)
        console.log('check props all', this.props.userInfo)
        console.log('check id paragam', arrTest.length - 59)
        //hom nay
        const pageNumbers = [];
        const currentPageNum = this.state.currentPage;
        for (
            let i = 1;
            i <= Math.ceil((arrTest.length - 100) / this.state.itemsPerPage);
            i++
        ) {
            pageNumbers.push(i);
        }

        let renderPageNumbers = [];
        if (arrTest.length >= 100) {
            renderPageNumbers = pageNumbers.map(number => {
                let className = "";
                if (this.state.currentPage === number) {
                    className = "active";
                }
                return (
                    <>
                        <ul>
                            <li
                                key={number}
                                id={number}
                                className={className}
                                onClick={this.pageClick}
                            >
                                {number}
                            </li>
                        </ul>
                    </>
                );
            });
        }
        const startinIndex = (this.state.currentPage - 1) * this.state.itemsPerPage;
        console.log('check start', startinIndex);

        const lastIndex = startinIndex + this.state.itemsPerPage;
        console.log('check lastIndex', lastIndex);
        const pageData = arrTest.slice(startinIndex, lastIndex);
        console.log('cjasdsad', pageData)
        //
        if (showModal) {
            return (
                <>
                    <div className='showResultTest' style={{ height: '100vh', width: '100vh' }}>


                        <ShowResult showModal={this.state.showModal} onClose={this.close} dataResult={this.state.score} />
                        <Confetti
                            gravity={0.5}
                            run={this.state.animationDone}
                            numberOfPieces={1000}
                        />
                    </div>
                </>

            )
        }
        if (isEnd) {
            return (
                <div>
                    <nav className="navbar navbar-expand-lg navbar-light bg-dark  sticky-top">
                        <Link to='/list-exam-test'><Icon.ArrowBarLeft size={30} color="white" style={{ background: "", cursor: 'pointer' }} className="rounded-circle mr-1" /></Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div className="navbar-nav">
                                <Link to='/' style={{ textDecoration: 'none', color: 'white', cursor: 'pointer' }}>Trang Chủ <span className="sr-only">(current)</span></Link>
                            </div>


                        </div>
                        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div className="navbar-nav">
                                <button className='btn btn-warning m-2' onClick={() => this.handleSaveResult(this.state.score, this.props.userInfo)}>Lưu kết quả</button>
                                {this.props.match && this.props.match.params && this.props.match.params.id ?

                                    <>

                                        <button className='btn btn-primary m-2'><Link to={`/ReadingTest/${this.props.match.params.id}`} style={{ color: 'white', textDecoration: 'none' }}>Làm bài đọc</Link></button>
                                    </>
                                    :
                                    <>
                                    </>
                                }
                            </div>
                        </div>
                    </nav>
                    <div className="row">
                        <div className="col-12 border">
                            <div className='question-reading-number'>
                                <h1>LISTENING TEST</h1>
                                <p>In the Listening test,you will be asked to demonstrate how well you understand spoken English. The entrie Listening test will last
                                    appoximately 45 minutes.
                                    There are four parts, and directions are given forn each part. You must mark your answers on the separate answer sheet.
                                    Do not write your answer in your test book.
                                </p>
                                <p><b>Part 1:</b><br></br><b>Directions:</b>For each question in this part, you will hear four statements about a picture in your test book. when you hear the statements,
                                    you must select the one statement that best describes what you see in the picture. Then find the number of the question on your anserwer
                                    sheet and mark your answer. The statements will not be printed in your test book and will be spoken only  one time
                                </p>
                                <p className='text-center'><img src='https://nasao.vn/wp-content/uploads/2020/06/nasao_1-2-600x394.png' /></p>
                                <p>Statement(C)."They're stting at a table," is the best description of the picture, soyou should select answer(C) and mark it on your answer sheet.</p>
                                {arrTest && arrTest.length && arrTest.map((item, index) => {
                                    return (
                                        <>
                                            {item && item.keyMap === 'PART 1' ?
                                                <>

                                                    <div className="row" id={item.id}>
                                                        <div className="col-4"> <b>{index}</b></div>
                                                        <div className="col-4">
                                                            <p className='text-center'><img className='img-part1' src={`${item.img}`} style={{ width: '100%' }}></img></p>
                                                        </div>
                                                        <div className="col-4">

                                                            <div className="anwser-option" style={{ display: 'table-cell' }}>
                                                                {item.correct_answer === item.option_1 ?
                                                                    <>
                                                                        <p >(A).{' '}{item.option_1} <Icon.Check size={30} color="green" style={{ background: "", cursor: 'pointer' }} className="rounded-circle mr-1" /></p>
                                                                    </>
                                                                    :
                                                                    <>
                                                                        <p >(A).{''}{item.option_1}</p>
                                                                    </>}

                                                            </div>
                                                            <div className="anwser-option" style={{ display: 'table-cell' }}>
                                                                {item.correct_answer === item.option_2 ?
                                                                    <>
                                                                        <p >(B).{' '}{item.option_2} <Icon.Check size={30} color="green" style={{ background: "", cursor: 'pointer' }} className="rounded-circle mr-1" /></p>
                                                                    </>
                                                                    :
                                                                    <>
                                                                        <p >(B).{''}{item.option_2}</p>
                                                                    </>}
                                                            </div>
                                                            <div className="anwser-option" style={{ display: 'table-cell' }}>
                                                                {item.correct_answer === item.option_3 ?
                                                                    <>
                                                                        <p >(C).{' '}{item.option_3} <Icon.Check size={30} color="green" style={{ background: "", cursor: 'pointer' }} className="rounded-circle mr-1" /></p>
                                                                    </>
                                                                    :
                                                                    <>
                                                                        <p >(C).{''}{item.option_3}</p>
                                                                    </>}
                                                            </div>
                                                            <div className="anwser-option" style={{ display: 'table-cell' }}>
                                                                {item.correct_answer === item.option_4 ?
                                                                    <>
                                                                        <p >(D).{' '}{item.option_4} <Icon.Check size={30} color="green" style={{ background: "", cursor: 'pointer' }} className="rounded-circle mr-1" /></p>
                                                                    </>
                                                                    :
                                                                    <>
                                                                        <p >(D).{''}{item.option_4}</p>
                                                                    </>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                                :
                                                <></>
                                            }
                                        </>
                                    )
                                })}

                                <p><b>Part 2:</b></p><br></br>
                                <p><b>Directions:
                                </b>You will hear a question or statement an three responses spoken in English.
                                    They will not be printed in your test book and will be spoken only on time. selectthe best response to the
                                    question of statement and mark the letter (A),(B) or (C) on your answer sheet.</p>
                                {arrTest && arrTest.length > 0 && arrTest.map((item, index) => {
                                    return (
                                        <>
                                            {item && item.keyMap === 'PART 2' ?
                                                <>
                                                    <div className="d-flex justify-content-around border">
                                                        <div>
                                                            <p><b>{index}.</b> Mark your answer on your answer sheet</p>
                                                            <div className="d-flex flex-column " >
                                                                <div className="form-check p-2" style={{ display: '-webkit-inline-box' }}>
                                                                    {item.correct_answer === item.option_1 ?
                                                                        <>
                                                                            <input className={`ui floating message options ${myAnswer === item.option_1 ? "selected" : null}`} style={{ marginTop: '15px', display: 'none' }} type="radio" name={item.id} value={item.option_1} onClick={() => this.checkAnswer(item.option_1, item.correct_answer, item.id)} />
                                                                            <p>(A).{' '}{item.option_1}<Icon.Check size={30} color="green" style={{ background: "", cursor: 'pointer' }} className="rounded-circle mr-1" /></p>
                                                                        </>
                                                                        :
                                                                        <>
                                                                            <input className={`ui floating message options ${myAnswer === item.option_1 ? "selected" : null}`} style={{ marginTop: '15px', display: 'none' }} type="radio" name={item.id} value={item.option_1} onClick={() => this.checkAnswer(item.option_1, item.correct_answer, item.id)} />
                                                                            <p>(A).{' '}{item.option_1}</p>
                                                                        </>
                                                                    }
                                                                </div>
                                                                <div className="form-check p-2" style={{ display: '-webkit-inline-box' }}>
                                                                    {item.correct_answer === item.option_2 ?
                                                                        <>
                                                                            <input className={`ui floating message options ${myAnswer === item.option_2 ? "selected" : null}`} style={{ marginTop: '15px', display: 'none' }} type="radio" name={item.id} value={item.option_2} onClick={() => this.checkAnswer(item.option_2, item.correct_answer, item.id)} />
                                                                            <p>(B).{' '}{item.option_2}<Icon.Check size={30} color="green" style={{ background: "", cursor: 'pointer' }} className="rounded-circle mr-1" /></p>
                                                                        </>
                                                                        :
                                                                        <>
                                                                            <input className={`ui floating message options ${myAnswer === item.option_2 ? "selected" : null}`} style={{ marginTop: '15px', display: 'none' }} type="radio" name={item.id} value={item.option_2} onClick={() => this.checkAnswer(item.option_2, item.correct_answer, item.id)} />
                                                                            <p>(B).{' '}{item.option_2}</p>
                                                                        </>
                                                                    }
                                                                </div>
                                                                <div className="form-check p-2" style={{ display: '-webkit-inline-box' }}>
                                                                    {item.correct_answer === item.option_3 ?
                                                                        <>
                                                                            <input className={`ui floating message options ${myAnswer === item.option_3 ? "selected" : null}`} style={{ marginTop: '15px', display: 'none' }} type="radio" name={item.id} value={item.option_3} onClick={() => this.checkAnswer(item.option_3, item.correct_answer, item.id)} />
                                                                            <p>(C).{' '}{item.option_3}<Icon.Check size={30} color="green" style={{ background: "", cursor: 'pointer' }} className="rounded-circle mr-1" /></p>
                                                                        </>
                                                                        :
                                                                        <>
                                                                            <input className={`ui floating message options ${myAnswer === item.option_3 ? "selected" : null}`} style={{ marginTop: '15px', display: 'none' }} type="radio" name={item.id} value={item.option_3} onClick={() => this.checkAnswer(item.option_3, item.correct_answer, item.id)} />
                                                                            <p>(C).{' '}{item.option_3}</p>
                                                                        </>
                                                                    }
                                                                </div>

                                                            </div>

                                                        </div>
                                                        <div style={{ display: 'none' }}>3</div>
                                                    </div>
                                                </>
                                                :
                                                <></>

                                            }
                                        </>
                                    )
                                })}



                                <p><b>Part 3:</b><br></br></p>
                                <p><b>Directions:</b>Your will hear some conversations between two or more people. You will be asked to
                                    answer three questions about what the speaker say in each conversation. Select the best response
                                    to each question and mark the letter (A), (B), (C), or (D) on your answer sheet. The conversations will
                                    not be printed inyour test book and will be spoken only one time.
                                </p>
                                {arrTest && arrTest.length > 0 && arrTest.map((item, index) => {
                                    return (
                                        <>
                                            {item && item.keyMap === 'PART 3' ?
                                                <>
                                                    <div className="row">
                                                        <div className="col-5"></div>
                                                        <div className="col-5">
                                                            <p><b>{item.number}</b>.{'  '}{item.question}</p>
                                                            <div className='question-part-three' style={{ display: 'flex' }}>
                                                                <div className="number-question-part-three" style={{ width: '45%' }}>
                                                                    {item.correct_answer === item.option_1 ?
                                                                        <>
                                                                            <p className='part-three-option-1'>(A).{' '}{item.option_1}{' '}<Icon.Check size={30} color="green" style={{ background: "", cursor: 'pointer' }} className="rounded-circle mr-1" /></p>
                                                                        </>
                                                                        :
                                                                        <>
                                                                            <p className='part-three-option-1'>(A).{' '}{item.option_1}</p>
                                                                        </>
                                                                    }
                                                                    {item.correct_answer === item.option_2 ?
                                                                        <>
                                                                            <p className='part-three-option-2'>(B).{' '}{item.option_2}{' '}<Icon.Check size={30} color="green" style={{ background: "", cursor: 'pointer' }} className="rounded-circle mr-1" /></p>
                                                                        </>
                                                                        :
                                                                        <>
                                                                            <p className='part-three-option-2'>(B).{' '}{item.option_2}</p>
                                                                        </>
                                                                    }
                                                                    {item.correct_answer === item.option_3 ?
                                                                        <>
                                                                            <p className='part-three-option-3'>(B).{' '}{item.option_3}{' '}<Icon.Check size={30} color="green" style={{ background: "", cursor: 'pointer' }} className="rounded-circle mr-1" /></p>
                                                                        </>
                                                                        :
                                                                        <>
                                                                            <p className='part-three-option-3'>(B).{' '}{item.option_3}</p>
                                                                        </>
                                                                    }
                                                                    {item.correct_answer === item.option_4 ?
                                                                        <>
                                                                            <p className='part-three-option-4'>(B).{' '}{item.option_4}{' '}<Icon.Check size={30} color="green" style={{ background: "", cursor: 'pointer' }} className="rounded-circle mr-1" /></p>
                                                                        </>
                                                                        :
                                                                        <>
                                                                            <p className='part-three-option-4'>(B).{' '}{item.option_4}</p>
                                                                        </>
                                                                    }
                                                                </div>
                                                                <div className="answer-question-part-three" style={{ width: '30%' }}>

                                                                    <input className={`ui floating message options ${myAnswer === item.option_1 ? "selected" : null} `} style={{ marginTop: '15px', display: 'none' }} type="radio" name={item.id} value={item.option_1} onClick={() => this.checkAnswer(item.option_1, item.correct_answer, item.id)} />
                                                                    <input className={`ui floating message options ${myAnswer === item.option_2 ? "selected" : null}`} style={{ marginTop: '15px', display: 'none' }} type="radio" name={item.id} value={item.option_2} onClick={() => this.checkAnswer(item.option_2, item.correct_answer, item.id)} />
                                                                    <input className={`ui floating message options ${myAnswer === item.option_3 ? "selected" : null}`} style={{ marginTop: '15px', display: 'none' }} type="radio" name={item.id} value={item.option_3} onClick={() => this.checkAnswer(item.option_3, item.correct_answer, item.id)} />
                                                                    <input className={`ui floating message options ${myAnswer === item.option_4 ? "selected" : null}`} style={{ marginTop: '15px', display: 'none' }} type="radio" name={item.id} value={item.option_4} onClick={() => this.checkAnswer(item.option_4, item.correct_answer, item.id)} />

                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-2"></div>
                                                    </div>
                                                </>
                                                :
                                                <></>
                                            }
                                        </>
                                    )
                                })}

                                <p><b>Part 4:</b><br></br></p>
                                <p><b>Directions:</b> You will hear some tals given by a single speaker. You will be asked to answer three
                                    questions about what the speaker says in each talk. Select the best response to each question and mark
                                    the letter (A),(B),(C) or (D) on your answer sheet. The talks will not be printed in your test book
                                    and will be spoken only one time.
                                </p>
                                {arrTest && arrTest.length > 0 && arrTest.map((item, index) => {
                                    return (
                                        <>
                                            {item && item.keyMap === 'PART 4'
                                                ?
                                                <>
                                                    <div className="row">
                                                        <div className="col-5"></div>
                                                        <div className="col-5">
                                                            <p><b>{item.number}</b>.{'  '}{item.question}</p>
                                                            <div className='question-part-four' style={{ display: 'flex' }}>
                                                                <div className="number-question-part-four" style={{ width: '45%' }}>
                                                                    {item.correct_answer === item.option_1 ?
                                                                        <>
                                                                            <p className='part-four-option-1'>(A).{' '}{item.option_1}{' '}<Icon.Check size={30} color="green" style={{ background: "", cursor: 'pointer' }} className="rounded-circle mr-1" /></p>
                                                                        </>
                                                                        :
                                                                        <>
                                                                            <p className='part-four-option-1'>(A).{' '}{item.option_1}</p>
                                                                        </>
                                                                    }
                                                                    {item.correct_answer === item.option_2 ?
                                                                        <>
                                                                            <p className='part-four-option-2'>(B).{' '}{item.option_2}{' '}<Icon.Check size={30} color="green" style={{ background: "", cursor: 'pointer' }} className="rounded-circle mr-1" /></p>
                                                                        </>
                                                                        :
                                                                        <>
                                                                            <p className='part-four-option-2'>(B).{' '}{item.option_2}</p>
                                                                        </>
                                                                    }
                                                                    {item.correct_answer === item.option_3 ?
                                                                        <>
                                                                            <p className='part-four-option-3'>(B).{' '}{item.option_3}{' '}<Icon.Check size={30} color="green" style={{ background: "", cursor: 'pointer' }} className="rounded-circle mr-1" /></p>
                                                                        </>
                                                                        :
                                                                        <>
                                                                            <p className='part-four-option-3'>(B).{' '}{item.option_3}</p>
                                                                        </>
                                                                    }
                                                                    {item.correct_answer === item.option_4 ?
                                                                        <>
                                                                            <p className='part-four-option-4'>(B).{' '}{item.option_4}{' '}<Icon.Check size={30} color="green" style={{ background: "", cursor: 'pointer' }} className="rounded-circle mr-1" /></p>
                                                                        </>
                                                                        :
                                                                        <>
                                                                            <p className='part-four-option-4'>(B).{' '}{item.option_4}</p>
                                                                        </>
                                                                    }
                                                                </div>
                                                                <div className="answer-question-part-four" style={{ width: '30%' }}>

                                                                    <input className={`ui floating message options ${myAnswer === item.option_1 ? "selected" : null} `} style={{ marginTop: '15px', display: 'none' }} type="radio" name={item.id} value={item.option_1} onClick={() => this.checkAnswer(item.option_1, item.correct_answer, item.id)} />
                                                                    <input className={`ui floating message options ${myAnswer === item.option_2 ? "selected" : null}`} style={{ marginTop: '15px', display: 'none' }} type="radio" name={item.id} value={item.option_2} onClick={() => this.checkAnswer(item.option_2, item.correct_answer, item.id)} />
                                                                    <input className={`ui floating message options ${myAnswer === item.option_3 ? "selected" : null}`} style={{ marginTop: '15px', display: 'none' }} type="radio" name={item.id} value={item.option_3} onClick={() => this.checkAnswer(item.option_3, item.correct_answer, item.id)} />
                                                                    <input className={`ui floating message options ${myAnswer === item.option_4 ? "selected" : null}`} style={{ marginTop: '15px', display: 'none' }} type="radio" name={item.id} value={item.option_4} onClick={() => this.checkAnswer(item.option_4, item.correct_answer, item.id)} />

                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-2"></div>
                                                    </div>
                                                </> :
                                                <></>
                                            }
                                        </>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            )
        }
        return (
            <div>

                <nav className="navbar navbar-expand-lg navbar-light bg-dark  sticky-top">
                    <Link to='/list-exam-test' title='Quay Lại'><Icon.ArrowBarLeft size={30} color="white" style={{ background: "", cursor: 'pointer' }} className="rounded-circle mr-1" /></Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            {/* <Link to='/' style={{ textDecoration: 'none', color: 'white', cursor: 'pointer' }}>Trang Chủ <span className="sr-only">(current)</span></Link> */}
                            <span className='title-do-reading' style={{ fontSize: '25px', color: 'white', marginLeft: '10px' }}>LISTENING TEST</span>
                        </div>

                    </div>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <Tour
                                onRequestClose={this.closeTour}
                                steps={tourConfig}
                                isOpen={isTourOpen}
                                maskClassName="mask"
                                className="helper"
                                rounded={5}
                                accentColor={"#5cb7b7"}
                                onAfterOpen={this.disableBody}
                                onBeforeClose={this.enableBody}
                            />
                            <button className=' btn btn-danger' onClick={this.openTour}>Hướng Dẫn</button>
                            {start === true ?
                                <>
                                    <button className='btn btn-primary ml-3' onClick={this.handleStartTest} style={{ display: 'none' }}>Bắt Đầu Làm Bài Nghe</button></> :
                                <>
                                    <button className='btn btn-primary ml-3' onClick={this.handleStartTest} data-tut="start-question-listening">Bắt Đầu Làm Bài Nghe</button>
                                </>
                            }
                            {/* <button className=' btn btn-primary ml-3' onClick={this.handleStartTest}>Bắt Đầu Làm Bài Nghe</button> */}
                            {start === true && <button className=' btn btn-primary ml-3' onClick={this.handleEndTest}>Dừng</button>}

                        </div>
                    </div>
                    {start === true &&
                        <>
                            <span className='countdowntimer-doreading' style={{ color: 'white' }}> Time {'   '}
                                <Countdown date={Date.now() + 45000 * 60} >
                                    <Completionist />
                                </Countdown>

                            </span>
                        </>

                    }
                    {end === true && <>
                        <span className='countdowntimer-doreading' style={{ color: 'white' }}>
                            <Countdown>
                                <Completionist />
                            </Countdown>

                        </span>
                    </>}

                    <div className='user-form-test' style={{ color: 'white' }}>
                    </div>

                </nav>
                <div className='m-1'>
                    <div className="row">
                        <div className="col-2 border">
                            <div className='number-img-question border'>
                                <div className="d-flex align-items-start flex-column ">
                                    <div className='menu-question-listening border' data-tut="number-question-list">
                                        {pageData && pageData.length > 0 && pageData.map((item, index) => {
                                            let showColor = 'gray';
                                            let off = false

                                            if (indexclick === item.id) {
                                                showColor = 'red';
                                                off = false;



                                            }
                                            else {
                                                showColor = 'gray';
                                                off = true;

                                            }
                                            return (
                                                <>
                                                    <div className="number-question  " style={{ display: 'inline-flex' }}>

                                                        {item.keyMap === 'PART 1' ?
                                                            <>
                                                                {showColor === 'red' && indexclick === item.id &&

                                                                    <p className='number-question-go1' key={index}
                                                                        style={{
                                                                            width: '30px', height: '30px', background: showColor, borderRadius: '50%', textAlign: 'center', color: 'white', margin: '10px', cursor: 'pointer',


                                                                        }}
                                                                        onClick={() => this.handleShowQuestion(item.id)}
                                                                    >

                                                                        {item.number}

                                                                    </p>


                                                                }
                                                                <p className='number-question-go' key={index}
                                                                    style={{
                                                                        width: '30px', height: '30px', background: showColor, borderRadius: '50%', textAlign: 'center', color: 'white', margin: '10px', cursor: 'pointer'
                                                                        , display: `${showColor === 'gray' ? '1' : 'none'}`
                                                                    }}
                                                                    onClick={() => this.handleShowQuestion(item.id)}
                                                                >
                                                                    {console.log('check color', showColor)}
                                                                    {item.number}


                                                                    {/* {console.log('check item number part 1', [item.number].sort())} */}
                                                                </p>

                                                            </>
                                                            :
                                                            <></>}
                                                        {item.keyMap === 'PART 2' ?
                                                            <>
                                                                {showColor === 'red' && indexclick === item.id &&
                                                                    <p className='number-question-go1' key={index}
                                                                        style={{
                                                                            width: '30px', height: '30px', background: showColor, borderRadius: '50%', textAlign: 'center', color: 'white', margin: '10px', cursor: 'pointer',


                                                                        }}
                                                                        onClick={() => this.handleShowQuestion(item.id)}
                                                                    >
                                                                        {item.number}
                                                                    </p>

                                                                }




                                                                <p className='number-question-go' key={index}
                                                                    style={{
                                                                        width: '30px', height: '30px', background: showColor, borderRadius: '50%', textAlign: 'center', color: 'white', margin: '10px', cursor: 'pointer'
                                                                        , display: `${showColor === 'gray' ? '1' : 'none'}`
                                                                    }}
                                                                    onClick={() => this.handleShowQuestion(item.id)}
                                                                >
                                                                    {console.log('check color', showColor)}

                                                                    {item.number}
                                                                </p>
                                                            </>
                                                            :
                                                            <></>}
                                                        {item.keyMap === 'PART 3' ?
                                                            <>
                                                                {showColor === 'red' && indexclick === item.id &&
                                                                    <p className='number-question-go1' key={index}
                                                                        style={{
                                                                            width: '30px', height: '30px', background: showColor, borderRadius: '50%', textAlign: 'center', color: 'white', margin: '10px', cursor: 'pointer',


                                                                        }}
                                                                        onClick={() => this.handleShowQuestion(item.id)}
                                                                    >
                                                                        {item.number}
                                                                    </p>

                                                                }
                                                                <p className='number-question-go' key={index}
                                                                    style={{
                                                                        width: '30px', height: '30px', background: showColor, borderRadius: '50%', textAlign: 'center', color: 'white', margin: '10px', cursor: 'pointer'
                                                                        , display: `${showColor === 'gray' ? '1' : 'none'}`
                                                                    }}
                                                                    onClick={() => this.handleShowQuestion(item.id)}
                                                                >
                                                                    {console.log('check color', showColor)}

                                                                    {item.number}
                                                                </p>
                                                            </>
                                                            :
                                                            <></>}
                                                        {item.keyMap === 'PART 4' ?
                                                            <>
                                                                {showColor === 'red' && indexclick === item.id &&
                                                                    <p className='number-question-go1' key={index}
                                                                        style={{
                                                                            width: '30px', height: '30px', background: showColor, borderRadius: '50%', textAlign: 'center', color: 'white', margin: '10px', cursor: 'pointer',


                                                                        }}
                                                                        onClick={() => this.handleShowQuestion(item.id)}
                                                                    >
                                                                        {item.number}
                                                                    </p>

                                                                }
                                                                <p className='number-question-go' key={index}
                                                                    style={{
                                                                        width: '30px', height: '30px', background: showColor, borderRadius: '50%', textAlign: 'center', color: 'white', margin: '10px', cursor: 'pointer'
                                                                        , display: `${showColor === 'gray' ? '1' : 'none'}`
                                                                    }}
                                                                    onClick={() => this.handleShowQuestion(item.id)}
                                                                >
                                                                    {console.log('check color', showColor)}

                                                                    {item.number}
                                                                </p>
                                                            </>
                                                            :
                                                            <></>}


                                                    </div>
                                                </>
                                            )
                                        })}
                                        <div className='alignment-pavigator  d-flex justify-content-center'
                                            style={{
                                                display: 'flex', marginLeft: '18px', marginRight: '18px'
                                            }}
                                            data-tut="pre-next-number-question-list">
                                            <div className='right-number-pavigator m-2' onClick={this.handlePreNumber}>
                                                <Icon.ArrowLeftSquare size={40} color="black" style={{ background: "", cursor: 'pointer' }} />
                                            </div>
                                            <div className='left-number-pavigator m-2' onClick={this.handleNextNumber}>
                                                <Icon.ArrowRightSquare size={40} color="black" style={{ background: "", cursor: 'pointer' }} />
                                            </div>
                                        </div>
                                        <div className="p-2 d-flex justify-content-center">

                                            <button className='btn btn-warning m-2' onClick={this.handleEnd} data-tut="end-question">Kết Thúc Và Chấm Điểm</button>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-10 border">
                            <div className='question-reading-number' data-tut="question-listening">
                                <h1>LISTENING TEST</h1>
                                <p className='intro-listening-test'>In the Listening test,you will be asked to demonstrate how well you understand spoken English. The entrie Listening test will last
                                    appoximately 45 minutes.
                                    There are four parts, and directions are given forn each part. You must mark your answers on the separate answer sheet.
                                    Do not write your answer in your test book.
                                </p>
                                <p className='intro-listening-test'><b>Part 1:</b><br></br><b>Directions:</b>For each question in this part, you will hear four statements about a picture in your test book. when you hear the statements,
                                    you must select the one statement that best describes what you see in the picture. Then find the number of the question on your anserwer
                                    sheet and mark your answer. The statements will not be printed in your test book and will be spoken only  one time
                                </p>
                                <p className='text-center intro-listening-test'><img src='https://nasao.vn/wp-content/uploads/2020/06/nasao_1-2-600x394.png' /></p>
                                <p className='intro-listening-test'>Statement(C)."They're stting at a table," is the best description of the picture, soyou should select answer(C) and mark it on your answer sheet.</p>
                                {arrTest && arrTest.length && arrTest.map((item, index) => {
                                    return (
                                        <>
                                            {item && item.keyMap === 'PART 1' ?
                                                <>
                                                    {start === true && index === 1 && <span className='text-center' style={{ display: 'none' }}>
                                                        <figure>
                                                            <audio
                                                                autoPlay
                                                                controls
                                                                type="audio/mp3"
                                                                src={'http://docs.google.com/uc?export=open&id=' + `${item.audio_mp3}`}>
                                                            </audio>
                                                        </figure>
                                                    </span>}

                                                    <div className="row" id={item.id} data-tut="question-listening-part-1">
                                                        <div className="col-4"> <b>{item.number}</b></div>
                                                        <div className="col-4">
                                                            <p className='text-center'><img className='img-part1' src={`${item.img}`} style={{ width: '100%' }}></img></p>
                                                        </div>
                                                        <div className="col-4">

                                                            <div className="anwser-option-one" style={{ display: 'table-cell', height: 'max-content' }}>

                                                                <p className='intro-listening-test m-3' >(A).</p>
                                                                <input className={`ui floating message options ${myAnswer === item.option_1 ? "selected" : null}`} type="radio" name={item.id} value={item.option_1} onClick={() => this.checkAnswer(item.option_1, item.correct_answer, item.id)} />


                                                            </div>
                                                            <div className="anwser-option-two" style={{ display: 'table-cell', height: 'max-content' }}>
                                                                <p className='intro-listening-test m-3 ' >(B).</p>
                                                                <input className={`ui floating message options ${myAnswer === item.option_2 ? "selected" : null}`} type="radio" name={item.id} value={item.option_2} onClick={() => this.checkAnswer(item.option_2, item.correct_answer, item.id)} />

                                                            </div>
                                                            <div className="anwser-option-three" style={{ display: 'table-cell', height: 'max-content' }}>
                                                                <p className='intro-listening-test m-3'>(C).</p>
                                                                <input className={`ui floating message options ${myAnswer === item.option_3 ? "selected" : null}`} type="radio" name={item.id} value={item.option_3} onClick={() => this.checkAnswer(item.option_3, item.correct_answer, item.id)} />

                                                            </div>
                                                            <div className="anwser-option-four" style={{ display: 'table-cell', height: 'max-content' }}>
                                                                <p className='intro-listening-test m-3'>(D).</p>
                                                                <input className={`ui floating message options ${myAnswer === item.option_4 ? "selected" : null}`} type="radio" name={item.id} value={item.option_4} onClick={() => this.checkAnswer(item.option_4, item.correct_answer, item.id)} />
                                                            </div>
                                                        </div>
                                                    </div>

                                                </>
                                                :
                                                <></>
                                            }
                                        </>
                                    )
                                })}

                                <p className='intro-listening-test'><b>Part 2:</b></p><br></br>
                                <p className='intro-listening-test'><b>Directions:
                                </b>You will hear a question or statement an three responses spoken in English.
                                    They will not be printed in your test book and will be spoken only on time. selectthe best response to the
                                    question of statement and mark the letter (A),(B) or (C) on your answer sheet.</p>
                                {arrTest && arrTest.length > 0 && arrTest.map((item, index) => {
                                    return (
                                        <>
                                            {item && item.keyMap === 'PART 2' ?
                                                <>
                                                    <div className="d-flex justify-content-around border" data-tut="question-listening-part-2">
                                                        <div>
                                                            <p className='intro-listening-test'><b>{item.number}.</b> Mark your answer on your answer sheet</p>
                                                            <div className="d-flex flex-column " >
                                                                <div className="form-check p-2" style={{ display: '-webkit-inline-box' }}>
                                                                    <input className={`ui floating message options ${myAnswer === item.option_1 ? "selected" : null}`} style={{ marginTop: '15px' }} type="radio" name={item.id} value={item.option_1} onClick={() => this.checkAnswer(item.option_1, item.correct_answer, item.id)} />
                                                                    <p className='intro-listening-test'>(A).</p>
                                                                </div>
                                                                <div className="form-check p-2" style={{ display: '-webkit-inline-box' }}>
                                                                    <input className={`ui floating message options ${myAnswer === item.option_2 ? "selected" : null}`} style={{ marginTop: '15px' }} type="radio" name={item.id} value={item.option_2} onClick={() => this.checkAnswer(item.option_2, item.correct_answer, item.id)} />
                                                                    <p className='intro-listening-test'>(B).</p>
                                                                </div>
                                                                <div className="form-check p-2" style={{ display: '-webkit-inline-box' }}>
                                                                    <input className={`ui floating message options ${myAnswer === item.option_3 ? "selected" : null}`} style={{ marginTop: '15px' }} type="radio" name={item.id} value={item.option_3} onClick={() => this.checkAnswer(item.option_3, item.correct_answer, item.id)} />
                                                                    <p className='intro-listening-test'>(C).</p>
                                                                </div>

                                                            </div>

                                                        </div>
                                                        <div style={{ display: 'none' }}>3</div>
                                                    </div>
                                                </>
                                                :
                                                <></>

                                            }
                                        </>
                                    )
                                })}



                                <p className='intro-listening-test'><b>Part 3:</b><br></br></p>
                                <p className='intro-listening-test'><b>Directions:</b>Your will hear some conversations between two or more people. You will be asked to
                                    answer three questions about what the speaker say in each conversation. Select the best response
                                    to each question and mark the letter (A), (B), (C), or (D) on your answer sheet. The conversations will
                                    not be printed inyour test book and will be spoken only one time.
                                </p>
                                {arrTest && arrTest.length > 0 && arrTest.map((item, index) => {
                                    return (
                                        <>
                                            {item && item.keyMap === 'PART 3' ?
                                                <>
                                                    <div className="row" data-tut="question-listening-part-3">
                                                        <div className="col-5"></div>
                                                        <div className="col-5">
                                                            <p className='intro-listening-test'><b>{item.number}</b>.{'  '}{item.question}</p>
                                                            <div className='question-part-three' style={{ display: 'flex' }}>
                                                                <div className="number-question-part-three" style={{ width: '70%' }}>
                                                                    <p className='part-three-option-1' style={{ fontSize: '25px' }}>(A).{' '}{item.option_1}</p>
                                                                    <p className='part-three-option-2 ' style={{ fontSize: '25px' }}>(B).{' '}{item.option_2}</p>
                                                                    <p className='part-three-option-3 ' style={{ fontSize: '25px' }}>(C).{' '}{item.option_3}</p>
                                                                    <p className='part-three-option-4 ' style={{ fontSize: '25px' }}>(D).{' '}{item.option_4}</p>
                                                                </div>
                                                                <div className="answer-question-part-three" style={{ width: '30%' }}>

                                                                    <input className={`ui floating message options ${myAnswer === item.option_1 ? "selected" : null} `} style={{ marginTop: '15px', marginBottom: '28px' }} type="radio" name={item.id} value={item.option_1} onClick={() => this.checkAnswer(item.option_1, item.correct_answer, item.id)} />
                                                                    <input className={`ui floating message options ${myAnswer === item.option_2 ? "selected" : null}`} style={{ marginTop: '15px', marginBottom: '20px' }} type="radio" name={item.id} value={item.option_2} onClick={() => this.checkAnswer(item.option_2, item.correct_answer, item.id)} />
                                                                    <input className={`ui floating message options ${myAnswer === item.option_3 ? "selected" : null}`} style={{ marginTop: '15px', marginBottom: '25px' }} type="radio" name={item.id} value={item.option_3} onClick={() => this.checkAnswer(item.option_3, item.correct_answer, item.id)} />
                                                                    <input className={`ui floating message options ${myAnswer === item.option_4 ? "selected" : null}`} style={{ marginTop: '15px' }} type="radio" name={item.id} value={item.option_4} onClick={() => this.checkAnswer(item.option_4, item.correct_answer, item.id)} />

                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-2"></div>
                                                    </div>
                                                </>
                                                :
                                                <></>
                                            }
                                        </>
                                    )
                                })}

                                <p className='intro-listening-test'><b>Part 4:</b><br></br></p>
                                <p className='intro-listening-test'><b>Directions:</b> You will hear some tals given by a single speaker. You will be asked to answer three
                                    questions about what the speaker says in each talk. Select the best response to each question and mark
                                    the letter (A),(B),(C) or (D) on your answer sheet. The talks will not be printed in your test book
                                    and will be spoken only one time.
                                </p>
                                {arrTest && arrTest.length > 0 && arrTest.map((item, index) => {
                                    return (
                                        <>
                                            {item && item.keyMap === 'PART 4'
                                                ?
                                                <>
                                                    <div className="row" data-tut="question-listening-part-4">
                                                        <div className="col-5"></div>
                                                        <div className="col-5">
                                                            <p className='intro-listening-test'><b>{item.number}</b>.{'  '}{item.question}</p>
                                                            <div className='question-part-four' style={{ display: 'flex' }}>
                                                                <div className="number-question-part-four" style={{ width: '70%' }}>
                                                                    <p className='part-four-option-1 ' style={{ fontSize: '25px' }}>(A).{' '}{item.option_1}</p>
                                                                    <p className='part-four-option-2 ' style={{ fontSize: '25px' }}>(B).{' '}{item.option_2}</p>
                                                                    <p className='part-four-option-3 ' style={{ fontSize: '25px' }}>(C).{' '}{item.option_3}</p>
                                                                    <p className='part-four-option-4 ' style={{ fontSize: '25px' }}>(D).{' '}{item.option_4}</p>
                                                                </div>
                                                                <div className="answer-question-part-four" style={{ width: '30%' }}>

                                                                    <input className={`ui floating message options ${myAnswer === item.option_1 ? "selected" : null} `} style={{ marginTop: '15px', marginBottom: '28px' }} type="radio" name={item.id} value={item.option_1} onClick={() => this.checkAnswer(item.option_1, item.correct_answer, item.id)} />
                                                                    <input className={`ui floating message options ${myAnswer === item.option_2 ? "selected" : null}`} style={{ marginTop: '15px', marginBottom: '20px' }} type="radio" name={item.id} value={item.option_2} onClick={() => this.checkAnswer(item.option_2, item.correct_answer, item.id)} />
                                                                    <input className={`ui floating message options ${myAnswer === item.option_3 ? "selected" : null}`} style={{ marginTop: '15px', marginBottom: '25px' }} type="radio" name={item.id} value={item.option_3} onClick={() => this.checkAnswer(item.option_3, item.correct_answer, item.id)} />
                                                                    <input className={`ui floating message options ${myAnswer === item.option_4 ? "selected" : null}`} style={{ marginTop: '15px' }} type="radio" name={item.id} value={item.option_4} onClick={() => this.checkAnswer(item.option_4, item.correct_answer, item.id)} />

                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-2"></div>
                                                    </div>
                                                </> :
                                                <></>
                                            }
                                        </>
                                    )
                                })}

                                <p className='text-center intro-listening-test'><b>This is the end of the Listening test.</b></p>

                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div >

        )
    }
}
const tourConfig = [
    {
        selector: '[data-tut="number-question-list"]',
        content: `Bạn sẽ xem danh sách câu hỏi tương ứng với bộ đề thi.`
    },
    {
        selector: '[data-tut="pre-next-number-question-list"]',
        content: `Nhấn vào đây để di chuyển giữa các bảng câu hỏi .`
    },
    {
        selector: '[data-tut="end-question"]',
        content: `Thực hiện việc kết thúc và chấm điểm cho bài thi thử .`
    },
    {
        selector: '[data-tut="question-listening"]',
        content: `Bài thi nghe gồm có 4 phần : Part 1, Part 2, Part 3, Part 4.`
    },
    {
        selector: '[data-tut="question-listening-part-1"]',
        content: ` Phần đầu tiên của bài thi gồm 6 câu hỏi mỗi câu hỏi đưa ra gồm có hình mô tả và bốn đáp án để chọn, hãy nghe thật kĩ để chọn được đáp án chính xác.`
    },
    {
        selector: '[data-tut="question-listening-part-2"]',
        content: ` Phần thứ hai của bài thi gồm 25 câu hỏi mỗi câu gồm ba đáp án nhưng không hiển thị đáp án bạn cần phải nghe rồi chọn đáp án chính xác.`
    },
    {
        selector: '[data-tut="question-listening-part-3"]',
        content: ` Phần thứ ba của bài thi gồm 39 câu hỏi mỗi câu hỏi gồm bốn đáp án tiến hành nghe cuộc hội thoại để chọn đáp án.`
    },
    {
        selector: '[data-tut="question-listening-part-4"]',
        content: ` Phần thứ tư của bài thi gồm 30 câu hỏi mỗi câu hỏi gồm bốn đáp án tiến hành nghe cuộc hội thoại để chọn đáp án.`
    },
    {
        selector: '[data-tut="start-question-listening"]',
        content: ` Nhấn vào đây để tiến hành thi thử.`
    },
    {
        selector: '[data-tut="reactour__end"]',
        content: `Hướng dẫn kết thúc`
    },

];
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DoListening));
