import React from "react";

class AddContact extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errorMessage: undefined,
      successMessage: undefined,
    };
  }

  handleAddContactFormSubmit = (e) => {
    //do not submit the form
    e.preventDefault();

    const contact = {
      name: e.target.elements.contactName.value.trim(),
      email: e.target.elements.contactEmail.value.trim(),
      phone: e.target.elements.contactPhone.value.trim(),
      isFavorite: false,
    };

    this.props.handleAddContact(contact);
  };

  render() {
    return (
      <div>
        <div className="border col-12 text-white p-2">
          <form onSubmit={this.handleAddContactFormSubmit}>
            <div className="row p-2">
              <div className="col-12 text-white-50">Add a New Contact</div>
              <div className="col-12 col-md-4 p-1">
                <input
                  className="form-control form-control-sm"
                  type="text"
                  placeholder="Name.."
                  name="contactName"
                ></input>
              </div>
              <div className="col-12 col-md-4 p-1">
                <input
                  className="form-control form-control-sm"
                  type="text"
                  placeholder="Email.."
                  name="contactEmail"
                ></input>
              </div>
              <div className="col-12 col-md-4 p-1">
                <input
                  className="form-control form-control-sm"
                  type="text"
                  placeholder="Phone Number.."
                  name="contactPhone"
                ></input>
              </div>
              <div className="col-12 col-md-6 offset-md-3 p-1">
                <button className="btn btn-primary btn-sm form-control">
                  Create Contact
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default AddContact;
