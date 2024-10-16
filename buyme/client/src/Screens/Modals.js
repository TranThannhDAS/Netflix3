import React from "react";
import "./Modal.css";

const Modal = ({ isOpen, closeModal }) => {
  return (
    <>
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2>Bạn không thể xem được video này</h2>
            <p>Vui lòng đăng ký để tiếp tục.</p>
            <a href="/payment" className="btn">
              Đăng ký ngay
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
