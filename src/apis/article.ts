import httpInstance from "@/utils/http";

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
