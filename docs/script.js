document
  .getElementById("loginForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    // Exibe o loading
    let elem_preloader = document.getElementById("preloader");
    let elem_loader = document.getElementById("loader");

    elem_preloader.classList.remove("hidden");
    elem_loader.classList.remove("hidden");

    const login = document.getElementById("login").value;
    const senha = document.getElementById("senha").value;

    try {
      const response = await fetch("vollmed-git-dcemdudddthyazak.canadacentral-01.azurewebsites.net/login", {
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
    } finally {
      // Remove o loading após a tentativa de login
      elem_preloader.classList.add("hidden");
      elem_loader.classList.add("hidden");
    }
  });
