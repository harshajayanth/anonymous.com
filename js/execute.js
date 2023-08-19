function execute(command) {

    if(command.includes('play')){
        const song = command.replace('play', '');
        talk('Playing ' + song);
        url="https://www.youtube.com/results?search_query="+song;
        window.open(url)
    }
    else if(command.includes('youtube')){
        url="https://www.youtube.com";
        talk('Opening ' + command);
        window.open(url)
    }
    else if(command.includes('who are you')){
        talk('I am Anonymous. Your Voice assistant');
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
    else if(command.includes("spotify")){
        url="https://spotify.com"
        talk('Opening spotify')
        window.open(url)
    }
    else if(command.includes("my blog")){
        url="https://harshajayanth.github.io/MyResume.in/"
        talk('Opening Your Blog')
        window.open(url)
    }
    else if(command.includes("logout")){
        talk('Logging Out!Bye!')
        location.reload()
    }
}