<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">

  <link rel="stylesheet" href="lib/bootstrap/css/bootstrap.2.css">
  <link rel="stylesheet" href="css/hair_mantra.css">
  <link rel="stylesheet" href="css/common.css">
  <link rel="shortcut icon" href="assets/images/hair_mantra/logo/logo-icon.png" type="image/x-icon">
  <script src="https://www.google.com/recaptcha/api.js" async defer></script>

  <title>Hair Mantra</title>
  <!-- Global site tag (gtag.js) - Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=UA-138209533-1"></script>
  <script>
    window.dataLayer = window.dataLayer || [];

    function gtag() {
      dataLayer.push(arguments);
    }
    gtag('js', new Date());

    gtag('config', 'UA-138209533-1');
  </script>
  <style>
	.tot-payable-cont {
		padding: 15px;
		/* background-color: #c2e9fb;  */
        background: linear-gradient( #ccc, #fff );
		min-height: 59px;
		overflow: auto;
		/* width:60%; */
		/* margin-top: 34px; */
	}
.travelSumary{
	text-align: left;
    /* margin-left: 20%; */
}

.tar {
    text-align: right;
}
.w-46 {
    /* width: 40%; */
	font-size:16px;
}
.w-40,.w-60 {
    width: 40%;
}
.fr {
    float: right;
}
/* .footer{
		clear: both;
		position:absolute;
		bottom:0;
		width:100%;
		
	} */

  .details-box {
    border: 1px solid lightgray;
    padding: 10px;
    /* width: 600px; */
    background: azure;
  }
  </style>

</head>

<body>
  <header>
    <div class=" bg-dark">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <p class='top-note'> <span class="note"> PLEASE NOTE:</span> Due to extremely high demand, there
              is
              limited supply of
              <span class="high-light"> Hair Mantra</span>
              available. - As of
              <span id="date" class="high-light"></span>
              Product is in stock and ready to ship.</p>
          </div>
        </div>
      </div>
    </div>
    
  </header>
  
 <main>

 <?php
		ini_set('display_errors', 1);
		ini_set('display_startup_errors', 1);
		error_reporting(E_ALL);
		if(isset($_POST['razorpay_payment_id'])){
				$link = mysqli_connect("localhost", "mojogmhi_nutra", "Q1w2@HairGrowNutra") or print(mysqli_error()."error\n");
				mysqli_select_db($link,"mojogmhi_hair_grow_nutra_products") or die(mysqli_error()."\n"); 
				$razorpay_order_id		= $_POST['razorpay_order_id'];
				$razorpay_payment_id	= $_POST['razorpay_payment_id'];
				$razorpay_signature		= $_POST['razorpay_signature'];
				$sql 					= "UPDATE  user_details set razorpay_payment_id='$razorpay_payment_id',razorpay_signature='$razorpay_signature',success_flag=1 where razorpay_order_id='$razorpay_order_id'";
				$res 					= mysqli_query($link,$sql);
				
				
				$query 					= "SELECT * FROM user_details WHERE razorpay_order_id= '$razorpay_order_id'";
				$query_rs 				= mysqli_query($link,$query);
				if($query_rs){
					if(mysqli_num_rows($query_rs) > 0){
						if($row  = mysqli_fetch_assoc($query_rs)){
							$firstName    = $row['f_name']; 
							$lastName     = $row['l_name'];  
							$email        = $row['email']; 
							$phone        = $row['phone']; 
							$address      = $row['address']; 
							$city         = $row['city']; 
							$pincode      = $row['pincode']; 
							$state        = $row['state']; 
							$product      = $row['product'];

							$exp_pord     = explode(" ",$product);
							$price        = $row['price'];
							$payment_type = $row['payment_type'];
						}
					}
				}
				 $orderId			= $razorpay_order_id;//substr(md5(uniqid('', 1)), 0, 8);

				require "phpmailer/PHPMailerAutoload.php";
				$msg = "Hello ".$firstName.",<br><br>
                THANK YOU FOR YOUR ORDER!<br><br>
                Name :- $firstName $lastName<br>
                Email :- $email.<br>
                Phone :- $phone.<br>
                Payment Type :- $payment_type.<br>
                Order Id :- $orderId.<br>
                Product :- Hair Mantra Pack of $exp_pord[0].<br>
                Quantity :- 1<br>
                Price :- $price.<br>
                Pincode :- $pincode.<br>
                Address :- $address,$city,$state.<br><br><br><br>
                This Product is not intended to diagnose,treat,cure,or prevent disease.As individuals differ,so will results.
                <br><br><br><br>
                You can contact us at: <b>order.vigormantra@gmail.com 9811213186</b>
                <br>
                <br>
                <b>Thanks Team</b><br><b>Hair Mantra</b>";
                $subject = "Your Hair Mantra Products Order Confirmation (".$orderId.")";
				
				$mail = new PHPMailer;
 
				$mail->isSMTP();
                $mail->SMTPDebug   = false;
                $mail->Host        = 'mail.mojogamezone.com';
                $mail->port        = 587;
                $mail->SMTPAuth    = true;
                $mail->SMTPSecure  = 'tls';
                $mail->Username    = 'dev@mojogamezone.com';
                $mail->Password    = 'Q1w2@E3r4';
                $mail->setFrom('dev@mojogamezone.com','Hair Mantra');
                $mail->addAddress($email);
                $mail->AddCC('order.vigormantra@gmail.com');
                $mail->isHTML(true);
                $mail->Subject     = $subject;
                $mail->Body        = $msg;
				//echo '<pre>';print_r($mail);
				$response	= $mail->send();
				//echo $response;die;
				if($response){
				$thanksMsg	= 'Thank You for Placing order, your order ID is <b>'  .$orderId.'</b> , we have also sent a mail to your mail ID. ';
				}else{
					$thanksMsg	= "";
				}
                
                

				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
			}
		
		
	
	?>
	
	<section class="sec1 section">
      <div class="container">
        <div class="row">

          <div class="col-md-12 col-sm-12 col-lg-7 col-xl-8">

            <div class="row">
              
              <div class=" col-sm-6 col-6">
               
              </div>
            </div>

            

            
          </div>
          
        </div>
      </div>
    </section>
 </main>

    <!-- Modal -->
    <div class="modal fade" id="order" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="ModalTitle"></h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <h4 class="text-center " id="ord-msg">

            </h4>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </main>
  <!-- banner div start  -->
  <div class="text-center mt-15">
  <?php if(isset($_POST['razorpay_payment_id'])){ ?>
		<div class="user-details">
			<div class="onward-details">      
          <div class="travelSumary">
					<div class="container">
						<div class="clearfix">
							<div class="onward clearfix">
								<div class="clearfix m-b-20">
									<div class="tot-payable-cont"style="justify-content: center; align-items: center; display: flex; flex-direction: column; min-height: 70vh; border: 1px solid lightgray;">
										<div class="clearfix fareContainer semibold">
                      <div class="fl w-60 fareDesc" style="width:100%;">
                        <div class="d-flex flex-column align-items-center justify-content-center">
                          <img src="./assets/success.png" alt="" width="100">
                          <?php echo $thanksMsg;?>
                        </div>

                      <div class="d-flex flex-column align-items-center">
                      <div class="details-box">  
                      <div class="w-46 fl">
                        <div class="travel-values">
                            <span style="font-weight: bold;">Order ID</span>
                            <span> - </span><span style="font-weight: bold; color: #007bff;">
                            <?php echo $razorpay_order_id;?>
                          </span>
                        </div>
									    </div>
                      <div class="w-46 fl">
                      <div class="travel-values">
                          <span style="font-weight: bold;"> Payment ID</span>
                          <span> - </span><span style="font-weight: bold; color: #007bff;">
                            <?php echo $razorpay_payment_id;?>
                          </span>
                      </div>
                      </div>
                      </div>


                      </div>
											</div>
											
										</div>
										<div class="fl w-100 refundDesc hide"></div>
									</div>
                
									
									
								</div>
							</div>
						</div>
					</div>
                </div>
            </div>
		</div>

			
    <?php } ?>
   
  </div>
  <!-- banner div endn -->
  <footer>
    <div class="footer">
      <div><a href="privacy-policy.html"> Privacy-Policy</a></div>
      <div>© 2019 Hair Mantra . All Rights Reserved.</div>


    </div>
  </footer>

  <script async src="https://www.googletagmanager.com/gtag/js?id=UA-140406259-1"></script>
  <script>
    window.dataLayer = window.dataLayer || [];

    function gtag() {
      dataLayer.push(arguments);
    }
    gtag('js', new Date());

    gtag('config', 'UA-140406259-1');
  </script>


 
</body>

</html>