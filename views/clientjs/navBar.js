// Navbar Hide show on scrolling
var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
      document.getElementById("navBarMain").style.top = "0";
    } else {
      document.getElementById("navBarMain").style.top = "-50px";
    }
    prevScrollpos = currentScrollPos;
}
//loading button
var load1 = document.getElementById("load1");

// Search box code 


var navSearch = document.getElementById('navSearch');
function closeAllLists(elmnt) {
  var x = document.getElementsByClassName("autocomplete-items");
  for (var i = 0; i < x.length; i++) {
    if (elmnt != x[i] && elmnt != navSearch) {
      x[i].parentNode.removeChild(x[i]);
    }
  }
}

function addActive(x) {
  
  if (!x) return false;
  
  removeActive(x);
  if (currentFocus >= x.length) currentFocus = 0;
  if (currentFocus < 0) currentFocus = (x.length - 1);
  
  x[currentFocus].classList.add("autocomplete-active");
}
function removeActive(x) {
  /*a function to remove the "active" class from all autocomplete items:*/
  for (var i = 0; i < x.length; i++) {
    x[i].classList.remove("autocomplete-active");
  }
}

navSearch.addEventListener("keydown", function(e) {
  var x = document.getElementById(this.id + "autocomplete-list");
  if (x) x = x.getElementsByTagName("div");
  if (e.keyCode == 40) {
    currentFocus++;
    addActive(x);
  } else if (e.keyCode == 38) { 
    currentFocus--;
    addActive(x);
  } else if (e.keyCode == 13) {
    e.preventDefault();
    if (currentFocus > -1) {
      if (x) x[currentFocus].click();
    }
  }
});

document.addEventListener("click", function (e) {
    closeAllLists(e.target);
});


function navSearchbar(element){
  var a, b, i, val = element.value;
  if (!val) {
      closeAllLists();
    return false;
    }
      currentFocus = -1;
      closeAllLists();
       a = document.createElement("DIV");
       a.setAttribute("id", element.id + "autocomplete-list");
       a.setAttribute("class", "autocomplete-items");
       element.parentNode.appendChild(a);

  $.ajax({
    method: "POST",
    url: "/search/" +val,
    data : {}
  }).done(function(data){
    console.log(data);
    for(i=0;i<data.data.length;i++)
    {
      var z = document.createElement("a");
      b = document.createElement("div");
      b.innerHTML = data.data[i].Username;
      z.href = "/profile/"+data.data[i].Username;
      z.appendChild(b);
      a.appendChild(z);
    }
  });
    console.log("welcome back");
}

