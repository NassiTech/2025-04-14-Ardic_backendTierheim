const buttonShowAnimals = document.getElementById("button_show_animals");
const ShowAnimals = document.getElementById("show_animals");
const buttonAddNewAnimal = document.getElementById("button_add_new_animal");

buttonShowAnimals.addEventListener("click", async () => {
  const res = await fetch("http://localhost:3000/tiere");

  displayData(await res.json());

  function displayData(data) {
    console.log(data);
    ShowAnimals.innerHTML = "";
    data.forEach((tier) => {
      console.log(tier);
      const li = document.createElement("li");
      li.textContent = tier.name;
      ShowAnimals.appendChild(li);
    });
  }
});

// here comes the POST route
buttonAddNewAnimal.addEventListener("click", async () => {
  const tierart = document.getElementById("tierart").value;
  const name = document.getElementById("name").value;
  const krankheit = document.getElementById("krankheit").value;
  const age = parseInt(document.getElementById("age").value, 10);
  const gewicht = parseFloat(document.getElementById("gewicht").value);

  const newTier = {
    tierart: tierart,
    name: name,
    krankheit: krankheit,
    age: age,
    gewicht: gewicht,
  };

  try {
    const response = await fetch("http://localhost:3000/tiere", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTier),
    });

    const result = await response.text();
    console.log("Serverantwort:", result);
  } catch (err) {
    console.error("Fetch failed:", err);
  }
});
