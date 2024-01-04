import CallContacts from "./call-contacts";

const SharedContacts = (props) => {
  return (
    <div
      className="col-12 py-2"
      style={{ borderRadius: "10px", backgroundColor: "#323637" }}
    >
      <div className="text-center text-white-50">{props.label}</div>
      <div className="p-2">{CallContacts(props)}</div>
    </div>
  );
};

export default SharedContacts;
