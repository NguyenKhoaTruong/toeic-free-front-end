import React, { Component } from 'react';
import './ProcessPartOne.scss'

import {
    createNewExamTestService,
} from '../../services/userService';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
class ProcessPartOne extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentQuestion: -1,
            myAnswer: null,
            //mới k cần chỗ này options[]
            //cũ
            // options: [],
            score: 0,
            disabled: true,
            isEnd: false,
            // options mới
            option_1: '',
            option_2: '',
            option_3: '',
            option_4: '',
            questionSucssed: [],
            image: '',
            audio_mp3: '',
            letterquestion: '',
            letterquestiontwo: '',
            letterquestionthree: ''
        };

        // this.loadQuizData = this.loadQuizData.bind(this);
    }



    //giữ nguyên
    async componentDidMount() {

        await this.loadQuizData();


    }

    // cũ
    // componentDidUpdate(prevProps, prevState) {
    //     if (this.state.currentQuestion !== prevState.currentQuestion) {
    //         this.setState(() => {
    //             return {
    //                 disabled: true,
    //                 questions: quizData[this.state.currentQuestion].question,
    //                 options: quizData[this.state.currentQuestion].options,
    //                 answer: quizData[this.state.currentQuestion].answer
    //             };
    //         });
    //     }
    // }

    // mới
    componentDidUpdate(prevProps, prevState) {

        if (this.state.currentQuestion !== prevState.currentQuestion) {
            this.setState(() => {
                return {
                    disabled: true,
                    question: this.props.data[this.state.currentQuestion].question,

                    correct_answer: this.props.data[this.state.currentQuestion].correct_answer,

                    option_1: this.props.data[this.state.currentQuestion].option_1,
                    option_2: this.props.data[this.state.currentQuestion].option_2,
                    option_3: this.props.data[this.state.currentQuestion].option_3,
                    option_4: this.props.data[this.state.currentQuestion].option_4,
                    image: this.props.data[this.state.currentQuestion].img,
                    audio_mp3: this.props.data[this.state.currentQuestion].audio_mp3,
                    letterquestion: this.props.data[this.state.currentQuestion].letterquestion,
                    letterquestiontwo: this.props.data[this.state.currentQuestion].letterquestiontwo,
                    letterquestionthree: this.props.data[this.state.currentQuestion].letterquestionthree,
                };
            });
        }
    }
    //cũ
    // loadQuizData = () => {
    //     console.log('check quizData.question', quizData[0].question)
    //     // console.log('check dataQuiz.question', this.props.dataQuiz[0].question)
    //     this.setState(() => {
    //         return {
    //             questions: quizData[this.state.currentQuestion].question,

    //             answer: quizData[this.state.currentQuestion].answer,

    //             options: quizData[this.state.currentQuestion].options

    //         };
    //     });

    // };
    // mới
    loadQuizData = () => {

        // console.log('check dataQuiz.question', this.state.dataQuiz.question)
        // console.log('check dataQuiz.question 11', this.props.dataQuiz[this.state.currentQuestion].question)
        if (this.props.data && this.props.data.length > 0) {
            this.setState(() => {
                return {

                    question: this.state.data[this.state.currentQuestion].question,

                    correct_answer: this.state.data[this.state.currentQuestion].correct_answer,

                    option_1: this.state.data[this.state.currentQuestion].option_1,
                    option_2: this.state.data[this.state.currentQuestion].option_2,
                    option_3: this.state.data[this.state.currentQuestion].option_3,
                    option_4: this.state.data[this.state.currentQuestion].option_4,
                    image: this.state.data[this.state.currentQuestion].img,
                    audio_mp3: this.state.data[this.state.currentQuestion].audio_mp3,
                    letterquestion: this.state.data[this.state.currentQuestion].letterquestion,
                    letterquestiontwo: this.state.data[this.state.currentQuestion].letterquestiontwo,
                    letterquestionthree: this.state.data[this.state.currentQuestion].letterquestionthree,
                };
            });
        }


    };


    // cũ
    // nextQuestionHandler = () => {
    //     // console.log('test')
    //     const { myAnswer, answer, score } = this.state;

    //     if (myAnswer === answer) {
    //         this.setState({
    //             score: score + 1
    //         });
    //     }

    //     this.setState({
    //         currentQuestion: this.state.currentQuestion + 1
    //     });
    //     console.log(this.state.currentQuestion);
    // };
    // mới
    nextQuestionHandler = () => {

        const { myAnswer, correct_answer, score } = this.state;

        if (myAnswer === correct_answer) {
            this.setState({
                score: score + 1,
                myAnswer: null,
            });
        }


        this.setState({
            currentQuestion: this.state.currentQuestion + 1
        });
        console.log('check currenqueston', this.state.currentQuestion);
        console.log('check myAnswer', myAnswer);
    };



    //check answer
    // cũ
    // checkAnswer = answer => {
    //     this.setState({ myAnswer: answer, disabled: false });
    // };
    // mới
    checkAnswer = correct_answer => {
        console.log('createNewExamTestService', this.state.correct_answer)
        const { score } = this.state;
        // console.log('check state check answer 1', this.state.correct_answer)
        this.setState({ myAnswer: correct_answer, disabled: false })

        // if (this.state.myAnswer === correct_answer) {
        //     this.setState({
        //         score: score + 1,
        //         myAnswer: this.state.myAnswer,
        //     });
        // }
        // this.setState({
        //     currentQuestion: this.state.currentQuestion + 1,

        // });
        // if (this.state.currentQuestion === this.props.dataQuiz.length - 1) {
        //     this.setState({
        //         isEnd: true
        //     });
        // }
        // console.log('check state check answer', correct_answer)
    };
    // checkAnswer = correct_answer => {
    //     const { score } = this.state;
    //     // console.log('check state check answer 1', this.state.correct_answer)
    //     this.setState({ myAnswer: correct_answer, disabled: false })
    //     console.log('check state myAnswer myAnswer 1', this.state.correct_answer)
    //     if (this.state.myAnswer === correct_answer) {
    //         this.setState({
    //             score: score + 1,
    //             // myAnswer: this.state.myAnswer,
    //         });
    //     }
    //     if (this.state.currentQuestion !== this.props.data.length - 1) {
    //         this.setState({

    //             currentQuestion: this.state.currentQuestion + 1,


    //         });

    //     } else {

    //         alert('hết con mẹ nó rồi')
    //         this.setState({
    //             isEnd: true
    //         });
    //     }
    //     // if (this.state.currentQuestion === this.props.dataQuiz.length - 1) {
    //     //     this.setState({
    //     //         isEnd: true
    //     //     });
    //     // } else {
    //     //     this.setState({
    //     //         currentQuestion: this.state.currentQuestion + 1,

    //     //     });
    //     // }
    //     console.log('check state check answer', correct_answer)
    // };
    finishHandler = () => {
        if (this.state.currentQuestion === this.props.data.length - 1) {
            this.setState({
                isEnd: true
            });
        }
        if (this.state.myAnswer === this.state.correct_answer) {
            this.setState({
                score: this.state.score + 1
            });
        }
    };

    // // quiz test chấm điểm liền lun
    // finishHandlera = () => {

    //     this.setState({
    //         isEnd: true
    //     })

    //     if (this.state.myAnswer === this.state.correct_answer) {
    //         this.setState({
    //             score: this.state.score + 1
    //         });
    //     }

    // };
    handleSaveScoreExamTest = async () => {
        try {
            let arrupdate = {}
            if (this.props.dataPart === 'PART 1') {
                arrupdate = {
                    score: this.state.score * 5,
                    listenid: this.props.Iddata,
                    readid: '',
                    userid: this.props.userInfo.id,
                }
            }
            if (this.props.dataPart === 'PART 2') {
                arrupdate = {
                    score: this.state.score * 5,
                    listenid: this.props.Iddata,
                    readid: '',
                    userid: this.props.userInfo.id,
                }
            }
            if (this.props.dataPart === 'PART 3') {
                arrupdate = {
                    score: this.state.score * 5,
                    listenid: this.props.Iddata,
                    readid: '',
                    userid: this.props.userInfo.id,
                }
            }
            if (this.props.dataPart === 'PART 4') {
                arrupdate = {
                    score: this.state.score * 5,
                    listenid: this.props.Iddata,
                    readid: '',
                    userid: this.props.userInfo.id,
                }
            }
            if (this.props.dataPart === 'PART 5') {
                arrupdate = {
                    score: this.state.score * 5,
                    listenid: '',
                    readid: this.props.Iddata,
                    userid: this.props.userInfo.id,
                }
            }
            if (this.props.dataPart === 'PART 6') {
                arrupdate = {
                    score: this.state.score * 5,
                    listenid: '',
                    readid: this.props.Iddata,
                    userid: this.props.userInfo.id,
                }
            }
            if (this.props.dataPart === 'PART 7') {
                arrupdate = {
                    score: this.state.score * 5,
                    listenid: '',
                    readid: this.props.Iddata,
                    userid: this.props.userInfo.id,
                }
            }
            let response = await createNewExamTestService(
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
    render() {
        // cũ
        // const { options, myAnswer, currentQuestion, isEnd } = this.state;
        // mới
        const { option_1, option_2, option_3, option_4, myAnswer, currentQuestion, isEnd, question, correct_answer, image, audio_mp3, letterquestion, letterquestiontwo, letterquestionthree
        } = this.state;
        // console.log('check options', options)
        // const { dataQuiz } = this.props;

        // console.log('check props', this.props.dataQuiz.push(option_1, option_2, option_3, option_4))
        // const { data } = this.props;
        console.log('check props data .id', this.props.data)
        console.log('check props', this.props.data)
        console.log('check state', this.state)
        // currentQuestion = currentQuestion + 1
        if (isEnd) {
            return (
                <div className="result">
                    <h3>Số Câu Đúng Của Bạn Là {this.state.score} Câu </h3>
                    <div>
                        <h3>Câu Trả Lời Chính Xác Và Giải Thích Cho Các Câu Hỏi Là:</h3>
                        <ul>
                            {/* <p>{currentQuestion && question && myAnswer ? <>
                                <p>Câu Hỏi {question}</p>
                                <ul> Đáp Án
                                    <li>{option_1}</li>
                                    <li>{option_2}</li>
                                    <li>{option_3}</li>
                                    <li>{option_4}</li>
                                </ul>
                                <p>Giải Thích{option_1}</p>
                            </> : <>óc chó</>}</p> */}
                            {/* cũ */}
                            {/* {quizData.map((item, index) => (
                                <li className="ui floating message options" key={index}>
                                    {item.answer}
                                </li>
                            ))} */}
                            {/* mới */}
                            {this.props.data.map((item, index) => {

                                return (
                                    <>

                                        <li className="ui floating message options border" key={index}>
                                            <p>Câu Hỏi:  {item.question}</p>
                                            <ul>Đáp Án
                                                <li>A.{' '}{item.option_1}</li>
                                                <li>B.{' '}{item.option_2}</li>
                                                <li>C.{' '}{item.option_3}</li>
                                                <li>D.{' '}{item.option_4}</li>
                                            </ul>
                                            {/* <p>Đáp án Bạn Chọn</p>
                                    {myAnswer === option_1 && myAnswer === option_2 && myAnswer === option_3 && myAnswer === option_4 && myAnswer === "selected"} */}
                                            <p>Đáp Án Đúng  :{item.correct_answer}</p>
                                        </li>

                                    </>
                                )


                            })}


                        </ul>
                        <button className='btn btn-primary' onClick={() => this.handleSaveScoreExamTest()}>Lưu Kết Quả Luyện Thi</button>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="App">
                    {/* cũ */}
                    {/* <h1>{this.state.questions} </h1> */}
                    {/* mới */}
                    {/* cũ */}
                    {/* <span>
                        {`Questions ${currentQuestion}  out of ${quizData.length - 1} remaining `}
                    </span> */}

                    {/* mới */}
                    <span className='num-question'>
                        {`Câu Hỏi ${currentQuestion + 1} / ${this.props.data.length} Tổng Số Câu Hỏi  `}
                        {audio_mp3 && <>
                            <figure style={{ display: 'none' }}>
                                <audio
                                    autoPlay
                                    type="audio/mp3"
                                    src={'http://docs.google.com/uc?export=open&id=' + `${audio_mp3}`}>
                                </audio>
                            </figure>
                        </>}

                        {letterquestion && <>
                            <pre style={{ background: '#ede7e7', margin: '20px', fontSize: '25px' }}>{letterquestion}</pre>
                        </>}
                        {letterquestiontwo && <>
                            <pre style={{ background: '#ede7e7', margin: '20px', fontSize: '25px' }}>{letterquestiontwo}</pre>
                        </>}
                        {letterquestionthree && <>
                            <pre style={{ background: '#ede7e7', margin: '20px', fontSize: '25px' }}>{letterquestionthree}</pre>
                        </>}
                        {question && <>
                            <pre style={{ background: '#ede7e7', margin: '20px', fontSize: '25px' }}>{question}</pre>
                        </>}
                    </span>
                    {currentQuestion === 0 ? <>
                        <p
                            className={`ui floating message options`}

                            style={{ display: 'none' }}
                        >

                        </p>
                    </> : <>
                    </>}
                    {/* cũ */}
                    {/* {options.map(option => (
                        <p
                            key={option.id}
                            className={`ui floating message options
         ${myAnswer === option ? "selected" : null}
         `}
                            onClick={() => this.checkAnswer(option)}
                        >
                            {option}
                        </p>
                    ))} */}
                    {/* mới */}
                    {image && <> <p
                        className={`ui floating message options border`}

                    >

                        <p className='text-center'><img className='' src={`${image}`}></img></p>
                    </p></>}

                    {currentQuestion >= 0 ?
                        <>
                            <p
                                className={`ui floating message options  border ${myAnswer === option_1 ? "selected-process" : null}`}
                                onClick={() => this.checkAnswer(option_1)}
                            >
                                A.{' '}{option_1}
                            </p>
                            <p

                                className={`ui floating message options border ${myAnswer === option_2 ? "selected-process" : null}`}
                                onClick={() => this.checkAnswer(option_2)}
                            >
                                B.{' '}{option_2}
                            </p>
                            <p

                                className={`ui floating message options border ${myAnswer === option_3 ? "selected-process" : null}`}
                                onClick={() => this.checkAnswer(option_3)}
                            >
                                C.{' '}{option_3}
                            </p>
                            {option_4 === '' ? <>

                            </> :
                                <>
                                    <p

                                        className={`ui floating message options border ${myAnswer === option_4 ? "selected-process" : null}`}
                                        onClick={() => this.checkAnswer(option_4)}
                                    >
                                        D.{' '}{option_4}
                                    </p>
                                </>
                            }
                        </>
                        :
                        <>
                        </>}



                    {/* cũ */}
                    {/* {currentQuestion < quizData.length - 1 && (
                        <button
                            className="ui inverted button"
                            disabled={this.state.disabled}
                            onClick={this.nextQuestionHandler}
                        >
                            Next
                        </button>
                    )} */}
                    {/* // mới */}

                    {currentQuestion < this.props.data.length - 1 && currentQuestion >= 0 && (
                        <>
                            <button
                                className="ui inverted button"
                                // disabled={this.state.disabled}
                                onClick={this.nextQuestionHandler}
                            >
                                Tiếp Tục
                            </button>
                        </>



                    )}
                    {currentQuestion === -1 && (
                        <>
                            <button
                                className="ui inverted button"
                                // disabled={this.state.disabled}
                                onClick={this.nextQuestionHandler}
                            >
                                Bắt Đầu
                            </button>
                        </>



                    )}

                    {/* // cũ */}
                    {/* //adding a finish button */}
                    {/* {currentQuestion === quizData.length - 1 && (
                        <button className="ui inverted button" onClick={this.finishHandler}>
                            Finish
                        </button>
                    )} */}


                    {/* mới */}
                    {currentQuestion === this.props.data.length - 1 && (
                        <button className="ui inverted button" onClick={this.finishHandler}>
                            Kết Thúc Và Xem Kết Quả
                        </button>
                    )}

                    {/* Xem kết quả liền lun */}
                    {/* <button className="btn btn-primary" onClick={this.finishHandlera}>
                        Kết Thúc Và Xem Kết Quả
                    </button> */}
                </div>
            );
        }
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
export default connect(mapStateToProps, mapDispatchToProps)(ProcessPartOne);
