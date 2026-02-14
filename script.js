let products = JSON.parse(localStorage.getItem("products")) || [];

const form = document.getElementById("productForm");
const productList = document.getElementById("productList");

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const url = document.getElementById("url").value;
    const price = parseFloat(document.getElementById("price").value);

    const product = {
        id: Date.now(),
        name,
        url,
        price,
        lastPrice: price
    };

    products.push(product);
    localStorage.setItem("products", JSON.stringify(products));

    form.reset();
    displayProducts();
});

function displayProducts() {
    productList.innerHTML = "";

    products.forEach((product, index) => {
        let status = "Same Price";
        let statusClass = "status-same";

        if (product.price < product.lastPrice) {
            status = "Price Dropped 🔔";
            statusClass = "status-drop";
        }

        productList.innerHTML += `
            <tr>
                <td><a href="${product.url}" target="_blank">${product.name}</a></td>
                <td>₹${product.price}</td>
                <td class="${statusClass}">${status}</td>
                <td>
                    <button onclick="updatePrice(${index})">Update</button>
                    <button onclick="deleteProduct(${index})">Delete</button>
                </td>
            </tr>
        `;
    });
}

function updatePrice(index) {
    let newPrice = prompt("Enter new price:");
    if (newPrice) {
        products[index].lastPrice = products[index].price;
        products[index].price = parseFloat(newPrice);
        localStorage.setItem("products", JSON.stringify(products));
        displayProducts();
    }
}

function deleteProduct(index) {
    products.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(products));
    displayProducts();
}

displayProducts();
