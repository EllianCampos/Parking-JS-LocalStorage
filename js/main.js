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

/*
    Variables globales
*/
let hourInput
let hourOuput
let idOfOut


/*
    Inicializar cosas
*/
init()

/*
    Eventos de los botones
*/

btnPushVehicle.addEventListener('click', () => {
    showPush()   
    formPush.reset()

    /**
     * Generar el Id
     */
    //#region Primera version del codigo para generar el id
    // *********** CODIGO VIEJO LO DEJO POR EL RECUERDO Y EL TIEMPO QUE LE
    // *********** METI PERO NO DISTINGUE SI EL ID YA EXISTE EN EL HISTORIAL
    // Validar que exista la key: si no el id sera 1
    // if (localStorage.getItem('k_register') == null &&
    //     localStorage.getItem('k_vehiclesEntered') == null) 
    // {
    //     formIn_id.value = 1
    // } else {
    //     let ArrayVehiclesEntered = JSON.parse(localStorage.getItem('k_vehiclesEntered'))
    //     let idEncontrado = false, id, arraID = []

    //     for (const vehicle of ArrayVehiclesEntered) 
    //     arraID.push(parseInt(vehicle.id))

    //     for (let i = 1; !idEncontrado; i++) {
    //         if (arraID.includes(i) == false ) {
    //             idEncontrado = true
    //             formIn_id.value = i
    //         }      
    //     }
    // }
    //#endregion

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

    if (minutes < 10)  minutes = '0' + minutes 

    hourInput = hours + ':' + minutes
    formIn_hourInput.value =  hourInput    
})

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
        console.log('>>> 13')
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

btnSettings.addEventListener('click', () => {
    showSettings()
    formSettings_PricePerMinute.value = localStorage.getItem('k_pricePerMinute')
})

/*
    Eventos de los formularios
*/

formPush.addEventListener('submit', (e) => {
    e.preventDefault();
    showPush()

    let newVehicle = {
        id: formIn_id.value,
        plateNumber: formIn_plateNumber.value,
        TypeVehicle: formIn_selectTypeVehicule.selectedOptions[0].value,
        timeInput: hourInput,
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

    let pricePerMinut = parseInt(localStorage.getItem('k_pricePerMinute'))

    let horaEntrada = formOut_hourInput.value.substring(0,2)
    let minutosEntrada = formOut_hourInput.value.substring(3,5)
    let horaSalida = formOut_hourOutput.value.substring(0,2)
    let minutosSalida = formOut_hourOutput.value.substring(3,5)

    //Calcular lo minutos transcurridos desde las 00:00 hasta la hora de entrada
    let tEntrada = (horaEntrada * 60) + parseInt(minutosEntrada)

    //Calcular lo minutos transcurridos desde las 00:00 hasta la hora de salida
    let tSalida = (horaSalida * 60) + parseInt(minutosSalida)

    let minutsStayed = tSalida - tEntrada

    let montToPay = minutsStayed * pricePerMinut

    let newRegister = {
        id: formOut_id.value,
        plateNumber: formOut_plateNumber.value,
        TypeVehicle: formOut_selectTypeVehicule.selectedOptions[0].value,
        timeInput: formOut_hourInput.value,
        observations: formOut_observations.value,
        timeOutput: formOut_hourOutput.value,
        minutsStayed: minutsStayed,
        montToPay: montToPay
    }

    if (localStorage.getItem('k_register') == null) {
        let arrayRegister = [newRegister]

        localStorage.setItem('k_register', JSON.stringify(arrayRegister))
    } else {
        let arrayRegister = JSON.parse(localStorage.getItem('k_register'))

        arrayRegister.push(newRegister)

        localStorage.setItem('k_register', JSON.stringify(arrayRegister))
    }

    // Eliminar el vehiculo
    let ArrayVehiclesEntered = JSON.parse(localStorage.getItem('k_vehiclesEntered'))
        
    const indexArray = ArrayVehiclesEntered.findIndex((element, indexArray) => {
        if (element.id == newRegister.id) {
            return true
        }
    })

    ArrayVehiclesEntered.splice(indexArray,1)

    localStorage.setItem('k_vehiclesEntered', JSON.stringify(ArrayVehiclesEntered))    

    showMainPage()

    updateTable()
    manageButtonsEvent()

    alert('El total a pagar es: ' + montToPay)
})

formSettings.addEventListener('submit', (e) => {
    e.preventDefault()
    localStorage.setItem('k_pricePerMinute', formSettings_PricePerMinute.value)
    alert('El valor del minuto se ha actualizado correctamente')
})