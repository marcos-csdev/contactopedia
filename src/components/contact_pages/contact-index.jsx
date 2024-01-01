import React from "react";
import Headers from "../page_sections/headers";
import AddRandomContact from "./add-random-contact";
import RemoveAllContacts from "./remove-contacts";
import AddContact from "./add-contact";
import FavoriteContacts from "./favorite-contacts";
import GeneralContacts from "./general-contacts";
import Footer from "../page_sections/footer";

class ContactIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contactList: [
        {
          id: 1,
          name: "Jason Wynn",
          phone: "666-666-7770",
          email: "thomas@email.com",
          isFavorite: false,
        },
        {
          id: 2,
          name: "Martha Wayne",
          phone: "111-222-0000",
          email: "martha@email.com",
          isFavorite: true,
        },
        {
          id: 3,
          name: "Amanda Waller",
          phone: "999-222-1111",
          email: "waller@email.com",
          isFavorite: true,
        },
      ],
    };
  }

  validateContact(newContact) {
    if (newContact.name === "") {
      return { status: "failure", msg: "Please enter a valid name" };
    }

    const hasDuplicates = this.state.contactList.filter((contact) => {
      if (
        contact.name == newContact.name ||
        contact.phone == newContact.phone
      ) {
        return true;
      }
    });

    if (hasDuplicates.length > 0) {
      return { status: "failure", msg: "User exists" };
    }
  }

  handleAddContact = (newContact) => {
    if (newContact === null)
      return { status: "error", msg: "No contact received" };

    const validation = this.validateContact(newContact);
    if (validation !== undefined) return validation;

    let contactLength = this.state.contactList.length;
    newContact.id = contactLength;

    this.setState((prevState) => {
      return {
        contactList: prevState.contactList.concat([newContact]),
      };
    });

    return { status: "success", msg: "Contact created successfully" };
  };

  handleDeleteContact = (contact) => {
    if (contact === null) return false;
    this.setState((prevState) => {
      return {
        //returns all contacts which id are different from the parameter's
        contactList: prevState.contactList.filter(
          (listContact) => listContact.id !== contact.id
        ),
      };
    });
  };

  handleToggleFavorites = (contact) => {
    if (contact === null) return null;

    this.setState((prevState) => {
      return {
        contactList: prevState.contactList.map((listContact) => {
          //look for the contact in the favorites list
          if (listContact.id === contact.id) {
            //(...) = spread operator = SelectMany
            return { ...listContact, isFavorite: !listContact.isFavorite }; //reverts favorite value
          }

          return listContact;
        }),
      };
    });
  };

  render() {
    return (
      <div>
        <Headers />
        <div className="container" style={{ minHeight: "85vh" }}>
          {/* vh = vertical height */}
          <div className="row py-3">
            <div className="col-4 offset-2">
              <AddRandomContact />
            </div>
            <div className="col-4">
              <RemoveAllContacts />
            </div>
            <div className="row py-2">
              <div className="col-8 offset-2">
                <AddContact handleAddContact={this.handleAddContact} />
              </div>
            </div>
            <div className="row py-2">
              <div className="col-8 offset-2 row">
                <FavoriteContacts
                  contacts={this.state.contactList.filter(
                    (contact) => contact.isFavorite === true
                  )}
                  favoriteClick={this.handleToggleFavorites}
                  deleteClick={this.handleDeleteContact}
                />
              </div>
            </div>
            <div className="row py-2">
              <div className="col-8 offset-2 row">
                <GeneralContacts
                  contacts={this.state.contactList.filter(
                    (contact) => contact.isFavorite === false
                  )}
                  favoriteClick={this.handleToggleFavorites}
                  deleteClick={this.handleDeleteContact}
                />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default ContactIndex;
