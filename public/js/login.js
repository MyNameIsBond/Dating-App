window.document.getElementById('login_btn').addEventListener('click', () => {
    const email = document.getElementById('username').value
    const password = document.getElementById('password').value
    console.log(email, password)
})


window.document.getElementById('reg_button').addEventListener('click', () => {
    const username = document.getElementById('reg_username').value
    const email = document.getElementById('reg_email').value
    const password = document.getElementById('reg_password').value
    const password2 = document.getElementById('reg_password2').value
    const gender = document.getElementById('gender').value
    console.log(gender, username,password2, email)
})

function tabs(tab,cl) {
    let form = document.getElementsByClassName('form')
    for (let i = 0; i < form.length; i++) {
        form[i].style.display = 'none'
    }
    document.getElementById(tab).style.display = 'block'
    let tabs = document.getElementById(cl)
    tabs.classList.add('actives')
}
