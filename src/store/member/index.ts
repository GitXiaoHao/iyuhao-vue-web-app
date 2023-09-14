import {defineStore} from "pinia";
import {MemberType} from "@/type/member";

interface MemberStoreState {
    memberList: Array<MemberType>
}


export const useMemberStore = defineStore({
    id: 'member',
    state: (): MemberStoreState => ({
        memberList: []
    }),
    getters: {
        getMemberList(): MemberType[] {
            return this.memberList
        }
    },
    actions: {
        setMemberList(list: Array<MemberType>): void {

                this.memberList.length = 0
                Object.assign(this.memberList, list)
        }
    }
})