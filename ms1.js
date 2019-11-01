console.log("hi");
// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCsvA56yHs18HDFV_Gh1-buHYYXGJIZG1g",
    authDomain: "trainscheduler-4f54c.firebaseapp.com",
    databaseURL: "https://trainscheduler-4f54c.firebaseio.com",
    projectId: "trainscheduler-4f54c",
    storageBucket: "trainscheduler-4f54c.appspot.com",
    messagingSenderId: "603061651661",
    appId: "1:603061651661:web:1708ed721d809a01fd8184",
    measurementId: "G-DRQDLF6945"
  };
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();
  

// Button to add the train
$("#insert-train-btn").on("click", function(event){
    event.preventDefault();

// Variables created to get user input;
var trainnameinput = $("#trainnameinput").val().trim();
var descriptioninput = $("#descriptioninput").val().trim();
var firsttraintimeinput = $("#firsttraintimeinput").val().trim();
var frequencyinput = $("#frequencyinput").val().trim();




// temporary object for holding train data
var newTrain = {
    trainname: trainnameinput,
    description: descriptioninput,
    firsttraintime: firsttraintimeinput,
    frequency: frequencyinput
  };

// Upload train data to the database
database.ref().push(newTrain);


// Clear the input fields
$("#trainnameinput").val("");
$("#descriptioninput").val("");
$("#firsttraintimeinput").val("");
$("#frequencyinput").val("");

});

// 3. Create Firebase event for adding train to the database and a row in the html when an entry is made
database.ref().on("child_added", function(childsnapshot){

// Storing the values into the variable;
var trainnameinput = childsnapshot.val().trainname;
var descriptioninput = childsnapshot.val().description;
var firsttraintimeinput = childsnapshot.val().firsttraintime;
var frequencyinput = childsnapshot.val().frequency;


// First Train Time in military time
//var firstTrainTimeFormated = moment.unix(firsttraintime).format("HH:mm");

// First Time (pushed back 1 year to make sure it comes before current time)
var firstTrainTimeFormated = moment(firsttraintimeinput, "HH:mm").subtract(1, "years");


// Current Time
var currentTime = moment();


// Difference between the times
var diffTime = moment().diff(moment(firstTrainTimeFormated), "minutes");

// Time apart (remainder)
var tRemainder = diffTime % frequencyinput;

// Minute Until Train
var tMinutesTillTrain = frequencyinput - tRemainder;
console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

// Next Train
var nextTrain = moment().add(tMinutesTillTrain, "minutes");

// Create the new row
var newRow = $("<tr>").append(
    $("<td>").text(trainnameinput),
    $("<td>").text(descriptioninput),
    $("<td>").text(frequencyinput),
    $("<td>").text(nextTrain),
    $("<td>").text(tMinutesTillTrain),
    
);

// Append the new row to the table
$("#train-table > tbody").append(newRow);

});


