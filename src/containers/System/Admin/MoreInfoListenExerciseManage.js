import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    getAllListenExercise,
    getAllQuizListening,
    createNewListenExerciseService,
    deleteListenExerciseServices,
    editListenExerciseService,
    deleteQuizListeningServices,
    editQuizListeningService
} from '../../../services/userService';
import { toast } from 'react-toastify';
import AddCsvQuizListening from '../../../routes/AddCsvQuizListening';
class MoreInfoListenExerciseManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrListenExercise: [],
            arrQuizListening: [],
            name_listening: '',
            level: '',
            part: '',
            test_year: '',
            showModal: false,
        };

    }

    async componentDidMount() {
        await this.getAllListenExercise();
        await this.getAllQuizListening();
    }
    getAllListenExercise = async () => {
        console.log('check data arr json get listen exercis', getAllListenExercise('ALL'));
        let response = await getAllListenExercise('ALL');
        if (response && response.errCode === 0) {
            this.setState({
                arrListenExercise: response.listeningexercises.reverse(),

            });
            toast.success("get all listen exercise sucssedd");
        }
        console.log('get listen exercise from node js:', response)
    }
    getAllQuizListening = async () => {
        console.log('check data arr json get quiz listening', getAllQuizListening('ALL'));
        let response = await getAllQuizListening('ALL');
        if (response && response.errCode === 0) {
            this.setState({
                arrQuizListening: response.quizListenings.reverse(),

            });
            toast.success("get all quiz listening sucssedd");
        }
        console.log('get quiz listening from node js:', response)
    }
    handleCreateListenExercise = async () => {
        let isValid = this.checkValidateInput();
        if (isValid === false) return;
        try {
            let response = await createNewListenExerciseService({
                level: this.state.level,
                name_listening: this.state.name_listening,
                part: this.state.part,
                test_year: this.state.test_year
            })
            if (response.message.errCode === 0) {

                await this.getAllListenExercise();
                toast.success("Th??m B??i Nghe Th??nh C??ng");
                this.setState({
                    name_listening: '',
                    test_year: '',
                    level: '',
                    part: '',
                })
            }
            else {
                await toast.error("T??n B??i Nghe N??y ????  T???n T???i Xin Th??? L???i V???i M???t T??n Kh??c")
                this.setState({
                    name_listening: '',
                    test_year: '',
                    level: '',
                    part: '',
                })

            }
        } catch (e) {
            console.log(e);
        }
    }
    deleteListenExerciseServices = async (listenExercise) => {
        try {
            let res = await deleteListenExerciseServices(listenExercise.id);
            toast.success("X??a Th??nh C??ng");
            if (res && res.errCode === 0) {
                await this.getAllListenExercise();
            } else {
                alert(res.errMessage)
                toast.error("B??i Nghe Kh??ng T???n T???i");
            }
            console.log(res);
        } catch (e) {
            console.log(e);
        }
    }
    handleEditListenExercise = async (listenExercise) => {
        console.log('check data listenExercise edit listenExercise', listenExercise)
        this.setState({
            id: listenExercise.id,
            name_listening: listenExercise.name_listening,
            level: listenExercise.level,
            part: listenExercise.part,
            test_year: listenExercise.test_year,
        })

        console.log('check datat edit', listenExercise)
    }
    handleEditQuizListening = async (quizListening) => {
        console.log('check data quizListening edit quizListening', quizListening)
        this.setState({
            id: quizListening.id,
            question: quizListening.question,
            correct_answer: quizListening.correct_answer,
            option_1: quizListening.option_1,
            option_2: quizListening.option_2,
            option_3: quizListening.option_3,
            option_4: quizListening.option_4,
            img: quizListening.img,
            audio_mp3: quizListening.audio_mp3,
            number: quizListening.number,
            keyPart: quizListening.keyPart,
            keyYear: quizListening.keyYear,
            explain: quizListening.explain,
        })

        console.log('check datat edit', quizListening)
    }
    handleUpdateListenExercise = async () => {
        let arrupdate = {
            id: this.state.id,
            name_listening: this.state.name_listening,
            level: this.state.level,
            part: this.state.part,
            test_year: this.state.test_year,
        }

        console.log('check data arr listen exercise update', arrupdate)
        try {
            let res = await editListenExerciseService(arrupdate);
            console.log('click save listen excises:', res)
            if (res && res.errCode === 0) {
                await this.getAllListenExercise();
                toast.success("S???a Th??nh C??ng");

                this.setState({
                    name_listening: '',
                    level: '',
                    part: '',
                    test_year: '',
                })
            } else {
                alert(res.errMessage)
                toast.error("B??i Nghe Kh??ng T???n T???i");
            }
            console.log(res);
        } catch (e) {
            console.log(e);
        }
    }
    //update quiz listenning
    handleUpdateQuizListening = async () => {
        let arrupdate = {
            id: this.state.id,
            question: this.state.question,
            correct_answer: this.state.correct_answer,
            option_1: this.state.option_1,
            option_2: this.state.option_2,
            option_3: this.state.option_3,
            option_4: this.state.option_4,
            img: this.state.img,
            audio_mp3: this.state.audio_mp3,
            number: this.state.number,
            keyPart: this.state.keyPart,
            keyYear: this.state.keyYear,
            explain: this.state.explain,
        }

        console.log('check data arr quiz listening update', arrupdate)
        try {
            let res = await editQuizListeningService(arrupdate);
            console.log('click save quiz listening:', res)
            if (res && res.errCode === 0) {
                await this.getAllQuizListening();
                toast.success("S???a Th??nh C??ng");

                this.setState({
                    question: '',
                    correct_answer: '',
                    option_1: '',
                    option_2: '',
                    option_3: '',
                    option_4: '',
                    img: '',
                    audio_mp3: '',
                    number: '',
                    keyPart: '',
                    keyYear: '',
                    explain: '',
                })
            } else {
                alert(res.errMessage)
                toast.error("C??u h???i b??i Nghe Kh??ng T???n T???i");
            }
            console.log(res);
        } catch (e) {
            console.log(e);
        }
    }
    deleteQuizListeningServices = async (quizListening) => {
        try {
            let res = await deleteQuizListeningServices(quizListening.id);
            toast.success("X??a Th??nh C??ng");
            if (res && res.errCode === 0) {
                await this.getAllQuizListening();
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
        let arrCheck = ['name_listening', 'part', 'test_year', 'level']
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
        let { arrListenExercise, arrQuizListening } = this.state;
        console.log('check arrReadExercise ', arrListenExercise);
        console.log('check arrQuizReading ', arrQuizListening);
        return (
            <>
                <div className='content-manage-listening-exercise d-flex justify-content-around'>
                    <div className='content-listening-exercise-manage' style={{ paddingLeft: '10px' }}>

                        <div className='manage-more-info-listen-exercise m-3' style={{ fontSize: '25px', textAlign: 'center', fontWeight: 'bolder' }}> Qu???n L?? C??u H???i B??i Nghe</div>
                        <form>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label >C??u H???i</label>
                                    <input type="text" className="form-control"
                                        onChange={(event) => { this.onChangeInput(event, 'question') }}
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
                                <div className="form-group  col-md-6">
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

                                <div className="form-group col-md-6" >
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
                                    <label >??m Thanh</label>
                                    <input type="text" className="form-control"

                                        onChange={(event) => { this.onChangeInput(event, 'audio_mp3') }}
                                        value={this.state.audio_mp3}
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
                                    <label >Gi???i Th??ch</label>
                                    <input type="text" className="form-control"
                                        onChange={(event) => { this.onChangeInput(event, 'explain') }}
                                        value={this.state.explain}
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
                                        <option value='PART 1'>PART 1</option>
                                        <option value='PART 2'>PART 2</option>
                                        <option value='PART 3'>PART 3</option>
                                        <option value='PART 4'>PART 4</option>
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
                        <button type="button" className="btn btn-warning" onClick={() => this.handleUpdateQuizListening()}>L??u Th??ng Tin</button>
                        <AddCsvQuizListening showModal={this.state.showModal} onClose={this.close} />
                        <table className="table">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">Id</th>
                                    <th scope="col">C??u h???i</th>
                                    <th scope="col">????p ??n </th>
                                    <th scope="col">L???a Ch???n 1</th>
                                    <th scope="col">L???a Ch???n 2</th>
                                    <th scope="col">L???a Ch???n 3</th>
                                    <th scope="col">L???a Ch???n 4</th>
                                    <th scope="col">??m thanh</th>

                                    <th scope="col">Part</th>
                                    <th scope="col">N??m</th>
                                    {/* <th scope="col">Gi???i th??ch</th> */}
                                    <th scope="col">H??nh ?????ng</th>


                                </tr>
                            </thead>
                            <tbody>
                                {arrQuizListening && arrQuizListening.length > 0 && arrQuizListening.map((item, index) => {
                                    return (
                                        <tr>
                                            <th scope="row">{item.id}</th>
                                            <td>{item.question}</td>
                                            <td>{item.correct_answer}</td>
                                            <td>{item.option_1}</td>
                                            <td>{item.option_2}</td>
                                            <td>{item.option_3}</td>
                                            <td>{item.option_4}</td>

                                            {/* <figure>
                                                <audio

                                                    type="audio/mp3"
                                                    src={'http://docs.google.com/uc?export=open&id=' + `${item.audio_mp3}`}>
                                                </audio>
                                            </figure> */}
                                            <td>{item.audio_mp3}</td>
                                            <td>{item.keyPart}</td>
                                            <td>{item.keyYear}</td>
                                            {/* <td>{item.explain}</td> */}
                                            <td>
                                                <button className='btn btn-danger' onClick={() => this.deleteQuizListeningServices(item)}>X??a</button>
                                                <button className='btn btn-warning' onClick={() => this.handleEditQuizListening(item)}>S???a</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(MoreInfoListenExerciseManage);
