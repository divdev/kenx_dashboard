
/*************RANDOM GENERATOR FOR EXISTING ARRAYS*************/
window.choice = function() {
  if (!this.length || this.length == 0) return;
  if (this.length == 1) return this[0];
  return this[Math.floor(Math.random()*this.length)];
}

/******************RANDOM BOOLEAN GENERATOR********************/
function randomBoolean() {
  return Math.random()<.5; // Readable, succint
}

/******************ELIMINATE DUPLICATES************************/
function eliminateDuplicates(arr) {
  var i,
    len=arr.length,
    out=[],
    obj={};

  for (i = 0; i < len; i++) {
    obj[arr[i]] = 0;
  }
  for (i in obj) {
    out.push(i);
  }
  return out;
}

/********************CREATE RANDOM NUM*************************/
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**************************DATES********************************/
// ENCOUNTER TRANSACTION DATES
// KEEP THIS BECAUSE WE WANT A SET NUMBER OF ENCOUNTER TRANSACTIONS FOR THE WHOLE THING
var min = 10,
    max = 66,
    twoYearsAgo,
    tenYearsAgo,
    randomInt = getRandomInt(min, max),
    encountersDates = [],
    encountersTimes = [];

for(var i = encountersTimes.length; i < randomInt; i++) {
  var randomTenYear = Math.floor(Math.random() * (3650)),
      today = new Date(),
      twoYearsAgo = today - (730*86400000),
      tenYearsAgo = today - (3650*86400000),
      diff = today - (randomTenYear*86400000),
      randomDate = new Date(diff).toUTCString();

  encountersTimes.push(diff);
  encountersDates.push(randomDate);
}

/***************PROBLEM GENERATOR******************/
var Diagnosis = function(name, diagnosisDates) {
  this.name = name;
  this.diagnosisDates = diagnosisDates;
}

var diagnoses = [];
var diagnosis_0 = new Diagnosis('PPD Positive');
var diagnosis_1 = new Diagnosis('Major Depression');
var diagnosis_2 = new Diagnosis('Fat Fingers');
var diagnosis_3 = new Diagnosis('Bumpy Eyes');
var diagnosis_4 = new Diagnosis('Hurt Butt');
var diagnosis_5 = new Diagnosis('Scanty Collarbone');
var diagnosis_6 = new Diagnosis('Hurrtilitis');
var diagnosis_7 = new Diagnosis('Excessive Staring');
var diagnosis_8 = new Diagnosis('Lightning');
var diagnosis_9 = new Diagnosis('Heelllllooooo');
diagnoses.push(diagnosis_0, diagnosis_1, diagnosis_2, diagnosis_3, diagnosis_4, diagnosis_5, diagnosis_6, diagnosis_7, diagnosis_8, diagnosis_9);
var json_diagnoses = JSON.stringify(diagnoses);
var formattedDiagnoses = JSON.parse(json_diagnoses); // I did this extra stuff because d3 wasn't reading the generated javascript object format properly

/*********************MEDICATION GENERATOR******************/
var Medication = function(name) {
  this.name = name;
}

var medications = [];
var medication_0 = new Medication('Acetaminophen');
var medication_1 = new Medication('Albuterol');
var medication_2 = new Medication('Butanolol');
var medication_3 = new Medication('Citalopram');
var medication_4 = new Medication('Daprelide');
var medication_5 = new Medication('Lorazepam');
var medication_6 = new Medication('Miracle Drug');
var medication_7 = new Medication('Nasal Spray 400');
var medication_8 = new Medication('Prozac');
var medication_9 = new Medication('Identaloz');
medications.push(medication_0, medication_1, medication_2, medication_3, medication_4, medication_5, medication_6, medication_7, medication_8, medication_9);
var json_medications = JSON.stringify(medications);
var formattedMedication = JSON.parse(json_medications); // I did this extra stuff because d3 wasn't reading the generated javascript object format properly

/**********************ALLERGY GENERATOR*******************/
var Allergy = function(name) {
  this.name = name;
}
var allergies = [];
var allergy_0 = new Allergy('Erythromycin');
var allergy_1 = new Allergy('Ibuprofen');
var allergy_2 = new Allergy('Aspirin');
var allergy_3 = new Allergy('Naproxen');
allergies.push(allergy_0, allergy_1, allergy_2, allergy_3);
var json_allergies = JSON.stringify(allergies);
var formattedAllergies = JSON.parse(json_allergies); // I did this extra stuff because d3 wasn't reading the generated javascript object format properly

/**********************LAB GENERATOR***********************/
var Lab = function(name, ranges, measuresMin, measuresMax) {
  var min = 4,
      max = encountersTimes.length,
      numMeasures = getRandomInt(min, max),
      measures = [],
      dates = [];

  this.name = name;
  this.ranges = ranges;
  this.dates = dates;
  this.measures = measures;

  for(var i = 0; i < numMeasures; i++) {
    createMeasures(measuresMin, measuresMax);
    createDates();
  }

  function createMeasures(measuresMin, measuresMax) {
    var randomInt = getRandomInt(measuresMin, measuresMax);
    measures.push(randomInt);
  }
  function createDates() {
    var randomDate = window.choice.call(encountersTimes);
    dates.push(randomDate);
  }
}

var labs = [];

var weight = new Lab("Weight", [100,150,225,350], 100, 300);
var sysBP = new Lab("Sys BP", [100,120,140,160], 101, 150);
var diasBP = new Lab("Dias BP", [60,80,90,100], 61, 99);
var restingPulse = new Lab("Resting Pulse", [40,70,90,155], 45, 130);
var hgbA1C = new Lab("Hgb A1C", [4.0,5.6,6.4,7.0], 4.1, 6.0);
var cholesterol = new Lab("Cholesterol", [160,200,220,240], 161, 230);
var triglycerides = new Lab("Triglycerides", [0,150,199,499], 30, 350);

labs.push(weight, sysBP, diasBP, restingPulse, hgbA1C, cholesterol, triglycerides);
var json_labs = JSON.stringify(labs);
var formattedLabs = JSON.parse(json_labs); // I did this extra stuff because d3 wasn't reading the generated javascript object format properly

/**********************ENCOUNTER GENERATOR*****************/
var Encounter = function() {
  var encounterDiagnoses = [],
      minDiagnoses = 1,
      maxDiagnoses = 3,
      numDiagnoses = getRandomInt(minDiagnoses, maxDiagnoses);

  var encounterMedications = [],
      minMedications = 1,
      maxMedications = 9,
      numMedications = getRandomInt(minMedications, maxMedications);

  // var encounterAllergies = [],
  //     numAllergies = 0;

  var encounterTypes = ['ED', 'Inpatient', 'Outpatient'],
      randomEncounterType = window.choice.call(encounterTypes);

  // KEEP THIS BECAUSE WE WANT RANDOM NUMBERS FOR EACH ENCOUNTER
  var randomTenYear = Math.floor(Math.random() * (3650)),
      today = new Date(),
      diff = today - (randomTenYear*86400000),
      randomDate = new Date(diff).toUTCString();

  this.encounterDiagnoses = encounterDiagnoses;
  this.encounterMedications = encounterMedications;
  // this.labsOrdered = labsOrdered;
  // this.encounterAllergies = encounterAllergies;
  this.encounterType = randomEncounterType;
  this.date = diff;

  // Create a random number of randomly chosen diagnoses
  for(var i = 0; i < numDiagnoses; i++) {
    addDiagnoses();
  }
  function addDiagnoses() {
    var randomDiagnosis = window.choice.call(diagnoses);
    encounterDiagnoses.push(randomDiagnosis);
  }

  for(var i = 0; i < numMedications; i++) {
    addMedications();
  }
  function addMedications() {
    var randomMedication = window.choice.call(medications);
    encounterMedications.push(randomMedication);
  }
}

var encounters = [encountersTimes.length];
for(var i = 0; i < encountersTimes.length; i++) {
  var encounter = new Encounter();
  encounters[i] = encounter;
}
var json_encounters = JSON.stringify(encounters);
var formattedEncounters = JSON.parse(json_encounters); // I did this extra stuff because d3 wasn't reading the generated javascript object format properly


/***********************D3 ENCOUNTERS************************/
function tl() {
  var totalWidth = 1200,
      tlMargin = {top:0, right: 0, bottom: 50, left: 0},
      tlWidth = 1200,
      tlHeight = 150;

  var tl = d3.select('div#timeline').append('svg')
    .attr({
      class: 'timeline',
      width: totalWidth,
      height: tlHeight
    })
    .append('g');

  var tlX = d3.time.scale().domain([tenYearsAgo, today]).range([tlWidth * -5, tlWidth]),
      tlXAxis = d3.svg.axis()
        .ticks(25)
        .scale(tlX)
        .orient('bottom')
        .tickFormat(d3.time.format("%b-%y"));

  tl.append('g')
    tl.append('text')
      .attr({
        class: 'axis y',
        x: 0,
        y: 25
      })
      .text('ED');
    tl.append('text')
      .attr({
        class: 'axis y',
        x: 0,
        y: 55
      })
      .text('Inpatient');
    tl.append('text')
      .attr({
        class: 'axis y',
        x: 0,
        y: 85
      })
      .text('Outpatient');

  var initialTlEventAttrs = {
    class: 'circle',
    r: 8,
    cx: function(d) { return tlX(d.date) },
    cy: function(d) {
      if(d.encounterType === 'ED') {
        return 20;
      } else if(d.encounterType === 'Inpatient') {
        return 50;
      } else {
        return 80;
      }
    }
  }
  var tlEventAttrs = {
    r: 12
  }
  var tlEvent = tl.selectAll('circle')
    .data(encounters);

  tlEvent.enter().append('circle')
    .attr(initialTlEventAttrs)
    .on('mouseover', function(d, i) {
      d3.select(this).transition()
        .attr(tlEventAttrs);
      tl.append('text')
        .attr({
          id: 't' + d.date + i,
          fill: 'rgba(210,210,215, 0.85)',
          x: tlWidth - 130,
          y: 15
        })
        .text(function() {
          return d.date;
        })
    })
    .on('mouseout', function(d, i) {
      d3.select(this).transition()
        .attr(initialTlEventAttrs)
      d3.select('#t' + d.date + i).remove();
    });

  var sliderHeight = 120,
      sliderWidth = 5;

  var drag = d3.behavior.drag()
    .on('drag', dragmove);

// TODO - change ot make dot x
  var lastEncounter = null;
  $.each(encounters, function() {
    if (lastEncounter == null || $(this).date > lastEncounter) {
      lastEncounter = $(this);
    }
  });
  var lastCircle = null;
  $(".circle").each(function() {
    if (lastCircle == null || $(this).attr('cx') > lastCircle) {
      lastCircle = $(this).attr('cx');
    } 
  });
  var lastX = tlX(lastEncounter.date);
  var sliderG = tl.append('g')
    .data([{x: lastCircle + 10, y: 10}]);  // tlWidth

  var slider = sliderG.append('rect')
    .attr({
      class: 'slider',
      x: function(d) { return d.x - 5; },
      y: function(d) { return d.y; },
      width: sliderWidth,
      height: sliderHeight,
      'cursor': 'move'
    })
    .call(drag);

  //if slider crosses a circle, show the contents of that circle, with date

  tl.append('g')
    .attr({
      class: 'axis',
      transform: 'translate(0, 100)'
    })
    .call(tlXAxis);

  tl.selectAll('.axis path')
    .attr('stroke-weight', 1);

  function dragmove(d) {
    slider
      .attr('x', d.x = Math.max(0, Math.min(tlWidth - 5, d3.event.x)));
  }
};
tl();
/***************************D3 PROBLEMS*****************************/
var diagnosisDates = function(encounters) { 
  if(diagnoses.name === this.encounterDiagnoses) {
    return this.date;
  } 
}
diagnoses = d3.select('div#diagnoses').selectAll('svg.diagnosis')
  .data(diagnoses)
  .enter().append('svg')
    .attr({
      class: 'diagnosis',
      height: 25,
      transform: 'translate(0,-25)'
    });

var diagnosisInfo = diagnoses.append('g');

diagnosisInfo.append('text')
  .attr({
    class: 'itemName',
    transform: 'translate(0, 15)'
  })
  .text(function(d) { return d.name });

/************************D3 MEDICATIONS*****************************/
medications = d3.select('div#medications').selectAll('svg.medication')
  .data(medications)
  .enter().append('svg')
    .attr({
      class: 'medication',
      height: 25,
      transform: 'translate(0, -25)'
    });

var medicationInfo = medications.append('g');

medicationInfo.append('text')
  .attr({
    class: 'itemName',
    transform: 'translate(0, 15)'
  })
  .text(function(d) { return d.name });

/************************D3 ALLERGIES******************************/
allergies = d3.select('div#allergies').selectAll('svg.allergy')
  .data(allergies)
  .enter().append('svg')
    .attr({
      class: 'allergy',
      height: 25,
      transform: 'translate(0, -25)'
    });

var allergyInfo = allergies.append('g');

allergyInfo.append('text')
  .attr({
    class: 'itemName',
    transform: 'translate(0, 15)'
  })
  .text(function(d) { return d.name });

/************************D3 LABS*********************************/
var bMargin = {top:50, right: 0, bottom: 50, left: 100},
    bWidth = 100,
    bHeight = 20;

labs = d3.select('div#labs').selectAll('svg.bullet')
  .data(formattedLabs)
  .enter().append('svg')
    .attr({
      class: 'bullet',
      width: bWidth + bMargin.left + bMargin.right,
      height: bHeight + bMargin.top
    })
    .append('g')
      .attr('transform', 'translate(0,30)');

labs.each(function(d, i) {
  ranges = function(d) { return d.ranges },
  dates = function(d) { return d.dates },
  measures = function(d) { return d.measures };

  var thresholdz = ranges.call(this, d, i).slice().sort(d3.descending),
      min = ranges.call(this, d, i).shift(),
      max = ranges.call(this, d, i).pop(),
      lowerMax = ranges.call(this, d, i).pop(),
      measurez = measures.call(this, d, i).slice(),
      g = d3.select(this);

  var bRange = d3.scale.linear().domain([min, max]).range([0, bWidth]);

   // Threshold rects.
  var threshold = g.selectAll('rect.threshold')
    .data(thresholdz);

  threshold.enter().append('rect')
    .attr({
      class: function(d, i) { return 'threshold s' + i },
      width: function(d, i) { return bRange(d) },
      height: bHeight,
      x: 0
    });

  threshold.enter().append('text')
    .attr({
      class: 'tick',
      x: function(d) { return bRange(d) },
      y: function(d) { return bHeight + 10 },
      'text-anchor': function(d, i) {
        if(i === 0) { return 'end' } else { return 'start' };
      }
    })
    .text(function(d) { return d });

  // Measure rects.
  var measure = g.selectAll('rect.measure')
    .data(measurez.slice(-1));

  measure.enter().append('rect')
    .attr('class', function(d, i) {
      if(d >= lowerMax) { 
        return 'measure b'; 
      } else { 
        return 'measure s'; 
      };
    })
    .attr({
      width: function(d, i) { return bRange(d) },
      height: bHeight/3,
      x: 0,
      y: bHeight/3
    });

  measure.enter().append('text')
    .attr({
      x: function(d) { return bRange(d) + 10 },
      y: function(d) { return bHeight - 5 },
      fill: 'rgba(255,255,255,0.8)',
      'font-size': '1.4em',
      'font-weight': 'bold'
    })
    .text(function(d) { return d });
});

// Name
var labName = labs.append('g')
  // .style('text-anchor', 'start')
  .attr('transform', 'translate(0,-18)');

labName.append('text')
  .attr('class', 'title')
  .text(function(d) { return d.name; });

labName.append('text')
  .attr({
    class: 'date',
    y: 12
  })
  .text(function(d) { 
    var formatDate = d3.time.format('%d-%b-%y');
    var lastDate = d.dates.slice(-1).pop();
    return d.dates.slice(-1).pop();
  });
