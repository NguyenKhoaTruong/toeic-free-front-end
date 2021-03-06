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
        this.props.history.push('/tu-vung/8/T???%20V???ng%20Part%202/PART%202')
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
                                        <p><Icon.Translate size={40} color="white" style={{ background: "" }} className=" mr-1" /> T??? V???ng</p>

                                    </div>
                                    <div className='grammar-study-test-one border' onClick={this.handleShowGrammar} data-tut="reactour__option_2">
                                        <p><Icon.Spellcheck size={40} color="white" style={{ background: "" }} className=" mr-1" /> Ng??? Ph??p</p>

                                    </div>
                                    <div className='tip-study-test-one border' onClick={this.handleShowTip} data-tut="reactour__option_3">
                                        <p><Icon.Calendar2Range size={40} color="white" style={{ background: "" }} className=" mr-1" /> M???o Thi</p>
                                    </div>
                                    <div className='guide-study-test-one border' onClick={this.handleShowGuiDe} data-tut="reactour__option_4">
                                        <p><Icon.QuestionCircle size={40} color="white" style={{ background: "" }} className=" mr-1" /> H?????ng D???n</p>
                                    </div>
                                    <div className='study-test-one border' onClick={this.handleShowStudy} data-tut="reactour__option_5">
                                        <p><Icon.Hurricane size={40} color="white" style={{ background: "" }} className=" mr-1" /> Luy???n</p>
                                    </div>
                                    <div className='score-exam-result-study-test-one border'>
                                        {maxScoreListening ? <p> Th??nh T??ch:{' '}{maxScoreListening}</p> : <p> Th??nh T??ch:{' '}{'Ch??a c?? ??i???m'}</p>}
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
                                        <span className='title-content'> I. S?? L?????C V??? TOEIC PART 2</span>
                                        <p className='title-content'>1. C???u tr??c b??i thi TOEIC listening Part 2</p>
                                        <p className='content-title' id='study-for-test-two'>
                                            TOEIC Listening Part 2 s??? g???m 30 c??u (????? m???i 25 c??u). M???i c??u c?? 1 c??u h???i v?? 3 l???a ch???n ????p ??n. Nhi???m v??? l?? ph???i ch???n ra c??u tr??? l???i t????ng th??ch v???i c??u h???i trong b??i.
                                        </p>
                                        <p className='content-title' > Trong part 2 c??u h???i v?? c??u tr??? l???i kh??ng in trong ????? thi. C??c b???n ch??? ???????c nghe m???t c??u h???i v?? 3 l???a ch???n tr??? l???i cho t???ng c??u h???i sau ???? ch???n c??u tr??? l???i ph?? h???p v???i c??u h???i.</p>
                                        <p className='title-content'>2. C??ch ph??n b??? th???i gian l??m b??i</p>
                                        <p className='content-title' >V???i TOEIC Part 2 g???m 30 c??u h???i, khi b?????c v??o t???ng c??u h???i b???n s???:</p>

                                        <p className='content-title' >??? B?????c 1: Nghe m???t c??u h???i ho???c m???t c??u n??i</p>
                                        <p className='content-title'>??? B?????c 1: Nghe m???t c??u h???i ho???c m???t c??u n??i</p>
                                        <p className='content-title' id='stduy-for-test-three'>??? B?????c 3: Ch???n m???t c??u h???i ????p ph?? h???p nh???t cho c??u h???i</p>
                                        <p className='content-title'>??? B?????c 4: D??ng 5s ngh??? gi???a 2 c??u ????? chu???n b??? cho c??u ti???p theo</p>

                                        <p className='content-title' >B???n s??? ph???i c??? g???ng nh??? c??? c??u h???i l???n 3 l???a ch???n n??n c?? tr?? nh??? ng???n h???n t???t l?? 1 l???i th???. C??u n??o b???n kh??ng nghe ???????c n??n b??? qua ????? chu???n b??? t???t cho c??u ti???p theo.</p>
                                        <p className='title-content'>3. C??c d???ng c??u h???i s??? g???p</p>
                                        <p className='content-title' >Trong b??i thi TOEIC Listening Part 2 th?????ng xu???t hi???n c??c d???ng c??u h???i sau ????y:</p>
                                        <p className='content-title'>Wh-question (c??u h???i Wh): l?? d???ng c??u h???i c?? "t??? h???i" nh?? Where, When, Who, How, Why.
                                            V?? d???: Who has the copy of the report? (Ai ??ang c?? b???n sao c???a b??o c??o v???y?)</p>
                                        <p className='content-title' >Where can I buy a new desk? (T??i c?? th??? mua chi???c gh??? m???i ??? ????u?)</p>
                                        <p className='content-title'>Yes/ No question (c??u h???i Yes/No): l?? d???ng c??u h???i m?? ng?????i nghe c?? th??? tr??? l???i Yes ho???c l?? No.
                                            V?? d???: Haven't you had lunch? (B???n ch??a ??n tr??a ???)</p>
                                        <p className='content-title' >No, I didn't have time. (Kh??ng, t??i kh??ng c?? th???i gian)</p>
                                        <p className='content-title'>Tag question (c??u h???i ??u??i): l?? d???ng c??u h???i c?? ??o???n ?????u gi???ng c??u kh???ng ?????nh nh??ng cu???i c??u th?? h???i th??m "ph???i kh??ng?".</p>
                                        <i className='content-title'>V?? d???: The report is hard to understand, isn't it? (B??o c??o th???t kh?? hi???u ph???i kh??ng?)</i>
                                        <p className='content-title' >Yes, ??t's very confusing. (????ng v???y, n?? r???t kh?? hi???u)</p>
                                        <p className='content-title'>Suggestion/ request (g???i ??/ y??u c???u): l?? d???ng c??u h???i g???i ??/y??u c???u l??m m???t vi???c g?? ????.
                                            V?? d???: Would you like to walk to the convention center? (B???n c?? mu???n ??i b??? ?????n trung t??m h???i ngh????)</p>
                                        <p className='content-title' >Thats sounds like a great idea. (???? c?? v??? l?? m???t ?? t?????ng tuy???t v???i.)</p>
                                        <p className='content-title'>Statement (c??u tr???n thu???t): l?? d???ng c??u ????a ra ?? ki???n, c??u tr??? l???i th?????ng c??ng ????a ra quan ??i???m: ?????ng t??nh/ ph???n ?????i ho???c trung l???p</p>
                                        <i className='content-title'>V?? d???: The neighbors upstairs are so noisy. (H??ng x??m tr??n l???u th???t ???n ??o.)</i>
                                        <p className='content-title' >Yes, they certainly are. (V??ng, h??? ch???c ch???n nh?? v???y)</p>
                                        <p className='content-title'>Choice question (c??u h???i l???a ch???n): l?? d???ng c??u h???i th?????ng c?? ???or??? xu???t hi???n.
                                        </p>
                                        <i className='content-title'> V?? d???: Would you like the table inside or outside? (B???n mu???n l???y c??i b??n b??n trong hay b??n ngo??i?)</i>
                                        <p className='content-title' >I'll take the table inside. (T??i s??? l???y c??i b??n b??n trong)</p>
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
        content: `Xem n???i dung luy???n thi, h?????ng d???n l??m b??i thi v?? c??c m???o khi ??i thi.`
    },
    {
        selector: '[data-tut="reactour__listtablecontent"]',
        content: ` Xem c??c ch???c n??ng ph?? h???p v???i b???n th??n ????? ti???n h??nh luy???n thi.`
    },
    {
        selector: '[data-tut="reactour__option_1"]',
        content: ` T???i ????y b???n c?? th??? xem t??? t???ng tham kh???o ph???n thi Part 2.`
    },
    {
        selector: '[data-tut="reactour__option_2"]',
        content: ` T???i ????y b???n c?? th??? xem ng??? ph??p tham kh???o ph???n thi Part 2.`
    },
    {
        selector: '[data-tut="reactour__option_3"]',
        content: ` T???i ????y b???n c?? th??? xem  m???o thi tham kh???o ph???n thi Part 2.`
    },
    {
        selector: '[data-tut="reactour__option_4"]',
        content: ` T???i ????y b???n c?? th??? xem  h?????ng d???n tham kh???o ph???n thi Part 2.`
    },
    {
        selector: '[data-tut="reactour__option_5"]',
        content: ` T???i ????y b???n c?? th??? luy???n thi ph???n thi Part 2.`
    },
    {
        selector: '[data-tut="reactour__end"]',
        content: `H?????ng d???n ho??n t???t`
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
