const navegation = document.getElementsByClassName('navigator');
const pageTitle = document.getElementById("page-title");
const cardsFuncSpace = document.getElementsByClassName("cardsFunc")[0];
const loginForm = document.getElementsByClassName("login-form")[0];
const loading = document.getElementsByClassName("loading");  // Corrigido: usa #loading (id)
const nav = document.getElementById("nav");

loginForm.addEventListener('submit', Login);

function ControlMarkerStatusNagation() {
    for (let nav of navegation) {
        nav.addEventListener('click', function () {
            SetActualMarkerStatus(this.id);
            SetPageTitle(this.id);
        });
    }
}

function SetActualMarkerStatus(elementId) {
    for (let nav of navegation) {
        let page = document.getElementsByClassName(nav.id)[0];

        if (nav.id === elementId) {
            nav.classList.add('active');
            if (page) page.classList.add('render');

            if (nav.id === "more") {
                RenderCardsFunc();
            }
        } else {
            nav.classList.remove('active');
            if (page) page.classList.remove('render');
        }
    }
}

function SetPageTitle(newTitle) {
    const title = newTitle.replace('-', ' / ').trim();
    pageTitle.textContent = `Kuala Check${title ? ' / ' + title : ''}`;
}

async function RenderCardsFunc() {
    loading[0].classList.add('loading-true');

    try {
        const response = await fetch('/func');

        if (!response.ok) {
            throw new Error(`Erro ${response.status}: ${response.statusText}`);
        }

        const res = await response.json();
        console.log("Dados da /func:", res);

        cardsFuncSpace.innerHTML = "";

        if (Array.isArray(res) && res.length > 0) {
            res.forEach(data => {
                CardConstrutorFunc(data);
            });
        } else {
            cardsFuncSpace.innerHTML = '<p style="color: white; text-align: center; padding: 20px;">Nenhum dado disponível ainda.</p>';
        }
    } catch (err) {
        console.error("Erro ao carregar cards:", err);
        cardsFuncSpace.innerHTML = `<p style="color: #ff6b6b; text-align: center; padding: 20px;">Falha ao carregar: ${err.message}</p>`;
    } finally {
        loading[0].classList.remove('loading-true');
    }
}

function CardConstrutorFunc(data) {
    const card = `
        <section class='card'>
            <section class='title'>
                <label>
                    <i class='bi ${data.icon}'></i>
                </label>
                <h2>${data.title}</h2>
            </section>
            <section>
                <p>${data.text}</p>
            </section>
        </section>
    `;
    cardsFuncSpace.innerHTML += card;
}

async function Login(e) {
    e.preventDefault();

    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const startLogin = document.getElementsByClassName("start-login")[0];

    const emailRegex = /^\S+@\S+\.\S+$/;
    const passwordRegex = /^[^\s]{4,16}$/;

    startLogin.innerHTML = "";
    startLogin.innerHTML = `Logando <span class="loading loading-login"></span>`;

    loading[1].classList.add('loading-true');

    const isValidEmail = emailRegex.test(email.value);
    const isValidPassword = passwordRegex.test(password.value);

    const isValidData = isValidPassword && isValidEmail;

    if (isValidData) {
        const dataLogin =
        {
            email: email.value, password: password.value
        };

        try {
            const response = await fetch('/actions/login', {
                method: 'POST',
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(dataLogin)
            });

            const result = await response.json();
            alert(JSON.stringify(result));
            SetVisualFeedBack(result);

        }
        catch (error) {
            alert("Erro na requisição: " + error.message);
        }
        finally {
            loading[1].classList.remove('loading-true');
            startLogin.innerHTML = "";
            startLogin.innerHTML = "Login";
        }
    }
    else {
        alert("Dados não válidos ");
        loading[1].classList.remove('loading-true');
        startLogin.innerHTML = "Login";
    }
}


// Função que construe o feedback visua após logar ou tentar logar
function SetVisualFeedBack(res) {
    if (res) {

        // Feedback visual do estado da tentativa de logar no sistema
        const renderReponse = `
        <i class="${res.icon} top-icon-form">
        </i>
        <h1>
            ${res.message}
        </h1>
    `;
        loginForm.innerHTML = "";
        loginForm.innerHTML = renderReponse;

        // Caso o login foi admitidpo, renderiza o icon do perfil

        if (res.return == "ok") {
            const perfil = `
            <li id="perfil" class="navigator"> 
                <i class="bi bi-person-circle perfil-logo"></i> 
            </li>
        `;
        nav.innerHTML += perfil;
        }
    }
}

ControlMarkerStatusNagation();