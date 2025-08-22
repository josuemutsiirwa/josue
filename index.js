document.addEventListener('DOMContentLoaded', function() {
  // Boutons pour ajouter un produit au panier
  var boutonsAjouter = document.querySelectorAll('.btn-commander');

  boutonsAjouter.forEach(function(bouton) {
    bouton.addEventListener('click', function(event) {
      event.preventDefault();

      var produitElement = bouton.closest('.produit-item');
      var nom = produitElement.querySelector('.nom-produit').textContent.trim();
      var prixTexte = produitElement.querySelector('.prix').textContent.trim();

      if (!nom || !prixTexte) {
        alert("Erreur lors de la récupération du produit.");
        return;
      }

      var prix = parseFloat(prixTexte.replace('$', '').replace(',', '.'));
      if (isNaN(prix)) {
        alert("Prix invalide.");
        return;
      }

      // Récupérer le panier ou créer un tableau vide
      var panier = JSON.parse(localStorage.getItem('panier')) || [];

      // Ajouter le produit au panier
      panier.push({ nom: nom, prix: prix });

      // Sauvegarder dans localStorage
      localStorage.setItem('panier', JSON.stringify(panier));

      console.log('Produit ajouté : ' + nom + ' - ' + prix.toFixed(2) + '$');
      alert('"' + nom + '" a été ajouté au panier.');
    });
  });

  // Affichage du panier sur la page commandes.html
  var tbody = document.querySelector('tbody');
  var totalEl = document.getElementById('prix-total');
  var validerBtn = document.getElementById('validerCommande');
  var carteInput = document.getElementById('carte');

  if (tbody && totalEl && validerBtn && carteInput) {
    var panier = JSON.parse(localStorage.getItem('panier')) || [];

    function afficherPanier() {
      tbody.innerHTML = '';

      if (panier.length === 0) {
        tbody.innerHTML = '<tr><td colspan="3">Votre panier est vide.</td></tr>';
        totalEl.textContent = '0';
        console.log('Panier vide');
        return;
      }

      var total = 0;

      panier.forEach(function(item, index) {
        var tr = document.createElement('tr');
        tr.innerHTML = '<td>' + item.nom + '</td><td>' + item.prix.toFixed(2) + ' $</td>' +
                       '<td><button class="supprimer-btn" data-index="' + index + '">Supprimer</button></td>';
        tbody.appendChild(tr);
        total += item.prix;
      });

      totalEl.textContent = total.toFixed(2);
      console.log('Panier affiché:', panier);

      // Ajouter écouteurs sur boutons supprimer
      var boutonsSupprimer = document.querySelectorAll('.supprimer-btn');
      boutonsSupprimer.forEach(function(btn) {
        btn.addEventListener('click', function() {
          var index = parseInt(btn.getAttribute('data-index'));
          var produitSupprime = panier[index];
          panier.splice(index, 1);
          localStorage.setItem('panier', JSON.stringify(panier));
          console.log('Produit supprimé : ' + produitSupprime.nom);
          afficherPanier();
        });
      });
    }

    validerBtn.addEventListener('click', function() {
      var carte = carteInput.value.trim();

      if (carte.length < 12) {
        alert('Numéro de carte invalide. Veuillez entrer au moins 12 chiffres.');
        return;
      }

      if (panier.length === 0) {
        alert('Votre panier est vide.');
        return;
      }

      var total = 0;
      panier.forEach(function(p) {
        total += p.prix;
      });

      console.log('Commande validée. Carte: ' + carte + ', Total: ' + total.toFixed(2) + '$');
      alert('Commande validée avec succès !\nCarte : ' + carte + '\nTotal : ' + total.toFixed(2) + ' $');

      panier = [];
      localStorage.removeItem('panier');
      afficherPanier();
      carteInput.value = '';
    });

    afficherPanier();
  }
});
document.querySelector(".navbar div.options").addEventListener("click", ()=>{
  let div = document.querySelector(".navbar");
  div.classList.add("active")
})