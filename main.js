async function fetchPlanet() {
  try {
    const res = await fetch(`https://findfalcone.herokuapp.com/planets`);
    return await res.json();
  } catch (error) {
    return error;
  }
}
async function fetchVehicle() {
  try {
    const res = await fetch(`https://findfalcone.herokuapp.com/vehicles`);
    return await res.json();
  } catch (error) {
    return error;
  }
}

function injectToDOM(list, destination, status) {
  if (destination < 5) {
    const destin = document.querySelector(`#destination${destination}`);
    while (destin.firstChild) {
      destin.removeChild(destin.lastChild);
    }
    const select = document.createElement("select");
    select.classList = "form-select my-2";
    select.id = `select${destination}`;
    select.setAttribute("onchange", "selectHandler(this)");
    status !== null ? select.setAttribute("disabled", ``) : ``;
    let result = `<option value="">Select</option>`;
    list.forEach((ele) => {
      let value = `${ele.name}-${ele.distance}`;
      let selected = status === value ? `selected` : ``;
      result += `<option value=${value} ${selected}>${ele.name}</option>`;
    });
    select.innerHTML = result;
    destin.appendChild(select);
  }
}

function showVechicleList(list, destination, checkedValue, status) {
  const vehicleList = document.querySelector(`#vechileList${destination}`);
  let result = "";

  list.forEach((ele) => {
    let value = `"${ele.name}-${ele.speed}"`;
    let checked = `"${status}"` !== null ? `checked` : ``;

    result += `
            <div class="form-check">
              <input class="form-check-input" type="radio" value=${value} onchange="checkHandler(this)"${disableFunction(
      ele,
      checkedValue
    )} ${checkFunction(ele, status)}>
              <label class="form-check-label">
                ${ele.name} (${ele.total_no})
              </label>
            </div> 
            `;
  });
  vehicleList.innerHTML = result;
}

function disableFunction(element, child) {
  if (child !== null) {
    for (let name of child) {
      // console.log(name.split("-")[0], element.name);
      if (name.split("-")[0] === element.name) {
        return `disabled`;
      }
    }
  }
  return ``;
}
function checkFunction(element, status) {
  if (status !== null) {
    if (element.name === status.split("-")[0]) {
      return `checked`;
    }
  }
  return ``;
}

export { fetchPlanet, fetchVehicle, injectToDOM, showVechicleList };
