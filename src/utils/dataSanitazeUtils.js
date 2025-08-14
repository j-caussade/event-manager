// Fonction pour trimmer et sanitizer une chaîne
const sanitizeString = (str) => {
  if (typeof str !== "string") return str;
  return str.trim();
};

// Fonction pour échapper les caractères spéciaux (anti-XSS basique)
const escapeHtml = (str) => {
  if (typeof str !== "string") return str;
  return str.replace(
    /[&<>'"]/g,
    (tag) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&#39;",
        '"': "&quot;",
      }[tag])
  );
};

// Fonction pour valider un email (regex basique)
const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Fonction pour valider un mot de passe (ex: min 8 caractères, au moins une majuscule et un chiffre)
const isValidPassword = (password) => {
  const re = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
  return re.test(password);
};

module.exports = {
  sanitizeString,
  escapeHtml,
  isValidEmail,
  isValidPassword,
};
