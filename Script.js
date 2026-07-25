// ===============================
// Fleet Commander Remastered 0.1
// ===============================

const game = {
    player: {
        name: "Адмирал",
        level: 1,
        xp: 0,
        money: 500,
        rank: "Капитан"
    },

    fleet: [
        {
            id: 1,
            name: "Эсминец",
            hp: 100,
            armor: 1,
            guns: 1
        }
    ],

    currentScreen: "menu"
};

// ------------------------------

window.onload = () => {

    loadGame();

    updateProfile();

};

// ------------------------------

function updateProfile(){

    document.getElementById("playerName").textContent =
        game.player.name;

    document.getElementById("level").textContent =
        game.player.level;

    document.getElementById("xp").textContent =
        game.player.xp;

    document.getElementById("money").textContent =
        game.player.money;

}

// ------------------------------

function newGame(){

    showMessage(
        "⚓ Добро пожаловать в Fleet Commander Remastered!"
    );

}

// ------------------------------

function continueGame(){

    showMessage(
        "📂 Загрузка сохранения..."
    );

}

// ------------------------------

function openCampaign(){

    openScreen(`
        <div class="panel">

            <div class="title">

                🗺 Кампания

            </div>

            <p>

            Скоро здесь появится карта мира.

            </p>

            <br>

            <button onclick="startMission(1)">

                Миссия 1

            </button>

        </div>
    `);

}

// ------------------------------

function openPort(){

    openScreen(`
        <div class="panel">

            <div class="title">

                ⚓ Порт

            </div>

            <button onclick="showShipyard()">

                🚢 Верфь

            </button>

            <button onclick="repairFleet()">

                🔧 Док

            </button>

            <button onclick="upgradeFleet()">

                ⬆ Улучшения

            </button>

        </div>
    `);

}

// ------------------------------

function openFleet(){

    let html = `
    <div class="panel">

    <div class="title">

    🚢 Мой флот

    </div>
    `;

    game.fleet.forEach(ship=>{

        html += `
        <p>

        ${ship.name}

        <br>

        ❤️ HP: ${ship.hp}

        <br>

        🛡 Броня: ${ship.armor}

        <br>

        💣 Орудия: ${ship.guns}

        </p>

        <hr><br>
        `;

    });

    html += "</div>";

    openScreen(html);

}

// ------------------------------

function openSettings(){

    openScreen(`
        <div class="panel">

            <div class="title">

                ⚙ Настройки

            </div>

            <button onclick="resetProgress()">

                🗑 Сбросить прогресс

            </button>

        </div>
    `);

}

// ------------------------------

function openScreen(html){

    const screen =
        document.getElementById("screen");

    screen.style.display="block";

    screen.innerHTML = html;

}

// ------------------------------

function showMessage(text){

    alert(text);

}

// ------------------------------

function startMission(id){

    alert("Миссия "+id+" скоро станет доступна.");

}

// ------------------------------

function showShipyard(){

    alert("Верфь появится в версии 0.2");

}

function repairFleet(){

    alert("Все корабли отремонтированы.");

}

function upgradeFleet(){

    alert("Система улучшений скоро появится.");

}

// ------------------------------

function saveGame(){

    localStorage.setItem(

        "fleetCommander",

        JSON.stringify(game)

    );

}

// ------------------------------

function loadGame(){

    const data =
        localStorage.getItem(
            "fleetCommander"
        );

    if(data){

        Object.assign(
            game,
            JSON.parse(data)
        );

    }

}

// ------------------------------

function resetProgress(){

    if(confirm("Удалить сохранение?")){

        localStorage.removeItem(
            "fleetCommander"
        );

        location.reload();

    }

}
