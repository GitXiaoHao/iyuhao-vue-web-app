import httpInstance from "@/utils/http";

const path = "/special/"

export function getSpecialListApi () {
    return httpInstance({
        url: path + `list`,
        method: 'get',
        data: {
            "showLoading": true
        }
    })
}