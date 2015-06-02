/*
The standard way to detect the cordova API in a cordova based application is to listen 
for the "deviceready" event.
Is this specific to the Intel XDK?
*/
function onAppReady() {
    if( navigator.splashscreen && navigator.splashscreen.hide ) {   // Cordova API detected
        navigator.splashscreen.hide() ;
    }
}
document.addEventListener("app.Ready", onAppReady, false) ;
