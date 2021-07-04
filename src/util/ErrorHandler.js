const handleApiError = function(error){
    const errorMessage = error.message
    var x = document.getElementById("error-toast");
    x.innerHTML = errorMessage;
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}

export default handleApiError;