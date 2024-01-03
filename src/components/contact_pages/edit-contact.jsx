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
  }

  handleEditContactFormSubmit = (e) => {
    e.preventDefault();

    //const contact = this.getContact(e);

    //takes the return from the handleEditContact function at contact-index
    const response = this.props.handleEditContact(this.props.contact);

    if (response.status === "success") {
      this.setState({ errorMessage: undefined, successMessage: response.msg });
      document.querySelector(".edit-contact-form").reset();
      toast.success(response.msg, "Success");
    } else {
      this.setState({ errorMessage: response.msg, successMessage: undefined });
      toast.error(response.msg, "Error");
    }
    document.getElementById("add-contact-div").style.visibility = "block";
    document.getElementById("edit-contact-div").style.visibility = "none";
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
                  value={this.props.contact.name}
                ></input>
              </div>

              <div className="col-12 col-md-4 p-1">
                <input
                  className="form-control form-control-sm"
                  type="text"
                  placeholder="Email.."
                  name="contactEmail"
                  value={this.props.contact.email}
                ></input>
              </div>
              <div className="col-12 col-md-4 p-1">
                <input
                  className="form-control form-control-sm"
                  type="text"
                  placeholder="Phone Number.."
                  name="contactPhone"
                  value={this.props.contact.phone}
                ></input>
              </div>
              <ToastContainer />

              <div className="col-12 col-md-6 offset-md-3 p-1">
                <button className="btn btn-primary btn-sm form-control">
                  Edit Contact
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default EditContact;
