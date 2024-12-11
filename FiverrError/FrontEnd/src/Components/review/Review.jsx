import React from "react";
import "./Review.scss";
import newRequest from "../../utils/newRequest";
import { useQuery } from "@tanstack/react-query";
export default function Review({ item }) {
  const { isLoading, error, data } = useQuery({
    queryKey: ["userReview", item.userId],
    queryFn: async () => {
      try {
        const res = await newRequest.get(`users/${item.userId}`);
        return res.data; // Đảm bảo trả về data từ API
      } catch (error) {
        throw error; // Throw error nếu có lỗi
      }
    },
  });

  return (
    <div className="review">
      <div className="user">
        <img className="pp" src={data?.img || "/img/user.jpg"} alt="" />
        <div className="info">
          <span>{data?.username}</span>
          <div className="country">
            <img
              src="https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png"
              alt=""
            />
            <span> {data?.country}</span>
          </div>
        </div>
      </div>
      <div className="stars">
        <img src="/img/star.png" alt="" />
        <img src="/img/star.png" alt="" />
        <img src="/img/star.png" alt="" />
        <img src="/img/star.png" alt="" />
        <img src="/img/star.png" alt="" />
        <span>{item.star}</span>
      </div>
      <p>{item.desc}</p>
      <div className="helpful">
        <span>Helpful?</span>
        <img src="/img/like.png" alt="" />
        <span>Yes</span>
        <img src="/img/dislike.png" alt="" />
        <span>No</span>
      </div>
    </div>
  );
}
