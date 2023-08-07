const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1') /* use # to target an ID for <p> */ 
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {     /** e = event */
    e.preventDefault()

    const location = search.value  /*take the input value, which equals location*/

    messageOne.textContent = '...Loading'
    messageTwo.textContent = ''

    fetch('http://localhost:3000/weather?address=' + location, {headers: {'Origin': 'http://localhost:3000'}}).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            }
            else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
})