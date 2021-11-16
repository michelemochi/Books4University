import { hideLoading, parseRequestUrl, showLoading, showMessage } from '../utils';
import { getProduct, updateProduct, uploadProductImage } from '../api'

const ProductEditScreen = {
    after_render: () => {            
        const request = parseRequestUrl();
        document
        .getElementById("edit-product-form")
        .addEventListener('submit', async (e) => {
            e.preventDefault();
            showLoading();
            const data = await updateProduct({
                _id: request.id,
                name: document.getElementById('name').value,
                description: document.getElementById('description').value,
                category: document.getElementById('category').value,
                image: document.getElementById('image').value,
                original_price: document.getElementById('original_price').value,
                price: document.getElementById('price').value,
                countInStock: document.getElementById('countInStock').value,
            });
            hideLoading();
            if (data.error) {
                showMessage(data.error);
            } else {
                document.location.hash = '/productlist';
            }
        })
        document
        .getElementById('image-file')
        .addEventListener('change', async (e) => {
          const file = e.target.files[0];
          const formData = new FormData();
          formData.append('image', file);
          showLoading();
          const data = await uploadProductImage(formData);
          hideLoading();
          if (data.error) {
            showMessage(data.error);
          } else {
            showMessage('Image uploaded successfully.');
            document.getElementById('image').value = data.image;
          }
        });
    },
    render: async () => {
        const request = parseRequestUrl();
        const product = await getProduct(request.id);
        return `
        <div class="content">    
            <div>
                <a href="/#/productlist"> Torna ai prodotti </a>      
            </div>  
            <div class="form-container">
                <form id="edit-product-form">
                    <ul class="form-items">
                        <li>
                            <h1> Modifica Prodotto ${product._id.substring(0, 8)} </h1>
                        </li>
                        <li>
                            <label for="name">Nome</label>
                            <input type="text" name="name" value="${product.name}" id="name" />
                        </li>
                        <li>
                            <label for="description">Descrizione</label>
                            <input type="text" name="description" value="${product.description}" id="description" />
                        </li>
                        <li>
                            <label for="category">Categoria</label>
                            <input type="text" name="category" value="${product.category}" id="category" />
                        </li>
                        <li>
                            <label for="image">Immagine</label>
                            <input type="text" name="image" value="${product.image}" id="image" />
                            <input type="file" name="image-file" id="image-file" />
                        </li>
                        <li>
                            <label for="original_price">Prezzo Originale</label>
                            <input type="number" name="original_price" value="${product.original_price}" id="original_price" />
                        </li>
                        <li>
                            <label for="price">Prezzo di BooksFor[U]niversity</label>
                            <input type="number" name="price" value="${product.price}" id="price" />
                        </li>
                        <li>
                            <label for="countInStock">Quantità</label>
                            <input type="number" name="countInStock" value="${product.countInStock}" id="countInStock" />
                        </li>
                        <li>
                            <button type="submit" class="fw primary"> Aggiorna </button>
                        </li> 
                    </ul>
                </form>
            </div>
        </div>
        `;
    },
};
export default ProductEditScreen;