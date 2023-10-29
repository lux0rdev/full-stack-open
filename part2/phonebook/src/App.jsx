import { useState, useEffect } from 'react'
import axios from 'axios'

import ContactList from './components/Contacts'
import AddContactForm from './components/Forms'
import { SearchInput } from './components/Inputs'

const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => setPersons(response.data))
  }, [])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [searchString, setSearchString] = useState('')

  const contactsToShow = showAll 
    ? persons 
    : persons.filter(person => (new RegExp(`${searchString.trim()}`, 'iu')).test(person.name))

  const addNewContact = (event) => {
    const newName = newName.trim()
    event.preventDefault()
    if (newName === '') return
    else if (contactInList()) {
      alert(`${newName} is already in the list`)
      resetInputs()
      return
    }

    const newContact = { id: persons.length + 1, name: newName, number: newNumber, }
    setPersons(persons.concat(newContact))
    resetInputs()
  }

  const contactInList = () => {
    return persons.find(person => person.name.trim() === newName.trim())
  }

  const resetInputs = () => {
    setNewName('')
    setNewNumber('')
  }

  return (
    <>
      <Header text='Phonebook' />
      <SearchInput
        setSearchString={setSearchString}     
        setShowAll={setShowAll}     
      />

      <Header text='Add a new contact' />

      <AddContactForm  
        newContact={addNewContact} 
        setNewName={setNewName} 
        setNewNumber={setNewNumber} 
        newName={newName}
        newNumber={newNumber}
        />
      <Header text='Numbers' />
      <ContactList contacts={contactsToShow} />
    </>
  )
}

const Header = ({text}) => {
  return <h2>{text}</h2>
}

export default App
