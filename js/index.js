/**
 * Mostrar mas información en el titulo
 */
const container_head_showMore = document.getElementById('container_head_showMore')
const container_head_hide = document.getElementById('container_head_hide')

/**
 * Bienvenida
 */
const customWindow_account = document.getElementById('customWindow_account')
const customWindow_password = document.getElementById('customWindow_password')
const customWindow_recoveryMethod = document.getElementById('customWindow_recoveryMethod')

const form_account = document.getElementById('form_account')
const form_password = document.getElementById('form_password')
const form_recoveryMethod = document.getElementById('form_recoveryMethod')

const form_account_name = document.getElementById('form_account_name')
const form_password_password = document.getElementById('form_password_password')
const form_recoveryMethod_component = document.getElementById('form_recoveryMethod_component')

/**
 * Recuperar contraseña
 */
const customWindow_recoverPassword = document.getElementById('customWindow_recoverPassword')
const form_recoverPassword = document.getElementById('form_recoverPassword')
const form_recoverPassword_user = document.getElementById('form_recoverPassword_user')

/**
 * Seleccionar cuenta
 */

const customWindow_searchAccount = document.getElementById('customWindow_searchAccount')
const customWindow_searchAccount_table = document.getElementById('customWindow_searchAccount_table')
const customWindow_searchAccount_tableHead = document.getElementById('customWindow_searchAccount_tableHead')
const customWindow_searchAccount_tableBody = document.getElementById('customWindow_searchAccount_tableBody')

/**
 * Ventana principal (login)
 */
const form_login = document.getElementById('form_login')
const form_login_account = document.getElementById('form_login_account')
const form_login_password = document.getElementById('form_login_password')
const form_login_seePassword = document.getElementById('form_login_seePassword' )
const form_login_button_recoverPassword = document.getElementById('form_login_button_recoverPassword')
const form_login_button_register = document.getElementById('form_login_button_register')
const form_login_showUsers = Array.from(document.querySelectorAll('.form_login_showUsers'))

/**
 * Molde para los options de las preguntas y respuestas de seguridad
 */
const secure_question = Array.from(document.querySelectorAll('.recoveryMethod__question'))

const container_answer_days = Array.from(document.querySelectorAll('.recoveryMethod__answer--days'))
const container_answer_temp = Array.from(document.querySelectorAll('.recoveryMethod__answer--temp'))
const container_answer_season = Array.from(document.querySelectorAll('.recoveryMethod__answer--season'))

const answer_days = Array.from(document.querySelectorAll('.recoveryMethod__answer--days select'))
const answer_temp = Array.from(document.querySelectorAll('.recoveryMethod__answer--temp select'))
const answer_season = Array.from(document.querySelectorAll('.recoveryMethod__answer--season select'))

/**
 * Funcion inicial
 */
addEventListener("load", () => {
    // Crear cuenta, si es la primera vez
    if (localStorage.getItem('k_users') == null) {
        customWindow_account.classList.remove('hide')
    }

    form_login.reset()
})

/**
 * Mostrar mas información en el titulo
 */
container_head_showMore.addEventListener('click', () => {
    if (container_head_hide.classList.contains('hide')) {
        container_head_hide.classList.remove('hide')
        container_head_showMore.textContent = ' mostrar menos'
    } else {
        container_head_hide.classList.add('hide')
        container_head_showMore.textContent = ' mostrar mas...'
    }
})

/*
    Boton de salir
*/
const btnSalir = Array.from(document.querySelectorAll('.btnSalir'))
for (const btn of btnSalir) {
    btn.addEventListener('click', () => {
        customWindow_account.classList.add('hide')
        customWindow_password.classList.add('hide')
        customWindow_recoveryMethod.classList.add('hide')
        customWindow_recoveryMethod.classList.add('hide')
        customWindow_searchAccount.classList.add('hide')
    })
}

/**
 * Molde para los options de las preguntas y respuestas de seguridad
 */
for (const x of secure_question) {
    x.addEventListener('change', (e) => {
        for (const y of container_answer_days){
            y.classList.add('hide')
        }
        for (const y of container_answer_temp){
            y.classList.add('hide')
        }
        for (const y of container_answer_season){
            y.classList.add('hide')
        }
    
        if (e.target.value == 'day') {
            for (const y of container_answer_days){
                y.classList.remove('hide')
            }
            let question = e.target.options[e.target.options.selectedIndex].textContent
            sessionStorage.setItem('k_question', question)
    
            for (const y of answer_days){
                y.addEventListener('change', (e) => {
                    let answer = e.target.options[e.target.options.selectedIndex].textContent
                    sessionStorage.setItem('k_answer', answer)
                })
            }
        } else if (e.target.value == 'temp') {
            for (const y of container_answer_temp){
                y.classList.remove('hide')
            }
            let question = e.target.options[e.target.options.selectedIndex].textContent
            sessionStorage.setItem('k_question', question)
    
            for (const y of answer_temp){
                y.addEventListener('change', (e) => {
                    let answer = e.target.options[e.target.options.selectedIndex].textContent
                    sessionStorage.setItem('k_answer', answer)
                })
            }
        } else if (e.target.value == 'season') {
            for (const y of container_answer_season){
                y.classList.remove('hide')
            }
            let question = e.target.options[e.target.options.selectedIndex].textContent
            sessionStorage.setItem('k_question', question)
    
            for (const y of answer_season){
                y.addEventListener('change', (e) => {
                    let answer = e.target.options[e.target.options.selectedIndex].textContent
                    sessionStorage.setItem('k_answer', answer)
                })
            }
        } else if (e.target.value == 'nothing') {
            sessionStorage.removeItem('k_question')
            sessionStorage.removeItem('k_answer')
        }
    })
}

//CODIGO ANTIGUO

// secure_question.addEventListener('change', (e) => {
//     container_answer_days.classList.add('hide')
//     container_answer_temp.classList.add('hide')
//     container_answer_season.classList.add('hide')

//     if (e.target.value == 'day') {
//         container_answer_days.classList.remove('hide')
//         let question = e.target.options[e.target.options.selectedIndex].textContent
//         sessionStorage.setItem('k_question', question)

//         answer_days.addEventListener('change', (e) => {
//             let answer = e.target.options[e.target.options.selectedIndex].textContent
//             sessionStorage.setItem('k_answer', answer)
//         })
//     } else if (e.target.value == 'temp') {
//         container_answer_temp.classList.remove('hide')
//         let question = e.target.options[e.target.options.selectedIndex].textContent
//         sessionStorage.setItem('k_question', question)

//         answer_temp.addEventListener('change', (e) => {
//             let answer = e.target.options[e.target.options.selectedIndex].textContent
//             sessionStorage.setItem('k_answer', answer)
//         })
//     } else if (e.target.value == 'season') {
//         container_answer_season.classList.remove('hide')
//         let question = e.target.options[e.target.options.selectedIndex].textContent
//         sessionStorage.setItem('k_question', question)

//         answer_season.addEventListener('change', (e) => {
//             let answer = e.target.options[e.target.options.selectedIndex].textContent
//             sessionStorage.setItem('k_answer', answer)
//         })
//     } else if (e.target.value == 'nothing') {
//         sessionStorage.removeItem('k_question')
//         sessionStorage.removeItem('k_answer')
//     }
// })

/**
 *  Eventos de los formularos relacionados con la bienvenida
 */

// Form Nombre de la cuenta
form_account.addEventListener('submit', (e) => {
    e.preventDefault()

    if (form_account_name.value == '') {
        alert('Debes ingresar tu nombre')
    }else {
        sessionStorage.setItem('k_account', form_account_name.value)

        // Pasar al siguiente formulario
        customWindow_account.classList.add('hide')
        customWindow_password.classList.remove('hide')
    }
})

// Form contraseña
form_password.addEventListener('submit', (e) => {
    e.preventDefault()

    if (form_password_password.value == '') {
        alert('Debes ingresar la contraseña')
    }else {
        sessionStorage.setItem('k_password', form_password_password.value)

         // Pasar al siguiente formulario
         customWindow_password.classList.add('hide')
         customWindow_recoveryMethod.classList.remove('hide')
    }
})

// Form setear un metodo de recuperación para la cuenta
form_recoveryMethod.addEventListener('submit', (e) => {
    e.preventDefault()

    // Validar si se selecciono una pregunta secreta
    if (sessionStorage.getItem('k_question') == null ) {
        alert('Debes elegir una pregunta secreta')
        return
    }

    // Validar si se selecciono una respuesta secreta
    if (sessionStorage.getItem('k_answer') == null) {
        alert('Debes seleccionar tu respuesta secreta')
        return
    } 

    // Crear el usuario
    let new_user = {
        name: sessionStorage.getItem('k_account'),
        password: sessionStorage.getItem('k_password'),
        question: sessionStorage.getItem('k_question'),
        answer: sessionStorage.getItem('k_answer')
    }

    if (localStorage.getItem('k_users') == null) {
        // Crear el array de usuarios
        let array_users = [new_user]

        // Guardar el array de usuarios
        localStorage.setItem('k_users', JSON.stringify(array_users))
    } else {
        // Obtener el array de usuarios
        let array_users = JSON.parse(localStorage.getItem('k_users'))

        // Validar si el usuario existe
        for (const user of array_users) {
            if (user.name == new_user.name) {
                alert('El usuario ya existe')
                return
            }
        }

        // Agregar el nuevo usuario
        array_users.push(new_user)
        localStorage.setItem('k_users', JSON.stringify(array_users))
    }

    // Pasos finales
    sessionStorage.clear()
    customWindow_recoveryMethod.classList.add('hide')
    form_account.reset()
    form_password.reset()
    form_recoveryMethod.reset()
    form_login.reset()
})

/**
 * Eventos formulario Recuperar contraseña
 */
form_recoverPassword.addEventListener('submit', (e) => {
    e.preventDefault()
    
    // Validar el campo de texto del nombre
    if (form_recoverPassword_user.value == '') {
        alert('Debes ingresar tu nombre de usuario')
        return
    }

    // Validar si se selecciono una pregunta secreta
    if (sessionStorage.getItem('k_question') == null ) {
        alert('Debes elegir una pregunta secreta')
        return
    }

    // Validar si se selecciono una respuesta secreta
    if (sessionStorage.getItem('k_answer') == null) {
        alert('Debes seleccionar tu respuesta secreta')
        return
    } 

    // Obtener el array de usuarios
    let array_users = JSON.parse(localStorage.getItem('k_users'))

    // Validar si el usuario existe
    for (const user of array_users) {
        if (user.name == form_recoverPassword_user.value) {
            if (sessionStorage.getItem('k_question') != user.question) {
                alert('Esa no es tu pregunta secreta')
            }else if (sessionStorage.getItem('k_answer') != user.answer) {
                alert('Tu respuesta secreta es incorrecta')
            }else{
                alert('Tu contraseña es: ' + user.password)
            }
        }
    }

    // Pasos finales
    customWindow_recoverPassword.classList.add('hide')
    // sessionStorage.clear()
})


/**
 * Ventana principal (login)
 */

// Boton ver contraseña
form_login_seePassword.addEventListener('click', () => {
    if (form_login_password.type == 'password') {
        form_login_password.type = 'text'
        form_login_seePassword.src = 'assets/icons/VisibilityOFF.svg'
    }else {
        form_login_password.type = 'password'
        form_login_seePassword.src = 'assets/icons/VisibilityON.svg'
    }
})

// Boton recueperar contraseña
form_login_button_recoverPassword.addEventListener('click', () => {
    customWindow_recoverPassword.classList.remove('hide')
    form_recoverPassword.reset()
})

// Boton registrarse
form_login_button_register.addEventListener('click', () => {
    customWindow_account.classList.remove('hide')
    form_account.reset()
    form_password.reset()
    form_recoveryMethod.reset()
})

// Boton ingresar
form_login.addEventListener('submit', (e) => {
    e.preventDefault()

    // Validar campos de texto
    if (form_login_account.value == '') {
        alert('Debes seleccionar un usuario')
        return
    } 
    
    if (form_login_password.value == '') {
        alert('Debes ingresar la contraseña')
        return 
    }

    // Obtener el array de usuarios
    let array_users = JSON.parse(localStorage.getItem('k_users'))

    for (const user of array_users) {
        // Validar que coincida con el nombre de usuario
        if (user.name == form_login_account.value && user.password == form_login_password   .value) {
            // alert('Acceso autorizado')
            location.href = 'main.html' 
            return
        }
    }

    alert('El usuario o la contraseña son incorrectos')
})

// Boton elegir cuenta
for (const btnSearch of form_login_showUsers){
    btnSearch.addEventListener('click', () => {
        // Mostrar la ventana   
        customWindow_searchAccount.classList.remove('hide')
    
        /*
            Cargar los usuarios en la tabla
        */
    
        // Limpiar la tabla 
        while (customWindow_searchAccount_tableBody.hasChildNodes()) {
            customWindow_searchAccount_tableBody.removeChild(customWindow_searchAccount_tableBody.firstChild);
        }
    
        // Obtener el array de usuarios
        let array_users = JSON.parse(localStorage.getItem('k_users'))
    
        // Recorrer el array de usuarios y agregarlos a la tabla
        for (const user of array_users) {
            customWindow_searchAccount_tableBody.innerHTML += 
            `<tr class="row">
                <td>${user.name}</td>                             
            </tr>` 
        } 
    
        /* 
            Funcionalidad de seleccionar celdas
        */
        
        // Crear un array con todos los elementos que contengan la clase 
        // .row, es decir todas la filas de la tabla
        const rows = Array.from(document.querySelectorAll('.row'))
    
        // recorrer todas la filas y darles el evento de click
        for (const row of rows) {
            row.addEventListener('click', () => {
                /*
                    Este codigo será para cada una de las filas
                */
    
                // Determinar el indice de la persona 
                // en el array de personas
                const index = row.rowIndex
    
                // Obtener el nombre de usuario basado en el indice
                // que tiene en la tabla
                let array_users = JSON.parse(localStorage.getItem('k_users'))
                const user = array_users[index-1]
    
                // Ocultar la ventana
                customWindow_searchAccount.classList.add('hide')
                
                // Colocar el nombre de usuario en el cuadro de texto
                form_login_account.value = user.name
                form_recoverPassword_user.value = user.name
    
                // Limpiar la tabla
                while (customWindow_searchAccount_tableBody.hasChildNodes()) {
                    customWindow_searchAccount_tableBody.removeChild(customWindow_searchAccount_tableBody.firstChild);
                }
            })
        }
    })
}