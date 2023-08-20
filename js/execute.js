
function execute(command) {
    if(command.includes('play')){
        const song = command.replace('play', '');
        talk('Playing ' + song);
        url="https://www.youtube.com/results?search_query="+song;
        window.open(url)
    }
    else if(command.includes('who are you')){
        talk('I am Anonymous. Your Voice assistant');
        $("#output").text("I am Anonymous.")
    }
    else if(command.includes('my name'||'what is my name')){
        const username=$("#username").text();
        const name=username.replace("Hey,","").trim();
        talk(name)
        $("#output").html(name)
    }
    else if(command.includes('time')){
        const time=new Date();
        let hours=time.getHours();
        let minutes=time.getMinutes();
        if(hours>=12){
            const currenttime='Current time is : '+(hours-12)+':'+minutes+'PM';
            talk(currenttime);
            $("#output").text(currenttime)
        }
        else {
            const currenttime='Current time is : '+(hours+12)+':'+minutes+'AM';
            talk(currenttime);
            $("#output").text(currenttime)
        }
    }
    else if(command.includes(command.includes("spotify") || command.includes("twitter") || command.includes("google")||command.includes("youtube")||command.includes("whatsapp"))||command.includes("instagram")){
        const urlinput = command.replace('open', '').trim();
        url="https://"+urlinput+".com";
        talk('Opening'+urlinput)
        window.open(url)
    }
    else if(command.includes("my blog")){
        url="https://harshajayanth.github.io/MyResume.in/"
        talk('Opening Your Blog')
        window.open(url)
    }
    else if(command.includes("logout"||"log out")){
        talk('Logging Out!Bye!')
        location.reload()
    }
    else if(command.includes("open")){
        const urlinput=command.replace(/open|\.+/g,'').trim();
        url="https://"+urlinput+".com"
        talk("Opening"+urlinput)
        window.open(url)
    }
    else if(command.includes("what") || command.includes("who")||command.includes("search") || command.includes("how"))
    {
        const wikipediaApiUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&list=search&srsearch=${encodeURIComponent(command)}`;

        $.ajax({
            url: wikipediaApiUrl,
            method: "GET",
            dataType: "json",
            success: function (data) {
                const searchResults = data.query.search;
                let resultHtml = "";

                    const result = searchResults[1];
                    resultHtml += result.snippet;
                const cleanedContent = resultHtml.replace(/<\/?span[^>]*>/g, '');
                const lines = cleanedContent.split('\n');
                const firstFiveLines = lines.slice(0,5).join('\n');
                $("#output").html(firstFiveLines);
                talk(firstFiveLines);
            },
            error: function (error) {
                talk("Error fetching Wikipedia content:");
            }
        })
    }
    else{
        $("#output").text("Speak something!")
        talk("Sorry!I am unavailable to this service");
    }
}