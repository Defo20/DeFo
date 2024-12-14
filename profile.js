document.addEventListener("DOMContentLoaded", () => {
    // Backend URL'nizi buraya ekleyin
    const backendUrl = "https://backend-jet-iota.vercel.app/api/airtable"; // Vercel Backend URL

    // HTML elementlerini seçiyoruz
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");
    const saveButton = document.getElementById("saveProfile");

    // "Kaydet" butonuna tıklandığında çalışan işlev
    saveButton.addEventListener("click", async () => {
        const name = nameInput.value;
        const email = emailInput.value;
        const phone = phoneInput.value;

        const data = {
            records: [
                {
                    fields: {
                        Name: name,
                        Email: email,
                        Phone: phone,
                    },
                },
            ],
        };

        try {
            const response = await fetch(backendUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                alert("Kullanıcı başarıyla kaydedildi!");
                const result = await response.json();
                console.log("Eklenen kayıt:", result);

                // Kaydedilen bilgileri sayfada gösterme
                displaySavedProfile(name, email, phone);
            } else {
                const errorDetails = await response.json();
                console.error("Backend Hatası:", errorDetails);
                alert(`Hata: ${errorDetails.error.message}`);
            }
        } catch (error) {
            console.error("Backend bağlantı hatası:", error);
            alert("Bir hata oluştu.");
        }
    });

    // Kaydedilen bilgileri sayfada gösterme
    function displaySavedProfile(name, email, phone) {
        document.getElementById("savedName").textContent = name || "[Adınız]";
        document.getElementById("savedEmail").textContent = email || "[Email]";
        document.getElementById("savedPhone").textContent = phone || "[Telefon]";
    }
});
