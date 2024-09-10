document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const sideNav = document.getElementById('side-nav');
    const mainContent = document.getElementById('main-content');

    hamburger.addEventListener('click', () => {
        if (sideNav.style.width === '0px' || sideNav.style.width === '') {
            sideNav.style.width = '250px'; // Adjust the width as needed
            mainContent.style.marginLeft = '250px'; // Adjust margin as needed
        } else {
            sideNav.style.width = '0';
            mainContent.style.marginLeft = '0';
        }
    });
});
