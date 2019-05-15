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
        var product;
        if (price == 1999) {
            product = '1 box'
        } else if (price == 2999) {
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
                'url': "https://mojogamezone.com/development/riccha_dev/SlimMantra/setFormData.php",
                'data': JSON.stringify(dataToSend),
                'processData': false,
                'success': function (res, status) {
                    var parse_data = JSON.parse(res);
                    if (parse_data.userData) {
                        orderSuccess(parse_data.userData);
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

function orderSuccess(id) {
    var dataToSend = {
        'id': id
    };

    $.post({
        'url': "https://mojogamezone.com/development/riccha_dev/SlimMantra/successProductOrder.php",
        'data': JSON.stringify(dataToSend),
        'processData': false,
        'success': function (res, status) {
            var response = JSON.parse(res);
            $('#order-msg').hide();
            if (response.userData.payment_type == 'COD') {
                hitVnativeApi(response.userData.order_id, response.userData.price);
                $("#ModalTitle").html('Order details');
                $('#ord-msg').html('Thank You for Placing your order, your order ID is' + '  "' + response.userData.order_id + '" , we have also sent a mail to your mail ID.' + ' ');
                $('#ord-msg , #ModalTitle').addClass('color-dark-green').removeClass('color-red');
                $('#order').modal('show');
                $('#order-msg').hide();
            } else if (response.userData.payment_type == 'online') {
                $("#ORDER_ID").val(response.userData.order_id);
                $("#CUST_ID").val(response.userData.user_id);
                $("#TXN_AMOUNT").val(response.userData.price);
                document.sm.submit();
            }
        },
        'complete': function () {
            $("#loader,#otp,#otp-send-msg,#otp-verify-msg").hide();
            $('#after_otp,#checkOTP').prop('disabled', true);
            $('#otp-send-msg,#otp-verify-msg').removeClass('invalid-feedback valid-feedback');

        }
    });
}

function setUserBase() {
    var phoneInput = document.getElementById('phone');
    validateField(phoneInput);

    if (!phoneInput.classList.contains('is-valid')) {
        return;
    }

    // togglePhoneField(true);
    // toggleSendOtpProgressBar(true);
    var dataToSend = {
        "firstName": $('#fname').val(),
        "lastName": $('#lname').val(),
        "email": $('#email').val(),
        "phone": $('#phone').val(),
    };
    $.post({
        'url': "https://mojogamezone.com/development/riccha_dev/SlimMantra/setUserBase.php ",
        'data': JSON.stringify(dataToSend),
        'processData': false,
        'success': function (res, status) {
            var parse_data = JSON.parse(res);
            if (parse_data.status === true) {
                uniqueID = parse_data.userData.userId;
                // sendOTP(parse_data.userData.userId, $('#phone').val());
            } else {
                alert(parse_data.message);
                togglePhoneField(false);
                toggleSendOtpProgressBar(false);
            }
        },
        complete: function () {}
    })

}


/**
 * Disable or enable phone input field and send OTP button
 * @param {boolean} isDisable if true fields will be disabled else enable
 */
function togglePhoneField(isDisable) {
    $("#phone, #sendOTP").prop('disabled', isDisable);
}

/**
 * show or hide OTP send message
 * @param {boolean} isshow  if true fields will be message else invalid  message
 * @param {string} msg  msg set success or fail message.
 */
function toggleOtpSendMsg(isshow, msg) {
    if (isshow) {
        $("#otp-send-msg").html(msg);
        $('#otp-send-msg').addClass('valid-feedback').removeClass('invalid-feedback');
        $('#otp-send-msg').show();
    } else {
        $("#otp-send-msg").html(msg);
        $('#otp-send-msg').addClass('invalid-feedback').removeClass('valid-feedback');
        $('#otp-send-msg').show();
    }
}

/**
 * show or hide verify OTP message
 * @param {boolean} isshow  if true fields will be valid message else invalid message
 * @param {string} msg  msg set success or fail message.
 */
function toggleOtpVerifyMsg(isshow, msg) {
    if (isshow) {

        $("#otp-verify-msg").html(msg);
        $('#otp-verify-msg').addClass('valid-feedback').removeClass('invalid-feedback');
        $('#otp-verify-msg').show();
    } else {
        $("#otp-verify-msg").html(msg + " " + "please enter correct otp");
        $('#otp-verify-msg').addClass('invalid-feedback').removeClass('valid-feedback');
        $('#otp-verify-msg').show();
    }
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
            'url': 'https://mojogamezone.com/development/riccha_dev/SlimMantra/send_otp.php',
            'data': JSON.stringify(dataToSend),
            'processData': false,
            'success': function (res, status) {
                var parse_data = JSON.parse(res);
                if (parse_data.status === true) {
                    toggleOtpSendMsg(true, parse_data.message)
                    $('#otp').show();

                } else {
                    toggleOtpSendMsg(false, parse_data.message)
                }
            },
            'complete': function () {
                togglePhoneField(false);
                toggleSendOtpProgressBar(false);
            }
        })
    }

}

function checkOTP() {

    var otp = $('#otp').val();
    var length = otp.length;
    if (length == 4) {
        if (isTel(otp)) {
            var dataToSend = {
                "otp": otp,
                'id': uniqueID,
                'number': $("#phone").val()
            }
            toggleVerifyOtpProgressBar(true);
            $.post({
                'url': "https://mojogamezone.com/development/riccha_dev/SlimMantra/check_otp.php",
                'data': JSON.stringify(dataToSend),
                'processData': false,
                'success': function (res, status) {
                    var parse_data = JSON.parse(res);
                    if (parse_data.status == true) {
                        $('#after_otp').prop('disabled', false);
                        toggleOtpVerifyMsg(true, parse_data.message);
                        $('#otp').addClass('is-valid').removeClass('is-invalid');
                    } else {
                        toggleOtpVerifyMsg(false, parse_data.message);
                        $('#otp').addClass('is-invalid').removeClass('is-valid');
                    }
                },
                'complete': function () {
                    toggleVerifyOtpProgressBar(false);
                }
            })

        }
    }
}


function hitVnativeApi(ordedrId, price) {
    if (price) {
        price = (parseInt(price, 10) / 100) * 15;
    }
    // var url = 'https://mobpro.vnative.co/pixel?adid=5cb03404b6920d3de83be07b&txn_id=' + ordedrId + '&sale_amount=' + price;
    var href = new URL(window.location.href);

    var CLICK_ID = href.searchParams.get('cid');
    if (!CLICK_ID) {
        return;
    }
    var url = 'https://track.vnative.com/acquisition?click_id=' + CLICK_ID + '&security_token=1b7781812bd841125ccf&sale_amount=' + price + '&currency=INR';
    //var url = 'https://mobpro.vnative.co/pixel?adid=5cb03404b6920d3de83be07b&txn_id=' + ordedrId + '&sale_amount=' + price;
    $.get(url);
}

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