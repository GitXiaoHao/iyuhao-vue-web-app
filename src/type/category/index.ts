export interface CategoryType{
    /**
     * 分类id
     */
    blogCategoryId?:String

    /**
     * 分类图片
     */
    blogCategoryCover?:String

    /**
     * 分类名称
     */
    blogCategoryName?:String

    /**
     * 分类类型
     */
    blogCategoryType?:String
    /**
     * 分类简介
     */
    blogCategoryDesc?:String

    /**
     * 创建分类用户id
     */
    userId?:String

    /**
     * 分类文章数量
     */
    blogCategoryEssayCount?:String

    /**
     * 创建时间
     */
    blogCategoryCreateTime?:String
    blogCategoryUpdateTime?:String
}