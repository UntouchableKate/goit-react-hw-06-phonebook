import React from 'react';

export default function FilterForm(props) {
  const handleChange = e => {
    props.setFilter(e.target.value);
  };

  return (
    <>
      <p>Find contacts by name</p>
      <input type="text" onChange={handleChange} value={props.filter}></input>
    </>
  );
}
