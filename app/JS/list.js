export async function getData() {
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

      }
    } catch (error) {
      console.log(error);
      alert("sorry couldnt find");
    }
    //const data = await response.json(); //it will not run this call until the previous is finished
    //console.log(data);
  
    // fetch returns a promise
  }
