const DOMSelectors = {
  container: document.getElementById("container"),
  searchInput: document.getElementById("search-input"),
  searchButton: document.getElementById("search-button"),
};

async function getData(year = 2024, country = "US", searchName = "") {
  try {
    // Fetch data from the API
    const response = await fetch(`https://date.nager.at/api/v3/publicholidays/${year}/${country}`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    // Parse the response JSON
    let data = await response.json();

    // Filter data by holiday name if searchName is provided
    if (searchName) {
      const lowerSearchName = searchName.toLowerCase(); // Normalize input for case-insensitive matching
      data = data.filter((holiday) => holiday.name.toLowerCase().includes(lowerSearchName));
    }

    // Display results or a "not found" message
    if (data.length === 0) {
      DOMSelectors.container.innerHTML = "<p>No holidays found with that name.</p>";
    } else {
      createCards(data);
    }
  } catch (error) {
    console.error("Fetch error:", error);
    alert("Could not fetch the data. Please try again later.");
  }
}

function createCards(data) {
  // Clear previous results
  DOMSelectors.container.innerHTML = "";

  // Create a card for each holiday
  data.forEach((holiday) => {
    const cardHTML = `
      <div class="card bg-[#db4d70] border-4 border-[#392537] rounded-xl shadow-md flex flex-col items-center justify-evenly p-4 transition-transform duration-200 ease-in-out hover:scale-105">
        <h3 class="text-green-900 text-lg my-2">${holiday.name}</h3>
        <p class="text-green-900 text-base my-1"><strong>Date:</strong> ${holiday.date}</p>
        <p class="text-green-900 text-base my-1"><strong>Type:</strong> ${holiday.localName}</p>
        <p class="text-green-900 text-base my-1"><strong>Type:</strong> ${holiday.countryCode}</p>
        <p class="text-green-900 text-base my-1"><strong>Type:</strong> ${holiday.fixed}</p>
        <p class="text-green-900 text-base my-1"><strong>Type:</strong> ${holiday.global}</p>
        <p class="text-green-900 text-base my-1"><strong>Type:</strong> ${holiday.counties}</p>
        <p class="text-green-900 text-base my-1"><strong>Type:</strong> ${holiday.launchYear}</p>
        <p class="text-green-900 text-base my-1"><strong>Type:</strong> ${holiday.type}</p>

      </div>`;
    DOMSelectors.container.insertAdjacentHTML("beforeend", cardHTML);
  });
}

DOMSelectors.searchButton.addEventListener("click", (event) => {
  event.preventDefault();

  // Get and validate the search input
  const searchName = DOMSelectors.searchInput.value.trim();
  if (searchName === "") {
    alert("Please enter a holiday name to search for.");
    return;
  }

  // Fetch and filter data based on the entered name
  getData(2024, "US", searchName);
});

// Fetch all holidays on page load
getData();
