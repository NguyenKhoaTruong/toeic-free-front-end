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
                alert('Chưa Nhập :' + ' ' + arrCheck[i])
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
        await toast.success("Bình Luận Của Bạn Đã Được Ghi Nhận");

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

        console.log('check pảt', this.props.match.params.part)
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
                                <span className='title-text-detail-vocabulary' id='cac-buoc-hoc-tu-vung-hieu-qua'>Xem Trọn Bộ Từ Vựng TOEIC Từ Part 1 đến Part 7 và các bộ từ vựng TOEIC khác.</span>
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
                                                <span className='title-list-main'>Nội Dung Chính:</span>
                                                <div className='option-list-main'>
                                                    <a href='#cac-buoc-hoc-tu-vung-hieu-qua'>Các Bước Học Từ Vựng TOEIC Hiệu Quả .</a>
                                                    <a href='#buoc1-thu-nhat-von-tu-vung-rieng-le-trong-bai-thi-toeic'>
                                                        Bước 1 - Thu nhặt vốn từ vựng riêng lẻ thường xuyên xuất hiện trong bài khi TOEIC.
                                                    </a>
                                                    <a href='#buoc2-hoc-nguyen-cum-tu-khong-nen-hoc-rieng-le'>
                                                        Bước 2 -Học nguyên cụm từ chứ không nên học từng từ riêng lẻ để não đỡ tốn thời gian liên kết các thông tin hơn.
                                                    </a>
                                                    <a href='#buoc3-tuong-tuong-ra-hinh-anh-moi-lan-doc'>
                                                        Bước 3: Luôn luôn TƯỞNG TƯỢNG ra hình ảnh mỗi lần đọc một cụm từ.
                                                    </a>
                                                    <a href='#luu-y-khi hoc-tu-vung'>
                                                        Lưu ý khi học từ vựng.
                                                    </a>
                                                    <a href='#tu-vung-hay-gap'>Từ vựng hay gặp trong bài thi TOEIC.</a>
                                                    <a href='#danh-sach-tu-vung-thuong-gap'>Danh sách những từ vựng thường gặp trong bài thi TOEIC.</a>
                                                    {arrContentVocabulary && arrContentVocabulary.length > 0 && arrContentVocabulary.map((item, index) => {
                                                        return (
                                                            <>
                                                                {item.part === this.props.match.params.part ?
                                                                    <a href='#bai-tu-vung-tham-khao'>
                                                                        {item.name_vocabulary}. Ngoài ra còn nhiều bài từ vựng theo phần của bài thi các bạn tham khảo ở đây.
                                                                    </a>
                                                                    :
                                                                    <></>}
                                                            </>
                                                        )
                                                    })}
                                                    <a href='#ket-luan'>Kết Luận</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-8 border'>
                                        <div className='text'>
                                            <span className='title-step' id='buoc1-thu-nhat-von-tu-vung-rieng-le-trong-bai-thi-toeic'>
                                                Các Bước Học Từ Vựng TOEIC Hiệu Quả .
                                            </span>
                                            <p className='title-step'>
                                                Bước 1 {'-'} Thu nhặt vốn từ vựng riêng lẻ thường xuyên xuất hiện trong bài khi TOEIC.
                                            </p>
                                            <p className='content-title-step'>
                                                Đó là những từ mô tả hành động của người, các động từ miêu tả dạng bị tác động cho vật,
                                                các danh từ mô tả vật thể hay xuất hiện trong tranh.
                                                Hoặc là những từ đồng nghĩa với các từ xuất hiện trong đoạn văn phần đọc và phần nghe.
                                                Có thể là từ loại hoặc cụm từ đi chung với nhau.
                                            </p>
                                            <p className='content-title-step'>
                                                Bạn có thể tìm thấy những từ vựng riêng lẻ bên trên trong {'-'}
                                                Những từ vựng thường gặp trong bài thi TOEIC ở gần cuối bài học này.
                                            </p>
                                            <p className='content-title-step' id='buoc2-hoc-nguyen-cum-tu-khong-nen-hoc-rieng-le'>
                                                Nếu từ nào bạn chưa rõ nghĩa tiếng Việt, hoặc chưa hình dung ra được danh từ, hành động,
                                                … thì bạn có thể tra Google Images để hình dung ra. Ví dụ từ “patio“, nó là một khoảng không gian bên ngoài ngôi nhà,
                                                rất khó hình dung ra được nếu không liên kết nó với một vài hình ảnh để đưa vào bộ nhớ
                                            </p>
                                            <p className='title-step'>
                                                Bước 2 {'-'}Học nguyên cụm từ chứ không nên học từng từ riêng lẻ để não đỡ tốn thời gian liên kết các thông tin hơn.
                                            </p>
                                            <p className='content-title-step'>
                                                Học nguyên 1 cụm từ sẽ dễ mường tượng ra cảnh vật được miêu tả, hành động được thực hiện hơn là 1 từ riêng lẻ.
                                            </p>
                                            <p className='content-title-step'>
                                                Nếu bạn không biết nghĩa của cụm từ, hãy copy nguyên câu hoặc nguyên cụm từ đó lên GOOGLE
                                                và nhấp vào tab Hình ảnh để xem có hình ảnh nào thể hiện được câu đó hay không,
                                                từ đó giúp cho việc tiếp thu được tốt hơn.
                                            </p>
                                            <p className='content-title-step'>
                                                Hành động chống cằm – resting her chin on her hand.
                                            </p>
                                            <p className='content-title-step'>
                                                Không những là học qua Tai (Audio) mà còn là học qua Hình ảnh (Visual).
                                            </p>
                                            <p className='content-title-step' id='buoc3-tuong-tuong-ra-hinh-anh-moi-lan-doc'>
                                                Kế đến bạn có thể dùng ngôn ngữ cơ thể (các bộ phận trên cơ thể mình) để MINH HỌA lại các hành động trong các cụm từ ấy
                                                {'=>'} nhằm mục đích khắc sâu vào tâm trí, tốt cho trí nhớ dài hạn, chỉ cần trong hình hiện lên hành động ấy,
                                                là não bộ có thể ngay lập tức hiện lên 1 số những cụm từ mà bạn đã từng diễn đạt thông qua Body Language liền.
                                                Cách học này là học thông qua Vận động.
                                            </p>
                                            <p className='title-step'>
                                                Bước 3: Luôn luôn TƯỞNG TƯỢNG ra hình ảnh mỗi lần đọc một cụm từ.
                                            </p>
                                            <p className='content-title-step'>
                                                Ví dụ: chairs …stacked in the corner of the room {'=>'} trong đầu tưởng tượng về hình ảnh đó liền,
                                                việc này chỉ hiệu quả trong trường hợp bạn đã hiểu nghĩa của câu đó rồi,
                                                và bước này sẽ là bước giúp ăn sâu vào bộ nhớ, hoặc là bước ôn tập lại.
                                            </p>
                                            <p className='content-title-step'>
                                                Hoặc trong suốt 1 ngày dài hoạt động,
                                                bạn có thể thực hành động tác ÔN TẬP này bằng cách gọi tên các danh từ
                                                chỉ vật thể / hoặc các cụm miêu tả mà bạn đã từng học.
                                            </p>
                                            <p className='content-title-step'>
                                                Ví dụ: đi ra đường, thấy xe cộ dừng ở ngã tư {'=>'} trong đầu có thể hiện lên: “Vehicles are stopped at the intersection.”;
                                                thấy người đi bộ đi qua vạch kẻ đường {'=>'}trong đầu có thể hiện lên:”The passengers are using crosswalk“.
                                            </p>
                                            <p className='content-title-step' id='luu-y-khi hoc-tu-vung'>
                                                Hoặc ví dụ: mình làm việc mệt quá, mình ngả người ra sau dựa vào ghế
                                                {'=>'}leaning against the chairs; hoặc tay mình chống cằm và mình có thể nói: “resting her chin on her hand“;
                                                hoặc mình đang nhấp ngụm trà ở trung tâm, mình có thể nói “I{`'`}m sipping tea from a cup“
                                            </p>
                                            <p className='title-step'>
                                                Lưu ý khi học từ vựng.
                                            </p>
                                            <p className='content-title-step'>
                                                Khi học từ vựng, nhất là từ vựng phần nghe TOEIC như Part 1,
                                                bạn nên nhớ là học để nghe, vì vậy cần phải học cả phát âm của từ,
                                                và quen với phát âm đó, có như vậy khi nghe bạn mới nhận diện được từ đã học.
                                            </p>
                                            <p className='content-title-step' id='tu-vung-hay-gap'>
                                                Chưa quen với phát âm của từ là một trong những nguyên nhân khiến bạn không nghe Tiếng Anh được.
                                                Nếu bạn muốn cải thiện kỹ năng nghe TOEIC và biết cách lên kế hoạch luyện nghe thế nào để đạt được 500-650+ điểm TOEIC sau từ 1 đến 2 tháng,
                                                Xem thêm bài học này Luyện nghe TOEIC
                                            </p>
                                            <p className='title-step' id='danh-sach-tu-vung-thuong-gap'>
                                                Từ vựng hay gặp trong bài thi TOEIC.
                                            </p>
                                            <p className='title-step' id='bai-tu-vung-tham-khao'>
                                                Danh sách những từ vựng thường gặp trong bài thi TOEIC.
                                            </p>
                                            {arrContentVocabulary && arrContentVocabulary.length > 0 && arrContentVocabulary.map((item, index) => {
                                                return (
                                                    <>
                                                        {item.part === this.props.match.params.part ?
                                                            <p className='title-step' id='ket-luan'>
                                                                {item.name_vocabulary}. Ngoài ra còn nhiều bài từ vựng theo phần của bài thi các bạn tham khảo ở đây.
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
                                                Kết Luận
                                            </p>
                                            <p className='content-title-step'>
                                                Nếu bạn chăm chỉ học từ vựng học tốt ngữ pháp nắm bắt được các cụm
                                                từ thì điểm số khi đi thi TOEIC của bạn chắc chắc rằng sẽ ngày càng cải thiện về điểm số cũng như kiến thức.
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
                                <label className='text-comment'>Bình Luận</label>
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
                                                {/* <label className='text-comment'>Bình Luận</label> */}
                                                <input type="text" name="content_comment_vocabulary" className="input-comment" placeholder="Nhập Bình luận Của Bạn ...."
                                                    onChange={(event) => { this.onChangeInput(event, 'content_comment_vocabulary') }}
                                                    value={this.state.content_comment_vocabulary}
                                                />

                                            </div>
                                            <button className="btn btn-primary btn-comment-vocabulary" style={{ fontSize: '20px' }} onClick={() => this.handleCreateCommentVocabulary()}>Gửi</button>
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
