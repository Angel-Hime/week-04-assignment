console.log("test");

//TODO: let's have some sounds!
// looping classical music?
// clicker sounds?

//TODO: collect user data and send to the server
//submit event to collect user data

const feedbackForm = document.getElementById("feedbackForm");

console.log(feedbackForm); // this is just to check the form in console

function handleFeedbackFormSubmit(event) {
  event.preventDefault();
  const formDataTemplate = new FormData(feedbackForm);
  const formValues = Object.fromEntries(formDataTemplate);
  console.log(formValues); // this is to see our posted data

  // fetch the POST server route
  fetch("http://localhost:8080/newcomment/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ formValues }),
  });

  renderPosts();
  latestPost(); // try to just make this work
  clearForm();
}

feedbackForm.addEventListener("submit", handleFeedbackFormSubmit);

const submitButton = document.getElementById("submitFeedback");
submitButton.addEventListener("click", () => {
  const submitSound = document.createElement("audio");
  submitSound.src = "./public/audio/click-02.mp3";
  submitSound.volume = 0.5;
  submitSound.play();
});

function latestPost() {
  const userEntry = document.createElement("div");
  //create subsection for just the name details
  const userName = document.createElement("div");
  userName.className = "userNameClass";
  // create our paragraph elements to display name details
  const namePara = document.createElement("p");
  // const secondNamePara = document.createElement("p");
  // add the text content from API to name details paragraph elements
  // secondNamePara.textContent = element.secondname;

  namePara.textContent = `${formValues.firstName} ${formValues.secondName}`;
  // append the name details paragraph elements to the subsection for name details
  userName.appendChild(namePara);
  // userName.appendChild(secondNamePara);
  // append the name details to the div for FULL previous post
  userEntry.appendChild(userName);

  // create the comment paragraph element
  const commentPara = document.createElement("p");
  // add the text content from the API to comment paragraph element
  commentPara.textContent = `"${formValues.commentData}"`;
  // append the comment to the div for FULL previous post
  userEntry.appendChild(commentPara);

  // assign class to each FULL post --> this is the same for all of them
  userEntry.className = "userEntry";

  // append the text elements to the main posts container
  postsContainer.appendChild(userEntry);
  // this should call the function to clear the form after posting
}
//replacing the full form with a clean one.

// To remove data from your inputs, an idea could be: in your week 2 assignment, how did you remove the large image before adding the new image clicked? That could be a way to remove the data from the form inputs
function clearForm() {
  //get container
  const firstName = document.getElementById("firstName");
  firstName.innerHTML = null;
  //create new label;
  const firstNameLabel = document.createElement("label");
  // assign properties
  firstNameLabel.htmlFor = "firstName";
  firstNameLabel.textContent = "First Name: ";
  const firstNameInput = document.createElement("input");
  //asign properties
  firstNameInput.name = "firstName";
  firstNameInput.type = "text";
  firstNameInput.placeholder = "required";
  firstNameInput.required = true;
  //append both to container
  firstName.appendChild(firstNameLabel);
  firstName.appendChild(firstNameInput);

  //get container
  const secondName = document.getElementById("secondName");
  secondName.innerHTML = null;
  //create new label;
  const secondNameLabel = document.createElement("label");
  // assign properties
  secondNameLabel.htmlFor = "secondName";
  secondNameLabel.textContent = "Second Name: ";
  const secondNameInput = document.createElement("input");
  //asign properties
  secondNameInput.name = "secondName";
  secondNameInput.type = "text";
  secondNameInput.required = true;
  secondNameInput.placeholder = "required";
  //append both to container
  secondName.appendChild(secondNameLabel);
  secondName.appendChild(secondNameInput);

  //get container
  const commentData = document.getElementById("commentData");
  commentData.innerHTML = null;
  //create new label;
  const commentDataLabel = document.createElement("label");
  // assign properties
  commentDataLabel.htmlFor = "commentData";
  commentDataLabel.textContent = "Comment: ";
  const commentDataInput = document.createElement("input");
  //asign properties
  commentDataInput.name = "commentData";
  commentDataInput.type = "text";
  commentDataInput.placeholder =
    "Please tell me what you think about my week 4 assignment submission!";
  commentDataInput.required = true;
  //append both to container
  commentData.appendChild(commentDataLabel);
  commentData.appendChild(commentDataInput);
}
//gives us a fresh clean form on reload
clearForm();

//! once you finish your project, replace your local host url with the deployed server url from Render
//! https://week-04-assignment-server.onrender.com

//================================

//TODO: render user data on the interface
// fetch the GET route from the server
// is http://localhost:8080/DATABASE_URL an API? --> lets treat it like we did on the clicker thingy

async function getDatabaseData() {
  const response = await fetch("http://localhost:8080/feedback/");
  // console.log(response); //Response { type: "cors", url: "http://localhost:8080/DATABASE_URL/", redirected: false, status: 200, ok: true, statusText: "OK", headers: Headers(2), body: ReadableStream, bodyUsed: false }

  const data = await response.json();
  console.log(data); // this prints the js data as array of objects

  return data;
}

//TODO: render the data using DOM elements(one per piece of data - one dom element per column)

// split the data

// turn data into text elements

function createPosts(dataAsObject) {
  const postsContainer = document.getElementById("postsContainer");
  postsContainer.style.backgroundColor = "pink";
  //

  //clear current
  postsContainer.innerHTML = null;
  //run through each object of the data array
  dataAsObject.forEach((element) => {
    //create userentry div to display the FULL previous post:
    const userEntry = document.createElement("div");

    //create subsection for just the name details
    const userName = document.createElement("div");
    userName.className = "userNameClass";
    // create our paragraph elements to display name details
    const namePara = document.createElement("p");
    // const secondNamePara = document.createElement("p");
    // add the text content from API to name details paragraph elements
    // secondNamePara.textContent = element.secondname;

    namePara.textContent = `${element.firstname} ${element.secondname}`;
    // append the name details paragraph elements to the subsection for name details
    userName.appendChild(namePara);
    // userName.appendChild(secondNamePara);
    // append the name details to the div for FULL previous post
    userEntry.appendChild(userName);

    // create the comment paragraph element
    const commentPara = document.createElement("p");
    // add the text content from the API to comment paragraph element
    commentPara.textContent = `"${element.comment}"`;
    // append the comment to the div for FULL previous post
    userEntry.appendChild(commentPara);

    // assign class to each FULL post --> this is the same for all of them
    userEntry.className = "userEntry";

    // append the text elements to the main posts container
    postsContainer.appendChild(userEntry);

    // TODO: add a nav with buttons for like and delete
    const userEntryNav = document.createElement("nav");
    userEntryNav.className = "userEntryNav";

    //add a like button
    const likeButton = document.createElement("button");
    likeButton.textContent = "Like";
    likeButton.className = "likeButton";
    // logic for posting to the likes column of a database table

    likeButton.addEventListener("click", () => {
      const likesound = document.createElement("audio");
      likesound.src = "./public/audio/click-02.mp3";
      likesound.volume = 0.5;
      likesound.play();
    });
    // const like =
    // }
    // function handleFeedbackFormSubmit(event) {
    //   event.preventDefault();
    //   const formDataTemplate = new FormData(feedbackForm);
    //   const formValues = Object.fromEntries(formDataTemplate);
    //   console.log(formValues); // this is to see our posted data

    //   // fetch the POST server route
    //   fetch("http://localhost:8080/newcomment", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ formValues }),
    //   });
    userEntryNav.appendChild(likeButton);
    //apend to the userEntry nav
    userEntry.appendChild(userEntryNav);
    // const deleteButton = document.createElement("button");
    // // logic for deleting a row of a database table

    // //apend to the userEntry nav

    // //apend userEntry nav to userEntry div
  });
}

async function renderPosts() {
  const postsData = await getDatabaseData(); // this will action the above to provide an array of data from our database
  createPosts(postsData);
}
//renders the previous users' posts
// renderPosts();
