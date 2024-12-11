import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
export default function Modals({ isShow, handleClose, item, handleDeleteGig }) {
  return (
    <>
      <Modal show={isShow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Gig</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You sure want delete gig :{" "}
          <span style={{ color: "red" }}>{item?.title}</span>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleDeleteGig}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
