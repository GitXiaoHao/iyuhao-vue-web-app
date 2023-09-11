import httpInstance from "@/utils/http";

const path = "/category/"
export function getCategoryByListApi(){
    return httpInstance({
        url: path + "list",
        method: 'post',
        data: {"showLoading": false}
    })
}