import React from "react";
import { Wallet } from "@mercadopago/sdk-react";

const Payment = ({ preferenceId }) => {

  const handleReturn = () => {
    $(".container_payment").fadeOut(500);
    setTimeout(() => $(".shopping-cart").show(500).fadeIn(), 500);
    $('#checkout-btn').attr("disabled", false);
  }

  const renderCheckoutButton = (preferenceId) => {
    return <Wallet initialization={{ preferenceId: preferenceId }} />;
  }

  return (
    <div className="payment-form dark">
      <div className="container_payment">
        <div className="block-heading">
          <h2>Checkout Payment</h2>
          <p>This is an example of a Mercado Pago integration</p>
        </div>
        <div className="form-payment">
          <div className="products">
            <h2 className="title">Summary</h2>
            <div className="item">
              <span className="price" id="summary-price"></span>
              <p className="item-name">
                Book X <span id="summary-quantity"></span>
              </p>
            </div>
            <div className="total">
              Total
              <span className="price" id="summary-total">
                $10
              </span>
            </div>
          </div>
          <div className="payment-details">
            <div className="form-group col-sm-12">
              {preferenceId && renderCheckoutButton(preferenceId)}
            </div>
            <a onClick={handleReturn}>
                <svg xmlns="http://www.w3.org/2000/svg" width="12" viewBox="0 0 10 10" className="chevron-left">
                  <path fill="#009EE3" fillRule="nonzero" id="chevron_left"
                    d="M7.05 1.4L6.2.552 1.756 4.997l4.449 4.448.849-.848-3.6-3.6z"></path>
                </svg>
                Go back to Shopping Cart
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
