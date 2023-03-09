import React from "react";
import { initMercadoPago } from "@mercadopago/sdk-react";
import Payment from "./components/Payment";
import Checkout from "./components/Checkout";

// REPLACE WITH YOUR PUBLIC KEY AVAILABLE IN: https://developers.mercadopago.com/panel
initMercadoPago("<PUBLIC_KEY>");

const App = () => {
  const [preferenceId, setPreferenceId] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleClick = () => {
    setIsLoading(true);
    const orderData = {
      quantity: document.getElementById("quantity").value || "1",
      description: document.getElementById("product-description").innerHTML,
      price: document.getElementById("unit-price").innerHTML,
    };

    fetch("http://localhost:8080/create_preference", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    })
      .then((response) => {
        return response.json();
      })
      .then((preference) => {
        setPreferenceId(preference.id);
      })
      .catch((error) => {
        console.error(error);
      }).finally(() => {
        setIsLoading(false);
      })
  };

  return (
    <>
      <main>
        <Checkout preferenceId={preferenceId} disabled={isLoading} onClick={handleClick} />
        <Payment preferenceId={preferenceId} />
      </main>
      <footer>
        <div className="footer_logo">
          <img
            id="horizontal_logo"
            alt="image of the logo"
            src="../img/horizontal_logo.png"
          />
        </div>
        <div className="footer_text">
          <p>Developers Site:</p>
          <p>
            <a href="https://developers.mercadopago.com" target="_blank">
              https://developers.mercadopago.com
            </a>
          </p>
        </div>
      </footer>
    </>
  );
};

export default App;
