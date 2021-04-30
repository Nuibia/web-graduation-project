import { action, observable } from "mobx";
interface userInfoProps {
    guid?:string;
    userCount?:string;
    userName?:string;
    userId?:string;
}
class Store {
    //登陆验证
    @observable guid = '';
    //用户账号
    @observable userCount = '';
    //用户名
    @observable userName = '';
    //id值
    @observable userId = '';

    @action.bound
    setUserInfo(info:userInfoProps){
        if(info.guid){
            this.guid = info.guid;
        }
        if(info.userCount){
            this.userCount = info.userCount;
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