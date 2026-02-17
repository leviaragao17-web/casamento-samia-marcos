// ================= CONFIG API =================
const API_BASE_URL =
  window.location.protocol === "file:" ||
  window.location.hostname === "localhost"
    ? "http://localhost:3000"
    : "https://seusite.com"; // trocar depois pelo domínio real


// ================= HEADER SCROLL =================
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header");
  if (!header) return;
  header.classList.toggle("rolar", window.scrollY > 0);
});


// ================= TRANSIÇÃO DE PÁGINAS =================
document.body.classList.add("fade-in");

document.querySelectorAll("a[href]").forEach(link => {
  if (
    link.href.includes("#") ||
    link.target === "_blank" ||
    link.href.startsWith("mailto:") ||
    link.href.startsWith("tel:")
  ) return;

  link.addEventListener("click", e => {
    e.preventDefault();
    const url = link.href;

    document.body.classList.add("fade-out", "hide");

    setTimeout(() => {
      window.location.href = url;
    }, 400);
  });
});


// ================= BOTÃO COMPRAR (NOVO FLUXO CHECKOUT) =================
document.querySelectorAll(".btn-card").forEach(button => {
  button.addEventListener("click", () => {

    const name = button.dataset.name;
    const price = parseFloat(button.dataset.price);

    // salva no navegador
    localStorage.setItem("selectedGift", JSON.stringify({
      name,
      price
    }));

    // redireciona para checkout
    document.body.classList.add("fade-out", "hide");

    setTimeout(() => {
      window.location.href = "checkout.html";
    }, 400);
  });
});