import actionTypes from './actionTypes';
import { createNewUserService } from '../../services/userService';
import { toast } from 'react-toastify';

// export const addUserSuccess = () => ({
//     type: actionTypes.ADD_USER_SUCCESS
// })

export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {

            let res = await createNewUserService(data);
            if (res && res.errCode === 0) {
                toast.success("Create new user succedd");
                dispatch(saveUserSuccess())
            } else {
                dispatch(saveUserFailed());
            }

        } catch (e) {
            dispatch(saveUserFailed());
            console.log('saveUserFailed error', e)
        }
    }
}
export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
})
export const saveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED
})


