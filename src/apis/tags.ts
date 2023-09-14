import httpInstance from "@/utils/http";


const path = "/at/"
export function getTagListByArticleIdApi(id:String){
    return httpInstance({
        url: path + `get/${id}`,
        method: 'get',
        data: {
            'showLoading': false
        }
    })
}