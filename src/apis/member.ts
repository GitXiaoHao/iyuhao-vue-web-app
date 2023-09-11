import httpInstance from "@/utils/http";
import {LoginMemberType, RegisterMemberType} from "@/type/member";

const member: string = "/member/"


export function getVerifyApi() {
    return httpInstance({
        url: member + 'verify',
        method: 'get'
    })
}


export function equalsVerifyApi(checkCode: String) {
    return httpInstance({
        url: member + 'compareVerify',
        method: 'post',
        data: {checkCode, "showLoading": false}
    })
}

/**
 * 查找用户名 是否重复
 * @param memberName
 */
export const getMemberByNameApi = (memberName: String) => {
    return httpInstance({
        url: member + `get`,
        method: 'post',
        data: {memberName, "showLoading": false}
    })
}

/**
 * 获取验证码
 * @param memberEmail
 */
export const obtainVerificationCodeApi = (memberEmail: String) => {
    return httpInstance({
        url: member + `obtainEmail/${memberEmail}`,
        method: 'get',
        data: { "showLoading": false}
    })
}
/**
 * 验证邮箱验证码
 */
export const verificationCodeMailApi = (checkCode:String) => {
    return httpInstance({
        url: member + `vcCm/${checkCode}`,
        method: 'get',
        data: {"showLoading": false}
    })
}

/**
 * 验证信息
 * @param member
 */
export const loginMemberApi = (member:LoginMemberType) => {
    return httpInstance({
        url: member + 'login',
        method: 'post',
        data: {...member, "showLoading": true}
    })
}

export const registerMemberApi = (member:RegisterMemberType) => {
    return httpInstance({
        url: member + 'register',
        method: 'post',
        data: {...member, "showLoading": true}
    })
}


