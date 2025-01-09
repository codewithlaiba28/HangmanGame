const keyboard_div = document.querySelector(".keyboard");
const word_display = document.querySelector(".word_display");
const guess_text = document.querySelector(".guess_text b");
const game_model = document.querySelector(".game_model");
const hint_text = document.querySelector(".hint_text b");
const play_again_btn = document.querySelector(".play_again");

let currentword, wrong_guess_count = 0;
const max_guess = 6;

const wordsWithHints = [
    { word: "apple", hint: "A sweet red fruit." },
    { word: "banana", hint: "A yellow fruit that monkeys love." },
    { word: "carrot", hint: "A crunchy orange vegetable." },
    { word: "river", hint: "A natural stream of water." },
    { word: "mountain", hint: "A tall, rocky elevation on Earth's surface." },
    { word: "ocean", hint: "A vast body of saltwater." },
    { word: "keyboard", hint: "An input device for typing." },
    { word: "javascript", hint: "A popular programming language for the web." },
    { word: "sunflower", hint: "A yellow flower that faces the sun." },
    { word: "penguin", hint: "A flightless bird living in cold regions." },
    { word: "python", hint: "A programming language named after a snake." },
    { word: "cloud", hint: "A collection of tiny water droplets in the sky." },
    { word: "rainbow", hint: "An arc of colors in the sky after rain." },
    { word: "book", hint: "A source of written knowledge or stories." },
    { word: "butterfly", hint: "A flying insect with colorful wings." },
    { word: "island", hint: "Land surrounded by water." },
    { word: "camel", hint: "A desert animal with humps." },
    { word: "guitar", hint: "A string instrument often used in music." },
    { word: "camera", hint: "A device for taking photos." },
    { word: "python", hint: "A popular language for AI and web development." },
    { word: "apple", hint: "A sweet red or green fruit." },
    { word: "banana", hint: "A long, yellow fruit loved by monkeys." },
    { word: "mango", hint: "A juicy tropical fruit, often called the 'king of fruits'." },
    { word: "orange", hint: "A citrus fruit rich in Vitamin C." },
    { word: "grape", hint: "A small round fruit used to make wine." },
    { word: "peach", hint: "A soft fruit with fuzzy skin and a stone inside." },
    { word: "pear", hint: "A sweet fruit with a thin skin and soft flesh." },
    { word: "kiwi", hint: "A small fruit with brown skin and green flesh." },
    { word: "plum", hint: "A small, sweet fruit with smooth skin and a stone." },
    { word: "cherry", hint: "A small, round fruit, often red, with a pit." },
    { word: "watermelon", hint: "A large green fruit with red juicy flesh and black seeds." },
    { word: "pineapple", hint: "A tropical fruit with spiky skin and sweet flesh." },
    { word: "strawberry", hint: "A red fruit with tiny seeds on its surface." },
    { word: "blueberry", hint: "A small, sweet blue fruit." },
    { word: "raspberry", hint: "A red or black fruit with a tangy flavor." },
    { word: "blackberry", hint: "A dark purple fruit with tiny drupelets." },
    { word: "pomegranate", hint: "A fruit with juicy red seeds." },
    { word: "papaya", hint: "A tropical fruit with orange flesh and black seeds." },
    { word: "guava", hint: "A tropical fruit with green skin and pink or white flesh." },
    { word: "lychee", hint: "A small tropical fruit with sweet, white flesh." },
    { word: "dragonfruit", hint: "A fruit with bright pink skin and white or red flesh." },
    { word: "fig", hint: "A small, soft fruit with hundreds of seeds inside." },
    { word: "lemon", hint: "A sour yellow citrus fruit." },
    { word: "lime", hint: "A small green citrus fruit with a tangy flavor." },
    { word: "coconut", hint: "A tropical fruit with hard shell and sweet water." },
    { word: "apricot", hint: "A small orange fruit with soft skin and a stone." },
    { word: "persimmon", hint: "A sweet orange fruit, often eaten in winter." },
    { word: "date", hint: "A sweet brown fruit from a palm tree." },
    { word: "cranberry", hint: "A small, tart red fruit used in sauces and juices." },
    { word: "mulberry", hint: "A fruit resembling blackberries, from a tree." },
    { word: "tamarind", hint: "A tangy fruit with brown pods, used in cooking." },
    { word: "melon", hint: "A sweet, juicy fruit with a hard rind." },
    { word: "passionfruit", hint: "A small fruit with a tough rind and aromatic seeds." },
    { word: "grapefruit", hint: "A large, tart citrus fruit, often pink inside." },
    { word: "jackfruit", hint: "A large tropical fruit with spiky skin and sweet flesh." },
    { word: "rambutan", hint: "A hairy red tropical fruit with sweet white flesh." },
    { word: "starfruit", hint: "A yellow fruit shaped like a star when sliced." },
    { word: "olive", hint: "A small fruit used for making oil." },
    { word: "javascript", hint: "A versatile language for web development." },
    { word: "java", hint: "A language commonly used for Android development." },
    { word: "pizza", hint: "A popular Italian dish with cheese and toppings." },
    { word: "burger", hint: "A sandwich with a patty, often served with fries." },
    { word: "pasta", hint: "An Italian dish made from noodles." },
    { word: "sushi", hint: "A Japanese dish with rice and seafood." },
    { word: "tacos", hint: "A Mexican dish served in a folded tortilla." },
    { word: "noodles", hint: "A thin, long strip of dough cooked in water." },
    { word: "sandwich", hint: "Two slices of bread with filling in between." },
    { word: "salad", hint: "A dish made of mixed greens and vegetables." },
    { word: "steak", hint: "A grilled or fried piece of beef." },
    { word: "soup", hint: "A liquid dish served warm, often as a starter." },
    { word: "omelette", hint: "A dish made by frying beaten eggs." },
    { word: "pancakes", hint: "A flat, round breakfast dish served with syrup." },
    { word: "muffin", hint: "A small, baked bread often served as dessert." },
    { word: "donut", hint: "A fried dough pastry, often glazed or frosted." },
    { word: "chocolate", hint: "A sweet treat made from cacao beans." },
    { word: "cheesecake", hint: "A dessert with a cream cheese base." },
    { word: "icecream", hint: "A frozen dessert made from cream and sugar." },
    { word: "biryani", hint: "A spicy rice dish popular in South Asia." },
    { word: "samosa", hint: "A triangular fried pastry with spicy filling." },
    { word: "dosa", hint: "A South Indian crepe made from rice batter." },
    { word: "naan", hint: "An Indian flatbread cooked in a tandoor." },
    { word: "kebab", hint: "Grilled meat or vegetables on skewers." },
    { word: "curry", hint: "A spicy stew with meat or vegetables." },
    { word: "hummus", hint: "A Middle Eastern dip made from chickpeas." },
    { word: "falafel", hint: "Deep-fried balls made from ground chickpeas." },
    { word: "lasagna", hint: "An Italian layered pasta dish with cheese and sauce." },
    { word: "brownie", hint: "A dense, chocolate dessert square." },
    { word: "quiche", hint: "A French savory tart with eggs and cheese." },
    { word: "tofu", hint: "A soybean curd, often used in vegan dishes." },
    { word: "ramen", hint: "A Japanese noodle soup." },
    { word: "dim sum", hint: "Chinese bite-sized dumplings and buns." },
    { word: "tiramisu", hint: "An Italian coffee-flavored dessert." },
    { word: "croissant", hint: "A buttery, flaky French pastry." },
    { word: "friedrice", hint: "A dish of stir-fried rice with vegetables and meat." },
    { word: "springroll", hint: "A rolled appetizer with vegetables and meat." },
    { word: "hotdog", hint: "A grilled sausage served in a bun." },
    { word: "chips", hint: "Thinly sliced and fried potatoes." },
    { word: "popcorn", hint: "A puffed corn snack, popular at movies." },
    { word: "bbqribs", hint: "Grilled pork ribs with barbecue sauce." },
    { word: "cereal", hint: "A breakfast dish with grains and milk." },
    { word: "butter", hint: "A dairy product used for cooking and spreading." },
    { word: "yogurt", hint: "A fermented dairy product." },
    { word: "bread", hint: "A baked staple made from flour and water." },
    { word: "walnut", hint: "A nut rich in omega-3 fatty acids." },
    { word: "blueberry", hint: "A small, sweet blue fruit." },
    { word: "avocado", hint: "A creamy fruit often used in guacamole." },
    { word: "pomegranate", hint: "A fruit with juicy red seeds." },
    { word: "coconut", hint: "A tropical fruit with hard shell and sweet water." },
    { word: "strawberry", hint: "A red fruit with tiny seeds on its surface." },
    { word: "pineapple", hint: "A tropical fruit with spiky skin and sweet flesh." },

];

// Function to get a random word and display the hint
const get_random_word = () => {
    const { word, hint } = wordsWithHints[Math.floor(Math.random() * wordsWithHints.length)];
    currentword = word;
    wrong_guess_count = 0;
    hint_text.innerText = hint;
    guess_text.innerText = `${wrong_guess_count} / ${max_guess}`;
    word_display.innerHTML = word.split("")
        .map(() => `<li class="letter guess border-b-2 border-gray-400 w-8 text-center"></li>`)
        .join("");
    [...keyboard_div.children].forEach(button => button.disabled = false);
};
// Function to handle game over
const gameOver = (isVictory) => {
    setTimeout(() => {
        game_model.classList.remove("hidden");
        game_model.querySelector("h4").innerText = isVictory ? "You Win!" : "Game Over";
        game_model.querySelector("p b").innerText = currentword;
        game_model.querySelector("img").src = isVictory ? "winer.gif" : "lostgif.gif";
    }, 500);
};
// Function to initialize game logic for letter clicks
const initGame = (button, clickedLetter) => {
    if (currentword.includes(clickedLetter)) {
        [...currentword].forEach((letter, index) => {
            if (letter === clickedLetter) {
                const letterElem = word_display.querySelectorAll("li")[index];
                letterElem.innerText = letter;
                letterElem.classList.add("guessed");
            }
        });

        // Check if all letters are guessed
        const allGuessed = [...word_display.querySelectorAll("li")]
            .every(li => li.classList.contains("guessed"));
        if (allGuessed) {
            gameOver(true);
        }
    } else {
        wrong_guess_count++;
        guess_text.innerText = `${wrong_guess_count} / ${max_guess}`;
        if (wrong_guess_count === max_guess) {
            gameOver(false);
        }
    }
    button.disabled = true; // Disable the clicked button
};
// Generate keyboard dynamically
for (let i = 97; i <= 122; i++) { 
    const button = document.createElement("button");
    button.innerHTML = String.fromCharCode(i); 
    button.classList.add("px-3", "py-2", "hover:bg-gray-500", "rounded", "bg-gray-400");
    keyboard_div.appendChild(button);
    button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)));
}
// Reset game when "Play Again" is clicked
play_again_btn.addEventListener("click", () => {
    game_model.classList.add("hidden");
    get_random_word();
});
// Initialize the first game
get_random_word();
