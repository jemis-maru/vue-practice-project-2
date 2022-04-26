<template>
    <div>
        <custom-dialog :isErr="true" :show="isNoError" title="Save successfully" @close="closeDialog">
            <p>Done!</p>
        </custom-dialog>
        <custom-dialog :show="isError" :isErr="true" title="Error" @close="closeDialog">
            <p>Something went wrong!</p>
        </custom-dialog>
        <custom-dialog :show="confirmDialog" :isErr="true" :isConfirm="true" title="Warning" @close="closeDialog('cancel')" @userConfirm="confirmClicked">
            <p>Click close to confirm!</p>
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
                        <custom-button class="topMargin" @click="totalSum">Calculate</custom-button>
                        <p class="topMargin">Total count: {{ totalCount }}</p>
                        <p class="topMargin">Price of a diamond:</p>
                        <input type="number" v-model="pricePerDiamond">
                        <custom-button class="topMargin" @click="totalAmount">Total</custom-button>
                        <p class="topMargin">Total amount: {{ totalRupee }}</p>
                        <custom-button :danger="true" class="topMargin" @click="clearClick">Clear All</custom-button>
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
            totalCount: '',
            pricePerDiamond: null,
            totalRupee: '',
            confirmDialog: false,
            isUserConfirm: false,
        };
    },
    methods: {
        logout(){
            this.$store.dispatch('logout');
            this.$router.replace('/login');
        },
        monthChange(){
            this.isListVisible = true;
            this.totalCount = '';
            this.pricePerDiamond = null;
            this.totalRupee = '';
            for(let user in this.userDetails){
                if(user == 'month'){
                    for(let month in this.userDetails[user]){
                        if(this.selectedMonth == month){
                            this.monthArr = this.userDetails[user][month];
                        }
                    }
                }
            }
        },
        changeCount(ind){
            let changeCount = Number(this.$refs.input[ind].value);
            this.changeCountArr = JSON.parse(JSON.stringify(this.monthArr));
            this.changeCountArr[ind] = changeCount;
        },
        async saveData(){
            let monthsObj = {};
            for(let user in this.userDetails){
                if(user == 'month'){
                    monthsObj = this.userDetails[user];
                }
            }
            monthsObj[this.selectedMonth] = this.changeCountArr;
            let userId = Object.keys(this.userInfo)[0];
            let updatedUserData = {
                [userId]: {
                    email: this.userDetails.email,
                    month: monthsObj,
                    userName: this.userDetails.userName,
                }
            };
            try{
                await this.$store.dispatch('dashboardModule/updateData', updatedUserData);
                this.isNoError = true;
            }
            catch(err){
                this.isError = true;
            }
        },
        closeDialog(param){
            this.isNoError = false;
            this.isError = false;
            this.confirmDialog = false;
            this.isUserConfirm = false;
            if(param != 'cancel'){
                location.reload();
            }
        },
        async confirmClicked(){
            this.confirmDialog = false;
            this.isUserConfirm = true;
            await this.clearAll();
            location.reload();
        },
        totalSum(){
            let sum = this.monthArr.reduce((a, b) => {
                return a + b;
            });
            this.totalCount = sum;
        },
        totalAmount(){
            this.totalRupee = this.pricePerDiamond * this.totalCount;
        },
        clearClick(){
            this.confirmDialog = true;
        },
        async clearAll(){
            if(this.isUserConfirm){
                let monthsObj = {};
                for(let user in this.userDetails){
                    if(user == 'month'){
                        monthsObj = JSON.parse(JSON.stringify(this.userDetails[user]))
                        for(let month in monthsObj){
                            monthsObj[month] = Array.from({ length: 31 }).fill(0);
                        }
                    }
                }
                let userId = Object.keys(this.userInfo)[0];
                let updatedUserData = {
                    [userId]: {
                        email: this.userDetails.email,
                        month: monthsObj,
                        userName: this.userDetails.userName,
                    }
                };
                try{
                    await this.$store.dispatch('dashboardModule/updateData', updatedUserData);
                }
                catch(err){
                    console.log(err);
                }
            }
        }
    },
    computed: {
        userDetails(){
            let responseData = this.$store.getters['dashboardModule/userDetails'];
            let userData = {};
            for(let user in responseData){
                userData = responseData[user];
            }
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
    padding: 0px 10px;
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
.topMargin{
    margin-top: 30px;
}
</style>