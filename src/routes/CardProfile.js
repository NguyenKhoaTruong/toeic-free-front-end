import React from "react";

import './CardProfile.scss';
import { Carousel, Item, Caption } from 'react-bootstrap'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AOS from 'aos';
import 'aos/dist/aos.css';
import {
    createNewRateService,
    getAllRate
} from '../services/userService';
import { toast } from 'react-toastify';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
AOS.init({
    offset: 120,
    duration: 1200,
    easing: 'ease-in-out-sine',
    delay: 0,
    mirror: true
});

class CardProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rate: '',
            userid: '',
            arrRate: [],
            arrRateImg: []
        };
    }
    async componentDidMount() {
        await this.getAllRate();
        await this.getAllImageRate();
    }
    getAllRate = async () => {
        let response = await getAllRate('ALL');
        if (response && response.errCode === 0) {
            this.setState({
                arrRate: response.usersRate.data,
            });
            // toast.success("get all user succedd");
        }
        console.log('get user from node js carrdprogile:', response)
    }
    getAllImageRate = async () => {
        let response = await getAllRate('ALL');
        if (response && response.errCode === 0) {
            this.setState({
                arrRateImg: response.usersRate.data.userDataRate,
            });
            // toast.success("get all user succedd");
        }
        console.log('get user from node js 123123 :', response)
    }
    onChangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
        console.log('check input good code', copyState)
    }
    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['rate']
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert('Chưa Nhập :' + ' ' + arrCheck[i])
                break;
            }
        }
        return isValid;
    }

    handleAddNewRate = () => {
        let isValid = this.checkValidateInput();
        if (isValid === false) return;
        console.log('checl submit state', this.state);
        createNewRateService({
            rate: this.state.rate,
            userid: this.props.userInfo.id,
        });

        this.getAllRate();
        this.setState({
            rate: '',
        })

        // this.props.history.go('/')
        toast.success("Đánh Giá Của Bạn Đã Được Ghi Nhận");
    }
    render() {
        const { isLoggedIn, userInfo } = this.props;

        let arrRate = this.state.arrRate;
        let arrRateImg = this.state.arrRateImg;
        console.log('check get all arrRateImg', arrRateImg)
        console.log('check get all rate', arrRate)
        var settings = {
            dots: false,
            infinite: true,
            speed: 200,
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,


        };
        return (
            <>

                <div className="slick-user m-5 border">
                    <p className="text-center font-weight-bold m-5 rate-for-user">Đánh Giá Của Khách Hàng</p>
                    <Slider  {...settings}>


                        {arrRate && arrRate.length > 0 && arrRate.map((item, index) => {
                            let imageBase64 = '';
                            console.log('chekc item asdsadasd', item.userDataRate.image)
                            if (!item.userDataRate.image) {
                                imageBase64 = ''
                            }
                            else {
                                imageBase64 = new Buffer(item.userDataRate.image, 'base64').toString('binary');
                            }
                            // if (item) {
                            //    
                            // }
                            // let converntDateRate = new Date(item.userDataRate.createdAt)
                            // let dateRateForUser = converntDateRate.getDate() + "/" + (converntDateRate.getMonth() + 1) + "/" + converntDateRate.getFullYear()
                            let converntDateRate = new Date(item.createdAt)
                            let dateRateForUser = converntDateRate.getDate() + "/" + (converntDateRate.getMonth() + 1) + "/" + converntDateRate.getFullYear()
                            console.log('check item user', item)
                            return (
                                <>
                                    {/* {item.userDataRate.rate != 'null' && item.userDataRate.userid != 'null' && <>
                                        <div className="card-deck m-5"  >
                                            <div className="card">
                                                <img src="https://vcdn-giaitri.vnecdn.net/2022/03/25/anh-da-o-jpeg-1648178359-7993-1648178501.jpg"
                                                    className="card-img-center rounded-circle" />
                                                <div className="card-body">
                                                    <h5 className="card-title">{item.userDataRate.rate != 'null' && item.name}</h5>
                                                    <p className="card-text">{item.userDataRate.rate != 'null' && item.userDataRate.rate}</p>
                                                </div>
                                                <div className="card-footer">
                                                    <small className="text-muted"> {item.userDataRate.rate != 'null' && dateRateForUser}</small>
                                                </div>
                                            </div>

                                        </div>
                                    </>

                                    } */}
                                    {item.rate && item.userDataRate.id && <>
                                        <div className="card-deck m-5"  >
                                            <div className="card">

                                                <div className="card-img-center " style={{ backgroundImage: `url(${imageBase64})` }}></div>
                                                {/* <img src="https://vcdn-giaitri.vnecdn.net/2022/03/25/anh-da-o-jpeg-1648178359-7993-1648178501.jpg"
                                                    className="card-img-center rounded-circle" /> */}
                                                <div className="card-body">
                                                    <h5 className="card-title">{item.userDataRate.name}</h5>
                                                    <p className="card-text">{item.rate}</p>
                                                </div>
                                                <div className="card-footer">
                                                    <small className="text-muted">{' Được đánh giá vào ngày:'} {dateRateForUser}</small>
                                                </div>
                                            </div>

                                        </div>
                                    </>

                                    }

                                </>
                            )
                        })}



                    </Slider>
                    {isLoggedIn && userInfo && <>
                        <div className="rate-user">
                            <div className="row">
                                <div className="col-4"></div>
                                <div className="col-4 border">
                                    <p className="title-rate m-3" style={{ fontSize: '25px', textAlign: 'center', fontFamily: 'monospace' }}>Đánh giá của bạn về TOEIC FREE😊😊</p>
                                    <textarea type="text"
                                        name="rate"
                                        className="form-control rate"
                                        onChange={(event) => { this.onChangeInput(event, 'rate') }}
                                        style={{ width: '100%', height: '200px' }}
                                        value={this.state.rate}
                                    >

                                    </textarea>
                                    <input
                                        type="text"
                                        name="userid"
                                        className="form-control userid"
                                        onChange={(event) => { this.onChangeInput(event, 'userid') }}
                                        value={this.state.userid}
                                        style={{ display: 'none' }}

                                    />
                                    <button className="btn btn-primary" onClick={() => { this.handleAddNewRate() }}>Đánh giá</button>
                                </div>
                                <div className="col-4"></div>
                            </div>
                        </div>
                    </>}

                </div>
            </>

        )
    }

}
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CardProfile));