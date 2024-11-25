// import { getData } from "./list.js"

const DOMSelectors = {
  container: document.getElementById("container"),
};
function createCards(data) {
  DOMSelectors.container.innerHTML = "";
  data.forEach((holiday) =>
    DOMSelectors.container.insertAdjacentHTML(
      "beforeend",
      `<div class="card">
              <h3>${holiday.name}</h3>
              <p><strong>Date:</strong> ${holiday.date}</p>
              <p><strong>Type:</strong> ${holiday.type}</p>
            </div>`
    )
  );
}

/* async function getDataAndCreateCards() {
  try {
    // Fetch the holiday data from the API using the imported function
    const data = await getData();
   
    // Call function to render the cards with the fetched data
    createCards(data);
 
 
  } catch (error) {
    // Handle errors (e.g., display a message)
    console.error(error);
    alert("sorry, couldn't find");
  }
 } */

async function getData() {
  //const response = await fetch("link of api");
  //console.log(response); // hey go out there and get this data from the outside, status 200 = got this data
  try {
    const response = await fetch(
      "https://date.nager.at/api/v3/publicholidays/2024/US"
    );
    if (response.status != 200) {
      throw new Error(response); // do a error response, goes to the catch error
    } else {
      const data = await response.json();
      console.log(data);
      createCards(data);
    }
  } catch (error) {
    console.log(error);
    alert("sorry couldnt find");
  }
  //const data = await response.json(); //it will not run this call until the previous is finished
  //console.log(data);

  // fetch returns a promise
}

getData();

//core no
