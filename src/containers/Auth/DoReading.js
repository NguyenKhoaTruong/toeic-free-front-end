import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Icon from 'react-bootstrap-icons';
import { Link, withRouter } from 'react-router-dom';
import Countdown from 'react-countdown';
import Footer from '../../routes/Footer';
import { getAllTest, createNewResultService } from '../../services/userService';
import { toast } from 'react-toastify';
import './DoReading.scss';
import ShowResult from '../../routes/ShowResult';
import Confetti from "react-confetti";
import Tour from "reactour";
const Completionist = () => <span style={{ color: 'red' }}>Hết thời gian làm bài..</span>;

class DoReading extends Component {
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
            start: false,
            //
            showModal: false,
            itemsPerPage: 21,
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


    }

    checkAnswer = (correct_answer, correct_answer1, id) => {
        console.log('check id chon ', id)
        if (id) {
            let indexclick = '';
            this.setState({
                indexclick: id,

            }, console.log('check indexclick ', this.state.indexclick))
        }



        const { score } = this.state;

        console.log('check state correact answer ', correct_answer)
        console.log('check state correct answer 1', correct_answer1)
        if (correct_answer) {
            this.setState({
                myAnswer: correct_answer,
                disabled: false
            }, () => {

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

    }
    handleStartTest = () => {
        this.setState({
            start: true
        })
    }
    handleSaveResult = async (data, dataUser) => {
        console.log('check data save result', data)
        console.log('check dataUser save result', dataUser.id)
        console.log('check testid', this.state.arrTest[0].testid)
        console.log('check userid', this.props.userInfo.id)
        try {
            let arrupdate = {
                correct_listen: data,
                correct_read: '',
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
        if (this.state.currentPage === 5) {

            return <></>
        }
        this.setState({
            currentPage: this.state.currentPage + 1
        });

    }

    handlePreNumber = () => {
        if (this.state.currentPage === 1) {

            return <></>
        }
        this.setState({
            currentPage: this.state.currentPage - 1
        });

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
        let a = [];
        let slicearrtest = arrTest.slice(99, 201);
        a = slicearrtest
        console.log('check data slicearrtest', slicearrtest)
        console.log('check state all', this.state)
        console.log('check props all', this.props.userInfo)
        console.log('check params', this.props.match.params.id)
        console.log('check id paragam', arrTest.slice(99, 201).length)
        console.log('check id paragam 1', Math.ceil(arrTest.slice(99, 201).length / this.state.itemsPerPage))
        //
        const pageNumbers = [];
        const currentPageNum = this.state.currentPage;
        for (
            let i = 1;
            i <= Math.ceil(arrTest.slice(99, 201).length / this.state.itemsPerPage);
            i++
        ) {
            pageNumbers.push(i);
        }
        console.log('check pageNumber', pageNumbers)
        console.log('check pageNumber1', arrTest.slice(99, 201).length > 99)
        let renderPageNumbers = [];
        if (arrTest.slice(99, 201).length > 90) {
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
        const lastIndex = startinIndex + this.state.itemsPerPage;
        // const pageData = arrTest.slice(startinIndex, lastIndex);
        const pageData = arrTest.slice(99, 201).slice(startinIndex, lastIndex);
        console.log('check  startinIndex ....', startinIndex)
        console.log('check  lastIndex ....', lastIndex)


        console.log('check pageData', arrTest.slice(startinIndex, lastIndex))
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
                <>
                    <div>
                        <nav className="navbar navbar-expand-lg navbar-light bg-dark sticky-top">
                            <Link to='/list-exam-test'><Icon.ArrowBarLeft size={30} color="white" style={{ background: "", cursor: 'pointer' }} className="rounded-circle mr-1" /></Link>
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                                <div className="navbar-nav">
                                    <Link to='/' style={{ textDecoration: 'none' }}><a className="nav-item nav-link active" href="/" style={{ color: 'white', cursor: 'pointer' }}>Trang Chủ <span className="sr-only">(current)</span></a></Link>
                                </div>
                            </div>
                            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                                <div className="navbar-nav">
                                    <button className='btn btn-warning m-2' onClick={() => this.handleSaveResult(this.state.score, this.props.userInfo)}>Lưu kết quả</button>
                                    {/* <button className=' btn btn-danger'>Hướng Dẫn</button>
                                    <button className=' btn btn-primary ml-3'>Bắt Đầu Làm Bài Đọc</button> */}
                                </div>
                            </div>

                            {/* <span className='countdowntimer-doreading' style={{ color: 'white' }}> Time {'   '}
                                <Countdown date={Date.now() + 75000 * 60} >
                                    <Completionist />
                                </Countdown>
                            </span> */}

                        </nav>
                        <div className='row'>
                            <div className="col-12 border">
                                <div className='question-reading-number'>
                                    <h1>READING TEST</h1><br></br>
                                    <p>In the Reading test, you will read a variety of texts and answer several different types of reading
                                        cormprehension questions. The entire Reading test will last 75 minutes. There are three parts,and
                                        directions are given for each part. You are encouraged to answer as many questions as possible within
                                        the time allowed.

                                    </p>
                                    <p>You mst mark your answers on the separate answer sheet. DO not write your answer in your test book.</p>
                                    <p><b>PART 5</b></p><br></br>
                                    <p><b>Directions:</b>A word or phrase is missing in each of the sentences below. Four answer choices are given below
                                        each sentence. Select the best answer to complete the sentence. Then mark the letter
                                        (A),(B),(C) or (D) on your answer sheet.
                                    </p>

                                    <div className="test5">
                                        {arrTest && arrTest.length > 0 && arrTest.map((item, index) => {
                                            return (
                                                <>

                                                    {item && item.keyMap === 'PART 5' ?
                                                        <>
                                                            <div className="row">
                                                                <div className="col-5"></div>
                                                                <div className="col-5">
                                                                    <p><b>{item.number}</b>.{'  '}{item.question}</p>
                                                                    <div className='question-part-five' style={{ display: 'flex' }}>
                                                                        <div className="number-question-part-five" style={{ width: '45%' }}>
                                                                            {item.correct_answer === item.option_1 ?
                                                                                <>
                                                                                    <p className='part-five-option-1'>(A).{' '}{item.option_1}{' '}<Icon.Check size={30} color="green" style={{ background: "", cursor: 'pointer' }} className="rounded-circle mr-1" /></p>
                                                                                </>
                                                                                :
                                                                                <>
                                                                                    <p className='part-five-option-1'>(A).{' '}{item.option_1}</p>
                                                                                </>
                                                                            }
                                                                            {item.correct_answer === item.option_2 ?
                                                                                <>
                                                                                    <p className='part-five-option-2'>(B).{' '}{item.option_2}{' '}<Icon.Check size={30} color="green" style={{ background: "", cursor: 'pointer' }} className="rounded-circle mr-1" /></p>
                                                                                </>
                                                                                :
                                                                                <>
                                                                                    <p className='part-five-option-2'>(B).{' '}{item.option_2}</p>
                                                                                </>
                                                                            }
                                                                            {item.correct_answer === item.option_3 ?
                                                                                <>
                                                                                    <p className='part-five-option-3'>(B).{' '}{item.option_3}{' '}<Icon.Check size={30} color="green" style={{ background: "", cursor: 'pointer' }} className="rounded-circle mr-1" /></p>
                                                                                </>
                                                                                :
                                                                                <>
                                                                                    <p className='part-five-option-3'>(B).{' '}{item.option_3}</p>
                                                                                </>
                                                                            }
                                                                            {item.correct_answer === item.option_4 ?
                                                                                <>
                                                                                    <p className='part-five-option-4'>(B).{' '}{item.option_4}{' '}<Icon.Check size={30} color="green" style={{ background: "", cursor: 'pointer' }} className="rounded-circle mr-1" /></p>
                                                                                </>
                                                                                :
                                                                                <>
                                                                                    <p className='part-five-option-4'>(B).{' '}{item.option_4}</p>
                                                                                </>
                                                                            }
                                                                        </div>
                                                                        <div className="answer-question-part-five" style={{ width: '30%' }}>

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

                                                </>)
                                        })}
                                    </div>
                                    <p><b>PART 6</b></p><br></br>
                                    <p><b>Directions:</b> Read the texts that follow. A word, phrase, or sentence is missing in parts of each text.
                                        Four answer chois for each questin are given below the text. Select the best answer to complete
                                        the text. Then mark the letter (A), (B), (C) or (D) on your answer sheet.</p>
                                    {arrTest && arrTest.length > 0 && arrTest.map((item, index) => {
                                        return (
                                            <>
                                                {item && item.keyMap === 'PART 6' ?
                                                    <>
                                                        <div className="row">
                                                            <div className="col-5"></div>
                                                            <div className="col-5">
                                                                <p><b>{item.number}</b>.{'  '}{item.paragrap}</p>
                                                                <div className='question-part-six' style={{ display: 'flex' }}>
                                                                    <div className="number-question-part-six" style={{ width: '45%' }}>
                                                                        {item.correct_answer === item.option_1 ?
                                                                            <>
                                                                                <p className='part-six-option-1'>(A).{' '}{item.option_1}{' '}<Icon.Check size={30} color="green" style={{ background: "", cursor: 'pointer' }} className="rounded-circle mr-1" /></p>
                                                                            </>
                                                                            :
                                                                            <>
                                                                                <p className='part-six-option-1'>(A).{' '}{item.option_1}</p>
                                                                            </>
                                                                        }
                                                                        {item.correct_answer === item.option_2 ?
                                                                            <>
                                                                                <p className='part-six-option-2'>(B).{' '}{item.option_2}{' '}<Icon.Check size={30} color="green" style={{ background: "", cursor: 'pointer' }} className="rounded-circle mr-1" /></p>
                                                                            </>
                                                                            :
                                                                            <>
                                                                                <p className='part-six-option-2'>(B).{' '}{item.option_2}</p>
                                                                            </>
                                                                        }
                                                                        {item.correct_answer === item.option_3 ?
                                                                            <>
                                                                                <p className='part-six-option-3'>(B).{' '}{item.option_3}{' '}<Icon.Check size={30} color="green" style={{ background: "", cursor: 'pointer' }} className="rounded-circle mr-1" /></p>
                                                                            </>
                                                                            :
                                                                            <>
                                                                                <p className='part-six-option-3'>(B).{' '}{item.option_3}</p>
                                                                            </>
                                                                        }
                                                                        {item.correct_answer === item.option_4 ?
                                                                            <>
                                                                                <p className='part-six-option-4'>(B).{' '}{item.option_4}{' '}<Icon.Check size={30} color="green" style={{ background: "", cursor: 'pointer' }} className="rounded-circle mr-1" /></p>
                                                                            </>
                                                                            :
                                                                            <>
                                                                                <p className='part-six-option-4'>(B).{' '}{item.option_4}</p>
                                                                            </>
                                                                        }
                                                                    </div>
                                                                    <div className="answer-question-part-six" style={{ width: '30%' }}>

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

                                    <p><b>PART 7</b></p> <br></br>
                                    <p><b>Directions:</b> In this part you will read a selection of texts, such as magazine and newspaper articles,
                                        e-mails, and instant messages. Each text or set of texts is followed by several questions. Select the best answer
                                        for each question and mark the letter (A),(B),(C), or (D) on your answer sheet.</p>
                                    {arrTest && arrTest.length > 0 && arrTest.map((item, index) => {
                                        return (
                                            <>
                                                {item && item.keyMap === 'PART 7' ?
                                                    <>
                                                        <div className="row">
                                                            <div className="col-5"></div>
                                                            <div className="col-5">
                                                                <div className="d-flex justify-content-between">
                                                                    <a></a>
                                                                    <div className='content-doread-part7 border text-center m-3'>
                                                                        {item.paragrap}
                                                                    </div>
                                                                    <a></a>
                                                                </div>
                                                                <p><b>{item.number}</b>.{'  '}{item.question}</p>
                                                                <div className='question-part-seven' style={{ display: 'flex' }}>
                                                                    <div className="number-question-part-seven" style={{ width: '45%' }}>
                                                                        {item.correct_answer === item.option_1 ?
                                                                            <>
                                                                                <p className='part-seven-option-1'>(A).{' '}{item.option_1}{' '}<Icon.Check size={30} color="green" style={{ background: "", cursor: 'pointer' }} className="rounded-circle mr-1" /></p>
                                                                            </>
                                                                            :
                                                                            <>
                                                                                <p className='part-seven-option-1'>(A).{' '}{item.option_1}</p>
                                                                            </>
                                                                        }
                                                                        {item.correct_answer === item.option_2 ?
                                                                            <>
                                                                                <p className='part-seven-option-2'>(B).{' '}{item.option_2}{' '}<Icon.Check size={30} color="green" style={{ background: "", cursor: 'pointer' }} className="rounded-circle mr-1" /></p>
                                                                            </>
                                                                            :
                                                                            <>
                                                                                <p className='part-seven-option-2'>(B).{' '}{item.option_2}</p>
                                                                            </>
                                                                        }
                                                                        {item.correct_answer === item.option_3 ?
                                                                            <>
                                                                                <p className='part-seven-option-3'>(B).{' '}{item.option_3}{' '}<Icon.Check size={30} color="green" style={{ background: "", cursor: 'pointer' }} className="rounded-circle mr-1" /></p>
                                                                            </>
                                                                            :
                                                                            <>
                                                                                <p className='part-seven-option-3'>(B).{' '}{item.option_3}</p>
                                                                            </>
                                                                        }
                                                                        {item.correct_answer === item.option_4 ?
                                                                            <>
                                                                                <p className='part-seven-option-4'>(B).{' '}{item.option_4}{' '}<Icon.Check size={30} color="green" style={{ background: "", cursor: 'pointer' }} className="rounded-circle mr-1" /></p>
                                                                            </>
                                                                            :
                                                                            <>
                                                                                <p className='part-seven-option-4'>(B).{' '}{item.option_4}</p>
                                                                            </>
                                                                        }
                                                                    </div>
                                                                    <div className="answer-question-part-seven" style={{ width: '30%' }}>

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

                                </div>
                            </div>
                        </div>
                        <Footer />
                    </div>
                </>
            )
        }
        return (

            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-dark sticky-top">
                    <Link to='/list-exam-test'><Icon.ArrowBarLeft size={30} color="white" style={{ background: "", cursor: 'pointer' }} className="rounded-circle mr-1" /></Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <span className='title-reading-test' style={{ fontSize: '25px', color: 'white' }}>READING TEST</span>
                            {/* <Link to='/' style={{ textDecoration: 'none' }}><a className="nav-item nav-link active" href="/" style={{ color: 'white', cursor: 'pointer' }}>Trang Chủ <span className="sr-only">(current)</span></a></Link> */}
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
                            <button className=' btn btn-danger ' onClick={this.openTour}>Hướng Dẫn</button>
                            {start === true ?
                                <>
                                    <button className=' btn btn-primary ml-3' onClick={this.handleStartTest} style={{ display: 'none' }}>Bắt Đầu Làm Bài Đọc</button></> :
                                <>
                                    <button className=' btn btn-primary ml-3' onClick={this.handleStartTest} data-tut="start-question-reading">Bắt Đầu Làm Bài Đọc</button>
                                </>
                            }
                            {start === true && <button className=' btn btn-primary ml-3' onClick={this.handleEndTest}>Dừng</button>}
                        </div>
                    </div>
                    {start === true &&
                        <>
                            <span className='countdowntimer-doreading' style={{ color: 'white' }}> Time {'   '}
                                <Countdown date={Date.now() + 75000 * 60} >
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
                </nav>
                <div className='m-3'>
                    <div className='row'>
                        <div className='col-2 border'>
                            <div className='number-img-question border'>
                                <div className="d-flex align-items-start flex-column border">
                                    <div className='menu-question-reading' style={{ width: '16%', position: 'fixed' }} data-tut="number-question-list">

                                        {pageData && pageData.length > 0 && pageData.map((item, index) => {
                                            let showColor = 'gray';
                                            let off = false
                                            if (indexclick === item.id) {
                                                showColor = 'red'
                                                off = false
                                            }
                                            else {
                                                showColor = 'gray'
                                                off = true
                                            }
                                            console.log('check data menu', item)
                                            return (
                                                <>
                                                    <div className="number-question " style={{ display: 'inline-flex' }}>

                                                        {item.keyMap === 'PART 5' ?
                                                            <>
                                                                {showColor === 'red' &&
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
                                                        {item.keyMap === 'PART 6' ?
                                                            <>
                                                                {showColor === 'red' &&
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
                                                        {item.keyMap === 'PART 7' ?
                                                            <>
                                                                {showColor === 'red' &&
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
                                            style={{ display: 'flex', marginLeft: '18px', marginRight: '18px' }}
                                            data-tut="pre-next-number-question-list"
                                        >
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
                        <div className='col-10 border'>
                            <div className='question-reading-number' data-tut="question-reading">
                                <h1>READING TEST</h1><br></br>
                                <p className='intro-reading-test'>In the Reading test, you will read a variety of texts and answer several different types of reading
                                    cormprehension questions. The entire Reading test will last 75 minutes. There are three parts,and
                                    directions are given for each part. You are encouraged to answer as many questions as possible within
                                    the time allowed.

                                </p>
                                <p className='intro-reading-test'>You mst mark your answers on the separate answer sheet. DO not write your answer in your test book.</p>
                                <p className='intro-reading-test'><b>PART 5</b></p><br></br>
                                <p className='intro-reading-test'><b>Directions:</b>A word or phrase is missing in each of the sentences below. Four answer choices are given below
                                    each sentence. Select the best answer to complete the sentence. Then mark the letter
                                    (A),(B),(C) or (D) on your answer sheet.
                                </p>

                                <div className="test5" data-tut="question-reading-part-5">
                                    {arrTest && arrTest.length > 0 && arrTest.map((item, index) => {
                                        return (
                                            <>

                                                {item && item.keyMap === 'PART 5' ?
                                                    <>
                                                        <div className="row">
                                                            <div className="col-5"></div>
                                                            <div className="col-5">
                                                                <p className='intro-reading-test'><b>{item.number}</b>.{'  '}{item.question}</p>
                                                                <div className='question-part-five' style={{ display: 'flex' }}>
                                                                    <div className="number-question-part-five" style={{ width: '70%' }}>
                                                                        <p className='part-five-option-1' style={{ fontSize: '25px' }}>(A).{' '}{item.option_1}</p>
                                                                        <p className='part-five-option-2' style={{ fontSize: '25px' }}>(B).{' '}{item.option_2}</p>
                                                                        <p className='part-five-option-3' style={{ fontSize: '25px' }}>(C).{' '}{item.option_3}</p>
                                                                        <p className='part-five-option-4' style={{ fontSize: '25px' }}>(D).{' '}{item.option_4}</p>
                                                                    </div>
                                                                    <div className="answer-question-part-five" style={{ width: '30%' }}>

                                                                        <input className={`ui floating message options ${myAnswer === item.option_1 ? "selected" : null} `} style={{ marginTop: '22px', marginBottom: '23px' }} type="radio" name={item.id} value={item.option_1} onClick={() => this.checkAnswer(item.option_1, item.correct_answer, item.id)} />
                                                                        <input className={`ui floating message options ${myAnswer === item.option_2 ? "selected" : null}`} style={{ marginTop: '15px', marginBottom: '22px' }} type="radio" name={item.id} value={item.option_2} onClick={() => this.checkAnswer(item.option_2, item.correct_answer, item.id)} />
                                                                        <input className={`ui floating message options ${myAnswer === item.option_3 ? "selected" : null}`} style={{ marginTop: '15px', marginBottom: '24px' }} type="radio" name={item.id} value={item.option_3} onClick={() => this.checkAnswer(item.option_3, item.correct_answer, item.id)} />
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

                                            </>)
                                    })}
                                </div>
                                <p className='intro-reading-test'><b>PART 6</b></p><br></br>
                                <p className='intro-reading-test'><b>Directions:</b> Read the texts that follow. A word, phrase, or sentence is missing in parts of each text.
                                    Four answer chois for each questin are given below the text. Select the best answer to complete
                                    the text. Then mark the letter (A), (B), (C) or (D) on your answer sheet.</p>
                                {arrTest && arrTest.length > 0 && arrTest.map((item, index) => {
                                    return (
                                        <>
                                            {item && item.keyMap === 'PART 6' ?
                                                <>
                                                    <div className="row" >
                                                        <div className="col-5"></div>
                                                        <div className="col-5" data-tut="question-reading-part-6">
                                                            <p className='intro-reading-test' ><b>{item.number}</b>.{'  '}{item.paragrap}</p>
                                                            <div className='question-part-six' style={{ display: 'flex' }}>
                                                                <div className="number-question-part-six" style={{ width: '70%' }}>
                                                                    <p className='part-six-option-1' style={{ fontSize: '25px' }}>(A).{' '}{item.option_1}</p>
                                                                    <p className='part-six-option-2' style={{ fontSize: '25px' }}>(B).{' '}{item.option_2}</p>
                                                                    <p className='part-six-option-3' style={{ fontSize: '25px' }}>(C).{' '}{item.option_3}</p>
                                                                    <p className='part-six-option-4' style={{ fontSize: '25px' }}>(D).{' '}{item.option_4}</p>
                                                                </div>
                                                                <div className="answer-question-part-six" style={{ width: '30%' }}>

                                                                    <input className={`ui floating message options ${myAnswer === item.option_1 ? "selected" : null} `} style={{ marginTop: '15px' }} type="radio" name={item.id} value={item.option_1} onClick={() => this.checkAnswer(item.option_1, item.correct_answer, item.id)} />
                                                                    <input className={`ui floating message options ${myAnswer === item.option_2 ? "selected" : null}`} style={{ marginTop: '15px' }} type="radio" name={item.id} value={item.option_2} onClick={() => this.checkAnswer(item.option_2, item.correct_answer, item.id)} />
                                                                    <input className={`ui floating message options ${myAnswer === item.option_3 ? "selected" : null}`} style={{ marginTop: '15px' }} type="radio" name={item.id} value={item.option_3} onClick={() => this.checkAnswer(item.option_3, item.correct_answer, item.id)} />
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

                                <p className='intro-reading-test'><b>PART 7</b></p> <br></br>
                                <p className='intro-reading-test'><b>Directions:</b> In this part you will read a selection of texts, such as magazine and newspaper articles,
                                    e-mails, and instant messages. Each text or set of texts is followed by several questions. Select the best answer
                                    for each question and mark the letter (A),(B),(C), or (D) on your answer sheet.</p>
                                {arrTest && arrTest.length > 0 && arrTest.map((item, index) => {
                                    return (
                                        <>
                                            {item && item.keyMap === 'PART 7' ?
                                                <>
                                                    <div className="row">
                                                        <div className="col-5"></div>
                                                        <div className="col-5" data-tut="question-reading-part-7">
                                                            <div className="d-flex justify-content-between">
                                                                <a></a>
                                                                <div className='content-doread-part7 border text-center m-3 intro-reading-test '>
                                                                    {item.paragrap}
                                                                </div>
                                                                <a></a>
                                                            </div>
                                                            <p className='intro-reading-test'><b>{item.number}</b>.{'  '}{item.question}</p>
                                                            <div className='question-part-seven' style={{ display: 'flex' }}>
                                                                <div className="number-question-part-seven" style={{ width: '70%' }} >
                                                                    <p className='part-seven-option-1' style={{ fontSize: '25px' }}>(A).{' '}{item.option_1}</p>
                                                                    <p className='part-seven-option-2' style={{ fontSize: '25px' }}>(B).{' '}{item.option_2}</p>
                                                                    <p className='part-seven-option-3' style={{ fontSize: '25px' }}>(C).{' '}{item.option_3}</p>
                                                                    <p className='part-seven-option-4' style={{ fontSize: '25px' }}>(D).{' '}{item.option_4}</p>
                                                                </div>
                                                                <div className="answer-question-part-seven" style={{ width: '30%' }}>

                                                                    <input className={`ui floating message options ${myAnswer === item.option_1 ? "selected" : null} `} style={{ marginTop: '15px', marginBottom: '60px' }} type="radio" name={item.id} value={item.option_1} onClick={() => this.checkAnswer(item.option_1, item.correct_answer, item.id)} />
                                                                    <input className={`ui floating message options ${myAnswer === item.option_2 ? "selected" : null}`} style={{ marginTop: '15px', marginBottom: '28px' }} type="radio" name={item.id} value={item.option_2} onClick={() => this.checkAnswer(item.option_2, item.correct_answer, item.id)} />
                                                                    <input className={`ui floating message options ${myAnswer === item.option_3 ? "selected" : null}`} style={{ marginTop: '15px', marginBottom: '57px' }} type="radio" name={item.id} value={item.option_3} onClick={() => this.checkAnswer(item.option_3, item.correct_answer, item.id)} />
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

                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>

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
        selector: '[data-tut="question-reading"]',
        content: `Bài thi nghe gồm có ba phần : Part 5, Part 6, Part 7.`
    },
    {
        selector: '[data-tut="question-reading-part-5"]',
        content: ` Phần thứ nhất của bài thi gồm 30 câu hỏi mỗi câu gồm bốn đáp án dựa vào kiến thức ngữ pháp để áp dụng vào phần này.`
    },
    {
        selector: '[data-tut="question-reading-part-6"]',
        content: ` Phần thứ hai của bài thi gồm 16 câu hỏi mỗi câu hỏi gồm bốn đáp án dựa vào đoạn văn cho sẵn thực hiện điền đáp án vào đoạn văn.`
    },
    {
        selector: '[data-tut="question-reading-part-7"]',
        content: ` Phần thứ ba của bài thi gồm 54 câu hỏi mỗi câu hỏi gồm bốn đáp án dựa vào đoạn văn để tìm ra đáp án.`
    },
    {
        selector: '[data-tut="start-question-reading"]',
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DoReading));
