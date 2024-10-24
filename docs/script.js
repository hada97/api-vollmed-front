document
  .getElementById("loginForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const login = document.getElementById("login").value;
    const senha = document.getElementById("senha").value;

    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ login, senha }),
      });

      const data = await response.json();

      if (response.ok) {
        // Armazenar o token no localStorage
        localStorage.setItem("token", data.token);
        // Redirecionar para home.html
        window.location.href = "home/home.html";
      } else {
        document.getElementById("message").textContent =
          "Erro: " + data.message;
      }
    } catch (error) {
      document.getElementById("message").textContent =
        "Erro ao realizar login.";
    }
  });
