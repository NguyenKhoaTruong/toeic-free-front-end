import React, { Component } from 'react';
import { connect } from 'react-redux';
import './AdminManage.scss';

import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
    SidebarHeader,
    SidebarContent,
    SidebarFooter
} from "react-pro-sidebar";
import { toast } from 'react-toastify';
import * as Icon from 'react-bootstrap-icons';
import 'react-pro-sidebar/dist/css/styles.css';
import UserManage from '../Admin/UserManage';
import VocabularyManage from './VocabularyManage';
import GrammarManage from './GrammarManage';
import ReadExerciseManage from './ReadExerciseManage';
import ListenExerciseManage from './ListenExerciseManage';
import ExamTestManage from './ExamTestManage';
import MoreInfoVocabularyManage from './MoreInfoVocabularyManage';
import MoreInfoReadExerciseManage from './MoreInfoReadExerciseManage';
import MoreInfoListenExerciseManage from './MoreInfoListenExerciseManage';
import MoreInfoExamTest from './MoreInfoExamTest';
import CommentGrammarManage from './CommentGrammarManage';
import CommentVocabularyManage from './CommentVocabularyManage';
class AdminManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showUserManage: false,
            showGrammarManage: false,
            showVocabularyManage: false,
            showMoreVocabularyManage: false,
            showReadExerciseManage: false,
            showMoreReadExerciseManage: false,
            showMoreListenExerciseManage: false,
            showMoreExamTestManage: false,
            showListenExerciseManage: false,
            showExamTestManage: false,
            showCommentGrammar: false,
            showCommentVocabulary: false
        };

    }

    componentDidMount() {

    }
    handleShowAddVocabulary = () => {
        this.setState({
            showVocabularyManage: true,
            showUserManage: false,
            showGrammarManage: false,
            showMoreVocabularyManage: false,
            showReadExerciseManage: false,
            showMoreReadExerciseManage: false,
            showMoreListenExerciseManage: false,
            showMoreExamTestManage: false,
            showListenExerciseManage: false,
            showExamTestManage: false,
        })
    }
    handleShowUserManage = () => {
        this.setState({
            showUserManage: true,
            showVocabularyManage: false,
            showGrammarManage: false,
            showMoreVocabularyManage: false,
            showReadExerciseManage: false,
            showMoreReadExerciseManage: false,
            showMoreListenExerciseManage: false,
            showMoreExamTestManage: false,
            showListenExerciseManage: false,
            showExamTestManage: false,
            showCommentVocabulary: false,

        })
    }
    handleShowMoreInfoVocabulary = () => {
        this.setState({
            showUserManage: false,
            showGrammarManage: false,
            showVocabularyManage: false,
            showMoreVocabularyManage: true,
            showReadExerciseManage: false,
            showMoreReadExerciseManage: false,
            showMoreListenExerciseManage: false,
            showMoreExamTestManage: false,
            showListenExerciseManage: false,
            showExamTestManage: false
        })
    }
    handleShowAddGrammar = () => {
        this.setState({
            showUserManage: false,
            showGrammarManage: true,
            showVocabularyManage: false,
            showMoreVocabularyManage: false,
            showReadExerciseManage: false,
            showMoreReadExerciseManage: false,
            showMoreListenExerciseManage: false,
            showMoreExamTestManage: false,
            showListenExerciseManage: false,
            showExamTestManage: false
        })
    }
    handleShowAddReadExercise = () => {
        this.setState({
            showUserManage: false,
            showGrammarManage: false,
            showVocabularyManage: false,
            showMoreVocabularyManage: false,
            showReadExerciseManage: true,
            showMoreReadExerciseManage: false,
            showMoreListenExerciseManage: false,
            showMoreExamTestManage: false,
            showListenExerciseManage: false,
            showExamTestManage: false
        })
    }
    handleShowMoreAddReadExercise = () => {
        this.setState({
            showUserManage: false,
            showGrammarManage: false,
            showVocabularyManage: false,
            showMoreVocabularyManage: false,
            showReadExerciseManage: false,
            showMoreReadExerciseManage: true,
            showMoreListenExerciseManage: false,
            showMoreExamTestManage: false,
            showListenExerciseManage: false,
            showExamTestManage: false
        })
    }
    handleShowAddListenExercise = () => {
        this.setState({
            showUserManage: false,
            showGrammarManage: false,
            showVocabularyManage: false,
            showMoreVocabularyManage: false,
            showReadExerciseManage: false,
            showMoreReadExerciseManage: false,
            showMoreListenExerciseManage: false,
            showMoreExamTestManage: false,
            showListenExerciseManage: true,
            showExamTestManage: false
        })
    }
    handleShowMoreAddListenExercise = () => {
        this.setState({
            showUserManage: false,
            showGrammarManage: false,
            showVocabularyManage: false,
            showMoreVocabularyManage: false,
            showReadExerciseManage: false,
            showMoreReadExerciseManage: false,
            showMoreListenExerciseManage: true,
            showMoreExamTestManage: false,
            showListenExerciseManage: false,
            showExamTestManage: false
        })
    }
    handleShowAddExamTest = () => {
        this.setState({
            showUserManage: false,
            showGrammarManage: false,
            showVocabularyManage: false,
            showMoreVocabularyManage: false,
            showReadExerciseManage: false,
            showMoreReadExerciseManage: false,
            showMoreListenExerciseManage: false,
            showMoreExamTestManage: false,
            showListenExerciseManage: false,
            showExamTestManage: true,
            showCommentGrammar: false,
            showCommentVocabulary: false
        })
    }
    handleShowMoreAddExamTest = () => {
        this.setState({
            showMoreExamTestManage: true,
            showExamTestManage: false,
            showMoreListenExerciseManage: false,
            showListenExerciseManage: false,
            showMoreReadExerciseManage: false,
            showReadExerciseManage: false,
            showGrammarManage: false,
            showMoreVocabularyManage: false,
            showVocabularyManage: false,
            showUserManage: false
        })
    }
    handleShowCommentGrammar = (_) => {
        this.setState({
            showCommentGrammar: true,
            showMoreExamTestManage: false,
            showExamTestManage: false,
            showMoreListenExerciseManage: false,
            showListenExerciseManage: false,
            showMoreReadExerciseManage: false,
            showReadExerciseManage: false,
            showGrammarManage: false,
            showMoreVocabularyManage: false,
            showVocabularyManage: false,
            showUserManage: false,
            showCommentVocabulary: false,
        })
    }
    handleShowCommentVocabulary = (_) => {
        this.setState({
            showCommentVocabulary: true,
            showCommentGrammar: false,
            showMoreExamTestManage: false,
            showExamTestManage: false,
            showMoreListenExerciseManage: false,
            showListenExerciseManage: false,
            showMoreReadExerciseManage: false,
            showReadExerciseManage: false,
            showGrammarManage: false,
            showMoreVocabularyManage: false,
            showVocabularyManage: false,
            showUserManage: false
        })
    }
    handleGetHome = () => {
        this.props.history.push('/')
    }
    render() {
        let { showUserManage, showGrammarManage, showVocabularyManage
            , showReadExerciseManage, showListenExerciseManage, showExamTestManage,
            showMoreVocabularyManage, showMoreReadExerciseManage, showMoreListenExerciseManage,
            showMoreExamTestManage, showCommentGrammar, showCommentVocabulary } = this.state;
        const { isLoggedIn, userInfo } = this.props;
        const headerStyle = {
            padding: "24px",
            textTransform: "uppercase",
            fontWeight: "bold",
            letterSpacing: "1px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "noWrap",
            fontSize: '25px',
            zIndex: 1001,
        };
        return (
            <>
                {isLoggedIn && userInfo.roleId === 'R1' ? <div className='content-admin'>
                    <div className="row container-admin">
                        <div className="col-2  container-option-admin ">
                            <div className='content-optison-admin'>
                                <ProSidebar>
                                    <SidebarHeader style={headerStyle}>TOEIC FREE</SidebarHeader>

                                    <SidebarContent>
                                        <Menu iconShape="circle">
                                            <MenuItem icon={<Icon.PersonCircle size={30} color="white" style={{ background: "", cursor: 'pointer' }} />}>Tài Khoản :{' '}{userInfo.name}</MenuItem>
                                            <SubMenu
                                                icon={<Icon.GridFill size={30} color="white" style={{ background: "", cursor: 'pointer' }} />}
                                                title="Quản Lý Tài Khoản"
                                            >
                                                <MenuItem onClick={this.handleShowUserManage} icon={<Icon.PersonPlusFill size={30} color="white" style={{ background: "", cursor: 'pointer' }} />}>Tài Khoản </MenuItem>

                                            </SubMenu>
                                            <SubMenu
                                                icon={<Icon.Type size={30} color="white" style={{ background: "", cursor: 'pointer' }} />}
                                                title="Quản Lý Bài Từ Vựng"
                                            >
                                                <MenuItem onClick={this.handleShowAddVocabulary} icon={<Icon.JournalPlus size={30} color="white" style={{ background: "", cursor: 'pointer' }} />}> Thêm Bài Từ Vựng </MenuItem>
                                                <MenuItem onClick={this.handleShowMoreInfoVocabulary} icon={<Icon.Info size={30} color="white" style={{ background: "", cursor: 'pointer' }} />}> Thêm Thông Tin Bài Từ Vựng</MenuItem>

                                            </SubMenu>
                                            <SubMenu
                                                icon={<Icon.Stack size={30} color="white" style={{ background: "", cursor: 'pointer' }} />}
                                                title="Quản Lý Bài Ngữ Pháp"
                                            >
                                                <MenuItem onClick={this.handleShowAddGrammar} icon={<Icon.Translate size={30} color="white" style={{ background: "", cursor: 'pointer' }} />}> Thêm Bài Ngữ Pháp </MenuItem>

                                            </SubMenu>
                                            <SubMenu
                                                icon={<Icon.PersonWorkspace size={30} color="white" style={{ background: "", cursor: 'pointer' }} />}
                                                title="Quản Lý Bài Đọc"
                                            >
                                                <MenuItem onClick={this.handleShowAddReadExercise} icon={<Icon.DiscFill size={30} color="white" style={{ background: "", cursor: 'pointer' }} />}> Thêm Bài Đọc </MenuItem>
                                                <MenuItem onClick={this.handleShowMoreAddReadExercise} icon={<Icon.ShieldFill size={30} color="white" style={{ background: "", cursor: 'pointer' }} />}> Thêm Thông Tin Bài Đọc</MenuItem>

                                            </SubMenu>
                                            <SubMenu
                                                icon={<Icon.VolumeUp size={30} color="white" style={{ background: "", cursor: 'pointer' }} />}

                                                title="Quản Lý Bài Nghe"

                                            >
                                                <MenuItem onClick={this.handleShowAddListenExercise} icon={<Icon.ClipboardPlus size={30} color="white" style={{ background: "", cursor: 'pointer' }} />}> Thêm Bài Nghe </MenuItem>
                                                <MenuItem onClick={this.handleShowMoreAddListenExercise} icon={<Icon.InfoCircle size={30} color="white" style={{ background: "", cursor: 'pointer' }} />}> Thêm Thông Tin Bài Nghe</MenuItem>

                                            </SubMenu>
                                            <SubMenu
                                                icon={<Icon.Book size={30} color="white" style={{ background: "", cursor: 'pointer' }} />}

                                                title="Quản Lý Bài Thi Thử"

                                            >
                                                <MenuItem onClick={this.handleShowAddExamTest} icon={<Icon.BookmarkPlusFill size={30} color="white" style={{ background: "", cursor: 'pointer' }} />}> Thêm Bài Thi Thử </MenuItem>
                                                <MenuItem onClick={this.handleShowMoreAddExamTest} icon={<Icon.InfoSquare size={30} color="white" style={{ background: "", cursor: 'pointer' }} />}> Thêm Thông Tin Bài Thi Thử</MenuItem>

                                            </SubMenu>
                                            <SubMenu
                                                icon={<Icon.Twitch size={30} color="white" style={{ background: "", cursor: 'pointer' }} />}
                                                title="Quản Lý Bình Luận"
                                            >
                                                <MenuItem onClick={this.handleShowCommentGrammar} icon={<Icon.JournalPlus size={30} color="white" style={{ background: "", cursor: 'pointer' }} />}>Ngữ Pháp</MenuItem>
                                                <MenuItem onClick={this.handleShowCommentVocabulary} icon={<Icon.Info size={30} color="white" style={{ background: "", cursor: 'pointer' }} />}> Từ Vựng</MenuItem>

                                            </SubMenu>
                                            <MenuItem onClick={this.handleGetHome} icon={<Icon.House size={30} color="white" style={{ background: "", cursor: 'pointer' }} />}>Trang Chủ</MenuItem>
                                        </Menu>


                                    </SidebarContent>
                                    {/* <SidebarFooter style={{ textAlign: "center" }}>
                                        <div className="sidebar-btn-wrapper">
                                            <a
                                                href="https://www.github.com"
                                                target="_blank"
                                                className="sidebar-btn"
                                                rel="noopener noreferrer"
                                            >
                                                <Icon.Check size={30} color="green" style={{ background: "", cursor: 'pointer' }} />
                                                <span>Github</span>
                                            </a>
                                        </div>
                                    </SidebarFooter> */}
                                </ProSidebar>
                            </div>
                        </div>
                        <div className="col-10  container-admin-info">
                            <div className='col-12  content-admin-info'>
                                <div className='nav-admin-info'>
                                    <div className='row content-nav-admin-info'>
                                        <div className='col-6 show-option-select'>
                                            {/* <span className='text-show-option-select'>
                                                QUẢN TRỊ ADMIN
                                            </span> */}
                                        </div>
                                        <div className='col-2 show-option-select'>
                                            <span className='text-show-option-select'>   QUẢN TRỊ ADMIN</span>
                                        </div>
                                        <div className='col-4 info-account-admin' >
                                            <div className='acount-admin' style={{ float: 'right', marginRight: '20px' }}>
                                                <span className='name-admin m-3'>
                                                    Xin Chào: {' '}{userInfo.name}
                                                </span>
                                                <span className='avatar-admin'>
                                                    <Icon.PersonBoundingBox size={30} color="white" style={{ background: "", cursor: 'pointer' }} />
                                                </span>
                                            </div>

                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className='col-12  content-admin-use'>
                                {showUserManage === true && <UserManage />}
                                {showVocabularyManage === true && <VocabularyManage />}
                                {showMoreVocabularyManage === true && <MoreInfoVocabularyManage />}
                                {showGrammarManage === true && <GrammarManage />}
                                {showReadExerciseManage === true && <ReadExerciseManage />}
                                {showMoreReadExerciseManage === true && <MoreInfoReadExerciseManage />}
                                {showListenExerciseManage === true && <ListenExerciseManage />}
                                {showMoreListenExerciseManage === true && <MoreInfoListenExerciseManage />}
                                {showExamTestManage === true && <ExamTestManage />}
                                {showMoreExamTestManage === true && <MoreInfoExamTest />}
                                {showCommentGrammar === true && <CommentGrammarManage />}
                                {showCommentVocabulary === true && <CommentVocabularyManage />}

                            </div>
                        </div>
                    </div>
                </div>
                    : <>
                        Không đủ thẩm quyền
                    </>}

            </>

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

export default connect(mapStateToProps, mapDispatchToProps)(AdminManage);
