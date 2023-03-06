import React from "react";
import { initMercadoPago } from "@mercadopago/sdk-react";
import Payment from "./components/Payment";
import Checkout from "./components/Checkout";

// REPLACE WITH YOUR PUBLIC KEY AVAILABLE IN: https://developers.mercadopago.com/panel
initMercadoPago("YOUR_PUBLIC_KEY");

const App = () => {
  const [preferenceId, setPreferenceId] = React.useState(null);

  const handleClick = () => {
    $("#checkout-btn").attr("disabled", true);
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
        $(".shopping-cart").fadeOut(500);
        setTimeout(() => $(".container_payment").show(500).fadeIn(), 500);
      })
      .catch((error) => {
        console.error(error);
        $("#checkout-btn").attr("disabled", false);
      });
  };

  return (
    <>
      <main>
        <Checkout onClick={handleClick} />
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
