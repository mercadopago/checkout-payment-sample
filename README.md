# Checkout payment processing with Checkout Pro

## This is a simple example of how you can accept payments by integrating our [Checkout PRO](https://www.mercadopago.com/developers/en/guides/online-payments/checkout-pro/introduction)

### In this repository you will find two main folders:

- `client`:
  Basic implementation of a checkout, complying with the necessary security requirements to collect sensitive user information.

  For html/js project: http://localhost:8080

  For reactjs project: http://localhost:3000

- `server`:
  Basic server-side implementation, which provides static client-side resources and allows the collected information to be published directly to our API to create preference and process payment request using our payment button. Hosted on http://localhost:8080.

<br>

## How to run it

Clone or [download](https://github.com/mercadopago/checkout-payment-sample/archive/master.zip) this project, **move to the server implementation** of your choice and **follow its README** instructions.

If you are programming in a different language, we offer a client-side sample which will allow you to write your own server-side implementation using our [API Reference](https://www.mercadopago.com/developers/en/reference/preferences/_checkout_preferences/post/) as a guideline.

## How it looks

https://github.com/user-attachments/assets/6e205678-0cb0-4c43-baac-6beb47d99aab

The payment button is currently in a migration process. The integration structure will soon change for all countries, but the current one will continue to work. For now, it is only available for Chile.

https://github.com/user-attachments/assets/0ab0be20-3651-49b4-b767-939917e37cd8
