
//master game variable. stores question, answers, correct answer, and player answers
var game = [ 
	{
		question: 'In what year was Lou Gehrig voted into the Baseball Hall of Fame?',
		ans1: '1945',
		ans2: '1939',
		ans3: '1950',
		ans4: '1944',
		blurb: 'He was voted in the year he retired, the first player to do so.',
		rightAns: 'ans2',
		playerAns: ''
	},
	{
		question: "What was Babe Ruth's number?",
		ans1: '3',
		ans2: '1',
		ans3: '4',
		ans4: '8',
		blurb: "The number was the second to be retired by the Yankees, after Lou Gehrigh's #4",
		rightAns: 'ans1',
		playerAns: ''
	},
	{
		question: 'Bobby Richardson won the World Series MVP for what losing World Series team?',
		ans1: 'Boston Red Sox',
		ans2: 'Los Angeles Dodgers',
		ans3: 'Chicago Cubs',
		ans4: 'New York Yankees',
		blurb: 'The 1960 New York Yankees lost the World Series in seven games to the Pittsburgh Pirates. Richardson batted .367, with 12 RBI and a grand slam.',
		rightAns: 'ans4',
		playerAns: ''
	},
	{
		question: 'In December of 2013, which player signed a 10-year, $240 million dollar contract to play for the Seattle Mariners?',
		ans1: 'Robinson Cano',
		ans2: 'Alex Rodriguez',
		ans3: 'Jacoby Ellsbury',
		ans4: 'Albert Pujols',
		blurb: "Cano's $24 million per year is the most ever given to a second baseman.",
		rightAns: 'ans1',
		playerAns: ''
	},
	{
		question: 'Who holds the record for most saves in a season?',
		ans1: 'Eric Gagne',
		ans2: 'Dennis Eckersley',
		ans3: 'Francisco Rodriguez',
		ans4: 'Bobby Thigpen',
		blurb: 'Rodriguez saved 62 games in 2008.',
		rightAns: 'ans3',
		playerAns: ''
	},
	{
		question: 'What rookie pitcher won 20 games in 1985?',
		ans1: 'Roger Clemens',
		ans2: 'Tom Browning',
		ans3: 'Fernando Valenzuela',
		ans4: 'Dwight Gooden',
		blurb: 'Browning went 20-9 for the Cincinnati Reds in his 1985 rookie season.',
		rightAns: 'ans2',
		playerAns: ''
	},
	{
		question: "Who was Nolan Ryan's 5000th strikeout victim?",
		ans1: 'Joe Carter',
		ans2: 'Rickey Henderson',
		ans3: 'Paul Molitor',
		ans4: 'Ruben Sierra',
		blurb: "On August 22, 1989, Rickey Henderson was the victim of Nolan Ryan's historic 5,000th strikeout.",
		rightAns: 'ans2',
		playerAns: ''
	},
	{
		question: 'Who was the only baseball player to play over 500 games at each of five different positions?',
		ans1: 'Alex Rodriguez',
		ans2: 'Fred McGriff',
		ans3: 'Damion Easley',
		ans4: 'Pete Rose ',
		blurb: 'The infamous Cincinnati Reds player-manager played 939 games at first base, 671 in left field, 634 at third base, 628 at second base, and 595 in right field.',
		rightAns: 'ans4',
		playerAns: ''
	},
	{
		question: 'Babe Ruth was the first player to hit 50 HRs in a season. Who was the second?',
		ans1: 'Roger Maris',
		ans2: 'Hack Wilson',
		ans3: 'Hank Greenberg',
		ans4: 'Jimmie Foxx',
		blurb: 'Wilson Hit 56 in 1930.',
		rightAns: 'ans2',
		playerAns: ''
	}
]

//initial values for right, wrong, and no answer counters, as well as current question index
var right = 0,
	wrong = 0,
	noAns = 0,
	currentQuestion = 0,
	timer = 30*timerConstant;

//timer and timeout constant
var timerConstant = 100;
var timeoutConstant = 5000;

//blank intervalId so it doesn't complain about intervalId not existing the first time startTime is called
var intervalId = '';


function startGame() {
	//clear player answers from game array
	for(var obj in game) {
		obj.playerAns = ''
	}
	//resets right, wrong, and no answer counters, as well as current question index
	right = 0;
	wrong = 0;
	noAns = 0;
	currentQuestion = 0;

	//hide button
	$('#button-div').css('visibility', 'hidden');

	//show timer and start it
	$('#timer').css('visibility', 'visible');
	
	//displays next question
	nextQuestion();
}


function populateGameArea( gameObj , state) {
	//console.log(state)

	//clears question and answer area of game area if clear string passed as param
	if (gameObj == 'clear'){
		$('#game-area').empty();
	}
	//populates the game area with the question and answers from the game object passed
	else {
		//makes and adds question div to DOM
		var quesDiv = $('<div class="question">');
			quesDiv.html( gameObj.question + '<br><br>');
		$('#game-area').append( quesDiv );

		for( var i = 1; i <= 4; i++) {
			//makes answer div and adds id
			var ansDiv = $('<div>');
				ansDiv.attr('id','ans' + i);
				ansDiv.text( gameObj['ans' + i] );

			//if end of game state set, add special classes for highlighting answers
			if ( state == 'end' ) {
				if ( ('ans' + i) == gameObj.rightAns ) {
					ansDiv.addClass('correct');
				}
				else if ( ('ans' + i) == gameObj.playerAns ) {
					ansDiv.addClass('wrong')
				}
			}	

			//if state is not at the end, adds answer class to answer div
			if( state != 'end'){
				ansDiv.addClass('answer');
			}

			//adds answer div to DOM
			$('#game-area').append( ansDiv );
		}

		
	}
}


function startTimer() {
	timer = 10*timerConstant;
	$('#timer').css('color', 'yellow');
	clearInterval(intervalId);
	intervalId = setInterval(timerCount, 10);
}

function timerCount() {
	timer--;
	var currTime = timeConverter( timer );
	if( timer < (5 * timerConstant) ) {
		$('#timer').css('color', 'red');
	}
	if( timer <= 0 ) {

		$('#timer').text('00:00');
		noAns++;
		$('#game-area').empty();
		populateGameArea( game[ currentQuestion ] , 'end' );
		endQuestion();
	}

	$('#timer').text(currTime);
}

function answerQuestion() {
	//set id of clicked answer to variable for ease of typing
	var selected = $(this).attr('id')
	//set selected answer to playerAns in game array object
	game[ currentQuestion ].playerAns = selected;
	//increment right or wrong count
	if( selected == game[ currentQuestion].rightAns) {
		right++;
	}
	else{ wrong++; }
	//empty and re-populate gameDiv
	$('#game-area').empty();
	populateGameArea( game[ currentQuestion ] , 'end' );
	//end question
	endQuestion();

}

function endQuestion() {
		//stop Timer
		clearInterval( intervalId );

		//display blurb about question
		$('#game-area').append('<br><br>' + game[ currentQuestion ].blurb);
		//increment question index
		currentQuestion++;
		//if all questions have been displayed, show end of game stuff
		if(currentQuestion == game.length){
			endGameDisplay();
		}
		else{
		//otherwise load next question
		setTimeout( nextQuestion , timeoutConstant );
		}
		
}

function nextQuestion() {
	$('#game-area').empty();
	populateGameArea( game[ currentQuestion ] );
	startTimer();
}

function endGameDisplay() {
	//hide timer
	$('#timer').css('visibility', 'hidden');

	//rename button and make visible again
	$('#start').text('Restart Game');
	$('#button-div').css('visibility', 'visible');

	//clear game area
	$('#game-area').empty();

	//create div for displaying game record
	var record = $('<div>');
		record.attr('class', 'text-center');
		record.append('Correct: ' + right)
			  .append('<br>Incorrect: ' + wrong)
			  .append('<br>Not Answered: ' + noAns + '<br><br><hr>');

	//display record
	$('#game-area').prepend( record )

	//display all questions and answers with a seperator in end game state
	for(var i in game) {
		populateGameArea( game[i] , 'end' )
		$('#game-area').append('<hr>');
	}
}

function timeConverter(t) {

    //  Takes the current time in centi-seconds and convert it to seconds 
    var seconds = Math.floor( t / 100 );
    var ms = t - (100 * seconds);
 
    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    if (ms < 10) {
      ms = "0" + ms;
    }

    return seconds + "." + ms;
}

$('#start').click( startGame );

$(document).on('click', '.answer',  answerQuestion );

