// Ecrire une fonction qui prend un argument, qui puisse formatter le prix en français et qui retourne un ou plusieurs prix en euros.

// * "Je Suis une Chaine" => Erreur (avec la classe Error/ try/catch) "Aucune valeur à traduire"
// * "Je suis une Chaine qui contient un nombre: 232.75" => "232,75€"
// * 756.75" => "756,75€"
// * 12.3456 => "12,3456€"
// * 12 345 623 => "12'345'623€"
// * [12.75, 15.5, 10, 2] => ["12,75€", "15,5€", "10€", "2€"]
// * {title: "Produit num. 1", ht: "250", ttc: "255.5", tva: 20} => { ht: "250€", ttc: "255,5€"}

// * "Je Suis une Chaine"


function prixEnEuros(x) {
  //Valide que les chaines de caractères sans chiffres
  let sansChiffres = /^[\D]+$/g;

  //Test si la chaîne de caractère est de type "okokezc 123.12"
  let lettresEtChiffres = /(\D\s[\d]+\.{0,1}[\d]+)/;
  //Test pour filter les chaines du tableau qui correspent au format "nombre.nombre"
  let queDesChiffres = /^[\d]+.?[\d]{0,}$/;

  // Test 1 234 ou 12 234 ou 1 234 234 etc
  let nombresAEspaces = /^[\d]{1,3}$|^[\d]{1,3}(\s[\d]{3})*$/;

  // x est un nombre ou une chaine de caractère
  if (typeof x === "string" || typeof x === "number") {
    // On s'assure de tout transformer en string
    let test = x.toString();
    // Je suis une chaîne de caractère qui ne contient pas de chiffre
    if (sansChiffres.test(test)) {
      // return `Aucune valeur à traduire`;
      throw new Error("il n'a que des lettres dans cettes chaîne de caractères")

    }
    // "Je suis une Chaine qui contient un nombre: 232.75" => "232,75€"
    else if (lettresEtChiffres.test(test)) {
      let transform = test
        .split(" ")
        .filter(x => queDesChiffres.test(x))
        .toString("")
        .replace(/\./, ",");
      return `${transform}€`;
    }
    // * 756.75" => "756,75€"
    // * 12.3456 => "12,3456€"
    else if (queDesChiffres.test(test)) {
      let transform = test.replace(/\./, ",");
      return `${transform}€`;
    } else if (nombresAEspaces.test(test)) {
      let transform = test.replace(/\s/g, "`");
      return `${transform}€`;
    }
  }
  //on filtre si c'est un objet ou un tableau
  else if (typeof x === "object") {
    //Si c'est un Array
    if (Array.isArray(x)) {
      let transform = x
        .map(x => x + "€")
        .toString("")
        .replace(/,/g, " ")
        .replace(/\./g, ",")
        .split(" ");
      return transform;
    } else {
      for (element in x) {
        if (typeof x[element] === "string" && queDesChiffres.test(x[element])) {
          x[element] = x[element].replace(/\./g, ",") + "€";
        }
      }
      let { ht, ttc } = x;
      return { ht, ttc };
    }
  }
}
// ----------          TESTS           ---------------------

let testing = [
  "Je suis une Chaine qui contient un nombre: 232.75",
  "756.75",
  12.3456,
  "Je Suis une Chaine",
  [12.75, 15.5, 10, 2],
  "12 345 623",
  {
    title: "Produit num. 1",
    ht: "2",
    ttc: "255.5",
    tva: 20
  }
];

// console.log(testing.map(x => prixEnEuros(x)));

try {
  testing.map(x => prixEnEuros(x));
}
catch(error) {
  console.error(error.message);
}
