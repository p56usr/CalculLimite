"use strict";
// ------- GLOBALS -------
const logIn = document.querySelector(".login_container");
const btnCloseLogin = document.querySelector(".close_modal");
const btnShowLogin = document.querySelector(".menu_login");

// ------- FUNCTIONS -------
// - SLIDE NAVBAR
function navSlide() {
  const navMenu = document.querySelector(".nav_menu");
  const navLinks = document.querySelectorAll(".nav_links li");
  const nav = document.querySelector(".nav_links");

  navMenu.addEventListener("click", () => {
    //Toggle Nav
    nav.classList.toggle("nav-active");

    //Animate Links
    navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = "";
      } else {
        link.style.animation = `navLinkFade 0.3s ease forwards ${
          index / 5 + 0.3
        }s`;
      }
    });
    //Menu Animation
    navMenu.classList.toggle("toggle");
  });
}

navSlide();

// --- LOG IN
const showLogin = function () {
  logIn.classList.remove("hidden");
};

const closeLogin = function () {
  logIn.classList.add("hidden");
};

btnShowLogin.addEventListener("click", (e) => {
  e.preventDefault();
  showLogin();
});
btnCloseLogin.addEventListener("click", (e) => {
  e.preventDefault();
  closeLogin();
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !logIn.classList.contains("hidden")) {
    closeLogin();
  }
});

window.addEventListener("click", (e) => {
  // click outside modal to close it
  if (e.target == logIn) {
    closeLogin();
  } else {
    false;
  }
});

window.addEventListener("load", (e) => {
  e.preventDefault();
});

// - Validate the input
function errorDisplay(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form_control error";
  const errorMessage = formControl.querySelector("small");
  errorMessage.innerText = message;
}

function successDisplay(input) {
  const formControl = input.parentElement;
  formControl.className = "form_control success";
}

function resetInputDefaults(input) {
  const formControl = input.parentElement;
  formControl.classList.remove("success");
  formControl.classList.remove("error");
}

const validateInput = function (inputArray) {
  inputArray.forEach((input) => {
    if (input.value === "" || input.value <= 0) {
      errorDisplay(input, "Cimp obligatoriu si valori > 0");
      return false;
    } else {
      successDisplay(input);
      return true;
    }
  });
};

const validateSingleInput = function (input) {
  if (input.value === "" || input.value <= 0) {
    errorDisplay(input, "Cimp obligatoriu si valori > 0");
    return false;
  } else {
    successDisplay(input);
    return true;
  }
};

const clearInput = function (inputArray) {
  inputArray.forEach((input) => {
    input.value = "";
    resetInputDefaults(input);
  });
};

const validateIntervals = function (input, min, max) {
  if (input.value < min || input.value > max) {
    errorDisplay(input, `Valori intre ${min} si ${max}`);
    return false;
  } else {
    successDisplay(input);
    return true;
  }
};

const clearInputFields = function (el, inputArr) {
  el.addEventListener("click", (e) => {
    e.preventDefault();
    clearInput(inputArr);
  });
};

const saveResultsToDB = function (el) {
  el.addEventListener("click", (e) => {
    e.preventDefault();
  });
};

// ------ display the results

const DisplayResults = function (el, result, message) {
  if (result > 0) {
    el.value = result.toFixed(2);
  } else {
    el.value = message;
  }
};

// ------- END FUNCTIONS -------
//---

// ------- IRIGATIE -----------
// ---- Irigatia subterana

const irigDistantaTuburiCunoscuta = document.getElementById(
  "irigatie_distanta_tuburi-cunoscuta"
);

const irigLungimeaLinieiDrenaj = document.getElementById(
  "irigatie_lungimea_liniei_drenaj"
);

const irigInaltimeaRidicariiCapilare = document.getElementById(
  "irigatie_inaltimea_ridicarii_capilare"
);

const irigCoeficientConductibilitateTub = document.getElementById(
  "irigatie_coeficient_conductibilitate-tub"
);

const rezultatIrigDistantaTuburiTxt = document.getElementById(
  "irigatie_rezultat_distanta-tuburi-txt"
);
const resultsIrigDistantaTuburi = document.getElementById(
  "results_irigatie_distanta_tuburi"
);

// selectare optiune
const selectareOptinueDistantaTuburi = document.querySelectorAll(
  "input[name='irigatie_distanta_tuburi']"
);

const irigOptiuneDistantaTuburi = function (input) {
  // change the results label
  for (let option of input) {
    option.addEventListener("click", (e) => {
      rezultatIrigDistantaTuburiTxt.innerHTML = `Distanta tuburi (${option.value}, m) `;
      calculDistantaTuburi(option.value);
    });
  }
};

irigOptiuneDistantaTuburi(selectareOptinueDistantaTuburi);

// calculare distanta tuburi in baza optiunii

const calculDistantaTuburi = function (option_value) {
  if (option_value === "Valoare cunoscuta") {
    clearInput([
      irigDistantaTuburiCunoscuta,
      irigLungimeaLinieiDrenaj,
      irigInaltimeaRidicariiCapilare,
      irigCoeficientConductibilitateTub,
      resultsIrigDistantaTuburi,
    ]);
    irigLungimeaLinieiDrenaj.setAttribute("disabled", "disabled");
    irigInaltimeaRidicariiCapilare.setAttribute("disabled", "disabled");
    irigCoeficientConductibilitateTub.setAttribute("disabled", "disabled");
    irigDistantaTuburiCunoscuta.removeAttribute("disabled");
    irigDistantaTuburiCunoscuta.addEventListener("input", (e) => {
      e.preventDefault();
      if (
        irigDistantaTuburiCunoscuta.value === "" ||
        irigDistantaTuburiCunoscuta.value <= 0
      ) {
        errorDisplay(
          irigDistantaTuburiCunoscuta,
          "Cimp obligatoriu si valori > 0"
        );
        DisplayResults(
          resultsIrigDistantaTuburi,
          undefined,
          "Verificati datele ..."
        );
      } else {
        successDisplay(irigDistantaTuburiCunoscuta);
        DisplayResults(
          resultsIrigDistantaTuburi,
          parseFloat(irigDistantaTuburiCunoscuta.value)
        );
      }
    });
  } else {
    clearInput([
      irigDistantaTuburiCunoscuta,
      irigLungimeaLinieiDrenaj,
      irigInaltimeaRidicariiCapilare,
      irigCoeficientConductibilitateTub,
      resultsIrigDistantaTuburi,
    ]);
    irigDistantaTuburiCunoscuta.setAttribute("disabled", "disabled");
    irigLungimeaLinieiDrenaj.removeAttribute("disabled");
    irigInaltimeaRidicariiCapilare.removeAttribute("disabled");
    irigCoeficientConductibilitateTub.removeAttribute("disabled");
    irigareDistantaTuburiValoareCalculata([
      irigLungimeaLinieiDrenaj,
      irigInaltimeaRidicariiCapilare,
      irigCoeficientConductibilitateTub,
    ]);
  }
};

const irigareDistantaTuburiValoareCalculata = function (inputArr) {
  const [lung, capilar, coef] = inputArr;
  for (let i of inputArr) {
    i.addEventListener("input", function () {
      validateInput(inputArr);
      const timpul =
        (parseFloat(lung.value) * 2) /
        (2 * parseFloat(capilar.value) * parseFloat(coef.value));
      const distantaTuburi =
        2 *
        Math.sqrt(
          2 * parseFloat(capilar.value) * parseFloat(coef.value) * timpul
        );
      if (distantaTuburi) {
        DisplayResults(resultsIrigDistantaTuburi, distantaTuburi);
      } else {
        DisplayResults(
          resultsIrigDistantaTuburi,
          undefined,
          "Verificati datele ..."
        );
      }
    });
  }
};

// optiuni irigare subterana
const irigareSubteranaLungimeTuburiIN = document.getElementById(
  "irigatie_subterana-lungime-tuburi"
);

const irigareSubteranaConsumApaEvepotranspiratieIN = document.getElementById(
  "irigatie_subterana_consum_apa_evapotranspiratie"
);

const irigareSubteranaNormaUdareNecesaraIN = document.getElementById(
  "irigatie_subterana_norma_udare_necesara"
);

const irigareSubteranaDurataUdariiIN = document.getElementById(
  "irigatie_subterana_durata_udarii"
);

const selectareOptinueIrigareSubterana = document.querySelectorAll(
  "input[name='irigatie_subterana_optiuni']"
);

const btnCalcIrigSubterana = document.getElementById(
  "btnCalc_irigare_subterana"
);

const btnAnuleazaIrigSubterana = document.getElementById(
  "btnAnuleaza_irigare_subterana"
);
const btnSaveToDBIrigSubterana = document.getElementById(
  "btnSaveToDB_irigare_subterana"
);

const irigareSubteranaRezultatTXT = document.getElementById(
  "irigatie_subterana_rezultat-txt"
);

const irigareSubteranaRezultatOUT = document.getElementById(
  "results_irigare_subterana"
);

const irigareSubteranaArr = [
  irigareSubteranaNormaUdareNecesaraIN,
  irigareSubteranaDurataUdariiIN,
  irigareSubteranaLungimeTuburiIN,
  irigareSubteranaConsumApaEvepotranspiratieIN,
];

const irigSubteranaOptiuni = function (inputArr) {
  // change the results label
  for (let option of inputArr) {
    option.addEventListener("click", (e) => {
      irigareSubteranaRezultatTXT.innerHTML = `Debit apa (l/s) pentru ${option.value} `;
      calcIrigSubterana(option.value);
    });
  }
};

irigSubteranaOptiuni(selectareOptinueIrigareSubterana);

const calcIrigSubterana = function (option) {
  if (option === "Irigare Subterana Continua") {
    clearInput(irigareSubteranaArr.concat(irigareSubteranaRezultatOUT));
    irigareSubteranaNormaUdareNecesaraIN.setAttribute("disabled", "disabled");
    irigareSubteranaDurataUdariiIN.setAttribute("disabled", "disabled");
    irigareSubteranaLungimeTuburiIN.removeAttribute("disabled");
    irigareSubteranaConsumApaEvepotranspiratieIN.removeAttribute("disabled");
    calcIrigareSubteranaContinua(option);
  } else {
    clearInput(irigareSubteranaArr.concat(irigareSubteranaRezultatOUT));
    irigareSubteranaConsumApaEvepotranspiratieIN.setAttribute(
      "disabled",
      "disabled"
    );
    irigareSubteranaNormaUdareNecesaraIN.removeAttribute("disabled");
    irigareSubteranaDurataUdariiIN.removeAttribute("disabled");
    calcIrigareSubteranaPeriodica(option);
  }
};

const calcIrigareSubteranaContinua = function (option) {
  if (option === "Irigare Subterana Continua") {
    const irigareSubteranaContArr = [
      irigareSubteranaLungimeTuburiIN,
      irigareSubteranaConsumApaEvepotranspiratieIN,
    ];

    btnCalcIrigSubterana.addEventListener("click", (e) => {
      e.preventDefault();
      resetInputDefaults(irigareSubteranaNormaUdareNecesaraIN);
      resetInputDefaults(irigareSubteranaDurataUdariiIN);
      const checkLungime = validateSingleInput(irigareSubteranaLungimeTuburiIN);
      const checkConsumApaEvapoTrans = validateSingleInput(
        irigareSubteranaConsumApaEvepotranspiratieIN
      );

      if (
        checkLungime &&
        checkConsumApaEvapoTrans &&
        parseFloat(resultsIrigDistantaTuburi.value) > 0
      ) {
        const resultsIrigareSubterana =
          (parseFloat(resultsIrigDistantaTuburi.value) *
            parseFloat(irigareSubteranaLungimeTuburiIN.value) *
            parseFloat(irigareSubteranaConsumApaEvepotranspiratieIN.value)) /
          86.4;

        DisplayResults(irigareSubteranaRezultatOUT, resultsIrigareSubterana);
      } else {
        DisplayResults(
          irigareSubteranaRezultatOUT,
          undefined,
          "Verificati datele ..."
        );
      }
    });
    clearInputFields(
      btnAnuleazaIrigSubterana,
      irigareSubteranaContArr.concat(irigareSubteranaRezultatOUT)
    );
    saveResultsToDB(btnSaveToDBIrigSubterana);
  }
};

const calcIrigareSubteranaPeriodica = function (option) {
  if (option === "Irigare Subterana Periodica") {
    const irigareSubteranaPerArr = [
      irigareSubteranaLungimeTuburiIN,
      irigareSubteranaNormaUdareNecesaraIN,
      irigareSubteranaDurataUdariiIN,
    ];
    btnCalcIrigSubterana.addEventListener("click", (e) => {
      e.preventDefault();
      resetInputDefaults(irigareSubteranaConsumApaEvepotranspiratieIN);
      const checkLungime = validateSingleInput(irigareSubteranaLungimeTuburiIN);
      const checkNormaUdare = validateSingleInput(
        irigareSubteranaNormaUdareNecesaraIN
      );
      const checkDurataUdarii = validateSingleInput(
        irigareSubteranaDurataUdariiIN
      );

      if (
        checkLungime &&
        checkNormaUdare &&
        checkDurataUdarii &&
        parseFloat(resultsIrigDistantaTuburi.value) > 0
      ) {
        const resultsIrigareSubterana =
          (parseFloat(resultsIrigDistantaTuburi.value) *
            parseFloat(irigareSubteranaLungimeTuburiIN.value) *
            parseFloat(irigareSubteranaNormaUdareNecesaraIN.value)) /
          (86.4 * parseFloat(irigareSubteranaDurataUdariiIN.value) * 10000);

        DisplayResults(irigareSubteranaRezultatOUT, resultsIrigareSubterana);
      } else {
        DisplayResults(
          irigareSubteranaRezultatOUT,
          undefined,
          "Verificati datele ..."
        );
      }
    });
    clearInputFields(
      btnAnuleazaIrigSubterana,
      irigareSubteranaPerArr.concat(irigareSubteranaRezultatOUT)
    );
    saveResultsToDB(btnSaveToDBIrigSubterana);
  }
};

// Irigare pomicula
// Norma de irigare

const irigarePomiculaETPotentialaIN = document.getElementById(
  "irigatie_pomicula_et-potentiala"
);

const irigarePomiculaRezervaFinalaIN = document.getElementById(
  "irigatie_pomicula_rezerva-finala"
);

const irigarePomiculaRezervaInitialaIN = document.getElementById(
  "irigatie_pomicula_rezerva-initiala"
);

const irigarePomiculaSumaPrecipitatiilorIN = document.getElementById(
  "irigatie_pomicula_suma-precipitatiilor"
);

const irigarePomiculaRezultatNormaIrigareOUT = document.getElementById(
  "results_irigatie_pomicula-norma_irigare"
);

const irigarePomiculaNormaIrigareAllInputsArr = [
  irigarePomiculaETPotentialaIN,
  irigarePomiculaRezervaFinalaIN,
  irigarePomiculaRezervaInitialaIN,
  irigarePomiculaSumaPrecipitatiilorIN,
];

const calcIrigarePomiculaNormaIrigare = function (inputArr) {
  const [et, rezervFin, rezervInit, sumaPrec] = inputArr;
  for (let i of inputArr) {
    i.addEventListener("input", function () {
      validateInput(inputArr);
      if (validateSingleInput(i)) {
        const normaIrigare =
          parseFloat(et.value) +
          parseFloat(rezervFin.value) -
          parseFloat(rezervInit.value) -
          parseFloat(sumaPrec.value);

        if (normaIrigare > 0) {
          DisplayResults(irigarePomiculaRezultatNormaIrigareOUT, normaIrigare);
        } else {
          DisplayResults(
            irigarePomiculaRezultatNormaIrigareOUT,
            undefined,
            "Verificati datele ..."
          );
        }
      } else {
        irigarePomiculaRezultatNormaIrigareOUT.value = "Verificati datele ...";
      }
    });
  }
};

calcIrigarePomiculaNormaIrigare(irigarePomiculaNormaIrigareAllInputsArr);

// Norma de udare vars

const irigarePomiculaGrosimeStratSolIN = document.getElementById(
  "irigatie_pomicula_grosime_strat_sol"
);
const irigarePomiculaGreutateVolumetricaIN = document.getElementById(
  "irigatie_pomicula_greutate_volumetrica"
);
const irigarePomiculaCapacitateCampIN = document.getElementById(
  "irigatie_pomicula_capacitate_camp"
);
const irigarePomiculaRezervaApeiIN = document.getElementById(
  "irigatie_pomicula_rezerva_apei"
);
const irigarePomiculaRezultatNormaUdareNetaOUT = document.getElementById(
  "results_irigatie_pomicula-norma_udare_neta"
);

const irigarePomiculaNormaUdareAllInputsArr = [
  irigarePomiculaGrosimeStratSolIN,
  irigarePomiculaGreutateVolumetricaIN,
  irigarePomiculaCapacitateCampIN,
  irigarePomiculaRezervaApeiIN,
];

// Timpul de udare vars
const irigarePomiculaCantitatePrecipitatiiIN = document.getElementById(
  "irigatie_pomicula_cantitate_precipitatii"
);
const irigarePomiculaEvapotranspiratieZilnicaIN = document.getElementById(
  "irigatie_pomicula_evapotranspiratie_zilnica"
);
const irigarePomiculaRezultatIntervalTimpOUT = document.getElementById(
  "results_irigatie_pomicula_interval_timp"
);

const irigarePomiculaTimpulUdareAllInputsArr = [
  irigarePomiculaCantitatePrecipitatiiIN,
  irigarePomiculaEvapotranspiratieZilnicaIN,
];

// Debit specific vars
const irigarePomiculatimpMaxIN = document.getElementById(
  "irigatie_pomicula_dimensionare_sistem_timp-max"
);
const irigarePomiculaRezultatDebitSpecificOUT = document.getElementById(
  "results_irigatie_pomicula_debit_specific"
);

//-Irigare Pomicula Functions---
const calcIrigarePomiculaNormaUdareNeta = function (inputArr) {
  const [grosimeStrat, greutateVol, capacitateCamp, rezervaApei] = inputArr;
  for (let i of inputArr) {
    i.addEventListener("input", function () {
      validateInput(inputArr);
      clearInput(
        irigarePomiculaTimpulUdareAllInputsArr.concat([
          irigarePomiculaRezultatIntervalTimpOUT,
          irigarePomiculatimpMaxIN,
          irigarePomiculaRezultatDebitSpecificOUT,
        ])
      );
      if (validateSingleInput(i)) {
        const normaUdare =
          100 *
          parseFloat(grosimeStrat.value) *
          parseFloat(greutateVol.value) *
          (parseFloat(capacitateCamp.value) - parseFloat(rezervaApei.value));

        if (normaUdare > 0) {
          DisplayResults(irigarePomiculaRezultatNormaUdareNetaOUT, normaUdare);
        } else {
          DisplayResults(
            irigarePomiculaRezultatNormaUdareNetaOUT,
            undefined,
            "Verificati datele ..."
          );
        }
      } else {
        irigarePomiculaRezultatNormaUdareNetaOUT.value =
          "Verificati datele ...";
      }
    });
  }
};

calcIrigarePomiculaNormaUdareNeta(irigarePomiculaNormaUdareAllInputsArr);

const calcIrigarePomiculaTimpulUdare = function (inputArr) {
  inputArr.forEach((el) => {
    el.addEventListener("input", (e) => {
      e.preventDefault();
      validateInput(inputArr);
      const checkCantitatePrecip = validateSingleInput(
        irigarePomiculaCantitatePrecipitatiiIN
      );
      const checEvapotransZilnica = validateSingleInput(
        irigarePomiculaEvapotranspiratieZilnicaIN
      );
      if (
        checkCantitatePrecip &&
        checEvapotransZilnica &&
        parseFloat(irigarePomiculaRezultatNormaUdareNetaOUT.value)
      ) {
        const resultTimpulUdarii =
          (parseFloat(irigarePomiculaRezultatNormaUdareNetaOUT.value) +
            parseFloat(irigarePomiculaCantitatePrecipitatiiIN.value)) /
          parseFloat(irigarePomiculaEvapotranspiratieZilnicaIN.value);
        DisplayResults(
          irigarePomiculaRezultatIntervalTimpOUT,
          resultTimpulUdarii
        );
      } else {
        DisplayResults(
          irigarePomiculaRezultatIntervalTimpOUT,
          undefined,
          "Verificati datele ..."
        );
      }
    });
  });
};

calcIrigarePomiculaTimpulUdare(irigarePomiculaTimpulUdareAllInputsArr);

// Dimensionarea sistemului de irigație - Debit specific de apa

const calcIrigarePomiculaDebitSpecificCulturi = function () {
  irigarePomiculatimpMaxIN.addEventListener("input", function (e) {
    e.preventDefault();
    const checkTimpMax = validateSingleInput(irigarePomiculatimpMaxIN);
    if (
      checkTimpMax &&
      parseFloat(irigarePomiculaRezultatNormaUdareNetaOUT.value)
    ) {
      const resultDebitSpecific =
        (parseFloat(irigarePomiculaRezultatNormaUdareNetaOUT.value) / 86.4) *
        parseFloat(irigarePomiculatimpMaxIN.value);
      DisplayResults(
        irigarePomiculaRezultatDebitSpecificOUT,
        resultDebitSpecific
      );
    } else {
      DisplayResults(
        irigarePomiculaRezultatDebitSpecificOUT,
        undefined,
        "Verificati datele ..."
      );
    }
  });
};
calcIrigarePomiculaDebitSpecificCulturi();

// Irigarea agricola
const calcIrigareAgricolaET = function () {
  const irigatieAgricolaIrigareIN = document.getElementById(
    "irigatie_agricola-irigare"
  );
  const irigatieAgricolaPrecipitatiiIN = document.getElementById(
    "irigatie_agricola-precipitatii"
  );
  const pirigatieAgricolaDrenajIN = document.getElementById(
    "irigatie_agricola-drenaj"
  );
  const irigatieAgricolaRezervaIN = document.getElementById(
    "irigatie_agricola-rezerva"
  );
  const resultsIrigatieAgricolaETOUT = document.getElementById(
    "results_irigatie_agricola-et0"
  );

  [
    irigatieAgricolaIrigareIN,
    irigatieAgricolaPrecipitatiiIN,
    pirigatieAgricolaDrenajIN,
    irigatieAgricolaRezervaIN,
  ].forEach((el) => {
    el.addEventListener("input", (e) => {
      e.preventDefault();
      const checkIrigare = validateSingleInput(irigatieAgricolaIrigareIN);
      const checkPrecipitatii = validateSingleInput(
        irigatieAgricolaPrecipitatiiIN
      );
      const checkDrenaj = validateSingleInput(pirigatieAgricolaDrenajIN);
      const checkRezerva = validateSingleInput(irigatieAgricolaRezervaIN);

      if (checkIrigare && checkPrecipitatii && checkDrenaj && checkRezerva) {
        const resultET =
          parseFloat(irigatieAgricolaIrigareIN.value) +
          parseFloat(irigatieAgricolaPrecipitatiiIN.value) -
          parseFloat(pirigatieAgricolaDrenajIN.value) +
          parseFloat(irigatieAgricolaRezervaIN.value);
        DisplayResults(resultsIrigatieAgricolaETOUT, resultET);
      } else {
        DisplayResults(
          resultsIrigatieAgricolaETOUT,
          undefined,
          "Verificati datele ..."
        );
      }
    });
  });
};

calcIrigareAgricolaET();

// Necesarul de apa Net si Brut
const irigatieAgricolaCoefCulturiiIN = document.getElementById(
  "irigatie_agricola-coeficientul-culturii"
);
const irigatieAgricolaEvapoReferintaIN = document.getElementById(
  "irigatie_agricola-evaporatie-referinta"
);
const irigatieAgricolaNecesarulApaPrecipitatiiUtileIN = document.getElementById(
  "irigatie_agricola-precipitatii-utile"
);
const irigatieAgricolaEficientaParceleiIN = document.getElementById(
  "irigatie_agricola-eficienta-parcelei"
);
const irigatieAgricolaEficientaReteleiIN = document.getElementById(
  "irigatie_agricola-eficienta-retelei"
);
const irigatieAgricolaNecesarulApaRezultatTXT = document.getElementById(
  "irigatie_agricola_rezultat-txt"
);
const resultsIrigatieAgricolaNecesarulApaOUT = document.getElementById(
  "results_irigatie_agricola-necesarul-apa"
);

const selectareOptinueIrigareAgricola = document.querySelectorAll(
  "input[name='irigatie_agricola_necesarul_apa-optiuni']"
);

const irigatieAgricolaArr = [
  irigatieAgricolaCoefCulturiiIN,
  irigatieAgricolaEvapoReferintaIN,
  irigatieAgricolaNecesarulApaPrecipitatiiUtileIN,
  irigatieAgricolaEficientaParceleiIN,
  irigatieAgricolaEficientaReteleiIN,
];

// Select options
const irigAgricolaOptiuni = function (inputArr) {
  // change the results label
  for (let option of inputArr) {
    option.addEventListener("click", (e) => {
      irigatieAgricolaNecesarulApaRezultatTXT.innerHTML = `Necesarul de apa ${option.value} `;
      calcIrigAgricolaOptions(option.value);
    });
  }
};

irigAgricolaOptiuni(selectareOptinueIrigareAgricola);

// Turning on/off parameters based on selected option
const calcIrigAgricolaOptions = function (option) {
  if (option === "Nnet") {
    clearInput(
      irigatieAgricolaArr.concat(resultsIrigatieAgricolaNecesarulApaOUT)
    );
    irigatieAgricolaEficientaParceleiIN.setAttribute("disabled", "disabled");
    irigatieAgricolaEficientaReteleiIN.setAttribute("disabled", "disabled");
    irigatieAgricolaCoefCulturiiIN.removeAttribute("disabled");
    irigatieAgricolaEvapoReferintaIN.removeAttribute("disabled");
    irigatieAgricolaNecesarulApaPrecipitatiiUtileIN.removeAttribute("disabled");
    calcNecesarulapaNnet();
  } else {
    clearInput(
      irigatieAgricolaArr.concat(resultsIrigatieAgricolaNecesarulApaOUT)
    );
    irigatieAgricolaCoefCulturiiIN.removeAttribute("disabled");
    irigatieAgricolaEvapoReferintaIN.removeAttribute("disabled");
    irigatieAgricolaNecesarulApaPrecipitatiiUtileIN.removeAttribute("disabled");
    irigatieAgricolaEficientaParceleiIN.removeAttribute("disabled");
    irigatieAgricolaEficientaReteleiIN.removeAttribute("disabled");
    calcNecesarulapaNbrut();
  }
};

// Calc Necesarul apa Nnet
const calcNecesarulapaNnet = function () {
  [
    irigatieAgricolaCoefCulturiiIN,
    irigatieAgricolaEvapoReferintaIN,
    irigatieAgricolaNecesarulApaPrecipitatiiUtileIN,
  ].forEach((el) => {
    el.addEventListener("input", (e) => {
      e.preventDefault();
      clearInput([
        irigatieAgricolaEficientaParceleiIN,
        irigatieAgricolaEficientaReteleiIN,
      ]);
      const checkCoefCulturii = validateSingleInput(
        irigatieAgricolaCoefCulturiiIN
      );
      const checkEvapo = validateSingleInput(irigatieAgricolaEvapoReferintaIN);
      const checkPrecipitatii = validateSingleInput(
        irigatieAgricolaNecesarulApaPrecipitatiiUtileIN
      );

      if (checkCoefCulturii && checkEvapo && checkPrecipitatii) {
        const resultNnet =
          parseFloat(irigatieAgricolaCoefCulturiiIN.value) *
            parseFloat(irigatieAgricolaEvapoReferintaIN.value) -
          parseFloat(irigatieAgricolaNecesarulApaPrecipitatiiUtileIN.value);
        if (resultNnet !== 0) {
          DisplayResults(resultsIrigatieAgricolaNecesarulApaOUT, resultNnet);
        } else {
          DisplayResults(
            resultsIrigatieAgricolaNecesarulApaOUT,
            undefined,
            "Verificati datele ..."
          );
        }
      } else {
        DisplayResults(
          resultsIrigatieAgricolaNecesarulApaOUT,
          undefined,
          "Verificati datele ..."
        );
      }
    });
  });
};

// Calc Necesarul apa Nbrut
const calcNecesarulapaNbrut = function () {
  [
    irigatieAgricolaCoefCulturiiIN,
    irigatieAgricolaEvapoReferintaIN,
    irigatieAgricolaNecesarulApaPrecipitatiiUtileIN,
    irigatieAgricolaEficientaParceleiIN,
    irigatieAgricolaEficientaReteleiIN,
  ].forEach((el) => {
    el.addEventListener("input", (e) => {
      e.preventDefault();
      const checkCoefCulturii = validateSingleInput(
        irigatieAgricolaCoefCulturiiIN
      );
      const checkEvapo = validateSingleInput(irigatieAgricolaEvapoReferintaIN);
      const checkPrecipitatii = validateSingleInput(
        irigatieAgricolaNecesarulApaPrecipitatiiUtileIN
      );
      const checkEficParcelei = validateSingleInput(
        irigatieAgricolaEficientaParceleiIN
      );
      const checkEficRetelei = validateSingleInput(
        irigatieAgricolaEficientaReteleiIN
      );

      if (
        checkCoefCulturii &&
        checkEvapo &&
        checkPrecipitatii &&
        checkEficParcelei &&
        checkEficRetelei
      ) {
        const resultNbrut =
          (parseFloat(irigatieAgricolaCoefCulturiiIN.value) *
            parseFloat(irigatieAgricolaEvapoReferintaIN.value) -
            parseFloat(irigatieAgricolaNecesarulApaPrecipitatiiUtileIN.value)) /
          (parseFloat(irigatieAgricolaEficientaParceleiIN.value) *
            parseFloat(irigatieAgricolaEficientaReteleiIN.value));
        if (resultNbrut !== 0) {
          DisplayResults(resultsIrigatieAgricolaNecesarulApaOUT, resultNbrut);
        } else {
          DisplayResults(
            resultsIrigatieAgricolaNecesarulApaOUT,
            undefined,
            "Verificati datele ..."
          );
        }
      } else {
        DisplayResults(
          resultsIrigatieAgricolaNecesarulApaOUT,
          undefined,
          "Verificati datele ..."
        );
      }
    });
  });
};
// ------- END IRIGATIE -----------

// ------- ACVAULTURA ------------

const calcAcvaculturaVolumImprospatarePrimenire = function () {
  // Volumul de umplere
  const acvaculturaSuprafatBazinuluiIN = document.getElementById(
    "acvacultura_suprafata-bazinului"
  );
  const acvaculturaInaltimeaIN = document.getElementById(
    "acvacultura_inaltimea"
  );
  const resultsAcvaculturaVolumUmplereOUT = document.getElementById(
    "results_acvacultura_volum-umplere"
  );

  [acvaculturaSuprafatBazinuluiIN, acvaculturaInaltimeaIN].forEach((el) => {
    el.addEventListener("input", (e) => {
      e.preventDefault();
      const checkSuprafata = validateSingleInput(
        acvaculturaSuprafatBazinuluiIN
      );
      const checkInaltime = validateSingleInput(acvaculturaInaltimeaIN);

      if (checkSuprafata && checkInaltime) {
        const resultVolumUmplere =
          parseFloat(acvaculturaSuprafatBazinuluiIN.value) *
          parseFloat(acvaculturaInaltimeaIN.value);
        DisplayResults(resultsAcvaculturaVolumUmplereOUT, resultVolumUmplere);
      } else {
        DisplayResults(
          resultsAcvaculturaVolumUmplereOUT,
          undefined,
          "Verificati datele ..."
        );
      }
    });
  });
  // Volum de improspatare si Primenire
  const acvaculturaNecesaulApaIN = document.getElementById(
    "acvacultura_necesarul-apa"
  );
  const acvaculturaSuprafataBazinIN = document.getElementById(
    "acvacultura_suprafata-bazinului-2"
  );
  const acvaculturaTimpulImprospatareIN = document.getElementById(
    "acvacultura_timpul_improspatare-totala"
  );

  // parametri IN pentru volumul de compensare
  const acvaculturaPierderiEvaporatieIN = document.getElementById(
    "acvacultura_pierderi-evaporatie"
  );
  const acvaculturaPierderiInfiltratieIN = document.getElementById(
    "acvacultura_pierderi-infiltratie"
  );
  // parametri OUT
  const resultsAcvaculturaVolumImprospatareOUT = document.getElementById(
    "results_acvacultura_volum-improspatare"
  );
  const resultsAcvaculturaVolumPrimenireOUT = document.getElementById(
    "results_acvacultura_volum-primenire"
  );
  const resultsAcvaculturaVolumCompensarePierderiOUT = document.getElementById(
    "results_acvacultura_volum-compensare-pierderi"
  );

  [
    acvaculturaNecesaulApaIN,
    acvaculturaSuprafataBazinIN,
    acvaculturaTimpulImprospatareIN,
    acvaculturaPierderiEvaporatieIN,
    acvaculturaPierderiInfiltratieIN,
  ].forEach((el) => {
    el.addEventListener("input", (e) => {
      e.preventDefault();
      const checkNecesarApa = validateIntervals(
        acvaculturaNecesaulApaIN,
        0.1,
        5
      );
      const checkSuprafata = validateSingleInput(acvaculturaSuprafataBazinIN);
      const checkTimpul = validateIntervals(
        acvaculturaTimpulImprospatareIN,
        1,
        18
      );
      const checkEvaporatie = validateSingleInput(
        acvaculturaPierderiEvaporatieIN
      );
      const checkInfiltratie = validateSingleInput(
        acvaculturaPierderiInfiltratieIN
      );

      if (checkNecesarApa && checkSuprafata && checkTimpul) {
        const resultVolumImprospatare =
          parseFloat(acvaculturaNecesaulApaIN.value) *
          parseFloat(acvaculturaSuprafataBazinIN.value) *
          86.4 *
          parseFloat(acvaculturaTimpulImprospatareIN.value);
        const resultVolumPrimenire =
          resultVolumImprospatare *
          (365 / parseFloat(acvaculturaTimpulImprospatareIN.value));
        DisplayResults(
          resultsAcvaculturaVolumImprospatareOUT,
          resultVolumImprospatare
        );
        DisplayResults(
          resultsAcvaculturaVolumPrimenireOUT,
          resultVolumPrimenire
        );
        if (checkEvaporatie && checkInfiltratie) {
          const resultVolumCompensare =
            ((parseFloat(acvaculturaPierderiEvaporatieIN.value) +
              parseFloat(acvaculturaPierderiInfiltratieIN.value)) /
              100) *
            resultVolumPrimenire;
          DisplayResults(
            resultsAcvaculturaVolumCompensarePierderiOUT,
            resultVolumCompensare
          );
        } else {
          DisplayResults(
            resultsAcvaculturaVolumCompensarePierderiOUT,
            undefined,
            "Verificati datele ..."
          );
        }
      } else {
        DisplayResults(
          resultsAcvaculturaVolumImprospatareOUT,
          undefined,
          "Verificati datele ..."
        );
        DisplayResults(
          resultsAcvaculturaVolumPrimenireOUT,
          undefined,
          "Verificati datele ..."
        );
        DisplayResults(
          resultsAcvaculturaVolumCompensarePierderiOUT,
          undefined,
          "Verificati datele ..."
        );
      }
    });
  });
};

calcAcvaculturaVolumImprospatarePrimenire();

const calcAcvaculturaNecesarTotalBazin = function () {
  const resultsAcvaculturaVolumPrimenireOUT = document.getElementById(
    "results_acvacultura_volum-primenire"
  );
  const resultsAcvaculturaVolumCompensarePierderiOUT = document.getElementById(
    "results_acvacultura_volum-compensare-pierderi"
  );
  const resultsAcvaculturaVolumUmplereOUT = document.getElementById(
    "results_acvacultura_volum-umplere"
  );

  const resultsAcvaculturaNecesarTotalOUT = document.getElementById(
    "results_acvacultura_volum-total"
  );

  const btnCalcAcvaculturaNecesarTotal = document.getElementById(
    "btnCalc_acvacultura_volum-total"
  );

  const btnClearAcvaculturaNecesarTotal = document.getElementById(
    "btnAnuleaza_acvacultura_volum-total"
  );

  const btnSaveToDBAcvaculturaNecesarTotal = document.getElementById(
    "btnSaveToDB_acvacultura_volum-total"
  );

  btnCalcAcvaculturaNecesarTotal.addEventListener("click", (e) => {
    e.preventDefault();
    if (
      resultsAcvaculturaVolumPrimenireOUT.value &&
      resultsAcvaculturaVolumCompensarePierderiOUT.value &&
      resultsAcvaculturaVolumUmplereOUT.value
    ) {
      const necesarulTotal =
        parseFloat(resultsAcvaculturaVolumPrimenireOUT.value) +
        parseFloat(resultsAcvaculturaVolumCompensarePierderiOUT.value) +
        parseFloat(resultsAcvaculturaVolumUmplereOUT.value);

      if (necesarulTotal !== 0) {
        DisplayResults(resultsAcvaculturaNecesarTotalOUT, necesarulTotal);
      } else {
        DisplayResults(
          resultsAcvaculturaNecesarTotalOUT,
          undefined,
          "Verificati datele ..."
        );
      }
    } else {
      DisplayResults(
        resultsAcvaculturaNecesarTotalOUT,
        undefined,
        "Verificati datele ..."
      );
    }
  });

  clearInputFields(btnClearAcvaculturaNecesarTotal, [
    resultsAcvaculturaNecesarTotalOUT,
  ]);
  saveResultsToDB(btnSaveToDBAcvaculturaNecesarTotal);
};

calcAcvaculturaNecesarTotalBazin();
// ------- END ACVACULTURA

// ------- POPULATIE -----------
// Populatie - debite caracteristice
const popDebitCaracterRadioBtnDebitMediu = document.getElementById(
  "populatie_debit-mediu"
);
const popDebitCaracterRadioBtnDebitMaxim = document.getElementById(
  "populatie_debit-maxim"
);

const popDebitCaracterNumarConsumatori = document.getElementById(
  "populatie_debcaracter_numar-consumatori"
);
const popDebitCaracterDebitSpecific = document.getElementById(
  "populatie_debcaracter_debit-specific"
);

const popDebitCaracterCoeficientVariatie = document.getElementById(
  "populatie_debcaracter_coeficient-variatie"
);

const resultsPopDebitCaracter = document.getElementById(
  "results_populatie_debit-caracteristic"
);

const btnCalcPopDebitCaracter = document.getElementById(
  "btnCalc_populatie_debit-caracteristic"
);

const btnClearInputPopDebitCaracter = document.getElementById(
  "btnAnuleaza_populatie_debit-caracteristic"
);

const btnSaveToDBPopDebitCaracter = document.getElementById(
  "btnSaveToDB_populatie_debit-caracteristic"
);

btnCalcPopDebitCaracter.addEventListener("click", (e) => {
  e.preventDefault();
});
const debitMediuArr = [
  popDebitCaracterNumarConsumatori,
  popDebitCaracterDebitSpecific,
];

const debitMaximArr = debitMediuArr.concat([
  popDebitCaracterCoeficientVariatie,
]);

const selectareDebitCaracteristic = document.querySelectorAll(
  "input[name='debit-caracteristic']"
);
const rezultatDebitCaracterTxt = document.getElementById(
  "populatie_rezultat_debit-caracteristic"
);

// consider wrapping this into a function!!!
for (let option of selectareDebitCaracteristic) {
  option.addEventListener("click", (e) => {
    rezultatDebitCaracterTxt.innerHTML = `${option.value} (m3/zi): `;
    calculDebitCaracteristic(option.value);
  });
}

const calculDebitCaracteristic = function (input) {
  if (input === "Debitul zilnic mediu") {
    clearInput(debitMaximArr.concat(resultsPopDebitCaracter));
    popDebitCaracterCoeficientVariatie.setAttribute("disabled", "disabled");
    calculDebitMediu(input);
  } else {
    clearInput(debitMaximArr.concat(resultsPopDebitCaracter));
    popDebitCaracterCoeficientVariatie.removeAttribute("disabled");
    calculDebitMaxim(input);
  }
};

const checkMultipleInputField = function (inputEl) {
  const re = /^(\d+,?){1,15}$/; // this is the limit of array elements
  if (!re.test(inputEl.value)) {
    errorDisplay(inputEl, "Valori numerice separate prin (,)");
  } else {
    const newArr = inputEl.value.split(/\s*,+\s*/);
    newArr.forEach((el) => {
      parseFloat(el);
    });
    successDisplay(inputEl);

    return newArr;
  }
};

const checkMultipleIntervalField = function (inputEl, min, max) {
  if (inputEl.value) {
    const newArr = inputEl.value.split(/\s*,+\s*/);
    for (const [i, e] of newArr.entries()) {
      if (parseFloat(newArr[i]) < min || parseFloat(newArr[i]) > max) {
        errorDisplay(inputEl, `Valori intre ${min} si ${max}`);
        return false;
      }
      successDisplay(inputEl);
    }
    newArr.forEach((el) => {
      parseFloat(el);
    });
    return newArr;
  } else {
    resetInputDefaults(inputEl);
  }
};

const checkMultipleValuesOnInput = function (in_el) {
  in_el.addEventListener("input", updateValue);

  function updateValue(e) {
    e.preventDefault();
    let result = [];
    if (in_el.value) {
      const newArr = in_el.value.split(/\s*,+\s*/);
      newArr.forEach((el) => {
        result.push(parseFloat(el));
        if (el > 0) {
          successDisplay(in_el);
        } else {
          errorDisplay(in_el, `Valori > 0`);
        }
      });
    } else {
      errorDisplay(in_el, `Introduceti valori conform formulei de calcul`);
      DisplayResults(
        resultsPopDebitCaracter,
        undefined,
        "Verificati datele ..."
      );
    }
  }
};

const calculDebitMediu = function (input) {
  if (input === "Debitul zilnic mediu") {
    // check click on input change
    checkMultipleValuesOnInput(popDebitCaracterNumarConsumatori);
    checkMultipleValuesOnInput(popDebitCaracterDebitSpecific);
    // Calculate
    btnCalcPopDebitCaracter.addEventListener("click", (e) => {
      e.preventDefault();

      const checkNumarConsumatori = checkMultipleInputField(
        popDebitCaracterNumarConsumatori
      );

      const checkDebitSpecific = checkMultipleIntervalField(
        popDebitCaracterDebitSpecific,
        30,
        250
      );

      let debitResult = 0;
      if (checkDebitSpecific.length < checkNumarConsumatori.length) {
        errorDisplay(
          popDebitCaracterDebitSpecific,
          `Numarul de valori trebuie sa fie egal ca si la Numarul de consumatori`
        );
        resultsPopDebitCaracter.value = "Verificati datele";
      } else if (checkDebitSpecific.length > checkNumarConsumatori.length) {
        errorDisplay(
          popDebitCaracterNumarConsumatori,
          `Numarul de valori trebuie sa fie egal ca si la Debitul specific`
        );
        resultsPopDebitCaracter.value = "Verificati datele";
      } else if (checkDebitSpecific.length === checkNumarConsumatori.length) {
        for (const [i, el] of checkDebitSpecific.entries()) {
          debitResult += checkNumarConsumatori[i] * checkDebitSpecific[i];
        }
        const rezultatFinal = debitResult / 1000;
        resultsPopDebitCaracter.value = rezultatFinal.toFixed(2);
      }
    });
    clearInputFields(
      btnClearInputPopDebitCaracter,
      debitMediuArr.concat(resultsPopDebitCaracter)
    );
    saveResultsToDB(btnSaveToDBPopDebitCaracter);
  }
};

const calculDebitMaxim = function (input) {
  if (input === "Debitul zilnic maxim") {
    // check click on input change
    checkMultipleValuesOnInput(popDebitCaracterNumarConsumatori);
    checkMultipleValuesOnInput(popDebitCaracterDebitSpecific);
    checkMultipleValuesOnInput(popDebitCaracterCoeficientVariatie);
    // Calculate
    btnCalcPopDebitCaracter.addEventListener("click", (e) => {
      e.preventDefault();
      const checkNumarConsumatori = checkMultipleInputField(
        popDebitCaracterNumarConsumatori
      );
      const checkDebitSpecific = checkMultipleIntervalField(
        popDebitCaracterDebitSpecific,
        30,
        250
      );

      const checkCoefVariatie = checkMultipleIntervalField(
        popDebitCaracterCoeficientVariatie,
        1.2,
        2
      );

      let debitResult = 0;

      if (
        checkDebitSpecific.length === checkNumarConsumatori.length &&
        checkDebitSpecific.length === checkCoefVariatie.length
      ) {
        for (const [i, el] of checkDebitSpecific.entries()) {
          debitResult +=
            checkNumarConsumatori[i] *
            checkDebitSpecific[i] *
            parseFloat(checkCoefVariatie[i]);
        }
        const rezultatFinal = debitResult / 1000;
        resultsPopDebitCaracter.value = rezultatFinal.toFixed(2);
      } else {
        resultsPopDebitCaracter.value = "Verificati datele";
      }
    });
    clearInputFields(
      btnClearInputPopDebitCaracter,
      debitMaximArr.concat(resultsPopDebitCaracter)
    );
    saveResultsToDB(btnSaveToDBPopDebitCaracter);
  }
};

// - Populatie - cerinta de apa
const calculCerintaApa = function () {
  const popCoeficientSporIN = document.getElementById(
    "populatie_coeficient-spor"
  );
  const popCoeficientPierderiIN = document.getElementById(
    "populatie_coeficient-pierderi"
  );
  const popConsumZiPopulatieIN = document.getElementById("populatie_consum-zi");
  const resultsPopCerintaApaOUT = document.getElementById(
    "results_populatie_cerinta-apa"
  );
  const btnCalcPopCerintaApa = document.getElementById(
    "btnCalc_populatie_cerinta-apa"
  );
  const btnClearInputCerintaApa = document.getElementById(
    "btnAnuleaza_populatie_cerinta-apa"
  );

  const btnSaveToDBCerintaApa = document.getElementById(
    "btnSaveToDB_populatie_cerinta-apa"
  );

  btnCalcPopCerintaApa.addEventListener("click", (e) => {
    e.preventDefault();
    // 1. Validate input fields
    validateInput([
      popCoeficientSporIN,
      popCoeficientPierderiIN,
      popConsumZiPopulatieIN,
    ]);
    const checkCoeSpor = validateIntervals(popCoeficientSporIN, 1.02, 1.08);
    const checkCoePerderi = validateIntervals(
      popCoeficientPierderiIN,
      1.08,
      1.5
    );

    if (checkCoeSpor && checkCoePerderi && popConsumZiPopulatieIN.value) {
      const cerinteApa =
        parseFloat(popCoeficientSporIN.value) *
        parseFloat(popCoeficientPierderiIN.value) *
        parseFloat(popConsumZiPopulatieIN.value);

      if (cerinteApa !== 0) {
        DisplayResults(resultsPopCerintaApaOUT, cerinteApa);
      } else {
        DisplayResults(
          resultsPopCerintaApaOUT,
          undefined,
          "Verificati datele ..."
        );
      }
    } else {
      DisplayResults(
        resultsPopCerintaApaOUT,
        undefined,
        "Verificati datele ..."
      );
    }
  });

  clearInputFields(btnClearInputCerintaApa, [
    popCoeficientSporIN,
    popCoeficientPierderiIN,
    popConsumZiPopulatieIN,
    resultsPopCerintaApaOUT,
  ]);
  saveResultsToDB(btnSaveToDBCerintaApa);
};

calculCerintaApa();

// Ape uzate
const calcPopulatieApeUzate = function () {
  const popApeUzatePopulatieIN = document.getElementById(
    "populatie_ape_uzate-populatie"
  );
  const popApeUzateIndustrieIN = document.getElementById(
    "populatie_ape_uzate-industrie"
  );
  const popApeUzateDeservireIN = document.getElementById(
    "populatie_ape_uzate-deservire"
  );
  const resultsPopApeUzateOUT = document.getElementById(
    "results_populatie_ape-uzate"
  );
  const btnClearInputApeUzate = document.getElementById(
    "btnAnuleaza_populatie_ape-uzate"
  );
  const btnSaveToDBApeUzate = document.getElementById(
    "btnSaveToDB_populatie_ape-uzate"
  );

  [
    popApeUzatePopulatieIN,
    popApeUzateIndustrieIN,
    popApeUzateDeservireIN,
  ].forEach((el) => {
    el.addEventListener("input", (e) => {
      e.preventDefault();
      const checkPopulatie = validateSingleInput(popApeUzatePopulatieIN);
      const checkIndustrie = validateSingleInput(popApeUzateIndustrieIN);
      const checkDeservire = validateSingleInput(popApeUzateDeservireIN);

      if (checkPopulatie && checkIndustrie && checkDeservire) {
        const resultApeUzate =
          parseFloat(popApeUzatePopulatieIN.value) +
          parseFloat(popApeUzateIndustrieIN.value) +
          parseFloat(popApeUzateDeservireIN.value);
        DisplayResults(resultsPopApeUzateOUT, resultApeUzate);
      } else {
        DisplayResults(
          resultsPopApeUzateOUT,
          undefined,
          "Verificati datele ..."
        );
      }
    });
    clearInputFields(btnClearInputApeUzate, [
      popApeUzatePopulatieIN,
      popApeUzateIndustrieIN,
      popApeUzateDeservireIN,
      resultsPopApeUzateOUT,
    ]);
    saveResultsToDB(btnSaveToDBApeUzate);
  });
};

calcPopulatieApeUzate();

// ------- END POPULATIE -----------
// ---
