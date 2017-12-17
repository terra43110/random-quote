var quoteObject = [
    {
        author: "Marty Neumeier",
        content: "The best design tool is a long eraser with a pencil at one end."
    },
    {
        author: "Jeff Croft",
        content: "Do you validate other people’s markup? Yes? You’re an asshole."
    },
    {
        author: "Victor Papanek",
        content: "The only important thing about design is how it relates to people."
    },
    {
        author: "Louis Kahn",
        content: "The nature of space reflects what it wants to be."
    },
    {
        author: "Scott Adams",
        content: "Ideas are worthless. Execution is everything."
    },
    {
        author: "Ellen Lupton",
        content: "To say a grid is limiting is to say that language is limiting, or typography is limiting."
    },
    {
        author: "Albert Einstein",
        content: "The secret to creativity is knowing how to hide your sources."
    },
    {
        author: "Tao Te Ching",
        content: "Well established hierarchies are not easily uprooted."
    },
    {
        author: "Rebecca Reubens",
        content: "Design is to invent with intent. If you take away the invent bit, you have an engineer. If you take away the intent bit, you have an artist."
    },
    {
        author: "Susan Sontag",
        content: "Real art has the capacity to make us nervous."
    },
    {
        author: "Miguel de Cervantes",
        content: "Delay always breeds danger; and to protract a great design is often to ruin it."
    },
    {
        author: "Mark Gobe",
        content: "When we feel less secure, with less control over our daily lives, we reach out to brands to connect with a time when things seemed better."
    },
    {
        author: "Whitney Hess",
        content: "Everybody is a user experience designer."
    },
    {
        author: "Juan-Carlos Fernandez",
        content: "Bad design is smoke, while good design is a mirror."
    }
];




$( function() {
    var quoteContent = document.getElementById("quote-content");
    var quoteAuthor = document.getElementById("quote-author");
    var randomContent;
    var randomAuthor;

    $('#getQuoteButton').on('click', function(event) {
        console.clear();
        console.log('clear');

        event.preventDefault();

        var randomIndex = Math.floor(Math.random() * quoteObject.length);
        randomAuthor = quoteObject[randomIndex].author;
        console.log(randomAuthor);
        randomContent = quoteObject[randomIndex].content;
        console.log(randomContent);

        var randomContentElm = document.createElement('P');
        randomContentElm.textContent = randomContent;
        quoteContent.innerHTML = "";
        quoteContent.appendChild(randomContentElm);

        var randomAuthorElm = document.createElement('P');
        randomAuthorElm.textContent = randomAuthor;
        quoteAuthor.innerHTML = "";
        quoteAuthor.appendChild(randomAuthorElm);
    });

    $('#ajax-btn').on('click', function(event) {
        console.clear();
        console.log('Request Random Quote');

        var url = "https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous";
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.setRequestHeader("X-Mashape-Key", "snUFZyuBfSmshuHu3ZbRpkUlc88ip1EQaR1jsnm9QrE8Y8yNh7");
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.setRequestHeader("Accept", "application/json");
        xhr.send();

        var requestedQuote, requestedAuthor, data;
        xhr.addEventListener('load', function(loadEvent) {
            console.log(xhr.getAllResponseHeaders());
            data = JSON.parse(xhr.responseText);
            console.log(data);
            quoteContent.textContent = data.quote;
            quoteAuthor.textContent = data.author;
        });

    });

    var $tweet = $('#tweet');
    $tweet.on('click', function(event) {
        console.log('tweet');

        var href = $tweet.attr('href');
        console.log('TEST: ' + href);
        var cutoff = href.indexOf('?text=');
        console.log('cutoff ' + cutoff);
        if (cutoff >= 0) {
            href = href.slice(0, cutoff);
        }
        var tweetText = quoteContent.textContent.replace(/\s+/g, "%20");
        tweetText = tweetText + " ~ " + quoteAuthor.textContent.replace(/\s+/g, "%20");

        href = href + '?text=' + tweetText;
        $tweet.attr('href', href);
        console.log(href);
        //console.log($tweet.attr('href'));
    });
});

