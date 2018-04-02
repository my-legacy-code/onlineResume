window.addEventListener('load', () => {
    const GITHUB_USERNAME = 'byliuyang';

    let menuBtn = document.querySelector('#menu-btn');
    let navEl = document.querySelector('#header nav');
    let menuEl = document.querySelector('#header nav > ul');
    let menuShown = false;

    menuBtn.addEventListener('click', event => {
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


    let paneWrapper = document.querySelector('#pane-wrapper');
    let hiddenPanes = document.querySelector('#hidden-panes');

    function showPane(paneId) {

        function displayNewPane() {
            let pane = hiddenPanes.querySelector(`#${paneId}`);
            paneWrapper.appendChild(pane);

            $(paneWrapper)
                .animate({
                    opacity:1
                }, 500, 'swing', ()=>{

                });
        }

        let currentPane = paneWrapper.querySelector('.active-pane');
        if (currentPane) {
            $(paneWrapper)
                .animate({
                    opacity: 0
                }, 500, 'swing', () => {
                    hiddenPanes.appendChild(currentPane);
                    displayNewPane();
                });
        } else displayNewPane();


    }

    document.querySelectorAll('[data-pane-id]')
        .forEach(el => {
                el.addEventListener('click', (event) => {
                    let paneId = el.dataset.paneId;
                    showPane(paneId);
                });
            }
        );

    document.querySelectorAll('.photo-gallery').forEach(photoEl => {
        let active = false;
        photoEl.firstChild.nextSibling.addEventListener('click', event => {
            if (!active)
                $(photoEl).addClass('shown');
            else
                $(photoEl).removeClass('shown');
            active = !active;
        });
    });

    GitHubCalendar('#github-calender', GITHUB_USERNAME);

    showPane('experiences-pane');
});