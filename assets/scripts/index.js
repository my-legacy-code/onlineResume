window.addEventListener('load', () => {
    let menuBtn = document.querySelector('#menu-btn');
    let navEl = document.querySelector('#header nav');
    let menuEl = document.querySelector('#header nav > ul');
    let menuShown = false;
    menuBtn.addEventListener('click', event =>{
        if (menuShown) {
            $(navEl).css('height', 0);
            menuBtn.textContent = 'menu';
        } else {
            $(navEl).css('height', $(menuEl).height());
            menuBtn.textContent = 'close';
        }
        menuShown = !menuShown;
    });

    let tabEls = Array.from(document.querySelectorAll('header nav > ul > li'));

    function switchTo(tabEl) {
        tabEls.forEach(tabEl => tabEl.classList.remove('active'));
        tabEl.classList.add('active');
    }

    tabEls.forEach(tabEl => {
        tabEl.addEventListener('click', () => {
            switchTo(tabEl);
        });
    });
    switchTo(tabEls[0]);

    document.querySelectorAll('a').forEach(aEl => {
        if (aEl.href.indexOf(`${window.location.href}#`) !== -1)
            aEl.addEventListener('click', event => {
                event.preventDefault();
                let idIndex = aEl.href.indexOf('#');
                let id = aEl.href.substr(idIndex);
                $('html').animate({
                    scrollTop: $(id).offset().top
                }, 1000);
            });
    });

    document.querySelectorAll('.photo-gallery').forEach(photoEl => {
        let active = false;
        photoEl.firstChild.nextSibling.addEventListener('click', event => {
            if(!active)
                $(photoEl).addClass('shown');
            else
                $(photoEl).removeClass('shown');
            active = !active;
        });
    });

    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'UA-108153620-1');
});