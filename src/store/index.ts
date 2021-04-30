import { action, observable } from "mobx";
import { findUserInfo } from "../service/userInfo";
interface userInfoProps {
    guid?:string;
    userCount?:string;
    userName?:string;
    userId?:number;
}
class Store {
    //登陆验证
    @observable guid = '';
    //用户账号
    @observable userCount = '';
    //用户名
    @observable userName = '';
    //id值
    @observable userId;

    @action.bound
    setUserInfo(info:userInfoProps){
        if(info.guid){
            this.guid = info.guid;
        }
        if(info.userCount){
            this.userCount = info.userCount;
            findUserInfo({usercount:info.userCount,pageNum:1,pageSize:999}).then(res =>{
                const data = res?.data?.Data;
                if(data){
                    this.userId = data[0].id;
                    this.userName = data[0].username;
                }
            })
        }
        if(info.userId){
            this.userId = info.userId;
        }
        if(info.userName){
            this.userName = info.userName;
        }
    }
}
export default new Store();