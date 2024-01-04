import React from "react";
import Headers from "../page_sections/headers";
import AddRandomContact from "./add-random-contact";
import RemoveAllContacts from "./remove-contacts";
import AddContact from "./add-contact";
import Footer from "../page_sections/footer";
import ErrorBoundary from "../error-boundary";
import EditContact from "./edit-contact";
import SharedContacts from "./shared-contacts";

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
      selectedContact: null,
      // isUpdating:false
    };
  }

  validateContact(newContact) {
    if (newContact.name === "") {
      return { status: "error", msg: "Please enter a valid name" };
    }

    const hasDuplicates = this.state.contactList.filter((contact) => {
      if (
        contact.name === newContact.name &&
        contact.phone === newContact.phone &&
        contact.email === newContact.email
      ) {
        return true;
      }
      return false;
    });

    if (hasDuplicates.length > 0) {
      return { status: "error", msg: "User exists" };
    }

    return true;
  }

  handleAddContact = (newContact) => {
    if (newContact === null)
      return { status: "error", msg: "No contact received" };

    const validationMessage = this.validateContact(newContact);
    if (validationMessage !== true) return validationMessage;

    let contactLength = this.state.contactList.length;
    newContact.id = contactLength;

    this.setState((prevState) => {
      return {
        //appends the newContact to the end of the list
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

    return { status: "success", msg: "Contact deleted successfully" };
  };

  handleDeleteAllContacts = () => {
    if (this.state.contactList.length === 0) return null;

    this.setState(() => {
      return {
        contactList: [],
      };
    });

    return { status: "success", msg: "All Contacts deleted successfully" };
  };

  handleAddRandomContact = (newContact) => {
    let contactLength = this.state.contactList.length;
    newContact.id = contactLength;

    this.setState((prevState) => {
      return {
        //appends the newContact to the end of the list
        contactList: prevState.contactList.concat([newContact]),
      };
    });

    return { status: "success", msg: "Random contact created" };
  };

  handleUpdateClick = (contact) => {
    document.getElementById("add-contact-div").style.display = "none";
    document.getElementById("edit-contact-div").style.display = "block";

    this.setState({ selectedContact: contact });
  };

  handleEditContact = (updatedContact) => {
    //could not acquire a contact object, return error message
    if (updatedContact === null || updatedContact === undefined)
      return {
        status: "error",
        msg: "There was a problem during the contact update",
      };

    const validationMessage = this.validateContact(updatedContact);
    if (validationMessage !== true) return validationMessage;

    //index = id - 1
    let updatedIndex = updatedContact.id;
    updatedIndex--;

    this.setState((prevState) => {
      const updatedList = prevState.contactList.map((contact, index) => {
        if (index === updatedIndex) return updatedContact;
        else return contact;
      });
      return {
        contactList: updatedList,
      };
    });

    //resetting DOM objects for contact edition and creation
    document.getElementById("add-contact-div").style.display = "block";
    document.getElementById("edit-contact-div").style.display = "none";

    this.setState({ selectedContact: null });

    return { status: "success", msg: "Contact updated successfully" };
  };

  handleCancelEditContact = () => {
    //resetting DOM objects for contact edition and creation
    document.getElementById("add-contact-div").style.display = "block";
    document.getElementById("edit-contact-div").style.display = "none";

    this.setState({ selectedContact: null });
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

  filterFavorites = (isFavorite) => {
    if (this.state.contactList === undefined) return null;

    if (Array.isArray(this.state.contactList)) {
      return this.state.contactList.filter(
        (contact) => contact.isFavorite === isFavorite
      );
    }

    return this.state.contactList.isFavorite === isFavorite
      ? this.state.contactList
      : null;
  };

  render() {
    return (
      <div>
        <ErrorBoundary>
          <Headers />
          <div className="container" style={{ minHeight: "85vh" }}>
            {/* vh = vertical height */}
            <div className="row py-3">
              <div className="col-4 offset-2 row">
                <AddRandomContact
                  handleAddRandomContact={this.handleAddRandomContact}
                />
              </div>
              <div className="col-4 row">
                <RemoveAllContacts
                  handleDeleteAllContacts={this.handleDeleteAllContacts}
                />
              </div>
              <div className="row py-2" id="add-contact-div">
                <div className="col-8 offset-2 row">
                  <AddContact handleAddContact={this.handleAddContact} />
                </div>
              </div>
              <div
                style={{ display: "none" }}
                className="row py-2"
                id="edit-contact-div"
              >
                <div className="col-8 offset-2 row">
                  {this.state.selectedContact != null && (
                    <EditContact
                      contact={this.state.selectedContact}
                      editContact={this.handleEditContact}
                      cancelEditContact={this.handleCancelEditContact}
                    />
                  )}
                </div>
              </div>
              <div className="row py-2">
                <div className="col-8 offset-2 row">
                  <SharedContacts
                    contacts={this.filterFavorites(true)}
                    favoriteClick={this.handleToggleFavorites}
                    updateClick={this.handleUpdateClick}
                    deleteClick={this.handleDeleteContact}
                    label={"Favorites"}
                  />
                </div>
              </div>
              <div className="row py-2">
                <div className="col-8 offset-2 row">
                  <SharedContacts
                    contacts={this.filterFavorites(false)}
                    favoriteClick={this.handleToggleFavorites}
                    updateClick={this.handleUpdateClick}
                    deleteClick={this.handleDeleteContact}
                    label={"Other Contacts"}
                  />
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </ErrorBoundary>
      </div>
    );
  }
}

export default ContactIndex;
