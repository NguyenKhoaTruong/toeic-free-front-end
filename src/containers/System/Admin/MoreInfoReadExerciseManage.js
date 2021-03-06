import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ReadExerciseManage.scss';
import {
    getAllReadExercise,
    getAllQuizReading,
    createNewReadExerciseService,
    deleteReadExerciseServices,
    editReadExerciseService,
    deleteQuizReadingServices,
    editQuizReadingService
} from '../../../services/userService';
import { toast } from 'react-toastify';
import AddCsvQuizReading from '../../../routes/AddCsvQuizReading';
class MoreInfoReadExerciseManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrReadExercise: [],
            arrQuizReading: [],
            name_reading: '',
            level: '',
            part: '',
            test_year: '',
            showModal: false,
        };

    }

    async componentDidMount() {
        await this.getAllReadExercise();
        await this.getAllQuizReading();
    }
    getAllReadExercise = async () => {
        console.log('check data arr json get read exercis', getAllReadExercise('ALL'));
        let response = await getAllReadExercise('ALL');
        if (response && response.errCode === 0) {
            this.setState({
                arrReadExercise: response.readingexercises.reverse(),

            });
            toast.success("get all read exercise sucssedd");
        }
        console.log('get read exercise from node js:', response)
    }
    getAllQuizReading = async () => {
        console.log('check data arr json get quiz reading', getAllQuizReading('ALL'));
        let response = await getAllQuizReading('ALL');
        if (response && response.errCode === 0) {
            this.setState({
                arrQuizReading: response.quizReadings.reverse(),

            });
            toast.success("get all quiz reading sucssedd");
        }
        console.log('get quiz reading from node js:', response)
    }
    handleCreateReadExercise = async () => {
        let isValid = this.checkValidateInput();
        if (isValid === false) return;
        try {
            let response = await createNewReadExerciseService({
                level: this.state.level,
                name_reading: this.state.name_reading,
                part: this.state.part,
                test_year: this.state.test_year
            })
            if (response.message.errCode === 0) {

                await this.getAllReadExercise();
                toast.success("Th??m B??i ?????c Th??nh C??ng");
                this.setState({
                    name_reading: '',
                    test_year: '',
                    level: '',
                    part: '',
                })
            }
            else {
                await toast.error("T??n B??i ?????c N??y ????  T???n T???i Xin Th??? L???i V???i M???t T??n Kh??c")
                this.setState({
                    name_reading: '',
                    test_year: '',
                    level: '',
                    part: '',
                })

            }
        } catch (e) {
            console.log(e);
        }
    }
    deleteReadExerciseServices = async (readExercise) => {
        try {
            let res = await deleteReadExerciseServices(readExercise.id);
            toast.success("X??a Th??nh C??ng");
            if (res && res.errCode === 0) {
                await this.getAllReadExercise();
            } else {
                alert(res.errMessage)
                toast.error("B??i ?????c Kh??ng T???n T???i");
            }
            console.log(res);
        } catch (e) {
            console.log(e);
        }
    }
    handleEditReadExercise = async (readExercise) => {
        console.log('check data readExercise edit readExercise', readExercise)
        this.setState({
            id: readExercise.id,
            name_reading: readExercise.name_reading,
            level: readExercise.level,
            part: readExercise.part,
            test_year: readExercise.test_year,
        })

        console.log('check datat edit', readExercise)
    }
    //edit quiz reading
    handleQuizReading = async (quizReading) => {
        console.log('check data quizReading edit quizReading', quizReading)
        this.setState({
            id: quizReading.id,
            question: quizReading.question,
            correct_answer: quizReading.correct_answer,
            option_1: quizReading.option_1,
            option_2: quizReading.option_2,
            option_3: quizReading.option_3,
            option_4: quizReading.option_4,
            explain: quizReading.explain,
            letterquestion: quizReading.letterquestion,
            letterquestiontwo: quizReading.letterquestiontwo,
            letterquestionthree: quizReading.letterquestionthree,
            number: quizReading.number,
            keyPart: quizReading.keyPart,
            keyYear: quizReading.keyYear,

        })

        console.log('check datat edit', quizReading)
    }
    handleUpdateReadExercise = async () => {
        let arrupdate = {
            id: this.state.id,
            name_reading: this.state.name_reading,
            level: this.state.level,
            part: this.state.part,
            test_year: this.state.test_year,
        }

        console.log('check data arr read exercise update', arrupdate)
        try {
            let res = await editReadExerciseService(arrupdate);
            console.log('click save read excises:', res)
            if (res && res.errCode === 0) {
                await this.getAllReadExercise();
                toast.success("S???a Th??nh C??ng");

                this.setState({
                    name_reading: '',
                    level: '',
                    part: '',
                    test_year: '',
                })
            } else {
                alert(res.errMessage)
                toast.error("B??i ?????c Kh??ng T???n T???i");
            }
            console.log(res);
        } catch (e) {
            console.log(e);
        }
    }
    // update quiz reading
    handleUpdateQuizReading = async () => {
        let arrupdate = {
            id: this.state.id,
            question: this.state.question,
            correct_answer: this.state.correct_answer,
            option_1: this.state.option_1,
            option_2: this.state.option_2,
            option_3: this.state.option_3,
            option_4: this.state.option_4,
            explain: this.state.explain,
            letterquestion: this.state.letterquestion,
            letterquestiontwo: this.state.letterquestiontwo,
            letterquestionthree: this.state.letterquestionthree,
            number: this.state.number,
            keyPart: this.state.keyPart,
            keyYear: this.state.keyYear,
        }

        console.log('check data arr quiz  reading update', arrupdate)
        try {
            let res = await editQuizReadingService(arrupdate);
            console.log('click save quiz  reading:', res)
            if (res && res.errCode === 0) {
                await this.getAllQuizReading();
                toast.success("S???a Th??nh C??ng");

                this.setState({
                    question: '',
                    correct_answer: '',
                    option_1: '',
                    option_2: '',
                    option_3: '',
                    option_4: '',
                    explain: '',
                    letterquestion: '',
                    letterquestiontwo: '',
                    letterquestionthree: '',
                    number: '',
                    keyPart: '',
                    keyYear: '',
                })
            } else {
                alert(res.errMessage)
                toast.error("C??u h???i b??i ?????c Kh??ng T???n T???i");
            }
            console.log(res);
        } catch (e) {
            console.log(e);
        }
    }
    deleteQuizReadingServices = async (quizReading) => {
        try {
            let res = await deleteQuizReadingServices(quizReading.id);
            toast.success("X??a Th??nh C??ng");
            if (res && res.errCode === 0) {
                await this.getAllQuizReading();
            } else {
                alert(res.errMessage)
                toast.error("C??u H???i Kh??ng T???n T???i");
            }
            console.log(res);
        } catch (e) {
            console.log(e);
        }
    }
    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['name_reading', 'part', 'test_year', 'level']
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
        let { arrReadExercise, arrQuizReading } = this.state;
        console.log('check arrReadExercise ', arrReadExercise);
        console.log('check arrQuizReading ', arrQuizReading);
        return (
            <>
                <div className='content-manage-reading-exercise'>
                    <div className='content-reading-exercise-manage' style={{ paddingLeft: '10px' }}>

                        <div className='manage-more-info-read-exercise m-3' style={{ fontSize: '25px', textAlign: 'center', fontWeight: 'bolder' }}> Qu???n L?? C??u H???i B??i ?????c</div>
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
                                </div>  <div className="form-group col-md-6">
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
                                    <label >L?? Th?? 1</label>
                                    <input type="text" className="form-control"
                                        onChange={(event) => { this.onChangeInput(event, 'letterquestion') }}
                                        value={this.state.letterquestion}
                                    />
                                </div>

                                <div className="form-group col-md-6">
                                    <label >L?? Th?? 2</label>
                                    <input type="text" className="form-control"
                                        onChange={(event) => { this.onChangeInput(event, 'letterquestiontwo') }}
                                        value={this.state.letterquestiontwo}
                                    />
                                </div>
                                <div className="form-group col-md-6">
                                    <label >L?? Th?? 3</label>
                                    <input type="text" className="form-control"
                                        onChange={(event) => { this.onChangeInput(event, 'letterquestionthree	') }}
                                        value={this.state.letterquestionthree}
                                    />
                                </div>
                                <div className="form-group col-md-6">
                                    <label >S??? th??? t???</label>
                                    <input type="text" className="form-control"
                                        onChange={(event) => { this.onChangeInput(event, 'number') }}
                                        value={this.state.number}
                                    />
                                </div>
                            </div>
                            <div className="form-row">

                                <div className="form-group col-md-4">
                                    <label >Part</label>
                                    <select className="form-control" onChange={(event) => { this.onChangeInput(event, 'keyPart') }}
                                        value={this.state.keyPart}>
                                        <option selected>Ch???n...</option>
                                        <option value='PART 5'>PART 5</option>
                                        <option value='PART 6'>PART 6</option>
                                        <option value='PART 7'>PART 7</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-row">

                                <div className="form-group col-md-4">
                                    <label >N??m</label>
                                    <select className="form-control" onChange={(event) => { this.onChangeInput(event, 'keyYear') }}
                                        value={this.state.keyYear}>
                                        <option selected>Ch???n...</option>
                                        <option value='2022'>2022</option>
                                        <option value='2021'>2021</option>
                                        <option value='2020'>2020</option>
                                        <option value='2019'>2019</option>

                                    </select>
                                </div>
                            </div>

                        </form>
                        <button type=" button" className="btn btn-success ml-3" onClick={this.open}>Th??m D??? Li???u B???ng File Excel</button>
                        <AddCsvQuizReading showModal={this.state.showModal} onClose={this.close} />
                        <button type="button" className="btn btn-warning" onClick={() => this.handleUpdateQuizReading()}>L??u Th??ng Tin</button>
                        <table className="table">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">Id</th>
                                    <th scope="col">C??u H???i</th>
                                    <th scope="col">????p ??n</th>
                                    <th scope="col">L???a Ch???n 1</th>
                                    <th scope="col">L???a Ch???n 2</th>
                                    <th scope="col">L???a Ch???n 3</th>
                                    <th scope="col">L???a Ch???n 4</th>
                                    <th scope="col">Gi???i Th??ch</th>
                                    <th scope="col">L?? Th?? ????n</th>
                                    {/* <th scope="col">L?? Th?? ????i</th>
                                    <th scope="col">L?? Th?? Ba</th> */}
                                    {/* <th scope="col">S??? Th??? T???</th> */}
                                    <th scope="col">Part</th>
                                    <th scope="col">N??m</th>
                                    <th scope="col">H??nh ?????ng</th>


                                </tr>
                            </thead>
                            <tbody>
                                {arrQuizReading && arrQuizReading.length > 0 && arrQuizReading.map((item, index) => {
                                    return (
                                        <tr>
                                            <th scope="row">{item.id}</th>
                                            <td>{item.question}</td>
                                            <td>{item.correct_answer}</td>
                                            <td>{item.option_1}</td>
                                            <td>{item.option_2}</td>
                                            <td>{item.option_3}</td>
                                            <td>{item.option_4}</td>
                                            <td>{item.explain}</td>
                                            <td>{item.letterquestion}</td>
                                            {/* <td>{item.letterquestiontwo}</td>
                                            <td>{item.letterquestionthree}</td> */}
                                            {/* <td>{item.number}</td> */}
                                            <td>{item.keyPart}</td>
                                            <td>{item.keyYear}</td>
                                            <td>
                                                <button className='btn btn-danger' onClick={() => this.deleteQuizReadingServices(item)}>X??a</button>
                                                <button className='btn btn-warning' onClick={() => this.handleQuizReading(item)}>S???a</button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(MoreInfoReadExerciseManage);
