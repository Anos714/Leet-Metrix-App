document.addEventListener("DOMContentLoaded", function () {
  let username = document.querySelector(".username");
  let rank = document.querySelector(".ranking");
  let accRate = document.querySelector(".acceptance-rate");
  let searchBtn = document.querySelector(".btn");
  let userInput = document.getElementById("input");
  let statsContainer = document.querySelector(".graph-div");
  let easyCirlce = document.querySelector(".easy-graph");
  let mediumCirlce = document.querySelector(".medium-graph");
  let hardCirlce = document.querySelector(".hard-graph");
  let easyCount = document.querySelector("#easy-count");
  let mediumCount = document.querySelector("#medium-count");
  let hardCount = document.querySelector("#hard-count");

  function fetchUsername() {
    const userName = userInput.value;
    userInput.value = "";
    console.log(userName);
    if (validateUsername(userName)) {
      fetchAPI(userName);
    }
  }

  function validateUsername(userName) {
    if (userName.trim() === "") {
      alert("Username should not be empty");
      return false;
    }
    const regex = /^[a-zA-Z0-9_-]{1,15}$/;
    const isMatching = regex.test(userName);
    if (!isMatching) {
      alert("Invalid Username");
    }
    return isMatching;
  }

  async function fetchAPI(userName) {
    const url = `https://leetcode-stats-api.herokuapp.com/${userName}`;
    try {
      searchBtn.textContent = "Searching...";
      searchBtn.disabled = true;
      let response = await fetch(url);
      if (!response.ok) {
        throw new Error("Unable to fetch the user deatils");
      }
      let data = await response.json();
      console.log(data);
      if (data.status === "error") {
        alert(data.message);
      }
      displauUserData(data, userName);
    } finally {
      searchBtn.textContent = "Search";
      searchBtn.disabled = false;
    }
  }

  function displauUserData(data, userName) {
    const ranking = data.ranking;
    const acceptanceRate = data.acceptanceRate;
    const totalQue = data.totalQuestions;
    const totalEasyQue = data.totalEasy;
    const totalMediumQue = data.totalMedium;
    const totalHardQue = data.totalHard;
    const totalSolvedQue = data.totalSolved;
    const totalSolvedEasy = data.easySolved;
    const totalSolvedMedium = data.mediumSolved;
    const totalSolvedHard = data.hardSolved;
    if (data.status === "error") {
      username.textContent = `UserName :`;
    } else {
      username.textContent = `UserName : ${userName}`;
    }

    rank.textContent = `Ranking: ${ranking}`;
    accRate.textContent = `Acceptance Rate : ${acceptanceRate}`;
    easyCount.textContent = `${totalSolvedEasy}/${totalEasyQue}`;
    mediumCount.textContent = `${totalSolvedMedium}/${totalMediumQue}`;
    hardCount.textContent = `${totalSolvedHard}/${totalHardQue}`;
  }

  searchBtn.addEventListener("click", fetchUsername);
});
