
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


if(isset($_POST ['signUp'])){

$names = $_POST['names'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$addres = $_POST['addres'];
$city = $_POST['city'];
$country = $_POST['country'];
$pass = $_POST['pass'];
$confirmPass = $_POST['confirmPassword'];



$query = "INSERT INTO usuario (names,email,phone,addres,city,country,pass,confirmPassword) values ('$names','$email','$phone','$addres','$city','$country',$pass,'$confirmPass')";

$ejecutar = mysqli_query($conn, $query);


if (!$ejecutar){

	echo "Error en el registro: " . mysqli_error($conn);

} else	{
	echo "Usuario Registrado con exito. " . $names;
	}

}


mysqli_close($conn);
}

?>