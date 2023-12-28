const AddContact = () => {
  return (
    <div>
      <div className="border row text-white p-2">
        <div className="col-12 text-white-50">Add a New Contact</div>
        <div className="col-12 col-md-4 p-1">
          <input
            className="form-control form-control-sm"
            type="text"
            placeholder="Name.."
          ></input>
        </div>
        <div className="col-12 col-md-4 p-1">
          <input
            className="form-control form-control-sm"
            type="text"
            placeholder="Email.."
          ></input>
        </div>
        <div className="col-12 col-md-4 p-1">
          <input
            className="form-control form-control-sm"
            type="text"
            placeholder="Phone Number.."
          ></input>
        </div>
        <div className="col-12 col-md-6 offset-md-3 p-1">
          <button className="btn btn-primary btn-sm form-control">
            Create Contact
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddContact;
