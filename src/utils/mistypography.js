function swapCase(str) {
  let result = "";
  for (let i = 0; i < str.length; i++) {
    result = result.concat(isUpperCase(str[i]) ? str[i].toLowerCase() : str[i].toUpperCase());
  }
  return result;
}

function isUpperCase(str) {
  return str === str.toUpperCase();
}

module.exports = function (password) {
  const passwords = [
    password,
    password.substring(0, 1).toLowerCase().concat(password.substring(1, password.length)),
    swapCase(password),
    password.substring(0, password.length - 1),
    password.substring(1, password.length),
  ];

  return passwords;
};
