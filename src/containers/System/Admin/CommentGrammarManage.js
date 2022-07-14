import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ReadExerciseManage.scss';
import {
    getAllCommentGrammar,
    deleteCommentGrammarServices
} from '../../../services/userService';
import { toast } from 'react-toastify';

class CommentGrammarManage extends Component {
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
            arrCommentGrammar: []
        };

    }

    async componentDidMount() {
        await this.getAllCommentGrammar();

    }
    getAllCommentGrammar = async () => {

        let response = await getAllCommentGrammar('ALL');
        if (response && response.errCode === 0) {
            this.setState({
                arrCommentGrammar: response.commentGrammar.data,

            });

        }
        console.log('get vocabulary from node js:', response)
    }

    deleteCommentGrammarServices = async (commentGrammar) => {
        try {
            let res = await deleteCommentGrammarServices(commentGrammar.id);
            toast.success("Xóa Thành Công");
            if (res && res.errCode === 0) {
                await this.getAllCommentGrammar();
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
        let { arrCommentGrammar } = this.state;
        console.log('check arrCommentGrammar ', arrCommentGrammar);

        return (
            <>
                <div className='content-manage-reading-exercise' style={{ paddingLeft: '10px' }}>
                    <div className='content-reading-exercise-manage'>
                        <div className='manage-comment-grammar m-3' style={{ fontSize: '25px', textAlign: 'center', fontWeight: 'bolder' }}> Quản Lý Bình Luận Bài Ngữ Pháp</div>
                        <table className="table">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">Id</th>
                                    <th scope="col">Bình Luận</th>
                                    <th scope="col">Bài Ngữ Pháp</th>
                                    <th scope="col">Người Dùng</th>
                                    <th scope="col">Hành Động</th>

                                </tr>
                            </thead>
                            <tbody>
                                {
                                    arrCommentGrammar && arrCommentGrammar.length > 0 && arrCommentGrammar.map((item, index) => {
                                        console.log('check item comment grammar', item)
                                        return (
                                            <tr>
                                                <th scope="row">{item.id}</th>
                                                <td>{item.content_comment_grammar}</td>
                                                <td>{item.userDataCommentForGrammar.name_grammar}</td>
                                                <td>{item.userDataCommentGrammar.name}</td>

                                                <td >
                                                    <button className='btn btn-danger' onClick={() => this.deleteCommentGrammarServices(item)}>Xóa</button>

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

export default connect(mapStateToProps, mapDispatchToProps)(CommentGrammarManage);
