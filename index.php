<!DOCTYPE html>
  <head>
    <!--Load the AJAX API-->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <script
  src="https://code.jquery.com/jquery-3.4.1.min.js"
  integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
  crossorigin="anonymous"></script>
  <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
  <script type="text/javascript" src="index.js"></script>
    
  </head>

  <body class="jumbotron">
  <nav class="nav bg-info">
    
  </nav>

  <div class="container" style="border-radius:10px; background-color:white;">
  <center> 
    <br>
    <h1 style="font-family: Comic-Sans;">UTFBOX</h1>
    <button id="exit"class="btn btn-danger" style="float: right;display:none;">Sair</button>
    <hr/>
    <h4><div style="color: green; font-family: Comic-Sans;" id="userName">...</div></h4>
    
  </center>
  <div class="row" style="text-align:center;">
    <div class="col-4">  
    </div>
    <div class="col-4" id="login">
      <input id="loginuser" type="text" placeholder="Username">
      <input id="loginpass" type="password" placeholder="Password"><br>
      <button class="btn btn-success" id="btnLogin"> Logar </button>
    </div>
    <div class="col-4">
    </div>
  </div>
  
  
  <div class="container" style="border-radius:20px;">
    <br>
    <div class="row" style="text-align:center;">
      <div class="col-4"></div>
      <div class="col-4" id="signin">
        Cadastre-se:
        <br>
        <input id="signname" type="text" placeholder="Nome"><br>
        <input id="signuser" type="text" placeholder="Usuário"><br>
        <input id="signpass" type="password" placeholder="Senha"><br>
        <button class="btn btn-warning" id="btnSignin">Cadastrar</button>
        <br>
      </div>
      <div class="col-4"></div>
      
      <br>
      
    
    </div>

    <div id="arquivo" style="display: none;background-color: white;">
    <hr/>
    <h5>Enviar Arquivo:</h5>
    <input  type="file">
    <div id="public" style="float:center; display:none; margin-right:10px;">
      <input id="pubbox" type="checkbox">Público  
    </div>  
        
        <hr/>
        <div  style="border-radius:2px; background-color: lightgray;" id="files"></div>
      </div>
    <br>
  </body>
</html>