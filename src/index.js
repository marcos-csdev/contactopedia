import React from "react";
import ReactDOM from "react-dom/client";
import Body from "./components/pageSections/Body";
import Header from "./components/pageSections/Headers";

const header = ReactDOM.createRoot(document.getElementById("header"));
const root = ReactDOM.createRoot(document.getElementById("root"));

header.render(<Header />);
root.render(<Body />);
