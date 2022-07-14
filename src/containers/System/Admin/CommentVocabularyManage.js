import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ReadExerciseManage.scss';
import {
    getAllCommentVocabulary,
    deleteCommentVocavularyServices
} from '../../../services/userService';
import { toast } from 'react-toastify';

class CommentVocabularyManage extends Component {
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
            arrCommentVocabulary: []
        };

    }

    async componentDidMount() {
        await this.getAllCommentVocabulary();

    }
    getAllCommentVocabulary = async () => {

        let response = await getAllCommentVocabulary('ALL');
        if (response && response.errCode === 0) {
            this.setState({
                arrCommentVocabulary: response.commentVocabulary.data,

            });

        }
        console.log('get vocabulary from node js:', response)
    }

    deleteCommentVocabularyServices = async (commentVocabulary) => {
        try {
            let res = await deleteCommentVocavularyServices(commentVocabulary.id);
            toast.success("Xóa Thành Công");
            if (res && res.errCode === 0) {
                await this.getAllCommentVocabulary();
            } else {
                alert(res.errMessage)
                toast.error("Bình Luận Không Tồn Tại");
            }
            console.log(res);
        } catch (e) {
            console.log(e);
        }
    }
    render() {
        let { arrCommentVocabulary } = this.state;
        console.log('check arrCommentVocabulary ', arrCommentVocabulary);

        return (
            <>
                <div className='content-manage-reading-exercise' style={{ paddingLeft: '10px' }}>
                    <div className='content-reading-exercise-manage'>
                        <div className='manage-comment-vocabulary m-3' style={{ fontSize: '25px', textAlign: 'center', fontWeight: 'bolder' }}> Quản Lý Bình Luận Bài Từ Vựng</div>
                        <table className="table">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">id</th>
                                    <th scope="col">Bình Luận</th>
                                    <th scope="col">Bài Từ Vựng</th>
                                    <th scope="col">Người Dùng</th>
                                    <th scope="col">Hành Động</th>

                                </tr>
                            </thead>
                            <tbody>
                                {
                                    arrCommentVocabulary && arrCommentVocabulary.length > 0 && arrCommentVocabulary.map((item, index) => {
                                        console.log('check item comment vocabulary', item)
                                        return (
                                            <tr>
                                                <th scope="row">{item.id}</th>
                                                <td>{item.content_comment_vocabulary}</td>
                                                <td>{item.userDataCommentContentVocabulary.keyMap}</td>
                                                <td>{item.userDataCommentVocabulary.name}</td>

                                                <td >
                                                    <button className='btn btn-danger' onClick={() => this.deleteCommentVocabularyServices(item)}>Xóa</button>

                                                </td>
                                            </tr>
                                        )
                                    })
                                }

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

export default connect(mapStateToProps, mapDispatchToProps)(CommentVocabularyManage);
