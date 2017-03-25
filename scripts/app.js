var xhr = new XMLHttpRequest();


xhr.open('GET', "//ipinfo.io/json", true);
xhr.send();
 
xhr.onreadystatechange = processRequest;
 
function processRequest(e) {
    console.log('request processed');
 
}