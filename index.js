// const { response } = require('express')
const express = require('express')
const app = express()

let contacts = [
    {
        id: 1, 
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: 2, 
        name: "Ada Lovelace",
        number: "040-5039452"
    },
    {
        id: 3, 
        name: "Dan Abramov",
        number: "040-092835"
    },
    {
        id: 4, 
        name: "Mary Poppendick",
        number: "055-4758394"
    }
]
const displayInfo = () => {
    const contactsAmount = contacts.length
    const now = new Date().toString()

    return `<p>Phonebook has info for ${contactsAmount}</p> 
            <p>${now}</p>`
}

app.get('/info', (req, res) => {
    res.send(displayInfo())

})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const contact = contacts.find(c => c.id === id)
    if (contact) {
        res.json(contact)
    } else {
        res.status(404).end()
    }
})



app.get('/api/persons', (req, res) => {
    res.json(contacts)
})


const PORT = 3001
app.listen(PORT)
console.log(`Server ruunning on port ${PORT}`)
