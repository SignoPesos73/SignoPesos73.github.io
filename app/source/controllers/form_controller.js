'use strict';

angular.module('form.Fields', [])
.controller('fields', ['main_server', 'user_data', '$location',
    function(main_server, user_data, $location){
        var self = this;
        self.userData = user_data;
        self.loading = false;
        self.portfoliosInfo = {};
        self.administradoras = [];
        self.selectedAdminFics = [];

        self.loadFics = function(admin){
            self.selectedAdminFics = self.portfoliosInfo[admin];
            self.userData.data.nombre_fondo.text = "";
        };

        main_server.getPortfolios().then(function(response){
            self.portfoliosInfo = response.data;
            self.administradoras = Object.keys(self.portfoliosInfo);
        });

        self.submit = function(){
            self.loading = true;
            user_data.results = null;
            user_data.results_ready = false;
            var data = self.userData.data;
            var promise = main_server.sendPersonalInfo(data);
            promise.then(
                function(response){
                    self.loading = false;
                    if (response.status == 200){
                        user_data.results = response.data;
                        $location.path('/results');
                    }
                },
                function(response){
                    self.loading = false;
                    user_data.results = response.data;
                }
            )
        }
}])
;
