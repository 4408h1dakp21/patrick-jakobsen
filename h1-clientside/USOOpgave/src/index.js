document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('nav');
    const burger = document.querySelector('.burger');
    const menu = document.querySelector('nav ul');

    burger.addEventListener('click', () => {
        menu.classList.toggle('show');
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            menu.classList.remove('show');
        }
    });
});
