document.addEventListener('DOMContentLoaded', () => {
    // === Data ===
    // Card mapping based on filenames (extracted from directory listing)
    const cardData = {
        Ironclad: ["Aggression", "Anger", "Armaments", "AshenStrike", "Barricade", "Bash", "BattleTrance", "BloodWall", "Bloodletting", "Bludgeon", "BodySlam", "Brand", "Break", "Breakthrough", "Bully", "BurningPact", "Cascade", "Cinder", "Clash", "Colossus", "Conflagration", "Corruption", "CrimsonMantle", "Cruelty", "DarkEmbrace", "Defend", "DemonForm", "DemonicShield", "Dismantle", "Dominate", "DrumofBattle", "DualWield", "Entrench", "EvilEye", "ExpectaFight", "Feed", "FeelNoPain", "FiendFire", "FightMe", "FlameBarrier", "ForgottenRitual", "Havoc", "Headbutt", "Hellraiser", "Hemokinesis", "HowlfromBeyond", "Impervious", "InfernalBlade", "Inferno", "Inflame", "IronWave", "Juggernaut", "Juggling", "Mangle", "MoltenFist", "NotYet", "Offering", "One-TwoPunch", "PactsEnd", "PerfectedStrike", "Pillage", "PommelStrike", "PrimalForce", "Pyre", "Rage", "Rampage", "Rupture", "SecondWind", "SetupStrike", "ShrugItOff", "Spite", "Stampede", "Stoke", "Stomp", "StoneArmor", "Strike", "SwordBoomerang", "Tank", "Taunt", "TearAsunder", "Thrash", "Thunderclap", "Tremble", "TrueGrit", "TwinStrike", "Unmovable", "Unrelenting", "Uppercut", "Vicious", "Whirlwind"],
        Silent: ["Abrasive", "Accelerant", "Accuracy", "Acrobatics", "Adrenaline", "Afterimage", "Anticipate", "Assassinate", "Backflip", "Backstab", "BladeDance", "BladeofInk", "Blur", "BouncingFlask", "BubbleBubble", "BulletTime", "Burst", "CalculatedGamble", "Caltrops", "CloakandDagger", "CorrosiveWave", "DaggerSpray", "DaggerThrow", "Dash", "DeadlyPoison", "Defend", "Deflect", "Distraction", "DodgeandRoll", "EchoingSlash", "Envenom", "EscapePlan", "Expertise", "Expose", "FanofKnives", "Finisher", "Flanking", "Flechettes", "Flick-Flack", "FollowThrough", "Footwork", "GrandFinale", "HandTrick", "Haze", "HiddenDaggers", "InfiniteBlades", "KnifeTrap", "LeadingStrike", "LegSweep", "Malaise", "MasterPlanner", "MementoMori", "Mirage", "Murder", "Neutralize", "Nightmare", "NoxiousFumes", "Outbreak", "Outmaneuver", "PhantomBlades", "PiercingWail", "Pinpoint", "PoisonedStab", "Pounce", "PreciseCut", "Predator", "Prepared", "Reflex", "Ricochet", "SerpentForm", "ShadowStep", "Shadowmeld", "Skewer", "Slice", "Snakebite", "Sneaky", "Speedster", "StormofSteel", "Strangle", "Strike", "SuckerPunch", "Suppress", "Survivor", "Tactician", "TheHunt", "ToolsoftheTrade", "Tracking", "Untouchable", "UpMySleeve", "Well-LaidPlans", "WraithForm"],
        Defect: ["AdaptiveStrike", "AllForOne", "BallLightning", "Barrage", "BeamCell", "BiasedCognition", "BoostAway", "BootSequence", "Buffer", "BulkUp", "Capacitor", "Chaos", "ChargeBattery", "Chill", "Claw", "ColdSnap", "Compact", "CompileDriver", "ConsumingShadow", "Coolant", "Coolheaded", "CreativeAI", "Darkness", "Defend", "Defragment", "DoubleEnergy", "Dualcast", "EchoForm", "EnergySurge", "FTL", "Feral", "FightThrough", "FlakCannon", "FocusedStrike", "Fusion", "GeneticAlgorithm", "Glacier", "Glasswork", "GofortheEyes", "GunkUp", "Hailstorm", "HelixDrill", "HelloWorld", "Hologram", "Hotfix", "Hyperbeam", "IceLance", "Ignition", "Iteration", "Leap", "LightningRod", "Loop", "MachineLearning", "MeteorStrike", "Modded", "MomentumStrike", "Multi-Cast", "Null", "Overclock", "Quadcast", "Rainbow", "Reboot", "Rebound", "Refract", "RipandTear", "RocketPunch", "Scavenge", "Scrape", "ShadowShield", "Shatter", "SignalBoost", "Skim", "Smokestack", "Spinner", "Stack", "Storm", "Strike", "Subroutine", "Sunder", "Supercritical", "SweepingBeam", "Synchronize", "Synthesis", "TURBO", "Tempest", "TeslaCoil", "Thunder", "TrashtoTreasure", "Uproar", "Voltaic", "WhiteNoise", "Zap"],
        Necrobinder: ["Afterlife", "BansheesCry", "BlightStrike", "Bodyguard", "BoneShards", "BorrowedTime", "Bury", "Calcify", "CalloftheVoid", "CaptureSpirit", "Cleanse", "Countdown", "DanseMacabre", "DeathMarch", "Deathbringer", "DeathsDoor", "Debilitate", "Defend", "Defile", "Defy", "Delay", "Demesne", "DevourLife", "Dirge", "DrainPower", "Dredge", "Eidolon", "EndofDays", "EnfeeblingTouch", "Eradicate", "Fear", "Fetch", "Flatten", "ForbiddenGrimoire", "Friendship", "GlimpseBeyond", "GraveWarden", "Graveblast", "Hang", "Haunt", "HighFive", "Invoke", "LegionofBone", "Lethality", "Melancholy", "Misery", "NecroMastery", "NegativePulse", "Neurosurge", "NoEscape", "Oblivion", "Pagestorm", "Parse", "Poke", "Protector", "PullAggro", "PullfromBelow", "Putrefy", "Rattle", "Reanimate", "Reap", "ReaperForm", "Reave", "RightHandHand", "Sacrifice", "Scourge", "SculptingStrike", "Seance", "SentryMode", "Severance", "SharedFate", "Shroud", "SicEm", "SleightofFlesh", "Snap", "SoulStorm", "Sow", "SpiritofAsh", "Spur", "Squeeze", "Strike", "TheScythe", "TimesUp", "Transfigure", "Undeath", "Unleash", "Veilpiercer", "Wisp"],
        Regent: ["Alignment", "Arsenal", "AstralPulse", "BEGONE", "BeatintoShape", "BigBang", "BlackHole", "Bombardment", "Bulwark", "BundleofJoy", "CHARGE", "CelestialMight", "ChildoftheStars", "CloakofStars", "CollisionCourse", "Comet", "Conqueror", "Convergence", "CosmicIndifference", "CrashLanding", "CrescentSpear", "CrushUnder", "DecisionsDecisions", "Defend", "Devastate", "DyingStar", "FallingStar", "ForegoneConclusion", "Furnace", "GUARDS", "GammaBlast", "GatherLight", "Genesis", "Glimmer", "Glitterstream", "Glow", "GuidingStar", "HammerTime", "HeavenlyDrill", "Hegemony", "HeirloomHammer", "HiddenCache", "IAmInvincible", "KinglyKick", "KinglyPunch", "KnockoutBlow", "KnowThyPlace", "Largesse", "LunarBlast", "MakeItSo", "ManifestAuthority", "MeteorShower", "MonarchsGaze", "Monologue", "NeutronAegis", "Orbit", "PaleBlueDot", "Parry", "ParticleWall", "Patter", "PhotonCut", "PillarofCreation", "Prophesize", "Quasar", "Radiate", "RefineBlade", "Reflect", "Resonance", "RoyalGamble", "Royalties", "SeekingEdge", "SevenStars", "ShiningStrike", "SolarStrike", "SpectrumShift", "SpoilsofBattle", "Stardust", "Strike", "SummonForth", "Supermassive", "SwordSage", "Terraforming", "TheSealedThrone", "TheSmith", "Tyranny", "Venerate", "VoidForm", "WroughtinWar"],
        Colorless: ["Alchemize", "Anointed", "Apotheosis", "Apparition", "Automation", "BeaconofHope", "BeatDown", "BelieveinYou", "Bolas", "BrightestFlame", "ByrdSwoop", "Calamity", "Catastrophe", "Coordinate", "DarkShackles", "Discovery", "DramaticEntrance", "Enlightenment", "Entropy", "Equilibrium", "EternalArmor", "Exterminate", "Fasten", "FeedingFrenzy", "Finesse", "Fisticuffs", "FlashofSteel", "Fuel", "GangUp", "GiantRock", "GoldAxe", "HandofGreed", "HiddenGem", "HuddleUp", "Impatience", "Intercept", "JackofAllTrades", "Jackpot", "Knockdown", "Lift", "Luminesce", "MasterofStrategy", "Maul", "Mayhem", "Metamorphosis", "Mimic", "MindBlast", "MinionDiveBomb", "MinionSacrifice", "MinionStrike", "NeowsFury", "Nostalgia", "Omnislice", "Panache", "PanicButton", "Peck", "PrepTime", "Production", "Prolong", "Prowess", "Purity", "Rally", "Relax", "Rend", "Restlessness", "RollingBoulder", "Salvo", "Scrawl", "SecretTechnique", "SecretWeapon", "SeekerStrike", "Shiv", "Shockwave", "Soul", "SovereignBlade", "Splash", "Squash", "Stratagem", "SweepingGaze", "TagTeam", "TheBomb", "TheGambit", "ThinkingAhead", "ThrummingHatchet", "ToricToughness", "UltimateDefend", "UltimateStrike", "Volley", "Whistle", "Wish"]
    };

    // 깃허브 설정 (유저님이 직접 채워주세요!)
    const GITHUB_USER = 'theta1129'; 
    const GITHUB_REPO = 'Team-3';
    const DATA_URL = `./data/decks.json`; // 로컬 및 서버에서도 동일하게 작동

    let decks = [];
    
    // 1. 서버(JSON)에서 데이터 불러오기
    async function loadDecks() {
        try {
            const response = await fetch(DATA_URL + '?t=' + Date.now()); // 캐시 방지
            if (response.ok) {
                decks = await response.json();
                renderDecks();
            }
        } catch (error) {
            console.error("데이터 로딩 실패:", error);
            // 실패 시 로컬스토리지에서라도 가져옴
            decks = JSON.parse(localStorage.getItem('sts2_decks')) || [];
            renderDecks();
        }
    }
    
    loadDecks();
    
    let currentDeck = { name: '', cards: [] }; // cards: [{ id, character, name, qty }]
    let votes = JSON.parse(localStorage.getItem('sts2_votes')) || {};
    let currentFilter = 'all'; // 현재 선택된 필터 상태 저장
    let currentSort = 'newest'; // 'newest' 또는 'popular'
    let currentSearch = ''; // 검색어 저장
    
    let currentCardSearch = ''; // 덱 빌더 내 카드 검색어
    let selectedIncludeCards = []; // 포함할 카드 객체 배열 [{name, fileName}, ...]
    let selectedExcludeCards = []; // 제외할 카드 객체 배열 [{name, fileName}, ...]
    let pickerMode = ''; // 'include' 또는 'exclude'
    let currentPickerSearch = ''; // 피커 내 검색어
    let currentPickerCat = 'Ironclad'; // 피커 내 카테고리

    // === DOM Elements ===
    const openBuilderBtn = document.getElementById('open-builder-btn');
    const floatingAddBtn = document.getElementById('floating-add-btn');
    const closeBuilderBtn = document.getElementById('close-builder-btn');
    const deckBuilderModal = document.getElementById('deck-builder-modal');
    const cardGrid = document.getElementById('card-grid');
    const selectorTabs = document.querySelectorAll('.selector-tabs .tab-btn');
    const deckNameInput = document.getElementById('deck-name-input');
    const selectedCardsList = document.getElementById('selected-cards-list');
    const shareDeckBtn = document.getElementById('share-deck-btn');
    const deckList = document.getElementById('deck-list');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const totalCardsCount = document.getElementById('total-cards-count');
    const deckSearchInput = document.getElementById('deck-search-input');
    const sortBtns = document.querySelectorAll('.sort-btn');

    const cardSearchInput = document.getElementById('card-search-input');
    const toggleAdvancedBtn = document.getElementById('toggle-advanced-btn');
    const advancedFilters = document.getElementById('advanced-filters');
    
    // 카드 피커 관련
    const pickIncludeBtn = document.getElementById('pick-include-btn');
    const pickExcludeBtn = document.getElementById('pick-exclude-btn');
    const selectedIncludeDiv = document.getElementById('selected-include-card');
    const selectedExcludeDiv = document.getElementById('selected-exclude-card');
    const cardPickerModal = document.getElementById('card-picker-modal');
    const closePickerBtn = document.getElementById('close-picker-btn');
    const pickerCardGrid = document.getElementById('picker-card-grid');
    const pickerSearchInput = document.getElementById('picker-card-search');
    const pickerTabs = document.querySelectorAll('#picker-tabs .tab-btn');

    // 상세 보기 모달 관련
    const deckDetailModal = document.getElementById('deck-detail-modal');
    const closeDetailBtn = document.getElementById('close-detail-btn');
    const detailDeckName = document.getElementById('detail-deck-name');
    const detailCardGrid = document.getElementById('detail-card-grid');

    // === Functions ===

    // Initialize Card Grid
    function renderCardSelector(category) {
        cardGrid.innerHTML = '';
        let cards = cardData[category];
        
        // 검색어 필터링
        if (currentCardSearch) {
            const query = currentCardSearch.toLowerCase();
            cards = cards.filter(cardName => cardName.toLowerCase().includes(query));
        }

        cards.forEach(cardName => {
            const img = document.createElement('img');
            const fileName = `150px-StS2_${category}-${cardName}.webp`;
            img.src = `./images/cards/${fileName}`;
            img.alt = cardName;
            img.title = cardName;
            img.addEventListener('click', () => addCardToDeck(category, cardName, fileName));
            cardGrid.appendChild(img);
        });
    }

    // 카드 피커 그리드 렌더링
    function renderPickerGrid(category) {
        pickerCardGrid.innerHTML = '';
        let cards = cardData[category];
        if (currentPickerSearch) {
            const query = currentPickerSearch.toLowerCase();
            cards = cards.filter(c => c.toLowerCase().includes(query));
        }

        cards.forEach(cardName => {
            const img = document.createElement('img');
            const fileName = `150px-StS2_${category}-${cardName}.webp`;
            img.src = `./images/cards/${fileName}`;
            img.alt = cardName;
            img.title = cardName;
            img.addEventListener('click', () => selectCardForFilter(cardName, fileName));
            pickerCardGrid.appendChild(img);
        });
    }

    function selectCardForFilter(name, fileName) {
        if (pickerMode === 'include') {
            if (!selectedIncludeCards.some(c => c.name === name)) {
                selectedIncludeCards.push({ name, fileName });
            }
            updatePills('include');
        } else {
            if (!selectedExcludeCards.some(c => c.name === name)) {
                selectedExcludeCards.push({ name, fileName });
            }
            updatePills('exclude');
        }
        cardPickerModal.style.display = 'none';
        renderDecks();
    }

    function updatePills(type) {
        const div = type === 'include' ? selectedIncludeDiv : selectedExcludeDiv;
        const data = type === 'include' ? selectedIncludeCards : selectedExcludeCards;

        div.innerHTML = '';
        if (data.length > 0) {
            div.style.display = 'flex';
            div.style.flexWrap = 'wrap';
            data.forEach((card, index) => {
                const pill = document.createElement('div');
                pill.className = 'selected-pill';
                pill.innerHTML = `
                    <img src="./images/cards/${card.fileName}">
                    <span>${card.name}</span>
                    <button class="remove-btn" onclick="clearFilterCard('${type}', ${index})">&times;</button>
                `;
                div.appendChild(pill);
            });
        } else {
            div.style.display = 'none';
        }
    }

    window.clearFilterCard = (type, index) => {
        if (type === 'include') {
            selectedIncludeCards.splice(index, 1);
            updatePills('include');
        } else {
            selectedExcludeCards.splice(index, 1);
            updatePills('exclude');
        }
        renderDecks();
    };

    // Add Card to Current Deck
    function addCardToDeck(character, name, fileName) {
        const existing = currentDeck.cards.find(c => c.fileName === fileName);
        if (existing) {
            existing.qty++;
        } else {
            currentDeck.cards.push({ character, name, fileName, qty: 1 });
        }
        updateDeckUI();
    }

    // Update Current Deck View
    function updateDeckUI() {
        selectedCardsList.innerHTML = '';
        if (currentDeck.cards.length === 0) {
            selectedCardsList.innerHTML = '<div class="empty-msg">카드를 선택하여 덱을 구성하세요.</div>';
            totalCardsCount.innerText = '0';
            return;
        }

        let total = 0;
        currentDeck.cards.forEach((card, index) => {
            total += card.qty;
            const item = document.createElement('div');
            item.className = 'selected-card-item';
            item.innerHTML = `
                <img src="./images/cards/${card.fileName}" alt="${card.name}">
                <div class="card-info">
                    <span class="card-name">${card.name}</span>
                    <span class="card-char" style="font-size: 0.7rem; color: #64748b;">${card.character}</span>
                </div>
                <div class="card-controls">
                    <button class="qty-btn" onclick="changeQty(${index}, -1)">-</button>
                    <span>${card.qty}</span>
                    <button class="qty-btn" onclick="changeQty(${index}, 1)">+</button>
                </div>
            `;
            selectedCardsList.appendChild(item);
        });
        totalCardsCount.innerText = total;
    }

    // Global qty changer (attached to window for simplicity in innerHTML)
    window.changeQty = (index, delta) => {
        currentDeck.cards[index].qty += delta;
        if (currentDeck.cards[index].qty <= 0) {
            currentDeck.cards.splice(index, 1);
        }
        updateDeckUI();
    };

    // Save/Share Deck
    // Share Deck via GitHub Issue
    function shareDeck() {
        const name = deckNameInput.value.trim();
        if (!name) {
            alert('덱 이름을 입력해 주세요!');
            return;
        }
        if (currentDeck.cards.length === 0) {
            alert('카드를 최소 한 장 이상 선택해 주세요!');
            return;
        }

        const newDeck = {
            id: Date.now(),
            name: name,
            character: document.querySelector('.tab-btn.active').getAttribute('data-cat'),
            cards: [...currentDeck.cards],
            likes: 0,
            dislikes: 0,
            date: new Date().toLocaleDateString()
        };

        // GitHub Issue 생성을 위한 데이터 준비
        const issueTitle = `[NEW-DECK] ${newDeck.name}`;
        const issueBody = `---DECK_JSON_START---\n${JSON.stringify(newDeck, null, 2)}\n---DECK_JSON_END---`;
        const label = "new-deck";
        
        const githubIssueUrl = `https://github.com/${GITHUB_USER}/${GITHUB_REPO}/issues/new?title=${encodeURIComponent(issueTitle)}&body=${encodeURIComponent(issueBody)}&labels=${label}`;

        if (confirm('덱을 공유하시겠습니까?\n확인을 누르면 깃허브 이슈 등록 페이지로 이동합니다.\n(등록 후 잠시 후에 사이트에 반영됩니다.)')) {
            window.open(githubIssueUrl, '_blank');
            deckBuilderModal.style.display = 'none';
            // 초기화
            currentDeck = { name: '', cards: [] };
            deckNameInput.value = '';
            updateDeckUI();
        }
    }

    // Render Shared Decks
    function renderDecks() {
        deckList.innerHTML = '';
        
        // 1. 캐릭터 필터링
        let filteredDecks = currentFilter === 'all' ? decks : decks.filter(d => d.character === currentFilter);

        // 2. 검색어 필터링
        if (currentSearch) {
            const query = currentSearch.toLowerCase();
            filteredDecks = filteredDecks.filter(d => d.name.toLowerCase().includes(query));
        }

        // 3. 카드 포함/미포함 필터링
        if (selectedIncludeCards.length > 0) {
            filteredDecks = filteredDecks.filter(deck => 
                selectedIncludeCards.every(ic => 
                    deck.cards.some(c => c.name === ic.name)
                )
            );
        }
        if (selectedExcludeCards.length > 0) {
            filteredDecks = filteredDecks.filter(deck => 
                !selectedExcludeCards.some(ec => 
                    deck.cards.some(c => c.name === ec.name)
                )
            );
        }

        // 4. 정렬 적용
        if (currentSort === 'popular') {
            filteredDecks.sort((a, b) => b.likes - a.likes);
        } else {
            filteredDecks.sort((a, b) => b.id - a.id); // 최신순 (ID가 Timestamp이므로)
        }

        if (filteredDecks.length === 0) {
            deckList.innerHTML = '<div class="empty-msg" style="grid-column: 1/-1;">조건에 맞는 덱이 없습니다.</div>';
            return;
        }

        filteredDecks.forEach(deck => {
            const card = document.createElement('div');
            card.className = 'deck-card fade-in';
            
            // Show first 5 cards in the body
            const cardsHtml = deck.cards.slice(0, 5).map(c => 
                `<img src="./images/cards/${c.fileName}" title="${c.name} x${c.qty}">`
            ).join('');

            card.innerHTML = `
                <div class="deck-card-header" onclick="viewDeckDetails(${deck.id})" style="cursor:pointer;">
                    <h3>${deck.name}</h3>
                    <div class="author">${deck.character} | ${deck.date}</div>
                </div>
                <div class="deck-card-body" onclick="viewDeckDetails(${deck.id})" style="cursor:pointer;">
                    ${cardsHtml}
                    ${deck.cards.length > 5 ? `<div style="display:flex; align-items:center; color:#64748b; font-size:0.8rem;">+${deck.cards.length - 5}</div>` : ''}
                </div>
                <div class="deck-card-footer">
                    <div class="rating-controls">
                        <button class="rate-btn ${votes[deck.id] === 'like' ? 'liked' : ''}" onclick="event.stopPropagation(); rateDeck(${deck.id}, 'like')">
                            👍 <span>${deck.likes}</span>
                        </button>
                        <button class="rate-btn ${votes[deck.id] === 'dislike' ? 'disliked' : ''}" onclick="event.stopPropagation(); rateDeck(${deck.id}, 'dislike')">
                            👎 <span>${deck.dislikes}</span>
                        </button>
                    </div>
                    <button class="btn" style="padding: 0.4rem 0.8rem; font-size: 0.8rem;" onclick="viewDeckDetails(${deck.id})">상세보기</button>
                </div>
            `;
            deckList.appendChild(card);
        });
    }

    // Rating Logic
    window.rateDeck = (id, type) => {
        const deck = decks.find(d => d.id === id);
        if (!deck) return;

        if (votes[id] === type) {
            // 이미 선택한 걸 다시 누르면 취소
            if (type === 'like') deck.likes--;
            else deck.dislikes--;
            delete votes[id];
        } else {
            // 다른 걸로 변경하는 경우 (이미 투표가 있다면 기존 투표 취소)
            if (votes[id]) {
                if (votes[id] === 'like') deck.likes--;
                else deck.dislikes--;
            }
            // 새로운 투표 적용
            if (type === 'like') deck.likes++;
            else deck.dislikes++;
            votes[id] = type;
        }

        localStorage.setItem('sts2_decks', JSON.stringify(decks));
        localStorage.setItem('sts2_votes', JSON.stringify(votes));
        renderDecks(); // 필터/정렬 상태 유지하며 리렌더링
    };

    // Placeholder for View Details
    window.viewDeckDetails = (id) => {
        const deck = decks.find(d => d.id === id);
        if (!deck) return;

        detailDeckName.innerText = deck.name;
        detailCardGrid.innerHTML = '';
        
        if (deck.cards.length === 0) {
            detailCardGrid.innerHTML = '<div class="empty-msg">이 덱에는 카드가 없습니다.</div>';
        } else {
            deck.cards.forEach(card => {
                const item = document.createElement('div');
                item.className = 'detail-card-item'; // fade-in 제거하여 즉시 보이게 함
                item.innerHTML = `
                    <img src="./images/cards/${card.fileName}" alt="${card.name}" onerror="this.src='./images/cards/150px-StS2_Colorless-Shiv.webp'; this.onerror=null;">
                    <div class="card-qty-badge">x${card.qty}</div>
                    <div style="margin-top:0.5rem; font-size:0.9rem; color:white;">${card.name}</div>
                `;
                detailCardGrid.appendChild(item);
            });
        }

        deckDetailModal.style.display = 'block';
    };

    // === Event Listeners ===

    openBuilderBtn.addEventListener('click', () => {
        deckBuilderModal.style.display = 'block';
        renderCardSelector('Ironclad');
    });

    floatingAddBtn.addEventListener('click', () => {
        deckBuilderModal.style.display = 'block';
        renderCardSelector('Ironclad');
    });

    closeBuilderBtn.addEventListener('click', () => {
        deckBuilderModal.style.display = 'none';
    });

    selectorTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            selectorTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            renderCardSelector(tab.getAttribute('data-cat'));
        });
    });

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.getAttribute('data-filter'); // 필터 상태 업데이트
            renderDecks();
        });
    });

    // 검색 입력 이벤트
    deckSearchInput.addEventListener('input', (e) => {
        currentSearch = e.target.value;
        renderDecks();
    });

    // 정렬 버튼 이벤트
    sortBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            sortBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentSort = btn.getAttribute('data-sort');
            renderDecks();
        });
    });

    // 덱 빌더 내 카드 검색
    cardSearchInput.addEventListener('input', (e) => {
        currentCardSearch = e.target.value;
        const activeTab = document.querySelector('.tab-btn.active').getAttribute('data-cat');
        renderCardSelector(activeTab);
    });

    // 고급 필터 토글
    toggleAdvancedBtn.addEventListener('click', () => {
        const isHidden = advancedFilters.style.display === 'none';
        advancedFilters.style.display = isHidden ? 'flex' : 'none';
        toggleAdvancedBtn.innerText = isHidden ? '고급 필터 △' : '고급 필터 ▽';
    });

    // 카드 피커 열기
    pickIncludeBtn.addEventListener('click', () => {
        pickerMode = 'include';
        cardPickerModal.style.display = 'block';
        currentPickerSearch = '';
        pickerSearchInput.value = '';
        renderPickerGrid(currentPickerCat);
    });

    pickExcludeBtn.addEventListener('click', () => {
        pickerMode = 'exclude';
        cardPickerModal.style.display = 'block';
        currentPickerSearch = '';
        pickerSearchInput.value = '';
        renderPickerGrid(currentPickerCat);
    });

    closePickerBtn.addEventListener('click', () => {
        cardPickerModal.style.display = 'none';
    });

    // 피커 내 탭 전환
    pickerTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            pickerTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentPickerCat = tab.getAttribute('data-cat');
            renderPickerGrid(currentPickerCat);
        });
    });

    // 피커 내 검색
    pickerSearchInput.addEventListener('input', (e) => {
        currentPickerSearch = e.target.value;
        renderPickerGrid(currentPickerCat);
    });

    shareDeckBtn.addEventListener('click', shareDeck);

    closeDetailBtn.addEventListener('click', () => {
        deckDetailModal.style.display = 'none';
    });

    // 모달 외부 클릭 시 닫기
    window.addEventListener('click', (e) => {
        if (e.target === deckBuilderModal) deckBuilderModal.style.display = 'none';
        if (e.target === deckDetailModal) deckDetailModal.style.display = 'none';
        if (e.target === cardPickerModal) cardPickerModal.style.display = 'none';
    });

    // Initial Render
    renderDecks();
});
