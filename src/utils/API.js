import axios from "axios";

const numUsers = 25;

export default {
    search: function(){
        return axios.get(`https://randomuser.me/api/?results=${numUsers}&nat=us`);
    }
};