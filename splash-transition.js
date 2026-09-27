// XonaTSA — Splash -> Connexion
// Durée d'affichage du splash : 1 seconde

document.addEventListener("DOMContentLoaded", () => {
  const splash = document.getElementById("splash-screen");
  const auth = document.getElementById("auth-screen");

  if (!splash || !auth) return;

  auth.style.display = "none";

  setTimeout(() => {
    splash.classList.add("splash-hidden");

    setTimeout(() => {
      splash.style.display = "none";
      auth.style.display = "block";
    }, 150);
  }, 1000);
});
