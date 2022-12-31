require 'mercadopago'
require 'sinatra'

ACCESS_TOKEN = 'YOUR_ACCESS_TOKEN'
mercadopago = Mercadopago::SDK.new(ACCESS_TOKEN)

post '/create_preference' do
  payload = JSON.parse(request.body.read)

  preference = {
    items: [{
      title: payload['title'],
      unit_price: payload['price'].to_f,
      quantity: payload['quantity'].to_f
    }],
    back_urls: {
      success: 'localhost:8080/feedback',
      failure: 'localhost:8080/feedback',
      pending: 'localhost:8080/feedback'
    },
    auto_return: 'approved'
  }

  begin
    response = mercadopago.preference.create(preference)

    { id: response[:response]['id'] }.to_json
  rescue StandardError => e
    puts e
  end
end

get '/feedback' do
  params = request.params
  {
    Payment: params['payment_id'],
    Status: params['status'],
    MechantOrder: params['merchant_order_id']
  }.to_json
end

get '/' do
  send_file '../../client/index.html'
end

set :public_folder, '../../client'
set :views, '../../client'
set :static, true
set :static_cache_control, [:public, { max_age: 0 }]
set :port, 8080
