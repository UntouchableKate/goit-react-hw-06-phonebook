import React, { useState } from 'react';

//styles
import styles from './PhonebookForm.module.css';

export default function PhonebookForm(props) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChangeName = e => {
    const name = e.target.value;
    if (!name) return;
    setName(
      name
        .split(/\s+/)
        .map(word => word.charAt(0).toUpperCase() + word.substring(1))
        .join(' '),
    );
  };

  const handleChangeNumber = e => {
    setNumber(e.target.value);
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  const handleSubmit = e => {
    e.preventDefault();

    props.addContact(name, number);

    reset();
  };

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit} className={styles.formWrapper}>
        <span className={styles.spanStyle}> Name </span>
        <input
          type="text"
          value={name}
          onChange={handleChangeName}
          className={styles.inputStyle}
        ></input>
        <span className={styles.spanStyle}>Number</span>
        <input
          type="tel"
          value={number}
          onChange={handleChangeNumber}
          pattern="^\d{3}-\d{2}-\d{2}$"
          placeholder="e.g. 999-99-99"
          className={styles.inputStyle}
        ></input>
        <button className={styles.buttonStyle}>Add contact</button>
      </form>
    </div>
  );
}
