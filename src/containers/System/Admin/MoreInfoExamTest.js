import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ReadExerciseManage.scss';
import {
    getAllExamTest,
    getAllQuizTest,
    createNewExamTestService,
    deleteExamTestServices,
    editExamTestService,
    deleteQuizTestServices,
    editQuizTestService
} from '../../../services/userService';
import { toast } from 'react-toastify';
import AddCsvQuizTest from '../../../routes/AddCsvQuizTest';
class MoreInfoExamTest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrExamTest: [],
            arrQuizTest: [],
            name_reading: '',
            level: '',
            part: '',
            test_year: '',
            showModal: false,
        };

    }

    async componentDidMount() {
        await this.getAllExamTest();
        await this.getAllQuizTest();
    }
    getAllExamTest = async () => {
        let response = await getAllExamTest('ALL');
        if (response && response.errCode === 0) {
            this.setState({
                arrExamTest: response.examtest.reverse(),

            });
            toast.success("get all exam test sucssedd");
        }
        console.log('get exam test from node js:', response)
    }
    getAllQuizTest = async () => {
        let response = await getAllQuizTest('ALL');
        if (response && response.errCode === 0) {
            this.setState({
                arrQuizTest: response.quizTests.reverse(),

            });
            toast.success("get all quiz test sucssedd");
        }
        console.log('get quiz test from node js:', response)
    }
    handleCreateExamTest = async () => {
        let isValid = this.checkValidateInput();
        if (isValid === false) return;
        try {
            let response = await createNewExamTestService({
                img_test: this.state.img_test,
                name_test: this.state.name_test,
                test_year: this.state.test_year,
                typeText: this.state.typeText
            })
            if (response.message.errCode === 0) {

                await this.getAllExamTest();
                toast.success("Th??m B??i Thi  Th??nh C??ng");
                this.setState({
                    name_test: '',
                    test_year: '',
                    typeText: '',
                })
            }
            else {
                await toast.error("T??n B??i Thi N??y ????  T???n T???i Xin Th??? L???i V???i M???t T??n Kh??c")
                this.setState({
                    name_test: '',
                    test_year: '',
                    typeText: '',
                })

            }
        } catch (e) {
            console.log(e);
        }
    }
    deleteExamTestServices = async (examTest) => {
        try {
            let res = await deleteExamTestServices(examTest.id);
            toast.success("X??a Th??nh C??ng");
            if (res && res.errCode === 0) {
                await this.getAllExamTest();
            } else {
                alert(res.errMessage)
                toast.error("B??i Thi Kh??ng T???n T???i");
            }
            console.log(res);
        } catch (e) {
            console.log(e);
        }
    }
    handleEditExamTest = async (examTest) => {
        console.log('check data readExercise edit readExercise', examTest)
        this.setState({
            id: examTest.id,
            name_test: examTest.name_test,
            test_year: examTest.test_year,
            typeText: examTest.typeText,

        })

        console.log('check datat edit', examTest)
    }
    //edit quiz reading
    handleQuizTest = async (quizTest) => {
        console.log('check data quizTest edit quizTest', quizTest)
        this.setState({
            id: quizTest.id,
            question: quizTest.question,
            correct_answer: quizTest.correct_answer,
            option_1: quizTest.option_1,
            option_2: quizTest.option_2,
            option_3: quizTest.option_3,
            option_4: quizTest.option_4,
            explain: quizTest.explain,
            paragrap: quizTest.paragrap,
            answer_user: quizTest.answer_user,
            img: quizTest.img,
            keyMap: quizTest.keyMap,
            number: quizTest.number,
            testid: quizTest.testid,
            audio_mp3: quizTest.audio_mp3
        })

        console.log('check datat edit', quizTest)
    }
    handleUpdateExamTest = async () => {
        let arrupdate = {
            id: this.state.id,
            name_test: this.state.name_test,
            test_year: this.state.test_year,
            typeText: this.state.typeText,
        }

        console.log('check data arr exam test update', arrupdate)
        try {
            let res = await editExamTestService(arrupdate);
            console.log('click save exam test:', res)
            if (res && res.errCode === 0) {
                await this.getAllExamTest();
                toast.success("S???a Th??nh C??ng");

                this.setState({
                    name_test: '',
                    test_year: '',
                    typeText: '',
                })
            } else {
                alert(res.errMessage)
                toast.error("B??i Thi Kh??ng T???n T???i");
            }
            console.log(res);
        } catch (e) {
            console.log(e);
        }
    }
    // update quiz reading
    handleUpdateQuizTest = async () => {
        let arrupdate = {
            id: this.state.id,
            question: this.state.question,
            correct_answer: this.state.correct_answer,
            option_1: this.state.option_1,
            option_2: this.state.option_2,
            option_3: this.state.option_3,
            option_4: this.state.option_4,
            explain: this.state.explain,
            paragrap: this.state.paragrap,
            img: this.state.img,
            keyMap: this.state.keyMap,
            number: this.state.number,
            testid: this.state.testid,
            answer_user: this.state.answer_user,
            audio_mp3: this.state.audio_mp3
        }

        console.log('check data arr quiz  test update', arrupdate)
        try {
            let res = await editQuizTestService(arrupdate);
            console.log('click save quiz  test:', res)
            if (res && res.errCode === 0) {
                await this.getAllQuizTest();
                toast.success("S???a Th??nh C??ng");

                this.setState({
                    question: '',
                    correct_answer: '',
                    option_1: '',
                    option_2: '',
                    option_3: '',
                    option_4: '',
                    explain: '',
                    paragrap: '',
                    img: '',
                    keyMap: '',
                    number: '',
                    testid: '',
                    answer_user: '',
                })
            } else {
                alert(res.errMessage)
                toast.error("C??u h???i b??i thi th??? kh??ng t???n t???i");
            }
            console.log(res);
        } catch (e) {
            console.log(e);
        }
    }
    deleteQuizTestServices = async (quizTest) => {
        try {
            let res = await deleteQuizTestServices(quizTest.id);
            toast.success("X??a Th??nh C??ng");
            if (res && res.errCode === 0) {
                await this.getAllQuizTest();
            } else {
                alert(res.errMessage)
                toast.error("C??u H???i B??i Thi Kh??ng T???n T???i");
            }
            console.log(res);
        } catch (e) {
            console.log(e);
        }
    }
    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['name_test', 'test_year', 'typeText']
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert('Ch??a Nh???p :' + ' ' + arrCheck[i])
                break;
            }
        }
        return isValid;
    }
    onChangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
        console.log('check input good code', copyState)
    }
    open = () => {
        this.setState({ showModal: true });
    }

    close = () => {
        this.setState({ showModal: false });
    }
    render() {
        let { arrExamTest, arrQuizTest } = this.state;
        console.log('check arrExamTest ', arrExamTest);
        console.log('check arrQuizTest ', arrQuizTest);
        return (
            <>
                <div className='content-manage-reading-exercise' style={{ paddingLeft: '10px' }}>

                    <div className='manage-more-info-exam-test m-3' style={{ fontSize: '25px', textAlign: 'center', fontWeight: 'bolder' }}> Qu???n L?? C??u H???i B??i Thi Th???</div>
                    <form>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label >C??u H???i</label>
                                <input type="text" className="form-control"
                                    onChange={(event) => { this.onChangeInput(event, '	question') }}
                                    value={this.state.question}
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label >????p ??n ????ng</label>
                                <input type="text" className="form-control"
                                    onChange={(event) => { this.onChangeInput(event, 'correct_answer') }}
                                    value={this.state.correct_answer}
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label >????p ??n 1</label>
                                <input type="text" className="form-control"
                                    onChange={(event) => { this.onChangeInput(event, 'option_1') }}
                                    value={this.state.option_1}
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label >????p ??n 2</label>
                                <input type="text" className="form-control"
                                    onChange={(event) => { this.onChangeInput(event, 'option_2') }}
                                    value={this.state.option_2}
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label >????p ??n 3</label>
                                <input type="text" className="form-control"
                                    onChange={(event) => { this.onChangeInput(event, 'option_3') }}
                                    value={this.state.option_3}
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label >????p ??n 4</label>
                                <input type="text" className="form-control"
                                    onChange={(event) => { this.onChangeInput(event, 'option_4') }}
                                    value={this.state.option_4}
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label >Gi???i th??ch</label>
                                <input type="text" className="form-control"

                                    onChange={(event) => { this.onChangeInput(event, 'explain') }}
                                    value={this.state.explain}
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label >??o???n V??n Ho???c L?? Th??</label>
                                <input type="text" className="form-control"
                                    onChange={(event) => { this.onChangeInput(event, 'paragrap') }}
                                    value={this.state.paragrap}
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label >??m thanh</label>
                                <input type="text" className="form-control"
                                    onChange={(event) => { this.onChangeInput(event, 'audio_mp3') }}
                                    value={this.state.audio_mp3}
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label >????p ??n User</label>
                                <input type="text" className="form-control"
                                    onChange={(event) => { this.onChangeInput(event, 'answer_user	') }}
                                    value={this.state.answer_user}
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label >???nh</label>
                                <input type="text" className="form-control"
                                    onChange={(event) => { this.onChangeInput(event, 'img') }}
                                    value={this.state.img}
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label >S??? th??? t???</label>
                                <input type="text" className="form-control"
                                    onChange={(event) => { this.onChangeInput(event, 'number') }}
                                    value={this.state.number}
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label >ID B??i thi th???</label>
                                <input type="text" className="form-control"
                                    onChange={(event) => { this.onChangeInput(event, 'testid') }}
                                    value={this.state.testid}
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label >Part</label>
                                <select className="form-control" onChange={(event) => { this.onChangeInput(event, 'keyMap') }}
                                    value={this.state.keyMap}>
                                    <option selected>Ch???n...</option>
                                    <option value='PART 1'>PART 1</option>
                                    <option value='PART 2'>PART 2</option>
                                    <option value='PART 3'>PART 3</option>
                                    <option value='PART 4'>PART 4</option>
                                    <option value='PART 5'>PART 5</option>
                                    <option value='PART 6'>PART 6</option>
                                    <option value='PART 7'>PART 7</option>
                                </select>
                            </div>
                        </div>

                    </form>
                    <button type=" button" className="btn btn-success ml-3" onClick={this.open}>Th??m D??? Li???u B???ng File Excel</button>
                    <AddCsvQuizTest showModal={this.state.showModal} onClose={this.close} />
                    <button type="button" className="btn btn-warning" onClick={() => this.handleUpdateQuizTest()}>L??u Th??ng Tin</button>
                    <table className="table">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">C??u H???i</th>
                                <th scope="col">????p ??n</th>
                                <th scope="col">L???a Ch???n 1</th>
                                <th scope="col">L???a Ch???n 2</th>
                                <th scope="col">L???a CH???n 3</th>
                                <th scope="col">L???a Ch???n 4</th>
                                <th scope="col">??o???n V??n</th>

                                {/* <th scope="col">Part</th>
                                <th scope="col">Test Id</th> */}
                                <th scope="col">H??nh ?????ng</th>


                            </tr>
                        </thead>
                        <tbody>
                            {arrQuizTest && arrQuizTest.length > 0 && arrQuizTest.map((item, index) => {
                                return (
                                    <tr>
                                        <th scope="row">{item.id}</th>
                                        <td>{item.question}</td>
                                        <td>{item.correct_answer}</td>
                                        <td>{item.option_1}</td>
                                        <td>{item.option_2}</td>
                                        <td>{item.option_3}</td>
                                        <td>{item.option_4}</td>

                                        <td>{item.paragrap}</td>

                                        {/* <td>{item.keyMap}</td>

                                        <td>{item.testid}</td> */}
                                        <td>
                                            <button className='btn btn-danger' onClick={() => this.deleteQuizTestServices(item)}>X??a</button>
                                            <button className='btn btn-warning' onClick={() => this.handleQuizTest(item)}>S???a</button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>

            </>

        );
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

export default connect(mapStateToProps, mapDispatchToProps)(MoreInfoExamTest);
