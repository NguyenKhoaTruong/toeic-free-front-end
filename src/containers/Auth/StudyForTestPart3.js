import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../../routes/Nav';
import Footer from "../../routes/Footer";
import * as Icon from 'react-bootstrap-icons';
import Tour from "reactour";
import { Link, withRouter } from 'react-router-dom';
import './StudyForTestPart3.scss';
import {


    getAllListenExercise,
    getAllExamResultByUser
} from '../../services/userService';
import { toast } from 'react-toastify';
import DetailStudyListenExerciseThree from './DetailStudyListenExerciseThree';
import LoginForm from '../../routes/LoginForm';
class StudyForTestPart3 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isTourOpen: false,
            isShowingMore: false,
            showluyenthi: false,
            showluyenthi1: false,
            showTipStudy: false,
            showStudy: false,
            arrReadExercise: [],
            showList: false,
            arrResultTest: [],
            showModalLoginExam: true
        }
    }
    async componentDidMount() {
        await this.getAllListenExercise();
        await this.getAllExamResultByUsers();
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
    closeTour = () => {
        this.setState({ isTourOpen: false });
    };

    openTour = () => {
        this.setState({ isTourOpen: true });
    };
    handleShowVocabulary = () => {
        this.props.history.push('/tu-vung/9/Từ%20Vựng%20Part%203/PART%203')
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
        this.props.history.push(`/luyen-thi-part-3/${dataId}`)
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
        const { isTourOpen, isShowingMore, showTipStudy, showStudy, arrReadExercise, showList, arrResultTest, showModalLoginExam
        } = this.state;
        let { isLoggedIn, userInfo } = this.props;
        const accentColor = "#5cb7b7";
        let listenId = '';
        {
            arrReadExercise && arrReadExercise.length > 0 && arrReadExercise.map((item, index) => {
                if (item.id && item.part === 'PART 3') {
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
                            <div className='content-part-three'>
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
                                                        {item.part === 'PART 3' && <div className='study-test-one border' onClick={() => this.handleShowStudy(item.id)} data-tut="reactour__option_5">
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
                                        {/* {showList && <DetailStudyListenExerciseThree />} */}
                                        {/* {showStudy &&
                                    <div className='background-testonline' style={{ height: '550px', marginTop: '12px', textAlign: 'center' }} >



                                        <div className='content-testonline ' style={{ width: '100%' }} >
                                            <h1 className='title-list-exam-test'>Danh sách đề luyện thi</h1>
                                            <div className='list-exam-test'>
                                                {arrReadExercise && arrReadExercise.length > 0 && arrReadExercise.map((item, index) => {
                                                    return (
                                                        <>
                                                            {item && item.part === 'PART 3' && <div className='exam-test' key={index} onClick={() => this.handleDetailListenExercise()}>
                                                                <p className='exam-text-info'>{item.name_listening}{'        '}{item.part} {'    '}{item.test_year}</p>
                                                            </div>}
                                                        </>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                } */}
                                        {showTipStudy ? <>
                                            <div className='border ml-3 mr-3 content-study-for-test-three' data-tut="reactour__content" >
                                                <span className='title-content'>I. SƠ LƯỢC VỀ TOEIC PART 3</span>
                                                <p className='title-content'>1. Cấu trúc bài thi</p>
                                                <p className='content-title'>
                                                    Trong phần này, thí sinh sẽ được nghe 13 đoạn hội thoại ngắn không in trong đề thi. Mỗi đoạn có 03 câu hỏi, mỗi câu hỏi sẽ có 4 đáp án lựa chọn và nhiệm vụ của thí sinh là chọn đáp án đúng nhất.
                                                </p>

                                                <p className='content-title-one'>Tăng 9 câu (từ 30 lên 39 câu)</p>
                                                <p className='content-title-one' >Xuất hiện các đoạn hội thoại có 3 người nói thay vì 2 người: 1 man và 2 women hoặc 2 men và 1 woman</p>
                                                <p className='content-title-one' id='study-test-two'>Thí sinh phải kết hợp những gì nghe được với biểu đồ/ bảng biểu cho sẵn để trả lời câu hỏi.</p>
                                                <p className='content-title-one'>Có câu hỏi buộc người đọc phải dựa vào những gì nghe được để đoán ý người nói</p>

                                                <p className='title-content'>2. Cách phân bổ thời gian làm bài</p>
                                                < p className='content-title'> Trước khi bắt đầu phần nghe TOEIC part 3, các bạn sẽ được nghe phần hướng dẫn trong 30 giây. Bạn nên tập trung tinh thần để không bị lơ đãng ngay khi bắt đầu bài thi.</p>
                                                <p className='content-title' id='study-test-three'>Sau khi nghe hết đoạn đối thoại, bạn sẽ nghe 3 câu hỏi liên quan đến đoạn đối thoại đó. Thời gian đọc câu hỏi là 1 giây, thời gian ngắt quãng giữa các câu hỏi là 8 giây. Tức là sau khi kết thúc đoạn đối thoại bạn có 27 giây để trả lời tất cả các câu hỏi trước khi bước sang đoạn đối thoại tiếp theo.</p>
                                                <p className='content-title'>Vậy khi nghe đọc đến câu hỏi thứ 3, các bạn phải nhanh chóng giải quyết hết các câu hỏi và dùng khoảng thời gian còn lại để đọc đoạn tiếp theo.</p>
                                                <p className='content-title'>rong 3 câu hỏi tương ứng với đoạn hội thoại, chắc chắn có 1 câu hỏi về thông tin cụ thể. Bạn không nên giành quá nhiều thời gian cho một câu hỏi do khó có thể nhớ hết thông tin trong đoạn đối thoại đã qua. Hãy tập trung làm quen với việc phân bố thời gian sao cho khi nghe xong câu hỏi thứ 3 bạn đã bắt đầu đọc đến đoạn đối thoại tiếp theo.</p>
                                                <p className='content-title'>3. Các topic thường xuất hiện</p>
                                                <p className='content-title'>Part 3 thường xuất hiện một số chủ đề thông dụng sau:</p>
                                                <p className='content-title'>Thông tin trong văn phòng (thời gian, cuộc họp, tài liệu, thiết bị, lịch hẹn)</p>
                                                <p className='content-title'>Thông tin về cá nhân (tăng lương, thăng chức, các công việc đang làm)</p>
                                                <p className='content-title' id='study-test-four'>Du lịch (chuyến công tác, giá cả, thời gian)</p>
                                                <p className='content-title'>Restaurants (nhà hàng), real estate (bất động sản), and retail (bán lẻ)</p>
                                                <p className='content-title'>Free-time activities (các hoạt động trong thời gian rảnh rỗi)</p>
                                                <p className='title-content'>4. Các dạng câu hỏi thường gặp</p>
                                                <p className='content-title'>Một đoạn hội thoại trong Part 3 luôn theo cấu trúc: Chào hỏi, giới thiệu chung - Chi tiết cụ thể trong hội thoại - Người nói đề cập đến việc mình chuẩn bị làm/đã làm.</p>
                                                <p className='content-title'>Bởi thế, trong mỗi đoạn, sẽ có ba câu hỏi nhỏ tuân theo trình tự nghe, tương đương với các nội dung: Hỏi các thông tin bao quát, Hỏi các thông tin chi tiết và Câu hỏi suy luận, kèm theo đó là câu hỏi với 4 đáp án A, B, C, D tương ứng để cho bạn lựa chọn.</p>
                                                <p className='content-title'>▶ Dạng câu hỏi ý chính</p>
                                                <p className='content-title'>Bạn sẽ nghe được đáp án của kiểu câu hỏi này ngay trong phần đầu của đoạn hội thoại. Các câu hỏi thường gặp của phần này là:</p>
                                                <p className='content-title'><i>What is the conversation about? (Đoạn hội thoại nói về chủ đề gì? )</i></p>
                                                <p className='content-title'><i>What is the topic of the conversation? (Chủ đề chính của cuộc trò chuyện vừa rồi là gì?)</i></p>
                                                <p className='content-title'><i>What are the speakers talking about? (Những người hội thoại đang nói về gì?)</i></p>
                                                <p className='content-title'><i>Who are the speakers talking about? (Những người hội thoại đang nói về ai?)</i></p>
                                                <p className='content-title'>Đáp án của câu hỏi này thường nằm ngay ở 2 câu đầu tiên trong đoạn hội thoại.</p>
                                                <p className='content-title'>▶ Dạng câu hỏi chi tiết</p>
                                                <p className='content-title'>Câu hỏi dạng này sẽ hỏi sâu hơn về chủ đề của đoạn hội thoại như:</p>
                                                <p className='content-title'><i>What problem does the woman have? (Người phụ nữ đang gặp phải vấn đề gì?)</i></p>
                                                <p className='content-title'><i>What does the man suggest? (Người đàn ông đề xuất ý kiến gì?)</i></p>
                                                <p className='content-title'><i>What is John’s job? (John làm nghề gì?)</i></p>
                                                <p className='content-title'>Bạn cần lắng nghe kĩ hội thoại để nắm bắt được những thông tin này.</p>
                                                <p className='content-title'>▶ Dạng câu hỏi suy luận</p>
                                                <p className='content-title'>Câu hỏi suy luận được đánh giá là khó vì nó không chỉ đánh giá xem bạn hiểu bài nghe như thế nào mà còn có thể căn cứ vào các thông tin nghe được để suy luận ra câu trả lời không có trong phần nghe đó. </p>
                                                <p className='content-title'>Ví dụ:</p>
                                                <p className='content-title'><i>What is the relationship between 2 speakers? (Mối quan hệ giữa 2 người nói là gì?)</i></p>
                                                <p className='content-title'><i>What will the woman probably do next? (Người phụ nữ sẽ làm gì tiếp theo?)</i></p>
                                                <p className='content-title'><i>Where is the conversation likely taking place? (Đoạn hội thoại này có thể diễn ra ở đâu?)</i></p>

                                                <p className='content-title'>Như vậy trong phần này có tổng cộng 39 câu. Nếu ở Part 1 và 2 của kỳ thi TOEIC thí sinh có thể dựa vào các thủ thuật để tìm ra các đáp án đúng thì ở TOEIC Part 3, bạn phải hoàn toàn dựa vào nội dung từ bài hội thoại.</p>
                                                <p className='content-title'>Đây chính là một điểm khó đối với những bạn có kỹ năng nghe yếu cũng như phân tích các thông tin nghe được. Bên cạnh đó, yếu tố giọng đọc, tốc độ đọc, ngữ điệu cũng sẽ ít nhiều làm khó thí sinh nếu như không có nền tảng vững vàng.</p>
                                            </div>
                                        </>

                                            : <>
                                                <div className='border ml-3 mr-3 content-study-for-test-three' data-tut="reactour__content" >
                                                    <span className='title-content'>I. SƠ LƯỢC VỀ TOEIC PART 3</span>
                                                    <p className='title-content'>1. Cấu trúc bài thi</p>
                                                    <p className='content-title'>
                                                        Trong phần này, thí sinh sẽ được nghe 13 đoạn hội thoại ngắn không in trong đề thi. Mỗi đoạn có 03 câu hỏi, mỗi câu hỏi sẽ có 4 đáp án lựa chọn và nhiệm vụ của thí sinh là chọn đáp án đúng nhất.
                                                    </p>

                                                    <p className='content-title-one'>Tăng 9 câu (từ 30 lên 39 câu)</p>
                                                    <p className='content-title-one' >Xuất hiện các đoạn hội thoại có 3 người nói thay vì 2 người: 1 man và 2 women hoặc 2 men và 1 woman</p>
                                                    <p className='content-title-one' id='study-test-two'>Thí sinh phải kết hợp những gì nghe được với biểu đồ/ bảng biểu cho sẵn để trả lời câu hỏi.</p>
                                                    <p className='content-title-one'>Có câu hỏi buộc người đọc phải dựa vào những gì nghe được để đoán ý người nói</p>

                                                    <p className='title-content'>2. Cách phân bổ thời gian làm bài</p>
                                                    < p className='content-title'> Trước khi bắt đầu phần nghe TOEIC part 3, các bạn sẽ được nghe phần hướng dẫn trong 30 giây. Bạn nên tập trung tinh thần để không bị lơ đãng ngay khi bắt đầu bài thi.</p>
                                                    <p className='content-title' id='study-test-three'>Sau khi nghe hết đoạn đối thoại, bạn sẽ nghe 3 câu hỏi liên quan đến đoạn đối thoại đó. Thời gian đọc câu hỏi là 1 giây, thời gian ngắt quãng giữa các câu hỏi là 8 giây. Tức là sau khi kết thúc đoạn đối thoại bạn có 27 giây để trả lời tất cả các câu hỏi trước khi bước sang đoạn đối thoại tiếp theo.</p>
                                                    <p className='content-title'>Vậy khi nghe đọc đến câu hỏi thứ 3, các bạn phải nhanh chóng giải quyết hết các câu hỏi và dùng khoảng thời gian còn lại để đọc đoạn tiếp theo.</p>
                                                    <p className='content-title'>rong 3 câu hỏi tương ứng với đoạn hội thoại, chắc chắn có 1 câu hỏi về thông tin cụ thể. Bạn không nên giành quá nhiều thời gian cho một câu hỏi do khó có thể nhớ hết thông tin trong đoạn đối thoại đã qua. Hãy tập trung làm quen với việc phân bố thời gian sao cho khi nghe xong câu hỏi thứ 3 bạn đã bắt đầu đọc đến đoạn đối thoại tiếp theo.</p>
                                                    <p className='content-title'>3. Các topic thường xuất hiện</p>
                                                    <p className='content-title'>Part 3 thường xuất hiện một số chủ đề thông dụng sau:</p>
                                                    <p className='content-title'>Thông tin trong văn phòng (thời gian, cuộc họp, tài liệu, thiết bị, lịch hẹn)</p>
                                                    <p className='content-title'>Thông tin về cá nhân (tăng lương, thăng chức, các công việc đang làm)</p>
                                                    <p className='content-title' id='study-test-four'>Du lịch (chuyến công tác, giá cả, thời gian)</p>
                                                    <p className='content-title'>Restaurants (nhà hàng), real estate (bất động sản), and retail (bán lẻ)</p>
                                                    <p className='content-title'>Free-time activities (các hoạt động trong thời gian rảnh rỗi)</p>
                                                    <p className='title-content'>4. Các dạng câu hỏi thường gặp</p>
                                                    <p className='content-title'>Một đoạn hội thoại trong Part 3 luôn theo cấu trúc: Chào hỏi, giới thiệu chung - Chi tiết cụ thể trong hội thoại - Người nói đề cập đến việc mình chuẩn bị làm/đã làm.</p>
                                                    <p className='content-title'>Bởi thế, trong mỗi đoạn, sẽ có ba câu hỏi nhỏ tuân theo trình tự nghe, tương đương với các nội dung: Hỏi các thông tin bao quát, Hỏi các thông tin chi tiết và Câu hỏi suy luận, kèm theo đó là câu hỏi với 4 đáp án A, B, C, D tương ứng để cho bạn lựa chọn.</p>
                                                    <p className='content-title'>▶ Dạng câu hỏi ý chính</p>
                                                    <p className='content-title'>Bạn sẽ nghe được đáp án của kiểu câu hỏi này ngay trong phần đầu của đoạn hội thoại. Các câu hỏi thường gặp của phần này là:</p>
                                                    <p className='content-title'><i>What is the conversation about? (Đoạn hội thoại nói về chủ đề gì? )</i></p>
                                                    <p className='content-title'><i>What is the topic of the conversation? (Chủ đề chính của cuộc trò chuyện vừa rồi là gì?)</i></p>
                                                    <p className='content-title'><i>What are the speakers talking about? (Những người hội thoại đang nói về gì?)</i></p>
                                                    <p className='content-title'><i>Who are the speakers talking about? (Những người hội thoại đang nói về ai?)</i></p>
                                                    <p className='content-title'>Đáp án của câu hỏi này thường nằm ngay ở 2 câu đầu tiên trong đoạn hội thoại.</p>
                                                    <p className='content-title'>▶ Dạng câu hỏi chi tiết</p>
                                                    <p className='content-title'>Câu hỏi dạng này sẽ hỏi sâu hơn về chủ đề của đoạn hội thoại như:</p>
                                                    <p className='content-title'><i>What problem does the woman have? (Người phụ nữ đang gặp phải vấn đề gì?)</i></p>
                                                    <p className='content-title'><i>What does the man suggest? (Người đàn ông đề xuất ý kiến gì?)</i></p>
                                                    <p className='content-title'><i>What is John’s job? (John làm nghề gì?)</i></p>
                                                    <p className='content-title'>Bạn cần lắng nghe kĩ hội thoại để nắm bắt được những thông tin này.</p>
                                                    <p className='content-title'>▶ Dạng câu hỏi suy luận</p>
                                                    <p className='content-title'>Câu hỏi suy luận được đánh giá là khó vì nó không chỉ đánh giá xem bạn hiểu bài nghe như thế nào mà còn có thể căn cứ vào các thông tin nghe được để suy luận ra câu trả lời không có trong phần nghe đó. </p>
                                                    <p className='content-title'>Ví dụ:</p>
                                                    <p className='content-title'><i>What is the relationship between 2 speakers? (Mối quan hệ giữa 2 người nói là gì?)</i></p>
                                                    <p className='content-title'><i>What will the woman probably do next? (Người phụ nữ sẽ làm gì tiếp theo?)</i></p>
                                                    <p className='content-title'><i>Where is the conversation likely taking place? (Đoạn hội thoại này có thể diễn ra ở đâu?)</i></p>

                                                    <p className='content-title'>Như vậy trong phần này có tổng cộng 39 câu. Nếu ở Part 1 và 2 của kỳ thi TOEIC thí sinh có thể dựa vào các thủ thuật để tìm ra các đáp án đúng thì ở TOEIC Part 3, bạn phải hoàn toàn dựa vào nội dung từ bài hội thoại.</p>
                                                    <p className='content-title'>Đây chính là một điểm khó đối với những bạn có kỹ năng nghe yếu cũng như phân tích các thông tin nghe được. Bên cạnh đó, yếu tố giọng đọc, tốc độ đọc, ngữ điệu cũng sẽ ít nhiều làm khó thí sinh nếu như không có nền tảng vững vàng.</p>
                                                </div>
                                            </>}

                                    </div>
                                </div>
                            </div>

                            <Footer /></>
                        :
                        <>
                            {showModalLoginExam === true ? <LoginForm showModal={showModalLoginExam} onClose={this.close} /> : <> {this.props.history.push('/')}</>}
                        </>}

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
        content: ` Tại đây bạn có thể xem từ từng tham khảo phần thi Part 3.`
    },
    {
        selector: '[data-tut="reactour__option_2"]',
        content: ` Tại đây bạn có thể xem ngữ pháp tham khảo phần thi Part 3.`
    },
    {
        selector: '[data-tut="reactour__option_3"]',
        content: ` Tại đây bạn có thể xem  mẹo thi tham khảo phần thi Part 3.`
    },
    {
        selector: '[data-tut="reactour__option_4"]',
        content: ` Tại đây bạn có thể xem  hướng dẫn tham khảo phần thi Part 3.`
    },
    {
        selector: '[data-tut="reactour__option_5"]',
        content: ` Tại đây bạn có thể luyện thi phần thi Part 3.`
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StudyForTestPart3));
