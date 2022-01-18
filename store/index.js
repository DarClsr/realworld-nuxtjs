const cookieparser = process.server ? require('cookieparser') : undefined;

import {getProfile} from "@/api/user";

export const state = () => {
    return {
        user: null
    }
}

export const mutations = {
    setUser(state, user) {
        state.user = user;
    }
}

export const actions = {
    nuxtServerInit({ commit }, { req }) {
        let auth = null
        if (req.headers.cookie) {
            const parsed = cookieparser.parse(req.headers.cookie)
            try {
                auth = JSON.parse(parsed.user)
            } catch (err) {
                // No valid cookie found
            }
        }
        commit('setUser', auth)
    },
    async getProfile({commit}){
        const res=await getProfile();
        if(res.status==200){
            const user=res.data.user;
           commit("setUser",user)
          return user;
        }
    },
}