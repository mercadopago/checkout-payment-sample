import React from "react";

const Checkout = ({ onClick }) => {

  const updatePrice = () => {
    let quantity = document.getElementById("quantity").value;
    let unitPrice = document.getElementById("unit-price").innerHTML;
    let amount = parseInt(unitPrice) * parseInt(quantity);
  
    document.getElementById("cart-total").innerHTML = `$${amount}`;
    document.getElementById("summary-price").innerHTML = `$${unitPrice}`;
    document.getElementById("summary-quantity").innerHTML = quantity;
    document.getElementById("summary-total").innerHTML = `$${amount}`;
  }
  
  return (
    <section className="shopping-cart dark">
      <div className="container" id="container">
        <div className="block-heading">
          <h2>Shopping Cart</h2>
          <p>This is an example of Checkout Pro integration of Mercado Pago</p>
        </div>
        <div className="content">
          <div className="row">
            <div className="col-md-12 col-lg-8">
              <div className="items">
                <div className="product">
                  <div className="info">
                    <div className="product-details">
                      <div className="row justify-content-md-center">
                        <div className="col-md-3">
                          <img
                            className="img-fluid mx-auto d-block image"
                            alt="Image of a product"
                            src="../img/product.png"
                          />
                        </div>
                        <div className="col-md-4 product-detail">
                          <h5>Product</h5>
                          <div className="product-info">
                            <b>Description: </b>
                            <span id="product-description">Some book</span>
                            <br />
                            <b>Author: </b>Dale Carnegie
                            <br />
                            <b>Number of pages: </b>336
                            <br />
                            <b>Price:</b> $ <span id="unit-price">10</span>
                            <br />
                          </div>
                        </div>
                        <div className="col-md-3 product-detail">
                          <label htmlFor="quantity">
                            <b>Quantity</b>
                          </label>
                          <input
                           onChange={updatePrice}
                            type="number"
                            id="quantity"
                            placeholder="1"
                            min="1"
                            className="form-control"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12 col-lg-4">
              <div className="summary">
                <h3>Cart</h3>
                <div className="summary-item">
                  <span className="text">Subtotal</span>
                  <span className="price" id="cart-total"></span>
                </div>
                <button
                  className="btn btn-primary btn-lg btn-block"
                  onClick={onClick}
                  id="checkout-btn"
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
