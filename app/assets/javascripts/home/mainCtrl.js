angular.module('oscarchavezBlog').controller('MainCtrl', [
'$scope',
'$location',
'posts',
function($scope, $location, posts){
	$scope.posts = posts.posts;
	$location.path();

	//Filter by category
	$scope.desarrollo = true;
	$scope.vr = true;
	$scope.ar = true;
	$scope.blog = true;
	$scope.mxvr = true;


	$scope.addPost = function(){
	  if(!$scope.title || $scope.title === ''
	  	||!$scope.body || $scope.body==='') {
	  	return;
	  }
	  if($scope.category === ''){
	  	$scope.category == 'blog';
	  }
	  posts.create({
	    title: $scope.title,
	    link: $scope.link,
	    category: $scope.category,
	    excerpt: $scope.excerpt,
	    body: $scope.body
	  });
	  $scope.title = '';
	  $scope.link = '';
	  $scope.body = '';
	  $scope.category = '';
	  $scope.excerpt = '';
	  $location.path('/home');
	};


	$scope.deletePost = function(post){
		console.log("Post to destroy:",post);
		posts.delete(post);
	}

	$scope.incrementUpvotes = function(post) {
	  posts.upvote(post);
	};

	$scope.uploadFile = function (file) {
		$scope.f = file;
		console.log(file);
		$scope.upload = Upload.upload({
			url: 'http://oscarchavez.me/js/upload.php',
			method: 'POST',
			data: {file: file}
		}).then(function(resp){
			console.log(resp);
			console.log('Response' + resp.data);
			$scope.alertMsg = resp.data;
			var today = new Date();
			var year = today.getFullYear();
			var filename = resp.config.data.file.name;
			$scope.imgUrl = "http://oscarchavez.me/uploads/" + year + "/" + filename;
		}, function(resp){
			console.log(resp);
			$scope.alertMsg = resp.status;
		}, function(evt){
			file.progress = Math.min(100, parseInt(100.0 * evt.loaded/evt.total));
		});
	};
	

}]);
