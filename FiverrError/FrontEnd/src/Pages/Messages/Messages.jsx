import React from "react";
import { Link } from "react-router-dom";
import "./Messages.scss";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import moment from "moment";

const Messages = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["conversations"],
    queryFn: () =>
      newRequest.get(`/conversations`).then((res) => {
        return res.data[0];
      }),
  });
  console.log(data);

  const mutation = useMutation({
    mutationFn: async (id) => {
      try {
        const res = await newRequest.put(`conversations/${id}`);
        return res;
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries("conversations");
    },
  });
  const handleRead = (id) => {
    mutation.mutate(id);
  };

  return (
    <div className="messages">
      <div className="container">
        <div className="title">
          <h1>Messages</h1>
        </div>
        <table>
          <tr>
            <th>{currentUser.isSeller ? "Buyer" : "Seller"}</th>
            <th>Last Message</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
          <tr
            className={
              ((currentUser.isSeller && !data?.readBySeller) ||
                (!currentUser.isSeller && !data?.readByBuyer)) &&
              "active"
            }
          >
            <td>{currentUser.isSeller ? data?.buyerId : data?.sellerId}</td>
            <td>
              <Link to={`/message/${data?.id}`} className="link">
                {data?.lastMessage?.substring(0, 100)}...
              </Link>
            </td>
            <td>{moment(data?.updatedAt).fromNow()}</td>
            <td>
              {((currentUser.isSeller && !data?.readBySeller) ||
                (!currentUser.isSeller && !data?.readByBuyer)) && (
                <button
                  onClick={() => {
                    handleRead(data?.id);
                  }}
                >
                  Mark as Read
                </button>
              )}
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default Messages;
