import React, { Component } from 'react';
import { connect } from 'react-redux';
import './VocabularyManage.scss';
import {
    Button,
} from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion'
import 'bootstrap/dist/css/bootstrap.min.css';
import AddVocabularyAdmin from '../../../routes/AddVocabularyAdmin';
import { toast } from 'react-toastify';
import { CommonUtils } from "../../../utils";
import _ from 'lodash';
import Lightbox from 'react-image-lightbox';
import { Scrollbars } from 'react-custom-scrollbars';
import {
    getAllContentVocabularys,
    deleteVocabularyServices,
    createNewVocabularyService,
    editVocabulayService,
    getAllVocabularys,
    deleteContentVocabularyServices,
    editContentVocabulayService
} from '../../../services/userService';
import Footer from '../../../routes/Footer';
class VocabularyManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            showModalEditUser: false,
            arrVocabularys: [],
            arrContentVocabularys: [],
            img_vocabulary: '',
            name_vocabulary: '',
            part: '',
            previewImgURL: '',
            isOpen: false,


        }
    }

    async componentDidMount() {
        await this.getAllContentVocabularys();
        await this.getAllVocabularys();

    }
    onChangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
        console.log('check input good code', copyState)
    }
    getAllVocabularys = async () => {
        console.log('check data arr json get allvocabulary', getAllVocabularys('ALL'));
        let response = await getAllVocabularys('ALL');
        if (response && response.errCode === 0) {
            this.setState({
                arrContentVocabularys: response.vocabularys.reverse(),

            });
            toast.success("get all content vocabulary sucssedd");
        }
        console.log('get vocabulary from node js:', response)
    }
    getAllContentVocabularys = async () => {
        console.log('check data arr json get allvocabulary', getAllContentVocabularys('ALL'));
        let response = await getAllContentVocabularys('ALL');
        if (response && response.errCode === 0) {
            this.setState({
                arrVocabularys: response.contentvocabularys.reverse(),

            });
            toast.success("get all vocabulary sucssedd");
        }
        console.log('get vocabulary from node js:', response)
    }
    deleteVocabularyServices = async (vocabulary) => {
        try {
            let res = await deleteVocabularyServices(vocabulary.id);
            toast.success("Xóa Thành Công");
            if (res && res.errCode === 0) {
                await this.getAllContentVocabularys('ALL');
            } else {
                alert(res.errMessage)
                toast.error("Bài Ngữ Pháp Không Tồn Tại");
            }
            console.log(res);
        } catch (e) {
            console.log(e);
        }
    }
    // delete content vocabulary
    deleteContentVocabularyServices = async (contentvocabulary) => {
        try {
            let res = await deleteContentVocabularyServices(contentvocabulary.id);
            toast.success("Xóa Thành Công");
            if (res && res.errCode === 0) {
                await this.getAllVocabularys('ALL');
            } else {
                alert(res.errMessage)
                toast.error("Từ Vựng Không Tồn Tại");
            }
            console.log(res);
        } catch (e) {
            console.log(e);
        }
    }
    handleEditVocabulary = async (vocabulary) => {
        console.log('check data vocabulary edit vocabulary', vocabulary)
        if (vocabulary && !_.isEmpty(vocabulary)) {
            let imageBase64 = '';
            if (vocabulary.img_vocabulary) {
                imageBase64 = new Buffer(vocabulary.img_vocabulary, 'base64').toString('binary');
            }
            this.setState({
                id: vocabulary.id,
                name_vocabulary: vocabulary.name_vocabulary,
                img_vocabulary: imageBase64,
                part: vocabulary.part,
                previewImgURL: imageBase64,
            }, () => {
                console.log('check state vocabulary manage', this.state.previewImgURL)
            })
        }
        console.log('check datat edit', vocabulary)
    }
    // edit content vocabulary
    handleEditContentVocabulary = async (contentVocabulary) => {
        console.log('check data contentVocabulary edit contentVocabulary', contentVocabulary)
        if (contentVocabulary && !_.isEmpty(contentVocabulary)) {

            this.setState({
                id: contentVocabulary.id,
                audio_mp3: contentVocabulary.audio_mp3,
                content: contentVocabulary.content,
                image: contentVocabulary.image,
                number: contentVocabulary.number,
                meaning: contentVocabulary.meaning,
                sentence: contentVocabulary.sentence,
                transcribe: contentVocabulary.transcribe,
                keyMap: contentVocabulary.keyMap,
                vocabularyid: contentVocabulary.vocabularyid,

            })
        }
        console.log('check datat edit', contentVocabulary)
    }
    handleOnchangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];

        // chuyen anh da chon tu file sang dang blob va tao url
        if (file) {
            let base64 = await CommonUtils.getBase64(file);

            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgURL: objectUrl,
                img_vocabulary: base64
            })
            console.log('chekc base64 image', base64)
        }


    }
    openPreviewImage = () => {
        if (!this.state.previewImgURL) return;
        this.setState({
            isOpen: true
        })
    }
    handleCreateVocabulary = async () => {
        let isValid = this.checkValidateInput();
        if (isValid === false) return;
        try {
            let response = await createNewVocabularyService({
                img_vocabulary: this.state.img_vocabulary,
                name_vocabulary: this.state.name_vocabulary,
                part: this.state.part,
            })
            if (response.message.errCode === 0) {

                await this.getAllContentVocabularys('ALL');
                toast.success("Thêm Bài Từ Vựng Thành Công");
                this.setState({
                    name_vocabulary: '',
                    part: '',
                    previewImgURL: '',
                })
            }
            else {
                await toast.error("Tên Bài Từ Vựng Này Đã  Tồn Tại Xin Thử Lại Với Một Tên Khác")
                this.setState({
                    name_vocabulary: '',
                    part: '',
                    previewImgURL: '',
                })

            }
            // if (response && response.errCode !== 1) {
        } catch (e) {
            console.log(e);
        }
    }
    handleUpdateVocabulary = async () => {
        let arrupdate = {
            id: this.state.id,
            img_vocabulary: this.state.img_vocabulary,
            name_vocabulary: this.state.name_vocabulary,
            part: this.state.part,
        }

        console.log('check data arr vocabulary update', arrupdate)
        try {
            let res = await editVocabulayService(arrupdate);
            console.log('click save vocabulary:', res)
            if (res && res.errCode === 0) {
                await this.getAllContentVocabularys('ALL');
                toast.success("Sửa Thành Công");

                this.setState({

                    name_vocabulary: '',
                    part: '',
                    previewImgURL: '',
                    // hướng giải quyết vấn đề này: https://www.npmjs.com/package/react-markdown-editor-lite/v/0.5.0?activeTab=readme
                })
            } else {
                alert(res.errMessage)
                toast.error("Vocabulary Không Tồn Tại");
            }
            console.log(res);
        } catch (e) {
            console.log(e);
        }
    }
    // update content vocabulary
    handleUpdateContentVocabulary = async () => {
        let arrupdate = {
            id: this.state.id,
            audio_mp3: this.state.audio_mp3,
            content: this.state.content,
            image: this.state.image,
            meaning: this.state.meaning,
            number: this.state.number,
            sentence: this.state.sentence,
            transcribe: this.state.transcribe,
            keyMap: this.state.keyMap,
            vocabularyid: this.state.vocabularyid,
        }

        console.log('check data arr  content vocabulary update', arrupdate)
        try {
            let res = await editContentVocabulayService(arrupdate);
            console.log('click content vocabulary:', res)
            if (res && res.errCode === 0) {
                await this.getAllVocabularys('ALL');
                toast.success("Sửa Thành Công");

                this.setState({

                    audio_mp3: '',
                    content: '',
                    image: '',
                    meaning: '',
                    number: '',
                    sentence: '',
                    transcribe: '',
                    keyMap: '',
                    vocabularyid: '',

                })
            } else {
                alert(res.errMessage)
                toast.error("Content Vocabulary Không Tồn Tại");
            }
            console.log(res);
        } catch (e) {
            console.log(e);
        }
    }
    open = () => {
        this.setState({ showModal: true });
    }

    close = () => {
        this.setState({ showModal: false });
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['name_vocabulary', 'part']
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert('Chưa Nhập :' + ' ' + arrCheck[i])
                break;
            }
        }
        return isValid;
    }
    render() {

        let { arrVocabularys, arrContentVocabularys } = this.state;
        console.log('check arrVocabularys ', arrVocabularys);
        return (

            <React.Fragment>
                <div className='content-manage-vocabulary' style={{ paddingLeft: '10px' }}>
                    <div className='content-vocabulary-manage'>
                        <div className="manage-vocabulary m-3" style={{ fontSize: '25px', textAlign: 'center', fontWeight: 'bolder' }}>Quản Lý Bài Từ Vựng</div>
                        <form>
                            <div className="form-row">
                                <div className="col-md-12 mb-3">
                                    <label >Ảnh</label>
                                    <div className="custom-file">
                                        <input type="file" className="custom-file-input" id='previewImg' onChange={(event) => this.handleOnchangeImage(event)} />
                                        <label className="custom-file-label"

                                        >Chọn tệp</label>

                                    </div>
                                </div>
                                <div className=' col-md-12 mb-3 preview-image'
                                    style={{ backgroundImage: `url(${this.state.previewImgURL})` }}
                                    onClick={() => this.openPreviewImage()}
                                ></div>
                                <div className="form-group col-md-6">
                                    <label>Tên Bài Từ Vừng</label>
                                    <input type="text"
                                        className="form-control"
                                        placeholder="Nhập tên ....."
                                        onChange={(event) => { this.onChangeInput(event, 'name_vocabulary') }}
                                        value={this.state.name_vocabulary}
                                    />
                                </div>
                                <div className="form-group col-md-4">
                                    <label >Part</label>
                                    <select className="custom-select" onChange={(event) => { this.onChangeInput(event, 'part') }}
                                        value={this.state.part}
                                    >
                                        <option selected>Nhấn Để Chọn</option>
                                        <option value="PART 1">Part 1</option>
                                        <option value="PART 2">Part 2</option>
                                        <option value="PART 3">Part 3</option>
                                        <option value="PART 4">Part 4</option>
                                        <option value="PART 5">Part 5</option>
                                        <option value="PART 6">Part 6</option>
                                        <option value="PART 7">Part 7</option>
                                    </select>
                                </div>
                            </div>
                        </form>
                        <button type="button" className="btn btn-primary ml-3" onClick={() => this.handleCreateVocabulary()} >Thêm Bài Từ Vựng</button>
                        <button type="button" className="btn btn-warning  ml-3" onClick={() => this.handleUpdateVocabulary()} >Lưu Thông Tin</button>
                        <button type=" button" className="btn btn-success ml-3" onClick={this.open}>Thêm Dữ Liệu Bằng File Excel</button>
                        <AddVocabularyAdmin showModal={this.state.showModal} onClose={this.close} />




                        <table className="table mt-3">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">Id</th>
                                    <th scope="col">Tên Bài Từ Vựng</th>
                                    <th scope="col">Part</th>
                                    {/* <th scope="col">Ảnh</th> */}
                                    <th scope="col" style={{ textAlign: 'end' }}>Hành Động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    arrVocabularys && arrVocabularys.map((item, index) => {
                                        console.log('ckecl item data arrVocabularys', item)
                                        return (
                                            <>
                                                <tr>
                                                    <td>{item.id}</td>
                                                    <td>{item.name_vocabulary}</td>
                                                    <td>{item.part}</td>
                                                    <td>
                                                        <button type="button" className="btn btn-primary" onClick={() => this.handleEditVocabulary(item)}>Sửa</button>
                                                        <button type="button" className="btn btn-danger ml-3" onClick={() => this.deleteVocabularyServices(item)}>Xóa</button>


                                                        {/* <Button className="btn-login m-3" variant="success" onClick={this.open}>Thêm Dữ Liệu Bằng File Excel</Button> */}


                                                    </td>
                                                </tr>
                                            </>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                        {/* <p className='text-center'>Quản Lý Từ Vựng</p>
                        <form>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label >Từ Vựng</label>
                                    <input type="text" className="form-control"
                                        onChange={(event) => { this.onChangeInput(event, '	content') }}
                                        value={this.state.content}
                                    />
                                </div>
                                <div className="form-group col-md-6">
                                    <label >Âm thanh</label>
                                    <input type="text" className="form-control"
                                        onChange={(event) => { this.onChangeInput(event, 'audio_mp3') }}
                                        value={this.state.audio_mp3}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label >Ảnh</label>
                                <input type="text" className="form-control"
                                    onChange={(event) => { this.onChangeInput(event, 'image') }}
                                    value={this.state.image}
                                />
                            </div>
                            <div className="form-group">
                                <label >Nghĩa</label>
                                <input type="text" className="form-control"

                                    onChange={(event) => { this.onChangeInput(event, 'meaning') }}
                                    value={this.state.meaning}
                                />
                            </div>
                            <div className="form-group">
                                <label >Câu Ví Dụ</label>
                                <input type="text" className="form-control"
                                    onChange={(event) => { this.onChangeInput(event, 'sentence') }}
                                    value={this.state.sentence}
                                />
                            </div>
                            <div className="form-group">
                                <label >Phiên Âm</label>
                                <input type="text" className="form-control"
                                    onChange={(event) => { this.onChangeInput(event, 'transcribe') }}
                                    value={this.state.transcribe}
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label >Number</label>
                                <input type="text" className="form-control"
                                    onChange={(event) => { this.onChangeInput(event, '	number') }}
                                    value={this.state.number}
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label >Từ Vựng Id</label>
                                <input type="text" className="form-control"
                                    onChange={(event) => { this.onChangeInput(event, '	vocabularyid') }}
                                    value={this.state.vocabularyid}
                                />
                            </div>
                            <div className="form-row">

                                <div className="form-group col-md-4">
                                    <label >KeyMap</label>
                                    <select className="form-control" onChange={(event) => { this.onChangeInput(event, 'keyMap') }}
                                        value={this.state.keyMap}>
                                        <option selected>Chọn...</option>
                                        <option value='PART 1'>PART 1</option>
                                        <option value='PART 2'>PART 2</option>
                                        <option value='PART 3'>PART 3</option>
                                        <option value='PART 4'>PART 4</option>
                                        <option value='PART 5'>PART 5</option>
                                        <option value='PART 6'>PART 6</option>
                                        <option value='PART 7'>PART 7</option>
                                    </select>
                                </div>
                            </div>

                        </form>
                        <button type="button" className="btn btn-warning m-3" onClick={() => this.handleUpdateContentVocabulary()}>Lưu Thông Tin</button>
                        <Scrollbars autoHeight
                            autoHeightMin={200}
                            autoHeightMax={200}>
                            <table className="table mt-3">
                                <thead className="thead-dark">
                                    <tr>
                                        <th scope="col">STT</th>
                                        <th scope="col">Từ Vựng</th>
                                        <th scope="col">Nghĩa</th>
                                        
                                        <th scope="col">Câu Ví Dụ</th>
                                        <th scope="col">Phiên Âm</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        arrContentVocabularys && arrContentVocabularys.map((item, index) => {
                                            console.log('ckecl item data arrContentVocabularys', item)
                                            return (
                                                <>
                                                    <tr>
                                                        <td>{item.id}</td>
                                                    
                                                        <td>{item.content}</td>
                                                        <td>{item.meaning}</td>
                                                        <td>{item.sentence}</td>
                                                        <td>{item.transcribe}</td>
                                                        <td>
                                                           
                                                            <button type="button" className="btn btn-danger ml-3" onClick={() => this.deleteContentVocabularyServices(item)}>Xóa</button>
                                                            <button type="button" className="btn btn-warning ml-3" onClick={() => this.handleEditContentVocabulary(item)}>Sửa</button>
                                                            


                                                        </td>
                                                    </tr>
                                                </>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </Scrollbars> */}




                        {
                            this.state.isOpen === true &&
                            <Lightbox
                                mainSrc={this.state.previewImgURL}
                                onCloseRequest={() => this.setState({ isOpen: false })}
                            />
                        }
                    </div>
                </div>
                {/* <Footer /> */}
            </React.Fragment>

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

export default connect(mapStateToProps, mapDispatchToProps)(VocabularyManage);
