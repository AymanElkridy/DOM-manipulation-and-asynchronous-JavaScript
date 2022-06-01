/* ##################################################### */
/* O-------------<({[    FUNCTIONS    ]})>-------------O */
/* ##################################################### */

// To activate the current section in the view port -and their corrosponding nav item-

const activateSection = () => {
    let midHeight = window.innerHeight / 2;
    SECTIONS.forEach(section => {
        let rect = section.getBoundingClientRect();
        if (rect.top <= midHeight && rect.bottom > midHeight) {
            section.classList.add('active');
            document.getElementById('to__' + section.id).classList.add('active');
        } else {
            section.classList.remove('active');
            document.getElementById('to__' + section.id).classList.remove('active');
        }
    });
};

// Helper function to hide the navigation menu (in responsive mode)

const hideMenu = () => {
    NAV_BAR_LIST.classList.remove('show');
    document.removeEventListener('click', hideMenu);
};

// To show or hide the navigation menu (in responsive mode)

const showHideMenu = () => {
    if (NAV_BAR_LIST.classList.contains('show')) {
        hideMenu;
    } else {
        NAV_BAR_LIST.classList.add('show');
        setTimeout(() => {document.addEventListener('click', hideMenu)});
    }
};

/* ##################################################### */
/* O-----------<({[    IMPLEMENTATION    ]})>----------O */
/* ##################################################### */

// Build navigation menu 

const NAV_BAR_LIST = document.getElementById('navbar__list');
const SECTIONS = document.querySelectorAll('section');
SECTIONS.forEach(section => {
    let curLink = document.createElement('a');
    curLink.setAttribute('href', '#' + section.getAttribute('id'));
    curLink.className = 'menu__link';
    curLink.id =  'to__' + section.getAttribute('id');
    curLink.textContent = section.getAttribute('data-nav');
    let curItem = document.createElement('li');
    curItem.appendChild(curLink);
    NAV_BAR_LIST.append(curItem);
});

// Scroll to section on link click

const LINKS = document.querySelectorAll('.menu__link')
LINKS.forEach(link => {
    link.addEventListener('click', (e) => {
        document.querySelector(link.getAttribute('href')).scrollIntoView({behavior: 'smooth'});
        e.preventDefault();
    });
});

// Set viewed SECTIONS as active -and their corrosponding nav item-

window.addEventListener('load', activateSection);
window.addEventListener('scroll', activateSection);
window.addEventListener('resize', activateSection);

// Show and hide responsive navigation menu on click

const NAV_MENU_ICON = document.getElementById('navmenu__icon');
NAV_MENU_ICON.addEventListener('click', showHideMenu);