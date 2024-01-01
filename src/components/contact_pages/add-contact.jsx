import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class AddContact extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errorMessage: undefined,
      successMessage: undefined,
    };
  }

  createContact = (e) => {
    const contact = {
      name: e.target.elements.contactName.value.trim(),
      email: e.target.elements.contactEmail.value.trim(),
      phone: e.target.elements.contactPhone.value.trim(),
      isFavorite: false,
    };

    return contact;
  };

  handleAddContactFormSubmit = (e) => {
    //do not submit the form
    e.preventDefault();

    const contact = this.createContact(e);

    const response = this.props.handleAddContact(contact);

    if (response.status === "success") {
      this.setState({ errorMessage: undefined, successMessage: response.msg });
      document.querySelector(".contact-form").reset();
      toast.success(response.msg, "Success");
    } else {
      this.setState({ errorMessage: response.msg, successMessage: undefined });
      toast.error(response.msg, "Error");
    }
  };

  render() {
    return (
      <div>
        <div className="border col-12 text-white p-2">
          <form
            onSubmit={this.handleAddContactFormSubmit}
            className="contact-form"
          >
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
              <ToastContainer />

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
