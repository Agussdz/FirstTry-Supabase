document.addEventListener("DOMContentLoaded", () => {
  const { createClient } = window.supabase;
  const SUPABASE_URL = "https://jobzlopxiabhdfvsitym.supabase.co";
  const SUPABASE_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpvYnpsb3B4aWFiaGRmdnNpdHltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjIwMDQ0NTYsImV4cCI6MjAzNzU4MDQ1Nn0.3jUNdViiy9h98grOmRB16Olffe27d9Wzp-9R_QWp6VI";

  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

  async function uploadImage() {
    const fileInput = document.getElementById("file-input");
    const nameInput = document.getElementById("name-input");
    const divisionInput = document.getElementById("division-input");

    const file = fileInput.files[0];
    const name = nameInput.value.trim();
    const division = divisionInput.value.trim();

    if (!file) {
      alert("Please select a file.");
      return;
    }

    if (!name) {
      alert("Please enter a name.");
      return;
    }

    if (!division) {
      alert("Please enter a division.");
      return;
    }

    const fileName = `${Date.now()}_${file.name}`;
    try {
      const { data, error } = await supabase.storage
        .from("stokimage")
        .upload(fileName, file);

      if (error) throw error;

      const imageUrl = `${SUPABASE_URL}/storage/v1/object/public/stokimage/${fileName}`;
      displayImage(imageUrl, name, division);
      saveImageUrlToDatabase(imageUrl, name, division);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file.");
    }
  }

  async function saveImageUrlToDatabase(url, name, division) {
    try {
      const { data, error } = await supabase
        .from("images")
        .insert([{ url, name, division }]);

      if (error) throw error;

      console.log("Image URL saved to database:", data);
    } catch (error) {
      console.error("Error saving image URL to database:", error);
    }
  }

  function displayImage(url, name, division) {
    const img = document.createElement("img");
    img.src = url;
    const div = document.createElement("div");
    div.textContent = `Name: ${name}, Division: ${division}`;
    const imageContainer = document.getElementById("image-container");
    imageContainer.appendChild(img);
    imageContainer.appendChild(div);
  }

  async function loadImages() {
    try {
      const { data, error } = await supabase
        .from("images")
        .select("url, name, division");

      if (error) throw error;

      data.forEach((image) => {
        displayImage(image.url, image.name, image.division);
      });
    } catch (error) {
      console.error("Error loading images from database:", error);
    }
  }

  document.getElementById("upload-btn").addEventListener("click", uploadImage);

  loadImages();
});
