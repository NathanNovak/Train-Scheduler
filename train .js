  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBE3AOIEFlN0axYIOYpA8F4eroqrJb-lyY",
    authDomain: "trainschedule-ad67d.firebaseapp.com",
    databaseURL: "https://trainschedule-ad67d.firebaseio.com",
    projectId: "trainschedule-ad67d",
    storageBucket: "",
    messagingSenderId: "908366846921"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  var train = "";
  var destination = "";
  var frequency = "";
  var nextArrival = "";
  var minutesAway = "";
  var firstTime = "";
  var getMinutes = 0;

  database.ref();

  $('#go').on('click', function(event){

    event.preventDefault();

    train = $('#train').val();
    destination = $('#destination').val();
    firstTime = $('#first-time').val();
    frequency = $('#frequency').val();

    console.log(train);
    console.log(destination);
    console.log(firstTime);
    console.log(frequency);

    database.ref().push({
        train: train,
        destination: destination,
        firstTime: firstTime,
        frequency: frequency
    })

    train = $('#train').val("");
    destination = $('#destination').val("");
    firstTime = $('#first-time').val("");
    frequency = $('#frequency').val("");
  })

  database.ref().on("child_added", function(childsnapshot) {

    train = childsnapshot.val().train;
    destination = childsnapshot.val().destination;
    firstTime = childsnapshot.val().firstTime;
    frequency = childsnapshot.val().frequency;
    
    var cs = childsnapshot.val();

    console.log(cs);
    console.log(cs.train);
    console.log(cs.destination);
    console.log(cs.firstTime);
    console.log(cs.frequency);

    //subtracts 1 year to give more accurate timing in the past
    var firstTimeConverted = moment(firstTime, "HH:mm a").subtract(1, "year"); 

    //gets the current time
    var currentTime = moment()
    console.log(currentTime);

    var diffInMinutes = moment().diff(firstTimeConverted, "minutes");
    console.log(diffInMinutes);

    // gets remainder from the minutes over a year to current time.  
    var tRemainder = diffInMinutes % frequency;
    console.log(tRemainder);

    getMinutes = moment().get('minute');

    minutesAway = frequency - tRemainder;

    nextArrival = moment().add(minutesAway, 'minute');

    var timeTill = moment(nextArrival).format('hh:mm a');    
    console.log(nextArrival);

  

    var scheduleInput = "<tr><td>" + train + "</td><td>" + destination + "</td><td>Every " + frequency +" min</td><td>" + timeTill + "</td><td>" + minutesAway + " min</td>";

    $('#trainSchedule > tbody').append(scheduleInput);



  }), function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
};
