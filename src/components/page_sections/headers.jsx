import logo from "../../images/react.png";

const MainHeader = () => {
  return (
    <div className="pt-3 pl-2" style={{ backgroundColor: "black" }}>
      {/* when working within the src folder, the import statement must be used, otherwise it wont work  */}
      <img
        src={logo}
        alt=""
        style={{ height: "35px", verticalAlign: "top" }}
      ></img>
      <span className="h2 pt-4 text-white-50">ContactOpedia</span>
    </div>
  );
};

export default MainHeader;
