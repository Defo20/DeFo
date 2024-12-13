// Satın Alma Sayfası
document.addEventListener("DOMContentLoaded", () => {
    const productDetailsContainer = document.querySelector(".product-details");
    const storedProduct = JSON.parse(localStorage.getItem("selectedProduct"));

    if (storedProduct) {
        const productImage = storedProduct.photo ? storedProduct.photo : "default-image.jpg";

        productDetailsContainer.innerHTML = `
            <div class="product-image">
                <img src="${productImage}" alt="${storedProduct.name}">
            </div>
            <div class="product-info">
                <h2>${storedProduct.name}</h2>
                <p><strong>Kategori:</strong> ${storedProduct.category}</p>
                <p><strong>Fiyat:</strong> ${storedProduct.price}₺</p>
                ${
                    storedProduct.discountPrice
                        ? `<p><strong>İndirimli Fiyat:</strong> ${storedProduct.discountPrice}₺</p>`
                        : ""
                }
                <p><strong>Açıklama:</strong> ${storedProduct.description || "Açıklama bulunmamaktadır."}</p>
            </div>
        `;
    } else {
        productDetailsContainer.innerHTML = `<p>Ürün bilgisi bulunamadı.</p>`;
    }

    // Ödeme Popup
    const buyNowButton = document.getElementById("buyNow");
    const paymentModal = document.getElementById("paymentModal");
    const closeModal = document.querySelector(".close");

    buyNowButton.addEventListener("click", () => {
        paymentModal.style.display = "block";
    });

    closeModal.addEventListener("click", () => {
        paymentModal.style.display = "none";
    });

    window.addEventListener("click", (e) => {
        if (e.target === paymentModal) {
            paymentModal.style.display = "none";
        }
    });

    // Ödeme Tamamlama
    const checkoutButton = document.getElementById("checkout");
    checkoutButton.addEventListener("click", (e) => {
        e.preventDefault();

        // Form bilgileri
        const name = document.getElementById("name").value;
        const phone = document.getElementById("phone").value;
        const address = document.getElementById("address").value;
        const cardNumber = document.getElementById("cardNumber").value;
        const expiryMonth = document.getElementById("expiryMonth").value;
        const expiryYear = document.getElementById("expiryYear").value;
        const cvv = document.getElementById("cvv").value;

        // Form doğrulama
        if (!name || !phone || !address || !cardNumber || !expiryMonth || !expiryYear || !cvv) {
            alert("Lütfen tüm alanları doldurun!");
            return;
        }

        alert("Ödeme başarılı! Siparişiniz alınmıştır.");
        paymentModal.style.display = "none";
    });
    

    document.getElementById("checkout").addEventListener("click", (e) => {
        e.preventDefault(); // Sayfanın yenilenmesini engeller
    
        const selectedProduct = JSON.parse(localStorage.getItem("selectedProduct"));
    
        if (!selectedProduct) {
            alert("Ürün bilgisi bulunamadı!");
            return;
        }
    
        // Satın alınan ürünleri kaydet
        const purchasedProducts = JSON.parse(localStorage.getItem("purchasedProducts")) || [];
        purchasedProducts.push(selectedProduct);
        localStorage.setItem("purchasedProducts", JSON.stringify(purchasedProducts));
    
        alert("Ödeme başarıyla tamamlandı! Ürün profilinize eklendi.");
        window.location.href = "profile.html"; // Profil sayfasına yönlendirme
    });
    


});
