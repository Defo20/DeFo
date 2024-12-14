document.addEventListener("DOMContentLoaded", () => {
    const airtableApiKey = "patBeZrQ0Q0au4viK.8b7adc0991a3686a608b08f01e7980d489def9bf813569f1eda39a7405b30a44"; // Airtable Personal Access Token
    const baseId = "appGioPVG9j8tP0dX"; // Airtable Base ID
    const tableName = "Profil"; // Airtable Tablo Adı

    // Proxy URL'si (CORS Anywhere)
    const proxy = "https://cors-anywhere.herokuapp.com/";

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
            const response = await fetch(`${proxy}https://api.airtable.com/v0/${baseId}/${tableName}`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${airtableApiKey}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                alert("Kullanıcı başarıyla kaydedildi!");
                const result = await response.json();
                console.log("Eklenen kayıt:", result);
            } else {
                const errorDetails = await response.json();
                console.error("Airtable API Hatası:", errorDetails);
                alert(`Hata: ${errorDetails.error.message}`);
            }
        } catch (error) {
            console.error("CORS Anywhere Proxy Hatası:", error);
            alert("Bir hata oluştu.");
        }
    });
});
