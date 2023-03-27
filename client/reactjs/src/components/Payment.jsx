import React from "react";
import classnames from 'classnames'
import { Wallet } from "@mercadopago/sdk-react";
import { Context } from "./ContextProvider";

const Payment = () => {
  const { preferenceId } = React.useContext(Context);
  const [isReady, setIsReady] = React.useState(false);
  const paymentClass = classnames('payment-form dark', {
    'payment-form--hidden': !isReady,
  });

  const handleOnReady = () => {
    console.log('Checkout button is loaded! You could stop your loading spinner here');
    setIsReady(true);
  }

  const renderCheckoutButton = (preferenceId) => {
    if (!preferenceId) return null;

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
              {renderCheckoutButton(preferenceId)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
