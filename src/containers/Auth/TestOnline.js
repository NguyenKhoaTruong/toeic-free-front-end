import React, { Component } from 'react';
import './TestOnline.scss';
import Nav from '../../routes/Nav';
import Footer from '../../routes/Footer';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import NoteUser from './NoteUser';
class TestOnline extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        const { isLoggedIn, userInfo } = this.props
        return (
            <div>
                <Nav />
                <NoteUser />
                <div className='background-testonline'>
                    <div className='testonline'>
                        <div className="row">

                            <div className="col-9">

                                <div className='content-testonline border' style={{ marginLeft: '50px' }} >

                                    <p className='text-center'> <h4>Cấu Trúc Đề Thi TOEIC : Tất Cả 7 Phần Nghe Và Đọc</h4></p>
                                    <p>Kỳ thi TOEIC thông thường ở Việt Nam mà chúng ta hay nhắc đến là bài thi TOEIC Nghe và Đọc. Bài thi TOEIC Nói và Viết chỉ chuyên dành cho cơ quan, đơn vị có yêu cầu cụ thể điểm kỹ năng Nói và Viết. </p>
                                    <p>Vì vậy Tiếng Anh Mỗi Ngày sẽ trình bày cấu trúc bài thi TOEIC Nghe và Đọc ở trong pbài viết này thôi các bạn nhé.</p>
                                    <p>Đi thi TOEIC mà không biết cấu trúc đề thi TOEIC thì cứ như đi đánh trận mà không biết kẻ thù là ai vậy.</p>
                                    <p>Nếu muốn đạt được điểm cao trong kỳ thi Toeic thì ta phải biết được cấu trúc đề thi là gì để từ đó lên được chiến lược học và luyện thi TOEIC hiệu quả chứ nhỉ! </p>
                                    <ul><b>Mục lục</b>
                                        <li>Cấu trúc đề thi TOEIC 2022</li>
                                        <li>Cấu trúc Phần Nghe (Listening)</li>
                                        <li id='testonline-one'>Cấu trúc Phần Đọc (Reading)</li>
                                        <li>Một số ghi chú khi đi thi</li>
                                        <li>Những chủ đề phổ biến trong đề thi TOEIC</li>
                                    </ul>
                                    <h5 >1. Cấu trúc đề thi TOEIC</h5>
                                    <p>Đề thi TOEIC gồm 2 phần là Listening (Nghe Hiểu) và Reading (Đọc Hiểu), với mỗi phần gồm 100 câu trắc nghiệm.</p>
                                    <p>Thời gian thi TOEIC là 45 phút cho Listening và 75 phút cho Reading. </p>
                                    <p>Như vậy, tổng thời gian làm bài là 2 giờ đồng hồ cho 200 câu hỏi trắc nghiệm. Cấu trúc đề thi TOEIC khá đơn giản phải không nào!</p>
                                    <p className='text-center'>
                                        <img src='https://e4life.vn/wp-content/uploads/2021/04/cau-truc-bai-thi-toeic-1.jpg'></img>
                                    </p>
                                    <p>Tổng điểm tối đa cho mỗi phần thi là 495 điểm.</p>
                                    <p>Vậy nghĩa là điểm tối đa cho cả bài thi TOEIC là 990 chứ không phải 1000 như một số bạn lầm tưởng. </p>
                                    <p id='testonline-two'>Cách tính điểm TOEIC dựa trên các câu đúng rồi quy thành điểm tương ứng và không trừ điểm cho những câu sai.</p>
                                    <p>Các bạn muốn hiểu rõ về cách tính điểm TOEIC để có kế hoạch luyện thi TOEIC phù hợp hay để biết mình có nên luyện thi TOEIC cấp tốc hay không thì có thể đọc bài về Thang điểm TOEIC nhé!</p>
                                    <h5>2. Cấu trúc bài thi TOEIC - Phần Listening (Nghe Hiểu)</h5>
                                    <p>Phần Listening (Nghe hiểu): gồm 4 phần (từ Part 1 đến Part 4) với 100 câu làm trong thời gian là 45 phút. </p>
                                    <p>Thí sinh lần lượt nghe từ Part 1 đến Part 4. Khi kết thúc phần Listening bạn sẽ được thông báo.</p>
                                    <p>Khác với nhiều kỳ thi khác, giọng đọc trong bài thi TOEIC là của nhiều nước nói tiếng Anh, trải đều từ Mỹ, Canada, Anh đến cả Úc và New Zealand. </p>
                                    <p> Do đó mà để làm tốt phần Listening, trong quá trình luyện nghe TOEIC, bạn phải chịu khó luyện nghe thêm cả giọng Anh và Úc thì mới tự tin làm bài được.</p>
                                    <p>Cấu trúc bài thi TOEIC phần Listening có chi tiết như sau:</p>
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col"> Phần Listening</th>
                                                <th scope="col">Nội dung</th>
                                                <th scope="col">Số câu</th>
                                                <th scope="col">Mô tả chi tiết</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th scope="row">Part 1</th>
                                                <td>Mô Tả Hình Ảnh</td>
                                                <td>6</td>
                                                <td>
                                                    <p>  Bạn sẽ xem một bức hình → Nghe 4 lựa chọn A, B, C, D → Chọn một đáp án mô tả chính xác nhất nội dung có trong hình.</p>
                                                    <p>  Thời gian dừng giữa 2 câu là 5 giây.</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Part 2</th>
                                                <td>Hỏi - Đáp</td>
                                                <td>25</td>
                                                <td>
                                                    <p>Bạn sẽ nghe một câu hỏi hoặc một câu nói.</p>
                                                    <p>→ Nghe tiếp 3 câu trả lời / hồi đáp lại câu trên (tương ứng với 3 lựa chọn A, B, C)</p>
                                                    <p>→ Chọn một câu hồi đáp phù hợp nhất cho câu hỏi.</p>
                                                    <p>Thời gian dừng giữa 2 câu là 5 giây.</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Part 3</th>
                                                <td id='testonline-three'>Đoạn Hội Thoại</td>
                                                <td>39
                                                    (ứng với 13 đoạn hội thoại, mỗi đoạn 3 câu hỏi)</td>
                                                <td>
                                                    <p>Bạn sẽ lắng nghe các đoạn hội thoại ngắn giữa hai người → Với mỗi đoạn sẽ có 3 câu hỏi, mỗi câu hỏi có 4 lựa chọn A, B, C, D.</p>
                                                    <p>Bạn đọc câu hỏi và chọn câu trả lời phù hợp nhất cho câu hỏi.</p>
                                                    <p>Thời gian dừng giữa mỗi câu hỏi là 8 giây.</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Part 4</th>
                                                <td>Bài Nói Chuyện Ngắn (độc thoại)</td>
                                                <td>30
                                                    (ứng với 10 bài độc thoại, mỗi đoạn 3 câu hỏi)</td>
                                                <td>
                                                    <p>Bạn sẽ lắng nghe các bài nói chuyện ngắn (độc thoại) → Với mỗi đoạn sẽ có 3 câu hỏi, mỗi câu hỏi có 4 lựa chọn A, B, C, D.</p>
                                                    <p>Bạn đọc câu hỏi và chọn câu trả lời phù hợp nhất cho câu hỏi.</p>
                                                    <p>Thời gian dừng giữa mỗi câu hỏi là 8 giây.</p>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <h5>3. Cấu trúc bài thi TOEIC - Phần Reading (Đọc Hiểu)</h5>
                                    <p>Phần Reading (Đọc hiểu): gồm 3 phần (từ Part 5 đến Part 7) với 100 câu làm trong thời gian là 75 phút. </p>
                                    <p> Dù đề thi TOEIC trình bày các câu hỏi theo thứ tự từ Part 5 đến Part 7, nhưng trong phần Reading này thí sinh được phép làm bất cứ câu nào trước cũng được.</p>
                                    <p>Nhưng lưu ý với bạn là, một khi đã chuyển qua thời gian cho phần Reading rồi thì bạn không được trở lại và đánh dấu vào phần Listening nữa, nếu không sẽ bị phạm quy đấy!</p>
                                    <p>Cấu trúc bài thi TOEIC phần Reading có chi tiết như sau:</p>
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col"> Phần Reading</th>
                                                <th scope="col">Nội dung</th>
                                                <th scope="col">Số câu</th>
                                                <th scope="col">Mô tả chi tiết</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th scope="row">Part 5</th>
                                                <td>Câu Không Hoàn Chỉnh</td>
                                                <td>30</td>
                                                <td>
                                                    <p> Bạn sẽ được cho một câu có một chỗ trống</p>
                                                    <p> → Chọn một đáp án phù hợp nhất để điền vào chỗ trống.</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Part 2</th>
                                                <td>Hỏi - Đáp</td>
                                                <td>25</td>
                                                <td>
                                                    <p>Bạn sẽ nghe một câu hỏi hoặc một câu nói.</p>
                                                    <p>→ Nghe tiếp 3 câu trả lời / hồi đáp lại câu trên (tương ứng với 3 lựa chọn A, B, C)</p>
                                                    <p>→ Chọn một câu hồi đáp phù hợp nhất cho câu hỏi.</p>
                                                    <p>Thời gian dừng giữa 2 câu là 5 giây.</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Part 6</th>
                                                <td>Hoàn Thành Đoạn Văn</td>
                                                <td>16
                                                    (ứng với 4 đoạn văn, mỗi đoạn 4 câu hỏi)</td>
                                                <td>
                                                    <p>Bạn sẽ được cho một đoạn văn có nhiều chỗ trống → Chọn một đáp án phù hợp nhất để điền vào chỗ trống.</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Part 7</th>
                                                <td>
                                                    <tr>
                                                        <td id='testonline-four'>Đọc Hiểu: Đoạn Đơn</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Đọc Hiểu: Nhiều Đoạn</td>
                                                    </tr>
                                                </td>
                                                <td>
                                                    <tr>
                                                        <td>29(ứng với 10 bài: mỗi bài có 1 đoạn văn và 2-4 câu hỏi)</td>
                                                    </tr>
                                                    <tr>
                                                        <td>25(ứng với 5 bài: 2 bài có 2 đoạn văn, 3 bài có 3 đoạn văn, mỗi bài có 5 câu hỏi) </td>
                                                    </tr>
                                                </td>
                                                <td>
                                                    <tr>
                                                        <td>
                                                            <p>Bạn sẽ được cho 10 bài đọc với mỗi bài gồm 1 đoạn văn. </p>
                                                            <p> Số lượng câu hỏi cho mỗi bài đọc dao động từ 2 đến 4 câu → Bạn đọc câu hỏi và chọn câu trả lời phù hợp nhất cho câu hỏi.</p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <p>Bạn sẽ được cho 5 bài đọc với mỗi bài có từ 2 đến 3 đoạn văn.</p>
                                                            <p>Mỗi bài đọc có 5 câu hỏi. → Bạn đọc câu hỏi và chọn câu trả lời phù hợp nhất cho câu hỏi.</p>
                                                        </td>
                                                    </tr>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <h5>4. Một số ghi chú khi đi thi</h5>
                                    <p>Như vậy là, mỗi câu hỏi trong đề thi TOEIC bao gồm 4 lựa chọn là A - B - C - D, riêng Phần 2 thuộc Listening chỉ có 3 lựa chọn A - B - C.</p>
                                    <p>hí sinh không được làm trên đề thi mà sẽ đánh dấu câu trả lời trên Phiếu trả lời (Answer Sheet TOEIC) bằng cách dùng bút chì tô vào đáp án mình chọn.</p>
                                    <p>Phiếu trả lời tách biệt hoàn toàn với tập đề thi.</p>
                                    <p id='testonline-five'>Lưu ý là các bạn bắt buộc phải dùng bút chì 2B, không được dùng viết mực hoặc bút chì loại khác để làm bài.</p>
                                    <p>Viết chì cùng với gôm tẩy sẽ được phát cho bạn trước khi vào phòng thi nên các bạn không cần phải chuẩn bị trước.</p>
                                    <h5>5. Những chủ đề phổ biến trong bài thi TOEIC</h5>
                                    <p>Như đã đề cập sơ lược ở bài TOEIC là gì, nội dung đề thi TOEIC sẽ xoay quanh những kiến thức và từ vựng thuộc những tình huống đời thường và ở môi trường công sở.</p>
                                    <p>Dưới đây là một số chủ đề cụ thể trong bài thi TOEIC:</p>
                                    <p>Vì bài thi TOEIC chủ yếu bao gồm những tình huống đời thường và ở môi trường công sở, nên trong quá trình luyện thi TOEIC.</p>
                                    <p>Các bạn không cần phải đọc những sách báo hay tài liệu quá cao siêu như để luyện TOEFL hay IELTS.</p>
                                    <p>Các bạn có thể chọn xem những TV series sitcom về cuộc sống thường ngày, điển hình nhất là series Friends, vốn rất quen thuộc với các bạn.</p>
                                    <p>Hy vọng bài viết đã giúp bạn hiểu rõ cấu trúc đề thi TOEIC, thời gian thi TOEIC, cũng như nội dung của 7 phần thi và các tình huống thường xuyên xuất hiện trong đề thi.</p>
                                    <p> Vậy bây giờ hãy cùng bắt tay vào việc luyện thi TOEIC thôi!</p>
                                    <p className='text-center'>  <iframe width="560" height="315"
                                        src="https://www.youtube.com/embed/YRzSsjUORP8?controls=0"
                                        title="YouTube video player"
                                        frameborder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowfullscreen>

                                    </iframe></p>
                                </div>


                            </div>
                            <div className="col-3">
                                <div className='main-content-nav-testonine m-3 '>
                                    <div className='main-content border m-3'>
                                        <span className='span-main-content'> Nội dung:</span>
                                        <ul>
                                            <li className='li-main-content'><a href="#testonline-one">1. Cấu trúc đề thi TOEIC</a></li>
                                            <li className='li-main-content'><a href="#testonline-two">2. Cấu trúc bài thi TOEIC - Phần Listening (Nghe Hiểu).</a></li>
                                            <li className='li-main-content'><a href="#testonline-three">3. Cấu trúc bài thi TOEIC - Phần Reading (Đọc Hiểu).</a></li>
                                            <li className='li-main-content'><a href="#testonline-four">4. Một số ghi chú khi đi thi.</a></li>
                                            <li className='li-main-content'><a href="#testonline-five">5. Những chủ đề phổ biến trong bài thi TOEIC.</a></li>
                                        </ul>
                                        <div className="p-2 border"><Link to='/list-exam-test' style={{ textDecoration: 'none', fontSize: '20px' }} >Làm Bài Thi Thử Ngay!</Link></div>
                                    </div>
                                </div>

                            </div>
                        </div></div>
                </div>
                <Footer />

            </div>

        )
    }
}
const mapStateToProps = state => {
    return {

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TestOnline));
