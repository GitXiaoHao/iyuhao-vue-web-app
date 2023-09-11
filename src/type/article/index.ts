export interface BlogArticleType {
    /**
     * 博客文章id
     */
    blogArticleId?:String

    /**
     * 博客文章标题
     */
    blogArticleTitle?:String

    /**
     * 博客文章分类id
     */
    blogCategoryName?:String

    /**
     * 博客文章封面
     */
    blogArticleCover?:String

    /**
     * 博客文章摘要
     */
    blogArticleSummary?:String

    /**
     * 博客文章内容
     */
    blogArticleContent?:String

    /**
     * 博客文章markdown内容
     */
    blogArticleMarkdownContent?:String

    /**
     * 博客文章编辑器类型
     */
    blogArticleEditorType?:String
    blogSpecialId?:String

    /**
     * 博客文章编辑人id
     */
    userId?:String

    /**
     * 博客文章作者
     */
    userName?:String
    /**
     *文章类型
     */
    blogArticleType?:String
    /**
     *文章转载
     */
    blogArticleReprintUrl?:String

    /**
     * 文章评论权限1:允许0:不允许
     */
     blogArticleAllowComment?:String

    /**
     * 博客文章状态
     */
    blogStatusName?:String

    /**
     * 点赞次数
     */
     blogArticleGoodNumber?:String

    /**
     * 观看次数
     */
     blogArticleViewsNumber?:String

    /**
     * 收藏次数
     */
     blogArticleFavoriteNumber?:String

    /**
     * 文章添加时间
     */
    blogArticleAddTime?:String

    /**
     * 更新时间
     */
    blogArticleUpdateTime?:String
}