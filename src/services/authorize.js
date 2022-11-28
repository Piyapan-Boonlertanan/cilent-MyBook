//เก็บ token และ username => session storage
export const authenticate=(respone,next)=>{
    if(window !== "undefined"){
        //เก็บข้อมูลลง session storage
        sessionStorage.setItem("token",JSON.stringify(respone.data.token))
        sessionStorage.setItem("user",JSON.stringify(respone.data.username))
    }
    next()
}

//ดึงข้อมูล token
export const getToken=()=>{
    if(window !== "undefined"){
        if(sessionStorage.getItem("token")){
            return JSON.parse(sessionStorage.getItem("token"))
        }else{
            return false
        }
    }
}

//ดึงข้อมูล user ตรวจสอบการเข้าสู่ระบบ
export const getUser=()=>{
    if(window !== "undefined"){
        if(sessionStorage.getItem("user")){
            return JSON.parse(sessionStorage.getItem("user"))
        }else{
            return false
        }
    }
}

//logout
export const logout=(next)=>{
    if(window !== "underfind"){
        sessionStorage.removeItem("token")
        sessionStorage.removeItem("user")
    }
    next()
}