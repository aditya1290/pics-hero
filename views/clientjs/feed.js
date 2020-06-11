function likethis(element)
{
    var x = element.nextElementSibling.nextSibling.textContent
    
    const postid = element.nextElementSibling.textContent;
    
    if(element.className == "far fa-heart fa-lg")
    {
        $.ajax({
            type : 'POST',
            url : '/likeup',
            data : {postId : postid}
        }).done(function(res){
            console.log(res);
        });

        element.className = "fas fa-heart fa-lg";
        element.style.color = "red";
        element.nextElementSibling.nextSibling.textContent = parseInt(x)+1;
        
    }
    else
    {
        $.ajax({
            type : 'POST',
            url : '/likedown',
            data : {postId : postid}
        }).done(function(res){
            console.log(res);
        });

        element.nextElementSibling.nextSibling.textContent = parseInt(x)-1;
        element.className = "far fa-heart fa-lg";
        element.style.color = "black";
    }
}

function bookmarkthis(element)
{
    var y1 = element.nextElementSibling.textContent;
    alert(y1);
    if(element.className == "far fa-bookmark fa-lg")
    {
        $.ajax({
            type : 'POST',
            url : '/bookmark',
            data : {postId : y1}
        }).done(function(res){
            console.log(res);
        });
        element.className = "fas fa-bookmark fa-lg"
    }
    else
    {
        $.ajax({
            type : 'POST',
            url : '/bookmarkD',
            data : {postId : y1}
        }).done(function(res){
            console.log(res);
        });
        element.className = "far fa-bookmark fa-lg"
    }
}



//Modal images
var modal = document.getElementById("myModal");

var modalImg = document.getElementById("img01");
var close1 = document.getElementById("close");

function bigImage(element)
{
    
    modalImg.src = element.src;
    console.log(element.src);
    modal.style.display = "block";
}


close1.addEventListener('click',function(){
    modal.style.display = "none";
});



const copyToClipBoard = (str) =>
{
    const el = document.createElement('textarea');
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
};

function funcShare(element)
{
    var copyText= element.nextElementSibling.innerText;
    copyToClipBoard(copyText);
    console.log('1234');
    var zas = element.nextElementSibling.nextElementSibling;
    console.log(zas.innerText);
    zas.style.display = "block";
    setTimeout(()=>{
        zas.style.display = "none";
    },1000);
}