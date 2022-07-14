import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Nav from '../../routes/Nav';
import './DetailGrammar.scss';
import {
    getAllGrammars, createNewCommentGrammarService, getAllCommentGrammar
} from '../../services/userService';
import Footer from '../../routes/Footer';
import NoteUser from './NoteUser';
import { toast } from 'react-toastify';
class DetailGrammar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrGrammars: [],
            arrDetailGrammar: [],
            content_comment_grammar: '',
            grammarid: '',
            userid: '',
            arrCommentGrammar: []
        }
    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let res = await getAllGrammars(id);
            if (res && res.errCode === 0) {
                this.setState({
                    arrDetailGrammar: res.grammars,

                });
                console.log('get quiz test from node js:', res)
            }
        }
        await this.getAllGrammars();
        await this.getAllCommentGrammar();
    }
    getAllCommentGrammar = async () => {

        let response = await getAllCommentGrammar(this.props.match.params.id);
        if (response && response.errCode === 0) {
            this.setState({
                arrCommentGrammar: response.commentGrammar.data,

            });
        }
        console.log('get vocabulary from node js:', response)
    }
    getAllGrammars = async () => {
        let response = await getAllGrammars('ALL');
        if (response && response.errCode === 0) {
            this.setState({
                arrGrammars: response.grammars.reverse(),
            });
        }
        console.log('get grammar from node js:', response)
    }
    handleDetailGrammar = (dataGrammar) => {
        // console.log('check data dataGrammar', dataGrammar)
        this.props.history.push(`/ngu-phap-chi-tiet/${dataGrammar.id}/${dataGrammar.name_grammar}`)
        this.props.history.go(`/ngu-phap-chi-tiet/${dataGrammar.id}/${dataGrammar.name_grammar}`);
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
        let arrCheck = ['content_comment_grammar']
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert('Chưa Nhập :' + ' ' + arrCheck[i])
                break;
            }
        }
        return isValid;
    }
    handleCreateCommentGrammar = async () => {
        let isValid = this.checkValidateInput();
        if (isValid === false) return;
        console.log('checl submit state', this.state);
        createNewCommentGrammarService({
            content_comment_grammar: this.state.content_comment_grammar,
            grammarid: this.props.match.params.id,
            userid: this.props.userInfo.id,
        });
        await toast.success("Bình Luận Của Bạn Đã Được Ghi Nhận");
        this.setState({
            content_comment_grammar: '',
        })
    }
    render() {
        const { isLoggedIn, userInfo } = this.props;
        let arrDetailGrammar = this.state.arrDetailGrammar;
        let arrGrammars = this.state.arrGrammars;
        let arrCommentGrammar = this.state.arrCommentGrammar;
        console.log('check arrGrammars', arrGrammars)
        console.log('check arrCommentGrammar', arrCommentGrammar)
        console.log('check arrGrammar', arrDetailGrammar.img_grammar)
        let linkToRedirect = isLoggedIn ? '/system/user-manage' : '/';
        return (
            <React.Fragment>
                {<Redirect to={linkToRedirect} /> &&
                    <>
                        <Nav />
                        {isLoggedIn && userInfo && <NoteUser />}
                    </>}
                <></>
                <div className='container-detail-grammar'>
                    <div className='content-grammar-detail'>
                        <div className='img-detail-gammar m-1'>
                            {/* <img className='img-gammar-detail'
                                src='https://i.ytimg.com/vi/WHANspgnsbQ/maxresdefault.jpg'
                            /> */}
                            {
                                arrGrammars && arrGrammars.length > 0 && arrGrammars.map((item, index) => {
                                    let imageBase64 = '';
                                    imageBase64 = new Buffer(item.img_grammar, 'base64').toString('binary');
                                    return (
                                        <>
                                            {item.id === arrDetailGrammar.id && <div className='img-gammar-detail' style={{ backgroundImage: `url(${imageBase64})` }}></div>}
                                        </>)
                                })
                            }
                        </div>
                        <div className='row all-detail-grammar mt-3'>
                            <div className='col-2'></div>
                            <div className='col-8 detail-list-grammar'>

                                <div className='detail-title-list-grammar'>
                                    <span className='title-name-list'>{arrDetailGrammar.name_grammar}</span>
                                </div>
                                <div className='content-show-detail border'>
                                    <div className='row row-content-show-detail'>
                                        <div className='col-8 show-all-detail'>
                                            <div className='list-show-deatil-grammar'>
                                                <p className='content-detail-grammar-item-content-html' dangerouslySetInnerHTML={{ __html: arrDetailGrammar.content_html }}>
                                                </p>
                                            </div>
                                        </div>
                                        <div className='col-4 show-grammar-lq'>
                                            <div className='show-img-fix'>
                                                <div className='img-ad-grammar'>
                                                    <img className='border'
                                                        src='https://easyeducation.vn/wp-content/uploads/2021/04/tonghopnguphap.png' />
                                                    <img className='border'
                                                        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSX0pk_yeAJxayXz3NhPtV6J9CgHmvctRwaZUlwKTxIDUSFfdGACayrmnPPpbdAT0oIeY&usqp=CAU' />
                                                    <img className='border'
                                                        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5ZBXaIRnuv8Qb84JWSA47sNeIyo1kUppSlQ&usqp=CAU' />
                                                </div>
                                            </div>
                                            <div className='detail-grammar-related'>
                                                <span className='title-detail-grammar-related'>Liên Kết Nhanh</span>
                                                {arrGrammars && arrGrammars.length > 0 && arrGrammars.map((item, index) => {
                                                    let imageBase64 = '';
                                                    imageBase64 = new Buffer(item.img_grammar, 'base64').toString('binary');
                                                    console.log('check item.image', imageBase64)
                                                    return (
                                                        <>
                                                            {item &&
                                                                <div className='list-related-detail border' onClick={() => this.handleDetailGrammar(item)} >
                                                                    <div className='detail-img-of-list-related' style={{ backgroundImage: `url(${imageBase64})` }}></div>
                                                                    <p className='name-detail-grammar-item-related'>
                                                                        {item.name_grammar}
                                                                    </p>
                                                                </div>}
                                                        </>
                                                    )
                                                })}

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-2'></div>
                        </div>
                        <div className='row comment-grammar'>
                            <div className='col-2'></div>
                            <div className='col-8 comment-grammar-for-user-detail mt-5 border'>
                                <label className='text-comment'>Bình Luận</label>
                                {arrCommentGrammar && arrCommentGrammar.length > 0 && arrCommentGrammar.map((item, index) => {
                                    console.log('checl get all comment grammar', item)
                                    let imgUserComment = '';
                                    if (!item.userDataCommentGrammar.image) {
                                        imgUserComment = '';
                                    }
                                    else {
                                        imgUserComment = new Buffer(item.userDataCommentGrammar.image, 'base64').toString('binary');
                                    }
                                    console.log('checl get all comment grammar', imgUserComment)
                                    return (
                                        <>
                                            <div className='get-all-comment-grammar'>
                                                {imgUserComment && <>
                                                    <div className='img-comment' style={{ backgroundImage: `url(${imgUserComment})` }}></div>
                                                </>}
                                                <span className='comment-for-user border'>{item.content_comment_grammar}</span>
                                            </div>
                                        </>
                                    )
                                })}
                                <div className='get-user-comment-grammar border'>
                                    {isLoggedIn && userInfo &&
                                        <form>
                                            <div className="form-group">
                                                <input type="text" name="content_comment_grammar" className="input-comment" placeholder="Nhập Bình luận Của Bạn ...."
                                                    onChange={(event) => { this.onChangeInput(event, 'content_comment_grammar') }}
                                                    value={this.state.content_comment_grammar}
                                                />
                                            </div>
                                            <button className="btn btn-primary btn-comment-grammar" style={{ fontSize: '15px' }} onClick={() => this.handleCreateCommentGrammar()}>Gửi</button>
                                        </form>
                                    }
                                </div>
                            </div>
                            <div className='col-2'></div>

                        </div>
                    </div>
                </div>
                <Footer />
            </React.Fragment>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailGrammar);
