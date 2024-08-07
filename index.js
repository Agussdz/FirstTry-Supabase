document.addEventListener("DOMContentLoaded", () => {
  const { createClient } = window.supabase;
  const SUPABASE_URL = "https://jobzlopxiabhdfvsitym.supabase.co";
  const SUPABASE_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpvYnpsb3B4aWFiaGRmdnNpdHltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjIwMDQ0NTYsImV4cCI6MjAzNzU4MDQ1Nn0.3jUNdViiy9h98grOmRB16Olffe27d9Wzp-9R_QWp6VI";
  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

  async function loadImages() {
    try {
      const { data: images, error } = await supabase.from("images").select("*");
      if (error) throw error;

      const imagesContainer = document.getElementById("images-container");
      imagesContainer.innerHTML = "";
      images.forEach((image) => {
        const card = `
            <div class="col-md-4 mb-3">
              <div class="card" style="width: 18rem">
                <img src="${image.url}" class="card-img-top" alt="${image.name}" />
                <div class="card-body">
                  <h5 class="card-title">${image.name}</h5>
                  <p class="card-text">${image.description}</p>
                  <p class="text-primary">Creator: ${image.creator}</p>
                  <p class="text-primary">Division: ${image.division}</p>
                  <a href="${image.link}" class="btn btn-primary" target="_blank">Link Karya</a>
                </div>
              </div>
            </div>
          `;
        imagesContainer.innerHTML += card;
      });
    } catch (error) {
      console.error("Error loading images:", error);
    }
  }

  loadImages();
});
