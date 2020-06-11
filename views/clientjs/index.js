var logintoggle = document.getElementById('logintoggle');
var lform1 = document.getElementById('lform1');
var rform1 = document.getElementById('rform1');
var registertoggle = document.getElementById('registertoggle');

var RUsername = document.getElementById('RUsername');
var LEmail = document.getElementById('LEmail');
var REmail = document.getElementById('REmail');
var LPass = document.getElementById('LPassword');
var RPass = document.getElementById('RPassword');
var RSubmit = document.getElementById('RSubmit');
var LSubmit = document.getElementById('LSubmit');

var r1 = document.getElementById('r1');
var r2 = document.getElementById('r2');
var r3 = document.getElementById('r3');
var l1 = document.getElementById('l1');
var l2 = document.getElementById('l2');
var LPassToggle = document.getElementById('LShowPass');
var RPassToggle = document.getElementById('RShowPass');


var a1=false,a2=false,a3=false,b1=false,b2=false;

//OnLoad 
RSubmitfunc();
LSubmitfunc();



function logintogglefunc(){
    console.log("rform collapsing");
    rform1.style.display='none';
    lform1.style.width='100%';
    lform1.style.display='block';
}

function registertogglefunc(){
    console.log("lform collapsing");
    lform1.style.display = 'none';
    rform1.style.width='100%';
    rform1.style.display = 'block';
}

logintoggle.addEventListener('click',logintogglefunc);
registertoggle.addEventListener('click',registertogglefunc);

function RSubmitfunc(){
    if(a1 && a2 && a3)
    {
        RSubmit.style.cursor = 'pointer';
        RSubmit.style.opacity = '1'
        RSubmit.disabled = false;
    }
    else
    {   
        RSubmit.style.cursor = 'not-allowed';
        RSubmit.style.opacity = '0.5'
        RSubmit.disabled = true;
    }
}

function LSubmitfunc(){
    if(b1 && b2)
    {
        LSubmit.style.cursor = 'pointer';
        LSubmit.style.opacity = '1'
        LSubmit.disabled = false;
    }
    else
    {
        LSubmit.style.cursor = 'not-allowed';
        LSubmit.style.opacity = '0.5'
        LSubmit.disabled = true;
    }
}

function ValidateEmail(mail) 
{
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
        return (true)
    else
        return (false)
}

function ValidateName(y)
{
    if(/^[a-zA-Z0-9\_]+$/.test(y))
        return true;
    else
        return false;
}

function ValidatePass(y)
{
    
}

function RmyFunction()
{
    var x = RPass.value;
    
    r3.style.visibility = 'visible'
    if(x.length < 8)
    {
        r3.className = 'fa fa-close fa-lg';
        r3.style.color = 'red';
        a3 = false;
        RSubmitfunc();
    }
    else
    {
        r3.className = "fa fa-check fa-lg";
        r3.style.color = 'green';
        a3 = true;
        RSubmitfunc();
    }
}

function LmyFunction()
{
    var x = LPass.value;
    l2.style.visibility = 'visible'
    if(x.length<8)
    {
        l2.className = 'fa fa-close fa-lg';
        l2.style.color = 'red';
        b2 = false;
        LSubmitfunc();
    }
    else
    {
        l2.className = 'fa fa-check fa-lg';
        l2.style.color = 'green';
        b2 = true;
        LSubmitfunc();
    }
}

function LEmailfunc(){
    var x = LEmail.value;
    l1.style.visibility = 'visible';
    if(ValidateEmail(x))
    {
        l1.style.color = 'green';
        l1.className = 'fa fa-check fa-lg'
        b1 = true;
        LSubmitfunc();
    }
    else
    {
        l1.style.color = 'red';
        l1.className = 'fa fa-close fa-lg'
        b1 = false;
        LSubmitfunc();
    }
}

function REmailfunc(){
    var x = REmail.value;
    r2.style.visibility = 'visible';
    if(ValidateEmail(x))
    {
        r2.style.color = 'green';
        r2.className = 'fa fa-check fa-lg'
        a2 = true;
        RSubmitfunc();
    }
    else
    {
        r2.style.color = 'red';
        r2.className = 'fa fa-close fa-lg'
        a2 = false;
        RSubmitfunc();
    }
}

function RUsernamefunc()
{
    var x = RUsername.value;
    r1.style.visibility = 'visible';

    if(!ValidateName(x))
    {
        r1.style.color = 'red';
        r1.className = 'fa fa-close fa-lg';
        a1 = false;
        RSubmitfunc();
    }
    else
    {
        r1.style.visibility = 'hidden';
        a1 = true;
        RSubmitfunc();
    }
}

function RTogglePassword()
{
    if(RPass.type ==='password')
    {
        RPass.type = 'text';
    }
    else
    {
        RPass.type = 'password';
    }
}
function LTogglePassword()
{
    if(LPass.type==='password')
    {
        LPass.type = 'text';
    }
    else
        LPass.type = 'password';
}





RPass.onkeyup = RmyFunction;
LPass.onkeyup = LmyFunction;
LEmail.onkeyup = LEmailfunc;
REmail.onkeyup = REmailfunc;
RUsername.onkeyup = RUsernamefunc;



function Rform1R()
{
    REmail.value = REmail.value.toLowerCase();
    return true;
}
function Lform1L()
{
    LEmail.value = LEmail.value.toLowerCase();
}

