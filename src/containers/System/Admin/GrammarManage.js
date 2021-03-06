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
            toast.success("X??a Th??nh C??ng");
            if (res && res.errCode === 0) {
                await this.getAllGrammars('ALL');
            } else {
                alert(res.errMessage)
                toast.error("Grammar Kh??ng T???n T???i");
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
                toast.success("Th??m B??i Ng??? Ph??p Th??nh C??ng");
                this.setState({
                    name_grammar: '',
                    previewImgURL: '',
                    contentHtml: '',
                    contentMarkdown: '',
                })
            }
            else {
                await toast.error("T??n B??i Ng??? Ph??p N??y ????  T???n T???i Xin Th??? L???i V???i M???t T??n Kh??c")
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
                toast.success("S???a Th??nh C??ng");

                this.setState({

                    name_grammar: '',
                    previewImgURL: '',
                    contentHtml: '',
                    contentMarkdown: '',
                    // h?????ng gi???i quy???t v???n ????? n??y: https://www.npmjs.com/package/react-markdown-editor-lite/v/0.5.0?activeTab=readme
                })
            } else {
                alert(res.errMessage)
                toast.error("Grammar Kh??ng T???n T???i");
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
                alert('Ch??a Nh???p :' + ' ' + arrCheck[i])
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
                        <div className='manage-grammar m-3' style={{ fontSize: '25px', textAlign: 'center', fontWeight: 'bolder' }}>Qu???n L?? B??i Ng??? Ph??p</div>
                        <form>
                            <div className="form-row">
                                <div className="col-md-12 mb-3">
                                    <label for="validationDefault01">T??n B??i Ng??? Ph??p</label>
                                    <input type="text"
                                        className="form-control"
                                        placeholder="Nh???p T??n"
                                        onChange={(event) => { this.onChangeInput(event, 'name_grammar') }}
                                        value={this.state.name_grammar}
                                    />

                                    {/* Khi nh???n n??t edit m???i h???n c??i select
                            <Select
                                value={selectedOption}
                                onChange={this.handleChange}
                                options={options}
                            /> */}
                                </div>
                                <div className="col-md-12 mb-3">
                                    <label for="validationDefault01">???nh</label>
                                    <div className="custom-file">
                                        <input type="file" className="custom-file-input" id="customFile" onChange={(event) => this.handleOnchangeImage(event)} />
                                        <label className="custom-file-label" for="customFile"

                                        >Ch???n t???p</label>

                                    </div>
                                </div>
                                <div className=' col-md-12 mb-3 preview-image-grammar'
                                    style={{ backgroundImage: `url(${this.state.previewImgURL})` }}
                                    onClick={() => this.openPreviewImage()}
                                ></div>
                                {/* <div className="col-md-12 mb-3">
                            <label for="validationDefault01">Th??m Th??ng Tin Chi Ti???t Cho B??i Ng??? Ph??p</label>

                        </div> */}

                            </div>


                        </form>

                        <MdEditor
                            style={{ height: '500px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange}


                        />

                        <button type="button" className="btn btn-warning mt-3 ml-3" onClick={() => this.handleCreateGrammar()} >Th??m B??i Ng??? Ph??p</button>

                        <button type="button" className="btn btn-primary mt-3 ml-3" onClick={() => this.handleUpdateGrammar()} >L??u Th??ng Tin</button>

                        <Scrollbars autoHeight
                            autoHeightMin={400}
                            autoHeightMax={600}>
                            <table className="table table-borderless table-dark mt-5">
                                <thead>
                                    <tr>
                                        <th className="col-2">STT</th>
                                        {/* <th scope="col">???nh</th> */}
                                        <th className="col-2" style={{ textAlign: 'center' }}>T??n B??i Ng??? Ph??p</th>
                                        {/* <th scope="col">N???i Dung HTML</th> */}
                                        <th className="col-5" style={{ textAlign: 'center' }}>N???i Dung </th>
                                        <th className="col-3 " style={{ textAlign: 'end', right: '28px' }}>H??nh ?????ng</th>

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
                                                        <button type="button" className="btn btn-primary" onClick={() => this.handleEditGrammar(item)}>S???a</button>
                                                        <button type="button" className="btn btn-danger ml-3" onClick={() => this.handleDeleteGrammar(item)}>X??a</button>

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
