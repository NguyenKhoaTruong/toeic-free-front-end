import React, { Component } from 'react';
import './TestOnline.scss';
import Nav from '../../routes/Nav';
import Footer from '../../routes/Footer';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
    getDetailListenExercise,
    getAllQuizListening,
    getAllListenExercise,

    getAllExamResultByUser
} from '../../services/userService';
import Tour from "reactour";
import ProcessPartOne from './ProcessPartOne';
import * as Icon from 'react-bootstrap-icons';
class DetailStudyListenExerciseTwo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailListenExercise: [],
            arrPartOne: [],
            showTipStudy: false,
            showStudy: false,
            arrReadExercise: [],
            showList: false,
            arrResultTest: [],
            isTourOpen: false,
        }


    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let res = await getDetailListenExercise(id);
            console.log(' check res', res)
            if (res && res.infor.errCode === 0) {
                this.setState({
                    detailListenExercise: res.infor.data
                })
            }
        }
        await this.getAllQuizListening();
        await this.getAllExamResultByUsers();
        await this.getAllListenExercise();
    }
    getAllListenExercise = async () => {
        try {
            let response = await getAllListenExercise('ALL');
            console.log('get listen exercise from node js:')
            // toast.success("get all listen exercise sucssedd");
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
    getAllExamResultByUsers = async () => {
        try {
            let response = await getAllExamResultByUser(this.props.userInfo.id);
            if (response && response.errCode === 0) {
                this.setState({
                    arrResultTest: response.examResultTestUser,
                });

            }
            console.log('get quiz part1 from node js:', response)
        } catch (e) {
            console.log(e)
        }

    }
    getAllQuizListening = async () => {
        try {
            let response = await getAllQuizListening('PART 2');
            if (response && response.errCode === 0) {
                this.setState({
                    arrPartOne: response.quizListenings.reverse(),

                });

            }
            console.log('get quiz part1 from node js:', response)
        } catch (e) {
            console.log(e)
        }

    }
    componentDidUpdate(prevProps, prevState, snapshot) {

    }
    closeTour = () => {
        this.setState({ isTourOpen: false });
    };

    openTour = () => {
        this.setState({ isTourOpen: true });
    };
    openLuyenThi = () => {
        this.setState({
            showluyenthi: true,
        });
    };
    openLuyenThi1 = () => {

        let showluyenthi1 = true;

    };
    handleShowVocabulary = () => {
        this.props.history.push('/tu-vung/8/Từ%20Vựng%20Part%202/PART%202')
    }
    handleShowGrammar = () => {
        this.props.history.push('/nguphap')
    }
    handleShowGuiDe = () => {
        this.setState({ isTourOpen: true });
    }
    handleShowTip = () => {
        this.setState({
            showTipStudy: true,
            showStudy: false
        })
    }
    // handleShowStudy = () => {
    //     this.setState({
    //         // showStudy: true,
    //         showList: true,
    //         showTipStudy: false
    //     })
    // }
    handleShowStudy = (dataId) => {
        console.log('check data id', dataId);
        this.props.history.push(`/luyen-thi-part-2/${dataId}`)
    }
    handleDetailListenExercise = () => {
        this.setState({
            showList: true,
            showStudy: false
        })
    }
    render() {
        const accentColor = "#5cb7b7";
        let { detailListenExercise, arrPartOne, showTipStudy, showStudy, arrReadExercise, showList, arrResultTest, isTourOpen
        } = this.state;
        let listenId = '';
        {
            arrReadExercise && arrReadExercise.length > 0 && arrReadExercise.map((item, index) => {
                if (item.id && item.part === 'PART 2') {
                    listenId = item.id
                }

            })
        }
        console.log('check listen id', listenId)

        let maxScoreListening = '';
        {
            arrResultTest && arrResultTest.length > 0 && arrResultTest.map((item, index) => {

                if (item.id && item.userid === this.props.userInfo.id && item.listenid === listenId) {
                    maxScoreListening = Math.max(item.score)
                }
            })
        }
        let dataPart = ''
        {
            detailListenExercise && detailListenExercise && detailListenExercise.map((item, index) => {
                if (item.part) {
                    dataPart = item.part

                }

            })
        }
        let dataId = this.props.match.params.id;
        console.log('check arrPartOne exam test', arrPartOne)
        console.log('check ', this.state)
        console.log('check params', this.props.match.params.id)
        return (
            <div>
                <Nav />
                <Tour
                    onRequestClose={this.closeTour}
                    steps={tourConfig}
                    isOpen={isTourOpen}
                    maskClassName="mask"
                    className="helper"
                    rounded={5}
                    accentColor={accentColor}
                    onAfterOpen={this.disableBody}
                    onBeforeClose={this.enableBody}
                />
                <div className='content-part-two'>
                    <div className="row" style={{ marginRight: '15px' }}>
                        <div className="col-2">
                            <div className='border left-tet ml-3' >
                                <div className='option-study-for-test' data-tut="reactour__listtablecontent">
                                    <div className='vocabulary-study-test-one border' onClick={this.handleShowVocabulary} data-tut="reactour__option_1">
                                        <p><Icon.Translate size={40} color="white" style={{ background: "" }} className=" mr-1" /> Từ Vựng</p>

                                    </div>
                                    <div className='grammar-study-test-one border' onClick={this.handleShowGrammar} data-tut="reactour__option_2">
                                        <p><Icon.Spellcheck size={40} color="white" style={{ background: "" }} className=" mr-1" /> Ngữ Pháp</p>

                                    </div>
                                    <div className='tip-study-test-one border' onClick={this.handleShowTip} data-tut="reactour__option_3">
                                        <p><Icon.Calendar2Range size={40} color="white" style={{ background: "" }} className=" mr-1" /> Mẹo Thi</p>
                                    </div>
                                    <div className='guide-study-test-one border' onClick={this.handleShowGuiDe} data-tut="reactour__option_4">
                                        <p><Icon.QuestionCircle size={40} color="white" style={{ background: "" }} className=" mr-1" /> Hướng Dẫn</p>
                                    </div>
                                    <div className='study-test-one border' onClick={this.handleShowStudy} data-tut="reactour__option_5">
                                        <p><Icon.Hurricane size={40} color="white" style={{ background: "" }} className=" mr-1" /> Luyện</p>
                                    </div>
                                    <div className='score-exam-result-study-test-one border'>
                                        {maxScoreListening ? <p> Thành Tích:{' '}{maxScoreListening}</p> : <p> Thành Tích:{' '}{'Chưa có điểm'}</p>}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-10">
                            <div className='background-testonline'>
                                <div className='content-testonline border' >
                                    <div className='list-exam-test' style={{ border: '1px solid #e9ecef', marginTop: '20px', height: '1550px' }}>
                                        <div >
                                            <ProcessPartOne data={arrPartOne} Iddata={dataId} dataPart={dataPart} />
                                        </div>
                                    </div>

                                </div>
                            </div>
                            {showTipStudy &&
                                <>
                                    <div data-tut="reactour__content" className='conttent-study-for-test-two border' >
                                        <span className='title-content'> I. SƠ LƯỢC VỀ TOEIC PART 2</span>
                                        <p className='title-content'>1. Cấu trúc bài thi TOEIC listening Part 2</p>
                                        <p className='content-title' id='study-for-test-two'>
                                            TOEIC Listening Part 2 sẽ gồm 30 câu (đề mới 25 câu). Mỗi câu có 1 câu hỏi và 3 lựa chọn đáp án. Nhiệm vụ là phải chọn ra câu trả lời tương thích với câu hỏi trong bài.
                                        </p>
                                        <p className='content-title' > Trong part 2 câu hỏi và câu trả lời không in trong đề thi. Các bạn chỉ được nghe một câu hỏi và 3 lựa chọn trả lời cho từng câu hỏi sau đó chọn câu trả lời phù hợp với câu hỏi.</p>
                                        <p className='title-content'>2. Cách phân bổ thời gian làm bài</p>
                                        <p className='content-title' >Với TOEIC Part 2 gồm 30 câu hỏi, khi bước vào từng câu hỏi bạn sẽ:</p>

                                        <p className='content-title' >✓ Bước 1: Nghe một câu hỏi hoặc một câu nói</p>
                                        <p className='content-title'>✓ Bước 1: Nghe một câu hỏi hoặc một câu nói</p>
                                        <p className='content-title' id='stduy-for-test-three'>✓ Bước 3: Chọn một câu hồi đáp phù hợp nhất cho câu hỏi</p>
                                        <p className='content-title'>✓ Bước 4: Dùng 5s nghỉ giữa 2 câu để chuẩn bị cho câu tiếp theo</p>

                                        <p className='content-title' >Bạn sẽ phải cố gắng nhớ cả câu hỏi lẫn 3 lựa chọn nên có trí nhớ ngắn hạn tốt là 1 lợi thế. Câu nào bạn không nghe được nên bỏ qua để chuẩn bị tốt cho câu tiếp theo.</p>
                                        <p className='title-content'>3. Các dạng câu hỏi sẽ gặp</p>
                                        <p className='content-title' >Trong bài thi TOEIC Listening Part 2 thường xuất hiện các dạng câu hỏi sau đây:</p>
                                        <p className='content-title'>Wh-question (câu hỏi Wh): là dạng câu hỏi có "từ hỏi" như Where, When, Who, How, Why.
                                            Ví dụ: Who has the copy of the report? (Ai đang có bản sao của báo cáo vậy?)</p>
                                        <p className='content-title' >Where can I buy a new desk? (Tôi có thể mua chiếc ghế mới ở đâu?)</p>
                                        <p className='content-title'>Yes/ No question (câu hỏi Yes/No): là dạng câu hỏi mà người nghe có thể trả lời Yes hoặc là No.
                                            Ví dụ: Haven't you had lunch? (Bạn chưa ăn trưa à?)</p>
                                        <p className='content-title' >No, I didn't have time. (Không, tôi không có thời gian)</p>
                                        <p className='content-title'>Tag question (câu hỏi đuôi): là dạng câu hỏi có đoạn đầu giống câu khẳng định nhưng cuối câu thì hỏi thêm "phải không?".</p>
                                        <i className='content-title'>Ví dụ: The report is hard to understand, isn't it? (Báo cáo thật khó hiểu phải không?)</i>
                                        <p className='content-title' >Yes, ít's very confusing. (Đúng vậy, nó rất khó hiểu)</p>
                                        <p className='content-title'>Suggestion/ request (gợi ý/ yêu cầu): là dạng câu hỏi gợi ý/yêu cầu làm một việc gì đó.
                                            Ví dụ: Would you like to walk to the convention center? (Bạn có muốn đi bộ đến trung tâm hội nghị?)</p>
                                        <p className='content-title' >Thats sounds like a great idea. (Đó có vẻ là một ý tưởng tuyệt vời.)</p>
                                        <p className='content-title'>Statement (câu trần thuật): là dạng câu đưa ra ý kiến, câu trả lời thường cũng đưa ra quan điểm: đồng tình/ phản đối hoặc trung lập</p>
                                        <i className='content-title'>Ví dụ: The neighbors upstairs are so noisy. (Hàng xóm trên lầu thật ồn ào.)</i>
                                        <p className='content-title' >Yes, they certainly are. (Vâng, họ chắc chắn như vậy)</p>
                                        <p className='content-title'>Choice question (câu hỏi lựa chọn): là dạng câu hỏi thường có “or” xuất hiện.
                                        </p>
                                        <i className='content-title'> Ví dụ: Would you like the table inside or outside? (Bạn muốn lấy cái bàn bên trong hay bên ngoài?)</i>
                                        <p className='content-title' >I'll take the table inside. (Tôi sẽ lấy cái bàn bên trong)</p>
                                    </div>
                                </>
                            }


                            <div >

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
        selector: '[data-tut="reactour__content"]',
        content: `Xem nội dung luyện thi, hướng dẫn làm bài thi và các mẹo khi đi thi.`
    },
    {
        selector: '[data-tut="reactour__listtablecontent"]',
        content: ` Xem các chức năng phù hợp với bản thân để tiến hành luyện thi.`
    },
    {
        selector: '[data-tut="reactour__option_1"]',
        content: ` Tại đây bạn có thể xem từ từng tham khảo phần thi Part 2.`
    },
    {
        selector: '[data-tut="reactour__option_2"]',
        content: ` Tại đây bạn có thể xem ngữ pháp tham khảo phần thi Part 2.`
    },
    {
        selector: '[data-tut="reactour__option_3"]',
        content: ` Tại đây bạn có thể xem  mẹo thi tham khảo phần thi Part 2.`
    },
    {
        selector: '[data-tut="reactour__option_4"]',
        content: ` Tại đây bạn có thể xem  hướng dẫn tham khảo phần thi Part 2.`
    },
    {
        selector: '[data-tut="reactour__option_5"]',
        content: ` Tại đây bạn có thể luyện thi phần thi Part 2.`
    },
    {
        selector: '[data-tut="reactour__end"]',
        content: `Hướng dẫn hoàn tất`
    },


];
const mapStateToProps = state => {
    return {

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailStudyListenExerciseTwo));
