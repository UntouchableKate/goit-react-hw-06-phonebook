import React, { useReducer, useState, useMemo, useEffect } from 'react';
import shortid from 'shortid';

// context
import phonebookContext from '../context/context';

//utils

import * as storage from '../../utils/localStorage';

// components
import ContactsList from '../ContactsList';
import PhonebookForm from '../PhonebookForm';
import FilterForm from '../FilterForm';

//styles
import styles from './App.module.css';

const contactsReducer = (state, action) => {
  switch (action.type) {
    case 'addContact':
      return [...state, action.payload.contact];

    case 'removeContact':
      return state.filter(contact => contact.id !== action.payload.contactId);

    case 'getContacts':
      return [action.payload.contacts];

    default:
      return state;
  }
};

export default function App() {
  //========= add contacts
  const [contacts, dispatch] = useReducer(contactsReducer, [], () => {
    const contacts = localStorage.getItem('contacts');
    return contacts ? JSON.parse(contacts) : [];
  });

  const addContact = (name, number) => {
    const contact = {
      id: shortid.generate(),
      name,
      number,
    };
    if (ContactCheck(name)) {
      alert(`${name} is already in contacts.`);
      return;
    } else if (!name || !number) {
      alert('You need to fill in all the input fields');
    } else {
      dispatch({ type: 'addContact', payload: { contact } });
    }
  };

  const ContactCheck = name => {
    return contacts.find(contact => contact.name === name);
  };

  //=============== save contacts in localStorage ============

  useEffect(() => {
    storage.save('contacts', contacts);
  }, [contacts]);

  //================== delete contact ========

  const removeContact = contactId => {
    dispatch({ type: 'removeContact', payload: { contactId } });
  };

  //=================== filter ================

  const [filter, setFilter] = useState('');

  const filteredContacts = useMemo(() => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()),
    );
  }, [contacts, filter]);

  return (
    <phonebookContext.Provider value={[contacts]}>
      <div className={styles.mainWrapper}>
        <h1 className={styles.mainTitle}>Phonebook</h1>
        <PhonebookForm addContact={addContact} />
        <h2> Contacts</h2>
        <FilterForm setFilter={setFilter} filter={filter} />

        <ContactsList
          filteredContacts={filteredContacts}
          removeContact={removeContact}
        />
      </div>
    </phonebookContext.Provider>
  );
}

// { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
// { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
// { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
// { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
