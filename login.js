// Elementos html:
const btnEnviar = document.getElementById('btnEnviar');
const btnSair = document.getElementById('btnSair');
const inputUsuario = document.getElementById('inputUsuario');
const inputSenha = document.getElementById('inputSenha');
const divConteudoLogado = document.getElementById('conteudoLogado');
const divConteudoNaoLogado = document.getElementById('conteudoNaoLogado');
const loading = document.getElementById('loading');
const aviso = document.getElementById('aviso');

//Definição de valores de parâmetros constantes da requisição :
const headers = {
  'Content-Type': 'application/x-www-form-urlencoded',
  'SdkVersion': 'postman-graph/v1.0'
};
const client_id = '682aac27-6b4b-4f13-a4f9-21f8b0f30f08';
const client_secret = '.C=T8S7[XpPu0qY-HTPcUgVObr4=bHUF';
const scope = 'https://graph.microsoft.com/.default';
const body = new URLSearchParams();
const url = 'https://login.microsoftonline.com/be87ed09-e753-468f-8244-e2f3811ceacc/oauth2/v2.0/token';

//Adição dos eventos de click aos botões btnEnviar e btnSair.
btnEnviar.addEventListener('click',requisicao);
btnSair.addEventListener('click', mostraConteudoNaoLogado);

//Adição de alguns parâmetros ao corpo da requisição.
body.append('grant_type','password');
body.append('client_id',client_id);
body.append('client_secret',client_secret);
body.append('scope',scope);
/*
* Recupera os valores dos inputs de Usuário e Senha, realizando em seguida uma requisição
* para a API com os valores passados, além disso ocorre o tratamento de erros como
* campos vazios e logins inválidos.
*/
async function requisicao(){
    setDisplay(aviso, 'none');
    let userName = inputUsuario.value;
    let password = inputSenha.value;
    //Testa se os campos estão vazios e mostra um aviso caso positivo, saindo da função em seguida.
    if (userName.length == 0 || password.length == 0) {
      setDisplay(aviso, 'block');
      setAviso("Todos os campos devem ser preenchidos");
      return;
    }
    //ícone de Loading tem seu display modificado para aparecer na página
    setDisplay(loading, 'block');
    /*
    *Adição dos parâmetros userName e password ao corpo da requisição,
    *passando como valor o conteúdo digitado pelo usuário.
    */
    body.append('userName',userName);
    body.append('password',password);
    //Denine as configurações da requisição
    const config = {method: 'post', body, headers};
    //Realiza a requisição para a url da API usando as configurações definidas
    fetch(url, config)
    //converte a resposta da requisição para o tipo JSON
    .then(res => res.json())
    .then(function(res){
      //testa se o há um erro do tipo "invalid_grant"(Usuário e/ou senha errados)
      if (res.error == "invalid_grant") {
        //Mostra um aviso caso positivo
        setAviso("Usuário e senha inválidos.")
        setDisplay(aviso, 'block');
        //Ícone de loading tem seu display modificado para desaparecer da página
        setDisplay(loading, 'none');
        //Os parâmetros definidos são deletados para que não ocorra sobreposição
        deletaParams();
      }else{
        //Mostra o conteudo para usuário logado caso negativo
        mostraConteudoLogado();
        limpaInputs();
        setDisplay(loading, 'none');
        deletaParams();
      }
    })

  }
/*
* Modifica o display da div que contem o conteúdo para um usuário logado
* para que ela apareça na página.
*/
function mostraConteudoLogado(){
  setDisplay(conteudoLogado, 'inline-block');
  setDisplay(conteudoNaoLogado, 'none');
}
/*
* Modifica o display da div que contem o conteúdo para um usuário não logado
* para que ela apareça na página.
*/
function mostraConteudoNaoLogado(){
  setDisplay(conteudoLogado, 'none');
  setDisplay(conteudoNaoLogado, 'inline-block');
}
/**
* Modifica o display de um elemento html
*
* @param {Object} elemento - elemento html a ter o display modificado.
* @param {String} tipoDisplay - tipo de display que se deseja colocar
* em um elemento.
**/
function setDisplay(elemento, tipoDisplay){
  elemento.style.display = tipoDisplay;
}
/**
* Atribui ao elemento aviso o conteúdo passado por parâmetro.
*
* @param {String} conteudoAviso - String contendo o conteúdo que será
* mostrado pelo aviso.
**/
function setAviso(conteudoAviso){
  aviso.innerHTML = conteudoAviso;
}
//Torna o valor dos inputs de Usuário e senha vazios
function limpaInputs(){
  inputUsuario.value ="";
  inputSenha.value = "";
}
/**
* Exclui os parâmetros do corpo da requisição, userName e password,
* afim de evitar sobreposições.
**/
function deletaParams(){
  body.delete("userName");
  body.delete("password");
}
