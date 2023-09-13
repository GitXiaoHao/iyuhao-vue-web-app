export interface LoginMemberType {

}


export interface RegisterMemberType {
    memberCheckPassword?: String
    memberName?: String
    memberPassword?: String
    memberEmail?: String
    checkCode?: String
}

export interface MemberType {
    /**
     * 用户id
     */

    userId?: String

    /**
     * 用户名
     */
    userName?: String

    /**
     * 用户密码
     */
    userPassword?: String

    /**
     * 用户头像
     */
    userCover?: String

    /**
     * 用户粉丝数量
     */
    userFans?: String
    userEssayCount?: Number

    /**
     * 用户邮箱
     */
    userEmail?: String

    /**
     * 状态
     */
    userStatus?: String

    userRole?: String

    /**
     * 用户手机号码
     */
    userPhone?: String

    /**
     * 用户签名
     */
    userAutograph?: String

    /**
     * 创建时间
     */
    userCreateTime?: String

    /**
     * 更新时间
     */
    userUpdateTime?: String
    userLastLoginTime?: String

}