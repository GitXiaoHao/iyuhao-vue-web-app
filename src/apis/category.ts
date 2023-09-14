import httpInstance from "@/utils/http";

const path = "/category/"
export function getCategoryByListApi(){
    return httpInstance({
        url: path + "list",
        method: 'get',
        data: {"showLoading": false}
    })
}
export function getCategoryByIdApi(id:String){
    return httpInstance({
        url: path + `get/${id}`,
        method: 'get',
        data: {"showLoading": false}
    })
}
