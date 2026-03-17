// Função de Login
async function Login(req, response) {
  const { email, password } = req.body;
  
  const emailRegex = /^\S+@\S+\.\S+$/;
  const passwordRegex = /^[^\s]{4,16}$/;
  

  const isValidEmail = emailRegex.test(email);
  const isValidPassword = passwordRegex.test(password);
  const isValidData = isValidPassword && isValidEmail;
  

  let res = {
    status: isValidData ? 200 : 400,
    action: "login", // 👈 aspas
    executed: true,
    "return": "ok",
    message: "Bem  vindo(a)! ",
    icon: "bi bi-check-circle-fill text-success",
    dataUser: isValidData ? {
      email: email,
      password: "*** -> private",
    } : null
  };
  
  if (isValidData) {

    console.log("✅ Dados recebidos: ", email, " / ", password);
  } else {
    console.log("❌ Dados inválidos! ");
    res.status = 400;
    res.return = "no";
    res.icon = "bi bi-x-circle-fill text-danger";
    res.message = "Bem  vindo(a)! ";

  }
  
  console.log('📤 Resposta do Servidor: ', res);
  response.status(res.status).json(res);
}

module.exports = { Login };