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
            🗺 Карта кампании
        </div>

        <div id="worldMap">

            <div class="mission unlocked"
                 onclick="startMission(1)"
                 style="left:80px;top:250px;">
                 ⚓
                 <span>Порт</span>
            </div>

            <div class="line"
                 style="left:120px;top:270px;width:120px;">
            </div>

            <div class="mission unlocked"
                 onclick="startMission(2)"
                 style="left:260px;top:220px;">
                 🏝
                 <span>Остров</span>
            </div>

            <div class="line"
                 style="left:300px;top:240px;width:140px;">
            </div>

            <div class="mission locked"
                 style="left:470px;top:170px;">
                 ☠
                 <span>Пираты</span>
            </div>

            <div class="line"
                 style="left:500px;top:190px;width:120px;">
            </div>

            <div class="mission locked"
                 style="left:650px;top:120px;">
                 🌋
                 <span>Босс</span>
            </div>

        </div>

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
function startMission(id){

    switch(id){

        case 1:

            alert("⚓ Миссия 1\n\nЗащитите главный порт.");

        break;

        case 2:

            alert("🏝 Миссия 2\n\nОсвободите остров.");

        break;

        default:

            alert("Миссия пока недоступна.");

    }

}
