import React, { Component } from 'react';
import Nav from '../../routes/Nav';
import './DetailVocabulary.scss';
import Footer from '../../routes/Footer';
import { withRouter } from 'react-router-dom';
import {
    getAllVocabularys, getAllContentVocabularys
    , createNewCommentVocabularyService, getAllCommentVocabulary
} from '../../services/userService';
import Table from '../Pagination/table';
import NoteUser from './NoteUser';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
class DetailVocabulary extends Component {
    state = {
        query: "",
        itemsPerPage: 12,
        currentPage: 1,
        arrVocabularys: [],
        arrVocabularys1: [],
        arrVocabularys2: [],
        arrVocabularys3: [],
        arrVocabularys4: [],
        arrVocabularys5: [],
        arrVocabularys6: [],
        displayData1: [],
        arrContentVocabulary: [],
        content_comment_vocabulary: '',
        vocabularyid: '',
        userid: '',
        arrCommentVocabulary: []

    };
    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.part) {
            let part = this.props.match.params.part;
            let response = await getAllVocabularys(part);
            if (response && response.errCode === 0) {
                this.setState({
                    arrVocabularys: response.vocabularys.reverse(),

                });

            }
        }
        await this.getAllContentVocabularys();
        await this.getAllCommentVocabulary();

    }
    getAllCommentVocabulary = async () => {

        let response = await getAllCommentVocabulary(this.props.match.params.id);
        if (response && response.errCode === 0) {
            this.setState({
                arrCommentVocabulary: response.commentVocabulary.data,

            });

        }
        console.log('get vocabulary from node js:', response)
    }
    getAllContentVocabularys = async () => {

        let response = await getAllContentVocabularys('ALL');
        if (response && response.errCode === 0) {
            this.setState({
                arrContentVocabulary: response.contentvocabularys.reverse(),

            });

        }
        console.log('get vocabulary from node js:', response)
    }
    pageClick = (e) => {
        this.setState({
            currentPage: Number(e.target.id)
        });
    };

    handleShowContentVocabulary = (listname) => {

        console.log('check onclick', listname)
        let indexnameclick = '';
        this.setState({
            indexnameclick: listname
        })

    }
    handleShowDetailContentVocabulary = (data) => {
        this.props.history.push(`/tu-vung/${data.id}/${data.name_vocabulary}/${data.part}`);
        this.props.history.go(`/tu-vung/${data.id}/${data.name_vocabulary}/${data.part}`)
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
        let arrCheck = ['content_comment_vocabulary']
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert('Ch??a Nh???p :' + ' ' + arrCheck[i])
                break;
            }
        }
        return isValid;
    }
    handleCreateCommentVocabulary = async () => {
        let isValid = this.checkValidateInput();
        if (isValid === false) return;
        console.log('checl submit state', this.state);
        createNewCommentVocabularyService({
            content_comment_vocabulary: this.state.content_comment_vocabulary,
            vocabularyid: this.props.match.params.id,
            userid: this.props.userInfo.id
        });
        await toast.success("B??nh Lu???n C???a B???n ???? ???????c Ghi Nh???n");

        this.setState({
            content_comment_vocabulary: '',
        })


    }
    render() {
        const { isLoggedIn, userInfo } = this.props;
        let { arrVocabularys, arrVocabularys1, arrVocabularys2, arrVocabularys3, arrVocabularys4, arrVocabularys5, arrVocabularys6, arrContentVocabulary, arrCommentVocabulary
        } = this.state;
        console.log('check state arrVocabularys detail vocabulary', arrVocabularys)
        console.log('check state arrCommentVocabulary arrCommentVocabulary arrCommentVocabulary', arrCommentVocabulary)
        console.log('check state arrContentVocabulary', arrContentVocabulary)
        let indexnameclick = this.state.indexnameclick;
        console.log('check state indexnameclick', indexnameclick)
        console.log('check state', this.state)

        console.log('check p???t', this.props.match.params.part)
        const pageNumbers = [];
        const currentPageNum = this.state.currentPage;
        for (
            let i = 1;
            i <= Math.ceil(arrVocabularys.length / this.state.itemsPerPage);
            i++
        ) {
            pageNumbers.push(i);
        }
        let renderPageNumbers = [];
        if (arrVocabularys.length > 2) {
            renderPageNumbers = pageNumbers.map(number => {
                let className = "";
                if (this.state.currentPage === number) {
                    className = "active";
                }
                return (
                    <>
                        <ul>
                            <li
                                key={number}
                                id={number}
                                className={className}
                                onClick={this.pageClick}
                            >
                                {number}
                            </li>
                        </ul>
                    </>
                );
            });
        }
        return (
            <React.Fragment>
                <Nav />
                <NoteUser />
                <div className='container-detail-vocabulary'>
                    <div className='content-detail-vocabulary'>
                        <div className='ad-detail-vocabulary d-flex justify-content-center'>
                            {/* <img className='img-ad-vocabulary'
                                src='https://hacknaotuvung.com/wp-content/uploads/2019/09/3-C%C3%81CH-H%E1%BB%8CC-T%E1%BB%AA-V%E1%BB%B0NG-TOEIC.png'
                            /> */}
                            {arrContentVocabulary && arrContentVocabulary.length > 0 && arrContentVocabulary.map((item, index) => {
                                let imageBase64 = '';
                                imageBase64 = new Buffer(item.img_vocabulary, 'base64').toString('binary');
                                return (
                                    <>
                                        {item.part === this.props.match.params.part ?
                                            <>
                                                <div className='img-ad-detail-vocabulary' style={{ backgroundImage: `url(${imageBase64})` }}></div>
                                            </>
                                            :
                                            <></>}
                                    </>
                                )
                            })}

                        </div>
                        <div className='row content-detail-vocabulary-list'>
                            <div className='col-2'></div>
                            <div className='col-12 show-content-detail-vocabulary'>
                                <span className='title-text-detail-vocabulary' id='cac-buoc-hoc-tu-vung-hieu-qua'>Xem Tr???n B??? T??? V???ng TOEIC T??? Part 1 ?????n Part 7 v?? c??c b??? t??? v???ng TOEIC kh??c.</span>
                                <div className='list-option-detail-vocabulary-part border'>

                                    {arrContentVocabulary && arrContentVocabulary.length > 0 && arrContentVocabulary.map((item, index) => {
                                        let imageBase64 = '';
                                        imageBase64 = new Buffer(item.img_vocabulary, 'base64').toString('binary');
                                        return (
                                            <> <div className='item-option border' onClick={() => this.handleShowDetailContentVocabulary(item)}>
                                                <div className='img-part-option' style={{ backgroundImage: `url(${imageBase64})` }}>

                                                </div>
                                                <span className='name-part-option'>{item.name_vocabulary}</span>
                                            </div>
                                            </>)
                                    })}


                                </div>
                                <div className='row content-text-detail-vocabulary'>
                                    <div className='col-2'>
                                        <div className='main-content-detail-vocabulary'>
                                            <div className='list-main-content-detail-vocabulary ml-3 border'>
                                                <span className='title-list-main'>N???i Dung Ch??nh:</span>
                                                <div className='option-list-main'>
                                                    <a href='#cac-buoc-hoc-tu-vung-hieu-qua'>C??c B?????c H???c T??? V???ng TOEIC Hi???u Qu??? .</a>
                                                    <a href='#buoc1-thu-nhat-von-tu-vung-rieng-le-trong-bai-thi-toeic'>
                                                        B?????c 1 - Thu nh???t v???n t??? v???ng ri??ng l??? th?????ng xuy??n xu???t hi???n trong b??i khi TOEIC.
                                                    </a>
                                                    <a href='#buoc2-hoc-nguyen-cum-tu-khong-nen-hoc-rieng-le'>
                                                        B?????c 2 -H???c nguy??n c???m t??? ch??? kh??ng n??n h???c t???ng t??? ri??ng l??? ????? n??o ????? t???n th???i gian li??n k???t c??c th??ng tin h??n.
                                                    </a>
                                                    <a href='#buoc3-tuong-tuong-ra-hinh-anh-moi-lan-doc'>
                                                        B?????c 3: Lu??n lu??n T?????NG T?????NG ra h??nh ???nh m???i l???n ?????c m???t c???m t???.
                                                    </a>
                                                    <a href='#luu-y-khi hoc-tu-vung'>
                                                        L??u ?? khi h???c t??? v???ng.
                                                    </a>
                                                    <a href='#tu-vung-hay-gap'>T??? v???ng hay g???p trong b??i thi TOEIC.</a>
                                                    <a href='#danh-sach-tu-vung-thuong-gap'>Danh s??ch nh???ng t??? v???ng th?????ng g???p trong b??i thi TOEIC.</a>
                                                    {arrContentVocabulary && arrContentVocabulary.length > 0 && arrContentVocabulary.map((item, index) => {
                                                        return (
                                                            <>
                                                                {item.part === this.props.match.params.part ?
                                                                    <a href='#bai-tu-vung-tham-khao'>
                                                                        {item.name_vocabulary}. Ngo??i ra c??n nhi???u b??i t??? v???ng theo ph???n c???a b??i thi c??c b???n tham kh???o ??? ????y.
                                                                    </a>
                                                                    :
                                                                    <></>}
                                                            </>
                                                        )
                                                    })}
                                                    <a href='#ket-luan'>K???t Lu???n</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-8 border'>
                                        <div className='text'>
                                            <span className='title-step' id='buoc1-thu-nhat-von-tu-vung-rieng-le-trong-bai-thi-toeic'>
                                                C??c B?????c H???c T??? V???ng TOEIC Hi???u Qu??? .
                                            </span>
                                            <p className='title-step'>
                                                B?????c 1 {'-'} Thu nh???t v???n t??? v???ng ri??ng l??? th?????ng xuy??n xu???t hi???n trong b??i khi TOEIC.
                                            </p>
                                            <p className='content-title-step'>
                                                ???? l?? nh???ng t??? m?? t??? h??nh ?????ng c???a ng?????i, c??c ?????ng t??? mi??u t??? d???ng b??? t??c ?????ng cho v???t,
                                                c??c danh t??? m?? t??? v???t th??? hay xu???t hi???n trong tranh.
                                                Ho???c l?? nh???ng t??? ?????ng ngh??a v???i c??c t??? xu???t hi???n trong ??o???n v??n ph???n ?????c v?? ph???n nghe.
                                                C?? th??? l?? t??? lo???i ho???c c???m t??? ??i chung v???i nhau.
                                            </p>
                                            <p className='content-title-step'>
                                                B???n c?? th??? t??m th???y nh???ng t??? v???ng ri??ng l??? b??n tr??n trong {'-'}
                                                Nh???ng t??? v???ng th?????ng g???p trong b??i thi TOEIC ??? g???n cu???i b??i h???c n??y.
                                            </p>
                                            <p className='content-title-step' id='buoc2-hoc-nguyen-cum-tu-khong-nen-hoc-rieng-le'>
                                                N???u t??? n??o b???n ch??a r?? ngh??a ti???ng Vi???t, ho???c ch??a h??nh dung ra ???????c danh t???, h??nh ?????ng,
                                                ??? th?? b???n c?? th??? tra Google Images ????? h??nh dung ra. V?? d??? t??? ???patio???, n?? l?? m???t kho???ng kh??ng gian b??n ngo??i ng??i nh??,
                                                r???t kh?? h??nh dung ra ???????c n???u kh??ng li??n k???t n?? v???i m???t v??i h??nh ???nh ????? ????a v??o b??? nh???
                                            </p>
                                            <p className='title-step'>
                                                B?????c 2 {'-'}H???c nguy??n c???m t??? ch??? kh??ng n??n h???c t???ng t??? ri??ng l??? ????? n??o ????? t???n th???i gian li??n k???t c??c th??ng tin h??n.
                                            </p>
                                            <p className='content-title-step'>
                                                H???c nguy??n 1 c???m t??? s??? d??? m?????ng t?????ng ra c???nh v???t ???????c mi??u t???, h??nh ?????ng ???????c th???c hi???n h??n l?? 1 t??? ri??ng l???.
                                            </p>
                                            <p className='content-title-step'>
                                                N???u b???n kh??ng bi???t ngh??a c???a c???m t???, h??y copy nguy??n c??u ho???c nguy??n c???m t??? ???? l??n GOOGLE
                                                v?? nh???p v??o tab H??nh ???nh ????? xem c?? h??nh ???nh n??o th??? hi???n ???????c c??u ???? hay kh??ng,
                                                t??? ???? gi??p cho vi???c ti???p thu ???????c t???t h??n.
                                            </p>
                                            <p className='content-title-step'>
                                                H??nh ?????ng ch???ng c???m ??? resting her chin on her hand.
                                            </p>
                                            <p className='content-title-step'>
                                                Kh??ng nh???ng l?? h???c qua Tai (Audio) m?? c??n l?? h???c qua H??nh ???nh (Visual).
                                            </p>
                                            <p className='content-title-step' id='buoc3-tuong-tuong-ra-hinh-anh-moi-lan-doc'>
                                                K??? ?????n b???n c?? th??? d??ng ng??n ng??? c?? th??? (c??c b??? ph???n tr??n c?? th??? m??nh) ????? MINH H???A l???i c??c h??nh ?????ng trong c??c c???m t??? ???y
                                                {'=>'} nh???m m???c ????ch kh???c s??u v??o t??m tr??, t???t cho tr?? nh??? d??i h???n, ch??? c???n trong h??nh hi???n l??n h??nh ?????ng ???y,
                                                l?? n??o b??? c?? th??? ngay l???p t???c hi???n l??n 1 s??? nh???ng c???m t??? m?? b???n ???? t???ng di???n ?????t th??ng qua Body Language li???n.
                                                C??ch h???c n??y l?? h???c th??ng qua V???n ?????ng.
                                            </p>
                                            <p className='title-step'>
                                                B?????c 3: Lu??n lu??n T?????NG T?????NG ra h??nh ???nh m???i l???n ?????c m???t c???m t???.
                                            </p>
                                            <p className='content-title-step'>
                                                V?? d???: chairs ???stacked in the corner of the room {'=>'} trong ?????u t?????ng t?????ng v??? h??nh ???nh ???? li???n,
                                                vi???c n??y ch??? hi???u qu??? trong tr?????ng h???p b???n ???? hi???u ngh??a c???a c??u ???? r???i,
                                                v?? b?????c n??y s??? l?? b?????c gi??p ??n s??u v??o b??? nh???, ho???c l?? b?????c ??n t???p l???i.
                                            </p>
                                            <p className='content-title-step'>
                                                Ho???c trong su???t 1 ng??y d??i ho???t ?????ng,
                                                b???n c?? th??? th???c h??nh ?????ng t??c ??N T???P n??y b???ng c??ch g???i t??n c??c danh t???
                                                ch??? v???t th??? / ho???c c??c c???m mi??u t??? m?? b???n ???? t???ng h???c.
                                            </p>
                                            <p className='content-title-step'>
                                                V?? d???: ??i ra ???????ng, th???y xe c??? d???ng ??? ng?? t?? {'=>'} trong ?????u c?? th??? hi???n l??n: ???Vehicles are stopped at the intersection.???;
                                                th???y ng?????i ??i b??? ??i qua v???ch k??? ???????ng {'=>'}trong ?????u c?? th??? hi???n l??n:???The passengers are using crosswalk???.
                                            </p>
                                            <p className='content-title-step' id='luu-y-khi hoc-tu-vung'>
                                                Ho???c v?? d???: m??nh l??m vi???c m???t qu??, m??nh ng??? ng?????i ra sau d???a v??o gh???
                                                {'=>'}leaning against the chairs; ho???c tay m??nh ch???ng c???m v?? m??nh c?? th??? n??i: ???resting her chin on her hand???;
                                                ho???c m??nh ??ang nh???p ng???m tr?? ??? trung t??m, m??nh c?? th??? n??i ???I{`'`}m sipping tea from a cup???
                                            </p>
                                            <p className='title-step'>
                                                L??u ?? khi h???c t??? v???ng.
                                            </p>
                                            <p className='content-title-step'>
                                                Khi h???c t??? v???ng, nh???t l?? t??? v???ng ph???n nghe TOEIC nh?? Part 1,
                                                b???n n??n nh??? l?? h???c ????? nghe, v?? v???y c???n ph???i h???c c??? ph??t ??m c???a t???,
                                                v?? quen v???i ph??t ??m ????, c?? nh?? v???y khi nghe b???n m???i nh???n di???n ???????c t??? ???? h???c.
                                            </p>
                                            <p className='content-title-step' id='tu-vung-hay-gap'>
                                                Ch??a quen v???i ph??t ??m c???a t??? l?? m???t trong nh???ng nguy??n nh??n khi???n b???n kh??ng nghe Ti???ng Anh ???????c.
                                                N???u b???n mu???n c???i thi???n k??? n??ng nghe TOEIC v?? bi???t c??ch l??n k??? ho???ch luy???n nghe th??? n??o ????? ?????t ???????c 500-650+ ??i???m TOEIC sau t??? 1 ?????n 2 th??ng,
                                                Xem th??m b??i h???c n??y Luy???n nghe TOEIC
                                            </p>
                                            <p className='title-step' id='danh-sach-tu-vung-thuong-gap'>
                                                T??? v???ng hay g???p trong b??i thi TOEIC.
                                            </p>
                                            <p className='title-step' id='bai-tu-vung-tham-khao'>
                                                Danh s??ch nh???ng t??? v???ng th?????ng g???p trong b??i thi TOEIC.
                                            </p>
                                            {arrContentVocabulary && arrContentVocabulary.length > 0 && arrContentVocabulary.map((item, index) => {
                                                return (
                                                    <>
                                                        {item.part === this.props.match.params.part ?
                                                            <p className='title-step' id='ket-luan'>
                                                                {item.name_vocabulary}. Ngo??i ra c??n nhi???u b??i t??? v???ng theo ph???n c???a b??i thi c??c b???n tham kh???o ??? ????y.
                                                            </p>
                                                            :
                                                            <></>}
                                                    </>
                                                )
                                            })}

                                            {arrVocabularys && <Table
                                                data={arrVocabularys}
                                                itemsPerPage={this.state.itemsPerPage}
                                                currentPage={this.state.currentPage}
                                            />}
                                            <nav aria-label="Page navigation example">
                                                <ul className="pagination justify-content-center">
                                                    <li className="page-item pager border">{renderPageNumbers}</li>
                                                </ul>
                                            </nav>
                                            <p className='title-step'>
                                                K???t Lu???n
                                            </p>
                                            <p className='content-title-step'>
                                                N???u b???n ch??m ch??? h???c t??? v???ng h???c t???t ng??? ph??p n???m b???t ???????c c??c c???m
                                                t??? th?? ??i???m s??? khi ??i thi TOEIC c???a b???n ch???c ch???c r???ng s??? ng??y c??ng c???i thi???n v??? ??i???m s??? c??ng nh?? ki???n th???c.
                                            </p>

                                        </div>
                                    </div>
                                    <div className='col-2'>
                                        <div className='share-content-detail-vocabulary'>
                                            <img className='img-show-share-content-detail-vocabulary border'
                                                src='https://4.bp.blogspot.com/-NNr9yC3PV8A/WbxuUFndShI/AAAAAAAAEc8/vQxDUKuhYMUDI9XcpTq0o95yzmDPqHtEQCLcBGAs/s1600/tu-vung-on-thi-toeic-3.png' />
                                            <img className='img-show-share-content-detail-vocabulary border'
                                                src='https://i.ytimg.com/vi/Lmllo11I4bA/maxresdefault.jpg' />
                                            <img className='img-show-share-content-detail-vocabulary border'
                                                src='https://tienganhthayquy.com/wp-content/uploads/2020/10/DANH-SACH-TU-VUNG-THUONG-GAP-TRONG-TOEIC-VE-CAC-CUM-DANH-TU-GHEP-1-566x800.png' />
                                            <img className='img-show-share-content-detail-vocabulary border'
                                                src='http://tailieutoeic.com/wp-content/uploads/2019/08/28-chu-de-tu-vung-thong-dung-trong-bai-thi-toeic-part-4.jpg' />
                                            <img className='img-show-share-content-detail-vocabulary border'
                                                src='https://tienganhthayquy.com/wp-content/uploads/2020/11/01.png' />
                                            <img className='img-show-share-content-detail-vocabulary border'
                                                src='https://sites.google.com/site/everydayenglish1101/_/rsrc/1406196377247/600-tu-vung-toeic/1.png' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-2'></div>
                        </div>
                        <div className='row comment-vocabulary'>
                            <div className='col-2'></div>
                            <div className='col-8 comment-vocabulary-for-user-detail border'>
                                <label className='text-comment'>B??nh Lu???n</label>
                                {arrCommentVocabulary && arrCommentVocabulary.length > 0 && arrCommentVocabulary.map((item, index) => {
                                    console.log('checl get all comment vocabulary', item)

                                    let imgUserComment = '';

                                    if (!item.userDataCommentVocabulary.image) {
                                        imgUserComment = '';

                                    }
                                    else {
                                        imgUserComment = new Buffer(item.userDataCommentVocabulary.image, 'base64').toString('binary');
                                    }
                                    console.log('checl get all userDataCommentContentVocabulary userDataCommentContentVocabulary', imgUserComment)
                                    return (
                                        <>
                                            <div className='get-all-comment-vocabulary'>
                                                {imgUserComment && <>
                                                    <div className='img-comment' style={{ backgroundImage: `url(${imgUserComment})` }}></div>
                                                </>}
                                                <span className='comment-for-user border'>{item.content_comment_vocabulary}</span>
                                            </div>
                                        </>
                                    )
                                })}

                                <div className='get-user-comment-vocabulary border'>
                                    {isLoggedIn && userInfo &&
                                        <form>
                                            <div className="form-group">
                                                {/* <label className='text-comment'>B??nh Lu???n</label> */}
                                                <input type="text" name="content_comment_vocabulary" className="input-comment" placeholder="Nh???p B??nh lu???n C???a B???n ...."
                                                    onChange={(event) => { this.onChangeInput(event, 'content_comment_vocabulary') }}
                                                    value={this.state.content_comment_vocabulary}
                                                />

                                            </div>
                                            <button className="btn btn-primary btn-comment-vocabulary" style={{ fontSize: '20px' }} onClick={() => this.handleCreateCommentVocabulary()}>G???i</button>
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailVocabulary));
