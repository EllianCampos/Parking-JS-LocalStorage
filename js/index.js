// Ventanas 
const customWindow_account = document.getElementById('customWindow_account')
const customWindow_password = document.getElementById('customWindow_password')
const customWindow_recoveryMethod = document.getElementById('customWindow_recoveryMethod')
const customWindow_recoverPassword = document.getElementById('customWindow_recoverPassword')
const customWindow_searchAccount = document.getElementById('customWindow_searchAccount')

// Formularios de bienvenida
const form_account = document.getElementById('form_account')
const form_password = document.getElementById('form_password')
const form_recoveryMethod = document.getElementById('form_recoveryMethod')
const form_recoverPassword = document.getElementById('form_recoverPassword')

// Campos de texto de bienvenida
const form_account_name = document.getElementById('form_account_name')
const form_password_password = document.getElementById('form_password_password')
const form_recoveryMethod_component = document.getElementById('form_recoveryMethod_component')

// Ventana principal (login)
const form_login = document.getElementById('form_login')
const form_login_account = document.getElementById('form_login_account')
const form_login_password = document.getElementById('form_login_password')
const form_login_seePassword = document.getElementById('form_login_seePassword' )
const form_login_button_recoverPassword = document.getElementById('form_login_button_recoverPassword')
const form_login_button_register = document.getElementById('form_login_button_register')
const form_login_showUsers = document.getElementById('form_login_showUsers')

// Ventana de buscar cuenta
const customWindow_searchAccount_table = document.getElementById('customWindow_searchAccount_table')
const customWindow_searchAccount_tableHead = document.getElementById('customWindow_searchAccount_tableHead')
const customWindow_searchAccount_tableBody = document.getElementById('customWindow_searchAccount_tableBody')

const container_head_showMore = document.getElementById('container_head_showMore')
const container_head_hide = document.getElementById('container_head_hide')

// Ventana bienvenida contraseña
const password = document.getElementById('password')
const seePassword = document.getElementById('seePassword')

// Recovery password
const secure_question = document.querySelector('.recoveryMethod__question select')

const container_answer_days = document.querySelector('.recoveryMethod__answer--days')
const container_answer_temp = document.querySelector('.recoveryMethod__answer--temp')
const container_answer_season = document.querySelector('.recoveryMethod__answer--season')

const answer_days = document.querySelector('.recoveryMethod__answer--days select')
const answer_temp = document.querySelector('.recoveryMethod__answer--temp select')
const answer_season = document.querySelector('.recoveryMethod__answer--season select')


const form_recoverPassword_user = document.getElementById('form_recoverPassword_user')



// const xx = document.getElementById('')
// const xx = document.getElementById('')
// const xx = document.getElementById('')
// const xx = document.getElementById('')
// const xx = document.getElementById('')
// const xx = document.getElementById('')
// const xx = document.getElementById('')
// const xx = document.getElementById('')
// const xx = document.getElementById('')
// const xx = document.getElementById('')
// const xx = document.getElementById('')
// const xx = document.getElementById('')
// const xx = document.getElementById('')
// const xx = document.getElementById('')
// const xx = document.getElementById('')
// const xx = document.getElementById('')

addEventListener("load", () => {
    if (localStorage.getItem('k_users') == null) {
        customWindow_account.classList.remove('hide')
    }

    form_login.reset()
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

container_head_showMore.addEventListener('click', () => {
    if (container_head_hide.classList.contains('hide')) {
        container_head_hide.classList.remove('hide')
        container_head_showMore.textContent = ' mostrar menos'
    } else {
        container_head_hide.classList.add('hide')
        container_head_showMore.textContent = ' mostrar mas...'
    }
})

form_login_seePassword.addEventListener('click', () => {
    if (form_login_password.type == 'password') {
        form_login_password.type = 'text'
        form_login_seePassword.src = 'assets/icons/VisibilityOFF.svg'
    }else {
        form_login_password.type = 'password'
        form_login_seePassword.src = 'assets/icons/VisibilityON.svg'
    }
})

form_login_button_recoverPassword.addEventListener('click', () => {
    alert('Funcionalidad en desarrollo')
    // customWindow_recoverPassword.classList.remove('hide')
})

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
            alert('Acceso autorizado')
            return
        }
    }

    alert('El usuario o la contraseña son incorrectos')
})

form_login_showUsers.addEventListener('click', () => {
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

            // Limpiar la tabla
            while(body_table.hasChildNodes())
	        body_table.removeChild(body_table.firstChild);
        })
    }
})


// seePassword.addEventListener('click', () => {
//     if (this.password.type == 'password') {
//       this.password.type = 'text'
//       seePassword.src = 'assets/icons/VisibilityOFF.svg'
//     }else {
//       this.password.type = 'password'
//       seePassword.src = 'assets/icons/VisibilityON.svg'
//     }
//   })

// Funcionalidad del metodo de recuperacion
secure_question.addEventListener('change', (e) => {
    container_answer_days.classList.add('hide')
    container_answer_temp.classList.add('hide')
    container_answer_season.classList.add('hide')

    if (e.target.value == 'day') {
        container_answer_days.classList.remove('hide')
        let question = e.target.options[e.target.options.selectedIndex].textContent
        sessionStorage.setItem('k_question', question)

        answer_days.addEventListener('change', (e) => {
            let answer = e.target.options[e.target.options.selectedIndex].textContent
            sessionStorage.setItem('k_answer', answer)
        })
    } else if (e.target.value == 'temp') {
        container_answer_temp.classList.remove('hide')
        let question = e.target.options[e.target.options.selectedIndex].textContent
        sessionStorage.setItem('k_question', question)

        answer_temp.addEventListener('change', (e) => {
            let answer = e.target.options[e.target.options.selectedIndex].textContent
            sessionStorage.setItem('k_answer', answer)
        })
    } else if (e.target.value == 'season') {
        container_answer_season.classList.remove('hide')
        let question = e.target.options[e.target.options.selectedIndex].textContent
        sessionStorage.setItem('k_question', question)

        answer_season.addEventListener('change', (e) => {
            let answer = e.target.options[e.target.options.selectedIndex].textContent
            sessionStorage.setItem('k_answer', answer)
        })
    } else if (e.target.value == 'nothing') {
        sessionStorage.removeItem('k_question')
        sessionStorage.removeItem('k_answer')
    }
})

// Recuprar contraseña
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
    // container_answer_days.classList.add('hide')
    // container_answer_temperature.classList.add('hide')
    // container_answer_season.classList.add('hide')
    // sessionStorage.clear()
})

form_login_button_register.addEventListener('click', () => {
    customWindow_account.classList.remove('hide')
})


