angular.module('server.utils', [])

.factory('main_server', ['$http', function($http){
    var serverAddress = 'https://transformers-satrack.appspot.com/';
    var serverPort = '';
    var fullServerAddress;

    if (serverPort != ''){
        fullServerAddress = serverAddress + ':' + serverPort + '/';
    } else {
        fullServerAddress = serverAddress;
    }

    function sendMessage(msg, method, headers, progressHandler){
        return $http({
            url: fullServerAddress,
            method: method ? method : 'POST',
            data: JSON.stringify(msg),
            headers: headers,
            withCredentials: false,
            crossDomain: true,
            eventHandlers: {
                progress: progressHandler ? progressHandler: function(){}
            }
        });
    }

    function getPortfolios(){
        return $http({
            url: fullServerAddress+'getPortfolios',
            method: 'GET',
            withCredentials: false,
            crossDomain: true
        });
    }

    return {
        serverAddress: serverAddress,
        serverPort: serverPort,
        sendMessage: sendMessage,
        sendPersonalInfo: function(infoJson){
            return sendMessage(infoJson, 'POST');
        },
        getPortfolios: getPortfolios
    }
}])
.factory('user_data', [function(){
    return {
        data: {
            nombre: {
                text: ''
            },
            apellidos: {
                text: ''
            },
            cedula: {
                text: ''
            },
            celular: {
                text: ''
            },
            mail: {
                text: ''
            },
            administradora: {
                text: ''
            },
            nombre_fondo: {
                text: ''
            }
        },
        results: null
    }
}])
;
