import React, { useContext } from 'react';

import phonebookContext from '../context/context';

//styles
import styles from './ContactList.module.css';

export default function ContactList(props) {
  const [constacts] = useContext(phonebookContext);
  return (
    <>
      {constacts.length > 0 && (
        <>
          <ul className={styles.contactsList}>
            {props.filteredContacts.map(contact => (
              <li key={contact.id} className={styles.listStyle}>
                <p className={styles.textName}>{contact.name}:</p>
                <p className={styles.textNumber}>{contact.number}</p>
                <button
                  className={styles.button}
                  onClick={() => props.removeContact(contact.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}

// {constacts.length > 0 && (
//     <ul>
//       {constacts.map(contact => (
//         <li key={contact.id}>
//           <p>{contact.name}</p>
//           {/* <button onClick={() => removeTodo(constacts.id)}>Remove</button> */}
//         </li>
//       ))}
//     </ul>
//   )}
