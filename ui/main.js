
var submit=document.getElementById('submit_btn');
submit.onclick = function() {
    
    var request=new XMLHttpRequest();
    
    request.onreadystatechange=function(){
        if(request.readystate===XMLHttpRequest.DONE) {
            if(request.status === 200){
                console.log('user logged in');
  alert('Logged in successfully');
            }else if(request.status===403) {
                alert('Username/password is incorrect');
            }
            else if(request.status===500){
                alert('Something went wrong on the server');
            }
            }
    };
    
    var username=document.getElementById('Username').value;
var password=document.getElementById('password').value;
console.log(username);
console.log(password);
   request.open('POST','http://jhansinambala.imad.hasura-app.io/login',true);
   request.send(JSON.stringify({username: username,password: password}));
   
};



