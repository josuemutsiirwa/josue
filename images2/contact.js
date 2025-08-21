document.getElementById("myForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Empêche l'envoi du formulaire

  // Récupération des champs
  const nom = document.getElementById("nom").value.trim();
  const number = document.getElementById("number").value.trim();
  const email = document.getElementById("email").value.trim();

  const messageError = document.getElementById("messageError");
  const messageSucces = document.getElementById("messageSucces");

  messageError.textContent = "";
  messageSucces.textContent = "";

  // Regex de validation
  const nameRegex = /^[a-zA-Z\s\-]{2,}$/; // au moins 2 lettres
  const phoneRegex = /^\d{10}$/;          // exactement 10 chiffres
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // e-mail simple

  // Vérification
  if (!nameRegex.test(nom)) {
    messageError.textContent = "❌ Nom invalide (au moins 2 lettres).";
    return;
  }

  if (!phoneRegex.test(number)) {
    messageError.textContent = "❌ Numéro de téléphone invalide (10 chiffres requis).";
    return;
  }

  if (!emailRegex.test(email)) {
    messageError.textContent = "❌ Adresse email invalide.";
    return;
  }

  // Si tout est bon
  messageSucces.textContent = "✅ Formulaire envoyé avec succès !";
  console.log("Nom :", nom);
  console.log("Téléphone :", number);
  console.log("Email :", email);

  // Optionnel : Réinitialiser le formulaire
  document.getElementById("myForm").reset();
});
