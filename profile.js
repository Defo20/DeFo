document.addEventListener("DOMContentLoaded", () => {
    // Airtable bilgileriniz
    const airtableApiKey = "pat81c3ZkZKYh8ToY.7d83a287f3474a6a61f608634710c092e5f5fc198ec505092f31bb0377c48fc1"; // Airtable Personal Access Token
    const baseId = "appGioPVG9j8tP0dX"; // Airtable Base ID
    const tableName = "Profil.html"; // Airtable'daki tablo adınız

    // HTML elementlerini seçiyoruz
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");
    const profilePhotoInput = document.getElementById("profilePhoto");
    const saveButton = document.getElementById("saveProfile");

    // Kaydedilen bilgilerin görüntüleneceği alanlar
    const savedName = document.getElementById("savedName");
    const savedEmail = document.getElementById("savedEmail");
    const savedPhone = document.getElementById("savedPhone");
    const savedPhoto = document.getElementById("savedPhoto");

    // "Kaydet" butonuna tıklandığında çalışan işlev
    saveButton.addEventListener("click", async () => {
        // Kullanıcıdan alınan form verileri
        const name = nameInput.value;
        const email = emailInput.value;
        const phone = phoneInput.value;
        const profilePhoto = profilePhotoInput.files[0];

        // Profil fotoğrafını yükleme işlemi
        let profilePhotoUrl = null;
        if (profilePhoto) {
            // Airtable'da fotoğraf yüklemek için önce dosyayı bir URL'ye yüklemeniz gerekir
            // Bunun için bir dosya barındırma hizmeti kullanabilirsiniz
            // Ancak doğrudan base64 ile Airtable'a yükleme yapamayız
            // Bu nedenle, fotoğraf yükleme işlemini atlıyoruz veya boş bırakıyoruz
            alert("Profil fotoğrafı yükleme özelliği şu anda desteklenmemektedir.");
        }

        // Airtable API'ye gönderilecek veriler
        const data = {
            records: [
                {
                    fields: {
                        Name: name,
                        Email: email,
                        Phone: phone,
                        // Eğer fotoğraf URL'si varsa ekleyin
                        ...(profilePhotoUrl && { "Profile Photo": [{ url: profilePhotoUrl }] })
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
                alert("Kullanıcı başarıyla kaydedildi!");
                const result = await response.json();
                console.log("Kaydedilen veri:", result);

                // Kaydedilen bilgileri sayfada gösterme
                displaySavedProfile(name, email, phone, profilePhotoUrl);
            } else {
                alert("Kayıt sırasında bir hata oluştu.");
                const errorDetails = await response.json();
                console.error("Hata detayları:", errorDetails);
            }
        } catch (error) {
            console.error("Airtable'a bağlanırken bir hata oluştu:", error);
            alert("Kayıt sırasında bir hata oluştu.");
        }
    });

    // Kaydedilen bilgileri sayfada gösterme işlevi
    function displaySavedProfile(name, email, phone, photoUrl) {
        savedName.textContent = name || "[Adınız]";
        savedEmail.textContent = email || "[Email]";
        savedPhone.textContent = phone || "[Telefon]";

        if (photoUrl) {
            savedPhoto.src = photoUrl;
            savedPhoto.style.display = "block";
        } else {
            savedPhoto.style.display = "none";
        }
    }

    // Sayfa yüklendiğinde Airtable'dan en son kaydı çekme ve gösterme (isteğe bağlı)
    async function fetchLatestProfile() {
        try {
            const response = await fetch(`https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}?sort[0][field]=Created&sort[0][direction]=desc&maxRecords=1`, {
                headers: {
                    "Authorization": `Bearer ${airtableApiKey}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                if (data.records.length > 0) {
                    const record = data.records[0].fields;
                    displaySavedProfile(record.Name, record.Email, record.Phone, record["Profile Photo"] ? record["Profile Photo"][0].url : null);
                }
            } else {
                console.error("Kayıtlı veriler alınamadı.");
            }
        } catch (error) {
            console.error("Airtable'dan veri alınırken bir hata oluştu:", error);
        }
    }

    // Sayfa yüklendiğinde en son kaydı çekme (isteğe bağlı)
    fetchLatestProfile();
});
