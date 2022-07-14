import React, { Component } from 'react';
import { connect } from 'react-redux';
import './GrammarManage.scss';
import { getAllGrammars, deleteGrammarServices, createNewGrammarService, editGrammarService } from '../../../services/userService';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { toast } from 'react-toastify';
import { CommonUtils } from "../../../utils"
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import _ from 'lodash';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import { Scrollbars } from 'react-custom-scrollbars';
import Footer from '../../../routes/Footer';
const mdParser = new MarkdownIt(/* Markdown-it options */);

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];

class GrammarManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: null,
            arrGrammars: [],
            arrGrammar: [],
            img_grammar: '',
            name_grammar: '',
            contentHtml: '',
            contentMarkdown: '',
            previewImgURL: '',
            isOpen: false,
        };

    }

    async componentDidMount() {
        await this.getAllGrammars();

    }
    onChangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
        console.log('check input good code', copyState)
    }
    getAllGrammars = async () => {

        let response = await getAllGrammars('ALL');
        if (response && response.errCode === 0) {
            this.setState({
                arrGrammars: response.grammars.reverse(),

            });
            toast.success("get all grammar sucssedd");
        }
        console.log('get grammar from node js:', response)
    }
    handleChange = (selectedOption) => {
        this.setState({ selectedOption }, () =>
            console.log(`Option selected:`, this.state.selectedOption)
        );
    };
    handleDeleteGrammar = async (grammar) => {
        try {
            let res = await deleteGrammarServices(grammar.id);
            toast.success("Xóa Thành Công");
            if (res && res.errCode === 0) {
                await this.getAllGrammars('ALL');
            } else {
                alert(res.errMessage)
                toast.error("Grammar Không Tồn Tại");
            }
            console.log(res);
        } catch (e) {
            console.log(e);
        }
    }
    handleEditGrammar = async (grammar) => {
        console.log('check data grammar edit grammar', grammar)

        // let imageBase64 = '';
        // if (grammar.img_grammar) {
        //     imageBase64 = new Buffer(grammar.img_grammar, 'base64').toString('binary');
        // }

        if (grammar && !_.isEmpty(grammar)) {
            let imageBase64 = '';
            if (grammar.img_grammar) {
                imageBase64 = new Buffer(grammar.img_grammar, 'base64').toString('binary');
            }
            this.setState({
                id: grammar.id,
                name_grammar: grammar.name_grammar,
                img_grammar: imageBase64,
                content_html: grammar.content_html,
                content_markdown: grammar.content_markdown,
                // contentHtml: grammar.content_html,
                // contentMarkdown: grammar.content_markdown,
                previewImgURL: imageBase64,
            }, () => {
                console.log('check state grammar manage', this.state.previewImgURL)
            })
        }
        console.log('check datat edit', grammar)
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
                img_grammar: base64
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
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentHtml: html,
            contentMarkdown: text,
        })
        // console.log('handleEditorChange', this.state.contentHtml, this.state.contentMarkdown);
    }
    handleCreateGrammar = async () => {
        let isValid = this.checkValidateInput();
        if (isValid === false) return;
        // alert('click me');
        // console.log('check state grammar', this.state)
        try {
            let response = await createNewGrammarService({
                img_grammar: this.state.img_grammar,
                name_grammar: this.state.name_grammar,
                content_html: this.state.contentHtml,
                content_markdown: this.state.contentMarkdown,
            })
            // console.log("check res create tao grammar", response)
            console.log('check content mardown', this.state.contentHtml)

            if (response.message.errCode === 0) {

                await this.getAllGrammars('ALL');
                toast.success("Thêm Bài Ngữ Pháp Thành Công");
                this.setState({
                    name_grammar: '',
                    previewImgURL: '',
                    contentHtml: '',
                    contentMarkdown: '',
                })
            }
            else {
                await toast.error("Tên Bài Ngữ Pháp Này Đã  Tồn Tại Xin Thử Lại Với Một Tên Khác")
                this.setState({
                    name_grammar: '',
                    previewImgURL: '',
                    contentHtml: '',
                    contentMarkdown: '',
                })

            }
            // if (response && response.errCode !== 1) {
        } catch (e) {
            console.log(e);
        }
    }
    handleUpdateGrammar = async () => {
        let arrupdate = {
            id: this.state.id,
            name_grammar: this.state.name_grammar,
            img_grammar: this.state.img_grammar,
            content_html: this.state.contentHtml,
            content_markdown: this.state.contentMarkdown
        }

        console.log('check data arr grammar update', arrupdate)
        try {
            let res = await editGrammarService(arrupdate);
            console.log('click save grammar:', res)
            if (res && res.errCode === 0) {
                await this.getAllGrammars('ALL');
                toast.success("Sửa Thành Công");

                this.setState({

                    name_grammar: '',
                    previewImgURL: '',
                    contentHtml: '',
                    contentMarkdown: '',
                    // hướng giải quyết vấn đề này: https://www.npmjs.com/package/react-markdown-editor-lite/v/0.5.0?activeTab=readme
                })
            } else {
                alert(res.errMessage)
                toast.error("Grammar Không Tồn Tại");
            }
            console.log(res);
        } catch (e) {
            console.log(e);
        }
    }
    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['name_grammar', 'contentHtml', 'contentMarkdown']
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
        let arrGrammars = this.state.arrGrammars;
        const { selectedOption } = this.state;
        console.log('check arrGrammar ', arrGrammars);
        return (
            <>
                <div className='content-manage-grammar'>
                    <div className='grammars-container'>
                        <div className='manage-grammar m-3' style={{ fontSize: '25px', textAlign: 'center', fontWeight: 'bolder' }}>Quản Lý Bài Ngữ Pháp</div>
                        <form>
                            <div className="form-row">
                                <div className="col-md-12 mb-3">
                                    <label for="validationDefault01">Tên Bài Ngữ Pháp</label>
                                    <input type="text"
                                        className="form-control"
                                        placeholder="Nhập Tên"
                                        onChange={(event) => { this.onChangeInput(event, 'name_grammar') }}
                                        value={this.state.name_grammar}
                                    />

                                    {/* Khi nhấn nút edit mới hẹn cái select
                            <Select
                                value={selectedOption}
                                onChange={this.handleChange}
                                options={options}
                            /> */}
                                </div>
                                <div className="col-md-12 mb-3">
                                    <label for="validationDefault01">Ảnh</label>
                                    <div className="custom-file">
                                        <input type="file" className="custom-file-input" id="customFile" onChange={(event) => this.handleOnchangeImage(event)} />
                                        <label className="custom-file-label" for="customFile"

                                        >Chọn tệp</label>

                                    </div>
                                </div>
                                <div className=' col-md-12 mb-3 preview-image-grammar'
                                    style={{ backgroundImage: `url(${this.state.previewImgURL})` }}
                                    onClick={() => this.openPreviewImage()}
                                ></div>
                                {/* <div className="col-md-12 mb-3">
                            <label for="validationDefault01">Thêm Thông Tin Chi Tiết Cho Bài Ngữ Pháp</label>

                        </div> */}

                            </div>


                        </form>

                        <MdEditor
                            style={{ height: '500px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange}


                        />

                        <button type="button" className="btn btn-warning mt-3 ml-3" onClick={() => this.handleCreateGrammar()} >Thêm Bài Ngữ Pháp</button>

                        <button type="button" className="btn btn-primary mt-3 ml-3" onClick={() => this.handleUpdateGrammar()} >Lưu Thông Tin</button>

                        <Scrollbars autoHeight
                            autoHeightMin={400}
                            autoHeightMax={600}>
                            <table className="table table-borderless table-dark mt-5">
                                <thead>
                                    <tr>
                                        <th className="col-2">STT</th>
                                        {/* <th scope="col">Ảnh</th> */}
                                        <th className="col-2" style={{ textAlign: 'center' }}>Tên Bài Ngữ Pháp</th>
                                        {/* <th scope="col">Nội Dung HTML</th> */}
                                        <th className="col-5" style={{ textAlign: 'center' }}>Nội Dung </th>
                                        <th className="col-3 " style={{ textAlign: 'end', right: '28px' }}>Hành Động</th>

                                    </tr>
                                </thead>
                                <tbody>

                                    {arrGrammars && arrGrammars.map((item, index) => {
                                        console.log('ckecl item data arrGrammars', item)
                                        return (
                                            <>
                                                <tr>
                                                    {/* <th scope="row">1</th> */}

                                                    <td className='col-2'>{item.id}</td>
                                                    {/* <td>{item.img_grammar}</td> */}
                                                    <td className='col-2' style={{ textAlign: 'justify' }}>{item.name_grammar}</td>
                                                    {/* <td>{item.content_html}</td> */}
                                                    <td className='col-5' style={{ textAlign: 'justify' }}>{item.content_markdown}</td>
                                                    <td className='col-3'>
                                                        <button type="button" className="btn btn-primary" onClick={() => this.handleEditGrammar(item)}>Sửa</button>
                                                        <button type="button" className="btn btn-danger ml-3" onClick={() => this.handleDeleteGrammar(item)}>Xóa</button>

                                                    </td>
                                                </tr>
                                            </>
                                        )
                                    })}



                                </tbody>
                            </table>
                        </Scrollbars>

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

export default connect(mapStateToProps, mapDispatchToProps)(GrammarManage);
