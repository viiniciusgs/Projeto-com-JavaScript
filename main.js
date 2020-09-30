formElement = document.querySelector('#formAdd');
inputElement = document.querySelector('#txtUser');
listElement = document.querySelector('#lista');
divUserElement = document.querySelector('#user');

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
        divUserElement.innerHTML = '';
        var listLogin = document.createElement('b');
        var listName = document.createElement('b');
        var listBio = document.createElement('b');
        var listFoto = document.createElement('img');
        listLogin.appendChild(document.createTextNode(response.data.login));
        if(response.data.name !== null) {
            listName.appendChild(document.createTextNode(response.data.name));
        }      
        if(response.data.bio !== null) {
            listBio.appendChild(document.createTextNode(response.data.bio));
        }
        listFoto.setAttribute('src', response.data.avatar_url);
        divUserElement.appendChild(listLogin);
        divUserElement.appendChild(listName);
        divUserElement.appendChild(listBio);
        divUserElement.appendChild(listFoto);
        inputElement.value = '';
    })
    .catch(function(error) {
        alert('Digite um usuário válido');
        inputElement.value = '';
        return;
    });

    axios.get(`https://api.github.com/users/${username}/repos`)
    .then(function(response) {
        listElement.innerHTML = '';
        for(repositorio of response.data) {
            var listItem = document.createElement('li');
            listItem.appendChild(document.createTextNode(repositorio.name));
            listElement.appendChild(listItem);
        }
    })
    .catch(function(error) {
        alert('O usuário não possui nenhum repositório');
        return;
    });
}