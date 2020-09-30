formElement = document.querySelector('#formAdd');
inputElement = document.querySelector('#txtUser');
listElement = document.querySelector('#lista');
divUserElement = document.querySelector('#user');
divUserImageElement = document.querySelector('#userImage');


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
        divUserElement.innerHTML = '';
        listElement.innerHTML = '';
        divUserImageElement.innerHTML = '';
        return;
    });


    axios.get(`https://api.github.com/users/${username}/repos`)
    .then(function(response) {
        listElement.innerHTML = '<b>Repositórios: <b/>';
        for(repositorio of response.data) {
            var listItem = document.createElement('li');
            var listTxtItem = document.createElement('a');
            listTxtItem.setAttribute('href', repositorio.html_url)
            listTxtItem.appendChild(document.createTextNode(repositorio.name));
            listItem.appendChild(listTxtItem);
            listElement.appendChild(listItem);
        }
    })
}

function getUserData(response) {
    divUserElement.innerHTML = '';
    divUserImageElement.innerHTML = '';
    var listName = document.createElement('b');
    var listLogin = document.createElement('a');
    var listBio = document.createElement('p');
    var listFoto = document.createElement('img');
    if(response.data.name !== null) {
        listName.appendChild(document.createTextNode(response.data.name));
    } 
    if(response.data.bio !== null) {
        listBio.appendChild(document.createTextNode(response.data.bio));
    }
    listLogin.setAttribute('href', response.data.html_url);  
    listLogin.appendChild(document.createTextNode(response.data.login));   
    listFoto.setAttribute('src', response.data.avatar_url);
    divUserElement.appendChild(listName);
    divUserElement.appendChild(document.createElement('br'));
    divUserElement.appendChild(listLogin);
    divUserElement.appendChild(document.createElement('br'));
    divUserElement.appendChild(listBio);
    divUserImageElement.appendChild(listFoto);
    inputElement.value = '';
}