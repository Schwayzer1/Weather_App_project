const input = document.getElementById("input");
const btn = document.getElementById("btn");
const card = document.getElementById("card");
const arr = [];

const cityWeather = (city) => {
  const apiKey = "309b3466b990f73f34bb48a371516131";
  const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`;

  axios
    .get(url, { validateStatus: false })
    .then((res) => {
      if (res.status == "200") {
        return res.data;
      } else if (res.status == "404") {
        alert("this city not found");
      } else {
        throw new Error("something went wrong");
      }
    })
    .then((data) => {
      console.log(data);
      if (!arr.includes(data.id)) {
        arr.push(data.id);
        createCard(data);
      } else {
        alert(`You already added ${data.name}`);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

btn.addEventListener("click", () => {
  if (input.value) {
    cityWeather(input.value);
  }
  input.value = "";
});

input.addEventListener("keydown", (e) => {
  if (e.code == "Enter") {
    btn.click();
  }
});

const createCard = (data) => {
  const iconUrl = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${data.weather[0].icon}.svg`;
  const city = data.name;
  const country = data.sys.country;
  const temp = Math.round(Number(data.main.temp));
  const weather = data.weather[0].main;
  const id = data.id;
  card.innerHTML += `
        <div id="${id}"class="card rounded-4 pb-3 pt-3">
          <div class="card-body text-center">
            <div class="city mb-2 fs-5 fw-bold text-start justify-content-between">
              ${city}<sup class="bg-warning p-1 rounded-pill">${country}</sup>
            </div>
            <div class="temp mb-2">${temp}&deg;C</div>
            <div class="sembol mb-2">
              <img src="${iconUrl}" alt="" />
            </div>
            <div class="weather mt-3">${weather}</div>
          </div>
          <button type="button" class="btn-close fs-5" aria-label="Close"></button>
        </div>
      `;
};

card.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-close")) {
    const id = e.target.parentNode.id;
    card.removeChild(e.target.parentNode);
    arr.splice(arr.indexOf(id), 1);
  }
});
