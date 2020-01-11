export const save = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.log(err);
  }
};

// export const get = key => {
//   try {
//     const contacts = localStorage.getItem(key);
//     const parsedContacts = JSON.parse(contacts);
// return contacts ? parsedContacts : [];
//   } catch (error) {
//     console.log(error);
//   }
// };
