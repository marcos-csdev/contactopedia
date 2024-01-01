import { getRandomAxiosUser } from "../../utility/axios-api";

const getRandomContact = async (props) => {
  const apiResponse = await getRandomAxiosUser();

  const randomContact = {
    name: `${apiResponse.data.first_name} ${apiResponse.data.last_name}`,
    email: apiResponse.data.email,
    phone: apiResponse.data.phone_number,
    isFavorite: false,
  };

  return props.handleAddRandomContact(randomContact);
};

const AddRandomContact = (props) => {
  return (
    <div>
      <button
        className="btn btn-success form-control"
        onClick={() => getRandomContact(props)}
      >
        Add Random Contact
      </button>
    </div>
  );
};

export default AddRandomContact;
