import httpInstance from "@/utils/http";
import {SpecialType} from "@/type/special";

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
export function getSpecialByIdApi (id:String) {
    return httpInstance({
        url: path + `get/${id}`,
        method: 'get',
        data: {
            "showLoading": true
        }
    })
}

export function updateSpecialApi(special:SpecialType){
    return httpInstance({
        url: path + 'special',
        method: 'post',
        data: {
            ...special,
            "showLoading": true
        }
    })
}
