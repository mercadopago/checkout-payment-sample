import React from "react";
import classnames from 'classnames'
import { Wallet } from "@mercadopago/sdk-react";

const Payment = ({ preferenceId }) => {
  const paymentClass = classnames('payment-form dark', {
    'payment-form--hidden': !preferenceId,
  })


  const handleOnReady = () => {
    console.log('Checkout button is loaded!');
  }

  const renderCheckoutButton = (preferenceId) => {
    return (
      <Wallet 
        initialization={{ preferenceId: preferenceId }}
        onReady={handleOnReady} />
      )
  }


  return (
    <div className={paymentClass}>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
