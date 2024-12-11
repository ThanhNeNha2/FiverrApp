import React from "react";
import { Link } from "react-router-dom";
import "./GigCard.scss";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
export default function GigCard({ item }) {
  const { isPending, error, data } = useQuery({
    queryKey: [item.userId],
    queryFn: () => {
      return newRequest
        .get(`users/${item.userId}`) // Thêm min và max vào URL
        .then((res) => res.data)
        .catch((error) => {
          throw error;
        });
    },
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  console.log(data);

  return (
    <Link to={`/gig/${item._id}`} className="link">
      <div className="gigCard">
        <img src={item.cover} alt="" />
        <div className="info">
          <div className="user">
            <img src={data.img} alt="" />
            <span>{data.username}</span>
          </div>
          <p>{item.desc}</p>
          <div className="star">
            <img src="./img/star.png" alt="llll" />
            <span>
              {!isNaN(item.totalStars / item.starNumber)
                ? Math.round(item.totalStars / item.starNumber)
                : "0"}
            </span>
          </div>
          <hr />
          <div className="detail">
            <img src="./img/heart.png" alt="" />
            <div className="price">
              <span>STARTING AT</span>
              <h2>$ {item.price}</h2>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
