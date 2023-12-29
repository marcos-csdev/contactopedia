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

  handleAddContact = (newContact) => {
    let contactLength = this.state.contactList.length;
    newContact.id = contactLength + 1;
    this.setState((prevState) => {
      return {
        contactList: prevState.contactList.concat([newContact]),
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
                />
              </div>
            </div>
            <div className="row py-2">
              <div className="col-8 offset-2 row">
                <GeneralContacts
                  contacts={this.state.contactList.filter(
                    (contact) => contact.isFavorite === false
                  )}
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
