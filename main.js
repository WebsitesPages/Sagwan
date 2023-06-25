  //Loading Screen
  function removePreloader() {
    const preloader = document.getElementById('preloader');
  
    setTimeout(() => {
      preloader.style.transition = 'opacity 0.5s';
      preloader.style.opacity = '0';
    }, 500);
  
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 1000);
  }
  window.addEventListener('load', removePreloader);


  
// Funktion zum Registrieren der Event-Listener für einen bestimmten Header
function registerHeaderEventListeners(header) {
    const menuIcon = header.querySelector('.menu-icon');
    const menu = header.querySelector('.menu');
    const closeIcon = header.querySelector('.close-icon');
    const menuItems = header.querySelectorAll('.menu li a');

    menuIcon.addEventListener('click', () => {
        menuIcon.classList.toggle('active');
        menu.classList.toggle('active');
    });

    closeIcon.addEventListener('click', () => {
        menuIcon.classList.remove('active');
        menu.classList.remove('active');
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && menu.classList.contains('active')) {
            menuIcon.classList.remove('active');
            menu.classList.remove('active');
        }
    });

    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            menuIcon.classList.remove('active');
            menu.classList.remove('active');
        });
    });

    // Smooth scrolling für Anker-Links
    header.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            let target = document.querySelector(this.getAttribute('href'));
            if (target) {
                let headerHeight = header.offsetHeight;
                let targetPosition = target.getBoundingClientRect().top + window.pageYOffset;

                window.scrollTo({
                    top: targetPosition - headerHeight - parseInt(getComputedStyle(target).marginTop),
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Header visibility
window.addEventListener('DOMContentLoaded', (event) => {
    const originalHeader = document.getElementById('myHeader');
    let clonedHeader = originalHeader.cloneNode(true);
    clonedHeader.id = 'stickyHeader';
    clonedHeader.classList.add('sticky');
    document.body.appendChild(clonedHeader);

    // Registrieren Sie die Event-Listener für beide Header
    registerHeaderEventListeners(originalHeader);
    registerHeaderEventListeners(clonedHeader);
});

// Aktualisieren Sie Ihren Scroll-Event-Listener, um den neuen Header anzuzeigen/zu verbergen
window.addEventListener('scroll', function () {
    let stickyHeader = document.getElementById('stickyHeader');
    let menuIcon = stickyHeader.querySelector('.menu-icon');
    
    if (window.pageYOffset > 100) {
        stickyHeader.style.visibility = "visible";
        stickyHeader.style.opacity = "1";
        menuIcon.classList.add('menu-icon-raised');  // Hinzufügen der Klasse
    } 
    else {
        stickyHeader.style.visibility = "hidden";
        stickyHeader.style.opacity = "0";
        menuIcon.classList.remove('menu-icon-raised');  // Entfernen der Klasse
    }
});

window.onload = function() {
    // Warten Sie eine Sekunde und fügen Sie dann die .fade-in Klasse hinzu, um den Container einzublenden
    setTimeout(function() {
        document.querySelector('.container').classList.add('fade-in');
    }, 800);

    // Warten Sie 2 Sekunden und fügen Sie dann die .fade-in Klasse hinzu, um den Header einzublenden
    setTimeout(function() {
        document.querySelector('header').classList.add('fade-in');
    }, 1500);
}


// Zäher für Box
let duration = 2000;  // Dauer der Zählung in Millisekunden

// Erzeuge einen neuen Intersection Observer
let observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {  // Wenn das Element sichtbar ist
            let numberElement = entry.target;
            let boxElement = numberElement.closest('.box'); // Finde das nächste Elternelement mit der Klasse 'box'
            boxElement.style.opacity = '1'; // Ändere die Opazität auf 1, um die Box sichtbar zu machen
            let targetNumber = Number(numberElement.getAttribute('data-target'));  // Hole die Zielnummer aus dem data-target Attribut
            let increment = targetNumber / (duration / 10);  // Increment pro 10 ms
            let counter = 0;
            let counterInterval = setInterval(() => {
                if (counter >= targetNumber) {
                    clearInterval(counterInterval);
                    numberElement.innerText = targetNumber + ' +';  // Hinzufügen des "+"-Zeichens
                } else {
                    counter += increment;
                    numberElement.innerText = Math.floor(counter) + ' +';  // Hinzufügen des "+"-Zeichens während der Zählung
                }
            }, 10);  // Aktualisierung alle 10 Millisekunden
            observer.unobserve(numberElement);  // Beende die Beobachtung für dieses Element
        }
    });
}, { threshold: 0.1 });  // Starte, wenn mindestens 10% des Elements sichtbar sind

// Beginne die Beobachtung für alle Elemente mit der Klasse 'number'
let numberElements = document.querySelectorAll('.number');
numberElements.forEach((numberElement) => {
    observer.observe(numberElement);
});
