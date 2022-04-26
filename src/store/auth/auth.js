let timer;

export default {
    state(){
        return{
            userId: null,
            token: null,
            didAutoLogout: false,
        };
    },
    mutations: {
        setUser(state, payload){
            state.token = payload.token;
            state.userId = payload.userId;
        },
        didAutoLogout(state){
            state.didAutoLogout = true;
        },
    },
    actions: {
        async register(context, payload){
            let serverUrl = process.env.VUE_APP_SIGNUP_URL;
            const response = await fetch(serverUrl, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: payload.email,
                    password: payload.password,
                    returnSecureToken: true,
                }),
            });

            const responseData = await response.json();
            
            if(!response.ok){
                let errMsg = responseData.error.message.replace(/_/gi, " ");
                const error = new Error(errMsg || 'Authentication failed!');
                throw error;
            }

            let dataToRegister = {
                userName: payload.userName,
                email: payload.email,
                month: {
                    jan: {
                        0: 0,
                        1: 0,
                        2: 0,
                        3: 0,
                        4: 0,
                        5: 0,
                        6: 0,
                        7: 0,
                        8: 0,
                        9: 0,
                        10: 0,
                        11: 0,
                        12: 0,
                        13: 0,
                        14: 0,
                        15: 0,
                        16: 0,
                        17: 0,
                        18: 0,
                        19: 0,
                        20: 0,
                        21: 0,
                        22: 0,
                        23: 0,
                        24: 0,
                        25: 0,
                        26: 0,
                        27: 0,
                        28: 0,
                        29: 0,
                        30: 0,
                    },
                    feb: {
                        0: 0,
                        1: 0,
                        2: 0,
                        3: 0,
                        4: 0,
                        5: 0,
                        6: 0,
                        7: 0,
                        8: 0,
                        9: 0,
                        10: 0,
                        11: 0,
                        12: 0,
                        13: 0,
                        14: 0,
                        15: 0,
                        16: 0,
                        17: 0,
                        18: 0,
                        19: 0,
                        20: 0,
                        21: 0,
                        22: 0,
                        23: 0,
                        24: 0,
                        25: 0,
                        26: 0,
                        27: 0,
                        28: 0,
                        29: 0,
                        30: 0,
                    },
                    mar: {
                        0: 0,
                        1: 0,
                        2: 0,
                        3: 0,
                        4: 0,
                        5: 0,
                        6: 0,
                        7: 0,
                        8: 0,
                        9: 0,
                        10: 0,
                        11: 0,
                        12: 0,
                        13: 0,
                        14: 0,
                        15: 0,
                        16: 0,
                        17: 0,
                        18: 0,
                        19: 0,
                        20: 0,
                        21: 0,
                        22: 0,
                        23: 0,
                        24: 0,
                        25: 0,
                        26: 0,
                        27: 0,
                        28: 0,
                        29: 0,
                        30: 0,
                    },
                    apr: {
                        0: 0,
                        1: 0,
                        2: 0,
                        3: 0,
                        4: 0,
                        5: 0,
                        6: 0,
                        7: 0,
                        8: 0,
                        9: 0,
                        10: 0,
                        11: 0,
                        12: 0,
                        13: 0,
                        14: 0,
                        15: 0,
                        16: 0,
                        17: 0,
                        18: 0,
                        19: 0,
                        20: 0,
                        21: 0,
                        22: 0,
                        23: 0,
                        24: 0,
                        25: 0,
                        26: 0,
                        27: 0,
                        28: 0,
                        29: 0,
                        30: 0,
                    },
                    may: {
                        0: 0,
                        1: 0,
                        2: 0,
                        3: 0,
                        4: 0,
                        5: 0,
                        6: 0,
                        7: 0,
                        8: 0,
                        9: 0,
                        10: 0,
                        11: 0,
                        12: 0,
                        13: 0,
                        14: 0,
                        15: 0,
                        16: 0,
                        17: 0,
                        18: 0,
                        19: 0,
                        20: 0,
                        21: 0,
                        22: 0,
                        23: 0,
                        24: 0,
                        25: 0,
                        26: 0,
                        27: 0,
                        28: 0,
                        29: 0,
                        30: 0,
                    },
                    june: {
                        0: 0,
                        1: 0,
                        2: 0,
                        3: 0,
                        4: 0,
                        5: 0,
                        6: 0,
                        7: 0,
                        8: 0,
                        9: 0,
                        10: 0,
                        11: 0,
                        12: 0,
                        13: 0,
                        14: 0,
                        15: 0,
                        16: 0,
                        17: 0,
                        18: 0,
                        19: 0,
                        20: 0,
                        21: 0,
                        22: 0,
                        23: 0,
                        24: 0,
                        25: 0,
                        26: 0,
                        27: 0,
                        28: 0,
                        29: 0,
                        30: 0,
                    },
                    jul: {
                        0: 0,
                        1: 0,
                        2: 0,
                        3: 0,
                        4: 0,
                        5: 0,
                        6: 0,
                        7: 0,
                        8: 0,
                        9: 0,
                        10: 0,
                        11: 0,
                        12: 0,
                        13: 0,
                        14: 0,
                        15: 0,
                        16: 0,
                        17: 0,
                        18: 0,
                        19: 0,
                        20: 0,
                        21: 0,
                        22: 0,
                        23: 0,
                        24: 0,
                        25: 0,
                        26: 0,
                        27: 0,
                        28: 0,
                        29: 0,
                        30: 0,
                    },
                    aug: {
                        0: 0,
                        1: 0,
                        2: 0,
                        3: 0,
                        4: 0,
                        5: 0,
                        6: 0,
                        7: 0,
                        8: 0,
                        9: 0,
                        10: 0,
                        11: 0,
                        12: 0,
                        13: 0,
                        14: 0,
                        15: 0,
                        16: 0,
                        17: 0,
                        18: 0,
                        19: 0,
                        20: 0,
                        21: 0,
                        22: 0,
                        23: 0,
                        24: 0,
                        25: 0,
                        26: 0,
                        27: 0,
                        28: 0,
                        29: 0,
                        30: 0,
                    },
                    sep: {
                        0: 0,
                        1: 0,
                        2: 0,
                        3: 0,
                        4: 0,
                        5: 0,
                        6: 0,
                        7: 0,
                        8: 0,
                        9: 0,
                        10: 0,
                        11: 0,
                        12: 0,
                        13: 0,
                        14: 0,
                        15: 0,
                        16: 0,
                        17: 0,
                        18: 0,
                        19: 0,
                        20: 0,
                        21: 0,
                        22: 0,
                        23: 0,
                        24: 0,
                        25: 0,
                        26: 0,
                        27: 0,
                        28: 0,
                        29: 0,
                        30: 0,
                    },
                    oct: {
                        0: 0,
                        1: 0,
                        2: 0,
                        3: 0,
                        4: 0,
                        5: 0,
                        6: 0,
                        7: 0,
                        8: 0,
                        9: 0,
                        10: 0,
                        11: 0,
                        12: 0,
                        13: 0,
                        14: 0,
                        15: 0,
                        16: 0,
                        17: 0,
                        18: 0,
                        19: 0,
                        20: 0,
                        21: 0,
                        22: 0,
                        23: 0,
                        24: 0,
                        25: 0,
                        26: 0,
                        27: 0,
                        28: 0,
                        29: 0,
                        30: 0,
                    },
                    nov: {
                        0: 0,
                        1: 0,
                        2: 0,
                        3: 0,
                        4: 0,
                        5: 0,
                        6: 0,
                        7: 0,
                        8: 0,
                        9: 0,
                        10: 0,
                        11: 0,
                        12: 0,
                        13: 0,
                        14: 0,
                        15: 0,
                        16: 0,
                        17: 0,
                        18: 0,
                        19: 0,
                        20: 0,
                        21: 0,
                        22: 0,
                        23: 0,
                        24: 0,
                        25: 0,
                        26: 0,
                        27: 0,
                        28: 0,
                        29: 0,
                        30: 0,
                    },
                    dec: {
                        0: 0,
                        1: 0,
                        2: 0,
                        3: 0,
                        4: 0,
                        5: 0,
                        6: 0,
                        7: 0,
                        8: 0,
                        9: 0,
                        10: 0,
                        11: 0,
                        12: 0,
                        13: 0,
                        14: 0,
                        15: 0,
                        16: 0,
                        17: 0,
                        18: 0,
                        19: 0,
                        20: 0,
                        21: 0,
                        22: 0,
                        23: 0,
                        24: 0,
                        25: 0,
                        26: 0,
                        27: 0,
                        28: 0,
                        29: 0,
                        30: 0,
                    },
                },
            };

            const response1 = await fetch(process.env.VUE_APP_SERVER_URL + `users/${responseData.localId}.json?auth=${responseData.idToken}`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataToRegister),
              });
      
            const responseData1 = await response1.json();
            console.log(responseData1);
        },
        async login(context, payload){
            let serverUrl = process.env.VUE_APP_LOGIN_URL;
            const response = await fetch(serverUrl, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: payload.email,
                    password: payload.password,
                    returnSecureToken: true,
                }),
            });

            const responseData = await response.json();
            
            if(!response.ok){
                let errMsg = responseData.error.message.replace(/_/gi, " ");
                const error = new Error(errMsg || 'Authentication failed!');
                throw error;
            }
            
            const expiresIn = +responseData.expiresIn * 1000;
            // const expiresIn = 5000;
            const expirationDate = new Date().getTime() + expiresIn;
           
            localStorage.setItem('token', responseData.idToken);
            localStorage.setItem('userId', responseData.localId);
            localStorage.setItem('tokenExpiration', expirationDate);

            timer = setTimeout(function(){
                context.dispatch('autoLogout');
            }, expiresIn);

            context.commit('setUser', {
                token: responseData.idToken,
                userId: responseData.localId,
            });
        },
        autoLogin(context){
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userId');
            const tokenExpiration = localStorage.getItem('tokenExpiration');

            const expiresIn = +tokenExpiration - new Date().getTime();

            if(expiresIn < 0){
                return;
            }

            timer = setTimeout(function(){
                context.dispatch('autoLogout');
            }, expiresIn);

            if(token && userId){
                context.commit('setUser', {
                    token: token,
                    userId: userId,
                });
            }
        },
        logout(context){
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            localStorage.removeItem('tokenExpiration');
            clearTimeout(timer);
            context.commit('setUser', {
                token: null,
                userId: null,
            });
        },
        autoLogout(context){
            context.dispatch('logout');
            context.commit('didAutoLogout');
        },
    },
    getters: {
        isAuth(state){
            return !!state.token;
        },
        userId(state){
            return state.userId;
        },
        didAutoLogout(state){
            return state.didAutoLogout;
        },
    },
};