
//

const DOMSelectors = {
  container: document.getElementById("container"),
  searchForm: document.getElementById("searchForm"),
  searchInput: document.getElementById("query"),
};
function createCards(data) {
  DOMSelectors.container.innerHTML = "";
  if (data.length === 0) {
    DOMSelectors.container.innerHTML = "<p>No holidays found for the given query.</p>";
  } else {
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
}

async function fetchHolidays(year = 2024, country = "US") {
  try {
    const response = await fetch(`https://date.nager.at/api/v3/publicholidays/${year}/${country}`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    const data = await response.json();
    console.log(data); // Log the data for development
    createCards(data); // Call createCards with the fetched data
  } catch (error) {
    console.error("Fetch error:", error);
    alert("Sorry, couldn't fetch holiday data. Please try again later.");
  }
}

function handleSearch(e) {
  e.preventDefault(); // Prevent page reload
  const query = DOMSelectors.searchInput.value.trim();
  if (!query) {
    alert("Please enter a valid search term.");
    return;
  }
  // Fetch holidays data based on the input (e.g., year or country)
  fetchHolidays(query);
}

// Initialize the page with default data (2024 holidays in US)
fetchHolidays();

// Event listener for the search form
//DOMSelectors.searchForm.addEventListener("submit", handleSearch);
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

/* REAL async function getData() {
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

//core no */
