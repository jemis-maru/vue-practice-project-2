<template>
    <div>
        <custom-dialog :isErr="true" :show="isNoError" title="Save successfully" @close="closeDialog">
            <p>Done!</p>
        </custom-dialog>
        <custom-dialog :show="isError" :isErr="true" title="Error" @close="closeDialog">
            <p>Something went wrong!</p>
        </custom-dialog>
        <container-card>
            <div>
                <div class="logoutDiv">
                    <custom-button @click="logout">Logout</custom-button>
                </div>
                <h2 class="textCenter">Welcome {{ userDetails.userName }}</h2>
                <div class="selectionDiv">
                    <p for="months">Select a month:</p>
                    <select id="months" v-model="selectedMonth" @change="monthChange">
                        <option value="jan">Jan</option>
                        <option value="feb">Feb</option>
                        <option value="mar">Mar</option>
                        <option value="apr">Apr</option>
                        <option value="may">May</option>
                        <option value="june">June</option>
                        <option value="jul">Jul</option>
                        <option value="aug">Aug</option>
                        <option value="sep">Sep</option>
                        <option value="oct">Oct</option>
                        <option value="nov">Nov</option>
                        <option value="dec">Dec</option>
                    </select>
                </div>
                <div class="listDiv" v-if="isListVisible">
                    <div class="firstCol">
                        <ul class="dateList" v-for="(date, index) in monthArr" :key="index">
                            <span>{{ index+1 }}</span>&nbsp;&nbsp;
                            <input class="dateInput" type="text" :value="date" ref="input" @input="changeCount(index)">
                        </ul>
                    </div>
                    <div class="secondCol">
                        <custom-button @click="saveData">Save</custom-button>
                    </div>
                </div>
            </div>
        </container-card>
    </div>
</template>

<script>
import CustomButton from './ui/CustomButton.vue';
import CustomDialog from './ui/CustomDialog.vue';

export default {
    components: {
        'custom-button': CustomButton,
        'custom-dialog': CustomDialog,
    },
    data(){
        return{
            selectedMonth: '',
            userId: '',
            monthArr: [],
            isListVisible: false,
            changeCountArr: [],
            isError: false,
            isNoError: false,
        };
    },
    methods: {
        logout(){
            this.$store.dispatch('logout');
            this.$router.replace('/login');
        },
        monthChange(){
            this.isListVisible = true;
            console.log(this.selectedMonth);
            for(let user in this.userDetails){
                if(user == 'month'){
                    // console.log(this.userDetails[user]);
                    for(let month in this.userDetails[user]){
                        if(this.selectedMonth == month){
                            console.log('getmonth '+month);
                            this.monthArr = this.userDetails[user][month];
                        }
                    }
                }
            }
            console.log(this.monthArr);
        },
        changeCount(ind){
            console.log(ind);
            console.log(this.$refs.input[ind].value);
            let changeCount = Number(this.$refs.input[ind].value);
            this.changeCountArr = JSON.parse(JSON.stringify(this.monthArr));
            this.changeCountArr[ind] = changeCount;
            console.log(this.changeCountArr);
            console.log(this.monthArr);
        },
        async saveData(){
            console.log(Object.keys(this.userInfo)[0]);
            let monthsObj = {};
            for(let user in this.userDetails){
                if(user == 'month'){
                    console.log(this.userDetails[user]);
                    monthsObj = this.userDetails[user];
                }
            }
            console.log(monthsObj[this.selectedMonth]);
            monthsObj[this.selectedMonth] = this.changeCountArr;
            console.log(monthsObj);
            let userId = Object.keys(this.userInfo)[0];
            let updatedUserData = {
                [userId]: {
                    email: this.userDetails.email,
                    month: monthsObj,
                    userName: this.userDetails.userName,
                }
            };
            console.log(updatedUserData);
            try{
                await this.$store.dispatch('dashboardModule/updateData', updatedUserData);
                this.isNoError = true;
            }
            catch(err){
                this.isError = true;
            }
        },
        closeDialog(){
            this.isNoError = false;
            this.isError = false;
        },
    },
    computed: {
        userDetails(){
            console.log(this.$store.getters['dashboardModule/userDetails']);
            let responseData = this.$store.getters['dashboardModule/userDetails'];
            let userData = {};
            for(let user in responseData){
                userData = responseData[user];
            }
            console.log(userData);
            console.log(!this.isError);
            return userData;
        },
        userInfo(){
            return this.$store.getters['dashboardModule/userDetails'];
        },
    },
    created(){
        this.$store.dispatch('dashboardModule/fetchUserData');
    },
}
</script>

<style scoped>
.logoutDiv{
    text-align: right;
}
.selectionDiv{
    display: flex;
    justify-content: space-around;
}
.listDiv{
    display: flex;
    margin-top: 30px;
}
.firstCol, .secondCol{
    flex: 50%;
}
.dateList{
    display: flex;
    align-items: center;
}
.dateInput{
    border: none;
    border-bottom: 1px solid #000000;
    max-width: 100px;
}
</style>