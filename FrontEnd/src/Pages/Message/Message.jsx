import React, { useState } from "react";
import "./Message.scss";
import { Link, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
export default function Message() {
  // GET TỪNG TIN NHẮN

  const { id } = useParams();
  console.log(id);
  const { isLoading, error, data } = useQuery({
    queryKey: ["messages", id],
    queryFn: () =>
      newRequest.get(`/messages/${id}`).then((res) => {
        return res.data;
      }),
  });
  console.log(data);

  // GET NGƯỜI DÙNG

  const mesIdUser = data && data[0].userId;
  const {
    isLoading: isLoadingUser,
    errorUser,
    data: dataUser,
  } = useQuery({
    queryKey: ["messageUser", mesIdUser],
    queryFn: () =>
      newRequest.get(`/users/${mesIdUser}`).then((res) => {
        return res.data;
      }),
    enabled: !!mesIdUser,
  });
  console.log(dataUser);

  // TẠO TIN NHẮN MỚI

  const userIdMess = JSON.parse(localStorage.getItem("currentUser"));
  console.log(userIdMess);

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (info) => {
      try {
        const res = await newRequest.post("messages", info);
        return res;
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries("messages");
    },
  });

  // Nút chọn tạo mess

  const [infoMess, setInfoMess] = useState("");
  const handleCreateMess = () => {
    mutation.mutate({
      conversationId: id,
      userId: userIdMess,
      desc: infoMess,
    });
  };
  return (
    <div className="message">
      <div className="container">
        <span className="breadcrumbs">
          <Link to="/messages">Messages</Link> {">"} John Doe {">"}
        </span>
        <div className="messages">
          {data &&
            data.map((item, index) => (
              <div
                className={
                  item?.userId == userIdMess._id ? "item owner" : "item"
                }
                key={index}
              >
                <img
                  src={(dataUser && dataUser.img) || "/img/user.jpg"}
                  alt=""
                />
                <p>{item?.desc}</p>
              </div>
            ))}
        </div>
        <hr />
        <div className="write">
          <textarea
            type="text"
            placeholder="write a message"
            onChange={(e) => setInfoMess(e.target.value)}
          />
          <button onClick={() => handleCreateMess()}>Send</button>
        </div>
      </div>
    </div>
  );
}
