export const userPermissionValidator=(pageId)=>{
    let userDetails = JSON.parse(localStorage.loginResp);
    const accessList = userDetails.data.ACCESS_LIST || [];
    const filteredPage = accessList.filter((e) => e.id === pageId);
    if(filteredPage.length){
        return filteredPage[0];
    }else{
        return {}
    }
}

export const usernameFromLocalStorage=(page)=>{
    let userDetails = JSON.parse(localStorage.loginResp);
    const username = {username: userDetails.data.USER_NAME,moduleNo : page} || {};
    return  username
}