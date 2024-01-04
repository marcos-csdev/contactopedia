import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class EditContact extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errorMessage: undefined,
      successMessage: undefined,
    };

    this.contactName = React.createRef();
    this.contactEmail = React.createRef();
    this.contactPhone = React.createRef();
  }

  componentDidMount() {
    this.contactName.current.value = this.props.contact.name;
    this.contactEmail.current.value = this.props.contact.email;
    this.contactPhone.current.value = this.props.contact.phone;
  }

  handleCancel = () => {
    document.querySelector(".edit-contact-form").reset();
    this.props.cancelEditContact();
  };

  createContact(e) {
    const updatedContact = {
      id: this.props.contact.id,
      name: e.target.elements.contactName.value.trim(),
      phone: e.target.elements.contactPhone.value.trim(),
      email: e.target.elements.contactEmail.value.trim(),
      isFavorite: this.props.contact.isFavorite,
    };

    return updatedContact;
  }

  handleEditContactFormSubmit = (e) => {
    e.preventDefault();

    const updatedContact = this.createContact(e);

    //takes the return from the handleEditContact function at contact-index component
    const response = this.props.editContact(updatedContact);

    if (response.status === "success") {
      this.setState({ errorMessage: undefined, successMessage: response.msg });
      document.querySelector(".edit-contact-form").reset();
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
            onSubmit={this.handleEditContactFormSubmit}
            className="edit-contact-form"
          >
            <div className="row p-2">
              <div className="col-12 text-white-50">Edit Contact</div>
              <div className="col-12 col-md-4 p-1">
                <input
                  className="form-control form-control-sm"
                  type="text"
                  placeholder="Name.."
                  name="contactName"
                  ref={this.contactName}
                ></input>
              </div>

              <div className="col-12 col-md-4 p-1">
                <input
                  className="form-control form-control-sm"
                  type="text"
                  placeholder="Email.."
                  name="contactEmail"
                  ref={this.contactEmail}
                ></input>
              </div>
              <div className="col-12 col-md-4 p-1">
                <input
                  className="form-control form-control-sm"
                  type="text"
                  placeholder="Phone Number.."
                  name="contactPhone"
                  ref={this.contactPhone}
                ></input>
              </div>
              <ToastContainer />

              <div className="col-12 row">
                <div className="col-md-6 p-1">
                  <button className="btn btn-primary btn-sm form-control">
                    Edit Contact
                  </button>
                </div>

                <div className="col-md-6 p-1">
                  <button
                    className="btn btn-danger btn-sm form-control"
                    onClick={this.handleCancel}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default EditContact;
