//เก็บ username , token ไว้ใน session storages
export const authenicate = (response,next) => {
    if(window !== "undefined"){
        //เก็บข้อมูลลง sessions storages
        sessionStorage.setItem("token", JSON.stringify(response.data.token));
        sessionStorage.setItem("user", JSON.stringify(response.data.user));
    }
    next();
}

//ดึงข้อมูล token 
export const getToken = () => {
    if(window !=="undefined"){
        if(sessionStorage.getItem("token")){
            JSON.parse(sessionStorage.getItem("token"))
        }else {
            return false;
        }
    }
}

//ดึงข้อมูล user
export const getUser = () => {
    if(window !=="undefined"){
        if(sessionStorage.getItem("user")){
            JSON.parse(sessionStorage.getItem("user"))
        }else {
            return false;
        }
    }
}