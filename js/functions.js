const init = () => {
  updateTable()
  manageButtonsEvent()

  // Crear las constantes del sistema
  if (localStorage.getItem('k_pricePerMinute') == null) {
    localStorage.setItem('k_pricePerMinute',12)
  }
}

const updateTable = () => {
  // Limpiar la tabla
  while (tableEnteredVehicles__body.hasChildNodes()) {
    tableEnteredVehicles__body.removeChild(tableEnteredVehicles__body.firstChild);
  }

  // Validar que la key de vehiculos exista 
  if (localStorage.getItem("k_vehiclesEntered") == null) return;

  // Obtener el array de vehiculos
  let ArrayVehiclesEntered = JSON.parse(
    localStorage.getItem("k_vehiclesEntered")
  )

  // Agregar los datos a la tabla
  for (const vehicle of ArrayVehiclesEntered) {
    tableEnteredVehicles__body.innerHTML += `
            <tr>
                <!-- <td>${vehicle.id}</td> -->
                <td>${vehicle.plateNumber}</td>
                <td>${vehicle.TypeVehicle}</td>
                <td>${vehicle.timeInput}</td>
                <td>${vehicle.observations}</td>
                <td><button class="buttons" id="${vehicle.id}">Gestionar</button></td>
            </tr>
        `;
  }
};

const showMainPage = () => {
  customWindow_push.classList.add('hide')
  customWindow_register.classList.add('hide')
  customWindow_settings.classList.add('hide')
  customWindow_out.classList.add('hide')
};

const showPush = () => {
  customWindow_push.classList.remove('hide')
  customWindow_register.classList.add('hide')
  customWindow_settings.classList.add('hide')
  customWindow_out.classList.add('hide')
};

const showOutput = () => {
  customWindow_push.classList.add('hide')
  customWindow_register.classList.add('hide')
  customWindow_settings.classList.add('hide')
  tableEnteredVehicles.classList.add('hide')
  customWindow_out.classList.remove('hide')
};

const showRegister = () => {
 customWindow_push.classList.add('hide')
  customWindow_register.classList.remove('hide')
  customWindow_settings.classList.add('hide')
  customWindow_out.classList.add('hide')
};

const showSettings = () => {
  customWindow_push.classList.add('hide')
  customWindow_register.classList.add('hide')
  customWindow_settings.classList.remove('hide')
  customWindow_out.classList.add('hide')
}

const manageButtonsEvent = () => {
  const buttons = Array.from(document.querySelectorAll(".buttons"));
  for (const button of buttons) {
    button.addEventListener("click", () => {
      
      showOutput();      
      idOfOut = button.id;

      /**
       * Cargar datos de salida
      */

      let ArrayVehiclesEntered = JSON.parse(localStorage.getItem("k_vehiclesEntered"));

      const indexArray = ArrayVehiclesEntered.findIndex(
        (element, indexArray) => {
          if (element.id == idOfOut) {
            return true;
          }
        }
      );

      formOut_id.value = ArrayVehiclesEntered[indexArray].id;
      formOut_plateNumber.value = ArrayVehiclesEntered[indexArray].plateNumber;
      formOut_hourInput.value = ArrayVehiclesEntered[indexArray].timeInput;
      formOut_observations.value =ArrayVehiclesEntered[indexArray].observations;

      if (ArrayVehiclesEntered[indexArray].TypeVehicle == "car") {
        formOut_selectTypeVehicule.selectedIndex = 2;
      } else if (ArrayVehiclesEntered[indexArray].TypeVehicle == "motorcycle") {
        formOut_selectTypeVehicule.selectedIndex = 1;
      }

      /*
        Cargar la hora de salida
      */

      let date = new Date();
      let hours = date.getHours();
      let minutes = date.getMinutes();

      if (minutes < 10) minutes = "0" + minutes;

      hourOuput = hours + ":" + minutes;
      formOut_hourOutput.value = hourOuput;
    });
  }
};
