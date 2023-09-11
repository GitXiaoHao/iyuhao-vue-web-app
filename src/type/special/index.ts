export interface SpecialType {
    /**
     * 博客专题id
     */
    blogSpecialId?: String

    /**
     * 博客专题名称
     */
    blogSpecialName?: String

    /**
     * 博客专题封面
     */
    blogSpecialCover?: String

    /**
     * 博客专题简介
     */
    blogSpecialBriefIntroduction?: String

    /**
     * 博客专题编辑人id
     */
    userId?: String

    /**
     * 博客专题作者
     */
    userName?: String

    /**
     * 博客专题最后一次修改人id
     */
    blogSpecialLastUpdateUserId?: String
    blogSpecialLastUpdateUserName?: String

    /**
     * 点赞次数
     */
    blogSpecialGoodNumber?: String

    /**
     * 观看次数
     */
    blogSpecialViewsNumber?: String

    /**
     * 收藏次数
     */
    blogSpecialFavoriteNumber?: String

    /**
     * 博客专题文章数量
     */
    blogSpecialEssayCount?: String

    /**
     * 添加时间
     */
    blogSpecialAddTime?: String

    /**
     * 更新时间
     */
    blogSpecialUpdateTime?: String
}