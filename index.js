

$(document).ready(function(){
	var server = "https://localhost:5001/";
	var url = server;
	var method;
	var user;
	var users;
	var userName;
	var content;
	var fileList = [];
	getAllUsers();

	$("#btnSignin").on('click', function(){
		var name = $("#signname").val();
		var login = $("#signuser").val();
		var pass = $("#signpass").val();
		signin(name,login,pass);
	});
	$("#exit").on('click', function(){
		location.reload();
	});
	$("#btnLogin").on('click', function(){
		var user = $("#loginuser").val();
		userName = user;
		var pass = $("#loginpass").val();
		if(user != "" && pass != ""){
			login(user, pass);
		}else{
			alert('Preencha o Usuário e Senha');
		}
		
	});
	$(document).on('keypress',function(e) {
		if(e.which == 13) {
			$("#btnLogin").trigger("click");
		}
	});
$("#pubbox").on('change', function(){
	if ($('#pubbox').is(":checked"))
	{
  		console.log("on");
	}else{
		console.log("off");
	}
})
$("#arquivo").on('change', function(e){
	//var fileName = e.target.files[0].name;
	var file = e.target.files[0];
	file.fileName = e.target.files[0].name;
	//attachFile(file);
	//var files = $("#files").html()+'<div class="row"><div class="col">'+fileName+'</div></div>';
	//$("#files").html(files);
	var fr = new FileReader();
	fr.readAsText(file);
	fr.onload = function(e) {
		method = "POST";
		var revision = "{'userName':'"+userName.toString()
		+"','fileName':'"+file.fileName.toString()
		+"','fileData':'"+e.target.result.toString()
		+"','isPublic':"+$('#pubbox').is(":checked")
		+",'LastModificationDate':'hoje'}";
		var xhttp = new XMLHttpRequest();
		xhttp.open(method, url+'Transfer/Send/', true);
		xhttp.onreadystatechange = function() {
			if(xhttp.readyState==4 && (xhttp.status == 200 || xhttp.status == 201)) {                    
				var data = this.responseText; //Isso é a resposta da requisição
				alert('O arquivo "' + file.fileName + '" foi enviado.' );
				getallfiles(user);
			}
		}
		xhttp.setRequestHeader("Content-Type","application/json;charset=UTF-8");
		xhttp.send(revision);
	};
	
	

});
//FUNÇÕES
function signin(name, login, pass){
	method = "POST";
	var args1 = '{"Name":"'+name
		+'","UserName":"'+login
		+'","Password":"'+pass+'"}';
	var xhttp = new XMLHttpRequest();
	xhttp.open(method, url+'user/SignIn/', true);
	xhttp.onreadystatechange = function() {
		if(xhttp.readyState==4 && (xhttp.status == 200 || xhttp.status == 201)) {                    
			var data = this.responseText; //Isso é a resposta da requisição
			alert(data+" cadastrado!");
		}
	}
	xhttp.setRequestHeader("Content-Type","application/json;charset=UTF-8");
	xhttp.send(args1);
}
function login(userName, pass){
	method = "POST";
	var args1 = '{"UserName":"'+userName
				+'","Password":"'+pass+'"}';
	var xhttp = new XMLHttpRequest();
	xhttp.open(method, url+'user/login/', true);
	xhttp.onreadystatechange = function() {
		if(xhttp.readyState==4 && (xhttp.status == 200 || xhttp.status == 201)) {                    
			var data = this.responseText; //Isso é a resposta da requisição
			alert('Usuário Logado!');
			user = args1;
			userName = $("#loginuser").val();
			//console.log(userName);
			$("#signin").hide();
			$("#login").hide();
			$("#arquivo").show();
			$("#exit").show();
			$("#public").show();
			$("#userName").html(userName);
			$("#userName").val(userName);
			getallfiles(user);
		}else{
			if(xhttp.status==500){
				alert("Usuário não encontrado");
			}
			
		}
	}
	xhttp.setRequestHeader("Content-Type","application/json;charset=UTF-8");
	xhttp.send(args1);
}
function getallfiles(user){
	method = "POST";
	var xhttp = new XMLHttpRequest();
	xhttp.open(method, url+'Transfer/GetAll/', true);
	xhttp.onreadystatechange = function() {
		if(xhttp.readyState==4 && (xhttp.status == 200 || xhttp.status == 201)) {                    
			var data = this.responseText; //Isso é a resposta da requisição
			var files = JSON.parse(data);
			var id = 0;
			fileList =[];
			$("#files").empty();
			files.forEach(element => {
				id++;
				
				fileList.push(element);
				attachFile(element, id);
			});				
		}
	}
	xhttp.setRequestHeader("Content-Type","application/json;charset=UTF-8");
	xhttp.send(user);
}
function attachFile(file, id){
	content = $("#files").html()+'<div class="row"><div class="col"><label style="border-bottom: double;" id="'+id+'">'+file.fileName+'</label><button class="btn btn-outline-warning btnDownload" style="float: right;">Download</button><button class="btn btn-outline-danger btnDelete" style="float: right;">Delete</button></div></div>';
	$("#files").empty();
	
	$("#files").html(content);
	$(".btnDownload").on('click', function(){
		var id = "#"+this.previousSibling.id;
		var thisFileName = $(id).html();
		var file = fileList.find(getFile);
		function getFile(file){if(file.fileName == thisFileName){return file;}}
		var revision = "{'userName':'"+userName.toString()
		+"','fileName':'"+file.fileName
		+"','fileData':'"+file.fileData
		+"','isPublic':"+false
		+",'LastModificationDate':'hoje'}";
		var xhttp = new XMLHttpRequest();
		xhttp.open(method, url+'Transfer/Download/', true);
		xhttp.onreadystatechange = function() {
			if(xhttp.readyState==4 && (xhttp.status == 200 || xhttp.status == 201)) {                    
				var data = this.responseText; //Isso é a resposta da requisição
				var blob = new Blob([data], {type: "text/plain"});
				var url = window.URL.createObjectURL(blob);
				var a = document.createElement("a");
				a.href = url;
				a.download = file.fileName;
				a.click();
			}
		}
		xhttp.setRequestHeader("Content-Type","application/json;charset=UTF-8");
		xhttp.send(revision);
	});
	$(".btnDelete").on('click', function(){
		var thisFileName = $("#"+this.previousSibling.previousSibling.id).html();
		var file = fileList.find(getFile);
		function getFile(file){
			if(file.fileName == thisFileName){
				return file; 
			}
		}
		method = "DELETE";
		var revision = "{'userName':'"+userName.toString()
		+"','fileName':'"+file.fileName
		+"','fileData':'"+file.fileData
		+"','isPublic':"+false
		+",'LastModificationDate':'hoje'}";
		var xhttp = new XMLHttpRequest();
		xhttp.open(method, url+'Transfer/Delete/', true);
		xhttp.onreadystatechange = function() {
			if(xhttp.readyState==4 && (xhttp.status == 200 || xhttp.status == 201)) {                    
				var data = this.responseText; //Isso é a resposta da requisição
				getallfiles(user);
			}
		}
		xhttp.setRequestHeader("Content-Type","application/json;charset=UTF-8");
		xhttp.send(revision);
	})
}
function getAllUsers(){
	method = "GET";
	var xhttp = new XMLHttpRequest();
	xhttp.open(method, url+'user/GetAll/', true);
	xhttp.onreadystatechange = function() {
		if(xhttp.readyState==4 && (xhttp.status == 200 || xhttp.status == 201)) {                    
			users = this.responseText; //Isso é a resposta da requisição
			console.log(users);
		}else{

			if(xhttp.status ==500){
				console.log('erro');
			}
			
		}
	}
	xhttp.setRequestHeader("Content-Type","application/json;charset=UTF-8");
	xhttp.send();
}


});    
