document.addEventListener("DOMContentLoaded", () => {
    const categoryFilter = document.getElementById("categoryFilter");
    const productList = document.getElementById("productList");

    // LocalStorage'dan ürünleri al
    const products = JSON.parse(localStorage.getItem("products")) || [];

    // Ürünleri yükle ve göster
    function renderProducts(filter = "all") {
        productList.innerHTML = ""; // Mevcut ürünleri temizle

        // Seçilen kategoriye göre filtrele
        const filteredProducts = filter === "all" 
            ? products 
            : products.filter(product => product.category === filter);

        // Filtrelenmiş ürünleri ekrana yazdır
        filteredProducts.forEach(product => {
            const productDiv = document.createElement("div");
            productDiv.classList.add("product-item");

            // Ürün görseli
            const productImage = product.photo || "default-image.jpg"; // Varsayılan resim

            productDiv.innerHTML = `
                <img src="${productImage}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>Kategori: ${product.category}</p>
                <p>Fiyat: ${product.price}₺</p>
                ${product.discountPrice ? `<p>İndirimli Fiyat: ${product.discountPrice}₺</p>` : ""}
            `;

            // Ürüne tıklama işlemi
            productDiv.addEventListener("click", () => {
                localStorage.setItem("selectedProduct", JSON.stringify(product));
                window.location.href = "buy.html"; // Satın alma sayfasına yönlendir
            });

            productList.appendChild(productDiv);
        });

        // Eğer filtrelenmiş ürün yoksa mesaj göster
        if (filteredProducts.length === 0) {
            productList.innerHTML = "<p>Seçilen kategoriye ait ürün bulunamadı.</p>";
        }
    }

    // Kategori değiştiğinde ürünleri yeniden yükle
    categoryFilter.addEventListener("change", (e) => {
        renderProducts(e.target.value);
    });

    // Sayfa yüklendiğinde tüm ürünleri göster
    renderProducts();
});
