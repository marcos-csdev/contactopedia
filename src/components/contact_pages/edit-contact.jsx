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

  handleEditContactFormSubmit = (e) => {
    e.preventDefault();

    //takes the return from the handleEditContact function at contact-index component
    const response = this.props.handleEditContact(this.props.contact);

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
                  <button className="btn btn-danger btn-sm form-control">
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
