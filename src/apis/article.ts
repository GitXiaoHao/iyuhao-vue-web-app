import httpInstance from "@/utils/http";
import {BlogArticleType} from "@/type/article";

const articlePath = '/blogArticle/'


export function getArticleByListApi() {
    return httpInstance({
        url: articlePath + `list`,
        method: 'get',
        data: {
            "showLoading": true
        }
    })
}
export function getArticleByIdApi(id: String) {
    return httpInstance({
        url: articlePath + `detail/${id}`,
        method: 'get',
        data: {
            "showLoading": true
        }
    })
}
export function getArticleByFuzzyTitleApi(title: String) {
    return httpInstance({
        url: articlePath + `dfn/${title}`,
        method: 'get',
        data: {
            "showLoading": true
        }
    })
}
export function getArticleByCategoryNameApi(name: String) {
    return httpInstance({
        url: articlePath + `dcn/${name}`,
        method: 'get',
        data: {
            "showLoading": true
        }
    })
}
export function getArticleBySpecialIdApi(id: String) {
    return httpInstance({
        url: articlePath + `dsi/${id}`,
        method: 'get',
        data: {
            "showLoading": true
        }
    })
}
export function updateBlogArticleViewsNumberApi(blogArticle:BlogArticleType) {
    return httpInstance({
        url: articlePath + `vn`,
        method: 'put',
        data: {
            ...blogArticle,
            "showLoading": true
        }
    })
}
