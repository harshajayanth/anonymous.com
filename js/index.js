$(document).ready(function (){

    $("#main,#signup").hide();

    const recognition = new webkitSpeechRecognition(); // Create a SpeechRecognition object
    const audioname=new Audio("tone.wav");

    $("#mic").click(function (){
        $(this).addClass("animate__animated animate__heartBeat")
        audioname.play();
        recognition.start();
        $("#input").text("Listening...");
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
    utterance.voice = speechSynthesis.getVoices()[0]; // Get the first available voice
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
    let newpass = $("#newpass").val();

    // Add the new login to the logins object
    logins[newpass] = [newname];

    $("#passcode").val("");
    $("#main, #signup").hide();
    $("#login").fadeIn();
});

$("#passcode").keypress(function (event) {
    $(this).removeClass("animate__animated animate__headShake");
    if (event.which === 13) {
        let pass = $("#passcode").val();
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
            $("#passcode").addClass("border-danger animate__animated animate__headShake");
            talk("User Not found");
        }
    }
});

$("#logout").click(function (){
    $("#passcode").val("")
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