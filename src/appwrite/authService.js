import conf from "../conf/conf";
import { Client, Account, ID } from 'appwrite'

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteURL)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    // creating account
    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            if (userAccount) {
                console.log("userAccount Created !");
                return userAccount;
            }
            // else {
            //     return userAccount;
            //     console.error("userAccount creation failed ! : authService.js : createAccount");
            // }
        } catch (error) {
            console.error("authService.js : createAccount : ", error)
            return error
        }
    }

    async login({ email, password }) {
        try {
            const userLogin = await this.account.createEmailSession(email, password);
            return userLogin;
        } catch (error) {
            console.error("user login failed ! : authService.js : login : ", error)
        }
    }


    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.error("get current user failed! : authService.js : getCurrentUser : ", error)
        }

        return null;
    }

    async logout() {
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.error("logout Failed ! : authService.js : logout: ", error)

        }
    }

}

const authServiceObj = new AuthService();

export default authServiceObj;

