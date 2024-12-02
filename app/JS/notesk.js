const DOMSelectors = {
    container: document.getElementById("container"),
    searchInput: document.getElementById("search-input"),
    searchButton: document.getElementById("search-button"),
  };
  
  async function getData(year = 2024, country = "US", searchDate = "") {
    try {

      const response = await fetch(https://date.nager.at/api/v3/publicholidays/${year}/${country});
      
      if (!response.ok) {
        throw new Error(Error: ${response.status} - ${response.statusText});
      }
      

      let data = await response.json();
      console.log(data); 

      if (searchDate) {
        data = data.filter(holiday => holiday.date === searchDate);
      }
  
      if (data.length === 0) {
        DOMSelectors.container.innerHTML = "<p> No holidays found.</p>";
      } else {
 
        createCards(data);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      alert("Sorry couldn't fetch the data, try again later.");
    }
  }
  
  function createCards(data) {

    DOMSelectors.container.innerHTML = "";
  

    data.forEach(holiday => {
      DOMSelectors.container.insertAdjacentHTML(
        "beforeend",
        <div class="card bg-[#db4d70] border-4 border-[#392537] rounded-xl shadow-md flex flex-col items-center justify-evenly p-4 transition-transform duration-200 ease-in-out hover:scale-105">
        <h3 class="text-green-900 text-lg my-2">${holiday.name}</h3>
        <p class="text-green-900 text-base my-1"><strong>Date:</strong> ${holiday.date}</p>
        <p class="text-green-900 text-base my-1"><strong>Type:</strong> ${holiday.type}</p>
    </div>
      );
    });
  }
  
  DOMSelectors.searchButton.addEventListener("click", (event) => {

    event.preventDefault();
    const searchDate = DOMSelectors.searchInput.value;
  

    if (searchDate.trim() === "") {
      alert("ENTER SOMETHING!!!");
      return;
    }
  

    getData(2024, "US", searchDate);  
  });
  

  getData();
  
