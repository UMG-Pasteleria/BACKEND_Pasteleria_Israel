module.exports = function (req, res, next) {
    const { email, name, password } = req.body;
  
    //regex for valid email
    function validEmail(userEmail) {
      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
    }
  
    if (req.path === "/register") {
      console.log(!email.length);
      if (![email, name, password].every(Boolean)) {
        return res.status(401).json("Faltan Credenciales");
      } else if (!validEmail(email)) {
        return res.status(401).json("Correo Invalido");
      }
    } else if (req.path === "/login") {
      if (![email, password].every(Boolean)) {
        return res.status(401).json("Faltan credenciales");
      } else if (!validEmail(email)) {
        return res.status(401).json("Correo Invalido");
      }
    }
  
    next();
  };
  