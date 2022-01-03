import Vue from "vue";

import dayjs from "dayjs";


Vue.filter("date",(val,format='MMM D, YYYY')=>{
    return dayjs(val).format(format)
})