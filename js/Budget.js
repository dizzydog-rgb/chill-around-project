// <---------------------- Get userbudget ---------------------->

import axios from 'axios';
axios.get("http://localhost:8080/budget/UserBudget/:id")
    .then(function (response) {
        console.log(response);
    })