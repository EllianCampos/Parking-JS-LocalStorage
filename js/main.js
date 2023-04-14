// IDs table entered vehicles
const tableEnteredVehicles = document.getElementById('tableEnteredVehicles')
const tableEnteredVehicles__head = document.getElementById('tableEnteredVehicles__head')
const tableEnteredVehicles__body = document.getElementById('tableEnteredVehicles__body')

// IDs form input
const customWindow_push = document.getElementById('customWindow_push')
const btnPushVehicle = document.getElementById('btnPushVehicle')
const formPush = document.getElementById('formPush')
const formIn_id = document.getElementById('formIn_id')
const formIn_plateNumber = document.getElementById('formIn_plateNumber')
const formIn_selectTypeVehicule = document.getElementById('formIn_selectTypeVehicule')
const formIn_hourInput = document.getElementById('formIn_hourInput')
const formIn_observations = document.getElementById('formIn_observations')

// IDs form output
const customWindow_out = document.getElementById('customWindow_out')
const formOut = document.getElementById('formOut')
const formOut_id = document.getElementById('formOut_id')
const formOut_plateNumber = document.getElementById('formOut_plateNumber')
const formOut_selectTypeVehicule = document.getElementById('formOut_selectTypeVehicule')
const formOut_hourInput = document.getElementById('formOut_hourInput')
const formOut_observations = document.getElementById('formOut_observations')
const formOut_hourOutput = document.getElementById('formOut_hourOutput')

// IDs form settings
const btnSettings = document.getElementById('btnSettings')
const customWindow_settings = document.getElementById('customWindow_settings')
const formSettings = document.getElementById('formSettings')
const formSettings_PricePerMinute = document.getElementById('formSettings_PricePerMinute')

// IDs table register 
const customWindow_register = document.getElementById('customWindow_register')
const btnRegister = document.getElementById('btnRegister')
const tableRegister = document.getElementById('tableRegister')
const tableRegister__head = document.getElementById('tableRegister__head')
const tableRegister__body = document.getElementById('tableRegister__body')

// IDs botones 
const btnSalir = Array.from(document.querySelectorAll('.btnSalir'))
const btnLogOut = document.getElementById('btnLogOut')

/*
    Variables globales
*/
// let hourInput
// let hourOuput
let idOfOut
let dateInput
let dateOutput

addEventListener("load", () => {
    updateTable()
    manageButtonsEvent()

    // Crear las constantes del sistema
    if (localStorage.getItem('k_pricePerMinute') == null) {
        localStorage.setItem('k_pricePerMinute',12)
    }
})

// Boton de salir
for (const btn of btnSalir) {
    btn.addEventListener('click', () => {
        showMainPage()
        updateTable()
        manageButtonsEvent()
    })
}

// Boton de cerrar sesión
btnLogOut.addEventListener('click', () => {
    if (window.confirm('¿Estas seguro que deseas cerrar sesión?')){
        location.href = 'index.html'
    }
})

btnPushVehicle.addEventListener('click', () => {
    showPush()   
    formPush.reset()

    /**
     * Generar el Id
     */
    if (localStorage.getItem('k_id') == null) {
        localStorage.setItem('k_id', 1)
        formIn_id.value = 1
    } else {
        let id = localStorage.getItem('k_id')
        formIn_id.value = id
    }

    /**
     * Cargar la hora
    */
 
    let date = new Date()
    let hours = date.getHours()
    let minutes = date.getMinutes()

    dateInput = date

    if (minutes < 10)  minutes = '0' + minutes 

    formIn_hourInput.value =  hours + ':' + minutes    
})

// Ver el historial
btnRegister.addEventListener('click', () => {
    showRegister()

    // Limpiar la tabla   
    while(tableRegister__body.hasChildNodes())
	tableRegister__body.removeChild(tableRegister__body.firstChild);
    
    // Validar que exista la key: significa que hay un registro con datos
    if (localStorage.getItem('k_register') == null) return
    
    // Obtener el array el registros
    let arrayRegister = JSON.parse(localStorage.getItem('k_register'))

    // Agregar los registros a la tabla
    for (const register of arrayRegister) {
        tableRegister__body.innerHTML += `
            <tr>
                <td>ID: ${register.id}</td>
                <td>Placa: ${register.plateNumber}</td>
                <td>Observaciones: ${register.observations}</td>
                <td>Minutos: ${register.minutsStayed}</td>
                <td>Monto: ${register.montToPay}</td>
            </tr>
        `
    }
})

// Ver la configuración
btnSettings.addEventListener('click', () => {
    showSettings()
    formSettings_PricePerMinute.value = localStorage.getItem('k_pricePerMinute')
})

/*
    Eventos de los formularios
*/

formSettings.addEventListener('submit', (e) => {
    e.preventDefault()
    localStorage.setItem('k_pricePerMinute', formSettings_PricePerMinute.value)
    alert('El valor del minuto se ha actualizado correctamente')
})

formPush.addEventListener('submit', (e) => {
    e.preventDefault();
    showPush()

    let newVehicle = {
        id: formIn_id.value,
        plateNumber: formIn_plateNumber.value,
        TypeVehicle: formIn_selectTypeVehicule.selectedOptions[0].value,
        timeInput: dateInput,
        observations: formIn_observations.value,
    }

    if (localStorage.getItem('k_vehiclesEntered') == null) {
        let ArrayVehiclesEntered = [newVehicle]
        localStorage.setItem('k_vehiclesEntered', JSON.stringify(ArrayVehiclesEntered))
    } else {
        let ArrayVehiclesEntered = JSON.parse(localStorage.getItem('k_vehiclesEntered'))
        ArrayVehiclesEntered.push(newVehicle)
        localStorage.setItem('k_vehiclesEntered', JSON.stringify(ArrayVehiclesEntered))        
    }

    // Incrementar el id 
    let id = localStorage.getItem('k_id')
    id++
    localStorage.setItem('k_id', id)
    
    updateTable()
    manageButtonsEvent()
    showMainPage()
})

formOut.addEventListener('submit', (e) => {
    e.preventDefault()
    
    // Obtener el array de vehiculos
    let ArrayVehiclesEntered = JSON.parse(localStorage.getItem("k_vehiclesEntered"))

    // Determinar el indice del array para obtener los datos
    const indexArray = ArrayVehiclesEntered.findIndex((element, indexArray) => {
        if (element.id == idOfOut) {
          return true
        }
      }
    )

    // Calcular el tiempo que permanacio dentro
    let pricePerMinut = parseInt(localStorage.getItem('k_pricePerMinute'))
    let hourInput = new Date(ArrayVehiclesEntered[indexArray].timeInput)
    let hourOutput = new Date()
    
    let seconds = (hourOutput-hourInput) / 1000 
    let minutsStayed = seconds / 60
    let montToPay = minutsStayed * pricePerMinut

    // Craear un objeto del registro
    let newRegister = {
        id: formOut_id.value,
        plateNumber: formOut_plateNumber.value,
        TypeVehicle: formOut_selectTypeVehicule.selectedOptions[0].value,
        timeInput: hourInput,
        observations: formOut_observations.value,
        timeOutput: hourOutput,
        minutsStayed: minutsStayed,
        montToPay: montToPay
    }

    // Guardar el vehículo en el registro
    if (localStorage.getItem('k_register') == null) {
        let arrayRegister = [newRegister]
        localStorage.setItem('k_register', JSON.stringify(arrayRegister))
    } else {
        let arrayRegister = JSON.parse(localStorage.getItem('k_register'))
        arrayRegister.push(newRegister)
        localStorage.setItem('k_register', JSON.stringify(arrayRegister))
    }

    // Eliminar el vehiculo
    ArrayVehiclesEntered.splice(indexArray,1)
    localStorage.setItem('k_vehiclesEntered', JSON.stringify(ArrayVehiclesEntered))    

    // Mensaje
    alert('El total a pagar es: ' + montToPay)

    // Pasos finales
    showMainPage()
    updateTable()
    manageButtonsEvent()

    // ESTA MUY MAL!!!!!!!!!!!!!!!!!!!!!
    location.href = 'main.html'
})