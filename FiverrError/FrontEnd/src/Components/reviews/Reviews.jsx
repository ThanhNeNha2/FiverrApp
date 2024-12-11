import React, { useState } from "react";
import "./Reviews.scss";
import Review from "../review/Review";
import newRequest from "../../utils/newRequest";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
export default function Reviews({ gigId }) {
  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery({
    queryKey: ["review"],
    queryFn: async () => {
      try {
        const res = await newRequest.get(`reviews/${gigId}`);
        return res.data; // Đảm bảo trả về data từ API
      } catch (error) {
        throw error; // Throw error nếu có lỗi
      }
    },
  });
  const mutation = useMutation({
    mutationFn: async (info) => {
      try {
        const res = await newRequest.post("reviews", info);
        return res;
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries("review");
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();

    const desc = e.target[0].value;
    const star = +e.target[1].value;
    mutation.mutate({ gigId, desc, star });
  };

  return (
    <div className="reviews">
      <h2>Reviews</h2>

      {data && data.map((item, index) => <Review key={index} item={item} />)}
      <div className="add">
        <h3>Add a review</h3>
        <form action="" className="addForm" onSubmit={(e) => handleSubmit(e)}>
          <input type="text" placeholder="write your opinion" />
          <select name="" id="">
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
          <button>Send</button>
        </form>
      </div>
    </div>
  );
}
