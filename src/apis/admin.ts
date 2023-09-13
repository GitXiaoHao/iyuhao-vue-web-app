import httpInstance from "@/utils/http";

const path = "/blogAdmin/"
export function getAdminListByApi(){
    return httpInstance({
        url: path + "list",
        method: 'get',
        data: {"showLoading": false}
    })
}