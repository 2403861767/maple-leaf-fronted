import myAxios from "../plugins/myAxios";
import {Toast} from "vant";
import {setCurrentUserState} from "../states/user";


export const getCurrentUser = async () =>{
    // const currentUser = getCurrentUserState()
    // if (currentUser){
    //     return currentUser
    // }
    // 不存在
    const res = await myAxios.get('/user/current')
    if (res.code === 0){
        setCurrentUserState(res.data)
        return res.data
    }else {
        return null
    }

}


