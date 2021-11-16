import { getMyOrders, update } from "../api";
import { getUserInfo, setUserInfo, clearUser } from "../localStorage";
import { hideLoading, showLoading, showMessage } from "../utils";

/* eslint-disable arrow-body-style */
const ProfileScreen = {
    after_render: () => {
        document.getElementById("signout-button").addEventListener("click", () => {
            clearUser();
            document.location.hash = '/';
        });
        document
        .getElementById("profile-form")
        .addEventListener("submit", async (e) => {
            e.preventDefault();
            showLoading();
            const data = await update({
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                password: document.getElementById('password').value, 
            });
            hideLoading();
            if (data.error) {
                showMessage(data.error);
            } else {
                setUserInfo(data);
                document.location.hash = "/";
            }
        });
    },
    render: async() => {
        const {name, email} = getUserInfo();
        if(!name) {
            document.location.hash = "/";
        }
        const orders = await getMyOrders();
        return `
        <div class="content profile">
            <div class="profile-info">
            <div class="form-container">
            <form id="profile-form">
                <ul class="form-items">
                    <li>
                        <h1>Account</h1>
                    </li>
                    <li>
                        <label for="name">Nome</label>
                        <input type="name" name="name" id="name" value="${name}" />
                    </li>
                    <li>
                        <label for="email">Email</label>
                        <input type="email" name="email" id="email" value="${email}" />
                    </li>
                    <li>
                        <label for="password">Password</label>
                        <input type="password" name="password" id="password" />
                    </li>
                    <li>
                        <button type="submit" class="fw primary">Aggiorna Credenziali</button>
                    </li>
                    <li>
                        <button type="button" id ="signout-button" class="" >Log-out</button>
                    </li>
                    
                </ul>
            </form>
        </div>
            </div>
            <div class="profile-orders">
            <h2>Storico Ordini</h2>
                <table>
                    <thead>
                        <tr>
                            <th>ID ORDINE</th>
                            <th>DATA</th>
                            <th>TOTALE</th>
                            <th>PAGATO</th>
                            <th>CONSEGNATO</th>
                            <th>AZIONI</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${
                            orders.lenght === 0 
                            ? `<tr><td colspan="6">Nessun ordine trovato.</tr>`
                            : orders.map(
                                (order) => `
                    <tr>
                        <td>${order._id}</td>
                        <td>${order.createdAt}</td>
                        <td>${order.totalPrice}</td>
                        <td>${order.paidAt || 'No'}</td>
                        <td>${order.isDeliveredAt || 'No'}</td>
                        <td><a href="/#/order/${order._id}">DETTAGLI</a></td>
                    </tr>
                    ` 
                                )
                                .join('\n')
                        }
                            
                    </tbody>
                </table>            
            </div>
        </div>
                            
        `
    }
}
export default ProfileScreen;