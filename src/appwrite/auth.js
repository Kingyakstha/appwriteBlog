import conf from "../conf/conf"
import {Client,ID,Account} from 'appwrite'

export class AuthService{
    client=new Client();
    account;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);

        this.account=new Account(this.client)
    }

    async createAccount({email,password,name }){
        console.log('hello')
        try {
            const userAccount=await this.account.create(ID.unique(),email,password,name)
            if(userAccount){
                //call another method
                this.accountLogIn({email,password});
            }
            else{
                return userAccount
            }

        } catch (error) {
            console.log('error occured while creating account',error.message,error.response)
            throw error;
        }
    }

    async accountLogIn({email,password}){
        try {
            const accLogin=await this.account.createEmailPasswordSession(email,password)
            return accLogin
        } catch (error) {
            throw error;
        }

    }

    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            throw error
        }
        
        return null;
    }
    async accountLogOut(){
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            throw error;   
        }
    }

 
}

const authService= new AuthService()

export default authService