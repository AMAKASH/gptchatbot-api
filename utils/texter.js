const axios = require("axios");
const url = "";

const sendSMS = (recipeient, msg) => {
  const data = {
    api_key: "",
    senderid: "",
    number: recipeient,
    message: msg,
  };

  axios
    .post(url, data)
    .then((response) => {
      console.log("Response:", response.data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

module.exports = sendSMS;
