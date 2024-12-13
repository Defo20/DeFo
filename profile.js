document.addEventListener("DOMContentLoaded", () => {
    // Kullanıcı Bilgilerini Kaydet ve Göster
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");
    const profilePhotoInput = document.getElementById("profilePhoto");
    const saveButton = document.getElementById("saveProfile");

    const savedName = document.getElementById("savedName");
    const savedEmail = document.getElementById("savedEmail");
    const savedPhone = document.getElementById("savedPhone");
    const savedPhoto = document.getElementById("savedPhoto");

    // LocalStorage'dan kullanıcı bilgilerini getir ve sayfada göster
    function displaySavedProfile() {
        const userData = JSON.parse(localStorage.getItem("userProfile"));

        if (userData) {
            savedName.textContent = userData.name || "[Adınız]";
            savedEmail.textContent = userData.email || "[Email]";
            savedPhone.textContent = userData.phone || "[Telefon]";

            if (userData.photo) {
                savedPhoto.src = userData.photo;
                savedPhoto.style.display = "block";
            } else {
                savedPhoto.style.display = "none";
            }
        }
    }

    // Kullanıcı bilgilerini kaydet
    saveButton.addEventListener("click", () => {
        const userData = {
            name: nameInput.value,
            email: emailInput.value,
            phone: phoneInput.value,
            photo: ""
        };

        if (profilePhotoInput.files[0]) {
            const reader = new FileReader();
            reader.onload = function (e) {
                userData.photo = e.target.result;
                localStorage.setItem("userProfile", JSON.stringify(userData));
                displaySavedProfile();
            };
            reader.readAsDataURL(profilePhotoInput.files[0]);
        } else {
            localStorage.setItem("userProfile", JSON.stringify(userData));
            displaySavedProfile();
        }
    });

    // Sayfa yüklendiğinde kullanıcı bilgilerini göster
    displaySavedProfile();

    // Alınan Ürünleri Göster
    const purchasedProductsContainer = document.getElementById("purchasedProductsContainer");
    const purchasedProducts = JSON.parse(localStorage.getItem("purchasedProducts")) || [];

    if (purchasedProducts.length === 0) {
        purchasedProductsContainer.innerHTML = "<p>Henüz alınan ürün yok.</p>";
    } else {
        purchasedProducts.forEach((product) => {
            const productDiv = document.createElement("div");
            productDiv.classList.add("purchased-product");

            const productImage = product.photo || "default-image.jpg";

            productDiv.innerHTML = `
                <div class="product-image">
                    <img src="${productImage}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p>Kategori: ${product.category}</p>
                    <p>Fiyat: ${product.price}₺</p>
                    ${product.discountPrice ? `<p>İndirimli Fiyat: ${product.discountPrice}₺</p>` : ""}
                </div>
            `;

            purchasedProductsContainer.appendChild(productDiv);
        });
    }
});
