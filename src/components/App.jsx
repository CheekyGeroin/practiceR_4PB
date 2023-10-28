import { useEffect, useState } from 'react';
import { Form } from './Form/Form';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { nanoid } from 'nanoid';
import { Container } from './App.styled';
import Notiflix from 'notiflix';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const savedContacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(savedContacts);
    console.log(parsedContacts);
    setContacts(parsedContacts);
  }, []);

  useEffect(() => {
    console.log(`contacts have been changed ${Date.now()}`);
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addNewContact = (name, number) => {
    if (contacts.find(contact => contact.name === name)) {
      Notiflix.Notify.failure(`${name} is already in your contacts!`);
      return;
    }

    const newContact = {
      id: nanoid(),
      name,
      number,
    };
    console.log(newContact);

    setContacts(prevState => [newContact, ...prevState]);
  };
  console.log(contacts);

  const onChangeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getFilteredContact = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const deleteContact = id => {
    setContacts(prevState => prevState.filter(contact => contact.id !== id));
  };

  const filteredContact = getFilteredContact();

  return (
    <Container>
      <h1>Phonebook</h1>
      <Form onSubmit={addNewContact} />

      <h2>Contacts</h2>
      <Filter value={filter} onChange={onChangeFilter} />
      <ContactList contacts={filteredContact} onDelete={deleteContact} />
    </Container>
  );
};
