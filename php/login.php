<?php

ini_set('display_error',1);
ini_set('display_startup_errors',1);
error_reporting(E_ALL);


if($_SERVER["REQUEST_METHOD"] =="POST"){
$dbhost = "localhost";
$dbuser = "root";
$dbpass = "";
$dbname = "tienda";

$conn = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname);
if (!$conn) 
{
	die("No hay conexión: ".mysqli_connect_error());
}


if(isset($_POST['login'])){

$email = $_POST["email"];
$pass = $_POST["pass"];

$query = mysqli_query($conn,"SELECT * FROM login WHERE usuario = '".$email."' and pass = '".$pass."'");
$nr = mysqli_num_rows($query);

if($nr == 1)
{
	
	echo "Bienvenido:" .$email;
}
else
{
	
	echo "No ingreso"; 
	echo "<script> alert('Error');window.location= 'index.html' </script>";
}
}




mysqli_close($conn);
}


?>