import React from "react";
import { withRouter } from "react-router";
import './HomePage.scss';
import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';
import * as Icon from 'react-bootstrap-icons';
import CardProfile from "./CardProfile";
import AnimatedText from 'react-animated-text-content';
import { Chart } from "react-google-charts";
import AOS from 'aos';
import 'aos/dist/aos.css';
import Overlay from 'react-bootstrap/Overlay';
import Button from 'react-bootstrap/Button';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const AutoplaySlider = withAutoplay(AwesomeSlider);
const slider = (
    <AutoplaySlider
        // play={true}
        cancelOnInteraction={false} // should stop playing on user interaction
        interval={3000}
    >

        <div data-src="https://www.anhngumshoa.com/uploads/images/userfiles/lo_trinh_hoc_toeic_4_ky_nang.jpg" />
        <div data-src="https://static.anhnguathena.vn/anhngu//img.media/800x400.jpg" />
        <div data-src="https://image.winudf.com/v2/image/YXdhYmUuYXBwLnRvZWljcHJvX3NjcmVlbl8xNl8xNTEwMzI0MDEzXzA1Nw/screen-16.jpg?fakeurl=1&type=.jpg" />

    </AutoplaySlider>
)
// const scrollCounter = document.querySelector('.js-scroll-counter');
// window.addEventListener('scroll', function () {
//     scrollCounter.innerHTML = window.pageYOffset;
// });
export const data = [
    ["Language", "Speakers (in millions)"],
    ["Không Có Chứng Chỉ Toeic", 2],
    ["TOEIC", 8],

];
export const options = {
    legend: "none",
    pieSliceText: "label",
    // title: "Swiss Language Use (100 degree rotation)",
    pieStartAngle: 100,
};
export const data1 = [
    ["Task", "Hours per Day"],
    ["IELTS", 11],
    ["TOEIC", 2],
    ["CEFR", 2],
    ["TOEFL", 2],
    ["ESOL", 3],
    ["SAT", 4],
    ["TESOL", 5],
];

export const options1 = {
    // title: "My Daily Activities",
    is3D: true,
};
export const data2 = [
    ["Task", "Hours per Day"],
    ["Bank", 11],
    ["Air", 2],
    ["Travel", 2],
    ["Economy", 2],
    ["Counselors", 7], // CSS-style declaration
    ["IT", 13],
    ["Logictic", 7],
];

export const options2 = {
    // title: "My Daily Activities",
    pieHole: 0.4,
    is3D: false,
};
// AOS.init({
//     offset: 200,
//     duration: 800,
//     easing: 'ease-in-out-sine',
//     delay: 200,
//     mirror: true
// });
export const data3 = [
    ["Language", "Speakers (in millions)"],
    ["TOEIC", 7],
    ["Chứng Chỉ Khác", 3],


];
export const options3 = {
    legend: "none",
    pieSliceText: "label",
    // title: "Swiss Language Use (100 degree rotation)",
    pieStartAngle: 100,
};
class HomePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {


        };
    }

    componentDidMount() {
        AOS.init({

            duration: 1200,
            once: true

        });
    }
    popover = (
        <Popover id="popover-basic">
            <Popover.Header as="h3">Cập Nhật Đề Thi</Popover.Header>
            <Popover.Body>
                <h5 className="text-center   ">Các bộ đề thi TOEIC quốc tế, ETS... luôn được cập nhật liên tục và thường xuyên.</h5>
            </Popover.Body>
        </Popover>
    );
    popoverskill = (
        <Popover id="popover-basic">
            <Popover.Header as="h3">Nâng Cao Kỹ Năng</Popover.Header>
            <Popover.Body>
                <h5 className="text-center   ">Rèn luyện 2 kỹ năng TOEIC Reading và TOEIC Listening nhanh nhất.</h5>
            </Popover.Body>
        </Popover>
    );
    popoverExam = (
        <Popover id="popover-basic">
            <Popover.Header as="h3">Đề Thi</Popover.Header>
            <Popover.Body>
                <h5 className="text-center   ">Sau khi làm bài bạn có thể kiểm tra đáp án, giải thích chi tiết từng đáp án.</h5>
            </Popover.Body>
        </Popover>
    );
    popoverGrammar = (
        <Popover id="popover-basic">
            <Popover.Header as="h3">Ngữ Pháp</Popover.Header>
            <Popover.Body>
                <h5 className="text-center   ">Các Bài Ngữ Pháp Phổ Biển Phù Hợp Với Luyện Và Thi Toeic</h5>
            </Popover.Body>
        </Popover>
    );
    renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props} >
            <p className="show-update" style={{ fontSize: '20px' }}>Các bộ đề TOEIC quốc tế, ETS... luôn được cập nhật liên tục và thường xuyên.</p>
        </Tooltip>
    );
    render() {
        let settings = {
            autoplay: true,
            dots: true,
            infinite: true,
            speed: 200,
            slidesToShow: 1,
            slidesToScroll: 1,

        };
        return (
            <React.Fragment>

                <div className="slider-home-container">
                    <div className="slider-content ">


                        <Slider {...settings}>
                            <div className=""><img src="https://media.zim.vn/610abb9592067e001e3df9fd/Gi%E1%BB%9Bi-thi%E1%BB%87u-v%E1%BB%81-b%C3%A0i-thi-TOEIC-Speaking-01.jpg"></img></div>
                            <div className=""><img src="https://e4life.vn/wp-content/uploads/2021/04/cau-truc-de-thi-toeic.jpg"></img></div>
                            <div className="">   <img src="https://anu.edu.vn/wp-content/uploads/2021/05/TOEIC.png"></img></div>
                            <div className="">   <img src="https://bloganchoi.com/wp-content/uploads/2022/02/luyen-thi-toeic.jpg"></img></div>
                            <div className=""><img src="https://easyeducation.vn/wp-content/uploads/2021/03/easy-edu-bi-quyet-luyen-thi-toeic-cho-nguoi-moi-bat-dau.png"></img></div>
                        </Slider>
                    </div>
                </div>
                <div className="d-flex justify-content-center m-10">
                    <AnimatedText
                        type="chars" // animate words or chars
                        animation={{
                            x: '200px',
                            y: '-20px',
                            scale: 1.1,
                            ease: 'ease-in-out',
                        }}
                        animationType="bounce"
                        interval={0.06}
                        duration={0.8}
                        tag="h1"
                        className="animated-paragraph font-weight-bold"
                        includeWhiteSpaces
                        threshold={0.1}
                        rootMargin="20%"
                    >
                        Tại Sao Nên Chọn ToeicFree
                    </AnimatedText>
                </div>
                <div className="background-whyselect-toeic">
                    <div className="card-whyselect d-flex justify-content-center">
                        <OverlayTrigger trigger="click" placement="top" overlay={this.popover}>
                            <div className="col-sm-3 border m-5 update-exam " >
                                <div className="d-flex justify-content-center m-3">
                                    {/* <Icon.ArrowRepeat size={70} color="red" className="rounded-circle" /> */}
                                    <div className="img-update"></div>
                                </div>
                                <div className="d-flex justify-content-center">
                                    <h3 className="text-center"> Cập Nhật Liên Tục</h3>
                                </div>
                            </div>
                        </OverlayTrigger>
                        <OverlayTrigger trigger="click" placement="top" overlay={this.popoverskill}>
                            <div className="col-sm-3 border m-5 skill-exam" > <div className="" >
                                <div className="d-flex justify-content-center m-3">
                                    {/* <Icon.ArrowUpRightCircle size={70} color="#e97d0e" /> */}
                                    <div className="skill-exam-img"></div>
                                </div>
                                <div className="d-flex justify-content-center">
                                    <h3 className="text-center">Nâng Cao Kỹ Năng</h3>
                                </div>
                            </div>
                            </div>
                        </OverlayTrigger>
                    </div>
                    <div className="card-whyselect d-flex justify-content-center">
                        <OverlayTrigger trigger="click" placement="top" overlay={this.popoverExam}>
                            <div className="col-sm-3 border m-5 exam-detail">
                                <div className="d-flex justify-content-center m-3">
                                    <div className="exam-detail-img"></div>
                                </div>

                                <div className="d-flex justify-content-center">
                                    <h3 className="text-center">Đề Thi Có Đáp Án Và Giải Thích</h3>
                                </div>

                            </div>
                        </OverlayTrigger>

                        <OverlayTrigger trigger="click" placement="top" overlay={this.popoverGrammar}>
                            <div className="col-sm-3 border m-5  grammar-exam">
                                <div className="d-flex justify-content-center m-3">
                                    <div className="grammar-exam-img"></div>
                                </div>

                                <div className="d-flex justify-content-center">
                                    <h3 className="text-center">Ngữ Pháp Phổ Biến</h3>
                                </div>

                            </div>
                        </OverlayTrigger>
                    </div>
                </div>
                <div className="background-chart">
                    <h1 className="text-center m-4 importance">Tầm Quan Trọng Của TOEIC</h1>
                    <div className="chart-statistical" style={{ margin: '10px' }}>

                        <div className="col-sm-3">

                            <Chart
                                chartType="PieChart"
                                data={data}
                                options={options}
                                width={"100%"}
                                height={"400px"}
                            />
                            <p className="text-center education-deparment">Tăng Tỉ Lệ Việc Làm</p>
                        </div>
                        <div className="description-education-deparment">
                            <p className="content-education-deparment">TOEIC 4 kỹ năng khá phổ biến ở các nước phát triển như Hàn Quốc, Nhật Bản, Đài Loan… Việt Nam đang đi sau khi mới chỉ phổ biến 2 kỹ năng nền tảng là nghe, đọc.

                                Hiện một số doanh nghiệp Việt Nam bắt đầu quan tâm tới TOEIC Speaking và Writing. Một số trường Đại học cũng đang thử nghiệm chuẩn hóa TOEIC Speaking Writing như Học viện Ngoại giao, Đại học Kinh tế quốc dân…

                                Với TOEIC 4 kỹ năng, bài thi Speaking có 11 câu hỏi với nhiều dạng như đọc to văn bản, mô tả tranh, trả lời câu hỏi, đưa ra giải pháp, trình bày quan điểm... Bài thi Writing gồm viết câu, emai, viết luận trình bày quan điểm. Nó yêu cầu ngữ pháp, từ vựng phong phú và văn phong chuyên nghiệp.</p>
                            <a className="more-education-deparment" href="https://vnexpress.net/tang-co-hoi-viec-lam-voi-toeic-4-ky-nang-3612146.html">Xem thêm{'>>'}</a>
                        </div>
                        <div className="description-go-working">
                            <p className="content-go-working">
                                Chứng chỉ TOEFL IBT, TOEIC, hay IELTS đều là những chứng chỉ quốc tế, được sử dụng để đánh giá năng lực tiếng Anh của người thi theo mục đích và tiêu chí riêng.
                                Điểm tương đồng của các chứng chỉ này đều có hạn sử dụng là 2 năm. Sau thời hạn 2 năm các bạn sẽ phải thi lại theo yêu cầu của cơ quan,
                                đơn vị bạn làm việc.
                                Việc thi IELTS, TOEIC hay TOEFL IBT sẽ không có áp lực đỗ hay trượt như việc thi đại học hay các cuộc thi khác.
                                Các chứng chỉ đều đánh giá khả năng tiếng Anh của bạn thông qua thang điểm cụ thể. Tùy theo mục đích làm việc,
                                học tập hay định cư mà bạn có thể lựa chọn chứng chỉ phù hợp cho mình. Tại Việt Nam, các chứng chỉ này đã được sử dụng trong thi tốt nghiệp
                                và là tiêu chí</p>
                            <a className="more-go-working" href="https://ihoctot.com/bang-so-sanh-cac-chung-chi-tieng-anh">Xem thêm{'>>'}</a>
                        </div>
                        <div className="col-sm-3">
                            <Chart
                                chartType="PieChart"
                                data={data1}
                                options={options1}
                                width={"100%"}
                                height={"400px"}
                                margin={"10px"}
                            />
                            <p className="text-center go-working">Chất Lượng So Với Các Chứng Chỉ Khác</p>
                        </div>
                    </div>
                    <div className="chart-statistical" style={{ margin: '10px' }}>

                        <div className="col-sm-3">
                            <Chart
                                chartType="PieChart"
                                data={data2}
                                options={options2}
                                width={"100%"}
                                height={"400px"}
                            />
                            <p className="text-center graduation-standards"> Áp Dụng Phổ Biến Mọi Ngành Nghề</p>
                        </div>
                        <div className="description-graduation-standards">
                            <p className="content-graduation-standards">
                                Với mức độ phổ biến của Tiếng Anh như hiện nay, thì chứng chỉ TOEIC không còn xa lạ gì với chúng ta nữa.
                                Đây được coi là một bài thi đánh giá khá chính xác khả năng sử dụng Tiếng Anh trong công việc của thí sinh.
                                Vì vậy, hiện nay có rất nhiều ngành nghề đã sử dụng TOEIC như một công cụ để đánh giá sự phù hợp của các ứng viên với vị trí tuyển dụng.
                                1. Ngành Hàng không
                                Đây là một ngành nghề thường xuyên phải tiếp xúc với người nước ngoài, chính vì vậy việc phải sử dụng Tiếng Anh trong công việc là điều không thể tránh khỏi. Hiện nay, các vị trí như tiếp viên hàng không, nhân viên phục vụ, phi công… tại một số hãng như Vietnam Airlines, Vietjet Air, Jetstar… thường yêu cầu..</p>
                            <a className="more-graduation-standards" href="https://sununi.edu.vn/nhung-nganh-nghe-nao-can-bang-toeic-nam-bat-co-hoi-nghe-nghiep-voi-chung-chi-toeic/">Xem thêm{'>>'}</a>
                        </div>
                        <div className="description-application-popular">
                            <p className="content-application-popular">
                                Trước đây tại Việt Nam, nhiều công ty, doanh nghiệp, tổ chức ... thường sử dụng chứng chỉ tiếng Anh phân chia theo cấp độ A,B,C như một tiêu chí ngoại ngữ để đưa ra quyết định
                                về tuyển dụng, bổ nhiệm, sắp xếp nhân sự hoặc bố trí nhân viên tu nghiệp tại nước ngoài. Tuy nhiên trong khoảng 7 năm trở lại đây, chứng chỉ TOEIC nổi lên như một tiêu chuẩn phổ biến hơn để
                                đánh giá trình độ tiếng Anh. Xuất phát từ thực tế đó, nhiều trường Đại học, Cao đẳng đã đưa TOEIC vào chương trình giảng dạy theo dõi sự tiến bộ đối với sinh viên theo từng học kỳ, năm học hoặc sử dụng
                                để làm chuẩn đầu ra tiếng Anh cho sinh viên tốt nghiệp. Chính vì những lí do đó nên việc học TOEIC, luyện thi TOEIC và tham dự.
                            </p>
                            <a className="more-application-popular" href="https://hungvuongtech.edu.vn/tuyen-sinh/chung-chi-toeic/">Xem thêm{'>>'}</a>
                        </div>
                        <div className="col-sm-3">
                            <Chart
                                chartType="PieChart"
                                data={data3}
                                options={options3}
                                width={"100%"}
                                height={"400px"}
                            />
                            <p className="text-center application-popular">Tiêu Chuẩn Tốt Nghiệp</p>
                        </div>
                    </div>



                </div>
                <CardProfile />

            </React.Fragment>
        )
    }

}

export default withRouter(HomePage);
