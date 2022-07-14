import React, { Component } from 'react';
import Nav from '../../routes/Nav';
import Footer from "../../routes/Footer";
import * as Icon from 'react-bootstrap-icons';
import { connect } from 'react-redux';
import Tour from "reactour";

import {
    getAllListenExercise,
    getAllExamResultByUser
} from '../../services/userService';
import { toast } from 'react-toastify';
import { Link, withRouter } from 'react-router-dom';
import './StudyForTestPart6.scss';
import DetailStudyListenExerciseSix from './DetailStudyListenExerciseSix';
import LoginForm from '../../routes/LoginForm';
class StudyForTestPart6 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isTourOpen: false,
            isShowingMore: false,
            showTipStudy: false,
            showStudy: false,
            arrReadExercise: [],
            showList: false,
            arrResultTest: [],
            showModalLoginExam: true
        }
        // this.getAllQuizListening = this.getAllQuizListening.bind(this);
    }
    async componentDidMount() {

        await this.getAllListenExercise();
        await this.getAllExamResultByUsers();
    }
    getAllListenExercise = async () => {
        try {
            let response = await getAllListenExercise('ALL');
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
    closeTour = () => {
        this.setState({ isTourOpen: false });
    };

    openTour = () => {
        this.setState({ isTourOpen: true });
    };
    handleShowVocabulary = () => {
        this.props.history.push('/tu-vung/12/Từ%20Vựng%20Part%206/PART%206')
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
        this.props.history.push(`/luyen-thi-part-6/${dataId}`)
    }
    handleDetailListenExercise = () => {
        this.setState({
            showList: true
        })
    }
    close = () => {
        this.setState({
            showModalLoginExam: false,

        });
    }
    render() {
        const { isTourOpen, isShowingMore, arrQuizListening, showTipStudy, showStudy, arrReadExercise, showList, arrResultTest, showModalLoginExam
        } = this.state;
        const accentColor = "#5cb7b7";
        let { isLoggedIn, userInfo } = this.props;
        console.log('check arrQuizListening', arrQuizListening)
        let readId = '';
        {
            arrReadExercise && arrReadExercise.length > 0 && arrReadExercise.map((item, index) => {
                if (item.id && item.part === 'PART 6') {
                    readId = item.id
                }

            })
        }
        console.log('check readId id', readId)

        let maxScoreReading = '';
        {
            arrResultTest && arrResultTest.length > 0 && arrResultTest.map((item, index) => {

                if (item.id && item.userid === this.props.userInfo.id && item.readid === readId) {
                    maxScoreReading = Math.max(item.score)
                }


            })
        }
        return (
            <React.Fragment>


                <>
                    {isLoggedIn && userInfo ?
                        <>
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
                            <div className='content-part-six'>
                                <div className="row" style={{ marginRight: '15px' }}>
                                    <div className="col-2">
                                        <div className='border left-tet ml-3' data-tut="reactour__listtablecontent">
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
                                                            {item.part === 'PART 6' && <div className='study-test-one border' onClick={() => this.handleShowStudy(item.id)} data-tut="reactour__option_5">
                                                                <p><Icon.Hurricane size={40} color="white" style={{ background: "" }} className=" mr-1" /> Luyện</p>
                                                            </div>}

                                                        </>
                                                    )
                                                })}
                                                <div className='score-exam-result-study-test-one border'>
                                                    {maxScoreReading ? <p> Thành Tích:{' '}{maxScoreReading}</p> : <p> Thành Tích:{' '}{'Chưa có điểm'}</p>}
                                                </div>
                                            </div>
                                        </div></div>
                                    <div className="col-10">
                                        {/* {showList && <DetailStudyListenExerciseSix />} */}
                                        {/* {showStudy &&
                                    <>
                                        <div className='background-testonline' style={{ height: '550px', marginTop: '12px', textAlign: 'center' }}>
                                            <div className='content-testonline ' style={{ width: '100%' }} >
                                                <h1 className='title-list-exam-test'>Danh sách đề luyện thi</h1>
                                                <div className='list-exam-test'>
                                                    {arrReadExercise && arrReadExercise.length > 0 && arrReadExercise.map((item, index) => {
                                                        return (
                                                            <>
                                                                {item && item.part === 'PART 6' && <div className='exam-test' key={index} onClick={() => this.handleDetailListenExercise()}>
                                                                    <p className='exam-text-info'>{item.name_listening}{'        '}{item.part} {'    '}{item.test_year}</p>
                                                                </div>}
                                                            </>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    </>} */}
                                        {showTipStudy ?
                                            <>
                                                <div className='border ml-3 mr-3 content-study-for-test-six' data-tut="reactour__content"  >
                                                    <span className='title-content' id='study-test-one'>1. SƠ LƯỢC VỀ PART 6</span>
                                                    <p className='title-content'>1. Cấu trúc bài thi</p>
                                                    <p className='content-title'>Đặc điểm của Part 6 là bạn phải điền từ vào đoạn văn. Mỗi đoạn gồm 3 câu hỏi nhỏ với 4 đáp án để lựa chọn khác nhau, bạn cần tìm ra đáp án thích hợp nhất để điền vào chỗ trống còn thiếu và đánh dấu vào phiếu trả lời (A) (B) (C) hay (D). Về cơ bản thì các câu hỏi và cách thức hỏi trong part 6 khá tương tự part 5, nếu bạn đã làm quen với part 5 rồi, thì part 6 sẽ không khiến bạn bị bỡ ngỡ nữa đâu.</p>
                                                    <p className='content-title' id='study-test-two'>Phần thi này cũng nhắm vào kiểm tra kiến thức ngữ pháp và từ vựng căn bản của thí sinh. Tuy nhiên vì gắn vào 1 đoạn văn cụ thể hoàn chỉnh nên thí sinh cần phải dựa theo ngữ cảnh và nội dung của toàn đoạn để chọn ra đáp án đúng.</p>
                                                    <p className='content-title' >Trước đây, số lượng câu về ngữ pháp chiếm tỉ trọng khá lớn trong tổng số câu hỏi trong part. Tuy nhiên theo bộ đề thi TOEIC mới nhất hiện nay thì số lượng câu hỏi từ vựng đã tăng lên đến 70 - 80%.</p>
                                                    <p className='title-content'>2. Các loại hình đoạn văn trong part 6</p>
                                                    <p className='content-title'>Trong part này, bạn cần tìm từ thích hợp để điền vào chỗ trống, nội dung phần này thường bao gồm các loại văn bản như:</p>
                                                    <p className='content-title'><b>- Notices (Thông báo): </b>Cung cấp thông tin về sự kiện sắp diễn ra theo 1 form ngắn.</p>
                                                    <p className='content-title'><b>- Letters (Thư từ): </b>Dạng này thường dễ xuất hiện, thường hay sử dụng trong giao tiếp công việc hoặc giao tiếp bạn bè.</p>
                                                    <p className='content-title'><b>- Instructions (Hướng dẫn): </b>Cung cấp thông tin cách sử dụng sản phẩm hay dịch vụ hoặc các hướng dẫn người khác cơ bản.</p>
                                                    <p className='content-title'><b>- Articles (Bài báo): </b>Các bài báo gồm các bản tin ghi lại các thông tin về tài chính, nghiên cứu hay những bản tin liên quan đến một lĩnh vực cụ thể nào đó.</p>
                                                    <p className='content-title'><b>- Ads (Quảng cáo): </b>Nội dung là đoạn quảng cáo ngắn về một sản phẩm hay một dịch vụ nào đó. Đoạn văn ngắn có thể đề cập tới sản phẩm, thương hiệu, giới thiệu sản phẩm.</p>
                                                    <p className='content-title' id='study-test-three'><b>- E-mail: </b>Các đoạn Email được trích dẫn thường manng nội dung sử dụng trong công ty, dùng để giao tiếp giữa đồng nghiệp, đối tác với nhau.</p>
                                                    <p className='content-title'><b>- Memorandum (Các thông báo nội bộ):</b>Dạng thông báo nội bộ thường sử dụng để gửi đến các nhân viên trong cùng 1 công ty, tổ chức. Thường là cung cấp các thông tin liên quan đến các vấn đề xảy ra trong văn phòng như Thay đổi chính sách, Thông báo quy định mới, Thông báo về việc thăng chức hay giới thiệu nhân viên mới.</p>
                                                    <p className='title-content' >3. Cách phân bổ thời gian làm bài</p>
                                                    <p className='content-title'>Như trong bài viết Phương pháp học TOEIC Part 5, cô đã hướng dẫn cách phân bổ thời gian cho cả hai part 5 và 6 là 12 phút cho 52 câu, mỗi câu sẽ có tối đa 30s để khoanh đáp án. Với Part 6, các bạn sẽ phân bổ thời gian tương tự như part 5:</p>
                                                    <p className='content-title'>10s/ câu đối với các câu siêu siêu dễ: Các bạn đừng mất nhiều thời gian để suy nghĩ những câu này, chỉ cần nắm rõ những điểm sau là nhìn vào ra ngay đáp án:</p>
                                                    <p className='content-title'>30s/ câu với các câu khó hơn: Sau khi xử lý xong những câu dễ, các bạn trở lại chiến đấu với những câu khó. Những câu khó hơn trong phần này thường xoay quanh:</p>
                                                    <p className='content-title'>CÂU NÀO KHÓ QUÁ HÃY BỎ QUA!: Bỏ qua ở đây không có nghĩa là bạn bỏ hẳn câu đó mà hãy dựa vào phán đoán của bạn lại đáp án quá sai trước tiên rồi chọn đại một đáp án bạn cho là chính xác nhất. Nếu chắc chắn không thể làm được câu đó, việc bạn dừng lại quá lâu sẽ làm mất thời gian dành cho các câu khác dễ hơn.</p>
                                                </div>
                                            </>
                                            :
                                            <>
                                                <div className='border ml-3 mr-3 content-study-for-test-six' data-tut="reactour__content"  >
                                                    <span className='title-content' id='study-test-one'>1. SƠ LƯỢC VỀ PART 6</span>
                                                    <p className='title-content'>1. Cấu trúc bài thi</p>
                                                    <p className='content-title'>Đặc điểm của Part 6 là bạn phải điền từ vào đoạn văn. Mỗi đoạn gồm 3 câu hỏi nhỏ với 4 đáp án để lựa chọn khác nhau, bạn cần tìm ra đáp án thích hợp nhất để điền vào chỗ trống còn thiếu và đánh dấu vào phiếu trả lời (A) (B) (C) hay (D). Về cơ bản thì các câu hỏi và cách thức hỏi trong part 6 khá tương tự part 5, nếu bạn đã làm quen với part 5 rồi, thì part 6 sẽ không khiến bạn bị bỡ ngỡ nữa đâu.</p>
                                                    <p className='content-title' id='study-test-two'>Phần thi này cũng nhắm vào kiểm tra kiến thức ngữ pháp và từ vựng căn bản của thí sinh. Tuy nhiên vì gắn vào 1 đoạn văn cụ thể hoàn chỉnh nên thí sinh cần phải dựa theo ngữ cảnh và nội dung của toàn đoạn để chọn ra đáp án đúng.</p>
                                                    <p className='content-title' >Trước đây, số lượng câu về ngữ pháp chiếm tỉ trọng khá lớn trong tổng số câu hỏi trong part. Tuy nhiên theo bộ đề thi TOEIC mới nhất hiện nay thì số lượng câu hỏi từ vựng đã tăng lên đến 70 - 80%.</p>
                                                    <p className='title-content'>2. Các loại hình đoạn văn trong part 6</p>
                                                    <p className='content-title'>Trong part này, bạn cần tìm từ thích hợp để điền vào chỗ trống, nội dung phần này thường bao gồm các loại văn bản như:</p>
                                                    <p className='content-title'><b>- Notices (Thông báo): </b>Cung cấp thông tin về sự kiện sắp diễn ra theo 1 form ngắn.</p>
                                                    <p className='content-title'><b>- Letters (Thư từ): </b>Dạng này thường dễ xuất hiện, thường hay sử dụng trong giao tiếp công việc hoặc giao tiếp bạn bè.</p>
                                                    <p className='content-title'><b>- Instructions (Hướng dẫn): </b>Cung cấp thông tin cách sử dụng sản phẩm hay dịch vụ hoặc các hướng dẫn người khác cơ bản.</p>
                                                    <p className='content-title'><b>- Articles (Bài báo): </b>Các bài báo gồm các bản tin ghi lại các thông tin về tài chính, nghiên cứu hay những bản tin liên quan đến một lĩnh vực cụ thể nào đó.</p>
                                                    <p className='content-title'><b>- Ads (Quảng cáo): </b>Nội dung là đoạn quảng cáo ngắn về một sản phẩm hay một dịch vụ nào đó. Đoạn văn ngắn có thể đề cập tới sản phẩm, thương hiệu, giới thiệu sản phẩm.</p>
                                                    <p className='content-title' id='study-test-three'><b>- E-mail: </b>Các đoạn Email được trích dẫn thường manng nội dung sử dụng trong công ty, dùng để giao tiếp giữa đồng nghiệp, đối tác với nhau.</p>
                                                    <p className='content-title'><b>- Memorandum (Các thông báo nội bộ):</b>Dạng thông báo nội bộ thường sử dụng để gửi đến các nhân viên trong cùng 1 công ty, tổ chức. Thường là cung cấp các thông tin liên quan đến các vấn đề xảy ra trong văn phòng như Thay đổi chính sách, Thông báo quy định mới, Thông báo về việc thăng chức hay giới thiệu nhân viên mới.</p>
                                                    <p className='title-content' >3. Cách phân bổ thời gian làm bài</p>
                                                    <p className='content-title'>Như trong bài viết Phương pháp học TOEIC Part 5, cô đã hướng dẫn cách phân bổ thời gian cho cả hai part 5 và 6 là 12 phút cho 52 câu, mỗi câu sẽ có tối đa 30s để khoanh đáp án. Với Part 6, các bạn sẽ phân bổ thời gian tương tự như part 5:</p>
                                                    <p className='content-title'>10s/ câu đối với các câu siêu siêu dễ: Các bạn đừng mất nhiều thời gian để suy nghĩ những câu này, chỉ cần nắm rõ những điểm sau là nhìn vào ra ngay đáp án:</p>
                                                    <p className='content-title'>30s/ câu với các câu khó hơn: Sau khi xử lý xong những câu dễ, các bạn trở lại chiến đấu với những câu khó. Những câu khó hơn trong phần này thường xoay quanh:</p>
                                                    <p className='content-title'>CÂU NÀO KHÓ QUÁ HÃY BỎ QUA!: Bỏ qua ở đây không có nghĩa là bạn bỏ hẳn câu đó mà hãy dựa vào phán đoán của bạn lại đáp án quá sai trước tiên rồi chọn đại một đáp án bạn cho là chính xác nhất. Nếu chắc chắn không thể làm được câu đó, việc bạn dừng lại quá lâu sẽ làm mất thời gian dành cho các câu khác dễ hơn.</p>
                                                </div>
                                            </>}

                                    </div>
                                </div>
                            </div>


                            <Footer /></> :
                        <>

                            {showModalLoginExam === true ? <LoginForm showModal={showModalLoginExam} onClose={this.close} /> : <> {this.props.history.push('/')}</>}</>}


                </>
            </React.Fragment>


        );
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
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StudyForTestPart6));

