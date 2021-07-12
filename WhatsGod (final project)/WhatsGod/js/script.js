window.onload = async () => {
    const REQ = "address=&action=";
    const navigationViews = [
        { url: "leaderboard", history: true },
        { url: "challenge", history: true },
        { url: "profile", history: false },
        { url: "customizations", history: false },
        { url: "game", history: false },
    ];
    const characters = (await $.getJSON("../WhatsGod/json/characters.json")).concat([null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null])
    const scenarios = (await $.getJSON("../WhatsGod/json/scenarios.json")).concat([null, null, null, null, null, null, null, null, null, null, null, null, null, null])
    let users = JSON.parse(await $.post("../server.php", REQ + "getLeaderboard"))
    const state = {
        player: { ...users[8] },
    };
    const gamePicks = JSON.parse(state.player.customization);
    const display = {
        rivalProfile: function (rival) {
            pushHistory(rival.user_id);
            display.profile(rival);
        },
        leaderboard: function () {
            $(".leaderboard-list").empty();
            users.map((rival, index) => {
                const winPercentage = (rival.games_won / rival.games_played) * 100;
                rival.user_id != state.player.user_id &&
                    $(".leaderboard-list").append(
                        `<li>
                            <div class="player-details" id="${`leaderboard-player-${rival.user_id}`}">
                                <span class="player-avatar-container">
                                    <img class="player-avatar click" src="${rival.user_avatar
                            ? rival.user_avatar
                            : "/assets/svg/no_pic.svg"
                        }" alt="flex">
                                </span>
                                <span class="player-name">${rival.username
                        }</span>
                            </div>
                            <span class="player-score">${rival.score.toLocaleString()}</span>
                            <div class="player-win-rate">
                                <div class="player-win-rate-graphic">
                                    <span class="win" style="width:${winPercentage}%">${rival.games_won.toLocaleString()}</span>
                                    <span class="lose">${(
                            rival.games_played - rival.games_won
                        ).toLocaleString()}</span>
                                </div>
                                <span class="player-win-rate-perc">${Math.floor(
                            winPercentage
                        )}%</span>
                            </div>
                        </li>`
                    );
                $(
                    `#leaderboard-player-${rival.user_id} .player-avatar-container`
                ).click(() => {
                    display.rivalProfile(rival);
                });
            });
            $("#leaderboard").css("display", "block");
            $("#app").css("display", "flex");
            $(".leaderboard-search").click(() => {
                $("#leaderboard-search-input").focus();
            });
        },
        challenge: function () {
            const props = Object.keys(gamePicks)
            $("#challenge").empty();
            $("#challenge").append(`
            ${props
                    .map((key, index) => {
                        const { story, name, src } = gamePicks[key];
                        return `
                    <p class="player-desc">${story}</p>
                    <button class="player-pick">
                        <img src="${src}">
                        <p>${name}</p>
                    </button>
                    ${index !== props.length - 1
                                ? `
                    <div class="tiny-circles">
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>`
                                : ""
                            }
                `;
                    })
                    .join("")}
            <div class="challenge-start-bg">
                <button id="challenge-start">GO</button>
            </div>
            
            `);

            $(".player-pick").on("click", () => {
                pushHistory("customizations");
                changeView("customizations");
            });
            $("#challenge-start").on("click", () => {
                pushHistory("game");
                changeView("game");
            });
            $("#app").css("display", "flex");
            $("#challenge").css("display", "block");
        },

        profile: function (player) {
            const { user_avatar, username, rank, turing, exp, position, games_played, games_won, score, email } = player || state.player;
            const winPercentage = (games_won / games_played) * 100;
            const rankExp = 1200 * rank;
            $("#profile").empty();
            $("#profile").append(`
            <a href="javascript:void(0)" class="back-to-main"><img src="assets/svg/back.svg" /></a>
            <img class="player-avatar" src="${user_avatar}" />
            <h1 class="player-name">${username}</h1>
            <h5 class="player-rank">Rank ${rank}</h5>
            <section class="profile-menu">
            ${player
                    ? ""
                    : `<button class="edit-btn">
                    <img src="assets/svg/pencil.svg" />
                    <span>Edit</span>
                    <img class="go-forward" src="assets/svg/back.svg" />
                </button>
                <section class="info-section">
                    <div class="icon-circle">
                        <img src="assets/svg/robot.svg" />
                    </div>
                    <span class="title">Turing Test</span>
                    <label class="switch">
                        <input type="checkbox" checked=${turing}>
                        <span class="slider round"></span>
                    </label>
                    </section>`
                }
              
                <h3>Achievments</h3>
                <div class="exp-meter">
                    <div class="exp-meter-fill" style="width:${(parseInt(exp) / parseInt(rankExp)) * 100
                }%;">
                        <span>XP</span>
                        <span>${exp}/${rankExp}</span>
                    </div>
                </div>
                <section class="info-section">
                    <div class="icon-circle">
                        <img src="assets/svg/planet.svg" />
                    </div>
                    <span class="title">Position</span>
                    <span class="description">${position.toLocaleString()}</span>
                </section>
                <div class="separator"></div>
                <section class="info-section">
                    <div class="icon-circle">
                        <img src="assets/svg/meter.svg" />
                    </div>
                    <span class="title">Turing Ratio</span>
                    <span class="description">${Math.floor(
                    winPercentage
                )}%</span>
                </section>
                <div class="separator"></div>
                <section class="info-section">
                    <div class="icon-circle">
                        <img src="assets/svg/medal.svg" />
                    </div>
                    <span class="title">Score</span>
                    <span class="description">${score.toLocaleString()}</span>
                </section>
                    <h3>Contact</h3>
                    <section class="info-section">
                        <div class="icon-circle">
                            <img src="assets/svg/email.svg" />
                        </div>
                        <span class="title">E-Mail</span>
                        <span class="description">${email}</span>
                    </section>
                    ${player
                        ? ""
                        :  `<section class="info-section">
                                <span class="title logout">
                                    <div id="lout">Log Out</div>
                                </span>
                            </section>`
                    }   
                </section>
            `);
            $("#lout").click(() => {
                    Cookies.remove('PHPSESSID',{path:'/'})
                    window.open('../index.php','_self');
                });
            $("#app").css("display", "none");
            $("#profile").css("display", "flex");
            $("#profile .back-to-main").click(() => {
                history.back();
            });
        },

        customizations: function () {
            console.log(gamePicks.playthrough.src)
            $("#customizations").empty();
            $("#customizations").append(`
                    <header>
                    <a href="javascript:void(0)" class="back-to-main"><img src="assets/svg/back.svg" /></a>
                    <h1>Customizations</h1>
                </header>
                <main class="customizations-container">
                    <section class="customization-category roles">
                        <div class="category-title"><span class="prefix">Choose your</span>&nbsp;<span>Role</span></div>
                        <main class="roles-container">
                            <button class="player-pick ${gamePicks.playthrough.src.includes("assets/svg/mere-mortal.svg") ? 'selected' : ''}">
                                <img src="assets/svg/mere-mortal.svg" alt="Mere Mortal">
                                <p>Mere Mortal</p>
                            </button>
                            <button class="player-pick ${gamePicks.playthrough.src.includes("assets/svg/almighty-god.svg") ? 'selected' : ''}">
                                <img src="assets/svg/almighty-god.svg" alt="Almighty God">
                                <p>Almighty God</p>
                            </button>
                        </main>
                    </section>
                    <section class="customization-category characters">
                        <div class="category-title"><span class="prefix">Choose your</span>&nbsp;<span>God</span></div>
                        <nav class="search-container">
                            <img class="flex-icon" src="assets/svg/flex.svg" alt="flex">
                            <img class="grid-icon" src="assets/svg/grid.svg" alt="grid">
                            <div class="search">
                                <input type="text" placeholder="search" name="search" class="search-input">
                                <img class="search-icon" src="assets/svg/search.svg" alt="search">
                            </div>
                        </nav>
                        <main class="options-grid">
                        ${characters
                    .map((character, index) => {
                        if (character) {
                            return `
                                    <button class="${gamePicks.godCharacter.src.includes(character.src) ? 'selected' : ''}">
                                        <img src="${character.src}" alt="${character.name}">
                                        <p>${character.name}</p>
                                    </button>
                                    `;
                        }
                        return `
                                    <button>
                                        <img src="assets/svg/no_pic.svg" alt="locked">
                                        <p>Rank ${index}</p>
                                    </button>
                                    `;
                    })
                    .join("")}
                        </main>
                    </section>
                    <section class="customization-category scenarios">
                        <div class="category-title"><span class="prefix">Choose your</span>&nbsp;<span>Scenerio</span></div>
                        <nav class="search-container">
                            <img class="flex-icon" src="assets/svg/flex.svg" alt="flex">
                            <img class="grid-icon" src="assets/svg/grid.svg" alt="grid">
                            <div class="search">
                                <input type="text" placeholder="search" name="search" class="search-input">
                                <img class="search-icon" src="assets/svg/search.svg" alt="search">
                            </div>
                        </nav>
                        <main class="options-grid">
                        ${scenarios
                    .map((scenario, index) => {
                        if (scenario) {
                            return `
                                <button class="${gamePicks.scenerio.src.includes(scenario.src) ? 'selected' : ''}">
                                    <img src="${scenario.src}" alt="${scenario.name}">
                                    <p>${scenario.name}</p>
                                </button>
                                `;
                        }
                        return `
                                <button>
                                    <img src="assets/svg/no_pic.svg" alt="locked">
                                    <p>Rank ${index}</p>
                                </button>
                                `;
                    })
                    .join("")}
                        </main>
                    </section>
                    <section class="customization-category">
                        <div class="category-title"><span class="prefix">Choose your</span>&nbsp;<span>God</span></div>
                        <main class="time-limit">
                            <img class="clock" src="assets/svg/clock.svg" alt="timelimit">
                            <div><span>05:00</span>&nbsp;<img src="assets/svg/pencil.svg" alt="edit"></div>
                        </main>
                    </section>
                </main>
            `);
            $('.roles .roles-container').children('button').each(function () {
                this.addEventListener('click', () => {
                    const img = this.getElementsByTagName('img')[0]
                    gamePicks.playthrough.src = img.src
                    gamePicks.playthrough.name = img.alt
                    $('.roles .roles-container').children('button').each(function () { this.classList.remove('selected') })
                    this.classList.add('selected')
                })

            })
            $('.characters .options-grid').children('button').each(function () {
                this.addEventListener('click', () => {
                    const img = this.getElementsByTagName('img')[0]
                    if (!img.src.includes('no_pic.svg')) {
                        gamePicks.godCharacter.src = img.src
                        gamePicks.godCharacter.name = img.alt
                        $('.characters .options-grid').children('button').each(function () { this.classList.remove('selected') })
                        this.classList.add('selected')
                    }

                })

            })
            $('.scenarios .options-grid').children('button').each(function () {
                this.addEventListener('click', () => {
                    const img = this.getElementsByTagName('img')[0]
                    if (!img.src.includes('no_pic.svg')) {
                        gamePicks.scenerio.src = img.src
                        gamePicks.scenerio.name = img.alt
                        $('.scenarios .options-grid').children('button').each(function () { this.classList.remove('selected') })
                        this.classList.add('selected')
                    }
                })

            })
            $("#customizations").css("display", "flex");
            $("#app").css("display", "none");
            $("#customizations .back-to-main").click(() => {
                history.back();
                pushHistory("challenge");
            });
        },

        game: function () {
           $.post("../server.php", REQ + "play")
            $("#game").empty();
            $("#game").append(`
            <header>
                <div class="spotlight-container">
                    <div class="lights">
                        <img class="opponent" src="${gamePicks.godCharacter.src}" alt="steve jobs">
                        <span>${gamePicks.godCharacter.name}</span>
                    </div>
                </div>
                <div class="clock-container">
                    <img class="clock" src="assets/svg/clock.svg" alt="clock">
                    <p>0:03</p>
                </div>
                <div class="spotlight-container active">
                    <img class="spotlight" src="assets/svg/left-spotlight.svg" alt="spotlight">
                    <div class="lights active">
                        <img class="player" src="${state.player.user_avatar}" alt="player">
                        <span>${state.player.username}</span>
                    </div>
                    <img class="spotlight" src="assets/svg/right-spotlight.svg" alt="spotlight">
                    <div class="dummy-spacer"></div>
                </div>
            </header>
            <main class="messages-container">
                <div class="message player">Dear god, who was the first president of America ?</div>
                <div class="message rival">Is it indeed that important to know ?</div>
                <div class="message player">Yes I have been looking for answers for a long time</div>
                <div class="message rival">Then google it bro, I was just a bout to take a nap</div>
            </main>
            
            <div class="input-container"><span class="input"  role="textbox" contenteditable>
            
            </span><div class="icon"></div></div>
            `);
            $("#game").css("display", "flex");
            $("#app").css("display", "none");
        },
    };

    function pushHistory(pushURL) {
        history.pushState({}, null, `${pushURL}`);
    }

    function initApp(urlParams, pushURL = false) {
        for (view of navigationViews) {
            if (urlParams === view.url) {
                changeView(view.url);
                if (pushURL) pushHistory(urlParams);
                return;
            }
        }
        if (pushURL) pushHistory("challenge");
        changeView("challenge");
    }

    initApp("challenge", true);

    $(window).on("popstate", function () {
        initApp(window.location.pathname.split("/")[3].replace("#", ""));
    });

    function changeView(url) {
        $(`.${url}`).addClass("selected");
        display[url]();
        navigationViews.map((otherView) => {
            if (otherView.url !== url) {
                $(`#${otherView.url}`).css("display", "none");
                $(`.${otherView.url}`).removeClass("selected");
            }
        });
        display[url]();
    }

    navigationViews.map((view) => {
        $(`.${view.url}`).click(() => {
            pushHistory(view.url);
            changeView(view.url);
        });
    });
};
