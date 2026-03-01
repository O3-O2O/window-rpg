const profileForm = document.getElementById("profile-form");
const profileInput = document.getElementById("profile-product")

//// Thêm sản phẩm  vào database
window.takeUp = async () => {
    const profileImage = document.getElementById("profile_image").files[0];
    const insideInput = profileInput.value;

    if (!profileImage || !insideInput) {
        alert("Vui lòng nhập đầy đủ!");
        return;
    }

    const formData = new FormData();
    formData.append("file", profileImage);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
        const response = await fetch(URL_CLOUDINARY, {
            method: "POST",
            body: formData,
        });

        const result = await response.json();

        if (!result.secure_url) {
            alert("Upload ảnh thất bại!");
            return;
        }

        await db.collection("skins").add({
            profileImg: result.secure_url,
            profileName: insideInput,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        });

        alert("Tạo sản phẩm thành công!");

        profileForm.reset();   // ✅ reset đúng chỗ
        loadprofiles();        // reload sau khi add

    } catch (error) {
        console.error("Lỗi:", error);
    }
};


// Hiển thị danh sách sản phẩm
function loadprofiles() {
  const profileTableBody = document.getElementById("profile-list");
  let htmlss = "";
  let indexs = 1;
  db.collection("skins")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const profile = doc.data();
        htmlss += `
                    <tr class="profile-item text-center">
                        
                        <td><img src="${profile.profileImg}" alt="${profile.profileName}"></td>

                        <td>${profile.profileName}</td>

                        <td>
                            <button class="btn btn-danger btn-sm btn-delete-profile" data-id="${doc.id}"><i class="fa-regular fa-trash-can"></i></button>
                        </td>
                    </tr>
                `;
        indexs++;
      });
      profileTableBody.innerHTML = htmlss;

      const btnDeleteprofile = document.querySelectorAll(".btn-delete-profile");
      btnDeleteprofile.forEach((btn) => {
        btn.addEventListener("click", () => {
          const profileId = btn.getAttribute("data-id");
          deleteprofile(profileId);
          loadprofiles();
        });
      });
    })
    .catch((error) => {
      console.error("Error fetching profiles: ", error);
    });
}



// Xóa sản phẩm
function deleteprofile(profileId) {
  if (confirm("Are you sure to delete this image?")) {
    db.collection("skins")
      .doc(profileId)
      .delete()
      .then(() => {
        console.log("profile successfully deleted!");
        loadprofiles(); // Tải lại danh sách sản phẩm
      })
      .catch((error) => {
        console.error("Error removing profile: ", error);
      });
  }
}

loadprofiles();