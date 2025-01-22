import React from "react";
import "./Orders.scss";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
const Orders = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  console.log(currentUser);
  const navigate = useNavigate();
  const { isLoading, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      newRequest.get(`orders`).then((res) => {
        return res.data;
      }),
  });
  console.log(data);

  // ẤN VÀO NÚT TIN NHẮN NẾU CHƯA CÓ TIN NHẮN THÌ TẠO

  const handleContact = async (order) => {
    const buyerId = order.buyerId;
    const sellerId = order.sellerId;
    const id = sellerId + buyerId;
    try {
      const res = await newRequest.get(`/conversations/single/${id}`);
      navigate(`/message/${res.data.id}`);
    } catch (error) {
      if (error.response.status === 404) {
        const res = await newRequest.post(`/conversations`, {
          to: currentUser.seller ? buyerId : sellerId,
        });

        navigate(`/message/${res.data.id}`);
      }
    }
  };
  return (
    <div className="orders">
      <div className="container">
        <div className="title">
          <h1>Orders</h1>
        </div>
        <table>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>

            <th>Contact</th>
          </tr>
          {data &&
            data.map((order, index) => (
              <tr key={index}>
                <td>
                  <img
                    className="image"
                    src={order?.img || "/img/imgerror.webp"}
                    alt=""
                  />
                </td>
                <td>{order?.title}</td>
                <td>{order?.price} $</td>

                <td>
                  <img
                    className="message"
                    src="./img/message.png"
                    alt=""
                    onClick={() => handleContact(order)}
                  />
                </td>
              </tr>
            ))}
        </table>
      </div>
    </div>
  );
};

export default Orders;
