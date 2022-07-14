import axios from '../axios';
// ap login
const handleLoginApi = (userEmail, userPassword) => {
    return axios.post('/api/login', { email: userEmail, password: userPassword });

}
// api get all user
const getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId
        }`);
}
//api create user
const createNewUserService = (data) => {
    console.log('check data from services:', data);
    return axios.post('/api/create-new-user', data)
}
// get all rate
const getAllRate = (inputId) => {
    return axios.get(`/api/get-all-rate?id=${inputId
        }`);
}
//api create rate
const createNewRateService = (data) => {
    console.log('check data from services:', data);
    return axios.post('/api/create-new-rate', data)
}
//api delete user
const deleteUserService = (userId) => {
    return axios.delete('/api/delete-user', {
        data: {
            id: userId
        }
    });
}
// api edit user
const editUserService = (inputData) => {
    return axios.put('/api/edit-user', inputData)
}
// api edit password user
const editPasswordUserService = (inputData) => {
    return axios.put('/api/edit-password-user', inputData)
}
// api edit info user
const editInfoUserService = (inputData) => {
    return axios.put('/api/edit-info-user', inputData)
}
// api get all grammar
const getAllGrammars = (inputId) => {
    return axios.get(`/api/get-all-grammars?id=${inputId
        }`);
}
// api create grammar
const createNewGrammarService = (data) => {
    return axios.post('/api/create-new-grammar', data)
}
// api delete grammar
const deleteGrammarServices = (grammarId) => {
    return axios.delete('/api/delete-grammar', {
        data: {
            id: grammarId
        }
    });
}
//api edit grammar
const editGrammarService = (inputData) => {
    return axios.put('/api/edit-grammar', inputData)
}

//api upload file
const UploadFileVocabulary = (files) => {
    return axios.post('/api/upload', files)
}
//api create vocabulary
const createNewVocabularyService = (data) => {
    console.log('check data from services:', data);
    return axios.post('/api/create-new-vocabulary-exercises', data)
}
// api delete vocabulary
const deleteVocabularyServices = (vocabularyId) => {
    return axios.delete('/api/delete-vocabulary-exercises', {
        data: {
            id: vocabularyId
        }
    });
}
// api delete content vocabulary
const deleteContentVocabularyServices = (contentvocabularyId) => {
    return axios.delete('/api/delete-content-vocabulary-exercises', {
        data: {
            id: contentvocabularyId
        }
    });
}
//api edit vocabulary
const editVocabulayService = (inputData) => {
    return axios.put('/api/edit-vocabulary-exercises', inputData)
}
//api edit content vocabulary
const editContentVocabulayService = (inputData) => {
    return axios.put('/api/edit-content-vocabulary-exercises', inputData)
}
// api get all vocabulary
const getAllVocabularys = (inputType) => {
    return axios.get(`/api/get-all-vocabulary-exercises?type=${inputType
        }`);
}
const getAllContentVocabularys = (inputId) => {
    return axios.get(`/api/get-all-content-vocabulary-exercises?id=${inputId
        }`);
}
// upload file csv
const uploadfile = (files) => {
    return axios.post('/api/csvfileupload', files)
}
//api create note
const createNewNoteService = (data) => {
    console.log('check data from services:', data);
    return axios.post('/api/create-new-note', data)
}
// api delete note
const deleteNoteServices = (vocabularyId) => {
    return axios.delete('/api/delete-note', {
        data: {
            id: vocabularyId
        }
    });
}
//api edit note
const editNoteService = (inputData) => {
    return axios.put('/api/edit-note', inputData)
}
// api get all note
const getAllNotes = (inputId) => {
    return axios.get(`/api/get-all-note?id=${inputId
        }`);
}
// api read exercises
// get all read exercise
const getAllReadExercise = (inputId) => {
    return axios.get(`api/get-all-read-exercises?id=${inputId
        }`);
}
//get all quiz reading
const getAllQuizReading = (inputType) => {
    return axios.get(`/api/get-all-quiz-reading?type=${inputType
        }`);
}
// api create read exerises
const createNewReadExerciseService = (data) => {

    return axios.post('/api/create-new-read-exercises', data)
}
// api delete read exercise
const deleteReadExerciseServices = (readExerciseId) => {
    return axios.delete('/api/delete-read-exercises', {
        data: {
            id: readExerciseId
        }
    });
}
//api edit read exercises
const editReadExerciseService = (inputData) => {
    return axios.put('/api/edit-read-exercises', inputData)
}
//api edit quiz reading
const editQuizReadingService = (inputData) => {
    return axios.put('/api/edit-quiz-reading', inputData)
}
// api delete quiz reading
const deleteQuizReadingServices = (quizReadingId) => {
    return axios.delete('/api/delete-quiz-reading', {
        data: {
            id: quizReadingId
        }
    });
}
// upload file csv quiz reading
const uploadFileQuizReading = (files) => {
    return axios.post('/api/csv-import-upload-quiz-reading', files)
}

// api listen exercises
// get all listen exercise
const getAllListenExercise = (inputId) => {
    return axios.get(`/api/get-all-listen-exercises?id=${inputId
        }`);
}
//get all quiz listening
const getAllQuizListening = (inputType) => {
    return axios.get(`/api/get-all-quiz-listening?type=${inputType
        }`);
}
// api create listen exerises
const createNewListenExerciseService = (data) => {

    return axios.post('/api/create-new-listen-exercises', data)
}
// api delete listen exercise
const deleteListenExerciseServices = (listenExerciseId) => {
    return axios.delete('/api/delete-listen-exercises', {
        data: {
            id: listenExerciseId
        }
    });
}
//api edit listen exercises
const editListenExerciseService = (inputData) => {
    return axios.put('/api/edit-listen-exercises', inputData)
}
//api edit quiz listenning
const editQuizListeningService = (inputData) => {
    return axios.put('/api/edit-quiz-listening', inputData)
}
// api delete quiz listen
const deleteQuizListeningServices = (quizListeningId) => {
    return axios.delete('/api/delete-quiz-listening', {
        data: {
            id: quizListeningId
        }
    });
}
// upload file csv quiz listening
const uploadFileQuizListening = (files) => {
    return axios.post('/api/csv-import-upload-quiz-listening', files)
}

//tetst
const getAllTest = (inputId) => {
    return axios.get(`/api/test?id=${inputId
        }`);
}
// get all exam test
const getAllExamTest = (inputId) => {
    return axios.get(`/api/get-all-exam-test?id=${inputId
        }`);
}
// get all quiz test
const getAllQuizTest = (inputType) => {
    return axios.get(`/api/get-all-quiz-test?type=${inputType
        }`);
}
// api create exam test
const createNewExamTestService = (data) => {

    return axios.post('/api/create-new-exam-result', data)
}
// api delete exam test
const deleteExamTestServices = (examTestId) => {
    return axios.delete('/api/delete-exam-test', {
        data: {
            id: examTestId
        }
    });
}
//api edit exam test
const editExamTestService = (inputData) => {
    return axios.put('/api/edit-exam-test', inputData)
}

// api delete quiz test
const deleteQuizTestServices = (quizTestId) => {
    return axios.delete('/api/delete-quiz-test', {
        data: {
            id: quizTestId
        }
    });
}
//api edit quiz test
const editQuizTestService = (inputData) => {
    return axios.put('/api/edit-quiz-test', inputData)
}
// 
// upload file csv quiz test
const uploadFileQuizTest = (files) => {
    return axios.post('/api/csv-import-upload-quiz-test', files)
}
// create result
const createNewResultService = (data) => {

    return axios.post('/api/create-new-result', data)
}
// create exam result
const createExamNewResultService = (data) => {

    return axios.post('/api/create-new-exam-result', data)
}
// update result
const editResultService = (inputData) => {
    return axios.put('/api/edit-result', inputData)
}
//get detail exam test
const getDetailExamTest = (inputId) => {
    return axios.get(`/api/get-detail-exam-test-by-id?id=${inputId}`);
}
//get detail listen  exercise
const getDetailListenExercise = (inputId) => {
    return axios.get(`/api/get-detail-listen-exercises-by-id?id=${inputId}`);
}
// get all result by usser
const getAllResultByUser = (inputId) => {
    return axios.get(`/api/get-all-result-test-user-info?id=${inputId
        }`);
}
// get all exam result by usser
const getAllExamResultByUser = (inputId) => {
    return axios.get(`/api/get-all-exam-result-test-user-info?id=${inputId
        }`);
}
//get detail grammar
const getDetailGrammar = (inputId) => {
    return axios.get(`/api/get-detail-grammar-by-id?id=${inputId}`);
}
// get all comment vocabulary
const getAllCommentVocabulary = (inputId) => {
    return axios.get(`/api/get-all-comment-vocabulary?id=${inputId
        }`);
}
// get all comment grammar
const getAllCommentGrammar = (inputId) => {
    return axios.get(`/api/get-all-comment-grammar?id=${inputId
        }`);
}
//api create comment grammar
const createNewCommentGrammarService = (data) => {
    console.log('check data from services:', data);
    return axios.post('/api/create-new-comment-grammar', data)
}
//api create comment vocabulary
const createNewCommentVocabularyService = (data) => {
    console.log('check data from services:', data);
    return axios.post('/api/create-new-comment-vocabulary', data)
}
// api delete commentGrammar
const deleteCommentGrammarServices = (commentGrammarId) => {
    return axios.delete('/api/delete-comment-grammar', {
        data: {
            id: commentGrammarId
        }
    });
}
// api delete commentVocabulary
const deleteCommentVocavularyServices = (commentVocabularyId) => {
    return axios.delete('/api/delete-comment-vocabulary', {
        data: {
            id: commentVocabularyId
        }
    });
}
export {
    deleteCommentGrammarServices,
    deleteCommentVocavularyServices,
    createNewCommentGrammarService,
    createNewCommentVocabularyService,
    handleLoginApi,
    getAllUsers,
    createNewUserService,
    deleteUserService,
    editUserService,
    getAllGrammars,
    deleteGrammarServices,
    createNewGrammarService,
    editGrammarService,
    UploadFileVocabulary,
    createNewVocabularyService,
    deleteVocabularyServices,
    editVocabulayService,
    getAllVocabularys,
    getAllContentVocabularys,
    uploadfile,
    createNewNoteService,
    deleteNoteServices,
    editNoteService,
    getAllNotes,
    deleteContentVocabularyServices,
    getAllReadExercise,
    getAllQuizReading,
    createNewReadExerciseService,
    deleteReadExerciseServices,
    editReadExerciseService,
    deleteQuizReadingServices,
    getAllListenExercise,
    getAllQuizListening,
    createNewListenExerciseService,
    deleteListenExerciseServices,
    editListenExerciseService,
    deleteQuizListeningServices,
    uploadFileQuizReading,
    uploadFileQuizListening,
    editQuizListeningService,
    editQuizReadingService,
    editContentVocabulayService,
    getAllTest,
    getAllExamTest,
    getAllQuizTest,
    createNewExamTestService,
    deleteExamTestServices,
    editExamTestService,
    deleteQuizTestServices,
    editQuizTestService,
    uploadFileQuizTest,
    editResultService,
    createNewResultService,
    getDetailExamTest,
    getDetailListenExercise,
    editPasswordUserService,
    editInfoUserService,
    getAllResultByUser,
    getDetailGrammar,
    createNewRateService,
    getAllRate,
    getAllCommentVocabulary,
    getAllCommentGrammar,
    getAllExamResultByUser,
    createExamNewResultService
};