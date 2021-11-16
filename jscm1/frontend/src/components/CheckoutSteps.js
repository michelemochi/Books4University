/* eslint-disable arrow-body-style */
const CheckoutSteps = {
    render: (props) => {
        return `
        <div class="checkout-steps">
            <div class="${props.step1 ? 'active' : ''}">Log-in</div>
            <div class="${props.step2 ? 'active' : ''}"><a href="/#/shipping">Spedizione</a></div>
            <div class="${props.step3 ? 'active' : ''}"><a href="/#/payment">Pagamento</a></div>
            <div class="${props.step4 ? 'active' : ''}">Conferma Ordine</div>
        </div>
        `;
    },
};
export default CheckoutSteps;