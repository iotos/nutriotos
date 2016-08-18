var app = angular.module("nutricionista.nutriotos", ['ngResource']);

app.factory("Nutricionistas", function($firebaseArray){
	var itensNutricionista = new Firebase("https://nutri-app.firebaseio.com/nutricionista");
	return $firebaseArray(itensNutricionista);
})

app.factory('cepResource', function($resource){
	var rest = $resource(
		'https://viacep.com.br/ws/:cep/json/',
		{
			'cep' : ''
		}
	);
	return rest;
});
app.controller("nutricionistaController", ['$scope', '$firebaseArray', 'cepResource', 'Nutricionistas', function($scope, $firebaseArray, cepResource, Nutricionistas){
	$scope.nutricionistas = Nutricionistas;
	$scope.cep = '';
	$scope.cidade = null;

	$scope.findCep = function(){
		cepResource.get({'cep' : $scope.cep}).$promise
			.then(function success(result){
				$scope.cidade = result.localidade;
				$scope.logradouro = result.logradouro;
				$scope.bairro = result.bairro;
				$scope.estado = result.uf;
			}).catch(function(msg){
				console.error('Error');
			});
	}

	$scope.addNutricionista = function(nutricionistas){
		$scope.nutricionistas.$add({
			nome: $scope.nome,
			sexo: $scope.sexo,
			cpf: $scope.cpf,
			crn: $scope.crn,
			regiao: $scope.regiao,
			email: $scope.email,
			telefone: $scope.telefone,
			cep: $scope.cep,
			logradouro: $scope.logradouro,
			numero: $scope.numero,
			complemento: $scope.complemento,
			bairro: $scope.bairro,
			cidade: $scope.cidade,
			estado: $scope.estado,
			senha: $scope.senha,
			termos: $scope.termos
		});
	};
}]);