import CheckoutSteps from "../components/CheckoutSteps";
import { getUserInfo, getShipping, setShipping } from "../localStorage";

/* eslint-disable arrow-body-style */
const ShippingScreen = {
    after_render: () => {        
        document
        .getElementById("shipping-form")
        .addEventListener("submit", async (e) => {
            e.preventDefault();
            setShipping({
                address: document.getElementById('address').value,
                city: document.getElementById('city').value,
                postalCode: document.getElementById('postalCode').value,
                country: document.getElementById('country').value,
            });
            document.location.hash = '/payment';
        });
    },
    render: () => {
        const {name} = getUserInfo();
        if(!name) {
            document.location.hash = "/";
        }
        const { address, city, postalCode, country} = getShipping();
        return `
        ${CheckoutSteps.render({ step1: true, step2: true })}
        <div class="form-container2">
            <form id="shipping-form">
                <ul class="form-items">
                    <li>
                        <h1>Spedizione</h1>
                    </li>
                    <li>
                        <label for="address">Indirizzo</label>
                        <input type="text" name="address" id="address" value="${address}" />
                    </li> 
                    <li>
                        <label for="city">Città</label>
                        <input type="text" name="city" id="city" value="${city}" />
                    </li>
                    <li>
                        <label for="postalCode">CAP</label>
                        <input type="text" name="postalCode" id="postalCode" value="${postalCode}" />
                    </li>
                    <li>
                        <label for="country">Nazione</label>
                        <input type="text" name="country" id="country" value="${country}" />
                    </li>                   
                    <li>
                        <button type="submit" class="fw primary">Continua</button>
                    </li>
                                        
                </ul>
            </form>
        </div>                    
        `
    }
}
export default ShippingScreen;