var editBioText = document.getElementById('EditBio');
var editBioButton = document.getElementById('EditButtonBio');

function EditBioFunction()
{
    var z = editBioText.innerText;
    var y = editBioButton.innerText;
    if(y == "Edit")
    {
        editBioText.contentEditable = true;
        editBioText.className = "EditBio edit";
        editBioText.focus();
        editBioButton.className = "OnceClicked";
        editBioButton.innerText = "Save";
    }
    else
    {   
        $.ajax({
            type:'POST',
            url: '/profile/editBio',
            data: {bio : z}
        }).done(function(res){
            console.log(res);
        });

        editBioText.contentEditable = false;
        editBioText.className = "EditBio";
        editBioButton.innerText = "Edit  ";
        editBioText.blur();
        editBioButton.className = "ClickMe";
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


var follow = document.getElementById("followMe")

function follwFunc()
{
    var person = document.getElementById("PUsername").innerText;
    console.log(person);
    if(follow.className == "followed")
    {
        //Already followed
        $.ajax({
            url : "/profile/followDown",
            type : "POST",
            data : {person : person}
        }).done(function(data){
            console.log(data);
            console.log("followed Down")
            follow.className = "follow";
            follow.innerText = "Follow"
        });
    }
    else
    {
        $.ajax({
            url : "/profile/follow",
            type : "POST",
            data : {person : person}
        }).done(function(data){
            console.log(data);
            console.log("followed");
            follow.className = "followed";
            follow.innerText = "Followed"
        });
    }
}