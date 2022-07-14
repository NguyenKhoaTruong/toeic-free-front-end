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
    getAllQuizReading,
    getAllListenExercise,
    getAllExamResultByUser
} from '../../services/userService';
import ProcessPartOne from './ProcessPartOne';
class DetailStudyListenExerciseFive extends Component {
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
        await this.getAllQuizReading();
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
    getAllQuizReading = async () => {
        try {
            let response = await getAllQuizReading('PART 5');
            if (response && response.errCode === 0) {
                this.setState({
                    arrPartOne: response.quizReadings.reverse(),
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
        this.props.history.push('/tu-vung/11/Từ%20Vựng%20Part%205/PART%205')
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
    handleShowStudy = (dataId) => {
        console.log('check data id', dataId);
        this.props.history.push(`/luyen-thi-part-5/${dataId}`)
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
                if (item.id && item.part === 'PART 5') {
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
                <div className='content-part-five'>
                    <div className="row" style={{ marginRight: '15px' }}>
                        <div className="col-2"> <div className='border left-tet ml-3' data-tut="reactour__listtablecontent">
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
                                            {item.part === 'PART 5' && <div className='study-test-one border' onClick={() => this.handleShowStudy(item.id)} data-tut="reactour__option_5">
                                                <p><Icon.Hurricane size={40} color="white" style={{ background: "" }} className=" mr-1" /> Luyện</p>
                                            </div>}

                                        </>
                                    )
                                })}
                                <div className='score-exam-result-study-test-one border'>
                                    {maxScoreListening ? <p> Thành Tích:{' '}{maxScoreListening}</p> : <p> Thành Tích:{' '}{'Chưa có điểm'}</p>}
                                </div>
                            </div>
                        </div></div>
                        <div className="col-10">
                            <div className='background-testonline'>
                                <div className='content-testonline border' >
                                    <div className='list-exam-test ' style={{ border: '1px solid #e9ecef', marginTop: '20px', height: '1550px' }}>
                                        <div >
                                            <ProcessPartOne data={arrPartOne} Iddata={dataId} dataPart={dataPart} />
                                        </div>
                                    </div>

                                </div>
                            </div>
                            {/* {showList && <DetailStudyListenExerciseFive />} */}
                            {/* {showStudy &&
                                    <>
                                        <div className='background-testonline' style={{ height: '550px', marginTop: '12px', textAlign: 'center' }}>
                                            <div className='content-testonline ' style={{ width: '100%' }}  >
                                                <h1 className='title-list-exam-test'>Danh sách đề luyện thi</h1>
                                                <div className='list-exam-test'>
                                                    {arrReadExercise && arrReadExercise.length > 0 && arrReadExercise.map((item, index) => {
                                                        return (
                                                            <>
                                                                {item && item.part === 'PART 5' && <div className='exam-test' key={index} onClick={() => this.handleDetailListenExercise()}>
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
                                    <div className='border ml-3 mr-3 content-study-for-test-five' data-tut="reactour__content" >
                                        <span className='title-content' id='study-test-one'>1. SƠ LƯỢC VỀ PART 5</span>
                                        <p className='title-content' >1. Cấu trúc bài thi</p>
                                        <p className='title-content'>Part 5 là phần đầu tiên trong bài TOEIC Reading, đây là phần có số lượng câu hỏi lớn chiếm 40 câu, kéo dài từ câu 101 đến 140.</p>
                                        <p className='content-title'>Trên thực tế, trong Part 5 này, sẽ có khoảng 11-13 câu hỏi về từ vựng, 12-13 câu hỏi về từ loại và 14-16 câu hỏi xoay quanh các chủ đề khác nhau. Đòi hỏi thí sinh phải nắm vững nhiều mảng kiến thức về từ vựng, các thì, từ nối, loại từ, mệnh đề quan hệ,…mới có thể vượt qua phần này.</p>
                                        <p className='title-content'>Nhận xét chung:
                                        </p>
                                        <p className='content-title' id='study-test-two'>Ngữ pháp: chiếm 10% trong cấu trúc part 5 toeic mới, chủ yếu xuất hiện nhiều ở phần thì và mệnh đề quan hệ.</p>
                                        <p className='content-title'>Từ vựng: chiếm 90%, chủ yếu là phần từ loại và các câu cần dịch nghĩa. (hơn 1 nửa)</p>
                                        <p className='title-content'>2. Các dạng bài trong part 5</p>
                                        <p className='title-content'>Khi làm bài TOEIC Part 5, các bạn sẽ gặp những loại câu hỏi liên quan đến:</p>
                                        <p className='content-title'>Loại 1: Meaning (Nghĩa của từ)</p>
                                        <p className='content-title'>Loại 2: Preposition (Giới từ)</p>
                                        <p className='content-title'>Loại 3: Word form (Từ loại)</p>
                                        <p className='content-title'>Loại 4: Connecting word and Adverb-clause (Từ nối và Mệnh đề trạng ngữ)</p>
                                        <p className='content-title' id='study-test-three'>Loại 5: Relative Pronoun (Đại từ quan hệ)</p>
                                        <p className='content-title'>Loại 6: Pronoun /  Reflexive / Possessive adjectives (Đại từ, đại từ phản thân, tính từ sở hữu)</p>
                                        <p className='title-content'>3. Cách phân bổ thời gian làm bài</p>
                                        <p className='content-title'>Với những câu hỏi ngắn và không yêu cầu tổng hợp thông tin thì Part 5 được đánh giá là “dễ nhai” hơn Part 7 rất nhiều. Vì vậy để làm tốt phần này, các bạn không chỉ cần nắm vững ngữ pháp và từ vựng, mà quan trọng hơn phải biết phân bổ thời gian làm bài hợp lý để không mất quá nhiều thời gian.</p>
                                        <p className='content-title'>Thời gian cho cả hai part 5 và 6 là tối đa là 12 phút cho 52 câu, mỗi câu sẽ có tối đa 30s để khoanh đáp án. Bạn nên phân bổ thời gian như sau</p>
                                        <p className='content-title'>10s/ câu đối với các câu siêu siêu dễ: Các bạn đừng mất nhiều thời gian để suy nghĩ những câu này, chỉ cần nắm rõ những điểm sau là nhìn vào ra ngay đáp án:</p>
                                        <p className='content-title'>30s/ câu với các câu khó hơn: Sau khi xử lý xong những câu dễ, các bạn trở lại chiến đấu với những câu khó.</p>
                                        <p className='content-title' ư>CÂU NÀO KHÓ QUÁ HÃY BỎ QUA!: Bỏ qua ở đây không có nghĩa là bạn bỏ hẳn câu đó mà hãy dựa vào phán đoán của bạn lại đáp án quá sai trước tiên rồi chọn đại một đáp án bạn cho là chính xác nhất. Nếu chắc chắn không thể làm được câu đó, việc bạn dừng lại quá lâu sẽ làm mất thời gian dành cho các câu khác dễ hơn.</p>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailStudyListenExerciseFive));
