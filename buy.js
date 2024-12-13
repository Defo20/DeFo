document.addEventListener("DOMContentLoaded", () => {
    const productDetails = JSON.parse(localStorage.getItem("selectedProduct"));

    if (productDetails) {
        document.getElementById("product-image").src = productDetails.photo || "default-image.jpg";
        document.getElementById("product-name").textContent = productDetails.name || "Ürün Adı";
        document.getElementById("product-price").textContent = `Fiyat: ${productDetails.price}₺`;

        const discountPriceElement = document.getElementById("product-discount-price");
        if (productDetails.discountPrice) {
            discountPriceElement.textContent = `İndirimli Fiyat: ${productDetails.discountPrice}₺`;
        } else {
            discountPriceElement.style.display = "none";
        }

        document.getElementById("product-description").textContent = productDetails.description || "Ürün açıklaması burada görünecek.";
    }
});

// Sepet verileri
let basket = JSON.parse(localStorage.getItem("basket")) || [];
updateBasketUI();

// Sepete ürün ekle
document.getElementById("add-to-basket").addEventListener("click", () => {
    const productDetails = JSON.parse(localStorage.getItem("selectedProduct"));

    if (productDetails) {
        basket.push(productDetails);
        localStorage.setItem("basket", JSON.stringify(basket));
        updateBasketUI();
        alert("Ürün sepete eklendi!");
    }
});

// Sepeti güncelle
function updateBasketUI() {
    const basketList = document.getElementById("basket-list");
    const totalPriceElement = document.getElementById("total-price");

    basketList.innerHTML = "";
    let totalPrice = 0;

    basket.forEach((product, index) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <span>${product.name} - ${product.discountPrice || product.price}₺</span>
            <button class="remove-item" data-index="${index}">Kaldır</button>
        `;
        basketList.appendChild(listItem);

        totalPrice += parseFloat(product.discountPrice || product.price);
    });

    totalPriceElement.textContent = `Toplam Tutar: ${totalPrice.toFixed(2)}₺`;

    // Sepetten ürün kaldır
    document.querySelectorAll(".remove-item").forEach((button) => {
        button.addEventListener("click", (e) => {
            const index = e.target.getAttribute("data-index");
            basket.splice(index, 1);
            localStorage.setItem("basket", JSON.stringify(basket));
            updateBasketUI();
        });
    });
}

// Ödeme popup'ını yönet
const paymentModal = document.getElementById("paymentModal");
const checkoutButton = document.getElementById("checkout");
const closeModal = document.querySelector(".close");

// Ödeme popup'ını aç
checkoutButton.addEventListener("click", () => {
    if (basket.length === 0) {
        alert("Sepetiniz boş. Lütfen ürün ekleyin!");
        return;
    }
    paymentModal.style.display = "block";
});

// Ödeme popup'ını kapat
closeModal.addEventListener("click", () => {
    paymentModal.style.display = "none";
});

// Ödeme işlemini tamamla
document.getElementById("paymentForm").addEventListener("submit", (e) => {
    e.preventDefault();

    // Kullanıcıdan alınan bilgileri işleme
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;

    if (name && phone && address) {
        alert("Ödeme başarılı! Siparişiniz alındı.");

        // Alınan ürünleri profile kaydet
        basket.forEach((product) => saveToProfile(product));

        // Sepeti sıfırla
        basket = [];
        localStorage.setItem("basket", JSON.stringify(basket));
        updateBasketUI();
        paymentModal.style.display = "none";
    } else {
        alert("Lütfen tüm bilgileri doldurun.");
    }
});

// Profil sayfasına ürün kaydet
function saveToProfile(product) {
    const profileProducts = JSON.parse(localStorage.getItem("purchasedProducts")) || [];
    profileProducts.push(product);
    localStorage.setItem("purchasedProducts", JSON.stringify(profileProducts));
}

// Modal dışında tıklanınca kapatma
window.addEventListener("click", (e) => {
    if (e.target === paymentModal) {
        paymentModal.style.display = "none";
    }
});
