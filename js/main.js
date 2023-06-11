const userContainer = document.querySelector(".user-container");
const errorDiv = document.getElementById("userError");

/**
 * Función para buscar una persona en una API a traves del nombre de usuario
 * @param {username} username Nombre de usuario que queremos buscar en la API de Github
 */
function userFinder(username) {

    // Buscamos al usuario con la api de github
    fetch('https://api.github.com/users/' + username)
        .then((userJSON) => {
            // Si encuentra al usuario creará el JSON y dejará vacio el div del error
            if (userJSON.ok) {
                errorDiv.innerHTML = "";
                return userJSON.json()

                // Si no dará error
            } else {
                document.getElementById("footer").style.position = "absolute";

                errorDiv.innerHTML = "User Not Found: 404";
                errorDiv.style.color = "red";
            }
        })
        .then((data) => {
            showUser(data)
        });
}

function showUser(user) {
    console.log(user);

    // Caja donde mostraremos al usuario
    const userDiv = document.createElement('div');
    userDiv.classList.add('card');

    // Imagen del usuario
    const userImg = document.createElement('img');
    userImg.classList.add('card-img-top');
    userImg.src = user.avatar_url;
    userImg.style.height = '100%';
    userImg.style.width = '100%';

    // Nombre de usuario
    const userName = document.createElement('h5');
    userName.classList.add('card-title');
    userName.innerHTML = user.name + '<br><a href="https://github.com/' + user.login + '" id="userLink">@' + user.login + '</a>';

    // Descripción del usuario
    const userDescription = document.createElement('p');
    userDescription.classList.add('card-text');
    userDescription.innerHTML = "Bio: " + (user.bio == null ? "Not Available" : user.bio);

    // Mas información
    const moreInfo = document.createElement('ul');
    moreInfo.classList.add('list-group', 'list-group-flush');

    // Repositorios públicos
    const publicRepositories = document.createElement('li');
    publicRepositories.classList.add('list-group-item');
    publicRepositories.innerHTML = "Public repositories: " + user.public_repos;

    // Seguidores
    const followers = document.createElement('li');
    followers.classList.add('list-group-item');
    followers.innerHTML = "Followers: " + user.followers;

    // Seguidos
    const following = document.createElement('li');
    following.classList.add('list-group-item');
    following.innerHTML = "Following: " + user.following;

    // Localización
    const location = document.createElement('li');
    location.classList.add('list-group-item');
    location.innerHTML = "Location: " + (user.location == null ? "Not Available" : user.location);

    // Blog
    const blog = document.createElement('li');
    blog.classList.add('list-group-item');
    blog.innerHTML = "Blog: " + (user.blog == "" ? "Not Available" : '<a href="https://' + user.blog + '">' + user.blog + '</a>');

    // Otros
    const other = document.createElement('div');
    other.classList.add('card-body');
    other.style.height = '100%';

    // Github stats
    const details = document.createElement('details');
    details.innerHTML = '<summary>Github Stats</summary>';
    details.style.textAlign = 'initial';

    // Lenguajes más usados
    const mostLanguages = document.createElement('img');
    mostLanguages.src = 'https://github-readme-stats.vercel.app/api/top-langs/?username=' + user.login + '&theme=transparent&include_all_commits=true&layout=compact&hide_border=true';
    mostLanguages.style.height = '167px';
    mostLanguages.style.width = '360px';

    // Vistas del perfil
    const profileViews = document.createElement('img');
    profileViews.src = 'https://visitcount.itsvg.in/api?id=' + user.login + '&label=Profile%20Views&color=12&icon=5&pretty=true';
    profileViews.style.paddingLeft = '30%';

    // Añadiremos todo a la caja del usuario
    userDiv.appendChild(userImg);
    userDiv.appendChild(userName);
    userDiv.appendChild(userDescription);

    // Añadimos la información adicional a la lista "moreInfo"
    moreInfo.appendChild(publicRepositories);
    moreInfo.appendChild(followers);
    moreInfo.appendChild(following);
    moreInfo.appendChild(location);
    moreInfo.appendChild(blog);

    // Añadimos las estadisticas de Github
    details.appendChild(mostLanguages);
    details.appendChild(profileViews);
    other.appendChild(details);

    // Añadimos la lista y otros elementos en la caja
    userDiv.appendChild(moreInfo);
    userDiv.appendChild(other);

    // Añadimos la caja al contenedor del usuario
    userContainer.appendChild(userDiv);
}

/**
 * Función que al pulsar un botón buscará a la persona que reciba
 */
function searchUser() {
    const userInput = document.getElementById("username").value;

    // Para evitar errores con los espacios del principio y del final añado el método trim
    userFinder(userInput.trim());
    userContainer.innerHTML = "";

    // El footer será relative por si la imagen es mayor
    document.getElementById("footer").style.position = "relative";
}
