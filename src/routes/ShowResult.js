import React, { Component } from "react";
import { CommonUtils } from "../utils"
import * as actions from "../store/actions";
import { push } from "connected-react-router";
import { connect } from 'react-redux';
import {
    Button,
    Modal,
} from "react-bootstrap";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { emitter } from '../utils/emitter';



class ShowResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            smShow: false,
            mode: "showResult",
            isShowPassword: false,
            errMessage: '',
            previewImgURL: '',
            isOpen: false,

        };

    }
    handleNext = (dataShow) => {
        this.setState({
            dataShow: true
        })

    }
    renderShowResult = () => {

        return (

            <>
                <div className="result-form-modal">
                    <span> Số câu đúng của bạn là : {' '} {this.props.dataResult}</span>
                    <br></br>
                    <span>Số điểm ước tính: {' '}{this.props.dataResult * 5}</span>

                </div>
            </>
        )

    };

    render() {
        return (
            <div>
                <Modal
                    show={this.props.showModal}
                    onHide={this.props.onClose}
                    onSubmit={this.onSubmit}
                    // bsSize="large"
                    size="lg"
                >
                    <Modal.Header closeButton={true}>
                        <h2>{this.state.mode === "showResult" && "Kết Quả"}</h2>

                    </Modal.Header>
                    <Modal.Body>
                        {this.state.mode === "showResult" && (this.renderShowResult())}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.props.onClose}>Kết thúc Và Xem Kết Quả</Button>

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
export default connect(mapStateToProps, mapDispatchToProps)(ShowResult);


