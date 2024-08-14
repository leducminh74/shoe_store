
window.onload = function () {
  let menu = document.querySelector('#menu-bars');
  let navbar = document.querySelector('.navbar');

  menu.onclick = () =>{
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
  }
  window.onscroll = () =>{

    menu.classList.remove('fa-times');
    navbar.classList.remove('active');

  }

  function loader(){
    document.querySelector('.loader-container').classList.add('fade-out');
  }

  function fadeOut(){
    setInterval(loader, 3000);
  }

  window.onload = fadeOut;


// Just for testing, show all items
  $('a.btn.continue').click(function(){
    $('li.items').show(400);
  })


  $('.mdb-select').materialSelect();

}


