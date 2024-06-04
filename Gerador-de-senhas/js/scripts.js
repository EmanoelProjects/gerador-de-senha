// Seleção de elementos
const generatePasswordButton = document.querySelector("#generate-password");
const generatedPasswordElement = document.querySelector("#generated-password");
const openCloseGeneratorButton = document.querySelector(
  "#open-generate-password"
);
const generatePasswordContainer = document.querySelector("#generate-options");
const lengthInput = document.querySelector("#lenght");
const lettersInput = document.querySelector("#letters");
const numbersInput = document.querySelector("#numbers");
const symbolsInput = document.querySelector("#symbols");
const copyPasswordButton = document.querySelector("#copy-password");

// Funções
const getLetterLowerCase = () => {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
};

const getLetterUperCase = () => {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
};

const getNumber = () => {
  return Math.floor(Math.random() * 10).toString();
};

const getSymbol = () => {
  const symbols = "!@#$*{}[]+-<>=.,;/";

  return symbols[Math.floor(Math.random() * symbols.length)];
};

const generatePassword = (
  getLetterLowerCase,
  getLetterUperCase,
  getNumber,
  getSymbol
) => {
  let password = "";

  const passwordLenght = +lengthInput.value;

  const generators = [];

  if (lettersInput.checked) {
    generators.push(getLetterLowerCase, getLetterUperCase);
  }

  if (numbersInput.checked) {
    generators.push(getNumber);
  }

  if (symbolsInput.checked) {
    generators.push(getSymbol);
  }

  if (generators.length === 0) {
    return;
  }

  for (i = 0; i < passwordLenght; i = i + generators.length) {
    generators.forEach(() => {
      const randomFunction =
        generators[Math.floor(Math.random() * generators.length)]();

      password += randomFunction;
    });
  }
  password = password.slice(0, passwordLenght);

  generatedPasswordElement.style.display = "block";
  generatedPasswordElement.querySelector("h4").innerText = password;
};
// Eventos

generatePasswordButton.addEventListener("click", () => {
  generatePassword(getLetterLowerCase, getLetterUperCase, getNumber, getSymbol);
});

openCloseGeneratorButton.addEventListener("click", () => {
  generatePasswordContainer.classList.toggle("hide");
});

copyPasswordButton.addEventListener("click", () => {
  const password = generatedPasswordElement.querySelector("h4").innerText;

  navigator.clipboard.writeText(password).then(() => {
    copyPasswordButton.innerText = "Senha copiada!";

    setTimeout(() => {
      copyPasswordButton.innerText = "Copiar";
    }, 2000);
  });
});
