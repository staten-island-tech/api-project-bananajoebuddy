const DOMSelectors = {
  container: document.getElementById("container"),
  searchInput: document.getElementById("search-input"),
  searchButton: document.getElementById("search-button"),
};

async function getData(year = 2024, country = "US", searchName = "") {
  try {

    const response = await fetch(`https://date.nager.at/api/v3/publicholidays/${year}/${country}`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    let data = await response.json();

    if (searchName) {
      const lowerSearchName = searchName.toLowerCase();
      data = data.filter((holiday) => holiday.name.toLowerCase().includes(lowerSearchName));
    }

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
  DOMSelectors.container.innerHTML = ""; 

  // 1 hour of sleep
  data.forEach((holiday) => {
    DOMSelectors.container.insertAdjacentHTML(
      "beforeend",
      `<div class="card bg-[#db4d70] border-4 border-[#392537] rounded-xl shadow-md flex flex-col items-center justify-evenly p-4 transition-transform duration-200 ease-in-out hover:scale-105
        sm:flex-row sm:space-x-4 sm:items-start sm:p-6 md:p-8 lg:p-10 lg:space-x-6">
        <h3 class="text-green-900 text-lg my-2">${holiday.name}</h3>
        <p class="text-green-900 text-base my-1"><strong>Date:</strong> ${holiday.date}</p>
        <p class="text-green-900 text-base my-1"><strong>Local Name:</strong> ${holiday.localName}</p>
        <p class="text-green-900 text-base my-1"><strong>Country Code:</strong> ${holiday.countryCode}</p>
        <p class="text-green-900 text-base my-1"><strong>Fixed:</strong> ${holiday.fixed}</p>
        <p class="text-green-900 text-base my-1"><strong>Global:</strong> ${holiday.global}</p>
        <p class="text-green-900 text-base my-1"><strong>Counties:</strong> ${holiday.counties}</p>
        <p class="text-green-900 text-base my-1"><strong>Launch Year:</strong> ${holiday.launchYear}</p>
        <p class="text-green-900 text-base my-1"><strong>Type:</strong> ${holiday.types}</p>
      </div>`
    );
  });
}


DOMSelectors.searchButton.addEventListener("click", (event) => {
  event.preventDefault();

  const searchName = DOMSelectors.searchInput.value.trim();
  if (searchName === "") {
    alert("Please enter a holiday name to search for.");
    return;
  }

  getData(2024, "US", searchName);
});

getData();
