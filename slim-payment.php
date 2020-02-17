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

  <title>Slim Mantra</title>
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
		background-color: #e0fde8;
		/* min-height: 59px; */
		overflow: auto;
		/* width:60%; */
		/* margin-top: 34px; */ 
		font-size: 18px;
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
    /* margin: 8px 0px; */
	padding: 10px;
}
.w-40,.w-60 {
    width: 40%;
}
	.fareDesc{
		float: left;
	}
.fr {
    float: right;
}
	.razorpay-payment-button{
		border-radius: 6px;
		color: #fff;
		font-size: 19px;
		background-color: #ffc107;
		border-color: #ffc107;
	}
	.cancel-razorpay-payment-button{
		border-radius: 6px;
		color: #fff;
		font-size: 19px;
		background-color: #d42333;
		border-color: #ffc107;
		padding: 4px;
		/* float: left; */
		width: 10%;
	}
	a:hover {
		color: #fff;
		text-decoration: none;
	}	
	.payment-block{
		/* float: left;
		margin-left: 45.8%;
		margin-right: 1%;
		margin-top: 10px; */
		
	}
	.cancel-block{
		/* margin-top: 10px; */

	}
	.footer{
		/* clear: both;
		position:absolute; */
		bottom:0;
		width:100%;
		
	}

	.clearfix {
		border: 0.6px solid lightgray;
	}

	.divider {
		border: 0.6px solid lightgray;
	}

	.travel-values {
		font-weight: bold;
	}

	.values {
		font-weight: normal;
	}

	.total-payable{ 
		font-weight: bold;
	}

	.amount {
		font-weight: bold;
		color: #d42333;
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
              <span class="high-light"> Slim Mantra</span>
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
		//print_r($_POST);die;
		if(isset($_POST['order_id'])){
			$amount			= $_POST['amount'];
			$rozerAmount	= $amount;
			$amount			= $amount / 100;
			$currency		= $_POST['currency'];
			$order_id		= $_POST['order_id'];
			$name			= $_POST['name'];
			$email			= $_POST['email'];
			$contact		= $_POST['contact'];
			$address		= $_POST['address'];
			$city			= $_POST['city'];
			$pincode		= $_POST['pincode'];
			$state			= $_POST['state'];
			if($amount == 2457){
				$quantity		= 1 ;

			}else if($amount == 4624){
				$quantity		= 2 ;

			}elseif($amount == 6502){
				$quantity		= 3 ;

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
  <h3 class="text-primary">Confirm Details Before Proceed</h3>
		<?php if(isset($_POST['order_id'])){ ?>
		<div class="user-details">
			<div class="onward-details">      
                <div class="travelSumary">
					<div class="container">
						<div class="clearfix">
							<div class="onward clearfix">
								<div class="clearfix m-b-20">
									<div class="w-46 fl">
										<div class="travel-values">
											Name
												<span> - </span><span class="values"><?php echo $name;?></span>
										</div>
									</div>
									<div class="divider"></div>
									<div class="w-46 fl">
										<div class="travel-values">
											Email
												<span> - </span><span class="values"><?php echo $email;?></span>
										</div>
									</div>
									<div class="divider"></div>
									<div class="w-46 fl">
										<div class="travel-values">
											Phone
												<span> - </span><span class="values"><?php echo $contact;?></span>
										</div>
									</div>
									<div class="divider"></div>
									<div class="w-46 fl">
										<div class="travel-values">
											Address
												<span> - </span><span class="values"><?php echo $address;?>,&nbsp;<?php echo $city;?>, &nbsp;<?php echo $state;?>, &nbsp;<?php echo $pincode;?></span>
										</div>
									</div>
									<div class="divider"></div>
									<div class="w-46 fl">
										<div class="travel-values">
											Quantity
												<span> - </span><span class="values"><?php echo $quantity;?> &nbsp; Box</span>
										</div>
									</div>
									<div class="divider"></div>
									<div class="container my-3">
									<div class="tot-payable-cont" style="display: flex; justify-content: space-between;">
										<div class="total-payable">
											TOTAL PAYABLE
										</div>
										<div class="amount">
											<span class="ct">INR </span>
											<span id="tot-fare-payable"><?php echo $amount;?></span>
										</div>
									</div>
									<!-- <div class="tot-payable-cont">
										<div class="fareContainer semibold">
											<div class="fl w-60 fareDesc">
												TOTAL PAYABLE
											</div>
											<div class="fr w-40 fareVal tar">
												<span class="ct">INR </span>
												<span id="tot-fare-payable"><?php echo $amount;?></span>
											</div>
										</div>
										<div class="fl w-100 refundDesc hide"></div>
									</div> -->
									</div>
								</div>
							</div>
						</div>
					</div>
                </div>
            </div>
		</div>
		<?php } ?>
			
	 <?php if(isset($_POST['order_id'])){ ?>
			<div class="row payment-block my-3">
				<div class="d-flex justify-content-center flex-grow-1 align-items-center">	
					<div>
						<form  action="https://vigormantra.com/slim-payment-success.php" method="POST">
										<script id="payement-tag" src="https://checkout.razorpay.com/v1/checkout.js"    
										data-key="rzp_live_rTtBJrEHUMJXXF"
										data-amount="<?php echo $rozerAmount;?>"
										data-currency="INR"  
										data-order_id="<?php echo $order_id;?>"
										data-buttontext="Continue To Pay"    
										data-name="Teff Media"    
										data-description="" 
										data-image="https://vigormantra.com/assets/images/hair_mantra/logo/logo-icon.png"
										data-prefill.name="<?php echo '';//$name;?>"
										data-prefill.email="<?php echo $email;?>"
										data-prefill.contact="<?php echo $contact ;?>" 
										data-theme.color="#F37254"></script>
									<input type="hidden" custom="Hidden Element" name="hidden">
							</form>
					</div>

						<div class="cancel-block mx-2">
							<a href="https://vigormantra.com/" class="cancel-razorpay-payment-button">Cancel</a>
						</div>
				</div>


			</div>

			
			<?php } ?>
    <!--<a target="_blank"
      href="https://app.appsflyer.com/video.like?af_siteid={publisher_id}_{source}&pid=mobprodigital_int&af_click_lookback=1d&clickid={click_id} ">
      <img class="banner" src="assets/banner/1.jpg" alt="">
    </a>-->
  </div>
  <!-- banner div endn -->
  <footer>
    <div class="footer">
      <div><a href="privacy-policy.html"> Privacy-Policy</a></div>
      <div>© 2019 Slim Mantra . All Rights Reserved.</div>


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