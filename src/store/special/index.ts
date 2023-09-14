import {defineStore} from "pinia";
import {SpecialType} from "@/type/special";

interface specialStoreState {
    specialList: Array<SpecialType>
}


export const useSpecialStore = defineStore({
    id: 'special',
    state: (): specialStoreState => ({
        specialList: []
    }),
    getters: {
        getSpecialList(): SpecialType[] {
            return this.specialList
        }
    },
    actions: {
        setSpecialList(list: Array<SpecialType>): void {
            this.specialList.length = 0
            Object.assign(this.specialList, list)
        }
    }
})