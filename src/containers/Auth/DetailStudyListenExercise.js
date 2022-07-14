import React, { Component } from 'react';
import './TestOnline.scss';
import Nav from '../../routes/Nav';
import Footer from '../../routes/Footer';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Tour from "reactour";
import {
    getDetailListenExercise,
    getAllQuizListening,
    getAllListenExercise,
    getAllExamResultByUser
} from '../../services/userService';
import ProcessPartOne from './ProcessPartOne';
import * as Icon from 'react-bootstrap-icons';
class DetailStudyListenExercise extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailListenExercise: [],
            arrPartOne: [],
            showTipStudy: false,
            showStudy: false,
            arrReadExercise: [],
            showList: false,
            arrPartOne: [],
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
            let response = await getAllQuizListening('PART 1');
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
        this.props.history.push('/tu-vung/7/Từ%20Vựng%20Part%201/PART%201')
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
        this.props.history.push(`/luyen-thi-part-1/${dataId}`)
    }
    handleDetailListenExercise = () => {
        this.setState({
            showList: true,
            showStudy: false
        })
    }
    render() {
        const accentColor = "#5cb7b7";
        let { detailListenExercise, showTipStudy, showStudy, arrReadExercise, arrPartOne, showList, arrResultTest, isTourOpen
        } = this.state;
        console.log('check detai exam test', detailListenExercise)
        console.log('check ', this.state)
        console.log('check params', this.props.match.params.id)
        let dataPart = ''
        {
            detailListenExercise && detailListenExercise && detailListenExercise.map((item, index) => {
                if (item.part) {
                    dataPart = item.part

                }
            })
        }
        let listenId = '';
        {
            arrReadExercise && arrReadExercise.length > 0 && arrReadExercise.map((item, index) => {
                if (item.id && item.part === 'PART 1') {
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
        console.log('check data part  asdasdasd', dataPart)
        let dataId = this.props.match.params.id;
        console.log('check ', dataId)
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
                <div className='content-part-one'>
                    <div className="row">
                        <div className="col-2">
                            <div className='border left-tet ml-3'>
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
                                    <div className='score-exam-result-study-test-one border'>
                                        {maxScoreListening ? <p> Thành Tích:{' '}{maxScoreListening}</p> : <p> Thành Tích:{' '}{'Chưa có điểm'}</p>}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-10">
                            <div className='background-testonline' style={{ height: 'max-content' }}>
                                <div className='content-testonline border' >
                                    <div className='list-exam-test' style={{ border: '1px solid #e9ecef', marginTop: '20px', height: '1550px' }}>
                                        <div >
                                            <ProcessPartOne data={arrPartOne} Iddata={dataId} dataPart={dataPart} />
                                        </div>
                                    </div>

                                </div>
                            </div>
                            {showTipStudy ?
                                <>
                                    <div className='border center-content-part1-luyenthi ' data-tut="reactour__content">

                                        <span className='title-study' id="study-for-test-one">Luyện Thi Part 1 Tổng Quan:</span>
                                        <span className='title-study' >I. Cách phân bổ thời gian làm bài thi</span>

                                        <p className='content-study'>Tại TOEIC part 1, chúng ta sẽ có 1 phút 25s để nghe hướng dẫn làm bài thi, thì hãy nhanh chóng tận dụng thời gian này xem kỹ các bức tranh để hình dung trước xem nội dung của nó nói về cái gì, định hình những ý có sẵn và lúc sau chỉ việc nghe chính xác những gì băng nói. Đây là một bước đệm quan trọng để bài thi TOEIC của bạn đạt điểm cao đó</p>
                                        <p className='content-study' id='study-for-test-two'> Khi băng đọc cách đáp án, A, B, C, D. Giữa các đáp án sẽ thường có 5 giây để nghỉ, vì vậy hãy tận dụng  3 giây để tô nhanh đáp án và 2 giây sau nhìn luôn xuống câu hỏi tiếp theo để định hình nó nói về cái gì, tránh bị sốc.</p>
                                        <p className='content-study'> Trong bất kỳ mỗi đáp án của part 1 đưa ra, chúng ta sẽ tìm được trong câu đó cấu trúc như sau: S+ V+ O, chúng ta nên chú ý phần động từ ở phần này. Bởi ở part 1 thông thường các câu chia ở thì Hiện tại tiếp diễn, bởi nó mô tả hành động của Ai đấy đang làm gì? Hãy cố gắng nghe xem động từ Ving mà băng nói đến là cái gì, chỉ cần bạn nắm chuẩn động từ chính đó thôi là bạn đã có cơ hội đúng đến 70-80% rồi</p>

                                        <span className='title-study'>II. Hướng dẫn cách luyện nghe part 1 TOEIC</span>
                                        <p className='content-study-two'>1.  Nên luyện nghe part 1 theo các bước sau đây:  </p >

                                        <p className='content-study'>
                                            Bước 1: Xem qua tất cả các tranh trong bài trong thời gian 1.35 giây. Đây là thời gian đọc hướng dẫn trong bài thi thực
                                        </p >
                                        <p className='content-study'>
                                            Bước 2: Trước khi luyện nghe băng miêu tả về bức tranh đó, tự trả lời các câu hỏi:
                                            Đây là thể loại tranh gì ( tranh về người hay về vật? tranh về người thì miêu tả một hay nhiều người? hành động của họ là gì?…)

                                        </p>
                                        <p className='content-study'>
                                            Bước 3: Lựa chọn ngay chiến thuật làm bài phù hợp với từng tranh
                                        </p>
                                        <p className='content-study'>
                                            Bước 4: Trong lúc nghe, tập trung cao độ vào các câu trả lời và nhận dạng các từ khóa có trong từng đáp án
                                        </p>
                                        <p className='content-study'>
                                            Bước 5: Nhận dạng các từ khóa có trong từng đáp án
                                        </p>
                                        <p className='content-study'>
                                            Bước 6: Loại bỏ ngay các đáp án không phù hợp
                                        </p>
                                        <p className='content-study'>
                                            Bước 7: Chọn đáp án đúng tô ngay câu trả lời vào answer sheet và nhanh chóng nhìn hình tiếp theo.
                                        </p>


                                        <p className='content-study'>Đây cũng là chiến thuật nên áp dụng trong khi làm bài thi part 1 thật. Vì vậy nếu bạn quen với những bước này ngay từ khi luyện nghe sẽ khiến bạn quen hơn khi vào phòng thi.</p>
                                        <p className='content-study-two'> 2.  Phân loại các tranh thường gặp trong part 1 TOEIC </p>

                                        <p className='content-study'>{'-'} Tranh có 1 người</p>
                                        <p className='content-study'>{'-'} Tranh có nhiều người</p>
                                        <p className='content-study' id='study-for-test-three'>{'-'}Tranh có nhiều vật</p>
                                        <p className='content-study'>{'-'}Tranh phong cảnh</p>


                                        <span className='title-study'>III. Chiến thuật luyện nghe part 1 TOEIC cho từng loại tranh:</span>
                                        <p className='content-study-two'>1. Tranh có 1 người</p>

                                        <p className='content-study'>  ♦ Quan sát hành động, trạng thái của của nhân vật (họ đang làm gì, mặc trang phục như thế nào…)</p>
                                        <p className='content-study'>   ♦ Quan sát địa điểm của tranh ( bức tranh này diễn ra ở đâu? ở nhà hàng, bệnh viện hay sân bay…)</p>
                                        <p className='content-study'>  ♦ Tập trung vào hành động tổng quát
                                        </p>
                                        <p className='content-study'>  ♦ Tóm lại đối với tranh có 1 người chỉ cần tập trung vào động từ, giới từ và các túc từ ( đi sau động từ , chịu tác động của động từ đó)</p>

                                        <p className='content-study-two'>    2. Tranh có nhiều người</p>

                                        <p className='content-study'>     ♦ Quan sát những điểm tương đồng của các nhân vật ( in the office, at the meeting)</p>
                                        <p className='content-study'>  ♦ Quan sát sự khác biệt giữa các nhân vật ( one woman is standing, people are sitting…)</p>
                                        <p className='content-study'>    ♦ Quan sát mối quan hệ giữa các nhân vật ( they{`'`}re colleagues)
                                        </p>
                                        <p className='content-study'>    ♦ Vị trí của người và vật trong hình</p>

                                        <p className='content-study-two'>    3. Tranh chỉ có 1 vật</p>

                                        <p className='content-study'>           ♦ Xác định đó là vật gì?</p>
                                        <p className='content-study'>  ♦ Nghe 4 đáp án và loại đáp án không đúng ( đáp án nào có being loại luôn)</p>

                                        <p className='content-study-two'>      4. Tranh có 2 vật trở lên</p>

                                        <p className='content-study'>        ♦ Tìm điểm giống nhau giữa các vật (outdoors, indoors)</p>
                                        <p className='content-study'>      ♦ Vị trí của các vật ( in front of, behind)</p>
                                        <p className='content-study' id='study-for-test-four'>        ♦ Quan sát sự vật trung tâm ( the  tree, the road..)
                                        </p>
                                        <p className='content-study'>       ♦ Quan sát sự tương quan giữa vật trung tâm và những thứ xung quanh: trees on both sides..</p>
                                        <p className='content-study'>           ♦ Quan sát trạng thái của vật trung tâm: quite, noisy..</p>

                                        <span className='title-study'> IV. Các bẫy thường xuất hiện trong TOEIC part 1</span>

                                        <p className='content-study'> ♦ Chỉ chọn đáp án có xuất hiện trong hình, nếu không có không được suy diễn</p>
                                        <p className='content-study'>  ♦ Hình có 1 người: Nếu đáp án là số nhiều =loại</p>
                                        <p className='content-study'>  ♦ Tập trung vào những đáp án có “V-ing”</p>
                                        <p className='content-study'>   ♦ Hình chỉ có vật, hình phong cảnh: Nếu đáp án có người ( danh từ, đại từ)=loại</p>
                                        <p className='content-study'>  ♦ Đáp án có being = loại</p>
                                        <p className='content-study'> ♦ Cẩn thận với các âm dễ gây nhầm lẫn: Đây là một cách để bẫy thí sinh, trong bài sẽ sử dụng các từ có âm tương tự nhưng nghĩa hoàn toàn khác nhau, ví dụ như first/fast, raise/ erase, dock/duck, filed/piled, plant/plan, track/crack/rack, rain/train/drain,v.v. Việc nắm vững phát âm của từ dùng để miêu tả bức tranh là rất quan trọng.</p>
                                        <p className='content-study'>  ♦ Trong bài nghe toeic part 1, tranh để các bạn nghe đều là tranh đen trắng, do đó, nếu trong băng nghe có tính từ chỉ màu sắc = Loại</p>
                                        <p className='content-study'>   ♦ Trong bài nghe toeic part 1, tranh để các bạn nghe đều là tranh đen trắng, do đó, nếu trong băng nghe có tính từ chỉ màu sắc = Loại</p>
                                        <p className='content-study'>      ♦ Có 3 hạng mục cần chú ý khi nghe tranh: Các đồ vật xung quanh bức tranh, những hành động trong tranh và cuối cùng là nơi chốn. Và cái bẫy chúng ta có lẽ dễ nhận ra nhất trong ba điều cần chú ý ở trên là nơi chốn. Vì chúng ta không thể biết nhân vật trong tranh hay khung cảnh trong tranh đang diễn ra ở đâu, trong viện bảo tang, hay thư viện hoặc bất cứ không gian nào khác. Mà chỉ có thể xác định được nó ở bên trong (inside) hoặc ngoài trời (outside) mà thôi. Do đó nếu có từ nào xuất hiện trong băng nghe mà có xác định nơi chốn, thì chắc chắn đó là dáp án sai = Loại</p>
                                        <p className='content-study'>   ♦ Trong bài nghe part 1 nếu xuất hiện từ Overlook = Lựa chọn</p>
                                        <p className='content-study'>    ♦ Vật nào bị cắt hoặc không rõ ràng thì đáp án sẽ không bao giờ rơi vào câu đó</p>
                                        <p className='content-study'>    ♦ Tả vật thường thể hiện dưới dạng bị động (bị tác động) do đó câu thường chia ở câu bị động.</p>
                                        <p className='content-study'>     ♦ Miêu tả Hành động giống nhau của 2 người đàn ông và 2 người phụ nữ mà bắt đầu là “a” là sai, vì phải sử dụng ở dạng “the”.</p>
                                        <p className='content-study'>   ♦ Nếu bức tranh là dạng bao quát, có không gian đủ rộng thì cần chú ý tới tất cả những đồ vật hoặc quang cảnh xung quanh nữa vì có một số tranh dù có nhiều người và làm nhiều hành động nhưng đáp án lại miêu tả vật</p>
                                        <p className='content-study'>
                                            ♦ Nếu tranh không có người, bạn cần xác định những gì đập vào mắt bạn đầu tiên trong tranh. Khả năng rất cao là những vật đó sẽ xuất hiện trong các phương án đúng</p>
                                        <p className='content-study'>   ♦ Nếu tranh zoom sát lại và thấy rõ người, người gần với mắt chúng ta nhất thì đáp án thường liên quan tới trang phục của người đó như wearing a T-shirt, long sleeved shirt, skirt. Đặc biệt bạn cần nghe được từ “put on” và “wear</p>
                                        <p className='content-study'>    ♦ Để ý vị trí của vật và người nếu bức tranh có cả người và vật, đáp án hay lừa vị trí của vật và người, đáng lẽ ra người đứng bên trái vật nhưng đáp án lại miêu tả là bên phải.

                                            Mặc dù yêu cầu và tốc độ đọc ở part 1 toeic không hề khó nhưng để đạt được số điểm tối đa ở phần thi này thì lại không dễ. Sẽ thật tiếc nuối nếu bạn không thể đạt được kết quả như ý trong phần nghe này vì đây là phần thi dễ lấy điểm nhất trong 4 phần nghe, giúp thí sinh cải thiện đáng kể điểm số trong bài thi Listening của mình.</p>

                                        <p className='content-study-two'>  Ví dụ luyện tập :</p>
                                        <p className='content-study-two'>    Bạn sẽ nghe:</p>

                                        <p className='content-study'>  (A): They{`'`}re looking out of the window</p>
                                        <p className='content-study'>  (B): They{`'`}re having a meeting</p>
                                        <p className='content-study' id='study-for-test-five'>  (C): They{`'`}re eating in a restaurant</p>
                                        <p className='content-study'>  (D): They{`'`}re moving the furniture</p>

                                        <p className='content-study-two'>Phương án (B)-They{`'`}re having a meeting mô tả đúng nhất nội dung bức tranh, vì vậy chọn phương án (B)</p>
                                        <p className='content-study-two'>   Mẹo làm bài:</p>

                                        <p className='content-study'> {'-'} Xem ảnh trước khi nghe mô tả. Tự đặt các câu hỏi “Ai?”, “Cái gì?”, “Ở đâu?”.</p>
                                        <p className='content-study'> {'-'} Tập trung nghe hiểu nghĩa của cả câu.</p>
                                        <p className='content-study'> {'-'} Trả lời câu hỏi càng nhanh càng tốt. Nếu không biết cách trả lời, bạn nên đoán câu trả lời rồi chuyển sang xem trước ảnh kế tiếp.</p>

                                        <p className='content-study-two'>  Bẫy trong câu hỏi này:</p>

                                        <p className='content-study'>  {'-'} Các lựa chọn sai có thể chứa các từ phát âm giống nhau</p>
                                        <p className='content-study'>  {'-'} Các lựa chọn sai có thể có các đại từ, con số, hay địa điểm sai</p>
                                        <p className='content-study'> {'-'} Các lựa chọn sai có thể chứa một từ đúng</p>
                                        <span className='title-study'> V. Luyện Part 1 TOEIC tại TOIECFREE</span>
                                    </div>
                                </>
                                :
                                <>
                                </>}
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
        content: ` Tại đây bạn có thể xem từ từng tham khảo phần thi Part 1.`
    },
    {
        selector: '[data-tut="reactour__option_2"]',
        content: ` Tại đây bạn có thể xem ngữ pháp tham khảo phần thi Part 1.`
    },
    {
        selector: '[data-tut="reactour__option_3"]',
        content: ` Tại đây bạn có thể xem  mẹo thi tham khảo phần thi Part 1.`
    },
    {
        selector: '[data-tut="reactour__option_4"]',
        content: ` Tại đây bạn có thể xem  hướng dẫn tham khảo phần thi Part 1.`
    },
    {
        selector: '[data-tut="reactour__option_5"]',
        content: ` Tại đây bạn có thể luyện thi phần thi Part 1.`
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailStudyListenExercise));
