export default {
    namespaced: true,
    state(){
        return{
            userInfo: {},
        };
    },
    mutations: {
        setUserInfo(state, payload){
            state.userInfo = payload;
        },
    },
    actions: {
        async fetchUserData(context){
            const userId = context.rootGetters.userId;
            console.log(userId);
            const response = await fetch(process.env.VUE_APP_SERVER_URL + `users/${userId}.json`);
            const responseData = await response.json();
            if(!response.ok){
                console.log(responseData);
            }
            console.log(responseData);
            context.commit('setUserInfo', responseData);
        },
        async updateData(_, payload){
            console.log(payload);
            let userId = localStorage.getItem("userId");
            let token = localStorage.getItem("token");
            const response = await fetch(process.env.VUE_APP_SERVER_URL + `users/${userId}.json?auth=${token}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload),
            });
    
            const responseData = await response.json();
    
            console.log(responseData);
        },
    },
    getters: {
        userDetails(state){
            return state.userInfo;
        },
    },
};