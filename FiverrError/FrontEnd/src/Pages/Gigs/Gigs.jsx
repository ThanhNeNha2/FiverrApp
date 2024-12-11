import React, { useEffect, useRef, useState } from "react";
import "./Gigs.scss";

import GigCard from "../../Components/GigCard/GigCard";
import newRequest from "../../utils/newRequest";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";

export default function Gigs() {
  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState("sales");
  const minRef = useRef(null);
  const maxRef = useRef(null);

  const { search } = useLocation();

  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["gigs", search, sort],
    queryFn: () => {
      const min = minRef?.current ? +minRef?.current?.value : 0; // Lấy giá trị từ input, nếu không có giá trị thì dùng 0
      const max = maxRef?.current ? +maxRef?.current?.value : 1000000; // Tương tự với max
      return newRequest
        .get(
          `gigs${search}&min=${min}&max=${max == 0 ? 1000 : max}&sort=${sort}`
        ) // Thêm min và max vào URL
        .then((res) => res.data)
        .catch((error) => {
          throw error;
        });
    },
    enabled: !!search,
  });

  if (isPending) return "Loading...";

  const reSort = (type) => {
    setSort(type);
    setOpen(false);
  };

  const apply = () => {
    refetch();
  };

  return (
    <div className="gigs">
      <div className="container">
        <span className="breadcrumbs">
          Liverr {">"} Graphics & Design {">"}{" "}
        </span>
        <h1>AI Artists</h1>
        <p>
          Explore the boundaries of art and technology with Liverr's AI artists
        </p>
        <div className="menu">
          <div className="left">
            <span>Budget</span>
            <input ref={minRef} type="number" placeholder="min" />
            <input ref={maxRef} type="number" placeholder="max" />
            <button onClick={apply}>Apply</button>
          </div>
          <div className="right">
            <span className="sortBy">Sort by</span>
            <span className="sortType">
              {sort === "sales" ? "Best Selling" : "Newest"}
            </span>
            <img src="./img/down.png" alt="" onClick={() => setOpen(!open)} />
            {open && (
              <div className="rightMenu">
                {sort === "sales" ? (
                  <span
                    onClick={() => {
                      reSort("createdAt");
                    }}
                  >
                    Newest
                  </span>
                ) : (
                  <span
                    onClick={() => {
                      reSort("sales");
                    }}
                  >
                    Best Selling
                  </span>
                )}
                <span onClick={() => reSort("sales")}>Popular</span>
              </div>
            )}
          </div>
        </div>
        <div className="cards">
          {isPending
            ? "loading"
            : error
            ? " Something went wrong!"
            : data.map((gig) => <GigCard key={gig._id} item={gig} />)}
        </div>
      </div>
    </div>
  );
}
