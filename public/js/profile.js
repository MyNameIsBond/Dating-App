function profile() {
  const xml = new XMLHttpRequest()
  xml.onload = function () {
    if (xml.readyState === 4 && xml.status === 200) {
      document.getElementById('profile').innerHTML = this.responseText
    } else {
      const error = 'error'
      console.log(error, this.statusText)
    }
  }
  xml.open('GET', '/profile/test', true)
  xml.send()
}
profile()

document.getElementById('add_pic').addEventListener('click', () => {
  const add_button = document.getElementById('add_pic_button')
  const add_div = document.getElementById('add_pic_list')

  document.onclick = (e) => {
    if (e.target === add_button && add_div.style.display == 'none') {
      add_div.style.display = 'block'
    } else {
      add_div.style.display = 'none'
    }
  }
})

function userInfoMenu() {

  const action = document.getElementById('user-menu')
  const openButton = document.getElementById('ellipsis-menu')
  this.onclick = e => {
    if (e.target === openButton && action.style.display == 'none') {
      action.style.display = 'block'
    } else {
      action.style.display = 'none'
    }
  }

}