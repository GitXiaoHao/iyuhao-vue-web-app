import httpInstance from "@/utils/http";

const path = "/blogSpecial/"

export function getSpecialListApi () {
    return httpInstance({
        url: path + `list`,
        method: 'get',
        data: {
            "showLoading": true
        }
    })
}