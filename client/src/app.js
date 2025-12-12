console.log("test");

//TODO: let's have some sounds!
// looping classical music?
// clicker sounds?

//TODO: collect user data and send to the server
//submit event to collect user data

const feedbackForm = document.getElementById("feedbackForm");

console.log(feedbackForm);

function handleFeedbackFormSubmit(event) {
  event.preventDefault();
  const formDataTemplate = new FormData(feedbackForm);
  const formValues = Object.fromEntries(formDataTemplate);
  console.log(formValues); // this is to see our posted data

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
// is http://localhost:8080/DATABASE_URL an API? --> lets treat it like we did on the clicker thingy

async function getDatabaseData() {
  const response = await fetch("http://localhost:8080/DATABASE_URL/");
  console.log(response); //Response { type: "cors", url: "http://localhost:8080/DATABASE_URL/", redirected: false, status: 200, ok: true, statusText: "OK", headers: Headers(2), body: ReadableStream, bodyUsed: false }

  const data = await response.json();
  console.log(data); // this prints the js data as array of objects

  return data;
}

//TODO: render the data using DOM elements(one per piece of data - one dom element per column)

// split the data

// turn data into text elements

const postsContainer = document.getElementById("postsContainer");

// rememeber that this is from monday of this week

function createPosts(dataAsObject) {
  //run through each object of the data array
  dataAsObject.forEach((element) => {
    //create userentry div to display the FULL previous post:
    const userEntry = document.createElement("div");

    //create subsection for just the name details
    const userName = document.createElement("div");
    // create our paragraph elements to display name details
    const namePara = document.createElement("p");
    const secondNamePara = document.createElement("p");
    // add the text content from API to name details paragraph elements
    secondNamePara.textContent = element.secondname;
    namePara.textContent = element.firstname;
    // append the name details paragraph elements to the subsection for name details
    userName.appendChild(namePara);
    userName.appendChild(secondNamePara);
    // append the name details to the div for FULL previous post
    userEntry.appendChild(userName);

    // create the comment paragraph element
    const commentPara = document.createElement("p");
    // add the text content from the API to comment paragraph element
    commentPara.textContent = element.comment;
    // append the comment to the div for FULL previous post
    userEntry.appendChild(commentPara);

    // assign class to each FULL post --> this is the same for all of them
    userEntry.className = "userEntry";

    // append the text elements to the main posts container
    postsContainer.appendChild(userEntry);
  });
}

async function renderPosts() {
  const postsData = await getDatabaseData(); // this will action the above to pront an array of data from our database
  createPosts(postsData);
}

renderPosts();
