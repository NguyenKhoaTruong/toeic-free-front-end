import React, { Component } from 'react';
import Nav from '../../routes/Nav';
import './Vocabulary.scss';
import Footer from '../../routes/Footer';
import { withRouter } from 'react-router-dom';
import {
    getAllVocabularys, getAllContentVocabularys,
    createNewCommentVocabularyService, getAllCommentVocabulary
} from '../../services/userService';
import Table from '../Pagination/table';
import NoteUser from './NoteUser';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
class Vocabulary extends Component {
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


    };
    async componentDidMount() {
        await this.getAllVocabularys();
        await this.getAllVocabularys1();
        await this.getAllVocabularys2();
        await this.getAllVocabularys3();
        await this.getAllVocabularys4();
        await this.getAllVocabularys5();
        await this.getAllVocabularys6();
        await this.getAllContentVocabularys();

    }

    getAllVocabularys = async () => {

        let response = await getAllVocabularys('PART 1');
        if (response && response.errCode === 0) {
            this.setState({
                arrVocabularys: response.vocabularys.reverse(),

            });

        }
        console.log('get vocabulary from node js:', response)
    }
    getAllVocabularys1 = async () => {

        let response = await getAllVocabularys('PART 2');
        if (response && response.errCode === 0) {
            this.setState({
                arrVocabularys1: response.vocabularys.reverse(),

            });

        }
        console.log('get vocabulary from node js:', response)
    }
    getAllVocabularys2 = async () => {

        let response = await getAllVocabularys('PART 3');
        if (response && response.errCode === 0) {
            this.setState({
                arrVocabularys2: response.vocabularys.reverse(),

            });

        }
        console.log('get vocabulary from node js:', response)
    }
    getAllVocabularys3 = async () => {

        let response = await getAllVocabularys('PART 4');
        if (response && response.errCode === 0) {
            this.setState({
                arrVocabularys3: response.vocabularys.reverse(),

            });

        }
        console.log('get vocabulary from node js:', response)
    }
    getAllVocabularys4 = async () => {

        let response = await getAllVocabularys('PART 5');
        if (response && response.errCode === 0) {
            this.setState({
                arrVocabularys4: response.vocabularys.reverse(),

            });

        }
        console.log('get vocabulary from node js:', response)
    }
    getAllVocabularys5 = async () => {

        let response = await getAllVocabularys('PART 6');
        if (response && response.errCode === 0) {
            this.setState({
                arrVocabularys5: response.vocabularys.reverse(),

            });

        }
        console.log('get vocabulary from node js:', response)
    }
    getAllVocabularys6 = async () => {

        let response = await getAllVocabularys('PART 7');
        if (response && response.errCode === 0) {
            this.setState({
                arrVocabularys6: response.vocabularys.reverse(),

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
        this.props.history.push(`/tu-vung/${data.id}/${data.name_vocabulary}/${data.part}`)
        this.props.history.go(`/tu-vung/${data.id}/${data.name_vocabulary}/${data.part}`)

    }

    render() {
        const { isLoggedIn, userInfo } = this.props;
        let { arrVocabularys, arrVocabularys1, arrVocabularys2, arrVocabularys3, arrVocabularys4, arrVocabularys5, arrVocabularys6, arrContentVocabulary
        } = this.state;
        console.log('check state arrVocabularys', arrVocabularys)
        console.log('check state arrVocabularys1', arrVocabularys1)
        console.log('check state arrVocabularys2', arrVocabularys2)
        console.log('check state arrVocabularys3', arrVocabularys3)
        console.log('check state arrVocabularys4', arrVocabularys4)
        console.log('check state arrVocabularys5', arrVocabularys5)
        console.log('check state arrVocabularys6', arrVocabularys6)
        console.log('check state arrContentVocabulary', arrContentVocabulary)
        let indexnameclick = this.state.indexnameclick;
        console.log('check state indexnameclick', indexnameclick)
        console.log('check state', this.state)
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
        for (
            let i = 1;
            i <= Math.ceil(arrVocabularys1.length / this.state.itemsPerPage);
            i++
        ) {
            pageNumbers.push(i);
        }
        let renderPageNumbers1 = [];
        if (arrVocabularys1.length > 2) {
            renderPageNumbers1 = pageNumbers.map(number => {
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
        for (
            let i = 1;
            i <= Math.ceil(arrVocabularys2.length / this.state.itemsPerPage);
            i++
        ) {
            pageNumbers.push(i);
        }
        let renderPageNumbers2 = [];
        if (arrVocabularys2.length > 2) {
            renderPageNumbers2 = pageNumbers.map(number => {
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
        for (
            let i = 1;
            i <= Math.ceil(arrVocabularys3.length / this.state.itemsPerPage);
            i++
        ) {
            pageNumbers.push(i);
        }
        let renderPageNumbers3 = [];
        if (arrVocabularys3.length > 2) {
            renderPageNumbers3 = pageNumbers.map(number => {
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
        for (
            let i = 1;
            i <= Math.ceil(arrVocabularys4.length / this.state.itemsPerPage);
            i++
        ) {
            pageNumbers.push(i);
        }
        let renderPageNumbers4 = [];
        if (arrVocabularys4.length > 2) {
            renderPageNumbers4 = pageNumbers.map(number => {
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
        for (
            let i = 1;
            i <= Math.ceil(arrVocabularys5.length / this.state.itemsPerPage);
            i++
        ) {
            pageNumbers.push(i);
        }
        let renderPageNumbers5 = [];
        if (arrVocabularys5.length > 2) {
            renderPageNumbers5 = pageNumbers.map(number => {
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
        for (
            let i = 1;
            i <= Math.ceil(arrVocabularys6.length / this.state.itemsPerPage);
            i++
        ) {
            pageNumbers.push(i);
        }
        let renderPageNumbers6 = [];
        if (arrVocabularys6.length > 2) {
            renderPageNumbers6 = pageNumbers.map(number => {
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
                <div className='container-vocabulary'>
                    <div className='content-vocabulary'>
                        <div className='ad-vocabulary'>
                            <img className='img-ad-vocabulary'
                                src='https://hacknaotuvung.com/wp-content/uploads/2019/09/3-C%C3%81CH-H%E1%BB%8CC-T%E1%BB%AA-V%E1%BB%B0NG-TOEIC.png'
                            />
                        </div>
                        <div className='row content-vocabulary-list'>
                            <div className='col-2'></div>
                            <div className='col-8 show-content-vocabulary'>
                                <p className='title-text-vocabulary text-center' id='cac-buoc-hoc-tu-vung-hieu-qua'>Xem Trọn Bộ Từ Vựng TOEIC Từ Part 1 đến Part 7 và các bộ từ vựng TOEIC khác.</p>
                                <div className='list-option-vocabulary-part border'>

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
                                <div className='row content-text-vocabulary'>
                                    <div className='col-2'>
                                        <div className='main-content-vocabulary'>
                                            <div className='list-main-content-vocabulary border'>
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
                                                    <a href='#bai-tu-vung-tham-khao'>Từ Vựng Part-1. Ngoài ra còn nhiều bài từ vựng theo phần của bài thi các bạn tham khảo ở đây.</a>
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
                                            <p className='title-step' id='ket-luan'>
                                                Từ Vựng Part-1. Ngoài ra còn nhiều bài từ vựng theo phần của bài thi các bạn tham khảo ở đây.
                                            </p>
                                            {arrVocabularys && <Table
                                                data={arrVocabularys}
                                                itemsPerPage={this.state.itemsPerPage}
                                                currentPage={this.state.currentPage}
                                            />}
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
                                        <div className='share-content-vocabulary'>
                                            <img className='img-show-share-content-vocabulary border'
                                                src='https://4.bp.blogspot.com/-NNr9yC3PV8A/WbxuUFndShI/AAAAAAAAEc8/vQxDUKuhYMUDI9XcpTq0o95yzmDPqHtEQCLcBGAs/s1600/tu-vung-on-thi-toeic-3.png' />
                                            <img className='img-show-share-content-vocabulary border'
                                                src='https://i.ytimg.com/vi/Lmllo11I4bA/maxresdefault.jpg' />
                                            <img className='img-show-share-content-vocabulary border'
                                                src='https://tienganhthayquy.com/wp-content/uploads/2020/10/DANH-SACH-TU-VUNG-THUONG-GAP-TRONG-TOEIC-VE-CAC-CUM-DANH-TU-GHEP-1-566x800.png' />
                                            <img className='img-show-share-content-vocabulary border'
                                                src='http://tailieutoeic.com/wp-content/uploads/2019/08/28-chu-de-tu-vung-thong-dung-trong-bai-thi-toeic-part-4.jpg' />
                                            <img className='img-show-share-content-vocabulary border'
                                                src='https://tienganhthayquy.com/wp-content/uploads/2020/11/01.png' />
                                            <img className='img-show-share-content-vocabulary border'
                                                src='https://sites.google.com/site/everydayenglish1101/_/rsrc/1406196377247/600-tu-vung-toeic/1.png' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-2'></div>
                        </div>

                    </div>
                </div>
                {/* {isLoggedIn && userInfo && <NoteUser />}
                <div className='vocabulary-container' >
                    <div className='vocabulary-content'>

                        <div className="row" style={{ marginRight: '15px' }}>
                            <div className="col-2 border">
                                <div className='list-vocabulary'>
                                    {arrContentVocabulary && arrContentVocabulary.map((item, index) => {
                                        console.log('check item arr o', item)
                                        return (

                                            <div className="list-group-name-vocabulary" key={index}>
                                                <a className="list-group-item list-group-item-action text-center" onClick={() => this.handleShowContentVocabulary(item.part)}>
                                                    {item.name_vocabulary}
                                                </a>

                                            </div>
                                        )
                                    })}

                                </div></div>
                            <div className="col-8 border">

                                <div className='vocabulary-lesson-content border'>
                                    <div className='title-content-part'>
                                        {arrContentVocabulary && arrContentVocabulary.length > 0 && arrContentVocabulary.map((item, index) => {
                                            return (
                                                <>
                                                    {indexnameclick === item.part ? <h2 className='text-center' >Học:{' '} {item.name_vocabulary}.</h2> : <></>}
                                                </>
                                            )
                                        })}

                                    </div>

                                    <div className="d-flex flex-wrap">
                                        {!indexnameclick ? <Table
                                            data={arrVocabularys}
                                            itemsPerPage={this.state.itemsPerPage}
                                            currentPage={this.state.currentPage}
                                        /> : <></>}
                                        {indexnameclick === 'PART 1' ? <Table
                                            data={arrVocabularys}
                                            itemsPerPage={this.state.itemsPerPage}
                                            currentPage={this.state.currentPage}
                                        /> : <></>}
                                        {indexnameclick === 'PART 2' ? <Table
                                            data={arrVocabularys1}
                                            itemsPerPage={this.state.itemsPerPage}
                                            currentPage={this.state.currentPage}
                                        /> : <></>}
                                        {indexnameclick === 'PART 3' ? <Table
                                            data={arrVocabularys2}
                                            itemsPerPage={this.state.itemsPerPage}
                                            currentPage={this.state.currentPage}
                                        /> : <></>}
                                        {indexnameclick === 'PART 4' ? <Table
                                            data={arrVocabularys3}
                                            itemsPerPage={this.state.itemsPerPage}
                                            currentPage={this.state.currentPage}
                                        /> : <></>}
                                        {indexnameclick === 'PART 5' ? <Table
                                            data={arrVocabularys4}
                                            itemsPerPage={this.state.itemsPerPage}
                                            currentPage={this.state.currentPage}
                                        /> : <></>}
                                        {indexnameclick === 'PART 6' ? <Table
                                            data={arrVocabularys5}
                                            itemsPerPage={this.state.itemsPerPage}
                                            currentPage={this.state.currentPage}
                                        /> : <></>}
                                        {indexnameclick === 'PART 7' ? <Table
                                            data={arrVocabularys6}
                                            itemsPerPage={this.state.itemsPerPage}
                                            currentPage={this.state.currentPage}
                                        /> : <></>}
                                    </div>
                                </div>
                            </div>
                            <div className='col-2 border'>
                                <div className='main-content-nav-vocabulary m-3 border'>
                                    <div className='main-content border m-3'>
                                        <span className='span-main-content'> Nội dung:</span>
                                        <ul>
                                            <li className='li-main-content'><a href="#lear-vocabulary">1.Học từ vựng.</a></li>
                                            <li className='li-main-content'><a href="#learn-vocabulary-img">2.Học từ vựng bằng hình ảnh.</a></li>
                                        </ul>
                                    </div>
                                    <nav aria-label="Page navigation example">
                                        <ul className="pagination justify-content-center">
                                            <li className="page-item pager border">{renderPageNumbers}</li>
                                        </ul>
                                    </nav>
                                </div>


                            </div>
                        </div>
                    </div>
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Vocabulary));
