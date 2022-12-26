import salesItems from './data.js';

import { cartItemCount, logo, cart, cartItems, cartItemContainer, cartTotal, alert, productContainer } from './DOMElements.js';

logo.onclick = () => window.location.reload();

// toggle cart section open and close

cart.onclick = () => cartItems.classList.toggle('open');

// display alerts

const displayAlert = (txt, act) => {
    alert.textContent = txt;
    alert.classList.add(`alert-${act}`);
    // remove alert
    setTimeout(() => {
        alert.textContent = '';
        alert.classList.remove(`alert-${act}`);
    }, 4000);
};

// creating product items

salesItems.forEach(item => {
    let element = document.createElement('div');
    element.className = 'product';

    element.innerHTML = `
        <picture><img src="${item.image}" alt="${item.item_name} image" /></picture>
        <div class="details">
            <p>
                <b>${item.item_name}</b>
                <small>${item.category}</small>
            </p>
            <var>$${item.sales_item_price}</var>
        </div>
        <div class="button">
            <p class="star">
                <strong>&starf;</strong>
                <strong>&starf;</strong>
                <strong>&starf;</strong>
                <strong>&starf;</strong>
                <strong>&star;</strong>
            </p>
            <a href="#" class="add_to_cart_btn">add to cart</a>
        </div>
    `;
    productContainer.appendChild(element);

    const product = document.querySelectorAll('.product');
    const span = document.querySelectorAll('span');

    let productPages = Math.ceil(product.length);
    let l = 0;
    let movePer = 51.20;
    let maxMove = 184;

    // Mobile View
    let mobileView = window.matchMedia("(max-width: 768px)");
    if (mobileView.matches) {
        movePer = 50.36;
        maxMove = 406;
    }

    // owl carousel area 

    const rightMover = () => {
        l = l + movePer;
        if (product == 1) { l = 0 };
        for (let i of product) {
            if (l > maxMove) {
                l = l - movePer;
            }
            i.style.left = `-${l}%`;

        }
    };

    const leftMover = () => {
        l = l - movePer;
        if (l <= 0) {
            l = 0;
        }
        for (let i of product) {
            if (productPages > 1)
                i.style.left = `-${l}%`;
        }
    }

    // carousel movement event listener

    span[1].onclick = () => rightMover();
    span[0].onclick = () => leftMover();


    //* add to cart

    let count = 0;

    const addToCartBtn = document.querySelectorAll('.add_to_cart_btn');

    addToCartBtn.forEach(btn => btn.onclick = e => {

        e.preventDefault();

        // for the cart counter 

        count++;

        e.currentTarget.classList.add('clicked');
        cartItemCount.style.visibility = 'visible';
        cartItemCount.innerHTML = count;

        // to push item to cart

        product.forEach(data => data.onclick = e => {
            let target = e.currentTarget;

            // checking if item is already in cart

            if (target.classList.contains('isClicked')) {
                displayAlert('item already in cart', 'danger');
                return;
            };

            target.classList.add('isClicked');

            let image = target.children[0].children[0].currentSrc;
            let title = target.children[1].children[0].firstElementChild.innerText;
            let item_price = target.children[1].children[1].outerText;

            let element = document.createElement('tr');
            element.className = 'table_data';

            element.innerHTML = `
                <td class="img_title"><img src='${image}' class="cart_img"> ${title}</td>
                <td class="cart_price">${item_price}</td>
                <td class="input_data"><input type="number" class="quantity" value="1" /><button class="remove">remove</button></td>
            `;
            cartItemContainer.appendChild(element);

            //* update value if input is changed

            const quantityInputs = document.querySelectorAll('.quantity');

            quantityInputs.forEach(qty => qty.onchange = e => {
                var target = e.target;

                if (target.value < 1) {
                    qty.value = 1;
                }
                updateCartTotal();
            });

            //* removing from cart

            let remove_from_cart = document.querySelectorAll('.remove');

            remove_from_cart.forEach(remove => remove.onclick = e => {

                let target = e.target;
                let parent = target.parentElement.parentElement;
                parent.remove();

                let parentCartImageSrc = parent.querySelector('.cart_img').src;

                product.forEach(prdt => {
                    console.log(prdt.children[0].children[0].currentSrc);
                });

                count--;
                cartItemCount.innerHTML = count;
                if (count === 0) {
                    cartItemCount.style.visibility = 'hidden';
                }

                displayAlert('item removed from cart', 'danger');
                updateCartTotal();
            });
        });

        displayAlert('item added to cart', 'success');
        updateCartTotal();
    });
});

// update cart total function

const updateCartTotal = () => {
    let cartItemData = document.querySelectorAll('.table_data');

    let total = 0.00;

    cartItemData.forEach(data => {
        let cartPrice = data.querySelectorAll('.cart_price')[0];
        let quantity = data.querySelectorAll('.quantity')[0];

        let price = parseFloat(cartPrice.innerText.replace('$', ''));
        let qty = quantity.value;

        total = total + (price * qty);
    });
    total = Math.round(total * 100) / 100;
    cartTotal.innerText = `total: $${total}`;
}