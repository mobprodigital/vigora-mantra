var uniqueID = "";


(function () {
    var d = new Date();
    var date = d.getDate();
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var day = days[d.getDay()];
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October",
        "November", "December"
    ];
    var month = months[d.getMonth()];
    var fullyear = d.getFullYear();

    var fulldate = day + ", " + month + ' ' + date + ", " + fullyear;
    document.getElementById("date").innerHTML = fulldate;


    var regForm = document.getElementById('regForm');

    regForm = validationSetup(regForm);

    regForm.addEventListener('onValidationFaild', function () {
        Captha()
        $("#ModalTitle").html('Error Message');

        $('#ord-msg').html('Please fill all the details.');
        $('#ord-msg , #ModalTitle').addClass('color-red');

        $('#order').modal('show');

    });

    regForm.addEventListener('onValidationSuccess', function () {


        var paymentType = $("input[name='payment_type']:checked").val();

        var price = $("input[name='price']:checked").val();

        var product
        if (price == 999) {
            product = '1 box'
        } else if (price == 2699) {
            product = '3 box'
        } else {
            product = '6 box'
        }
        var dataToSend = {
            "firstName": $('#fname').val(),
            "lastName": $('#lname').val(),
            "email": $('#email').val(),
            "phone": $('#phone').val(),
            "address": $('#adderess').val(),
            "city": $('#city').val(),
            "pincode": $('#pincode').val(),
            "state": $('#state').val(),
            "product": product,
            "price": price,
            "paymentType": paymentType

        };

        if (Captha()) {
            $('#fieldForm').prop('disabled', true);
            $("#loader").show();
            $.post({
                'url': "https://mojogamezone.com/development/riccha_dev/HairProduct/setFormData.php",
                'data': JSON.stringify(dataToSend),
                'processData': false,
                'success': function (res, status) {
                    var parse_data = JSON.parse(res);
                    if (parse_data.data) {
                        pymentSuccess(parse_data.data);
                    }
                    $('#order-msg').show();

                },
                'complete': function () {
                    $('#fieldForm').prop('disabled', false);
                    regForm.reset();
                    regForm.clearValidation();
                    grecaptcha.reset();

                }
            });
        } else {
            $("#ModalTitle").html('Error Message');

            $('#ord-msg').html('Please fill all the details.');
            $('#ord-msg , #ModalTitle').addClass('color-red');

            $('#order').modal('show');
        }
    });
    $('#order-msg').hide();
})();

function pymentSuccess(id) {
    var dataToSend = {
        'id': id
    };

    $.post({
        'url': "https://mojogamezone.com/development/riccha_dev/HairProduct/successProductOrder.php",
        'data': JSON.stringify(dataToSend),
        'processData': false,
        'success': function (res, status) {
            var response = JSON.parse(res);
            $('#order-msg').hide();


            if (response.data.payment_type == 'COD') {
         
                $("#ModalTitle").html('Order details');
                $('#ord-msg').html('Thank You for Placing your order, your order ID is' + '  "' + response.data.order_id + '" , we have also sent a mail to your mail ID.' + ' ');
                $('#ord-msg , #ModalTitle').addClass('color-dark-green').removeClass('color-red');
                $('#order').modal('show');
                $('#order-msg').hide();
            } else if (response.data.payment_type == 'online') {
                $("#ORDER_ID").val(response.data.order_id);
                $("#CUST_ID").val(response.data.user_id);
                $("#TXN_AMOUNT").val(response.data.price);
                document.hmg.submit();
            }
            gtag_report_conversion();
        },
        'complete': function () {
            $("#loader").hide();
            $('#after_otp,#otp,#checkOTP').prop('disabled', true);

        }
    });
}





function gtag_report_conversion(url) {
    var callback = function () {
        if (typeof (url) != 'undefined') {
            window.location = url;
        }
    };
    gtag('event', 'conversion', {
        'send_to': 'AW-749956943/zWfkCNfV85gBEM_ezeUC',
        'event_callback': callback
    });
    return false;
}


$('#sendOTP').click(function () {

    var phoneInput = document.getElementById('phone');
    validateField(phoneInput);

    if (!phoneInput.classList.contains('is-valid')) {
        return;
    }

    togglePhoneField(true);
    toggleSendOtpProgressBar(true);
    // $('#sendOTP').prop('disabled', true);
    /* setTimeout(() => {
        $('#sendOTP').prop('disabled', false);
    }, 20000); */
    /* var phoneNumber = $("#phone").val();
    var length = phoneNumber.length;
    if (length >= 10 && length <= 16) {
        if (isTel(phoneNumber)) { */
    var dataToSend = {

        "firstName": $('#fname').val(),
        "lastName": $('#lname').val(),
        "email": $('#email').val(),
        "phone": $('#phone').val(),

    };
    $.post({
        'url': "https://mojogamezone.com/development/riccha_dev/HairProduct/setUserBase.php",
        'data': JSON.stringify(dataToSend),
        'processData': false,
        'success': function (res, status) {
            var parse_data = JSON.parse(res);
            if (parse_data.status === true) {
                uniqueID = parse_data.data.id;
                sendOTP(parse_data.data.id, $('#phone').val());
            } else {
                alert(parse_data.message);
                togglePhoneField(false);
                toggleSendOtpProgressBar(false);
            }
        },
        complete: function () {
            // $('#sendOTP').prop('disabled', false);
        }
    })
    // }
    // }
});


/**
 * Disable or enable phone input field and send OTP button
 * @param {boolean} isDisable if true fields will be disabled else enable
 */
function togglePhoneField(isDisable) {
    $("#phone, #sendOTP").prop('disabled', isDisable);
}

/**
 * Disable or enable OTP input field and verify OTP button
 * @param {boolean} isDisable if true fields will be disabled else enable
 */
function toggleOtpField(isDisable) {
    $("#otp, #checkOTP").prop('disabled', isDisable);
}


/**
 * Show or hide sending OTP progress bar
 * @param {boolean} isShow If true progress bar will be visible else hidden
 */
function toggleSendOtpProgressBar(isShow) {
    if (isShow === false) {
        $('#opt-loader').hide();
    } else {
        $('#opt-loader').show();
    }
}

/**
 * Show or hide verify OTP progress bar
 * @param {boolean} isShow If true progress bar will be visible else hidden
 */
function toggleVerifyOtpProgressBar(isShow) {
    if (isShow === false) {
        $('#verify-opt-loader').hide();
    } else {
        $('#verify-opt-loader').show();
    }
}

function sendOTP(id, number) {
    var dataToSend = {
        "id": id,
        "number": number
    }
    if (number && id) {
        $.post({
            'url': 'https://mojogamezone.com/development/riccha_dev/HairProduct/send_otp.php',
            'data': JSON.stringify(dataToSend),
            'processData': false,
            'success': function (res, status) {
                var parse_data = JSON.parse(res);
                if (parse_data.status === true) {
                    // $('#otp_send_msg').show();
                    // $('#otp,#checkOTP').prop('disabled', false);
                    alert(parse_data.message);
                    toggleOtpField(false);
                } else {
                    alert(parse_data.message);
                    toggleOtpField(true);


                    // $('#otp,#checkOTP').prop('disabled', true);
                }
            },
            'complete': function () {
                togglePhoneField(false);
                toggleSendOtpProgressBar(false);
                /* setTimeout(() => {

                    $('#otp_send_msg,#otp_not_send_msg').hide();
                }, 3000); */
            }
        })
    }

}
$("#checkOTP").click(function () {

    var otp = $('#otp').val();
    var length = otp.length;
    if (length == 4) {
        if (isTel(otp)) {
            var dataToSend = {
                "otp": otp,
                'id': uniqueID,
                'number': $("#phone").val()
            }
            toggleOtpField(true);
            toggleVerifyOtpProgressBar(true);

            $.post({
                'url': "https://mojogamezone.com/development/riccha_dev/HairProduct/check_otp.php",
                'data': JSON.stringify(dataToSend),
                'processData': false,
                'success': function (res, status) {
                    var parse_data = JSON.parse(res);

                    if (parse_data.status == true) {

                        $('#after_otp').prop('disabled', false);
                        /* $('#after_otp').prop('disabled', false);
                        $('#otp_verify_msg').show(); */
                        alert(parse_data.message);

                    } else {
                        alert(parse_data.message);
                        toggleOtpField(false);

                        // $('#otp_not_verify_msg').show();
                    }

                },
                'complete': function () {
                    toggleVerifyOtpProgressBar(false);
                    /* setTimeout(() => {

                        $("#otp_verify_msg,#otp_not_verify_msg").hide();
                    }, 1000); */
                }
            })

        }
    }
});

// function getEmail() {
//     var email = $("#email").val()
//     if (isEmail(email)) {
//         var dataToSend = {
//             "firstName": $('#fname').val(),
//             "lastName": $('#lname').val(),
//             "email": $('#email').val(),
//             "phone": $('#phone').val(),
//             "address": $('#adderess').val(),
//             "city": $('#city').val(),
//             "pincode": $('#pincode').val(),
//             "state": $('#state').val(),
//         };
//         $.post({
//             'url': "https://mojogamezone.com/development/riccha_dev/HairProduct/setUserBase.php",
//             'data': JSON.stringify(dataToSend),
//             'processData': false,
//             'success': function (data, status) {}
//         })
//     }
// }


function Captha() {

    var response = grecaptcha.getResponse();
    if (response.length == 0) {
        document.getElementById('g-recaptcha-error').innerHTML =
            '<span style="width: 100%;margin-top: 0.25rem;font-size: 80%;color: #ef7d87;">This field is required.</span>';
        return false;
    }
    return true;
}

function verifyCaptcha() {

    document.getElementById('g-recaptcha-error').innerHTML = '';
}

(
    function () {
        var str = '<img src="assets/images/hair_mantra/icon/star.png" alt="">';
        $('.5star').html(str.repeat(5));
        $('.4star').html(str.repeat(4));
        $('.3star').html(str.repeat(3));
        $('.2star').html(str.repeat(2));
        $('.1star').html(str.repeat(1));
    }
)();