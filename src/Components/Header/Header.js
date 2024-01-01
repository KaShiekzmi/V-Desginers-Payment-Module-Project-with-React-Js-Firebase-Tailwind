import React from "react";
import logo from "./logo.png";
import { Link } from "react-router-dom";

const Header = (props) => {
  return (
    <>
      <header className="text-gray-600 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <img src={logo} style={{ width: "30px" }}></img>
            <span className="ml-3 text-xl">{props.logo}</span>
          </a>
          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
            <Link to="./pricing">
              <a className="mr-5 hover:text-gray-900">Pricing</a>
            </Link>
          </nav>
          <Link to="./transactions">
          <button className="inline-flex text-white items-center bg-blue-500 border-0 py-1 px-3 focus:outline-none hover:bg-blue-600 rounded mt-4 md:mt-0">
            View Transactions
          </button>
          </Link>
        </div>
      </header>
    </>
  );
};

export default Header;
