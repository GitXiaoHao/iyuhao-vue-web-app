import {defineStore} from "pinia";
import {BlogArticleType} from "@/type/article";

interface ArticleStoreStateType{
    articleList: Array<BlogArticleType>
}


export const useArticleStore = defineStore({
    id: "article",
    state: ():ArticleStoreStateType => ({
        articleList: []
    }),
    actions: {
        setArticleList(list:Array<BlogArticleType>):void {
            if(list && list.length){
                this.articleList.length = 0
                Object.assign(this.articleList,list)
            }
        }
    },
    getters: {
        getArticleList(): Array<BlogArticleType>{
            return this.articleList
        }
    }
})