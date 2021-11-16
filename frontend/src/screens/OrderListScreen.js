/* eslint-disable no-restricted-globals */
/* eslint-disable no-alert */
import { getOrders, deleteOrder } from "../api";
import DashboardMenu from "../components/DashboardMenu";
import { showLoading, hideLoading, rerender, showMessage} from '../utils';

/* eslint-disable arrow-body-style */
const OrderListScreen = {
    after_render: () => {
        const deleteButtons = document.getElementsByClassName('delete-button');
        Array.from(deleteButtons).forEach((deleteButton) => {
            deleteButton.addEventListener('click', async () => {
                if (confirm(`Sei sicuro di voler eliminare quest'ordine?`)) {
                    showLoading();
                    const data = await deleteOrder(deleteButton.id);
                    if (data.error) {
                    showMessage(data.error);
                } else {
                    rerender(OrderListScreen);
                }
                hideLoading();
            }
        });
    });
    const editButtons = document.getElementsByClassName('edit-button');
    Array.from(editButtons).forEach((editButton) => {
        editButton.addEventListener('click', async () => {
            document.location.hash = `/order/${editButton.id}`;
    });
});
},
    render: async() => {
        const orders = await getOrders();
        return `
        <div class="dashboard">
            ${DashboardMenu.render({selected: 'orders'})}
            <div class="dashboard-content">
                <h1>Ordini</h1>
                <div class="order-list">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>DATA</th>
                                <th>TOTALE</th>
                                <th>UTENTE</th>
                                <th>PAGATO IL</th>
                                <th>SPEDITO IL</th> 
                                <th class="tr-action">AZIONI</th>                               
                            </tr>
                        </thead>
                        <tbody>
                            ${orders.map(order => `
                            <tr>
                                <td>${order._id}</td>
                                <td>${order.createdAt}</td>
                                <td>${order.totalPrice}</td>
                                <td>${order.user.name}</td>
                                <td>${order.paidAt || 'No'}</td>
                                <td>${order.isDeliveredAt || 'No'}</td>
                                <td>
                                    <button id="${order._id}" class="edit-button">Modifica</button>
                                    <button id="${order._id}" class="delete-button">Elimina</button>
                                </td>
                            </tr>
                            `
                            )
                        .join('\n')}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        `;
    },
};
export default OrderListScreen