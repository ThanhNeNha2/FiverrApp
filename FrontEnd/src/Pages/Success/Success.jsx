import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";

export default function Success() {
  const { search } = useLocation();
  console.log("check search ", search);

  const navigate = useNavigate();
  const params = new URLSearchParams(search);
  console.log("Check params ", params);
  const payment_intent = params.get("payment_intent");
  console.log(" check payment_intent ", payment_intent);

  useEffect(() => {
    const makeRequest = async () => {
      try {
        await newRequest.put("/orders", { payment_intent });
        setTimeout(() => {
          navigate("/orders");
        }, 5000);
      } catch (err) {
        console.log(err);
      }
    };

    makeRequest();
  }, []);

  return (
    <div>
      {" "}
      Payment successful. You are being redirected to the orders page. Please do
      not close the page
    </div>
  );
}
