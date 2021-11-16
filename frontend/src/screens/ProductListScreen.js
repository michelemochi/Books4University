import { createProduct, deleteProduct, getProducts1 } from "../api";
import DashboardMenu from "../components/DashboardMenu";
import { showLoading, hideLoading, rerender, showMessage} from '../utils';

/* eslint-disable arrow-body-style */
const ProductListScreen = {
    after_render: () => {
        document.getElementById('create-product-button')
        .addEventListener('click', async() => {
            const data = await createProduct();
            document.location.hash = `/product/${data.product._id}/edit`;
        });
        const editButtons = document.getElementsByClassName('edit-button');
        Array.from(editButtons).forEach((editButton) => {
            editButton.addEventListener('click', () => {
                document.location.hash = `/product/${editButton.id}/edit`;
            });
        });
        const deleteButtons = document.getElementsByClassName('delete-button');
        Array.from(deleteButtons).forEach((deleteButton) => {
            deleteButton.addEventListener('click', async () => {
                if (confirm('Sei sicuro di voler eliminare questo prodotto?')) {
                    showLoading();
                    const data = await deleteProduct(deleteButton.id);
                    if (data.error) {
                    showMessage(data.error);
                } else {
                    rerender(ProductListScreen);
                }
                hideLoading();
            }
        });
    });
  },
    render: async() => {
        const products = await getProducts1();
        return `
        <div class="dashboard">
            ${DashboardMenu.render({selected: 'products'})}
            <div class="dashboard-content">
                <h1>Prodotti</h1>
                <button id="create-product-button" class="primary">
                    Crea Prodotto
                </button>
                <div class="product-list">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NOME</th>
                                <th>PREZZO ORIGINALE</th>
                                <th>PREZZO</th>
                                <th>CATEGORIA</th> 
                                <th class="tr-action">AZIONI</th>                               
                            </tr>
                        </thead>
                        <tbody>
                            ${products.map(product => `
                            <tr>
                                <td>${product._id}</td>
                                <td>${product.name}</td>
                                <td>${product.original_price}</td>
                                <td>${product.price}</td>
                                <td>${product.category}</td>
                                <td>
                                    <button id="${product._id}" class="edit-button">Modifica</button>
                                    <button id="${product._id}" class="delete-button">Elimina</button>
                                </td>
                            </tr>
                            `
                            )
                        .join('\n')}
                        </tbody>
                    </table>
            </div>
        </div>
        `;
    },
};
export default ProductListScreen