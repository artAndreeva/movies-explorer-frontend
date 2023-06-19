import React from 'react';
import './Popup.css';

const Popup = ({ isPopupOpen, closePopup, apiStatus }) => {

return (
  <div className={`popup ${isPopupOpen && 'popup_opened'}`}>
    <div className="popup__container">
      <button
        className="popup__close-button button"
        type="button"
        onClick={closePopup}>
      </button>
      <span className="popup__text">{apiStatus}</span>
    </div>
  </div>
)
}

export default Popup;
