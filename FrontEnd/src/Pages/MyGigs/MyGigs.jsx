import React, { useState } from "react";
import "./MyGigs.scss";
import { Link } from "react-router-dom";
import getCurrentUser from "../../utils/getCurrentUser";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import Modals from "../../Components/Modals/Modals";
import toast from "react-hot-toast";

const MyGigs = () => {
  const [isShow, setIsShow] = useState(false);
  const handleShow = () => setIsShow(true);
  const handleClose = () => setIsShow(false);

  //  Other
  const currentUser = getCurrentUser();
  const queryClient = useQueryClient();

  const { isPending, error, data } = useQuery({
    queryKey: ["MyGigs"],
    queryFn: () => {
      return newRequest
        .get(`gigs?userId=${currentUser._id}`) // Thêm min và max vào URL
        .then((res) => res.data)
        .catch((error) => {
          throw error;
        });
    },
  });

  const mutation = useMutation({
    mutationFn: async (id) => {
      try {
        const res = await newRequest.delete(`gigs/${id}`);
        return res;
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries("MyGigs");
    },
  });

  const handleDeleteGig = (id) => {
    console.log(id);

    mutation.mutate(id);

    handleClose();
  };

  if (isPending) return "Loading...";
  return (
    <div className="myGigs">
      <div className="container">
        <div className="title">
          <h1>{currentUser.isSeller ? "Gigs" : "Orders"}</h1>
          {currentUser.isSeller && (
            <Link to="/add">
              <button>Add New Gig</button>
            </Link>
          )}
        </div>
        <table>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>Sales</th>
            <th>Action</th>
          </tr>

          {data &&
            data.map((item, index) => (
              <tr key={index}>
                <td>
                  <img className="image" src={item?.cover} alt="" />
                </td>
                <td>{item.shortTitle}</td>
                <td>
                  {item.price}.<sup>99</sup>
                </td>
                <td>{item.sales}</td>
                <td>
                  <img
                    className="delete"
                    src="./img/delete.png"
                    alt=""
                    onClick={handleShow}
                  />
                </td>
                <Modals
                  isShow={isShow}
                  handleClose={handleClose}
                  item={item}
                  handleDeleteGig={() => handleDeleteGig(item._id)}
                />
              </tr>
            ))}
        </table>
      </div>
    </div>
  );
};

export default MyGigs;
