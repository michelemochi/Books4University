/* eslint linebreak-style: ["error", "windows"] */
import { getProduct } from '../api';
import {hideLoading, parseRequestUrl, showLoading} from '../utils';

const ProductScreen = {
  after_render: () => {
    const request = parseRequestUrl();
    document.getElementById("add-button").addEventListener('click', () => {
      document.location.hash = `/cart/${request.id}`;
    });
    document.getElementById("addbutton").addEventListener('click', () => {
      document.location.hash = '/';
    });
  },
  render: async() => {
    const request = parseRequestUrl();
    showLoading();
    const product = await getProduct(request.id);
    if(product.error){
      return `<div>${product.error}</div>`;
    }
    hideLoading();
    return `
    <div class="content">
      <div class="details">
        <div class="details-image">
          <img src="${product.image}" alt="${product.name}" />
        </div>
        <div class="details-info">
          <ul>
            <li>
              <h1>${product.name}</h1>
            </li>
            <li>
              Prezzo Originale: <strong>€${product.original_price}</strong>
            </li>
            <li>
              <strong> Prezzo di BooksFor[U]niversity: </strong> <strong>€${product.price}</strong>
            </li>
            <li>
              <strong>Descrizione: </strong>
              <div>
                ${product.description}
              </div>
            </li>
          </ul>
        </div>
        <div class="details-action">
            <ul>
              <li>
              Prezzo: €${product.price}
              </li>
              <li>
                Stato:
                  ${product.countInStock > 0 
                    ? `<span class="success"> Disponibile </span>`
                    : `<span class="error"> Non Dsiponibile </span>`                  
                  }
              </li>
              <li>
                  <button id="add-button" class="fw primary"> Aggiungi al Carrello </button>
              </li>
                  <button id="addbutton" class="fw secondary"> Torna alla Home </button> </div> 
            </ul>
        </div>
      </div>
    </div>
    `
  },
};
export default ProductScreen;
