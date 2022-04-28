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
                        <p>Advance salary:</p>
                        <div v-for="(sal, index) in advanceSalaryArr" :key="index">
                            <input class="advanceSalaryInput" :value="sal" type="number" ref="inputSalary" @input="changeAdvanceSalary(index)">
                        </div>
                        <custom-button class="topMargin" @click="saveData">Save</custom-button>
                        <p class="topMargin">Price of a diamond:</p>
                        <input type="number" v-model="pricePerDiamond">
                        <custom-button class="topMargin" @click="totalSum">Calculate</custom-button>
                        <p class="topMargin">Total diamonds: {{ totalCount }}</p>
                        <p class="topMargin">Month amount: {{ totalRupee }}</p>
                        <p class="topMargin">Advance amount: {{ totalAdvanceSalary }}</p>
                        <p class="topMargin">Final salary: {{ finalSalary }}</p>
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
            advanceSalaryArr: [],
            isListVisible: false,
            changeCountArr: [],
            changeAdvanceSalaryArr: [],
            isError: false,
            isNoError: false,
            totalCount: '',
            pricePerDiamond: null,
            totalRupee: '',
            totalAdvanceSalary: '',
            finalSalary: '',
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
            this.totalAdvanceSalary = '';
            this.finalSalary = '';
            this.changeCountArr = [];
            this.advanceSalaryArr = [];
            localStorage.setItem("month", this.selectedMonth);
            for(let user in this.userDetails){
                if(user == 'month'){
                    for(let month in this.userDetails[user]){
                        if(this.selectedMonth == month){
                            this.monthArr = this.userDetails[user][month];
                        }
                    }
                }
                if(user == 'advanceSalary'){
                    for(let month in this.userDetails[user]){
                        if(this.selectedMonth == month){
                            this.advanceSalaryArr = this.userDetails[user][month];
                        }
                    }
                }
            }
            this.changeCountArr = JSON.parse(JSON.stringify(this.monthArr));
            this.changeAdvanceSalaryArr = JSON.parse(JSON.stringify(this.advanceSalaryArr));
        },
        changeCount(ind){
            let changeCount = Number(this.$refs.input[ind].value);
            this.changeCountArr[ind] = changeCount;
        },
        changeAdvanceSalary(ind){
            let changeSalary = Number(this.$refs.inputSalary[ind].value);
            this.changeAdvanceSalaryArr[ind] = changeSalary;
        },
        async saveData(){
            if(this.changeCountArr.length === 31 && this.changeAdvanceSalaryArr.length === 5){
                let monthsObj = {};
                for(let user in this.userDetails){
                    if(user == 'month'){
                        monthsObj = this.userDetails[user];
                    }
                }
                monthsObj[this.selectedMonth] = this.changeCountArr;
                let advanceSalaryObj = {};
                for(let user in this.userDetails){
                    if(user == 'advanceSalary'){
                        advanceSalaryObj = this.userDetails[user];
                    }
                }
                advanceSalaryObj[this.selectedMonth] = this.changeAdvanceSalaryArr;
                let userId = Object.keys(this.userInfo)[0];
                let updatedUserData = {
                    [userId]: {
                        email: this.userDetails.email,
                        month: monthsObj,
                        advanceSalary: advanceSalaryObj,
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
            let advanceSalarySum = this.advanceSalaryArr.reduce((a, b) => {
                return a + b;
            });
            this.totalAdvanceSalary = advanceSalarySum;
            this.totalRupee = (this.pricePerDiamond * this.totalCount).toFixed(2);
            this.finalSalary = (this.totalRupee - this.totalAdvanceSalary).toFixed(2);
        },
        clearClick(){
            this.confirmDialog = true;
        },
        async clearAll(){
            if(this.isUserConfirm){
                let monthsObj = {};
                let advanceSalaryObj = {};
                for(let user in this.userDetails){
                    if(user == 'month'){
                        monthsObj = JSON.parse(JSON.stringify(this.userDetails[user]))
                        for(let month in monthsObj){
                            monthsObj[month] = Array.from({ length: 31 }).fill(0);
                        }
                    }
                    else if(user == 'advanceSalary'){
                        advanceSalaryObj = JSON.parse(JSON.stringify(this.userDetails[user]))
                        for(let month in advanceSalaryObj){
                            advanceSalaryObj[month] = Array.from({ length: 5 }).fill(0);
                        }
                    }
                }
                let userId = Object.keys(this.userInfo)[0];
                let updatedUserData = {
                    [userId]: {
                        email: this.userDetails.email,
                        month: monthsObj,
                        advanceSalary: advanceSalaryObj,
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
    async created(){
        await this.$store.dispatch('dashboardModule/fetchUserData');
        this.selectedMonth = localStorage.getItem("month");
        this.monthChange();
        this.changeCountArr = JSON.parse(JSON.stringify(this.monthArr));
        this.changeAdvanceSalaryArr = JSON.parse(JSON.stringify(this.advanceSalaryArr));
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
    padding: 0px;
}
.firstCol{
    padding-right: 10px;
    padding-left: 0px;
    text-align: left;
}
.secondCol{
    padding-left: 10px;
}
.dateList{
    display: flex;
    padding: 0px;
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
.advanceSalaryInput{
    margin-top: 10px;
}
</style>