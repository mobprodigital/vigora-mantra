<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<link rel="stylesheet" href="../lib/bootstrap/css/bootstrap.1.css">
	<link rel="stylesheet" href="../css/pg-response.css">
	<title>Payment</title>
</head>
<body>
<br>
<br>

<?php
header("Pragma: no-cache");
header("Cache-Control: no-cache");
header("Expires: 0");

// following files need to be included
require_once("./lib/config_paytm.php");
require_once("./lib/encdec_paytm.php");

$paytmChecksum = "";
$paramList = array();
$isValidChecksum = "FALSE";

$paramList = $_POST;
$paytmChecksum = isset($_POST["CHECKSUMHASH"]) ? $_POST["CHECKSUMHASH"] : ""; //Sent by Paytm pg

//Verify all parameters received from Paytm pg to your application. Like MID received from paytm pg is same as your application�s MID, TXN_AMOUNT and ORDER_ID are same as what was sent by you to Paytm PG for initiating transaction etc.
$isValidChecksum = verifychecksum_e($paramList, PAYTM_MERCHANT_KEY, $paytmChecksum); //will return TRUE or FALSE string.


if($isValidChecksum == "TRUE") {
	if ($_POST["STATUS"] == "TXN_SUCCESS") {
		?>
				<section class="pay-icon-wrap text-center">
					<img class="pay-icon" src="../assets/images/hair_mantra/icon/check-circle-solid.svg" alt="payment success" />
				</section>
				<h1 class="page-title text-center text-p-success">Payment successful</h1>
				<br>
				<?php
	}
	elseif ($_POST["STATUS"] == "PENDING") {
		?>
				<section class="pay-icon-wrap text-center">
					<img class="pay-icon" src="../assets/images/hair_mantra/icon/exclamation-triangle-solid.svg" alt="payment pending" />
				</section>
				<h1 class="page-title text-center text-danger">Payment Pending</h1>
				<br>
		<?php
	} ?>


				<p class="text-center"><?php echo $_POST['RESPMSG']; ?></p>
				<p class="text-center">Below are the details</p>
				<div class="text-center">
					<div class="w-50 d-inline-block">
						<?php
							if (isset($_POST) && count($_POST)>0 ){ 
								$tableHtml = '<table class="table table-bordered table-primary table-sm">';
								$tableHtml.= '<tbody>';

								
								$tableHtml.= '<tr><td>' . 'Order ID' . '</td><td>' . $_POST['ORDERID'] .'</td></tr>';
								$tableHtml.= '<tr><td>' . 'Transaction ID' . '</td><td>' . $_POST['TXNID'] .'</td></tr>';
								$tableHtml.= '<tr><td>' . 'Transaction Amount' . '</td><td>' . $_POST['TXNAMOUNT'] .'</td></tr>';
								$tableHtml.= '<tr><td>' . 'Currency' . '</td><td>' . $_POST['CURRENCY'] .'</td></tr>';
								$tableHtml.= '<tr><td>' . 'Date' . '</td><td>' . $_POST['TXNDATE'] .'</td></tr>';
								$tableHtml.= '</tbody>';
								$tableHtml.= '</table>';
								echo $tableHtml;
							}
						?>
				</div>
			</div>

	
<?php
/* 	if (isset($_POST) && count($_POST)>0 )
	{ 
		foreach($_POST as $paramName => $paramValue) {
				echo "<br/>" . $paramName . " = " . $paramValue;
		}
	} */
	

}
else {
	echo "<b>Checksum mismatched.</b>";
}

?>

	
</body>
</html>

