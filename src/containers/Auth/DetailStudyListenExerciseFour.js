import React, { Component } from 'react';
import './TestOnline.scss';
import Nav from '../../routes/Nav';
import Footer from '../../routes/Footer';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as Icon from 'react-bootstrap-icons';
import Tour from "reactour";
import {
    getDetailListenExercise,
    getAllQuizListening,
    getAllListenExercise,

    getAllExamResultByUser
} from '../../services/userService';
import ProcessPartOne from './ProcessPartOne';
class DetailStudyListenExerciseFour extends Component {
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
            let response = await getAllQuizListening('PART 4');
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
        this.props.history.push('/tu-vung/10/Từ%20Vựng%20Part%204/PART%204')
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
        this.props.history.push(`/luyen-thi-part-4/${dataId}`)
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
        console.log('check detai exam test', detailListenExercise)
        console.log('check ', this.state)
        console.log('check params', this.props.match.params.id)
        let listenId = '';
        {
            arrReadExercise && arrReadExercise.length > 0 && arrReadExercise.map((item, index) => {
                if (item.id && item.part === 'PART 4') {
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
        console.log('check data part  asdasdasd', dataPart)
        let dataId = this.props.match.params.id;
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
                <div className='content-part-four'>
                    <div className="row" style={{ marginRight: '15px' }}>
                        <div className="col-2"><div className='border left-tet ml-3' style={{ width: '-webkit-fill-available', cursor: 'pointer' }} data-tut="reactour__listtablecontent">
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

                                {arrReadExercise && arrReadExercise.length > 0 && arrReadExercise.map((item, index) => {
                                    return (
                                        <>
                                            {item.part === 'PART 4' && <div className='study-test-one border' onClick={() => this.handleShowStudy(item.id)} data-tut="reactour__option_5">
                                                <p><Icon.Hurricane size={40} color="white" style={{ background: "" }} className=" mr-1" /> Luyện</p>
                                            </div>}

                                        </>
                                    )
                                })}
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
                            {/* {showList && <DetailStudyListenExerciseFour />} */}
                            {/* {showStudy && <>
                                    <div className='background-testonline' style={{ height: '550px', marginTop: '12px', textAlign: 'center' }} >
                                        <div className='content-testonline ' style={{ width: '100%' }}>
                                            <h1 className='title-list-exam-test'>Danh sách đề luyện thi</h1>
                                            <div className='list-exam-test'>
                                                {arrReadExercise && arrReadExercise.length > 0 && arrReadExercise.map((item, index) => {
                                                    return (
                                                        <>
                                                            {item && item.part === 'PART 4' && <div className='exam-test' key={index} onClick={() => this.handleDetailListenExercise()}>
                                                                <p className='exam-text-info'>{item.name_listening}{'        '}{item.part} {'    '}{item.test_year}</p>
                                                            </div>}
                                                        </>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </>} */}
                            {showTipStudy &&
                                <>
                                    <div className='border ml-3 mr-3 content-study-for-test-four' data-tut="reactour__content" >
                                        <span className='title-content' id='study-test-one'>I. SƠ LƯỢC VỀ TOEIC PART 4</span>
                                        <p className='content-title'>1. Cấu trúc bài thi</p>
                                        <p className='title-content' >Phần nghe của TOEIC Part 4 chia làm 30 câu hỏi, tương đương với 10 bài nói. Đặc điểm của bài nói này là chỉ có một người nói, một giọng đọc xuyên suốt và thường liên quan đến các chủ đề quen thuộc trong đời sống hằng ngày nên rất dễ để nghe và xác định đáp án đúng</p>
                                        <p className='content-title' >Với cấu trúc đề thi TOEIC mới được áp dụng từ ngày 01/06/2019 tới đây, Part 4 sẽ xuất hiện dạng bài người thi phải kết hợp thông tin nghe với biểu đồ, hình ảnh được cho sẵn để trả lời.</p>
                                        <p className='content-title'>Bạn nên xem chi tiết những thay đổi trong bài thi TOEIC format mới 2019 TẠI ĐÂY.</p>
                                        <p className='title-content'> 2. Cách phân bổ thời gian làm bài</p>
                                        <p className='content-title'>Bắt đầu bài thi TOEIC part 4, các bạn sẽ được nghe phần hướng dẫn trong 30 giây trước khi vào bài nghe.</p>
                                        <p className='content-title' id='study-test-three'>Sau khi nghe hết bài nói, bạn sẽ nghe 3 câu hỏi liên quan đến đoạn đối thoại đó. Thời gian đọc câu hỏi là 1 giây, thời gian ngắt quãng giữa các câu hỏi là 8 giây.</p>
                                        <p className='content-title'>Vậy khi nghe đọc đến câu hỏi thứ 3, các bạn phải nhanh chóng giải quyết hết các câu hỏi và dùng khoảng thời gian còn lại để đọc đoạn tiếp theo.</p>
                                        <p className='content-title'>Bạn không nên giành quá nhiều thời gian cho một câu hỏi do khó có thể nhớ hết thông tin trong đoạn đối thoại đã qua. Hãy tập trung làm quen với việc phân bố thời gian sao cho khi nghe xong câu hỏi thứ 3 bạn đã bắt đầu đọc đến đoạn đối thoại tiếp theo.</p>
                                        <p className='title-content'>3. Các topic thường xuất hiện</p>
                                        <p className='content-title'>Một đoạn hội thoại trong Part 4 luôn theo cấu trúc: Thông tin chung về bài nói - Chi tiết bài nói - Hành động tiếp theo</p>
                                        <p className='content-title'>Bởi thế, trong mỗi đoạn, sẽ có ba câu hỏi nhỏ tương đương với các nội dung: Hỏi các thông tin bao quát, Hỏi các thông tin chi tiết và Câu hỏi suy luận, kèm theo đó là câu hỏi với 4 đáp án A, B, C, D tương ứng để cho bạn lựa chọn. Đặc biệt là, câu hỏi ở phần 4 không tuân theo trình tự thời gian.</p>
                                        <p className='content-title'>▶ Dạng câu hỏi về thông tin chung</p>
                                        <p className='content-title'>Bạn sẽ nghe được đáp án của kiểu câu hỏi này ngay trong phần đầu của đoạn hội thoại. Các câu hỏi thường gặp của phần này là:</p>
                                        <p className='content-title'><i>What is the main purpose of speech? (Mục đích chính của bài nói là gì?) </i></p>
                                        <p className='content-title'><i>What is the purpose of report? (Mục đích của bài báo cáo là gì?)</i></p>
                                        <p className='content-title'><i>Who is most likely the speaker? (Người nói có thể là ai?)</i></p>
                                        <p className='content-title'><i>Who is the speech aimed at?(Bài nói hướng tới ai?))</i></p>
                                        <p className='content-title'><i>Where is speaker now? (Người nói đang ở đâu?)</i></p>
                                        <p className='content-title'>Đối với câu hỏi về mục đích/chủ đề bài nói, đáp án cho câu hỏi này thường xuất hiện trong 2 câu đầu tiên. Còn với các câu hỏi về nhân vật, địa điểm thì cần suy luận và nghe các từ vựng liên quan.</p>
                                        <p className='content-title'>▶ Dạng câu hỏi chi tiết</p>
                                        <p className='content-title'>Câu hỏi dạng này sẽ hỏi sâu hơn về chủ đề của đoạn hội thoại và các nội dung được nói đến. Bởi thế, không có một mẫu câu hỏi cụ thể cho dạng này mà luôn biến hóa khôn lường. Câu hỏi có thể hỏi về thời gian, địa điểm, đối tượng, hay các chi tiết cụ thể khác như: </p>
                                        <p className='content-title'><i>How many years of experience does Mr. Hegay have in his field of work? (Mr Hegay có bao nhiêu năm kinh nghiệm làm việc trong lĩnh vực của ông ấy?)</i></p>
                                        <p className='content-title'><i>When will the boss leave for his vacation? (Khi nào vị sếp sẽ đi nghỉ?)</i></p>
                                        <p className='content-title'><i>How often do the listeners meet? (Người nghe thường gặp nhau mấy lần?)</i></p>
                                        <p className='content-title'>Bạn cần lắng nghe kĩ hội thoại để nắm bắt được từ để hỏi và từ khóa để có thể trả lời được những câu hỏi này.</p>
                                        <p className='content-title'>▶ Dạng câu hỏi suy luận</p>
                                        <p className='content-title'>Câu hỏi về hành động sắp tới thường được nhắc tới ở cuối bài nói và thường hỏi về người nghe/người nói sẽ làm gì tiếp theo.Câu hỏi này có thể mang tính quy luận hoặc được đề cập trực tiếp trong bài nói. </p>
                                        <p className='content-title'><i>What does speaker suggest? (Người nói khuyên điều gì?)</i></p>
                                        <p className='content-title'><i>What does the speaker advise the audience to do? (Người nói khuyên người nghe làm gì?)</i></p>
                                        <p className='content-title' >Để làm tốt phần này, bạn cần lắng nghe kĩ những câu cuối cùng của bài nói với những từ khóa mang tính gợi ý, đề nghị, yêu cầu...    </p>
                                        <p className='content-title'  >Như vậy trong phần này có tổng cộng 30 câu. Tương tự với Part 3, bạn khó lòng dùng mẹo để tìm ra được đáp án cho phần nghe này. Đây chính là một điểm khó đối với những bạn có kỹ năng nghe yếu cũng như phân tích các thông tin nghe được. Bên cạnh đó, yếu tố giọng đọc, tốc độ đọc, ngữ điệu cũng sẽ ít nhiều làm khó thí sinh nếu như không có nền tảng vững vàng.</p>


                                    </div>
                                </>
                            }

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailStudyListenExerciseFour));
