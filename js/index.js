$(document).ready(function (){

    $("#main,#signup,#stop").hide();

    const recognition = new webkitSpeechRecognition(); // Create a SpeechRecognition object
    function play(tone){
        const audioname=new Audio(tone);
        audioname.play();
    }

    $("#mic").click(function (){
        $("#mic").hide();
        $("#stop").show();
        $("#stop").addClass("animate__animated animate__heartBeat")
        play("tone.wav")
        recognition.start();
        $("#input").text("Listening...");
    })

    $("#stop").click(function (){
        $("#stop").hide();
        $("#mic").fadeIn();
        $("#mic").addClass("animate__animated animate__heartBeat")
        speechSynthesis.cancel();
        recognition.abort()
        play("stop.mp3")
        $("#input,#output").text("");
    })
    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        const text=transcript.toLowerCase();
        $("#input").text(transcript);
        // Call your existing hey_spidey() function with the recognized command
        execute(text);
    };

    recognition.onend = function() {
        $("#mic").removeClass("animate__animated animate__heartBeat")
        recognition.stop();
    };

    checkScreenResolution()
})

function talk(text){
    const utterance = new SpeechSynthesisUtterance(); //Text to speech Object
    utterance.text = text;
    // Optional: Set properties like voice, rate, pitch, etc.
    utterance.voice = speechSynthesis.getVoices()[1]; // Get the first available voice
    utterance.rate = 1;  // Speed of speech
    utterance.pitch = 1; // Pitch of speech
    speechSynthesis.speak(utterance);
}
// Define the logins object outside the event handlers
const logins = {
    "an01": ["Harsha"],
    "an02": ["Sandeep"]
};

$("#create").click(function () {
    let newname = $("#newname").val();
    let newdigit1 = $("#newdigit1").val();
    let newdigit2 = $("#newdigit2").val();
    let newdigit3 = $("#newdigit3").val();
    let newdigit4 = $("#newdigit4").val();
    let newpass=newdigit1+newdigit2+newdigit3+newdigit4;
    if(newname!==""&&newpass!=="")
    {
        if(newpass in logins){
             talk("PassCode is already taken!Enter another Passcode")
        }
        else{
            talk("Profile Created successfully!")
            logins[newpass] = [newname];
            $("#passcode").val("");
            $("#main, #signup").hide();
            $("#login").fadeIn();
        }
    }
    else
    {
        talk("Please Fill the fields")
    }
});

$("#li").click(function () {
    $("#digit1,#digit2,#digit3,#digit4").removeClass("border-danger animate__animated animate__headShake");
    let digit1 = $("#digit1").val();
    let digit2 = $("#digit2").val();
    let digit3 = $("#digit3").val();
    let digit4 = $("#digit4").val();
    if (digit1!==""&&digit2!==""&&digit3!==""&&digit4!=="") {
        let pass = digit1+digit2+digit3+digit4
        if (pass in logins) {
            const name = logins[pass][0];
            $("#main").fadeIn();
            $("#shell").addClass("shadow-2");
            $("#shell").removeClass("shadow-1");
            $("#login").hide();
            talk("Welcome!" + name);
            $("#username").text("Hey, " + name);
            return name;
        } else {
            $("#digit1,#digit2,#digit3,#digit4").addClass("border-danger animate__animated animate__headShake");
            talk("User Not found");
        }
    }
    else{
        $("#digit1,#digit2,#digit3,#digit4").addClass("border-danger animate__animated animate__headShake");
        talk("Please Enter Passcode")
    }
});
$("#logout,#reload").click(function (){
    $("#digit1,#digit2,#digit3,#digit4").val("")
    $("#main,#signup").hide();
    $("#login").fadeIn();
})

$("#su").click(function (){
    $("#main,#login").hide();
    $("#signup").fadeIn();
})

function checkScreenResolution() {
    var screenWidth = window.innerWidth;
    var screenHeight = window.innerHeight;

    if (screenWidth < 600 || screenHeight < 600) {
        var elementToRemove = document.getElementById("navicon");
        if (elementToRemove) {
            elementToRemove.parentNode.removeChild(elementToRemove);
        }
    }
}
const digitInputs = document.querySelectorAll('.digit-input');

digitInputs.forEach((input, index) => {
    input.addEventListener('input', () => {
        if (input.value.length === 1) {
            if (index < digitInputs.length - 1) {
                digitInputs[index + 1].focus();
            }
        }
        else{
            digitInputs[index - 1].focus();
        }
    });
});




