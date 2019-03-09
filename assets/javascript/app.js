
$(document).ready(function () {

    //Q&A Array
    var trivia = [
        {
            question: "What is the name of Hal Solo’s ship?",
            choice: ["USS Enterprise", "Time Bandit", "Millennium Falcon", "Galactica"],
            answer: 2,
            photo: "assets/images/MFalcon.jpg"
        },
        {
            question: "What actor is the voice of Woody in Toy Story?",
            choice: ["Woody Harrelson", "Tim Allen", "Vin Diesel", "Tom Hanks"],
            answer: 3,
            photo: "assets/images/woody.jpg"
        },
        {
            question: "Who is the most voluptuous female in Toontown?",
            choice: ["Betty Boop", "Jessica Rabbit", "Minnie Mouse", "Wilma Flintstone"],
            answer: 1,
            photo: "assets/images/Rabbit.jpg"
        },
        {
            question: "How many engines are on an X-wing fighter?",
            choice: ["One", "Two", "Four", "Eight"],
            answer: 2,
            photo: "assets/images/xWing.gif"
        },
        {
            question: "What was the name of the second Indiana Jones movie, released in 1984?",
            choice: ["Indiana Jones and the Temple of Doom.", "Raiders of the Lost Ark", "Indiana Jones and Son", "Indiana Jones and the Last Crusade"],
            answer: 0,
            photo: "assets/images/temple.jpg"
        },
        {
            question: "In which year were the Academy Awards, or (Oscars), first presented?",
            choice: ["1492", "1929", "1931", "1942"],
            answer: 1,
            photo: "assets/images/oscars.jpg"
        },
        {
            question: "Which movie of Arnold's was first nominated at the Oscars?",
            choice: ["Total Recall", "Terminator 2", "The Running Man", "True Lies"],
            answer: 1,
            photo: "assets/images/terminator.gif"
        },
        {
            question: "How many Die Hard movies have been released?",
            choice: ["Four", "Five", "Six", "There is only 1 true Die Hard movie"],
            answer: 1,
            photo: "assets/images/dieHard.gif"
        },
        {
            question: "Who directed the movie Gladiator from the year 2000?",
            choice: ["David Fincher", "Steven Spielberg", "Quentin Tarantino", "Ridley Scott"],
            answer: 3,
            photo: "assets/images/gladiator.gif"
        },
        {
            question: "Why didn’t Yoda train Luke Skywalker?",
            choice: ["Yoda sensed the Darkside", "Yoda was too old", "Luke's father was Vader", "Luke lacked patience"],
            answer: 3,
            photo: "assets/images/Yoda.gif"
        }];

    //Global variables
    var correct = 0;
    var incorrect = 0;
    var unAnswered = 0;
    var timer = 15;
    var timerPic = 45
    var intervalId;
    var userGuess = "";
    var running = false;
    var qCount = trivia.length;
    var pick;
    var index;
    var newArray = [];
    var holder = [];

    //start game when start is clicked

    $("#reset").hide();

    $("#start").on("click", function () {
        $("#start").hide();
        displayQuestion();
        runTimer();
        for (var i = 0; i < trivia.length; i++) {
            holder.push(trivia[i]);
        }
    })

    //timer function
    function runTimer() {
        if (!running) {
            intervalId = setInterval(decrement, 1000);
            running = true;
        }
    }
    //start timer and count down
    function decrement() {
        $("#timerL").html("<h3>Watch the clock! " + timer + "</h3>");
        timer--;
        if (timer === 0) {
            unAnswered++;
            stop();
            $("#answerblock").html("<p>You didn't watch the clock! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }
    }

    //stop timer function

    function stop() {
        running = false;
        clearInterval(intervalId);
    }






    //load question

    function displayQuestion() {
        //generate random index in array
        index = Math.floor(Math.random() * trivia.length);
        pick = trivia[index];

        $("#questionblock").html("<h2>" + pick.question + "</h2>");
        for (var i = 0; i < pick.choice.length; i++) {
            var userChoice = $("<div>");
            userChoice.addClass("answerchoice");
            userChoice.html(pick.choice[i]);

            userChoice.attr("data-guessvalue", i);
            $("#answerblock").append(userChoice);

        }

        //selecting answers
        $(".answerchoice").on("click", function () {
            //grab array position from userGuess
            userGuess = parseInt($(this).attr("data-guessvalue"));

            //correct answer
            if (userGuess === pick.answer) {
                stop();
                correct++;
                userGuess = "";
                $("#answerblock").html("<p>Yes!</p>");
                hidepicture();

            } else {
                stop();
                incorrect++;
                userGuess = "";
                $("#answerblock").html("<p>Nope! The correct answer is: " + pick.choice[pick.answer] + "</p>");

                //hide the picture function
                hidepicture();
            }
        })
    }




    function hidepicture() {
        $("#answerblock").append("<img src=" + pick.photo + ">");
        newArray.push(pick);
        trivia.splice(index, 1);

        var hidpic = setTimeout(function () {
            $("#answerblock").empty();
            timer = 15;

            //run the score screen if all questions answered
            if ((incorrect + correct + unAnswered) === qCount) {
                $("#timerL").empty();
                $("#questionblock").empty();
                $("#questionblock").html("<h3>Game Over!  Here's how you did: </h3>");
                $("#answerblock").append("<h4> Correct: " + correct + "</h4>");
                $("#answerblock").append("<h4> Incorrect: " + incorrect + "</h4>");
                $("#answerblock").append("<h4> Unanswered: " + unAnswered + "</h4>");
                $("#reset").show();
                correct = 0;
                incorrect = 0;
                unAnswered = 0;

            } else {
                runTimer();
                displayQuestion();
            }
        }, 4000);
    }

    //reset function
    $("#reset").on("click", function () {
        $("#reset").hide();
        $("#answerblock").empty();
        $("#questionblock").empty();
        for (var i = 0; i < holder.length; i++) {
            trivia.push(holder[i]);
        }
        runTimer();
        displayQuestion();

    })

})

