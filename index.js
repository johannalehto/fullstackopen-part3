const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))

morgan.token('body', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

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

    return `<p>Phonebook has info for ${contactsAmount} people</p> 
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

const createId = () => {
    const newId = Math.floor((Math.random() * 1000))
    const findId = contacts.find(p => p.id === newId)
        ? createId()
        : newId
    return newId
}

app.post('/api/persons', (req, res) => {
    const body = req.body

    if (!body.name) {
        return res.status(400).json({
            error: "name missing"
        })
    }

    if (!body.number) {
        return res.status(400).json({
            error: "number missing"
        })
    }

    if (contacts.find(c => c.name === body.name)) {
        return res.status(400).json({
            error: "name already in contacts"
        })
    }

    const contact = {
        id: createId(),
        name: body.name,
        number: body.number
    }

    contacts = contacts.concat(contact)
    res.json(contact)

})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    contacts = contacts.filter(c => c.id !== id)

    res.status(204).end()
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

