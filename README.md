# API Documentation

## Descripción General

## 1. GET `/mp/feedback`

### Descripción
Esta ruta recibe la retroalimentación de Mercado Pago después de un intento de pago. Procesa los parámetros enviados por Mercado Pago para proporcionar información sobre la transacción.

### Request
- **Método**: `GET`
- **URL**: `/mp/feedback`

### Query Params esperados:
| Parámetro         | Tipo   | Descripción                                |
|-------------------|--------|--------------------------------------------|
| `payment_id`      | String | ID del pago procesado por Mercado Pago.    |
| `status`          | String | Estado de la transacción (`approved`, etc).|
| `merchant_order_id` | String | ID de la orden del comerciante.            |

### Response
- **Código 200 OK**: Devuelve un objeto JSON con los detalles de la transacción recibidos.
  ```json
  {
      "Payment": "payment_id",
      "Status": "status",
      "MerchantOrder": "merchant_order_id"
  }
  ```

### Ejemplo
#### Petición:
```http
GET /feedback?payment_id=12345&status=approved&merchant_order_id=98765
```

#### Respuesta:
```json
{
    "Payment": "12345",
    "Status": "approved",
    "MerchantOrder": "98765"
}
```

---

## 2. POST `/mp/preference`

### Descripción
Esta ruta crea una preferencia de pago en Mercado Pago para los productos proporcionados. Se valida que la estructura de los datos de los productos sea correcta antes de proceder.

### Request
- **Método**: `POST`
- **URL**: `/mp/preference`

### Body Params esperados:
| Parámetro          | Tipo    | Descripción                               |
|--------------------|---------|-------------------------------------------|
| `products`         | Array   | Lista de productos que se van a pagar.    |
| `products[*].title`| String  | Nombre del producto.                      |
| `products[*].unit_price`| Number | Precio unitario del producto.         |
| `products[*].quantity`| Number | Cantidad del producto.                  |

### Validaciones:
1. **`products`**:
   - Debe existir.
   - Debe ser un array.
2. **`products[*].title`**:
   - Debe existir.
   - Debe ser un string.
3. **`products[*].unit_price`**:
   - Debe existir.
   - Debe ser un número.
4. **`products[*].quantity`**:
   - Debe existir.
   - Debe ser un número.

### Response
- **Código 200 OK**: Devuelve un objeto JSON con el ID de la preferencia creada.
  ```json
  {
      "id": "preference_id"
  }
  ```

- **Código 400 Bad Request**: Devuelve un objeto JSON con los errores de validación si los datos son incorrectos.
  ```json
  {
      "errors": [
          {
              "msg": "Mensaje de error",
              "param": "nombre_del_parametro",
              "location": "body"
          }
      ]
  }
  ```

- **Código 500 Internal Server Error**: Si ocurre un error en la creación de la preferencia de pago.
  ```json
  {
      "message": "Hubo un error al pagar con Mercado Pago"
  }
  ```

### Ejemplo
#### Petición:
```http
POST /preference
Content-Type: application/json

{
    "products": [
        {
            "title": "Producto 1",
            "unit_price": 100,
            "quantity": 2
        },
        {
            "title": "Producto 2",
            "unit_price": 200,
            "quantity": 1
        }
    ]
}
```

#### Respuesta (200 OK):
```json
{
    "id": "123456789"
}
```

#### Respuesta (400 Bad Request):
```json
{
    "errors": [
        {
            "msg": "El nombre del producto debe ser un string",
            "param": "products[0].title",
            "location": "body"
        }
    ]
}
```