import React, { Component } from "react";
// import * as actions from "../store/actions";
import { push } from "connected-react-router";
import { connect } from 'react-redux';
import {
    Button,
    Modal,
} from "react-bootstrap";
import 'react-image-lightbox/style.css';
import { emitter } from '../utils/emitter';
import { uploadFileQuizTest } from '../services/userService';
import { toast } from 'react-toastify';


class AddCsvQuizTest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            smShow: false,
            mode: "addCsvQuizTest",
            isOpen: false,
            selectedFile: null

        };
        this.listenToEmiiter();
    }
    listenToEmiiter() {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {

            this.setState({

            })
        })
    }
    setMode = mode => {
        this.setState({
            mode
        });
    };
    onChangeHandler = (event) => {
        console.log(event.target.files)
        this.setState({
            selectedFile: event.target.files,
            loaded: 0,
        })
    }

    onClickHandler = async (datafile) => {
        try {
            if (datafile) {
                const data = new FormData()
                for (var x = 0; x < this.state.selectedFile.length; x++) {
                    data.append('file', this.state.selectedFile[x])
                }
                console.log('check data exelc', data)
                // await UploadFileVocabulary(data);
                await uploadFileQuizTest(data);
                // console.log('check respoen', response)
                // if (response.message.errCode === 1) {

                //     toast.success('Tư vựng đã tồn tại');
                // }
                toast.success('Tạo Thành Công');
            }
            else {
                toast.error('File Không được để trống ');
            }
        } catch (e) {
            console.log(e);
        }
    }
    renderAddCsvQuizTest = () => {
        let { selectedFile } = this.state;
        console.log('check data files', selectedFile)
        return (
            <div>

                <form className="form-horizontal " method="post" enctype="multipart/form-data" action="/upload" >
                    <fieldset>
                        <div className="row">
                            <div className="form-group  ">
                                <label className="col-sm-12 m-3">Chọn File Excel ( Định Dạng CSV.)</label>
                                <div className="col-sm-12">
                                    <input
                                        type="file"
                                        className="form-control m-3"
                                        name="uploaded_file"
                                        multiple
                                        onChange={this.onChangeHandler}
                                    />
                                </div>
                            </div>
                        </div>
                    </fieldset>
                    <div className="form-action">
                        <button
                            type="button"
                            className="btn btn-lg btn-success  btn-left btn-block"
                            onClick={() => this.onClickHandler(selectedFile)}>Upload<span className="icon-arrow-right2 outlined"></span></button>
                    </div>
                </form>
            </div>
        );
    };

    render() {
        return (
            <div>
                <Modal
                    show={this.props.showModal}
                    onHide={this.props.onClose}
                    onSubmit={this.onSubmit}

                    size="lg"
                >
                    <Modal.Header closeButton={true}>
                        <h2>{this.state.mode === "addCsvQuizTest" && "Thêm Dữ Liệu Câu Hỏi Đề Thi Thử  Bằng File Excel"}</h2>
                    </Modal.Header>
                    <Modal.Body>
                        {this.state.mode === "addCsvQuizTest" && (this.renderAddCsvQuizTest())}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.props.onClose}>Close</Button>
                    </Modal.Footer>
                </Modal>



            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
    };
};
const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddCsvQuizTest);


