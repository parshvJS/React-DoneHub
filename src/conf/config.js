import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteURL)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client)
    }

    async createPost({ title, slug, content, featuredImage, status, userID }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                { title, content, featuredImage, status, userID, }
            )

        } catch (error) {
            console.error("config.js :: createPost:: error : ", error)
        }
    }


    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                { title, content, featuredImage, status, }
            )

        } catch (error) {
            console.error("config.js :: updatePost :: error : ", error)
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug)


            return false
        } catch (error) {
            console.error("config.js :: deletepost :: error : ", error)
            return false;
        }
    }

    async listPost(slug) {
        try {
            return this.databases.getDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug)
        } catch (error) {
            console.error("config.js :: listPost :: error : ", error)
            return false;
        }
    }

    async listAllPost(queries=[Query.equal("status","active")]){
        try {
            return await this.databases.listDocuments(conf.appwriteDatabaseId,
                conf.appwriteCollectionId
                ,queries)
        } catch (error) {
            console.error("config.js :: listAllPost :: error : ", error)
        }
    }



    // file upload services


    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file,
            )
        } catch (error) {
            console.error("config.js :: uploadfile :: error : ", error)
            return false;
        }
    }

    async deleteFile(fileId){
        try {
            await  this.bucket.deleteFile(conf.appwriteBucketId,fileId)
        } catch (error) {
            console.error("config.js :: deleteFile :: error : ", error)
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(conf.appwriteBucketId,fileId)
    }

}

const serviceObj = new service();

export default serviceObj;

