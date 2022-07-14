import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Nav from '../../routes/Nav';
import './Grammar.scss';
import { getAllGrammars } from '../../services/userService';
import Footer from '../../routes/Footer';
import NoteUser from './NoteUser';
class Grammar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrGrammars: [],
        }
    }
    async componentDidMount() {
        await this.getAllGrammars();
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
    handeOnClickNameGrammar = (item) => {
        console.log('check item id', item)
        let indexclick = '';
        this.setState({
            indexclick: item,
        })
        console.log('check indexclick ', this.state.indexclick)

    }
    handleDetailGrammar = (dataGrammar) => {
        console.log('check data dataGrammar', dataGrammar)
        this.props.history.push(`/ngu-phap-chi-tiet/${dataGrammar.id}/${dataGrammar.name_grammar}`)
        this.props.history.go(`/ngu-phap-chi-tiet/${dataGrammar.id}/${dataGrammar.name_grammar}`)
    }
    render() {
        const { isLoggedIn, userInfo } = this.props;
        let arrGrammars = this.state.arrGrammars;
        console.log('check arrGrammar', arrGrammars)
        let indexclick = this.state.indexclick;
        let linkToRedirect = isLoggedIn ? '/system/user-manage' : '/';

        return (
            <React.Fragment>
                {<Redirect to={linkToRedirect} /> &&
                    <>
                        <Nav />
                        {isLoggedIn && userInfo && <NoteUser />}


                    </>}
                <></>
                <div className='container-grammar-list-all'>
                    <div className='content-grammar-list-all'>
                        <div className='ad-gammar-img'>
                            <img className='img-ad-gammar'
                                src='https://i.ytimg.com/vi/WHANspgnsbQ/maxresdefault.jpg'
                            />
                        </div>
                        <div className='row all-list-grammar mt-3'>
                            <div className='col-2'></div>
                            <div className='col-8 list-grammar'>
                                <div className='title-list-grammar'>
                                    <span className='title-name-list'> Ngữ Pháp Tiếng Anh, Toeic</span>
                                </div>
                                <div className='content-show-list border'>
                                    <div className='row row-content-show-list'>
                                        <div className='col-8 show-all-lisst'>
                                            <div className='list-show-all-grammar'>
                                                {arrGrammars && arrGrammars.length > 0 && arrGrammars.map((item, index) => {
                                                    let imageBase64 = '';
                                                    imageBase64 = new Buffer(item.img_grammar, 'base64').toString('binary');
                                                    console.log('check item.image', imageBase64)
                                                    return (
                                                        <>
                                                            <div className='item-grammar border' onClick={() => this.handleDetailGrammar(item)}>
                                                                {/* <img className='img-one-of-list'

                                                                /> */}
                                                                <div className='img-one-of-list' style={{ backgroundImage: `url(${imageBase64})` }}></div>
                                                                <div className='ct-item-gramar'>
                                                                    <p className='name-grammar-item'>
                                                                        {item.name_grammar}
                                                                    </p>
                                                                    <p className='name-grammar-item-content-html' dangerouslySetInnerHTML={{ __html: item.content_html }}>
                                                                    </p>
                                                                    <div className='view-next-grammar'>
                                                                        {"Xem Thêm >>"}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </>
                                                    )
                                                })}

                                            </div>

                                        </div>
                                        <div className='col-4 show-grammar-lq'>
                                            <div className='img-ad-grammar'>
                                                <img className='border'
                                                    src='https://easyeducation.vn/wp-content/uploads/2021/04/tonghopnguphap.png' />
                                                <img className='border'
                                                    src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSX0pk_yeAJxayXz3NhPtV6J9CgHmvctRwaZUlwKTxIDUSFfdGACayrmnPPpbdAT0oIeY&usqp=CAU' />
                                                <img className='border'
                                                    src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5ZBXaIRnuv8Qb84JWSA47sNeIyo1kUppSlQ&usqp=CAU' />
                                            </div>
                                            <div className='grammar-related'>
                                                <span className='title-grammar-related'>Bài Ngữ Pháp Liên Quan</span>
                                                {arrGrammars && arrGrammars.length > 0 && arrGrammars.map((item, index) => {
                                                    let imageBase64 = '';
                                                    imageBase64 = new Buffer(item.img_grammar, 'base64').toString('binary');
                                                    console.log('check item.image', imageBase64)
                                                    return (
                                                        <>
                                                            {index >= 3 &&
                                                                <div className='list-related border' onClick={() => this.handleDetailGrammar(item)} >
                                                                    <div className='img-of-list-related' style={{ backgroundImage: `url(${imageBase64})` }}></div>
                                                                    <p className='name-grammar-item-related'>
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
                    </div>
                </div>
                {/* <div className='container-grammar'>
                    <div className='list-optione-grammar'>
                        <div className='list-1'>
                            {arrGrammars && arrGrammars.map((item, index) => {

                                return (

                                    <div className='list-grammar border'>
                                        <div className="list-group">
                                            <a className="list-group-item list-group-item-action " key={index} onClick={() => this.handeOnClickNameGrammar(item.id)}>
                                                {item.name_grammar}
                                            </a>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className='content-grammar border'>
                        <div className='list-2 m-3'>
                            {arrGrammars && arrGrammars.map((item, index) => {
                                return (
                                    <>
                                        {!indexclick ? <p className="text-uppercase" dangerouslySetInnerHTML={{ __html: item.content_html }}></p> : ''}
                                        {indexclick === item.id ? <p className="text-uppercase" dangerouslySetInnerHTML={{ __html: item.content_html }}></p> : ''}

                                    </>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-center mt-3">
                </div> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(Grammar);
