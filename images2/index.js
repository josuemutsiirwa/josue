// Charger le panier depuis localStorage
let panier = JSON.parse(localStorage.getItem("panier")) || [];

// Ajouter un produit au panier
document.querySelectorAll(".btn-commander").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const produit = btn.closest(".produit-item");
    const nom = produit.querySelector(".nom-produit").textContent;
    const prix = parseFloat(produit.querySelector(".prix").textContent.replace("$", "").trim());

    panier.push({ nom, prix });
    localStorage.setItem("panier", JSON.stringify(panier));
    alert(`${nom} ajouté au panier.`);
  });
});

// Cibler le bouton "Commander" de la navbar
const boutonCommander = document.querySelector(".btn button");

// Afficher le récapitulatif dans la modale
// boutonCommander.addEventListener("click", () => {
  if (panier.length === 0) {
    document.querySelector("tbody").style.display = "none"
    // alert("Votre panier est vide.");
    // return;
  }

  const modal = document.getElementById("modalCommande");
  const tbody = modal.querySelector("tbody");
  const totalEl = document.getElementById("prix-total");

  tbody.innerHTML = "";
  let total = 0;

  panier.forEach((item, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.nom}</td>
      <td>${item.prix} $</td>
      <td><button class="btn-supprimer" data-index="${index}">Supprimer</button></td>
      </br>
    `;
    tbody.appendChild(row);
    total += item.prix;
  });

  totalEl.textContent = total.toFixed(2);
  modal.style.display = "block";

  // Ajouter les événements de suppression
document.querySelectorAll(".btn-supprimer").forEach((btn) => {
    btn.addEventListener("click", () => {
      const index = btn.getAttribute("data-index");
      panier.splice(index, 1);
      localStorage.setItem("panier", JSON.stringify(panier));
      // boutonCommander.click(); // recharge le contenu
      alert("element supprimme")
  });
});
  
// });

// Fermer la modale avec le bouton "×"
// document.querySelector(".close").addEventListener("click", () => {
//   document.getElementById("modalCommande").style.display = "none";
// });

// Valider la commande
document.getElementById("validerCommande").addEventListener("click", () => {
  const numeroCarte = document.getElementById("carte").value.trim();

  if (numeroCarte === "" || numeroCarte.length < 12) {
    alert("❌ Veuillez entrer un numéro de carte valide.");
    return;
  }

  const total = panier.reduce((sum, p) => sum + p.prix, 0);

  console.log("🧾 Produits commandés :");
  panier.forEach((p, i) => console.log(`${i + 1}. ${p.nom} - ${p.prix} $`));
  console.log("💳 Carte utilisée :", numeroCarte);
  console.log("💵 Total à payer :", total.toFixed(2) + " $");

  alert("✅ Commande validée avec succès !");
  panier = [];
  localStorage.removeItem("panier");

  document.getElementById("modalCommande").style.display = "none";
  window.location.reload(); // recharge la page et cache le recap
});
  // const modal = document.getElementById("modalCommande");
  // const tbody = modal.querySelector("tbody");

if (panier.length === 0) {
    tbody.innerHTML = "";
    // alert("Votre panier est vide.");
    // return;
}