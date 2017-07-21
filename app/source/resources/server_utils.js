angular.module('server.utils', [])

.factory('main_server', ['$http', function($http){
    var serverAddress = 'https://transformers-satrack.appspot.com';
    var serverPort = '';
    var fullServerAddress = serverAddress + ':' + serverPort + '/';

    function sendMessage(msg, method, headers, progressHandler){
        return $http({
            url: fullServerAddress,
            method: method ? method : 'POST',
            data: msg,
            headers: headers,
            withCredentials: false,
            crossDomain: true,
            eventHandlers: {
                progress: progressHandler ? progressHandler: function(){}
            }
        });
    }

    function testSend(msg){
        return {
            then: function(f){
                f(3);
            }
        }
    }

    return {
        serverAddress: serverAddress,
        serverPort: serverPort,
        sendMessage: sendMessage,
        sendPersonalInfo: function(infoJson){
            return sendMessage(infoJson, 'POST');
        }
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
