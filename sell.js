document.addEventListener("DOMContentLoaded", () => {
    // DOM Elemanlarını Seç
    const productNameInput = document.getElementById("productName");
    const brandInput = document.getElementById("brand");
    const defectTypeInput = document.getElementById("defectType");
    const priceInput = document.getElementById("price");
    const discountInput = document.getElementById("discount");
    const categoryInput = document.getElementById("category");
    const productPhotoInput = document.getElementById("productPhoto");
    const submitButton = document.getElementById("submitProduct");
    const productDisplay = document.getElementById("productDisplay");

    // Ürünleri LocalStorage'dan Al
    let products = JSON.parse(localStorage.getItem("products")) || [];

    // Ürünleri Göster
    function displayProducts() {
        productDisplay.innerHTML = ""; // Mevcut Listeyi Temizle
        products.forEach((product, index) => {
            const li = document.createElement("li");
            li.className = "product-item";

            const img = document.createElement("img");
            img.src = product.photo || "default-image.jpg"; // Fotoğraf Yoksa Varsayılan Görsel
            img.alt = product.name;
            img.style.width = "100px";
            img.style.height = "100px";
            img.style.objectFit = "cover";
            img.style.marginRight = "10px";

            const info = document.createElement("span");
            info.textContent = `Ürün: ${product.name}, Kategori: ${product.category}, Fiyat: ${product.price}₺, İndirimli Fiyat: ${product.discountPrice}₺`;

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Sil";
            deleteButton.className = "delete-button";
            deleteButton.addEventListener("click", () => {
                deleteProduct(index);
            });

            li.appendChild(img);
            li.appendChild(info);
            li.appendChild(deleteButton);
            productDisplay.appendChild(li);
        });
    }

    // Ürünü LocalStorage'a Kaydet
    submitButton.addEventListener("click", () => {
        const product = {
            name: productNameInput.value,
            brand: brandInput.value,
            defect: defectTypeInput.value,
            price: parseFloat(priceInput.value),
            discount: parseFloat(discountInput.value) || 0,
            discountPrice: parseFloat(priceInput.value) - (parseFloat(priceInput.value) * (parseFloat(discountInput.value) || 0)) / 100,
            category: categoryInput.value,
            photo: "",
        };

        if (productPhotoInput.files[0]) {
            const reader = new FileReader();
            reader.onload = function (e) {
                product.photo = e.target.result;
                saveProduct(product);
            };
            reader.readAsDataURL(productPhotoInput.files[0]);
        } else {
            saveProduct(product);
        }
    });

    // Ürünü Kaydetme ve Gösterme
    function saveProduct(product) {
        products.push(product);
        localStorage.setItem("products", JSON.stringify(products));
        displayProducts();
        clearForm();
    }

    // Ürünü LocalStorage'dan Silme İşlevi
    function deleteProduct(index) {
        products.splice(index, 1); // Belirtilen İndeksteki Ürünü Sil
        localStorage.setItem("products", JSON.stringify(products));
        displayProducts(); // Listeyi Güncelle
    }

    // Formu Temizleme İşlevi
    function clearForm() {
        productNameInput.value = "";
        brandInput.value = "";
        defectTypeInput.value = "";
        priceInput.value = "";
        discountInput.value = "";
        categoryInput.value = "Şapka"; // Varsayılan Kategori
        productPhotoInput.value = null;
    }

    // Sayfa Yüklendiğinde Ürünleri Göster
    displayProducts();
});
