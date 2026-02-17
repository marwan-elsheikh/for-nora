document.addEventListener('DOMContentLoaded', () => {
    // 1. ELEMENTS
    const hour = new Date().getHours();
    const bgElement = document.getElementById('background');
    const overlay = document.querySelector('.overlay');
    const startScreen = document.getElementById('startScreen');
    const messageScreen = document.getElementById('messageScreen');
    const moodScreen = document.getElementById('moodScreen');
    const responseScreen = document.getElementById('responseScreen');
    const feelBetterScreen = document.getElementById('feelBetterScreen');
    const knewYouWouldScreen = document.getElementById('knewYouWouldScreen');
    const flowerScreen = document.getElementById('flowerScreen');
    const finalScreen = document.getElementById('finalScreen');
    
    const startBtn = document.getElementById('startBtn');
    const greetingText = document.getElementById('greetingText');
    const subtitleText = document.getElementById('subtitleText');
    const moodSlider = document.getElementById('moodSlider');
    const emojiDisplay = document.getElementById('emojiDisplay');
    const confirmBtn = document.getElementById('confirmBtn');
    const responseMessage = document.getElementById('responseMessage');
    const buttonContainer = document.getElementById('buttonContainer');
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const nextToFlowerBtn = document.getElementById('nextToFlowerBtn');
    const flowerNextBtn = document.getElementById('flowerNextBtn');
    const finalBackToMenu = document.getElementById('finalBackToMenu');
    
    // Create background music element
    const music = new Audio('calm.mp3');
    music.loop = true;
    music.volume = 0.3;
    
    const clickSound = document.getElementById('clickSound');

    // 2. DATA & STATE
    let currentMoodValue = 50;
    let lastEmojiIndex = -1;
    let noClickCount = 0;

    // Daily Flower Content
    const flowersOfPalestine = [
        {
            name: "faqu'a iris",
            location: "jenin and the mountains of gilboa",
            significance: "a symbol of palestinian identity and natural heritage.",
            funFact: "it is the national flower of palestine and is known for its unique dark purple petals.",
            img: "Iris.png"
        },
        {
            name: "palestinian poppy",
            location: "fields across gaza and the west bank",
            significance: "representing the deep connection to the land and the colors of the flag.",
            funFact: "unlike garden poppies, these wild ones have a black heart at the center.",
            img: "Poppy.png"
        },
        {
            name: "cyclamen (qarn al-ghazal)",
            location: "rocky hills of jerusalem and galilee",
            significance: "represents the resilience of life; it grows in harsh, rocky terrains.",
            funFact: "palestinians traditionally use the leaves to make a delicious stuffed dish.",
            img: "Cyclamen.png"
        },
        {
            name: "wild jasmine",
            location: "villages and courtyards in nablus",
            significance: "symbolizes home, purity, and the sweet scent of memories.",
            funFact: "jasmine oil was traditionally used in old perfumeries in the levant.",
            img: "Wild Jasmine.png"
        },
        {
            name: "palestinian anemone",
            location: "valleys of ramallah and hebron",
            significance: "associated with rebirth and the changing of seasons.",
            funFact: "in folklore, it is said that anemones bloom where heroes have walked.",
            img: "Anemone.png"
        },
        {
            name: "white lily",
            location: "the coastal plains and northern hills",
            significance: "symbolizes peace and the grace of the land.",
            funFact: "one of the oldest flowers cultivated in the region, dating back millennia.",
            img: "White Lily.png"
        },
        {
            name: "rock rose",
            location: "the dry hills of the negev and west bank",
            significance: "represents determination; it stays beautiful even with very little water.",
            funFact: "the petals look like crinkled paper, yet bloom for many weeks.",
            img: "Rock Rose.png"
        }
    ];

    const niceMessages = [
        "\"verily, with hardship comes ease.\" - Quran 94:6",
        "\"do not lose hope, nor be sad.\" - Quran 3:139",
        "\"Allah does not burden a soul beyond that it can bear.\" - Quran 2:286",
        "\"and He is with you wherever you are.\" - Quran 57:4",
        "\"so remember Me; I will remember you.\" - Quran 2:152",
        "\"indeed, my Lord is near and responsive.\" - Quran 11:61"
    ];

    // 3. INITIAL SETUP
    startBtn.innerText = "start";
    confirmBtn.innerText = "okay";

    // Timing-based Greeting Logic (Nora capitalized, : ) spaced)
    let msg = "it's late Nora : )"; 
    let sub = "aren't the stars so pretty tonight?"; 
    let img = "night.jpg"; 

    if (hour >= 5 && hour < 12) {
        msg = "good morning Nora! ;)";
        sub = "you look so beautiful today";
        img = "morning.jpg"; 
    } else if (hour >= 12 && hour < 17) {
        msg = "good afternoon Nora : )";
        sub = "so happy to see you today";
        img = "noon.jpg";
    } else if (hour >= 17 && hour < 21) {
        msg = "good evening Nora : )";
        sub = "hope you had a lovely day today...";
        img = "afternoon.jpg";
    }
    bgElement.style.backgroundImage = `url('${img}')`;

    // 4. ANIMATION & TRANSITION HELPERS
    function oliveTalks() {
        const olivePic = document.querySelector('.olive-img');
        if(olivePic) {
            olivePic.classList.add('olive-talk');
            setTimeout(() => olivePic.classList.remove('olive-talk'), 1500);
        }
    }

    function goToFlowerScreen() {
        if(clickSound) clickSound.play();
        const dailyFlower = flowersOfPalestine[new Date().getDay()];
        
        document.getElementById('palestineFlowerImg').src = dailyFlower.img;
        document.getElementById('flowerName').innerText = dailyFlower.name;
        document.querySelector('#flowerOrigin span').innerText = dailyFlower.location;
        document.getElementById('flowerSignificance').innerText = dailyFlower.significance;
        document.getElementById('flowerFunFact').innerText = dailyFlower.funFact;

        knewYouWouldScreen.style.display = 'none';
        flowerScreen.style.display = 'flex';
        flowerScreen.classList.add('fade-in');
    }

    function goToFinalScreen() {
        if(clickSound) clickSound.play();
        flowerScreen.style.display = 'none';
        finalScreen.style.display = 'flex';
        finalScreen.classList.add('fade-in');
    }

    function goBackToMenu() {
        if(clickSound) clickSound.play();
        
        // Hide all screens
        startScreen.style.display = 'none';
        messageScreen.style.display = 'none';
        moodScreen.style.display = 'none';
        feelBetterScreen.style.display = 'none';
        knewYouWouldScreen.style.display = 'none';
        flowerScreen.style.display = 'none';
        finalScreen.style.display = 'none';
        
        // Clear any dynamic content
        const oliveDiv = document.getElementById('oliveDiv');
        const niceDiv = document.getElementById('niceDiv');
        const talkDiv = document.getElementById('talkDiv');
        if(oliveDiv) oliveDiv.remove();
        if(niceDiv) niceDiv.remove();
        if(talkDiv) talkDiv.remove();
        
        // Show response screen with menu
        responseScreen.style.display = 'flex';
        responseMessage.style.display = 'block';
        responseMessage.textContent = "what would you like to do?";
        buttonContainer.style.display = 'flex';
    }

    function goToFeelBetterScreen() {
        if(clickSound) clickSound.play();
        responseScreen.style.display = 'none';
        feelBetterScreen.style.display = 'flex';
        feelBetterScreen.classList.add('fade-in');
        
        // Reset the buttons
        noClickCount = 0;
        noBtn.classList.remove('fade-out');
        yesBtn.classList.remove('expand-stage-1', 'expand-stage-2', 'expand-stage-3', 'expand-final');
    }

    // 5. START BUTTON INTERACTION (Sequential Fading)
    startBtn.onclick = () => {
        if(clickSound) clickSound.play();
        
        // Play background music - calm.mp3
        music.play()
            .then(() => {
                console.log("Music started successfully");
            })
            .catch(err => {
                console.log("Music play failed:", err);
                // Try again after a tiny delay
                setTimeout(() => music.play(), 100);
            });
        
        startScreen.style.display = 'none';
        greetingText.innerText = msg;
        subtitleText.innerText = sub;
        
        messageScreen.style.display = 'flex'; 
        
        // Trigger sequential animations
        greetingText.classList.add('fade-in-greeting');
        subtitleText.classList.add('fade-in-subtitle');

        setTimeout(() => {
            bgElement.style.backgroundImage = 'none';
            bgElement.style.backgroundColor = '#A8D8F0';
            overlay.style.opacity = '0';
            messageScreen.style.display = 'none';
            moodScreen.style.display = 'flex'; 
        }, 8500); 
    };

    // 6. MOOD SLIDER INTERACTION
    moodSlider.oninput = (e) => {
        currentMoodValue = parseInt(e.target.value);
        const moods = [{m:20,e:'😔'},{m:40,e:'😕'},{m:60,e:'😐'},{m:80,e:'🙂'},{m:100,e:'🥳'}];
        const res = moods.find(m => currentMoodValue <= m.m) || moods[4];
        emojiDisplay.textContent = res.e;

        if (res.m !== lastEmojiIndex) {
            if(clickSound) { clickSound.currentTime = 0; clickSound.play(); }
            lastEmojiIndex = res.m;
        }
        confirmBtn.style.display = 'block';
    };

    confirmBtn.onclick = () => {
        if(clickSound) clickSound.play();
        moodScreen.style.display = 'none';
        responseScreen.style.display = 'flex';
        
        if(currentMoodValue <= 40) {
            responseMessage.textContent = "i'm sorry you're not feeling great today : (";
            buttonContainer.style.display = 'flex';
        } else {
            responseMessage.textContent = "i'm glad you're doing well today!";
            let happyNext = document.createElement('button');
            happyNext.className = 'response-btn';
            happyNext.innerText = 'next';
            happyNext.style.marginTop = "20px";
            happyNext.onclick = goToFlowerScreen;
            responseScreen.appendChild(happyNext);
        }
    };

    // NEW IMPROVED YES/NO BUTTON LOGIC
    noBtn.onclick = () => {
        if(clickSound) clickSound.play();
        
        noClickCount++;
        
        // Progressively expand the yes button
        if (noClickCount === 1) {
            yesBtn.classList.add('expand-stage-1');
        } else if (noClickCount === 2) {
            yesBtn.classList.remove('expand-stage-1');
            yesBtn.classList.add('expand-stage-2');
        } else if (noClickCount === 3) {
            yesBtn.classList.remove('expand-stage-2');
            yesBtn.classList.add('expand-stage-3');
            // Start fading out the no button
            noBtn.classList.add('fade-out');
        } else if (noClickCount >= 4) {
            // Final expansion - yes button covers the whole screen
            yesBtn.classList.remove('expand-stage-3');
            yesBtn.classList.add('expand-final');
        }
    };

    yesBtn.onclick = () => {
        if(clickSound) clickSound.play();
        
        // Wait a bit if button is animating
        setTimeout(() => {
            feelBetterScreen.style.display = 'none';
            knewYouWouldScreen.style.display = 'flex';
            knewYouWouldScreen.classList.add('fade-in');
        }, 300);
    };

    nextToFlowerBtn.onclick = goToFlowerScreen;
    
    // Flower screen next button goes to final screen
    flowerNextBtn.onclick = goToFinalScreen;
    
    // Final screen back to menu button
    finalBackToMenu.onclick = goBackToMenu;

    // 7. BUTTON MENU ACTIONS
    // DR. OLIVE
    document.getElementById('drOliveBtn').onclick = () => {
        if(clickSound) clickSound.play();
        responseMessage.style.display = 'none';
        buttonContainer.style.display = 'none';

        let oliveDiv = document.getElementById('oliveDiv') || document.createElement('div');
        oliveDiv.id = 'oliveDiv'; oliveDiv.className = 'fade-in';
        responseScreen.appendChild(oliveDiv);
        oliveDiv.style.display = 'flex'; oliveDiv.style.flexDirection = 'column'; oliveDiv.style.alignItems = 'center';

        oliveDiv.innerHTML = `
            <img src="Olive-nora-app.png" class="olive-img">
            <p id="oliveSpeech">hey Nora! dw, Dr. Olive is here now.. : )</p>
            <div id="breathCircle" class="breathing-circle" style="display:none;">ready?</div>
        `;
        
        const speech = document.getElementById('oliveSpeech');
        const circle = document.getElementById('breathCircle');
        
        setTimeout(() => {
            speech.innerText = "he wants to help you feel better. follow his instructions..."; oliveTalks();
            setTimeout(() => {
                circle.style.display = 'flex';
                let cycle = 3;
                const breath = (n) => {
                    if(n === 0) {
                        circle.style.display = 'none';
                        speech.innerText = "oh! one last thing..."; oliveTalks();
                        setTimeout(() => {
                            speech.innerHTML = "he thinks you look amazing today : )";
                            oliveTalks();
                            let nextBox = document.createElement('div');
                            nextBox.style.marginTop = "20px";
                            nextBox.innerHTML = `<button class="response-btn" id="oliveFinalNext">next</button>`;
                            oliveDiv.appendChild(nextBox);
                            document.getElementById('oliveFinalNext').onclick = goToFeelBetterScreen;
                        }, 4000);
                        return;
                    }
                    speech.innerText = "inhale deeply..."; circle.classList.add('inhale');
                    setTimeout(() => {
                        speech.innerText = "and exhale..."; circle.classList.remove('inhale');
                        setTimeout(() => breath(n-1), 4000);
                    }, 4000);
                };
                breath(cycle);
            }, 3000);
        }, 3000);
    };

    // SOMETHING NICE (Tulip added)
    document.getElementById('niceThingBtn').onclick = () => {
        if(clickSound) clickSound.play();
        responseMessage.style.display = 'none'; buttonContainer.style.display = 'none';
        let niceDiv = document.getElementById('niceDiv') || document.createElement('div');
        niceDiv.id = 'niceDiv'; niceDiv.className = 'fade-in'; responseScreen.appendChild(niceDiv);
        niceDiv.style.display = 'flex'; niceDiv.style.flexDirection = 'column'; niceDiv.style.alignItems = 'center';
        
        const randomMsg = niceMessages[Math.floor(Math.random() * niceMessages.length)];
        
        niceDiv.innerHTML = `
            <span style="font-size: 3.5rem; margin-bottom: 10px;">🌷</span>
            <p id="niceText">${randomMsg}</p>
            <button class="response-btn" id="niceNext">next</button>
        `;
        document.getElementById('niceNext').onclick = goToFeelBetterScreen;
    };

    // I WANT TO TALK
    document.getElementById('talkBtn').onclick = () => {
        if(clickSound) clickSound.play();
        responseMessage.style.display = 'none'; buttonContainer.style.display = 'none';
        let talkDiv = document.getElementById('talkDiv') || document.createElement('div');
        talkDiv.id = 'talkDiv'; talkDiv.className = 'fade-in'; responseScreen.appendChild(talkDiv);
        talkDiv.style.display = 'flex'; talkDiv.style.flexDirection = 'column'; talkDiv.style.alignItems = 'center';
        talkDiv.innerHTML = `
            <p id="niceText">you can always send Marwan a "." and he'll be so happy to talk to you : )</p>
            <button class="response-btn" id="talkNext">next</button>
            <button class="response-btn" id="talkBackToMenu" style="margin-top: 10px;">back to menu</button>
        `;
        document.getElementById('talkNext').onclick = goToFeelBetterScreen;
        document.getElementById('talkBackToMenu').onclick = goBackToMenu;
    };
});