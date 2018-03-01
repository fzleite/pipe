/**
 * Lista de Usuarios
 */
var userList = [
        { 
            "user": "fleite",
            "name": "Fernando Zimmermann Leite",
            "id_user": 2,
            "email": "fleite@artit.com.br",
            "profileImage": "images/fleite.png"
        },
        { 
            "user": "cmenezes",
            "name": "Ciro de Menezes",
            "id_user": 33,
            "email": "cmenezes@artit.com.br",
            "profileImage": "images/cmenezes.jpg"
        },
        { 
            "user": "romulo",
            "name": "Romulo Cesar de Paula",
            "id_user": 7,
            "email": "romulo@artit.com.br",
            "profileImage": "images/romulo.jpg"
        },
        { 
            "user": "lardito",
            "name": "Luis Afonso Ardito",
            "id_user": 55,
            "email": "lardito@artit.com.br",
            "profileImage": "images/lardito.jpg"
        },
        { 
            "user": "mmelari",
            "name": "Monica Melari",
            "id_user": 54,
            "email": "mmelari@artit.com.br",
            "profileImage": "images/mmelari.jpg"
        }
    ];
   
 /**
  * Lista de Links
  */
 var linkPage = {
         home               : 0,
         add_opportunity    : 1,
         cons_opportunity   : 2,
         add_customer       : 3,
         cons_customer      : 4,
         reports            : 5,
         add_rh             : 6,
         cons_rh            : 7,
         feedback           : 8,
         refund             : 9,
         cons_net           : 10,
         profile            : 11,
         open_change        : 12,

         filter_claro       : 13,
         filter_leroy       : 14,
         filter_cpqd        : 15,
         filter_qualicorp   : 16,
         filter_unimed      : 17
 } 
    
/**
 * Controles do Angular
 */
function usersController($scope) {
     $scope.itens = userList;
}

function profileController($scope) {
    var userData = getUserData( getUserCookie() )[0];

    if( typeof userData != 'object' ){
        userData = userList[0];
    }

    $scope.username     = userData.user;
    $scope.profileName  = userData.name;
    $scope.profileEmail = userData.email;
    $scope.profileImage = userData.profileImage;
}

/**
 * Funções para tratamento de cookie
 */

function setUserCookie(user){
    document.cookie = "user=" + user;
    //$('.tap-target').tapTarget('open');
    window.location.reload();
}

function getUserCookie(){
    var ret = document.cookie;
    if( ret != "" )
        ret = ret.split("=")[1];

    return ret;
}

/**
 * Funções de Localização do JSON
 */
function getUserData( username ) {
  return userList.filter(
      function( userList ){ 
          return userList.user == username;
      }
  );
}

/**
 * Funções de Navegação
 */
function home(){
    $(frameContent).addClass('hide');
    $(cardsContent).removeClass('hide');
}

function showContent(){
    $(frameContent).removeClass('hide');
    $(cardsContent).addClass('hide');
}

function openLink( id ){
    var url;    
    var filterMineOnly;

    // filterMine = (document.frmFilter.filterMine.value ? true : false);
    filterMineOnly = document.getElementById("filterMine").checked;
    
    if( id == linkPage.home ){ // HOME
        home();
    }else{
        if( id == linkPage.add_opportunity ){ // Aduciobar Oportunidade
            url = "https://rosie.artit.com.br/pipeline/pipeline/incluir";
        }else if( id == linkPage.cons_opportunity ){ // Consultar Oportunidade
            url = "https://rosie.artit.com.br/pipeline/pipeline/consultar?projeto=0&date_start=&date_end=&probabilidade=0&fase%5B%5D=1&fase%5B%5D=2&fase%5B%5D=3&responsavel=" + getUserData( getUserCookie() )[0].id_user;
        }else if( id == linkPage.add_customer ){ // Incluir Cliente
            url = "https://rosie.artit.com.br/pipeline/cliente/incluir";
        }else if( id == linkPage.cons_customer ){ // Consultar Cliente
            url = "https://rosie.artit.com.br/pipeline/cliente/consultar";
        }else if( id == linkPage.reports ){ // Relatorios
            url = "https://rosie.artit.com.br/pipeline/relatorio";
        }else if( id == linkPage.add_rh ){ // Adicionar Vagas
            url = "https://rosie.artit.com.br/rh/recrutamento/vagas/nova";
        }else if( id == linkPage.cons_rh ){ // Consultar Vagas
            url = "https://rosie.artit.com.br/rh/recrutamento/vagas";
        }else if( id == linkPage.feedback ){ // Feedbacks
            url = "https://rosie.artit.com.br/rh/feedback";
        }else if( id == linkPage.refund ){ // Reembolso
            url = "https://rosie.artit.com.br/user/perfil?panel=reembolso";
        }else if( id == linkPage.cons_net ){ // Consultar Oportunidades da NET
            url = "https://rosie.artit.com.br/pipeline/pipeline/consultar?cliente=2489&projeto=0&date_start=&date_end=&probabilidade=0&fase%5B%5D=1&fase%5B%5D=2&fase%5B%5D=3&responsavel=" + getUserData( getUserCookie() )[0].id_user;
        }else if( id == linkPage.profile ){ // Profile do Rosie
            url = "https://rosie.artit.com.br/user/perfil";
        }else if( id == linkPage.open_change ){ // Abrir o Change
            url = "https://change.artit.com.br/records/index.php";

        // Filtros de Empresas
        }else if( id == linkPage.filter_claro ){ // Filtrar Claro
            url = "https://rosie.artit.com.br/pipeline/pipeline/consultar?cliente=2489&projeto=0&date_start=&date_end=&probabilidade=0&fase%5B%5D=1&fase%5B%5D=2&fase%5B%5D=3" + ( filterMineOnly ? "&responsavel=0" + getUserData( getUserCookie() )[0].id_user : "" );
        }else if( id == linkPage.filter_leroy ){ // Filtrar Leroy
            url = "https://rosie.artit.com.br/pipeline/pipeline/consultar?cliente=2183&projeto=0&date_start=&date_end=&probabilidade=0&fase%5B%5D=1&fase%5B%5D=2&fase%5B%5D=3" + ( filterMineOnly ? "&responsavel=0" + getUserData( getUserCookie() )[0].id_user : "" );
        }else if( id == linkPage.filter_cpqd ){ // Filtrar CPqD
            url = "https://rosie.artit.com.br/pipeline/pipeline/consultar?cliente=1073&projeto=0&date_start=&date_end=&probabilidade=0&fase%5B%5D=1&fase%5B%5D=2&fase%5B%5D=3" + ( filterMineOnly ? "&responsavel=0" + getUserData( getUserCookie() )[0].id_user : "" );
        }else if( id == linkPage.filter_qualicorp ){ // Filtrar Qualicorp
            url = "https://rosie.artit.com.br/pipeline/pipeline/consultar?cliente=3750&projeto=0&date_start=&date_end=&probabilidade=0&fase%5B%5D=1&fase%5B%5D=2&fase%5B%5D=3" + ( filterMineOnly ? "&responsavel=0" + getUserData( getUserCookie() )[0].id_user : "" );
        }else if( id == linkPage.filter_unimed ){ // Filtrar Unimed
            url = "https://rosie.artit.com.br/pipeline/pipeline/consultar?cliente=3445&projeto=0&date_start=&date_end=&probabilidade=0&fase%5B%5D=1&fase%5B%5D=2&fase%5B%5D=3" + ( filterMineOnly ? "&responsavel=0" + getUserData( getUserCookie() )[0].id_user : "" );

        }

        showContent();
        $('#frmContent').attr('src', url);
    } 
    $('#sideMenu').sideNav('hide');
}

/**
 * Registro do Service Worer
 */
if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('./service-worker.js')
        .then(function() { console.log('Service Worker Registered'); });
}
