import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../../routes/Nav';
import Footer from "../../routes/Footer";
import * as Icon from 'react-bootstrap-icons';
import Tour from "reactour";
import { toast } from 'react-toastify';
import {
    getAllListenExercise,
    getAllExamResultByUser

} from '../../services/userService';
import './StudyForTestPart7.scss';
import { Link, withRouter } from 'react-router-dom';
import DetailStudyListenExerciseSeven from './DetailStudyListenExerciseSeven';
import LoginForm from '../../routes/LoginForm';
class StudyForTestPart7 extends Component {
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
        this.props.history.push('/tu-vung/13/Từ%20Vựng%20Part%207/PART%207')
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
        this.props.history.push(`/luyen-thi-part-7/${dataId}`)
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
        const { isTourOpen, isShowingMore, showTipStudy, showStudy, arrReadExercise, showList, showModalLoginExam,
            arrResultTest
        } = this.state;
        const accentColor = "#5cb7b7";
        let { isLoggedIn, userInfo } = this.props;
        const { options, myAnswer, currentQuestion, isEnd } = this.state;

        let readId = '';
        {
            arrReadExercise && arrReadExercise.length > 0 && arrReadExercise.map((item, index) => {
                if (item.id && item.part === 'PART 7') {
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
                            <div className='content-part-seven'>
                                <div className="row" style={{ marginRight: '15px' }}>
                                    <div className="col-2">  <div className='border left-tet ml-3' data-tut="reactour__listtablecontent">
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
                                                        {item.part === 'PART 7' && <div className='study-test-one border' onClick={() => this.handleShowStudy(item.id)} data-tut="reactour__option_5">
                                                            <p><Icon.Hurricane size={40} color="white" style={{ background: "" }} className=" mr-1" /> Luyện</p>
                                                        </div>
                                                        }

                                                    </>
                                                )
                                            })}
                                            <div className='score-exam-result-study-test-one border'>

                                                {maxScoreReading ? <p> Thành Tích:{' '}{maxScoreReading}</p> : <p> Thành Tích:{' '}{'Chưa có điểm'}</p>}
                                            </div>
                                        </div>
                                    </div></div>
                                    <div className="col-10">
                                        {/* {showList && <DetailStudyListenExerciseSeven />} */}
                                        {/* {showStudy &&
                                    <>
                                        <div className='background-testonline' style={{ height: '550px', marginTop: '12px', textAlign: 'center' }}>
                                            <div className='content-testonline' style={{ width: '100%' }} >
                                                <h1 className='title-list-exam-test'>Danh sách đề luyện thi</h1>
                                                <div className='list-exam-test'>
                                                    {arrReadExercise && arrReadExercise.length > 0 && arrReadExercise.map((item, index) => {
                                                        return (
                                                            <>
                                                                {item && item.part === 'PART 7' && <div className='exam-test' key={index} onClick={() => this.handleDetailListenExercise()}>
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
                                                <div className='border ml-3 mr-3 content-study-for-test-seven' data-tut="reactour__content" >
                                                    <span className='title-content' id='study-test-one'>1. SƠ LƯỢC VỀ PART 7</span>
                                                    <p className='title-content'>1. Cấu trúc bài thi</p>
                                                    <p className='title-content'>Cấu trúc của 1 bài thi TOEIC Part 7 gồm 2 phần chính sau:</p>
                                                    <p className='content-title' id='study-test-two'>– Single passage: Đoạn đơn 29 câu, đề thi có thể có từ 7 – 10 đoạn văn đơn, hết mỗi đoạn văn sẽ có 2 – 4 câu hỏi.</p>
                                                    <p className='content-title'>– Double passage: Đoạn kép 25 câu.</p>
                                                    <p className='content-title'>Theo Format Đề thi Toeic 2019 thì trong Part 7 số lượng câu hỏi đã tăng thêm 8 câu và số bài đọc cũng tăng thêm thông qua dạng double passage. Vì vậy, bạn phải tăng thời gian dành cho việc đọc hiểu ở phần này giảm thời gian làm Part 5 và Part 6.</p>
                                                    <p className='title-content'>2. Các loại hình đoạn văn thường xuất hiện</p>
                                                    <p className='title-content'>Trong part này, bạn cần tìm từ thích hợp để điền vào chỗ trống, nội dung phần này thường bao gồm các loại văn bản như</p>
                                                    <p className='title-content'>Loại 1. Quảng cáo</p>
                                                    <p className='content-title'>Các mẩu quảng cáo nhỏ đề cập tới các nội dung quảng cáo sản phẩm, dịch vụ hoặc giới thiệu 1 thứ gì đó tới người dùng. Bạn cần chú ý tới các nội dung trong đoạn như sau:</p>
                                                    <p className='title-content'>- Bao nhiêu sản phẩm? chi tiết</p>
                                                    <p className='content-title'>- Đoạn đang quảng cáo cái gì vậy? ý chính</p>
                                                    <p className='content-title'>- Ai có thể sử dụng (sản phẩm)? suy luận</p>
                                                    <p className='title-content'>Loại 2. Fax dành cho doanh nghiệp </p>
                                                    <p className='content-title'>Nội dung các đoạn Fax được trao đổi với nhau trong nội dung công việc hoặc trao đổi thông tin giữa các nhân viên với nhau, nội dung câu hỏi thường sẽ xoay quanh các nội dung: </p>
                                                    <p className='content-title'>- Thời gian fax được gửi? chi tiết</p>
                                                    <p className='content-title'>- Mục đích của lá thư là gì? ý chính</p>
                                                    <p className='content-title'>- Mô hình của bản ghi nhớ là gì? suy luận</p>
                                                    <p className='title-content'>Loại 3. Forms, biểu đồ và đồ thị</p>
                                                    <p className='content-title'>Nếu câu hỏi đề cập tới các vấn đề về Form hay đồ thì thì bạn cần lưu ý các nội dung này nhé. Tuy nhiên, đó chỉ là tỉ lệ cao chứ không phải 100% rơi vào các dấu hiệu này đâu bạn nhé.   </p>
                                                    <p className='content-title'>- Phần trăm của ...? chi tiết</p>
                                                    <p className='content-title'>- Mục đích của biểu đồ hình tròn là gì? ý chính</p>
                                                    <p className='content-title'>- Anh sẽ sử dụng thông tin? suy luận</p>
                                                    <p className='title-content'>Loại 4. Các bài báo và báo cáo</p>
                                                    <p className='content-title'>Các nội dung liên quan tới số liệu, bảng biểu và một vài thông tin báo cáo. Với các nội dung này thì bạn cần chú ý tới các thông tin chính như sau:</p>
                                                    <p className='content-title'>- Ngày nào là quan trọng? chi tiết</p>
                                                    <p className='content-title'>- Ý tưởng chính của bài viết này là gì? ý chính</p>
                                                    <p className='content-title'>- Ai có thể đọc báo cáo này? suy luận</p>
                                                    <p className='title-content'>Loại 5. Thông báo và đoạn văn</p>
                                                    <p className='content-title'>Các nội dung đoạn thông báo này khá đa dạng, tuy nhiên với các nội dung này vẫn có 1 vài nội dung chính bạn cần chú ý hơn bao gồm:</p>
                                                    <p className='content-title'>- Ai là (tên hay danh hiệu)? chi tiết</p>
                                                    <p id='study-test-three'>- Thông báo về cái gì? ý chính</p>
                                                    <p content-study-for-test-seven>- Ý kiến ​​của nhà văn là gì? Suy luận</p>
                                                    <p className='title-content'>3. Cách phân bổ thời gian làm bài</p>
                                                    <p>Một trong những vấn đề mà đa số các bạn gặp phải dẫn đến không thể làm hết part 7:</p>
                                                    <p className='content-title'>Đoạn kép thường dài và khó hơn</p>
                                                    <p className='content-title'>Mất quá nhiều thời gian ở đoạn đơn đoạn văn</p>
                                                    <p className='content-title'>Khi đọc tới phần đoạn kép thì đã cảm thấy mệt mỏi và chán nản, không còn sức đọc và làm tiếp</p>
                                                    <p className='content-title'>Để giúp các bạn xử lý được vấn đề này, cô Hoa khuyên các bạn nên chia làm hai mốc thời gian rõ rệt cho hai phần của Part 7 và đảo ngược thứ tự làm bài như sai:</p>
                                                    <p className='content-title'>20′ đầu:  Đọc từ câu 200 trở xuống đến câu 180 (Đoạn kép)</p>
                                                    <p className='content-title'>30′ sau:  Đọc từ câu 152 trở lên đến câu 179 (Đoạn đơn)</p>
                                                    <p className='content-title'>Nếu các bạn còn nhớ thì cô đã hướng dẫn các bạn dành 12 phút cho Part 5 và Part 6 (30s/câu) nên tới phần 7 bạn sẽ còn tròn 60′ để chiến đấu với 48 câu lại. Để chắc ăn thì tối đa mỗi câu hỏi chỉ có 60s để trả lời. Suy ra:</p>
                                                    <p className='content-title'>Đối với đoạn đơn = tối đa 3 phút</p>
                                                    <p className='content-title'>Đối với đoạn kép = tối đa 5 phút</p>
                                                    <p className='content-title'>Khi phân bổ thời gian như trên, các bạn sẽ làm phần khó nhất khi vẫn còn tỉnh táo và chưa quá mệt, vẫn còn sức để làm hết đoạn đơn. Bên cạnh đó, việc chia thời gian quy định rõ ràng cho mỗi phần và mỗi đoạn văn khiến chúng ta không bị quá thời gian vào bất cứ câu nào.</p>
                                                    <p className='content-title'><b>Lưu ý:có một vài mẹo dưới đây các bạn có </b></p>
                                                    <p className='content-title'><b>Đọc câu hỏi trước</b></p>
                                                    <p className='content-title'><b>Không cần đọc, dịch và hiểu toàn đoạn văn</b></p>
                                                    <p className='content-title'><b>Áp dụng triệt để kỹ năng scan</b></p>
                                                    <p className='content-title'><b>Loại đáp án sai chắc trước = xác định đáp án đúng trong những câu còn lại</b></p>
                                                    <p className='content-title'><b>Không được để đoạn văn nào, phần nào quá thời gian đã quy định = Gần hết thời gian quy định chưa có đáp án thì chọn đại và làm tiếp</b></p>
                                                </div>
                                            </>
                                            :
                                            <><div className='border ml-3 mr-3 content-study-for-test-seven' data-tut="reactour__content" >
                                                <span className='title-content' id='study-test-one'>1. SƠ LƯỢC VỀ PART 7</span>
                                                <p className='title-content'>1. Cấu trúc bài thi</p>
                                                <p className='title-content'>Cấu trúc của 1 bài thi TOEIC Part 7 gồm 2 phần chính sau:</p>
                                                <p className='content-title' id='study-test-two'>– Single passage: Đoạn đơn 29 câu, đề thi có thể có từ 7 – 10 đoạn văn đơn, hết mỗi đoạn văn sẽ có 2 – 4 câu hỏi.</p>
                                                <p className='content-title'>– Double passage: Đoạn kép 25 câu.</p>
                                                <p className='content-title'>Theo Format Đề thi Toeic 2019 thì trong Part 7 số lượng câu hỏi đã tăng thêm 8 câu và số bài đọc cũng tăng thêm thông qua dạng double passage. Vì vậy, bạn phải tăng thời gian dành cho việc đọc hiểu ở phần này giảm thời gian làm Part 5 và Part 6.</p>
                                                <p className='title-content'>2. Các loại hình đoạn văn thường xuất hiện</p>
                                                <p className='title-content'>Trong part này, bạn cần tìm từ thích hợp để điền vào chỗ trống, nội dung phần này thường bao gồm các loại văn bản như</p>
                                                <p className='title-content'>Loại 1. Quảng cáo</p>
                                                <p className='content-title'>Các mẩu quảng cáo nhỏ đề cập tới các nội dung quảng cáo sản phẩm, dịch vụ hoặc giới thiệu 1 thứ gì đó tới người dùng. Bạn cần chú ý tới các nội dung trong đoạn như sau:</p>
                                                <p className='title-content'>- Bao nhiêu sản phẩm? chi tiết</p>
                                                <p className='content-title'>- Đoạn đang quảng cáo cái gì vậy? ý chính</p>
                                                <p className='content-title'>- Ai có thể sử dụng (sản phẩm)? suy luận</p>
                                                <p className='title-content'>Loại 2. Fax dành cho doanh nghiệp </p>
                                                <p className='content-title'>Nội dung các đoạn Fax được trao đổi với nhau trong nội dung công việc hoặc trao đổi thông tin giữa các nhân viên với nhau, nội dung câu hỏi thường sẽ xoay quanh các nội dung: </p>
                                                <p className='content-title'>- Thời gian fax được gửi? chi tiết</p>
                                                <p className='content-title'>- Mục đích của lá thư là gì? ý chính</p>
                                                <p className='content-title'>- Mô hình của bản ghi nhớ là gì? suy luận</p>
                                                <p className='title-content'>Loại 3. Forms, biểu đồ và đồ thị</p>
                                                <p className='content-title'>Nếu câu hỏi đề cập tới các vấn đề về Form hay đồ thì thì bạn cần lưu ý các nội dung này nhé. Tuy nhiên, đó chỉ là tỉ lệ cao chứ không phải 100% rơi vào các dấu hiệu này đâu bạn nhé.   </p>
                                                <p className='content-title'>- Phần trăm của ...? chi tiết</p>
                                                <p className='content-title'>- Mục đích của biểu đồ hình tròn là gì? ý chính</p>
                                                <p className='content-title'>- Anh sẽ sử dụng thông tin? suy luận</p>
                                                <p className='title-content'>Loại 4. Các bài báo và báo cáo</p>
                                                <p className='content-title'>Các nội dung liên quan tới số liệu, bảng biểu và một vài thông tin báo cáo. Với các nội dung này thì bạn cần chú ý tới các thông tin chính như sau:</p>
                                                <p className='content-title'>- Ngày nào là quan trọng? chi tiết</p>
                                                <p className='content-title'>- Ý tưởng chính của bài viết này là gì? ý chính</p>
                                                <p className='content-title'>- Ai có thể đọc báo cáo này? suy luận</p>
                                                <p className='title-content'>Loại 5. Thông báo và đoạn văn</p>
                                                <p className='content-title'>Các nội dung đoạn thông báo này khá đa dạng, tuy nhiên với các nội dung này vẫn có 1 vài nội dung chính bạn cần chú ý hơn bao gồm:</p>
                                                <p className='content-title'>- Ai là (tên hay danh hiệu)? chi tiết</p>
                                                <p id='study-test-three'>- Thông báo về cái gì? ý chính</p>
                                                <p content-study-for-test-seven>- Ý kiến ​​của nhà văn là gì? Suy luận</p>
                                                <p className='title-content'>3. Cách phân bổ thời gian làm bài</p>
                                                <p>Một trong những vấn đề mà đa số các bạn gặp phải dẫn đến không thể làm hết part 7:</p>
                                                <p className='content-title'>Đoạn kép thường dài và khó hơn</p>
                                                <p className='content-title'>Mất quá nhiều thời gian ở đoạn đơn đoạn văn</p>
                                                <p className='content-title'>Khi đọc tới phần đoạn kép thì đã cảm thấy mệt mỏi và chán nản, không còn sức đọc và làm tiếp</p>
                                                <p className='content-title'>Để giúp các bạn xử lý được vấn đề này, cô Hoa khuyên các bạn nên chia làm hai mốc thời gian rõ rệt cho hai phần của Part 7 và đảo ngược thứ tự làm bài như sai:</p>
                                                <p className='content-title'>20′ đầu:  Đọc từ câu 200 trở xuống đến câu 180 (Đoạn kép)</p>
                                                <p className='content-title'>30′ sau:  Đọc từ câu 152 trở lên đến câu 179 (Đoạn đơn)</p>
                                                <p className='content-title'>Nếu các bạn còn nhớ thì cô đã hướng dẫn các bạn dành 12 phút cho Part 5 và Part 6 (30s/câu) nên tới phần 7 bạn sẽ còn tròn 60′ để chiến đấu với 48 câu lại. Để chắc ăn thì tối đa mỗi câu hỏi chỉ có 60s để trả lời. Suy ra:</p>
                                                <p className='content-title'>Đối với đoạn đơn = tối đa 3 phút</p>
                                                <p className='content-title'>Đối với đoạn kép = tối đa 5 phút</p>
                                                <p className='content-title'>Khi phân bổ thời gian như trên, các bạn sẽ làm phần khó nhất khi vẫn còn tỉnh táo và chưa quá mệt, vẫn còn sức để làm hết đoạn đơn. Bên cạnh đó, việc chia thời gian quy định rõ ràng cho mỗi phần và mỗi đoạn văn khiến chúng ta không bị quá thời gian vào bất cứ câu nào.</p>
                                                <p className='content-title'><b>Lưu ý:có một vài mẹo dưới đây các bạn có </b></p>
                                                <p className='content-title'><b>Đọc câu hỏi trước</b></p>
                                                <p className='content-title'><b>Không cần đọc, dịch và hiểu toàn đoạn văn</b></p>
                                                <p className='content-title'><b>Áp dụng triệt để kỹ năng scan</b></p>
                                                <p className='content-title'><b>Loại đáp án sai chắc trước = xác định đáp án đúng trong những câu còn lại</b></p>
                                                <p className='content-title'><b>Không được để đoạn văn nào, phần nào quá thời gian đã quy định = Gần hết thời gian quy định chưa có đáp án thì chọn đại và làm tiếp</b></p>
                                            </div> </>}

                                    </div>
                                </div>
                            </div>





                            <Footer /></> :
                        <>

                            {showModalLoginExam === true ? <LoginForm showModal={showModalLoginExam} onClose={this.close} /> : <> {this.props.history.push('/')}</>}
                        </>}

                </>
            </React.Fragment >


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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StudyForTestPart7));
