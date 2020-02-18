import axios from "axios";

const numUsers = 5;

export default {
    search: function(){
        return axios.get(`https://randomuser.me/api/?results=${numUsers}&nat=us`);
    }
};