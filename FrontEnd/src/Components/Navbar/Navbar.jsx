import React, { useEffect, useState } from "react";
import "./Navbar.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";
const Navbar = () => {
  const [active, setActive] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };
  const navigator = useNavigate();
  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const handleLogout = async () => {
    try {
      await newRequest.post("auth/logout");
      localStorage.setItem("currentUser", null);
      navigator("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={
        active || location.pathname !== "/" ? "navbar active" : "navbar"
      }
    >
      <div className="container">
        <div className="logo">
          <Link to={"/"} className="link">
            <span className="text"> fiverr</span>
          </Link>
          <span className="dot"> .</span>
        </div>
        <div className="links">
          <span> Fiverr Business</span>
          <span> Explore</span>
          <span> English</span>

          {!currentUser?.isSeller && (
            <>
              <span> Become a Seller</span>
              {/* <button> Join</button> */}
            </>
          )}
          {currentUser ? (
            <div className="user" onClick={() => setIsOpen(!isOpen)}>
              <img
                src={
                  currentUser.img ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIn-gE6j6sjvg0ekFgFBIzVP5VdN3aBu9dLg&s"
                }
              />
              <span>{currentUser.username}</span>
              {isOpen && (
                <div className="option">
                  {currentUser?.isSeller && (
                    <>
                      <Link className="link " to={"/mygigs"}>
                        Gigs
                      </Link>
                      <Link className="link " to={"/add"}>
                        Add New Gig
                      </Link>
                    </>
                  )}
                  <Link className="link " to={"/orders"}>
                    Orders
                  </Link>
                  <Link className="link " to={"/messages"}>
                    Messages
                  </Link>
                  <Link className="link " onClick={handleLogout}>
                    Logout
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="link">
                Sign in
              </Link>

              <Link className="link" to="/register">
                <button>Join</button>
              </Link>
            </>
          )}
        </div>
      </div>
      {(location.pathname !== "/" || active) && (
        <>
          <hr />
          <div className="menu">
            <Link className="link menuLink" to={"/"}>
              Graphics @ Design
            </Link>
            <Link className="link  " to={"/"}>
              Video & Animation
            </Link>
            <Link className="link  " to={"/"}>
              Writing & Translation
            </Link>
            <Link className="link  " to={"/"}>
              AI Services
            </Link>
            <Link className="link  " to={"/"}>
              Digital Marketing
            </Link>
            <Link className="link  " to={"/"}>
              Music & Audio
            </Link>
            <Link className="link  " to={"/"}>
              Business
            </Link>
            <Link className="link  " to={"/"}>
              Lifestyle
            </Link>
          </div>
          <hr />
        </>
      )}
    </div>
  );
};

export default Navbar;
