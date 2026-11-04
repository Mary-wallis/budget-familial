// ===========================
// SAUVEGARDE
// ===========================

function sauvegarder() {

    const data = {
        salaire: document.getElementById("salaire").value,
        salaireMari: document.getElementById("salaireMari").value,
        autresRevenus: document.getElementById("autresRevenus").value,
        especes: document.getElementById("especes").value,
        courses: document.getElementById("courses").value,
        tirelireHistorique: tirelireHistorique,
        coursesHistorique: coursesHistorique
    };

    localStorage.setItem(
        "budgetFamilial",
        JSON.stringify(data)
    );
}

function charger() {

    const data =
        JSON.parse(localStorage.getItem("budgetFamilial"));

    if (!data) return;

    document.getElementById("salaire").value =
        data.salaire || "";

    document.getElementById("salaireMari").value =
        data.salaireMari || "";

    document.getElementById("autresRevenus").value =
        data.autresRevenus || "";

    document.getElementById("especes").value =
        data.especes || "";

    document.getElementById("courses").value =
        data.courses || "";

    tirelireHistorique =
        data.tirelireHistorique || [];

    coursesHistorique =
        data.coursesHistorique || [];

    afficherTirelire();
    afficherCourses();
}

// ===========================
// TIRELIRE
// ===========================

let tirelireHistorique = [];

function ajouterDepot() {

    let personne =
        document.getElementById("personneDepot").value;

    let montant =
        Number(document.getElementById("montantDepot").value);

    if (!montant) return;

    tirelireHistorique.push({
        date: new Date().toLocaleDateString(),
        personne,
        montant
    });

    afficherTirelire();
    sauvegarder();
}

function afficherTirelire() {

    let liste =
        document.getElementById("historiqueTirelire");

    if (!liste) return;

    liste.innerHTML = "";

    tirelireHistorique.forEach(depot => {

        liste.innerHTML += `
        <li>
        ${depot.date}
        -
        ${depot.personne}
        :
        ${depot.montant} €
        </li>
        `;
    });
}

// ===========================
// COURSES
// ===========================

let coursesHistorique = [];

function ajouterCourse() {

    let magasin =
        document.getElementById("magasinCourse").value;

    let montant =
        Number(document.getElementById("montantCourse").value);

    if (!montant) return;

    coursesHistorique.push({
        date: new Date().toLocaleDateString(),
        magasin,
        montant
    });

    afficherCourses();
    sauvegarder();
}

function afficherCourses() {

    let liste =
        document.getElementById("historiqueCourses");

    if (!liste) return;

    liste.innerHTML = "";

    coursesHistorique.forEach(course => {

        liste.innerHTML += `
        <li>
        ${course.date}
        -
        ${course.magasin}
        :
        ${course.montant} €
        </li>
        `;
    });
}

// ===========================
// CALCUL GLOBAL
// ===========================

function calculer() {

    let salaire =
        Number(document.getElementById("salaire").value);

    let salaireMari =
        Number(document.getElementById("salaireMari").value);

    let autresRevenus =
        Number(document.getElementById("autresRevenus").value);

    let especes =
        Number(document.getElementById("especes").value);

    let courses =
        Number(document.getElementById("courses").value);

    let depenses = courses;

    document.querySelectorAll(".depense")
        .forEach(input => {
            depenses += Number(input.value);
        });

    let revenus =
        salaire +
        salaireMari +
        autresRevenus +
        especes;

    let reste =
        revenus - depenses;

    let epargne =
        reste > 0 ? reste : 0;

    document.getElementById("revenusTotal")
        .innerText = revenus.toFixed(2) + " €";

    document.getElementById("depensesTotal")
        .innerText = depenses.toFixed(2) + " €";

    document.getElementById("resteTotal")
        .innerText = reste.toFixed(2) + " €";

    document.getElementById("epargneTotal")
        .innerText = epargne.toFixed(2) + " €";

    sauvegarder();
}

window.onload = function () {

    charger();

};
let historiqueMois =
    JSON.parse(localStorage.getItem("historiqueMois")) || [];

function enregistrerMois() {
if (
    revenus === "0 €" &&
    depenses === "0 €"
) {
    alert(
        "Veuillez calculer un budget avant d'enregistrer."
    );
    return;
}

historiqueMois.push({
    annee,
    mois,
    revenus,
    depenses,
    epargne
});

    localStorage.setItem(
        "historiqueMois",
        JSON.stringify(historiqueMois)
    );

    afficherHistorique();
}

function afficherHistorique() {

    let tbody =
        document.querySelector("#tableHistorique tbody");

    if (!tbody) return;

    tbody.innerHTML = "";

    historiqueMois.forEach((item, index) => {
tbody.innerHTML += `
<tr>
    <td>${item.annee}</td>
    <td>${item.mois}</td>
    <td>${item.revenus}</td>
    <td>${item.depenses}</td>
    <td>${item.epargne}</td>
    <td>
        <button onclick="supprimerMois(${index})">
            🗑️
        </button>
    </td>
</tr>
`;

    });
}

window.addEventListener(
    "load",
    afficherHistorique
);
async function enregistrerMois() {

    let mois =
        document.getElementById("mois").value;

    let annee =
        document.getElementById("annee").value;

    let existe = historiqueMois.find(
        item =>
        item.mois === mois &&
        item.annee === annee
    );

    if (existe) {
        alert(
            "⚠️ Ce mois est déjà enregistré."
        );
        return;
    }

    let revenus =
        document.getElementById("revenusTotal").innerText;

    let depenses =
        document.getElementById("depensesTotal").innerText;

    let epargne =
        document.getElementById("epargneTotal").innerText;
    if (
    revenus === "0 €" &&
    depenses === "0 €"
) {
    alert(
        "Veuillez calculer un budget avant d'enregistrer."
    );
    return;
}
    historiqueMois.push({
        annee,
        mois,
        revenus,
        depenses,
        epargne
    });
try {

    await addDoc(
        collection(db, "budgets"),
        {
            annee,
            mois,
            revenus,
            depenses,
            epargne,
            dateCreation: new Date().toISOString()
        }
    );

    console.log("✅ Budget envoyé dans Firestore");

} catch (erreur) {

    console.error(
        "Erreur Firestore :",
        erreur
    );
}
    localStorage.setItem(
        "historiqueMois",
        JSON.stringify(historiqueMois)
    );

    afficherHistorique();

    alert("✅ Budget enregistré");
}
function supprimerMois(index) {

    if (!confirm("Supprimer ce mois ?")) {
        return;
    }

    historiqueMois.splice(index, 1);

    localStorage.setItem(
        "historiqueMois",
        JSON.stringify(historiqueMois)
    );

    afficherHistorique();
}
async function testFirestore() {

    try {

        await addDoc(
            collection(db, "budgets"),
            {
                test: "Bonjour depuis mon application",
                date: new Date().toLocaleString()
            }
        );

        alert("✅ Donnée envoyée à Firestore");

    } catch (erreur) {

        console.error(erreur);

        alert("❌ Erreur Firestore");
    }

}
async function chargerDepuisFirestore() {

    try {

        const snapshot =
            await getDocs(
                collection(db, "budgets")
            );

        historiqueMois = [];

        snapshot.forEach(doc => {

            const data = doc.data();

            if (
                data.mois &&
                data.annee
            ) {

                historiqueMois.push({
                    annee: data.annee,
                    mois: data.mois,
                    revenus: data.revenus,
                    depenses: data.depenses,
                    epargne: data.epargne
                });

            }

        });

        afficherHistorique();

        console.log(
            "✅ Budgets chargés depuis Firestore"
        );

    } catch (erreur) {

        console.error(
            "❌ Erreur chargement Firestore :",
            erreur
        );

    }

}
async function connexion() {

    let email =
        document.getElementById("email").value;

    let motdepasse =
        document.getElementById("motdepasse").value;

    try {

        await signInWithEmailAndPassword(
            auth,
            email,
            motdepasse
        );

        alert("✅ Connexion réussie");

        document.getElementById("connexionCard")
    .style.display = "none";

document.getElementById("application")
    .style.display = "block";

        await chargerDepuisFirestore();

    } catch (erreur) {

        console.error(erreur);

        alert("❌ Échec de connexion");

    }

}
async function deconnexion() {

    await signOut(auth);

    document.getElementById("connexionCard")
        .style.display = "block";

    document.getElementById("application")
        .style.display = "none";
}
