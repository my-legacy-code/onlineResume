window.addEventListener('load', async () => {
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
    let header = document.querySelector('header');
    const TITLE_MARGIN = 20;
    const TOP_OFFSET = $(header).height() + TITLE_MARGIN;

    function showPane(paneId, scrollTo = true) {

        function displayNewPane() {
            let pane = hiddenPanes.querySelector(`#${paneId}`);
            paneWrapper.appendChild(pane);

            $(paneWrapper)
                .animate({
                    opacity: 1
                }, 200, 'swing');

            if (scrollTo) {
                $('html, body').animate({
                    scrollTop: $('#pane-wrapper').offset().top - TOP_OFFSET
                }, 500);
            }
        }

        let currentPane = paneWrapper.querySelector('.active-pane');
        if (currentPane) {
            $(paneWrapper)
                .animate({
                    opacity: 0
                }, 200, 'swing', () => {
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

    (async () => {
        const GITHUB_USERNAME = 'byliuyang';
        const COMMITS_CONTAINER = '#github-contributions';

        const githubStats = await GithubStats(GITHUB_USERNAME);

        let githubCommits = document.querySelector(COMMITS_CONTAINER);
        /* Render SVG for commit contributions */
        let commitsContribSVG = githubStats.commitsContribSVG({
            rows: 7,
            space: 4,
            rectWidth: 16,
            levelColors: [
                {
                    minCommits: 0,
                    color: '#ebedf0'
                },
                {
                    minCommits: 1,
                    color: '#c6e48b'
                },
                {
                    minCommits: 9,
                    color: '#7bc96f'
                },
                {
                    minCommits: 17,
                    color: '#239a3b'
                },
                {
                    minCommits: 26,
                    color: '#196127'
                }
            ]
        });
        githubCommits.appendChild(commitsContribSVG);
    })();

    showPane('experiences-pane', false);
});
