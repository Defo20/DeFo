document.addEventListener("DOMContentLoaded", () => {
    // Airtable bilgileriniz
    const airtableApiKey = "patBeZrQ0Q0au4viK.8b7adc0991a3686a608b08f01e7980d489def9bf813569f1eda39a7405b30a44"; // Airtable Personal Access Token
    const baseId = "appGioPVG9j8tP0dX"; // Airtable Base ID
    const tableName = "Profil"; // Airtable'daki tablo adı

    // HTML elementlerini seçiyoruz
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");
    const saveButton = document.getElementById("saveProfile");

    // "Kaydet" butonuna tıklandığında çalışan işlev
    saveButton.addEventListener("click", async () => {
        // Kullanıcıdan alınan form verileri
        const name = nameInput.value;
        const email = emailInput.value;
        const phone = phoneInput.value;

        // Airtable API'ye gönderilecek veriler
        const data = {
            records: [
                {
                    fields: {
                        Name: name,       // Airtable'da "Name" kolonuna kaydedilir
                        Email: email,     // Airtable'da "Email" kolonuna kaydedilir
                        Phone: phone,     // Airtable'da "Phone" kolonuna kaydedilir
                    },
                },
            ],
        };

        // Airtable'a POST isteği gönderiyoruz
        try {
            const response = await fetch(`https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${airtableApiKey}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                alert("Yeni satır başarıyla Airtable'a eklendi!");
                const result = await response.json();
                console.log("Eklenen satır:", result);
            } else {
                const errorDetails = await response.json();
                console.error("Airtable API Hatası:", errorDetails);
                alert(`Hata: ${errorDetails.error.message}`);
            }
        } catch (error) {
            console.error("API'ye bağlanırken bir hata oluştu:", error);
            alert("Kayıt sırasında bir hata oluştu.");
        }
    });
});
