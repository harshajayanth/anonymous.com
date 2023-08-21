$(document).ready(function () {

    $("#main,#stop,#waveanimate").hide();
    const history=[]

    const recognition = new webkitSpeechRecognition(); // Create a SpeechRecognition object
    function play(tone) {
        const audioname = new Audio(tone);
        audioname.play();
    }

    $("#mic").click(function () {
        $("#mic").hide();
        $("#stop").show();
        $("#stop").addClass("animate__animated animate__heartBeat")
        play("tone.wav")
        recognition.start();
        $("#output").text("");
        $("#waveanimate").fadeIn();
        $("#input").text("Listening...");
            setTimeout(() => {
                if ($("#input").text()=== "Listening...")
                    Timeout();
            }, 7000)
    })

    function Timeout() {
        $("#waveanimate").hide();
        $("#output").text("Command...");
        $("#input").text("");
        talk("command")
        $("#stop").hide();
        $("#mic").fadeIn();
    }

    $("#stop").click(function () {
        $("#stop").hide();
        $("#mic").fadeIn();
        $("#mic").addClass("animate__animated animate__pulse")
        speechSynthesis.cancel();
        recognition.stop()
        $("#waveanimate").hide();
        play("stop.mp3")
        $("#input,#output").text("");
    })
    recognition.onresult = function (event) {
        const transcript = event.results[0][0].transcript;
        const text = transcript.toLowerCase();
        $("#input").text(transcript);
        let time=new Date()
        let object={search:transcript,timestamp:time.getHours()+" : "+time.getMinutes()}
        history.push(object);
        execute(text);
    };

    recognition.onend = function () {
        $("#mic").removeClass("animate__animated animate__heartBeat")
        recognition.stop();
    };

    checkScreenResolution()

    //History
    function historycall(clear){
        if(history.length!==0) {
            let output = ""
            for (let i = 0; i < history.length; i++) {
                        output += "<div class='container row'><h5 class='text-dark col-9 font-weight-bold'>" + history[i].search+ "</h5>"+
                            "<p class='text-primary col-3 justify-content-end align-items-end'>"+history[i].timestamp+"</p></div><hr>"
            }
            $("#historybody").html(output)
        }
        else {
            $("#historybody").html("<h3 class='text-secondary text-center'>No History</h3>")
        }
    }

    $("#seehistory").click(function (){
        historycall(history);
    })
    $("#clearhistory").click(function (){
        let confirmed=confirm("Clear History Data?")
        if(confirmed){
            history.length=0
            historycall(history)
        }
    })

})

function talk(text) {
    const utterance = new SpeechSynthesisUtterance(); //Text to speech Object
    utterance.text = text;
    // Optional: Set properties like voice, rate, pitch, etc.
    utterance.voice = speechSynthesis.getVoices()[1]; // Get the first available voice
    utterance.rate = 1;  // Speed of speech
    utterance.pitch = 1; // Pitch of speech
    speechSynthesis.speak(utterance);
    $("#waveanimate").hide();

    utterance.onend = function () {
        $("#stop").hide();
        $("#mic").fadeIn();
    };
}

// Define the logins object outside the event handlers
const logins = {
    "an01": ["Harsha"],
    "an02": ["Sandeep"]
};

$("#li").click(function () {
    $("#name").removeClass("border-danger animate__animated animate__headShake");
    let name = $("#name").val();
    if (name !== "") {
            $("#main").fadeIn();
            $("#shell").addClass("shadow-2");
            $("#shell").removeClass("shadow-1");
            $("#login").hide();
            talk("Welcome!" + name+"!Command me!I am at your service");
            $("#username").text("Hey, " + name);
            $("#output").text("Welcome " + name);
    } else {
        $("#name").addClass("border-danger animate__animated animate__headShake");
        $("#name").val("");
        talk("Please Enter Your name")
    }
});
$("#logout,#reload").click(function () {
    $("#name").val("")
    $("#main").hide();
    $("#login").fadeIn();
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





