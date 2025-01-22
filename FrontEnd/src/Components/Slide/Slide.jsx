import React from "react";
import "./Slide.scss";
import Slider from "infinite-react-carousel";
import PropTypes from "prop-types";

function Slide({ children, slidesToShow, arrowsScroll }) {
  return (
    <div className="slide">
      <div className="container">
        <Slider slidesToShow={slidesToShow} arrowsScroll={arrowsScroll}>
          {children}
        </Slider>
      </div>
    </div>
  );
}

Slide.propTypes = {
  children: PropTypes.node.isRequired,
  slidesToShow: PropTypes.number.isRequired,
  arrowsScroll: PropTypes.number.isRequired,
};

export default Slide;
