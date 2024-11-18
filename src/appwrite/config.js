import conf from "../conf/conf"
import {Client,ID,Databases,Storage,Query} from 'appwrite'

export class Service{
    client=new Client;
    databases;
    bucket;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);

        this.databases=new Databases(this.client);
        this.bucket=new Storage(this.client);
    }

    async createPost({title,slug,content,featuredImage,status,userId})
    {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }

            )
        } catch (error) {
            console.log("Appwrite servie:: createPost :: error",error)
        }
    }   
    
    async updatePost(slug,{title,content,featuredImage,status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                })
        } catch (error) {
            console.log("Appwrite servie:: updatePost :: error",error)
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true;
        } catch (error) {
            console.log("Appwrite servie:: deletePost :: error",error)
            return false;
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("Appwrite servie:: getPost :: error",error)
        }
    }

    async getPosts(queries=[Query.equal('status','active')]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            )
        } catch (error) {
            console.log("Appwrite servie:: getPosts :: error",error)
        }
    } 
    //file upload service

    async uploadFile(file){
        console.log("File in upload file ",file)
        try {
            const retFile=await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
            console.log('retFIle is ',retFile)
            return retFile
        } catch (error) {
            console.log("Appwrite servie:: uploadFile :: error",error)
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true;
        } catch (error) {
            console.log("Appwrite servie:: deleteFile :: error",error)
            return false;
        }
    }

    getFilePreview(fileId){
        // console.log('inside getfile preview and id is ' ,fileId)
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
}


const service= new Service()

export default service