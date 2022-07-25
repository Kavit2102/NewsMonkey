import React, { useState } from "react";
import { Link } from "react-router-dom";

const NavBar = (props) => {
  // eslint-disable-next-line no-unused-vars
  const [Display, setDisplay] = useState("hidden");
  // eslint-disable-next-line no-unused-vars
  const [Top, setTop] = useState(-80);

  const changeTheme = () => {
    if (props.Theme === "light") {
      props.setTheme("dark");
      props.setText("light");
      props.setBorder("light");
      props.setShadow("white");
    } else {
      props.setTheme("light");
      props.setText("dark");
      props.setBorder("dark");
      props.setShadow("black");
    }
  };

  return (
    <div
      id="navbar"
      className={`p-3 sticky top-0 z-10 shadow-md shadow-${props.Shadow} flex justify-between items-center bg-${props.Theme} text-${props.Text}`}
    >
      <div id="logo" className="flex items-center gap-2">
        <img src="/monkey.png" className="h-10" alt="" />
        <h1 className="text-2xl lg:text-3xl font-semibold">NewsMonkey</h1>
      </div>

      <nav id="navlinks" className={`${Display} lg:block`}>
        <ul
          className={`absolute right-0 -top-[${Top}px] lg:relative text-base flex flex-col lg:flex-row items-center gap-3`}
        >
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/business">Business</Link>
          </li>
          <li>
            <Link to="/entertainment">Entertaiment</Link>
          </li>
          <li>
            <Link to="/general">General</Link>
          </li>
          <li>
            <Link to="/health">Health</Link>
          </li>
          <li>
            <Link to="/sports">Sports</Link>
          </li>
          <li>
            <Link to="/technology">Technology</Link>
          </li>
          <li>
            <button onClick={changeTheme}>
              {props.Theme === "light" ? (
                <i className="bx bxs-moon"></i>
              ) : (
                <i className="bx bxs-sun"></i>
              )}
            </button>
          </li>
        </ul>
      </nav>

      <div
        id="menu-bar"
        className="block lg:hidden text-3xl"
        // eslint-disable-next-line no-undef
        // onClick={changeDisplay}
      >
        <i className="bx bx-menu"></i>
      </div>
    </div>
  );
};

export default NavBar;
