import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import "./Register.scss";
import upload from "../../utils/upload";

import Spinner from "react-bootstrap/Spinner";
import toast from "react-hot-toast";
export default function Register() {
  const [file, setFile] = useState(null);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    img: "",
    country: "",
    isSeller: false,
    desc: "",
    phone: "",
  });

  const [passConfirm, setPassConfirm] = useState("");
  const [checkLoading, setCheckLoading] = useState(false);

  const navigate = useNavigate();
  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleSeller = (e) => {
    setUser((prev) => {
      return { ...prev, isSeller: e.target.checked };
    });
  };
  const handleFile = (e) => {
    console.log(e);

    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      user.username &&
      user.email &&
      file &&
      user.country &&
      user.phone &&
      user.desc &&
      user.password &&
      passConfirm
    ) {
      if (user.password.length < 6) {
        toast.error("Password less than 6 characters !");
      } else {
        if (user.password === passConfirm) {
          setCheckLoading(true);
          const url = await upload(file);
          try {
            await newRequest.post("/auth/register", {
              ...user,
              img: url,
            });
            navigate("/login");
          } catch (err) {
            console.log(err);
          }
        } else {
          toast.error("passConfirm Wrong !");
        }
      }
    } else {
      toast.error("Please enter complete information");
    }
  };
  return (
    <div className="backgroundRegister">
      <div className="register">
        <form onSubmit={handleSubmit}>
          <div className="left">
            <h1>Create a new account</h1>
            <label htmlFor="">Username</label>
            <input
              name="username"
              type="text"
              placeholder="Enter username"
              onChange={handleChange}
            />
            <label htmlFor="">Email</label>
            <input
              name="email"
              type="email"
              placeholder=" Enter email"
              onChange={handleChange}
            />
            <label htmlFor="">Password</label>
            <input
              name="password"
              placeholder="
Enter password"
              type="password"
              onChange={handleChange}
            />

            <label htmlFor="">Confirm Password</label>
            <input
              name="password"
              placeholder="
Enter Confirm password"
              type="password"
              onChange={(e) => setPassConfirm(e.target.value)}
            />

            <label htmlFor="">Profile Picture</label>
            <input type="file" onChange={handleFile} />
            <label htmlFor="">Country</label>
            <input
              name="country"
              type="text"
              placeholder="Usa"
              onChange={handleChange}
            />
            <button type="submit">
              {checkLoading ? <Spinner animation="border" /> : "Register"}
            </button>
          </div>
          <div className="right">
            <h1>I want to become a seller</h1>
            <div className="toggle">
              <label htmlFor="">Activate the seller account</label>
              <label className="switch">
                <input type="checkbox" onChange={handleSeller} />
                <span className="slider round"></span>
              </label>
            </div>
            <label htmlFor="">Phone Number</label>
            <input
              name="phone"
              type="text"
              placeholder="+1 234 567 89"
              onChange={handleChange}
            />
            <label htmlFor="">Description</label>
            <textarea
              placeholder="A short description of yourself"
              name="desc"
              id=""
              cols="30"
              rows="10"
              onChange={handleChange}
            ></textarea>
          </div>
        </form>
      </div>
    </div>
  );
}
