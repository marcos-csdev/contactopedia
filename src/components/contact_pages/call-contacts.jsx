import Contact from "./contact";

const CallContacts = (props) => {
  //contacts could be a single object
  if (props.contacts === null) return null;

  if (Array.isArray(props.contacts)) {
    return props.contacts.map((contact, index) => (
      <Contact
        contact={contact}
        key={index}
        favoriteClick={props.favoriteClick}
        updateClick={props.updateClick}
        deleteClick={props.deleteClick}
      ></Contact>
    ));
  } else {
    return (
      <Contact
        contact={props.contacts}
        favoriteClick={props.favoriteClick}
        updateClick={props.updateClick}
        deleteClick={props.deleteClick}
      ></Contact>
    );
  }
};

export default CallContacts;
