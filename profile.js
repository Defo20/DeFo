document.addEventListener("DOMContentLoaded", () => {
    const backendUrl = "https://backend-dusky-iota.vercel.app"; // Backend'inizin ana URL'si

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");
    const profilePhotoInput = document.getElementById("profilePhoto");
    const saveButton = document.getElementById("saveProfile");

    const savedName = document.getElementById("savedName");
    const savedEmail = document.getElementById("savedEmail");
    const savedPhone = document.getElementById("savedPhone");
    const savedPhoto = document.getElementById("savedPhoto");

    async function fetchProfile() {
        try {
            const response = await fetch(`${backendUrl}/api/users/latest`);
            if (response.ok) {
                const userData = await response.json();
                displayProfile(userData);
            } else {
                console.error("Kullanıcı bilgileri alınamadı.");
            }
        } catch (err) {
            console.error("MongoDB'den kullanıcı bilgileri alınırken bir hata oluştu:", err);
        }
    }

    function displayProfile(userData) {
        if (userData) {
            savedName.textContent = userData.name || "[Adınız]";
            savedEmail.textContent = userData.email || "[Email]";
            savedPhone.textContent = userData.phone || "[Telefon]";

            if (userData.profilePicture) {
                savedPhoto.src = userData.profilePicture;
                savedPhoto.style.display = "block";
            } else {
                savedPhoto.style.display = "none";
            }
        }
    }

    saveButton.addEventListener("click", async () => {
        const formData = new FormData();
        formData.append("name", nameInput.value);
        formData.append("email", emailInput.value);
        formData.append("phone", phoneInput.value);

        if (profilePhotoInput.files[0]) {
            formData.append("profilePhoto", profilePhotoInput.files[0]);
        }

        try {
            const response = await fetch(`${backendUrl}/api/users/register`, {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                alert("Kullanıcı başarıyla MongoDB'ye kaydedildi!");
                fetchProfile();
            } else {
                alert("Kayıt sırasında bir hata oluştu.");
            }
        } catch (err) {
            console.error("MongoDB'ye kaydedilirken bir hata oluştu:", err);
        }
    });

    fetchProfile();
});
