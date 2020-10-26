formElement = document.querySelector('#searchForm');
inputElement = document.querySelector('#txtUser');
divUserImageElement = document.querySelector('#userImage');
divUserElement = document.querySelector('#user');
rightElement = document.querySelector('#rightSide')

/* window.onload = function() {
    if(localStorage. != undefined){
        arrayClubes = JSON.parse(localStorage.Clubes);
        
        lançarClubesNaTabela();
    }        
}  */

formElement.onsubmit = function(event) {
    event.preventDefault();
    
    mostrarUsuario();
}

function mostrarUsuario() {
    var username = inputElement.value;
    
    if(username === '') {    
        alert('Digite um usuário'); 
        inputElement.value = '';
        return; 
    }

    axios.get(`https://api.github.com/users/${username}`)
    .then(function(response) {
        getUserData(response);
    })
    .catch(function(error) {
        alert('Digite um usuário válido');
        inputElement.value = '';
        divUserImageElement.innerHTML = '';
        divUserElement.innerHTML = '';
        listElement.innerHTML = '';
        return;
    });

    axios.get(`https://api.github.com/users/${username}/repos`)
    .then(function(response) {
        rightElement.innerHTML = '<h2>Repositórios</h2>';
        rightElement.innerHTML += '<div id="lista"></div>';
        listElement = document.querySelector('#lista');
        for(repositorio of response.data) {
            var listItem = document.createElement('div');
            var listTxtItem = document.createElement('a');
            listTxtItem.setAttribute('href', repositorio.html_url)
            listTxtItem.appendChild(document.createTextNode(repositorio.name));
            listItem.setAttribute('class', 'list-group-item');
            listItem.appendChild(listTxtItem);
            listElement.appendChild(listItem);
        }
    })
}

function getUserData(response) {
    divUserImageElement.innerHTML = '';
    divUserElement.innerHTML = '';

    var listFoto = document.createElement('img');
    var listName = document.createElement('h1');
    var listLogin = document.createElement('a');
    var listBio = document.createElement('p');

    listFoto.setAttribute('src', response.data.avatar_url);

    if(response.data.name !== null) {
        listName.appendChild(document.createTextNode(response.data.name));
    }
    
    listLogin.setAttribute('href', response.data.html_url);  
    listLogin.appendChild(document.createTextNode(response.data.login));

    if(response.data.bio !== null) {
        listBio.appendChild(document.createTextNode(response.data.bio));
    }

    divUserImageElement.appendChild(listFoto);
    divUserElement.appendChild(listName);
    divUserElement.appendChild(listLogin);
    divUserElement.appendChild(listBio);
    inputElement.value = '';
}