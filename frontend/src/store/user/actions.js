export function setinitState(userPayload, SETINIUSERDATA) {
    return ({
        type: SETINIUSERDATA,
        payload: userPayload
    });
};

export function editUserDetails(userPayload, USERACTIONS) {
    return ({
        type: USERACTIONS,
        payload: userPayload
    });
};