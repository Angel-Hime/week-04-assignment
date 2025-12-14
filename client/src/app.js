console.log("test");

//TODO: let's have some sounds!
// looping classical music?
// clicker sounds?

//TODO: collect user data and send to the server
//submit event to collect user data

const feedbackForm = document.getElementById("feedbackForm");

console.log(feedbackForm); // this is just to check the form in console

const postsContainer = document.getElementById("postsContainer");

function handleFeedbackFormSubmit(event) {
  const submitSound = document.createElement("audio");
  submitSound.src = "/audio/click-02.mp3";
  submitSound.volume = 0.5;
  submitSound.play();
  event.preventDefault();
  const formDataTemplate = new FormData(feedbackForm);
  const formValues = Object.fromEntries(formDataTemplate);
  console.log(
    `${formValues.firstName} ${formValues.secondName} ${formValues.commentData}`
  ); // this is to see our posted data

  // latestPost(formValues); // try to just make this work //

  // fetch the POST server route
  fetch("https://week-04-assignment-server.onrender.com/newcomment/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ formValues }),
  });

  postsContainer.innerHTML = null;
  renderPosts();

  clearForm();
}

feedbackForm.addEventListener("submit", handleFeedbackFormSubmit);


function clearForm() {
  //!Clears form
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
  const response = await fetch(
    "https://week-04-assignment-server.onrender.com/feedback/"
  );
  // console.log(response); //Response { type: "cors", url: "http://localhost:8080/DATABASE_URL/", redirected: false, status: 200, ok: true, statusText: "OK", headers: Headers(2), body: ReadableStream, bodyUsed: false }

  const data = await response.json();
  console.log(data); // this prints the js data as array of objects

  return data;
}

//TODO: render the data using DOM elements(one per piece of data - one dom element per column)

// split the data

// turn data into text elements

function createPosts(dataAsObject) {
  // TODO: create a header for User Comments
  postsContainer.style.backgroundColor = "pink";

  //

  //clear current
  // postsContainer.innerHTML = null;

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
    // give commentPara class to style
    commentPara.className = "commentClass";
    // add the text content from the API to comment paragraph element
    commentPara.textContent = `"${element.comment}"`;
    // append the comment to the div for FULL previous post
    userEntry.appendChild(commentPara);

    // assign class to each FULL post --> this is the same for all of them
    userEntry.className = "userEntry";

    //TODO: add the likes value to the page
    const postLikes = document.createElement("p");
    postLikes.className = "likesClass";
    postLikes.textContent = `💖 ${element.likes}`;
    userEntry.appendChild(postLikes);

    // append the text elements to the main posts container
    postsContainer.appendChild(userEntry);

    // TODO: add a nav with buttons for like and delete
    const userEntryDiv = document.createElement("div");
    userEntryDiv.className = "userEntryDiv";

    //add a like button
    const likeButton = document.createElement("button");
    likeButton.textContent = "💖";
    likeButton.className = "likeButton";
    // logic for posting to the likes column of a database table

    likeButton.addEventListener("click", handleLikeButton);

    console.log(element.likes);

    function handleLikeButton() {
      likeButton.innerHTML = null;
      likeButton.textContent = "💖"; //replace with heart
      likeButton.style.backgroundColor = "gray";

      const likesound = document.createElement("audio");
      likesound.src = "/audio/click-02.mp3";
      likesound.volume = 0.5;
      likesound.play();

      console.log(element.likes);

      const newLikes = element.likes + 1;
      console.log(newLikes);
      const firstname = element.firstname;
      console.log(firstname);
      // fetch the POST server route
      fetch("https://week-04-assignment-server.onrender.com/likes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newLikes, firstname }),
      });

      postLikes.textContent = `💖 ${newLikes}`;
    }

    //add a delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "❌";
    deleteButton.className = "deleteButton";
    // logic for delete the row from database table

    deleteButton.addEventListener("click", handleDeleteButton);

    function handleDeleteButton() {
      //!NEED TO RERENDER THE POSTS
      const deleteSounds = document.createElement("audio");
      deleteSounds.src = "/audio/click-02.mp3";
      deleteSounds.volume = 0.5;
      deleteSounds.play();

      const firstname = element.firstname;
      console.log(firstname);
      // fetch the POST server route
      fetch("https://week-04-assignment-server.onrender.com/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstname }),
      });
       namePara.textContent = "DELETED";
      commentPara.textContent = "DELETED";
      deleteButton.innerHTML = null;
      deleteButton.textContent = "❌";
      deleteButton.style.backgroundColor = "gray";
      likeButton.innerHTML = null;
      likeButton.textContent = "💖"; //replace with heart
      likeButton.style.backgroundColor = "gray";
    }

    userEntryDiv.appendChild(likeButton);
    userEntryDiv.appendChild(deleteButton);

    //apend to the userEntry nav
    userEntry.appendChild(userEntryDiv);
  });
}

async function renderPosts() {
  const postsData = await getDatabaseData(); // this will action the above to provide an array of data from our database
  createPosts(postsData);
}
//renders the previous users' posts
renderPosts();
