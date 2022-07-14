import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { history } from '../redux'
import { ToastContainer } from 'react-toastify';
import { userIsAuthenticated, userIsNotAuthenticated } from '../hoc/authentication';
import { path } from '../utils'
import Login from '../containers/Auth/Login';
import Grammar from './Auth/Grammar';
import Vocabulary from './Auth/Vocabulary';
import GrammarManage from './System/Admin/GrammarManage';
import VocabularyManage from './System/Admin/VocabularyManage';
import { Scrollbars } from 'react-custom-scrollbars';
import StudyForTestPart1 from './Auth/StudyForTestPart1';
import StudyForTestPart2 from './Auth/StudyForTestPart2';
import StudyForTestPart3 from './Auth/StudyForTestPart3';
import StudyForTestPart4 from './Auth/StudyForTestPart4';
import StudyForTestPart5 from './Auth/StudyForTestPart5';
import StudyForTestPart6 from './Auth/StudyForTestPart6';
import StudyForTestPart7 from './Auth/StudyForTestPart7';
import TestOnline from './Auth/TestOnline';
import DoReading from './Auth/DoReading';
import DoListening from './Auth/DoListening';
import AddNoteUser from './Auth/AddNoteUser';
import ReadExerciseManage from './System/Admin/ReadExerciseManage';
import ListenExerciseManage from './System/Admin/ListenExerciseManage';
import ExamTestManage from './System/Admin/ExamTestManage';
import ListExamTest from './Auth/ListExamTest';
import DetailExamTest from './Auth/DetailExamTest';
import UserManage from './System/Admin/UserManage';
import ListStudyPartOne from './Auth/ListStudyPartOne';
import ListStudyPartTwo from './Auth/ListStudyPartTwo';
import ListStudyPartThree from './Auth/ListStudyPartThree';
import ListStudyPartFour from './Auth/ListStudyPartFour';
import ListStudyPartFive from './Auth/ListStudyPartFive';
import ListStudyPartSix from './Auth/ListStudyPartSix';
import ListStudyPartSeven from './Auth/ListStudyPartSeven';
import DetailStudyListenExercise from './Auth/DetailStudyListenExercise';
import DetailStudyListenExerciseTwo from './Auth/DetailStudyListenExerciseTwo';
import DetailStudyListenExerciseThree from './Auth/DetailStudyListenExerciseThree';
import DetailStudyListenExerciseFour from './Auth/DetailStudyListenExerciseFour';
import DetailStudyListenExerciseFive from './Auth/DetailStudyListenExerciseFive';
import DetailStudyListenExerciseSix from './Auth/DetailStudyListenExerciseSix';
import DetailStudyListenExerciseSeven from './Auth/DetailStudyListenExerciseSeven';
import AdminManage from './System/Admin/AdminManage';
import DetailGrammar from './Auth/DetailGrammar';
import DetailVocabulary from './Auth/DetailVocabulary';
class App extends Component {

    handlePersistorState = () => {
        const { persistor } = this.props;
        let { bootstrapped } = persistor.getState();
        if (bootstrapped) {
            if (this.props.onBeforeLift) {
                Promise.resolve(this.props.onBeforeLift())
                    .then(() => this.setState({ bootstrapped: true }))
                    .catch(() => this.setState({ bootstrapped: true }));
            } else {
                this.setState({ bootstrapped: true });
            }
        }
    };

    componentDidMount() {
        this.handlePersistorState();
    }

    render() {
        const { userInfo, isLoggedIn } = this.props;
        return (
            <Fragment>

                <Router history={history}>
                    <Scrollbars autoHeight
                        autoHeightMin={200}
                        autoHeightMax={1000}>
                        <div className="main-container">
                            <span className="content-container">
                                <Switch>
                                    <Route path={path.HOME} exact component={(Login)} />
                                    <Route path={path.GRAMMAR} exact component={(Grammar)} />
                                    <Route path={path.VOCABULARY} exact component={(Vocabulary)} />
                                    <Route path={path.TESTONLINE} exact component={(TestOnline)} />
                                    <Route path={path.STUDYFORTESTPARTONE} exact component={(StudyForTestPart1)} />
                                    <Route path={path.LISTSTUDYPARTONE} exact component={(ListStudyPartOne)} />
                                    <Route path={path.LISTSTUDYPARTTWO} exact component={(ListStudyPartTwo)} />
                                    <Route path={path.LISTSTUDYPARTTHREE} exact component={(ListStudyPartThree)} />
                                    <Route path={path.LISTSTUDYPARTFOUR} exact component={(ListStudyPartFour)} />
                                    <Route path={path.LISTSTUDYPARTFIVE} exact component={(ListStudyPartFive)} />
                                    <Route path={path.LISTSTUDYPARTSIX} exact component={(ListStudyPartSix)} />
                                    <Route path={path.LISTSTUDYPARTSEVEN} exact component={(ListStudyPartSeven)} />
                                    <Route path={path.DETAILSTUDYLISTENEXERCISE} exact component={(DetailStudyListenExercise)} />
                                    <Route path={path.DETAILSTUDYLISTENEXERCISETWO} exact component={(DetailStudyListenExerciseTwo)} />
                                    <Route path={path.DETAILSTUDYLISTENEXERCISETHREE} exact component={(DetailStudyListenExerciseThree)} />
                                    <Route path={path.DETAILSTUDYLISTENEXERCISEFOUR} exact component={(DetailStudyListenExerciseFour)} />
                                    <Route path={path.DETAILSTUDYLISTENEXERCISEFIVE} exact component={(DetailStudyListenExerciseFive)} />
                                    <Route path={path.DETAILSTUDYLISTENEXERCISESIX} exact component={(DetailStudyListenExerciseSix)} />
                                    <Route path={path.DETAILSTUDYLISTENEXERCISESEVEN} exact component={(DetailStudyListenExerciseSeven)} />
                                    <Route path={path.STUDYFORTESTPARTTWO} exact component={(StudyForTestPart2)} />
                                    <Route path={path.STUDYFORTESTPARTTHREE} exact component={(StudyForTestPart3)} />
                                    <Route path={path.STUDYFORTESTPARTFOUR} exact component={(StudyForTestPart4)} />
                                    <Route path={path.STUDYFORTESTPARTFIVE} exact component={(StudyForTestPart5)} />
                                    <Route path={path.STUDYFORTESTPARTSIX} exact component={(StudyForTestPart6)} />
                                    <Route path={path.STUDYFORTESTPARTSEVEN} exact component={(StudyForTestPart7)} />
                                    <Route path={path.LISTTESTONLINE} exact component={(ListExamTest)} />
                                    <Route path={path.DETAIEXAMTEST} exact component={(DetailExamTest)} />
                                    <Route path={path.READINGTEST} exact component={(DoReading)} />
                                    <Route path={path.LISTENINGTEST} exact component={(DoListening)} />
                                    <Route path={path.DETAILGRAMMAR} exact component={(DetailGrammar)} />
                                    <Route path={path.DETAILVOCABULARY} exact component={(DetailVocabulary)} />
                                    <Route path={path.GRAMMARMANAGE} exact component={(GrammarManage)} />
                                    <Route path={path.VOCABULARYMANAGE} exact component={(VocabularyManage)} />
                                    <Route path={path.READINGEXERCISESMANAGE} exact component={(ReadExerciseManage)} />
                                    <Route path={path.LISTENINGEXERCISESMANAGE} exact component={(ListenExerciseManage)} />
                                    <Route path={path.EXAMTESTMANAGE} exact component={(ExamTestManage)} />
                                    <Route path={path.USERMANAGE} exact component={(UserManage)} />
                                    <Route path={path.NOTEUSER} exact component={(AddNoteUser)} />
                                    <Route path={path.ADMINMANAGE} exact component={(AdminManage)} />
                                    <Route path={path.LOGIN} component={userIsAuthenticated(Login)} />
                                </Switch>
                            </span>
                            <ToastContainer
                                position="top-center"
                                autoClose={2000}
                                hideProgressBar={false}
                                newestOnTop={false}
                                closeOnClick
                                rtl={false}
                                pauseOnFocusLoss
                                draggable
                                pauseOnHover
                            />

                        </div>

                    </Scrollbars>

                </Router>

            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        started: state.app.started,
        isLoggedIn: state.admin.isLoggedIn,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);