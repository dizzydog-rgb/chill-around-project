import"./modulepreload-polyfill-B5Qt9EMX.js";import"./main-BBsBh9o7.js";import{a as o}from"./axios-CCb-kr4I.js";import"./ejs-D9u4eSHU.js";/* empty css            */document.addEventListener("DOMContentLoaded",function(){document.querySelector(".addJourneyBtn").addEventListener("click",function(){document.querySelectorAll(".toggle-button").forEach(t=>{t.classList.remove("btnSelected")})}),document.querySelectorAll(".toggle-button").forEach(t=>{t.addEventListener("click",function(){t.classList.toggle("btnSelected")})})});o.get("http://localhost:8080/buildPlan/editPlan/:id").then(function(t){const e=t.data;console.log(e)}).catch(function(t){console.log(t),console.log("請求失敗")}).finally(function(){});