const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    // prevent default behavior of refreshing the page
    e.preventDefault()
    
    const location = search.value
    const url = '/weather?address=' + location

    messageOne.textContent = 'Getting your weather...'
    messageTwo.textContent = ''
    fetch(url).then((response) => {
    response.json().then((data) => {
        if(data.error) {
            messageOne.textContent = data.error
        } else {
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        }
    })
})
})