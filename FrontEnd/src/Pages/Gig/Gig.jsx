import React from "react";

import "./Gig.scss";
import { Slider } from "infinite-react-carousel";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import Reviews from "../../Components/reviews/Reviews";
export default function Gig() {
  const { id } = useParams();
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  // GET ONE GIG
  const {
    isLoading: isLoadingGig,
    error: errorGig,
    data: dataGig,
  } = useQuery({
    queryKey: ["gig", id],
    queryFn: async () => {
      await delay(1000);
      try {
        const res = await newRequest.get(`gigs/single/${id}`);
        return res.data; // Đảm bảo trả về data từ API
      } catch (error) {
        throw error; // Throw error nếu có lỗi
      }
    },
  });

  // Lấy userId ngay cả khi dataGig chưa có
  const userId = dataGig?.userId || null;

  // GET ONE USER (hook này sẽ luôn được gọi nhưng chỉ truy vấn khi có userId)
  const {
    isLoading: isLoadingUser,
    error: errorUser,
    data: dataUser,
  } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => newRequest.get(`/users/${userId}`).then((res) => res.data),
    enabled: !!userId, // Chỉ kích hoạt truy vấn khi userId có giá trị
  });

  // Handle loading states
  if (isLoadingGig || isLoadingUser) return "Loading...";

  // Handle errors
  if (errorGig) return `An error occurred with the gig: ${errorGig.message}`;
  if (errorUser) return `An error occurred with the user: ${errorUser.message}`;

  const star =
    dataGig && isNaN(dataGig.totalStars / dataGig.starNumber)
      ? 0
      : Math.round(dataGig.totalStars / dataGig.starNumber);
  return (
    <div className="gig">
      {isLoadingGig ? (
        <div className="loadingQuery">hahah</div>
      ) : errorGig ? (
        "Wrong "
      ) : (
        <>
          <div className="container">
            <div className="left">
              <span className="breadCrumbs">
                Fiverr {">"} Graphics & Design {">"}
              </span>
              <h1> {dataGig.title}</h1>
              <div className="user">
                <img
                  className="pp"
                  src={dataUser.img || "/img/user.jpg"}
                  alt=""
                />
                <span> {dataUser.username} </span>
                <div className="stars">
                  {star > 0 ? (
                    Array.from({ length: star }).map((_, index) => (
                      <img
                        key={index}
                        src="/img/star.png"
                        alt={`star-${index}`}
                      />
                    ))
                  ) : (
                    <img src="/img/star.png" alt="star-0" />
                  )}

                  <span> {star} </span>
                </div>
              </div>
              <Slider slidesToShow={1} arrowsScroll={1} className="slider">
                {dataGig &&
                Array.isArray(dataGig.images) &&
                dataGig.images.length > 0 ? (
                  dataGig.images.map((imgGig, index) => (
                    <img src={imgGig} alt={`image-${index}`} key={index} />
                  ))
                ) : (
                  <img src="/img/imgerror.webp" alt="star-0" />
                )}
              </Slider>
              <h2>About This Gig</h2>
              <p>{dataGig.desc}</p>
              <div className="seller">
                <h2>About The Seller</h2>
                <div className="user">
                  <img
                    className="pp"
                    src={dataUser.img || "/img/user.jpg"}
                    alt=""
                  />
                  <div className="info">
                    <span> {dataUser.username}</span>
                    <div className="stars">
                      <img src="/img/star.png" alt="" />
                      <img src="/img/star.png" alt="" />
                      <img src="/img/star.png" alt="" />
                      <img src="/img/star.png" alt="" />
                      <img src="/img/star.png" alt="" />
                      <span>5</span>
                    </div>
                    <button> Contact Me </button>
                  </div>
                </div>
                <div className="box">
                  <div className="items">
                    <div className="item">
                      <span className="title">From</span>
                      <span className="desc"> {dataUser.country}</span>
                    </div>
                    <div className="item">
                      <span className="title">Member since</span>
                      <span className="desc">Aug 2022</span>
                    </div>
                    <div className="item">
                      <span className="title">Avg. response time</span>
                      <span className="desc">4 hours</span>
                    </div>
                    <div className="item">
                      <span className="title">Last delivery</span>
                      <span className="desc">1 day</span>
                    </div>
                    <div className="item">
                      <span className="title">Languages</span>
                      <span className="desc">English</span>
                    </div>
                  </div>
                  <hr />
                  <p>{dataUser?.desc ? dataUser?.desc : " Loading ...."}</p>
                </div>
              </div>

              {/* THONG TIN REVIEWS CUA SAN PHAM  */}
              <Reviews gigId={id} />
            </div>
            <div className="right">
              <div className="price">
                <h3> {dataGig.shortTitle} </h3>
                <h2> ${dataGig.price}</h2>
              </div>
              <p>{dataGig.shortDesc}</p>
              <div className="details">
                <div className="item">
                  <img src="/img/clock.png" alt="" />
                  <span>{dataGig.deliveryTime} Days Delivery</span>
                </div>
                <div className="item">
                  <img src="/img/recycle.png" alt="" />
                  <span>{dataGig.revisionNumber} Revisions</span>
                </div>
              </div>
              <div className="features">
                {dataGig && dataGig.features.length > 0 ? (
                  dataGig.features.map((features, index) => (
                    <div className="item" key={index}>
                      <img src="/img/greencheck.png" alt="" />
                      <span>{features}</span>
                    </div>
                  ))
                ) : (
                  <div className="item">
                    <img src="/img/load.png" alt="" />
                    <span> will update soon </span>
                  </div>
                )}
              </div>
              <Link to={`/pay/${id}`}>
                <button>Continue</button>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
