/*global Resepmoe _config AmazonCognitoIdentity AWSCognito*/

var Resepmoe = window.Resepmoe || {};

(function scopeWrapper($) {
    var signinUrl = 'signin.html';

    var poolData = {
        UserPoolId: _config.cognito.userPoolId,
        ClientId: _config.cognito.userPoolClientId
    };

    var userPool;

    if (!(_config.cognito.userPoolId &&
          _config.cognito.userPoolClientId &&
          _config.cognito.region)) {
        $('#noCognitoMessage').show();
        return;
    }

    userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

    if (typeof AWSCognito !== 'undefined') {
        AWSCognito.config.region = _config.cognito.region;
    }

    Resepmoe.signOut = function signOut() {
        userPool.getCurrentUser().signOut();
    };

    Resepmoe.authToken = new Promise(function fetchCurrentAuthToken(resolve, reject) {
        var cognitoUser = userPool.getCurrentUser();

        if (cognitoUser) {
            cognitoUser.getSession(function sessionCallback(err, session) {
                if (err) {
                    reject(err);
                } else if (!session.isValid()) {
                    resolve(null);
                } else {
                    resolve(session.getIdToken().getJwtToken());
                }
            });
        } else {
            resolve(null);
        }
    });


    /*
     * Cognito User Pool functions
     */

    function register(email, password, onSuccess, onFailure) {
        var dataEmail = {
            Name: 'email',
            Value: email,
        };
        var dataPersonalName = {
            Name : 'name', 
            Value : nama, //get from form field
        };
        var dataGender = {
          Name : 'gender', 
          Value : gender, //get from form field
        };

            var dataPhoneNumber = {
          Name : 'nomortelepon', 
          Value : phone_number, //get from form field
        };
        var dataPersonalName = {
            Name : 'username', 
            Value : username, //get from form field
        };

        var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);
        var attributePersonalName = new AmazonCognitoIdentity.CognitoUserAttribute(dataPersonalName);
        var attributeGender = new AmazonCognitoIdentity.CognitoUserAttribute(dataGender);
        var attributePhoneNumber = new AmazonCognitoIdentity.CognitoUserAttribute(dataPhoneNumber);
        var attributeUsername = new AmazonCognitoIdentity.CognitoUserAttribute(dataUsername);

        attributeList.push(attributeUsername); 
        attributeList.push(attributeEmail);
        attributeList.push(attributePersonalName);
        attributeList.push(attributeGender);
        attributeList.push(attributePhoneNumber);
        

        userPool.signUp(email, password, attributeList, null,
            function signUpCallback(err, result) {
                if (!err) {
                    onSuccess(result);
                } else {
                    onFailure(err);
                }
            }
        );
    }

    function signin(email, password, onSuccess, onFailure) {
        var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
            Username: email,
            Password: password
        });

        var cognitoUser = createCognitoUser(email);
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: onSuccess,
            onFailure: onFailure
        });
    }

    function verify(email, code, onSuccess, onFailure) {
        createCognitoUser(email).confirmRegistration(code, true, function confirmCallback(err, result) {
            if (!err) {
                onSuccess(result);
            } else {
                onFailure(err);
            }
        });
    }

    function createCognitoUser(email) {
        return new AmazonCognitoIdentity.CognitoUser({
            Username: email,
            Pool: userPool
        });
    }

    /*
     *  Event Handlers
     */

    $(function onDocReady() {
        $('#signinForm').submit(handleSignin);
        $('#registrationForm').submit(handleRegister);
        $('#verifyForm').submit(handleVerify);
    });

    function handleSignin(event) {
        var username = $('#usernameInputSignin').val();
        var password = $('#passwordInputSignin').val();
        event.preventDefault();
        signin(username, password,
            function signinSuccess(result) {
                //console.log('Successfully Logged In');
                alert('Success');
                //window.location.href = '../member/halamanutama.html';
            },
            function signinError(err) {
                alert('GAGAL');
            }
        );
    }

    function handleRegister(event) {

        var username = document.getElementById("uname").value;  
        var password =  document.getElementById("password").value;
        var nama =  document.getElementById("nama").value;      
        var gender =  document.getElementById("jenis_kelamin").value;
        var phone_number = document.getElementById("nomortelepon").value;
        var email = document.getElementById("email").value;

        var onSuccess = function registerSuccess(result) {
            var cognitoUser = result.user;
            console.log('user name is ' + cognitoUser.getUsername());
            var confirmation = ('Registration successful. Please check your email inbox or spam folder for your verification code.');
            if (confirmation) {
                window.location.href = 'http://resepmoe.s3-website.us-east-2.amazonaws.com/views/layout/login.html';
            }
        };
        var onFailure = function registerFailure(err) {
            alert(err);
        };
        event.preventDefault();

    }

    function handleVerify(event) {
        var email = $('#emailInputVerify').val();
        var code = $('#codeInputVerify').val();
        event.preventDefault();
        verify(email, code,
            function verifySuccess(result) {
                console.log('call result: ' + result);
                console.log('Successfully verified');
                alert('Verification successful. You will now be redirected to the login page.');
                window.location.href = signinUrl;
            },
            function verifyError(err) {
                alert(err);
            }
        );
    }
}(jQuery));
