import React from "react";
import { initMercadoPago } from "@mercadopago/sdk-react";
import Payment from "./components/Payment";
import Checkout from "./components/Checkout";
import Footer from "./components/Footer";
import InternalProvider from "./components/ContextProvider";

// REPLACE WITH YOUR PUBLIC KEY AVAILABLE IN: https://developers.mercadopago.com/panel
initMercadoPago("<PUBLIC_KEY>");

const App = () => {
  const [preferenceId, setPreferenceId] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(null);
  const [orderData, setOrderData] = React.useState({ quantity: "1", description: "", price: "10" });

  const handleClick = () => {
    setIsLoading(true);
    const data = {
      quantity: document.getElementById("quantity").value || orderData.quantity,
      description: document.getElementById("product-description").innerHTML || orderData.description,
      price: document.getElementById("unit-price").innerHTML || orderData.price
    };

    fetch("http://localhost:8080/create_preference", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
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
        setOrderData(data);
        setIsLoading(false);
      })
  };

  return (
    <InternalProvider context={{ preferenceId, isLoading, orderData }}>
      <main>
        <Checkout onClick={handleClick} />
        <Payment />
      </main>
      <Footer />
    </InternalProvider>
  );
};

export default App;
