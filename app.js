let product = document.querySelectorAll('.product');
let span = document.querySelectorAll('span');
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

let rightMover = () => {
    l = l + movePer;
    if (product == 1) { l = 0 };
    for (let i of product) {
        if (l > maxMove) {
            l = l - movePer;
        }
        console.log(i);
        console.log(movePer);
        console.log(l);
        i.style.left = `-${l}%`;

    }
};
// event listener
span[1].onclick = () => {
    rightMover();
}

let leftMover = () => {
    l = l - movePer;
    if (l <= 0) {
        l = 0;
    }
    for (let i of product) {
        if (productPages > 1)
            i.style.left = `-${l}%`;
    }
}
// event listener
span[0].onclick = () => {
    leftMover();
}