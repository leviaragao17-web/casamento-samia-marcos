// ================= CONFIG API =================
const API_BASE_URL =
  window.location.protocol === "file:" ||
  window.location.hostname === "localhost"
    ? "http://localhost:3000"
    : "https://seusite.com"; // trocar depois


// ================= PEGAR PRESENTE =================
const gift = JSON.parse(localStorage.getItem("selectedGift"));
const giftInfo = document.getElementById("gift-info");
const form = document.getElementById("checkout-form");
const qrContainer = document.getElementById("qr-container");
const qrImage = document.getElementById("qr-image");
const fallback = document.getElementById("fallback");
const successScreen = document.getElementById("successScreen");

if (!gift) {
  giftInfo.innerText = "Presente não encontrado.";
  form.style.display = "none";
} else {
  giftInfo.innerText = `${gift.name} - R$ ${gift.price.toFixed(2)}`;
}


// ================= FORM SUBMIT =================
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email) {
    alert("Preencha nome e e-mail.");
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/payments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        giftName: gift.name,
        giftPrice: gift.price,
        payerName: name,
        payerEmail: email,
        message
      })
    });

    if (!response.ok) throw new Error();

    const data = await response.json();

    if (!data.qrCodeBase64) throw new Error();

    // Mostrar QR
    qrImage.src = `data:image/png;base64,${data.qrCodeBase64}`;
    qrContainer.style.display = "block";

    // Mostrar tela de sucesso
    successScreen.classList.add("active");

    // Limpar localStorage
    localStorage.removeItem("selectedGift");

  } catch (error) {
    console.error(error);

    qrContainer.style.display = "none";
    fallback.style.display = "block";
  }
});


// ================= FECHAR SUCCESS =================
function closeSuccess() {
  successScreen.classList.remove("active");
}