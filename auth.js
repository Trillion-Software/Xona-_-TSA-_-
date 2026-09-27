// XonaTSA — Connexion E-mail / Téléphone
// Ce fichier gère l'interface. L'authentification réelle doit rester
// côté Firebase Authentication / backend.

const emailTab = document.getElementById("emailTab");
const phoneTab = document.getElementById("phoneTab");
const emailLogin = document.getElementById("emailLogin");
const phoneLogin = document.getElementById("phoneLogin");

let loginMethod = "email";

function setLoginMethod(method) {
  loginMethod = method;
  const isEmail = method === "email";

  emailTab?.classList.toggle("active", isEmail);
  phoneTab?.classList.toggle("active", !isEmail);

  if (emailLogin) emailLogin.hidden = !isEmail;
  if (phoneLogin) phoneLogin.hidden = isEmail;

  if (isEmail) {
    document.getElementById("email")?.focus();
  } else {
    document.getElementById("phone")?.focus();
  }
}

emailTab?.addEventListener("click", () => setLoginMethod("email"));
phoneTab?.addEventListener("click", () => setLoginMethod("phone"));

function normalizePhone(phone) {
  return String(phone || "").replace(/\D/g, "");
}

function isValidPhone(phone) {
  return /^\d{8,12}$/.test(normalizePhone(phone));
}

function getFullPhoneNumber() {
  const countryCode = document.getElementById("countryCode");
  const phoneInput = document.getElementById("phone");

  const number = normalizePhone(phoneInput?.value);

  if (!isValidPhone(number)) {
    throw new Error("Numéro de téléphone invalide.");
  }

  return `${countryCode?.value || "+228"}${number}`;
}

// À connecter à ton Firebase Authentication existant.
// Ne vérifie jamais un mot de passe uniquement côté navigateur.
async function loginWithEmail(email, password) {
  if (typeof window.firebaseLoginWithEmail !== "function") {
    throw new Error(
      "La fonction Firebase Authentication n'est pas encore connectée."
    );
  }

  return window.firebaseLoginWithEmail(email, password);
}

document.getElementById("loginButton")?.addEventListener("click", async () => {
  const button = document.getElementById("loginButton");
  if (!button || button.disabled) return;

  button.disabled = true;
  const originalText = button.textContent;
  button.textContent = "Connexion...";

  try {
    const password = document.getElementById("password")?.value || "";

    if (!password) {
      throw new Error("Mot de passe requis.");
    }

    if (loginMethod === "email") {
      const email = document.getElementById("email")?.value.trim() || "";

      if (!email) {
        throw new Error("Adresse e-mail requise.");
      }

      await loginWithEmail(email, password);
    } else {
      const phone = getFullPhoneNumber();

      // IMPORTANT :
      // Pour le téléphone, branche ici Firebase Phone Authentication
      // avec vérification SMS. Ne crée pas toi-même un système OTP
      // stocké dans localStorage/sessionStorage.
      if (typeof window.firebaseLoginWithPhone !== "function") {
        throw new Error(
          "L'authentification par téléphone n'est pas encore connectée."
        );
      }

      await window.firebaseLoginWithPhone(phone);
    }

    window.location.href = "/home.html";
  } catch (error) {
    console.error("Erreur de connexion :", error);

    // Message volontairement générique pour éviter de révéler
    // si un compte existe.
    alert(error?.message || "Connexion impossible. Vérifiez vos informations.");
  } finally {
    button.disabled = false;
    button.textContent = originalText || "Se connecter";
  }
});
