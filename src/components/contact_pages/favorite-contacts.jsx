import Contact from "./contact";

const FavoriteContacts = (props) => {
  return (
    <div>
      {
        /* calling the contact component for each object */
        props.contacts.map((contact, index) => (
          <Contact contact={contact} key={index}></Contact>
        ))
      }
    </div>
  );
};

export default FavoriteContacts;
