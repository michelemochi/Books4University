import {
    parseRequestUrl,
    showLoading,
    hideLoading,
    showMessage,
    rerender,
  } from '../utils';
  import { getOrder, getPaypalClientId, payOrder, deliverOrder } from '../api';
  import { getUserInfo } from '../localStorage';
  
  const addPaypalSdk = async (totalPrice) => {
    const clientId = await getPaypalClientId();
    showLoading();
    if (!window.paypal) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://www.paypalobjects.com/api/checkout.js';
      script.async = true;
      script.onload = () => handlePayment(clientId, totalPrice);
      document.body.appendChild(script);
    } else {
      handlePayment(clientId, totalPrice);
    }
  };
  const handlePayment = (clientId, totalPrice) => {
    window.paypal.Button.render(
      {
        env: 'sandbox',
        client: {
          sandbox: clientId,
          production: '',
        },
        locale: 'en_US',
        style: {
          size: 'responsive',
          color: 'gold',
          shape: 'pill',
        },
  
        commit: true,
        payment(data, actions) {
          return actions.payment.create({
            transactions: [
              {
                amount: {
                  total: totalPrice,
                  currency: 'USD',
                },
              },
            ],
          });
        },
        onAuthorize(data, actions) {
          return actions.payment.execute().then(async () => {
            showLoading();
            await payOrder(parseRequestUrl().id, {
              orderID: data.orderID,
              payerID: data.payerID,
              paymentID: data.paymentID,
            });
            hideLoading();
            showMessage('Pagamento avvenuto con successo.', () => {
              rerender(OrderScreen);
            });
          });
        },
      },
      '#paypal-button'
    ).then(() => {
      hideLoading();
    });
  };
  const OrderScreen = {
    after_render: async () => {
      const request = parseRequestUrl();
      if (document.getElementById('deliver-order-button')) {
        document.getElementById('deliver-order-button').addEventListener('click', async () => {
          showLoading();
          await deliverOrder(request.id);
          hideLoading();
          showMessage('Ordine Spedito.');
          rerender(OrderScreen);
        });
      }
    },
    render: async () => {
      const { isAdmin } = getUserInfo();
      const request = parseRequestUrl();
      const {
        _id,
        shipping,
        payment,
        orderItems,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
        isDelivered,
        isDeliveredAt,
        isPaid,
        paidAt,
      } = await getOrder(request.id);
      if (!isPaid) {
        addPaypalSdk(totalPrice);
      }
      return `
      <div>
      <h1>Ordine ${_id}</h1>
        <div class="order">
          <div class="order-info">
            <div>
              <h2>Spedizione</h2>
              <div>
              ${shipping.address}, ${shipping.city}, ${shipping.postalCode}, 
              ${shipping.country}
              </div>
              ${
                isDelivered
                  ? `<div class="success">Spedito il ${isDeliveredAt}</div>`
                  : `<div class="error">Non spedito</div>`
              }
               
            </div>
            <div>
              <h2>Pagamento</h2>
              <div>
                Metodo di Pagamento : ${payment.paymentMethod}
              </div>
              ${
                isPaid
                  ? `<div class="success">Pagato il ${paidAt}</div>`
                  : `<div class="error">Non Pagato</div>`
              }
            </div>
            <div>
              <ul class="cart-list-container">
                <li>
                  <h2>Carrello</h2>
                  <div>Prezzo</div>
                </li>
                ${orderItems
                  .map(
                    (item) => `
                  <li>
                    <div class="cart-image">
                      <img src="${item.image}" alt="${item.name}" />
                    </div>
                    <div class="cart-name">
                      <div>
                        <a href="/#/product/${item.product}">${item.name} </a>
                      </div>
                      <div> Quantità: ${item.qty} </div>
                    </div>
                    <div class="cart-price"> €${item.price}</div>
                  </li>
                  `
                  )
                  .join('\n')}
              </ul>
            </div>
          </div>
          <div class="order-action">
             <ul>
                  <li>
                    <h2>Sommario Ordine</h2>
                   </li>
                   <li><div>Prodotto/i</div><div>€${itemsPrice}</div></li>
                   <li><div>Spedizione</div><div>€${shippingPrice}</div></li>
                   <li><div>Tasse</div><div>€${taxPrice}</div></li>
                   <li class="total"><div>Totale Ordine</div><div>€${totalPrice}</div></li>                  
                   <li><div class="fw" id="paypal-button"></div></li>
                   <li>
                   ${
                     isPaid && !isDelivered && isAdmin
                       ? `<button id="deliver-order-button" class="primary fw">Spedisci Ordine</button>`
                       : ''
                   }
                   <li>
                 
          </div>
        </div>
      </div>
      `;
    },
  };
  export default OrderScreen;