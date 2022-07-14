import React, { Component } from 'react';
import './TestOnline.scss';
import Nav from '../../routes/Nav';
import Footer from '../../routes/Footer';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import {

    getAllExamTest, editPasswordUserService, editInfoUserService,
    getAllResultByUser,
} from '../../services/userService';
import { toast } from 'react-toastify';
import './ListExamTest.scss';
import LoginForm from '../../routes/LoginForm';
import ProgressBar from 'react-bootstrap/ProgressBar';
import * as Icon from 'react-bootstrap-icons';
import Dropdown from 'react-bootstrap/Dropdown';
import SplitButton from 'react-bootstrap/SplitButton';
import { Chart } from "react-google-charts";
import * as actions from "../../store/actions";
import ChangePasswordUser from '../../routes/ChangePasswordUser';
import EditInforUser from '../../routes/EditInforUser';



class ListExamTest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrExamTest: [],
            arrResultForTest: [],
            passwordUserEdit: {},
            infoUserEdit: {},

            showModalChangePasswordUser: false,
            showModalEditInfoUser: false,
            showExamTest: false,
            showHistoryExamTest: false,
            showModalListExamTest: true
            // todos: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k'],
            // currentPage: 1,
            // todosPerPage: 3,
        }
        // this.handleClick = this.handleClick.bind(this);
    }
    async componentDidMount() {
        await this.getAllExamTest();
        await this.getAllResultForUser();

        // await this.props.userInfo;

    }
    componentDidUpdate() {


    }
    getAllResultForUser = async () => {
        try {
            let response = await getAllResultByUser(this.props.userInfo.id);
            //dúng
            // let response = await getAllResultByUser(this.props.userInfo.id);
            // toast.success("get all ressult test sucssedd");
            if (response && response.errCode === 0) {
                this.setState({
                    arrResultForTest: response.resultTestUser,

                });
                console.log('get ressult test from node js:', response)
            }

        } catch (e) {
            console.log(e)
        }
    }
    getAllExamTest = async () => {
        try {
            let response = await getAllExamTest('ALL');
            // toast.success("get all quiz test sucssedd");
            if (response && response.errCode === 0) {
                this.setState({
                    arrExamTest: response.examtest,

                });
                console.log('get quiz test from node js:', response)
            }

        } catch (e) {
            console.log(e)
        }

    }
    handleDetailExamTest = (dataExamTest) => {
        console.log('check data examtesst', dataExamTest)


        this.props.history.push(`/ListeningTest/${dataExamTest.id}`)

    }
    handleDetailExamTestShowNone = (dataExamTest) => {
        console.log('check data examtesst', dataExamTest)
        if (window.confirm('Bạn Có Muốn Làm Bài Thi?')) {

            this.props.history.push(`/ListeningTest/${dataExamTest.id}`)
        }
    }

    handleDetailExamTestSucess = (dataExamTest) => {
        console.log('check data examtesst', dataExamTest)
        if (window.confirm('Bạn Có Muốn Làm Lại Bài Thi Này Không?')) {

            this.props.history.push(`/ListeningTest/${dataExamTest.id}`)
        }
    }

    handleLogOut = () => {
        this.props.processLogout() && this.props.history.push('/');
    }
    closeEditPasswordUser = () => {
        this.setState({
            showModalChangePasswordUser: false,
            showHistoryExamTest: false,
            showExamTest: false

        });

    }
    openEditPasswordUser = () => {
        this.setState({
            showModalChangePasswordUser: true,
            showHistoryExamTest: false,
            showExamTest: false
        });
    }

    handleEditPasswordUser = (infoUser) => {
        this.openEditPasswordUser();
        console.log('check edit password  user', infoUser);
        this.setState({
            passwordUserEdit: infoUser,

        }, () => {
            console.log('check data pas', this.state.passwordUserEdit)
        })

    }
    openEditInfoUser = () => {
        this.setState({
            showModalEditInfoUser: true,
            showHistoryExamTest: false,
            showExamTest: false
        });
    }
    closeEditInfoUser = () => {
        this.setState({ showModalEditInfoUser: false });
    }
    handleEditInfoUser = (infoUser) => {
        this.openEditInfoUser();
        console.log('check edit info  user', infoUser);
        this.setState({
            infoUserEdit: infoUser
        })
    }
    handleUpdatePasswordUser = async (infoUser) => {
        try {
            let res = await editPasswordUserService(infoUser);
            console.log('click save infoUser:', res)
            if (res && res.errCode === 0) {
                toast.success('Đổi Mật Khẩu Thành Công');
                this.setState({
                    showModalChangePasswordUser: false
                })
            } else {
                alert(res.errCode);
            }
        } catch (e) {
            console.log(e);
        }
    }
    handleUpdateInfoUser = async (infoUser) => {
        try {
            let res = await editInfoUserService(infoUser);
            console.log('click save infoUser:', res)
            if (res && res.errCode === 0) {
                toast.success('Thay Đổi Thông Tin Thành Công');
                this.setState({
                    showModalEditInfoUser: false,

                })


            } else {
                alert(res.errCode);
            }
        } catch (e) {
            console.log(e);
        }
    }
    handleShowExamTest = () => {
        this.setState({
            showExamTest: true,
            showHistoryExamTest: false
        })


    }
    handleShowHistoryExamTest = () => {
        this.setState({
            showHistoryExamTest: true,
            showExamTest: false
        })
    }
    close = () => {
        this.setState({
            showModalListExamTest: false,

        });
    }
    render() {
        let userId = '';
        if (this.props.userInfo && this.props.userInfo.id) {
            userId = this.props.userInfo.id
        }
        console.log('check close midal', this.state.showModalChangePasswordUser)
        let { arrResultForTest, showModalListExamTest } = this.state;
        let numCorrectListen = 0;
        let numCorrectRead = 0;
        let lengthResult = arrResultForTest.length;
        let maxScoreListening = Math.max(...arrResultForTest.map(item => item.correct_listen));
        let maxScoreReading = Math.max(...arrResultForTest.map(item => item.correct_read));
        let chartNamTest = ''
        let chartTestId = '';
        let idUser = '';
        console.log('check arrResultForTest', lengthResult)
        {
            arrResultForTest && arrResultForTest.map((item, index) => {
                console.log('check item arrRestltFoftest', item)
                if (item) {
                    numCorrectListen += item.correct_listen;
                    numCorrectRead += item.correct_read;
                    chartTestId = item.testid;
                    idUser = item.userid;

                }
                if (item.testid === item.Test.id) {
                    chartNamTest = item.Test.typeText
                }
                console.log('check daucatmoi', chartNamTest)
                console.log('chekc item numCorrectListen', numCorrectListen)
                console.log('chekc item numCorrectRead', numCorrectRead)
            })
        }
        let skillReading = '';
        let skillListening = '';

        if (userId === idUser && numCorrectRead > 0 && numCorrectListen > 0 && lengthResult > 0) {
            skillReading = (495 - ((numCorrectRead / lengthResult) * 5)) / 100;
            skillListening = (495 - ((numCorrectListen / lengthResult) * 5)) / 100;
        }
        const data = [
            ["Test", "Reading", "Listening"],
            [`${chartNamTest ? chartNamTest : 'Chưa Có Dữ Liệu Về Bài Thi'}`, maxScoreReading * 5, maxScoreListening * 5],

        ];
        const options = {

            chart: {
                title: "Điểm Số Qua Các Bài Thi",

            },
        };
        console.log('chekc skillReading skillReading new', skillReading)
        const datapie = [
            ["Task", "Hours per Day"],
            ["Reading", (495 - ((numCorrectListen / lengthResult) * 5)) / 100],
            ["Listening", (495 - ((numCorrectRead / lengthResult) * 5)) / 100],
        ];
        console.log('chekc item numCorrectListen new', userId === idUser)
        console.log('chekc Reading', (495 - ((numCorrectListen / lengthResult) * 5)) / 100)
        const optionspie = {
            title: "Kỹ Năng Làm Bài Thi Thử",
            pieHole: 0.4,
            is3D: true,
        };
        //
        // const { todos, currentPage, todosPerPage } = this.state;


        // const indexOfLastTodo = currentPage * todosPerPage;
        // const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
        // const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

        // const renderTodos = currentTodos.map((todo, index) => {
        //     return <li key={index}>{todo}</li>;
        // });


        // const pageNumbers = [];
        // for (let i = 1; i <= Math.ceil(todos.length / todosPerPage); i++) {
        //     pageNumbers.push(i);
        // }
        // const renderPageNumbers = pageNumbers.map(number => {
        //     return (
        //         <li
        //             key={number}
        //             id={number}
        //             onClick={this.handleClick}
        //         >
        //             {number}
        //         </li>
        //     );
        // });
        //

        let { arrExamTest } = this.state;
        let { isLoggedIn, userInfo, processLogout } = this.props;
        let dateForUser = '';
        if (userInfo) {
            let converntDateUser = new Date(userInfo.dateOfBirth)
            dateForUser = converntDateUser.getDate() + "/" + (converntDateUser.getMonth() + 1) + "/" + converntDateUser.getFullYear()
        }

        console.log('check date  info1', dateForUser)
        console.log('check props  ', this.props)

        // console.log('check date user info', userInfo.dateOfBirth)

        let imageBase64 = '';
        if (userInfo) {
            imageBase64 = new Buffer(userInfo.image, 'base64').toString('binary');
        }

        // console.log('check img base 64', userInfo.image)

        return (
            <>
                {userInfo && isLoggedIn ?


                    <>
                        <Nav />
                        <div className='page-test'>


                            <div className="page-content-test">

                                <div className="row" style={{ marginRight: '15px' }}>
                                    <div className="col-sm-2 ">

                                        <div className="d-flex align-items-start flex-column " style={{ background: 'rgb(231 215 215 / 36%)', borderRadius: '10px', height: '100%' }}>
                                            <div className="p-2 name-site  m-3 ">
                                                <p className="p-2 name-web-site text-center ">TOEIC FREE</p>


                                            </div>
                                            <div className="mb-auto p-2 info-detail-user  m-3 ">
                                                <div className="d-flex justify-content-center avatar-user">
                                                    <img src={imageBase64}
                                                        style={{ width: '200px', height: '200px', borderRadius: '15px' }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="p-2 score-listen-test  m-3 " onClick={() => this.handleEditInfoUser(userInfo)}>
                                                <div className="p-2 name-score-listen" ><Icon.InfoSquare size={30} color="white" style={{ background: "", cursor: 'pointer', marginRight: '10px' }} />Thay Đổi Thông Tin</div>
                                                {this.state.showModalEditInfoUser &&
                                                    <EditInforUser onshow={this.state.showModalEditInfoUser} onClose={this.closeEditInfoUser} currentDeTailInfoUser={this.state.infoUserEdit} editInforUser={this.handleUpdateInfoUser} />}

                                            </div>
                                            <div className="p-2 score-read-test  m-3" onClick={() => this.handleEditPasswordUser(userInfo)}>
                                                <div className="p-2 name-score-read"><Icon.Key size={30} color="white" style={{ background: "", cursor: 'pointer', marginRight: '10px' }} />Thay Đổi Mật Khẩu</div>

                                                <ChangePasswordUser onshow={this.state.showModalChangePasswordUser} onClose={this.closeEditPasswordUser} currenInfotUser={this.state.passwordUserEdit} editPassdUser={this.handleUpdatePasswordUser} />
                                            </div>
                                            <div className="p-2 get-exam-test m-3" onClick={this.handleShowExamTest}>
                                                <div className="p-2 do-exam-test" ><Icon.LayoutTextWindow size={30} color="white" style={{ background: "", cursor: 'pointer', marginRight: '10px' }} />
                                                    Làm Bài Thi
                                                    {this.state.showExamTest && <SplitButton
                                                        show
                                                        key='start'
                                                        id={`start`}
                                                        drop='start'
                                                        variant="none"
                                                        toggleLabel={''}


                                                    >
                                                        {arrExamTest && arrExamTest.length > 0 && arrExamTest.map((item, index) => {
                                                            return (
                                                                <>
                                                                    <div className='exam-test' key={index} onClick={() => this.handleDetailExamTest(item)}>
                                                                        <Dropdown.Item eventKey={index}>
                                                                            <p className='do-exam-for-test' style={{ color: 'black', fontWeight: '800' }}>
                                                                                {item.name_test}{'        '}{item.test_year}{'    '}{item.typeText}
                                                                            </p>
                                                                        </Dropdown.Item>
                                                                    </div>

                                                                </>
                                                            )
                                                        })}
                                                    </SplitButton>}

                                                </div>

                                            </div>
                                            <div className="p-2 get-history-test m-3" onClick={this.handleShowHistoryExamTest}>
                                                <div className=" history-exam-test"><Icon.ClockHistory size={30} color="white" style={{ background: "", cursor: 'pointer', marginRight: '10px' }} />Lịch Sử Làm Bài
                                                    {
                                                        this.state.showHistoryExamTest && <SplitButton
                                                            show
                                                            key='start'
                                                            id={`start`}
                                                            drop='start'
                                                            variant="none"
                                                            toggleLabel={''}


                                                        >
                                                            {arrExamTest && arrExamTest.length > 0 && arrExamTest.map((item, index) => {
                                                                console.log('check dk', chartTestId === item.id)
                                                                return (
                                                                    <>
                                                                        {chartTestId === item.id ?
                                                                            <>
                                                                                <div className='exam-test' key={index} onClick={() => this.handleDetailExamTestSucess(item)}>
                                                                                    <Dropdown.Item eventKey={index}>
                                                                                        <p className='examtest-history-success' style={{ color: 'red', fontWeight: '800' }}>
                                                                                            {item.name_test}{'        '}{item.test_year}{'    '}{item.typeText}{' ---  '}{'Đã Hoàn Thành!!!'}
                                                                                            {/* <button className='btn btn-primary'>Làm lại</button> */}
                                                                                        </p></Dropdown.Item>
                                                                                </div>
                                                                            </>
                                                                            : <> <div className='exam-test' key={index} onClick={() => this.handleDetailExamTestShowNone(item)}>
                                                                                <Dropdown.Item eventKey={index}>
                                                                                    <p className='examtest-history-unsuccess' style={{ color: 'green', fontWeight: '800' }}>
                                                                                        {item.name_test}{'        '}{item.test_year}{'    '}{item.typeText}{' ---- '}{'Chưa Hoàn Thành!'}
                                                                                    </p>
                                                                                </Dropdown.Item>
                                                                            </div> </>}


                                                                    </>
                                                                )
                                                            })}
                                                        </SplitButton>
                                                    }

                                                </div>

                                            </div>
                                            <div className="p-2 score-sum m-3" onClick={this.handleLogOut}>
                                                <div className="p-2 name-score-read"><Icon.BoxArrowLeft size={30} color="white" style={{ background: "", cursor: 'pointer', marginRight: '10px' }} />Đăng Xuất</div>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-10  content-page-test">
                                        {/* //hiện tại */}
                                        <div className="row content-page-info-test">
                                            <div className="col-6 info-user-for-test">
                                                <div className='info-user'>
                                                    <span className='info-detail-user'>
                                                        Thông tin cá nhân{' '}
                                                    </span>
                                                    <span className='name-user'>
                                                        Họ Và Tên:{' '}{userInfo.name}
                                                    </span>
                                                    <span className='date-of-bith'>
                                                        Ngày Tháng Năm Sinh:{' '}{dateForUser}
                                                    </span>
                                                    <span className='cmnd'>
                                                        CMND :{' '}{userInfo.cmnd}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="col-6 score-for-user-test">
                                                <div className='score-info-user'>
                                                    <span className='score'>
                                                        Điểm {' '}
                                                    </span>
                                                    <span className='score-listening-medium'>
                                                        <p className='name-score-listening-medium'>
                                                            Listening ( Trung Bình):
                                                        </p>
                                                        <span className='process-bar-listening-medium'>
                                                            <ProgressBar variant="danger" animated now={(495 - ((numCorrectListen / lengthResult) * 5)) / 100} />
                                                        </span>
                                                    </span>
                                                    <span className='score-reading-medium'>
                                                        <p className='name-score-reading-medium'>
                                                            Reading ( Trung Bình):
                                                        </p>
                                                        <span className='process-bar-listening-medium'>
                                                            <ProgressBar variant="warning" animated now={(495 - ((numCorrectRead / lengthResult) * 5)) / 100} />
                                                        </span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='skill-statics border'>
                                            <div className='col-12 content-skill-statics'>
                                                <div className='content-skill'>
                                                    <p className='name-skill-statics text-center'>
                                                        Thống Kê Kỹ Năng
                                                    </p>
                                                    <div className='chart-skill-statics'>
                                                        <div className='col-6 bar-chart'>
                                                            <Chart
                                                                chartType="Bar"
                                                                width="700px"
                                                                height="490px"

                                                                data={data}
                                                                options={options}
                                                            />
                                                        </div>
                                                        <div className=' col-6 pie-char'>
                                                            <Chart
                                                                chartType="PieChart"
                                                                width="100%"
                                                                height="490px"

                                                                data={datapie}
                                                                options={optionspie}

                                                            /></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* // mới chỉnh sửa */}
                                        {/* <div>
                                            <div className='tite-option'>Danh Mục Thi Thử</div>
                                            <div className="d-flex flex-row-reverse">

                                                <div className='more-option-exam'>

                                                    <SplitButton
                                                        key='start'
                                                        id={`dropdown-button-drop-start`}
                                                        drop='start'
                                                        variant="none"
                                                        title='Chọn Đề Thi'
                                                        toggleLabel={<Icon.PlusCircle size={30} color="gray" style={{ background: "", cursor: 'pointer' }} />}

                                                    >
                                                        {arrExamTest && arrExamTest.length > 0 && arrExamTest.map((item, index) => {
                                                            return (
                                                                <>
                                                                    <div className='exam-test' key={index} onClick={() => this.handleDetailExamTest(item)}>
                                                                        <Dropdown.Item eventKey={index}>{item.name_test}{'        '}{item.test_year}{'    '}{item.typeText}</Dropdown.Item>
                                                                    </div>

                                                                </>
                                                            )
                                                        })}
                                                    </SplitButton>

                                                </div>
                                                <div className='more-option-history-exam'>

                                                    <SplitButton
                                                        key='start'
                                                        id={`dropdown-button-drop-start`}
                                                        drop='start'
                                                        variant="none"
                                                        toggleLabel={<Icon.ClockHistory size={30} color="gray" style={{ background: "", cursor: 'pointer' }} />}
                                                        title='Lịch Sử'

                                                    >
                                                        {arrExamTest && arrExamTest.length > 0 && arrExamTest.map((item, index) => {
                                                            return (
                                                                <>
                                                                    <div className='exam-test' key={index} onClick={() => this.handleDetailExamTest(item)}>
                                                                        <Dropdown.Item eventKey={index}>{item.name_test}{'        '}{item.test_year}{'    '}{item.typeText}</Dropdown.Item>
                                                                    </div>

                                                                </>
                                                            )
                                                        })}
                                                    </SplitButton>

                                                </div>

                                            </div>
                                        </div>


                                        <div className="row m-3 ">

                                            <div className="col-6 col-md-4">
                                                <div className="p-2 option-list-one">
                                                    <div className="d-flex justify-content-center">
                                                        <Icon.ArrowBarLeft size={70} color="red" style={{ background: "", cursor: 'pointer' }} className="rounded-circle mr-1" />
                                                    </div>
                                                    <div className="d-flex justify-content-center">
                                                        Thoát
                                                    </div>

                                                </div>


                                            </div>
                                            <div className="col-6 col-md-4">
                                                <div className="p-2  option-list-two">
                                                    <div className="d-flex justify-content-center">
                                                        <Icon.Activity size={70} color="blue" style={{ background: "", cursor: 'pointer' }} className="rounded-circle mr-1" />
                                                    </div>
                                                    <div className="d-flex justify-content-center">
                                                        CHưa Nghĩ Ra
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="col-6 col-md-4">
                                                <div className="p-2  option-list-three">
                                                    <div className="d-flex justify-content-center">
                                                        <Icon.Check2Square size={70} color="green" style={{ background: "", cursor: 'pointer' }} className="rounded-circle mr-1" />
                                                    </div>
                                                    <div className="d-flex justify-content-center">
                                                        CHưa Nghĩ Ra
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row m-3">
                                            <div className="col-6 col-md-4">
                                                <div className="p-2 option-list-four">
                                                    <div className="d-flex justify-content-center">
                                                        <Icon.Clipboard size={70} color="white" style={{ background: "", cursor: 'pointer' }} className="rounded-circle mr-1" />
                                                    </div>
                                                    <div className="d-flex justify-content-center">
                                                        CHưa Nghĩ Ra
                                                    </div>
                                                </div>


                                            </div>
                                            <div className="col-6 col-md-4">
                                                <div className="p-2 option-list-five ">
                                                    <div className="d-flex justify-content-center">
                                                        <Icon.CollectionFill size={70} color="black" style={{ background: "", cursor: 'pointer' }} className="rounded-circle mr-1" />
                                                    </div>
                                                    <div className="d-flex justify-content-center">
                                                        CHưa Nghĩ Ra
                                                    </div>
                                                </div>
                                             
                                            </div>
                                            <div className="col-6 col-md-4">
                                                <div className="p-2 option-list-six ">
                                                    <div className="d-flex justify-content-center">
                                                        <Icon.CollectionPlay size={70} color="orange" style={{ background: "", cursor: 'pointer' }} className="rounded-circle mr-1" />
                                                    </div>
                                                    <div className="d-flex justify-content-center">
                                                        CHưa Nghĩ Ra
                                                    </div>
                                                </div>
                                          
                                            </div>
                                        </div>
                                        <div className="col-sm-12 target-point m-3">Điểm Mục Tiêu</div>
                                        <div className="col-sm-10 process-point m-3">
                                            <ProgressBar animated now={45} />

                                        </div>
                                        <div className="col-sm-12 title-page-test-show m-3">Nội Dung Hiển Thị</div>
                                        <div className="col-sm-12 content-page-test-show  border">
                                        </div> */}


                                    </div>

                                    {/* // cũ */}
                                    {/* <div className="col-sm-3 border">
                                    <div className="dropdown show">
                                        <div className='more-option-exam'>

                                            <SplitButton
                                                key='start'
                                                id={`dropdown-button-drop-start`}
                                                drop='start'
                                                variant="none"
                                                toggleLabel={<Icon.PlusCircle size={30} color="gray" style={{ background: "", cursor: 'pointer' }} />}

                                            >
                                                {arrExamTest && arrExamTest.length > 0 && arrExamTest.map((item, index) => {
                                                    return (
                                                        <>
                                                            <div className='exam-test' key={index} onClick={() => this.handleDetailExamTest(item)}>
                                                                <Dropdown.Item eventKey={index}>{item.name_test}{'        '}{item.test_year}{'    '}{item.typeText}</Dropdown.Item>

                                                            </div>

                                                        </>
                                                    )
                                                })}

                                            </SplitButton>

                                        </div>
                                        <div className='more-option-history-exam'>

                                            <SplitButton
                                                key='start'
                                                id={`dropdown-button-drop-start`}
                                                drop='start'
                                                variant="none"
                                                toggleLabel={<Icon.ClockHistory size={30} color="gray" style={{ background: "", cursor: 'pointer' }} />}

                                            >
                                                {arrExamTest && arrExamTest.length > 0 && arrExamTest.map((item, index) => {
                                                    return (
                                                        <>
                                                            <div className='exam-test' key={index} onClick={() => this.handleDetailExamTest(item)}>
                                                                <Dropdown.Item eventKey={index}>{item.name_test}{'        '}{item.test_year}{'    '}{item.typeText}</Dropdown.Item>

                                                            </div>

                                                        </>
                                                    )
                                                })}

                                            </SplitButton>

                                        </div>
                                    </div>
                                </div> */}
                                </div>
                            </div>
                            {/* {isLoggedIn && userInfo ? <>
                                    <Nav />
                                    <div className='background-testonline' style={{ height: '1500px' }}>
                                        <div className="d-flex flex-row m-3">
                                        </div>
                                        <div className="d-flex justify-content-around">
                                            <a style={{ opacity: '0' }}>.</a>
                                            <div className='content-testonline border' >
                                                <h1 className='title-list-exam-test'>Danh sách đề thi thử</h1>
                                                <div className='list-exam-test'>
                                                    {arrExamTest && arrExamTest.length > 0 && arrExamTest.map((item, index) => {
                                                        return (
                                                            <>
                                                                <div className='exam-test' key={index} onClick={() => this.handleDetailExamTest(item)}>
                                                                    <p className='exam-text-info'>{item.name_test}{'        '}{item.test_year}{'    '}{item.typeText}</p>
                                                                </div>

                                                            </>
                                                        )
                                                    })}
                                                </div>

                                            </div>
                                            <a style={{ opacity: '0' }}>.</a>
                                        </div>
                                    </div>
                                    <Footer />
                                </> :
                                    <>
                                        <LoginForm showModal={true} />
                                    </>} */
                            }

                        </div>

                        <Footer />

                    </>
                    :
                    <>
                        {showModalListExamTest === true ? <LoginForm showModal={showModalListExamTest} onClose={this.close} /> : <> {this.props.history.push('/')}</>}
                    </>

                }
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
        processLogout: () => dispatch(actions.processLogout()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListExamTest));
