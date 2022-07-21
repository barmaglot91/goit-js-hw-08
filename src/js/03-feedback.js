import throttle from 'lodash.throttle';

let LOCALSTORAGE_KEY = 'feedback-form-state'
const form = document.querySelector('.feedback-form')

getFromLocalStorage()

form.addEventListener('input', throttle(saveInLocalStorage, 500))
form.addEventListener('submit', formSubmit)

function saveInLocalStorage() { 
    const formEmail = form.elements.email.value
    const formMessage = form.elements.message.value
    const feedback = {
        email: formEmail,
        message: formMessage
    }

    const feedbackJSON = JSON.stringify(feedback);
    localStorage.setItem(LOCALSTORAGE_KEY, feedbackJSON)
}

function getFromLocalStorage() {
    const feedbackJSON = localStorage.getItem(LOCALSTORAGE_KEY || '')
    if (!feedbackJSON) return
    
    const feedback = JSON.parse(feedbackJSON)
    
    form.elements.email.value = feedback.email
    form.elements.message.value = feedback.message
}

function formSubmit(e) { 
    e.preventDefault()

    const formEmail = form.elements.email.value
    const formMessage = form.elements.message.value
    const feedback = {
        email: formEmail,
        message: formMessage
    }

    if (feedback.email === '' || feedback.message === '') { return }

    console.log(feedback)
    
    form.reset()
    localStorage.removeItem(LOCALSTORAGE_KEY)
}
