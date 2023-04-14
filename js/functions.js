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

const updateTable = () => {
  // Limpiar la tabla
  while (tableEnteredVehicles__body.hasChildNodes()) {
    tableEnteredVehicles__body.removeChild(tableEnteredVehicles__body.firstChild);
  }

  // Validar que la key de vehiculos exista 
  if (localStorage.getItem("k_vehiclesEntered") == null) return;

  // Obtener el array de vehiculos
  let ArrayVehiclesEntered = JSON.parse(localStorage.getItem("k_vehiclesEntered"))

  // Agregar los datos a la tabla
  for (const vehicle of ArrayVehiclesEntered) {
     // Crear el string de la hora de entrada
    let hourInput = new Date(vehicle.timeInput)
    let strHourInput = hourInput.getHours() + ':' + hourInput.getMinutes()

    // Cargar datos en la tabla
    tableEnteredVehicles__body.innerHTML += `
            <tr>
                <!-- <td>${vehicle.id}</td> -->
                <td>${vehicle.plateNumber}</td>
                <td>${vehicle.TypeVehicle}</td>
                <td>${strHourInput}</td>
                <td>${vehicle.observations}</td>
                <td><button class="buttons" id="${vehicle.id}">Gestionar</button></td>
            </tr>
        `;
  }
};

// Evento de los botones de la tabla principal
const manageButtonsEvent = () => {
  const buttons = Array.from(document.querySelectorAll(".buttons"));
  for (const button of buttons) {
    button.addEventListener("click", () => {
      showOutput();      
      idOfOut = button.id;

      // Obtener el array de vehiculos
      let ArrayVehiclesEntered = JSON.parse(localStorage.getItem("k_vehiclesEntered"));

      // Determinar el indice del array para obtener los datos
      const indexArray = ArrayVehiclesEntered.findIndex((element, indexArray) => {
          if (element.id == idOfOut) {
            return true
          }
        }
      )

      /**
       * Cargar datos en el formulario
      */

      // ID
      formOut_id.value = ArrayVehiclesEntered[indexArray].id;

      // Plate number
      formOut_plateNumber.value = ArrayVehiclesEntered[indexArray].plateNumber

      // Observations
      formOut_observations.value =ArrayVehiclesEntered[indexArray].observations
      
      // Input hour
      let dateInput = new Date(ArrayVehiclesEntered[indexArray].timeInput)
      formOut_hourInput.value =  dateInput.getHours() + ":" + dateInput.getMinutes()

      // Type of vehicle
      if (ArrayVehiclesEntered[indexArray].TypeVehicle == "car") {
        formOut_selectTypeVehicule.selectedIndex = 2
      } else if (ArrayVehiclesEntered[indexArray].TypeVehicle == "motorcycle") {
        formOut_selectTypeVehicule.selectedIndex = 1
      }

      // Output time
      let dateOutput = new Date()
      let hours = dateOutput.getHours();
      let minutes = dateOutput.getMinutes();

      if (minutes < 10) minutes = "0" + minutes;

      formOut_hourOutput.value = hours + ":" + minutes      
    });
  }
};
