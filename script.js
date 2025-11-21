// Menú móvil accesible
const toggle = document.querySelector(".nav-toggle");
const nav = document.getElementById("nav");
if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!expanded));
    nav.style.display = expanded ? "none" : "block";
  });
}

// Año en el footer
const yearSpan = document.getElementById("year");
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

// Modales de proyecto: abrir / cerrar
document.querySelectorAll("[data-modal-target]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = btn.getAttribute("data-modal-target");
    const modal = document.querySelector(target);
    if (modal) openModal(modal);
  });
});

function openModal(modal) {
  modal.setAttribute("aria-hidden", "false");
  const close = modal.querySelector(".modal-close");
  // focus the first focusable element inside modal
  const focusable = modal.querySelector("a, button, input, textarea");
  if (focusable) focusable.focus();

  function closeHandler() {
    closeModal(modal);
  }
  close?.addEventListener("click", closeHandler);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal(modal);
  });

  document.addEventListener(
    "keydown",
    function escListener(e) {
      if (e.key === "Escape") closeModal(modal);
    },
    { once: true }
  );
}

function closeModal(modal) {
  modal.setAttribute("aria-hidden", "true");
}

// Formulario de contacto: validación simple y simulación de envío
const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    status.textContent = "";
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (name.length < 2) return showError("Por favor indica tu nombre.");
    if (!/^\S+@\S+\.\S+$/.test(email))
      return showError("Introduce un email válido.");
    if (message.length < 10)
      return showError("El mensaje debe tener al menos 10 caracteres.");

    // Simular envío (no hay backend): abrir mailto como fallback
    const mailto = `mailto:brauliocz2350@gmail.com?subject=${encodeURIComponent(
      "Contacto desde web: " + name
    )}&body=${encodeURIComponent(
      message + "\n\n" + "Remitente: " + name + " <" + email + ">"
    )}`;
    // Mostrar éxito y ofrecer abrir cliente
    status.textContent =
      "Mensaje preparado. Se abrirá tu cliente de correo por defecto.";
    setTimeout(() => {
      window.location.href = mailto;
      form.reset();
    }, 600);
  });
}

function showError(text) {
  status.textContent = text;
  status.style.color = "crimson";
  setTimeout(() => {
    status.style.color = "";
  }, 3000);
}
