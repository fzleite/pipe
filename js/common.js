/**
 * Lista de Usuarios
 */
var userList = [
  {
    user: "fleite",
    name: "Fernando Zimmermann Leite",
    id_user: 2,
    email: "fleite@artit.com.br",
    profileImage: "images/fleite.png"
  },
  {
    user: "cmenezes",
    name: "Ciro de Menezes",
    id_user: 33,
    email: "cmenezes@artit.com.br",
    profileImage: "images/cmenezes.jpg"
  },
  {
    user: "romulo",
    name: "Romulo Cesar de Paula",
    id_user: 7,
    email: "romulo@artit.com.br",
    profileImage: "images/romulo.jpg"
  },
  {
    user: "lardito",
    name: "Luis Afonso Ardito",
    id_user: 55,
    email: "lardito@artit.com.br",
    profileImage: "images/lardito.jpg"
  },
  {
    user: "mmelari",
    name: "Monica Melari",
    id_user: 54,
    email: "mmelari@artit.com.br",
    profileImage: "images/mmelari.jpg"
  },
  {
    user: "rcaporali",
    name: "Rogerio Caporali",
    id_user: 73,
    email: "rcaporali@artit.com.br",
    profileImage: "images/rcaporali.jpg"
  }
];

/**
 * Lista de Links
 */
var linkPage = {
  home: 0,
  add_opportunity: 1,
  cons_opportunity: 2,
  add_customer: 3,
  cons_customer: 4,
  reports: 5,
  add_rh: 6,
  cons_rh: 7,
  feedback: 8,
  refund: 9,
  profile: 10,
  open_change: 11,
  rel_horas_demanda: 12,
  rel_horas_usuario: 13,
  rel_horas_projeto: 14,
  rel_calendario: 15,
  rel_reembolso: 16,
  rel_notificacoes: 17,

  filter_claro: 2489,
  filter_leroy: 2183,
  filter_cpqd: 1073,
  filter_qualicorp: 3750,
  filter_unimed: 3445,
  filter_hc: 3878,
  filter_matera: 4273,
  filter_movile: 4000,
  filter_multiplay: 3701,
  filter_promon: 3720,
  filter_teleideia: 4114,
  filter_caixa: 4151
};

/**
 * Controles do Angular
 */
function usersController($scope) {
  $scope.itens = userList;
}

function profileController($scope) {
  var userData = getUserData(getUserCookie())[0];

  if (typeof userData != "object") {
    userData = userList[0];
  }

  $scope.username = userData.user;
  $scope.profileName = userData.name;
  $scope.profileEmail = userData.email;
  $scope.profileImage = userData.profileImage;
}

/**
 * Funções para tratamento de cookie
 */

function setUserCookie(user) {
  document.cookie = "user=" + user;
  //$('.tap-target').tapTarget('open');
  window.location.reload();
}

function getUserCookie() {
  var ret = document.cookie;
  if (ret != "") ret = ret.split("=")[1];

  return ret;
}

/**
 * Funções de Localização do JSON
 */
function getUserData(username) {
  return userList.filter(function(userList) {
    return userList.user == username;
  });
}

/**
 * Funções de Navegação
 */
function home() {
  $(frameContent).addClass("hide");
  $(cardsContent).removeClass("hide");
}

function showContent() {
  $(frameContent).removeClass("hide");
  $(cardsContent).addClass("hide");
}

function openLink(id) {
  var url;
  var filterMineOnly;

  // filterMine = (document.frmFilter.filterMine.value ? true : false);
  filterMineOnly = document.getElementById("filterMine").checked;

  if (id == linkPage.home) {
    // HOME
    home();
  } else {
    if (id == linkPage.add_opportunity) {
      // Aduciobar Oportunidade
      url = "https://rosie.artit.com.br/pipeline/pipeline/incluir";
    } else if (id == linkPage.cons_opportunity) {
      // Consultar Oportunidade
      url =
        "https://rosie.artit.com.br/pipeline/pipeline/consultar?projeto=0&date_start=&date_end=&probabilidade=0&fase%5B%5D=1&fase%5B%5D=2&fase%5B%5D=3&responsavel=" +
        getUserData(getUserCookie())[0].id_user;
    } else if (id == linkPage.add_customer) {
      // Incluir Cliente
      url = "https://rosie.artit.com.br/pipeline/cliente/incluir";
    } else if (id == linkPage.cons_customer) {
      // Consultar Cliente
      url = " ";
    } else if (id == linkPage.reports) {
      // Relatorios
      url =
        "https://rosie.artit.com.br/pipeline/relatorio?&responsavel=" +
        getUserData(getUserCookie())[0].id_user +
        "&fase%5B%5D=1&fase%5B%5D=2&fase%5B%5D=3#RelDashboardAnalitico";
    } else if (id == linkPage.add_rh) {
      // Adicionar Vagas
      url = "https://rosie.artit.com.br/rh/recrutamento/vagas/nova";
    } else if (id == linkPage.cons_rh) {
      // Consultar Vagas
      url = "https://rosie.artit.com.br/rh/recrutamento/vagas";
    } else if (id == linkPage.feedback) {
      // Feedbacks
      url = "https://rosie.artit.com.br/rh/feedback";
    } else if (id == linkPage.refund) {
      // Reembolso
      url = "https://rosie.artit.com.br/user/perfil?panel=reembolso";
    } else if (id == linkPage.profile) {
      // Profile do Rosie
      url = "https://rosie.artit.com.br/user/perfil";
    } else if (id == linkPage.open_change) {
      // Abrir o Change
      url = "https://change.artit.com.br/records/index.php";
    } else if (id == linkPage.rel_horas_demanda) {
      // Relatorio de Horas por Demanda
      url = "https://rosie.artit.com.br/relatorios/horas-por-demanda";
    } else if (id == linkPage.rel_horas_usuario) {
      // Relatorio de Horas por Usuario
      url = "https://rosie.artit.com.br/relatorios/horas-por-usuario";
    } else if (id == linkPage.rel_horas_projeto) {
      // Relatorio de Horas por Projeto
      url = "https://rosie.artit.com.br/relatorios/horas-por-projeto";
    } else if (id == linkPage.rel_calendario) {
      // Relatorio Calendario
      url = "https://rosie.artit.com.br/relatorios/calendario";
    } else if (id == linkPage.rel_reembolso) {
      // Relatorio Reemboso
      url = "https://rosie.artit.com.br/relatorios/reembolso";
    } else if (id == linkPage.rel_notificacoes) {
      // Relatorio de Notificações do Pipeline
      url = "https://rosie.artit.com.br/pipeline";

      // Filtros de Empresas
    } else if (id > 1000) {
      // Filtrar Clientes ( ID = Codigo do Cliente )
      url =
        "https://rosie.artit.com.br/pipeline/pipeline/consultar?cliente=" +
        id +
        "&projeto=0&date_start=&date_end=&probabilidade=0&fase%5B%5D=1&fase%5B%5D=2&fase%5B%5D=3" +
        (filterMineOnly
          ? "&responsavel=0" + getUserData(getUserCookie())[0].id_user
          : "");
    }

    showContent();
    $("#frmContent").attr("src", url);
  }
  $("#sideMenu").sideNav("hide");
}

/**
 *  Monitora alterações no tamanho da tela para ajusta o iFrame
 */
function getDocHeight() {
  // stackoverflow.com/questions/1145850/
  var body = document.body;
  var html = document.documentElement;

  var height = Math.max(
    body.scrollHeight,
    body.offsetHeight,
    html.clientHeight,
    html.scrollHeight,
    html.offsetHeight
  );

  return height;
}

function setIframeHeight(id) {
  var ifrm = document.getElementById(id);

  ifrm.style.visibility = "hidden";
  ifrm.style.height = "10px";

  ifrm.style.height = getDocHeight() - 75 + "px";

  ifrm.style.visibility = "visible";
}

var lastHeight = 0;
function setFrameSize() {
  if (lastHeight != getDocHeight()) {
    console.log(
      "Detectada alteração de tela. Atualizando tamanho do iframe: " +
        lastHeight +
        "px"
    );
    setIframeHeight("frmContent");
    lastHeight = getDocHeight();
  }
  setTimeout(setFrameSize, 1000);
}

/**
 * Registro do Service Worer
 */
function registerSW() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./service-worker.js").then(function() {
      console.log("[ServiceWorker] Service Worker Registered");
    });
  }
}

$(document).ready(function() {
  // Inicializa o floating button com suas ações
  //$('.fixed-action-btn').floatingActionButton();

  // Verifica se existe um cookie com o usuario selecionado,
  // senão abre o modal com a seleção de usuario.
  $(".modal").modal();
  if (document.cookie == "") {
    $(".modal").modal("open");
  }

  // Inicializa o SidNav
  $("#sideMenu").sideNav();

  // Invoca metodo que irá monitar o tamanho da tela
  setFrameSize();

  // Invoca metodo que irá registrar o Service Worker
  registerSW();
});
