import {defineStore} from "pinia";
import {CategoryType} from "@/type/category";

interface CategoryStoreState {
    categoryList: Array<CategoryType>
}

export const useCategoryStore = defineStore({
    id: "category",
    state: ():CategoryStoreState => ({
        categoryList: []
    }),
    actions: {
        setCategoryList(list:Array<CategoryType>){
                this.categoryList.length = 0
                Object.assign(this.categoryList,list)
        }
    },
    getters: {
        getCategoryList():Array<CategoryType> {
            return this.categoryList
        }
    }
})