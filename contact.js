document.getElementById("myForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const nom = document.getElementById("nom").value.trim();
  const number = document.getElementById("number").value.trim();
  const email = document.getElementById("email").value.trim();
  const errorMsg = document.getElementById("messageError");
  const successMsg = document.getElementById("messageSucces");

  errorMsg.textContent = "";
  successMsg.textContent = "";

  // Vérifications simples
  if (nom.length < 2) {
    errorMsg.textContent = "❌ Le nom doit contenir au moins 2 caractères.";
    return;
  }

  if (!/^\d{9,15}$/.test(number)) {
    errorMsg.textContent = "❌ Le numéro doit contenir entre 9 et 15 chiffres.";
    return;
  }

  if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,6}$/.test(email)) {
    errorMsg.textContent = "❌ Adresse e-mail invalide.";
    return;
  }

  // ✅ Affichage dans la console
  console.log("Nom :", nom);
  console.log("Numéro :", number);
  console.log("Email :", email);

  successMsg.textContent = "✅ Formulaire envoyé avec succès !";

  this.reset(); // Réinitialiser le formulaire après l'envoi
});
