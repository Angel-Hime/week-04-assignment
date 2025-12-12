console.log("test");

//TODO: collect user data and send to the server
//submit event to collect user data

const feedbackForm = document.getElementById("feedbackForm");

console.log(feedbackForm);

function handleFeedbackFormSubmit(event) {
  event.preventDefault();
  const formDataTemplate = new FormData(feedbackForm);
  const formValues = Object.fromEntries(formDataTemplate);
  console.log(formValues);

  // fetch the POST server route
  fetch("http://localhost:8080/newcomment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ formValues }),
  });
}

feedbackForm.addEventListener("submit", handleFeedbackFormSubmit);

//! build the submit first and then work on replacing the full form with a clean one.

//! once you finish your project, replace your local host url with the deployed server url from Render
//! https://week-04-assignment-server.onrender.com

//================================

//TODO: render user data on the interface
// fetch the GET route from the server

const handleFeedbackData = async () => {
  const gotData = await fetch("./src/feedback");
  console.log(gotData);
  const printValues = await gotData.json();
  return printValues;
};

async function main() {
  const feedBackData = await handleFeedbackData();
  console.log("data: ", feedBackData);
}
main();
//render the data using DOM elements(one per piece of data - one dom element per column)
