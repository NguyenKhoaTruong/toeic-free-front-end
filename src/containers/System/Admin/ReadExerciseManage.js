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
class ReadExerciseManage extends Component {
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
                toast.success("Thêm Bài Đọc Thành Công");
                this.setState({
                    name_reading: '',
                    test_year: '',
                    level: '',
                    part: '',
                })
            }
            else {
                await toast.error("Tên Bài Đọc Này Đã  Tồn Tại Xin Thử Lại Với Một Tên Khác")
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
            toast.success("Xóa Thành Công");
            if (res && res.errCode === 0) {
                await this.getAllReadExercise();
            } else {
                alert(res.errMessage)
                toast.error("Bài Đọc Không Tồn Tại");
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
                toast.success("Sửa Thành Công");

                this.setState({
                    name_reading: '',
                    level: '',
                    part: '',
                    test_year: '',
                })
            } else {
                alert(res.errMessage)
                toast.error("Bài Đọc Không Tồn Tại");
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
                toast.success("Sửa Thành Công");

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
                toast.error("Câu hỏi bài Đọc Không Tồn Tại");
            }
            console.log(res);
        } catch (e) {
            console.log(e);
        }
    }
    deleteQuizReadingServices = async (quizReading) => {
        try {
            let res = await deleteQuizReadingServices(quizReading.id);
            toast.success("Xóa Thành Công");
            if (res && res.errCode === 0) {
                await this.getAllQuizReading();
            } else {
                alert(res.errMessage)
                toast.error("Câu Hỏi Không Tồn Tại");
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
                alert('Chưa Nhập :' + ' ' + arrCheck[i])
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
                        <div className='manage-read-exercise m-3 ' style={{ fontSize: '25px', textAlign: 'center', fontWeight: 'bolder' }}> Quản Lý Bài Đọc</div>
                        <form>
                            <div className="form-group">
                                <label>Tên Bài Đọc</label>
                                <input type="text"
                                    className="form-control"
                                    onChange={(event) => { this.onChangeInput(event, 'name_reading') }}
                                    value={this.state.name_reading}
                                />
                            </div>
                            <div className="form-group">
                                <label>Năm</label>
                                <input type="text"
                                    className="form-control"
                                    onChange={(event) => { this.onChangeInput(event, 'test_year') }}
                                    value={this.state.test_year}
                                />
                            </div>
                            <div className="form-row">

                                <div className="form-group col-md-4">
                                    <label >Độ Khó</label>
                                    <select className="form-control"
                                        onChange={(event) => { this.onChangeInput(event, 'level') }}
                                        value={this.state.level}>
                                        <option selected>Nhấn Để Chọn</option>
                                        <option value='Level 1'> Level 1</option>
                                        <option value='Level 2'> Level 2</option>
                                        <option value='Level 3'> Level 3</option>
                                        <option value='Level 4'> Level 4</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-row">

                                <div className="form-group col-md-4">
                                    <label >Part</label>
                                    <select className="form-control"
                                        onChange={(event) => { this.onChangeInput(event, 'part') }}
                                        value={this.state.part}>
                                        <option selected>Nhấn Để Chọn</option>
                                        <option value='PART 5'> Part 5</option>
                                        <option value='PART 6'> Part 6</option>
                                        <option value='PART 7'> Part 7</option>
                                    </select>
                                </div>
                            </div>
                            <button type="button" className="btn btn-primary" onClick={() => this.handleCreateReadExercise()}>Thêm bài Đọc</button>
                            <button type="button" className="btn btn-warning" onClick={() => this.handleUpdateReadExercise()}>Lưu Thông Tin</button>
                        </form>
                        <table className="table">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">Id</th>
                                    <th scope="col">Độ Khó</th>
                                    <th scope="col">Part</th>
                                    <th scope="col">Tên</th>
                                    <th scope="col">Năm</th>
                                    <th scope="col">Hành Động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    arrReadExercise && arrReadExercise.length > 0 && arrReadExercise.map((item, index) => {
                                        return (
                                            <tr>
                                                <th scope="row">{item.id}</th>
                                                <td>{item.level}</td>
                                                <td>{item.part}</td>
                                                <td>{item.name_reading}</td>
                                                <td>{item.test_year}</td>
                                                <td >
                                                    <button className='btn btn-danger' onClick={() => this.deleteReadExerciseServices(item)}>Xóa</button>
                                                    <button className='btn btn-info' onClick={() => this.handleEditReadExercise(item)}>Sửa</button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }

                            </tbody>
                        </table>
                        {/* <div> Quản Lý Câu Hỏi Bài Đọc</div>
                        <form>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label >Câu Hỏi</label>
                                    <input type="text" className="form-control"
                                        onChange={(event) => { this.onChangeInput(event, '	question') }}
                                        value={this.state.question}
                                    />
                                </div>
                                <div className="form-group col-md-6">
                                    <label >Đáp Án Đúng</label>
                                    <input type="text" className="form-control"
                                        onChange={(event) => { this.onChangeInput(event, 'correct_answer') }}
                                        value={this.state.correct_answer}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label >Đáp án 1</label>
                                <input type="text" className="form-control"
                                    onChange={(event) => { this.onChangeInput(event, 'option_1') }}
                                    value={this.state.option_1}
                                />
                            </div>
                            <div className="form-group">
                                <label >Đáp án 2</label>
                                <input type="text" className="form-control"
                                    onChange={(event) => { this.onChangeInput(event, 'option_2') }}
                                    value={this.state.option_2}
                                />
                            </div>
                            <div className="form-group">
                                <label >Đáp án 3</label>
                                <input type="text" className="form-control"
                                    onChange={(event) => { this.onChangeInput(event, 'option_3') }}
                                    value={this.state.option_3}
                                />
                            </div>
                            <div className="form-group">
                                <label >Đáp án 4</label>
                                <input type="text" className="form-control"
                                    onChange={(event) => { this.onChangeInput(event, 'option_4') }}
                                    value={this.state.option_4}
                                />
                            </div>
                            <div className="form-group">
                                <label >Giải thích</label>
                                <input type="text" className="form-control"

                                    onChange={(event) => { this.onChangeInput(event, 'explain') }}
                                    value={this.state.explain}
                                />
                            </div>
                            <div className="form-group">
                                <label >Lá Thư 1</label>
                                <input type="text" className="form-control"
                                    onChange={(event) => { this.onChangeInput(event, 'letterquestion') }}
                                    value={this.state.letterquestion}
                                />
                            </div>
                            <div className="form-group">
                                <label >Lá Thư 2</label>
                                <input type="text" className="form-control"
                                    onChange={(event) => { this.onChangeInput(event, 'letterquestiontwo') }}
                                    value={this.state.letterquestiontwo}
                                />
                            </div>
                            <div className="form-group">
                                <label >Lá Thư 3</label>
                                <input type="text" className="form-control"
                                    onChange={(event) => { this.onChangeInput(event, 'letterquestionthree	') }}
                                    value={this.state.letterquestionthree}
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label >Number</label>
                                <input type="text" className="form-control"
                                    onChange={(event) => { this.onChangeInput(event, 'number') }}
                                    value={this.state.number}
                                />
                            </div>
                            <div className="form-row">

                                <div className="form-group col-md-4">
                                    <label >keyPart</label>
                                    <select className="form-control" onChange={(event) => { this.onChangeInput(event, 'keyPart') }}
                                        value={this.state.keyPart}>
                                        <option selected>Chọn...</option>
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
                            <div className="form-row">

                                <div className="form-group col-md-4">
                                    <label >keyYear</label>
                                    <select className="form-control" onChange={(event) => { this.onChangeInput(event, 'keyYear') }}
                                        value={this.state.keyYear}>
                                        <option selected>Chọn...</option>
                                        <option value='2022'>2022</option>
                                        <option value='2021'>2021</option>
                                        <option value='2020'>2020</option>
                                        <option value='2019'>2019</option>

                                    </select>
                                </div>
                            </div>

                        </form>
                        <button type=" button" className="btn btn-success ml-3" onClick={this.open}>Thêm Dữ Liệu Bằng File Excel</button>
                        <AddCsvQuizReading showModal={this.state.showModal} onClose={this.close} />
                        <button type="button" className="btn btn-warning" onClick={() => this.handleUpdateQuizReading()}>Lưu Thông Tin</button>
                        <table className="table">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">id</th>
                                    <th scope="col">Question</th>
                                    <th scope="col">Correct_Answer</th>
                                    <th scope="col">Option 1</th>
                                    <th scope="col">Option 2</th>
                                    <th scope="col">Option 3</th>
                                    <th scope="col">Option 4</th>
                                    <th scope="col">Explain</th>
                                    <th scope="col">Letter Question</th>
                                    <th scope="col">Letter Question Two</th>
                                    <th scope="col">Letter Question Three</th>
                                    <th scope="col">Number</th>
                                    <th scope="col">KeyPart</th>
                                    <th scope="col">KeyYear</th>
                                    <th scope="col">Action</th>


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
                                            <td>{item.letterquestiontwo}</td>
                                            <td>{item.letterquestionthree}</td>
                                            <td>{item.number}</td>
                                            <td>{item.keyPart}</td>
                                            <td>{item.keyYear}</td>
                                            <td>
                                                <button className='btn btn-danger' onClick={() => this.deleteQuizReadingServices(item)}>Xóa</button>
                                                <button className='btn btn-warning' onClick={() => this.handleQuizReading(item)}>Sửa</button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(ReadExerciseManage);
