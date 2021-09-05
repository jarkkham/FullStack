import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const Persons = ({ persons, filter, removePerson }) => {
    return (
        <div>
            {persons.map(person => {
                if (person.name.toLowerCase().includes(filter)) {
                    return (
                        <div key={person.id}>
                            {person.name} {person.number}
                            <button name={person.name} id={person.id} onClick={removePerson}> delete </button>
                        </div>
                    )
                } else {
                    return null
                }
            })}
        </div>
    )
}

const Filter = ({ handleFilterChange }) => {
    return (
        <div>
            filter shown with
            <input
                onChange={handleFilterChange}
            />
        </div>
    )
}

const Personform = (props) => {
    return (
        <div>
            <form onSubmit={props.addContact}>
                <div>
                    name:
                    <input
                        value={props.newName}
                        onChange={props.handleNameChange}
                    />
                </div>
                <div>
                    number:
                    <input
                        value={props.newNumber}
                        onChange={props.handleNumberChange}
                    />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </div>
    )
}

const Notification = ({ notification, notificationColor }) => {
    const notificationStyle = {
        color: notificationColor,
        background: 'lightgray',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    if (notification === null) {
        return <div />
    }
    else {
        return (
            <div style={notificationStyle}>
                {notification}
            </div>
        )
    }
}

const App = () => {
    const [persons, setPersons] = useState([])
    const [filter, setNewFilter] = useState('')
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [notification, setNotification] = useState(null)
    const [notificationColor, setNotificationColor] = useState('green')

    useEffect(() => {
        personService
            .getAll()
            .then(response => {
                setPersons(response)
            })
    }, [])

    const addContact = (event) => {
        event.preventDefault()
        const found = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
        if (found) {
            if (window.confirm(`${newName} is already added to phonebook, replace old number with new one?`)) {
                const changedPerson = {
                    name: newName,
                    id: found.id,
                    number: newNumber
                }
                personService
                    .update(changedPerson.id, changedPerson)
                    .then(returnedPerson => {
                        setPersons(persons.map(person => person.number !== found.number ? person : changedPerson))
                        addedPerson(`Changed ${newName}`)
                    })
                    .catch(error => {
                        displayNotification(`${newName} not found at server`, 'red')
                    })
            }
        }
        else {
            const newPerson = {
                name: newName,
                number: newNumber,
            }
            personService
                .add(newPerson)
                .then(response => {
                    setPersons(persons.concat(response))
                    addedPerson(`Added ${newName}`)
                })
                .catch(error => {
                    displayNotification(error.response.data.error, 'red')
                })
        }
    }

    const addedPerson = (message) => {
        displayNotification(message, 'green')
        setNewName('')
        setNewNumber('')
    }

    const removePerson = (props) => {
        if (window.confirm(`delete ${props.target.name}`)) {
            personService
                .remove(props.target.id)
                .then(() => personService.getAll())
                .then(response => {
                    setPersons(response)
                    displayNotification(`Deleted ${props.target.name}`, 'red')
                })
                .catch(error => {
                    displayNotification(`${props.target.name} has already been removed from server`, 'red')
                })
        }
    }

    const displayNotification = (message, color) => {
        console.log(message)
        setNotification(message)
        setNotificationColor(color)
        setTimeout(() => setNotification(null), 5000)
    }

    const handleFilterChange = (event) => {
        setNewFilter(event.target.value)
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification
                notification={notification}
                notificationColor={notificationColor}
            />
            <Filter
                handleFilterChange={handleFilterChange}
            />
            <h3>Add a new</h3>
            <Personform
                addContact={addContact}
                newName={newName}
                newNumber={newNumber}
                handleNameChange={handleNameChange}
                handleNumberChange={handleNumberChange}
            />
            <h3>Numbers</h3>
            <Persons
                persons={persons}
                filter={filter}
                removePerson={removePerson}
            />
        </div>
    )

}

export default App