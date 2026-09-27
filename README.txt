XonaTSA — Codes Splash + Authentification

Fichiers :
1. splash-transition.js
   - Affiche le splash pendant 1000 ms.
   - Transition courte et fluide vers la connexion.

2. auth-html-snippet.html
   - Sélecteur E-mail / Téléphone.
   - Indicatifs : +228, +225, +229, +233, +237.

3. auth.css
   - Styles du sélecteur et de la transition.

4. auth.js
   - Bascule E-mail/Téléphone.
   - Validation du numéro.
   - Anti double-clic.
   - Préparation pour Firebase Authentication.
   - Aucun mot de passe stocké dans localStorage/sessionStorage.

IMPORTANT :
- Ces fichiers ne contiennent pas de clés Firebase.
- L'authentification réelle doit être branchée sur Firebase Authentication
  ou ton backend existant.
- Pour le téléphone, utiliser Firebase Phone Authentication + SMS.
- Ne jamais vérifier ou stocker un mot de passe uniquement côté navigateur.
- Adapter /home.html à la route réelle de ton application si nécessaire.
