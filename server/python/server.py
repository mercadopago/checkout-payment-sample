import mercadopago as mp
from flask import Flask, render_template, request

app = Flask(
    __name__,
    static_folder='../../client',
    template_folder='../../client',
    static_url_path='',
)
# REPLACE WITH YOUR ACCESS TOKEN AVAILABLE IN: https://developers.mercadopago.com/panel/credentials
mercadopago = mp.SDK("YOUR_ACCESS_TOKEN")


@app.route("/create_preference", methods=['POST'])
def create_preference():
    payload = request.get_json()
    preference = {
        'items': [{
            'title': payload.get('title'),
            'unit_price': float(payload.get('price')),
            'quantity': float(payload.get('quantity'))
        }],
        'back_urls': {
            "success": "localhost:8080/feedback",
            "failure": "localhost:8080/feedback",
            "pending": "localhost:8080/feedback"
        },
        'auto_return': 'approved'
    }
    try:
        response = mercadopago.preference().create(preference)
    except Exception as error:
        print(error)
    return {'id': response['response']['id']}


@app.route("/feedback")
def feedback():
    params = request.args
    return {
        'Payment': params.get('payment_id'),
        'Status': params.get('status'),
        'MechantOrder': params.get('merchant_order_id'),
    }, 200


@app.route("/")
def home():
    return render_template('index.html')


if "__main__" == __name__:
    app.run(host="localhost", port=8080, debug=True)
