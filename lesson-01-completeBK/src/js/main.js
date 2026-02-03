// main.js
/* 
When a browser loads HTML, it turns it into a structure called the DOM. 
JavaScript does not talk directly to HTML—it talks to the DOM
*/


// --------------------------------------------------
// STEP 1: Select DOM elements ONCE
// --------------------------------------------------


// Grab references to the main UI elements.
// These IDs should already exist in index.html.

// TODO: Select the main todo list container

// TODO: Select the output area for text and messages

// TODO: Select the Run Demo button

// TODO: Select the Clear button

const list = document.querySelector('#todo-list');
const output = document.querySelector('#output');
//const btnRun = document.querySelector('#btn-run');
const btnClear = document.querySelector('#btn-clear');
const btnRun = document.getElementById("btn-run");

///   document → represents the web page
///   getElementById() → finds one specific element
///   We store elements in variables so we don’t keep searching again
///   The main difference is that document.getElementById()
///   only selects a single element by its unique id attribute,
///   whereas document.querySelector()
///   can select a single element using any valid CSS selector (ID, class, tag name, attribute, etc.). 

/*
const list = document.getElementById("todo-list");
const output = document.getElementById("output");
const btnRun = document.getElementById("btn-run");
const clearBtn = document.getElementById("btn-clear");
const addBtn = document.getElementById("btn-add");
const taskInput = document.getElementById("txt-task");
*/


// --------------------------------------------------
// STEP 2: Variables and template strings
// --------------------------------------------------


// Create a constant and a variable, then display
// them using a template string.
// const → value does NOT change
// let   → value MAY change later

// TODO: Create a constant named course
const course = 'SDEV2150';
// TODO: Create a variable named topic
let topic = 'JavaScript review';
// TODO: Use a template string to display both values
// Cleaner than string concatenation, ${} inserts variables

output.innerHTML = `<p>Course: ${course} | Topic: ${topic}</p>`;
// Listen for a click on the "Run Demo" button

/*
btnRun.addEventListener("click", () => {
  // Append content to the output area
  // We use += so existing output is NOT removed
  output.innerHTML += `
    <div class="mb-2">
      <p><strong>Course:</strong> ${course}</p>
      <p><strong>Topic:</strong> ${topic}</p>
    </div>
  `;
});
*/


// --------------------------------------------------
// STEP 3: Functions and return values
// --------------------------------------------------

///  Inputs → parameters
///  Output → return value
///  Functions prevent repetition


// Write a function that adds two numbers and
// another function that formats a label/value pair.

// TODO: Create a function add(a, b)
// declared function
function add(a, b) {
  return a + b;
}


// TODO: Create an arrow function formatResult(label, value)
// arrow function:are shorter, Common in modern JS & React. 
/// The basic syntax removes the function keyword and adds an arrow (=>) after the parameters. 
/// function(a, b) {return a * b} can be replace by (a, b) => a * b;

const formatResult = (label, value) => {
  return `${label}: ${value}`;
}

output.innerHTML += `<p>${formatResult('2 + 3', add(2, 3))}</p>`;

// TODO: Call the functions and display the result

/*
btnRun.addEventListener("click", () => {
 output.innerHTML += `<p>${formatResult('2 + 3', add(2, 3))}</p>`;
});
*/


// --------------------------------------------------
// STEP 4: Arrays, objects, and iteration
// --------------------------------------------------


// Create an array of task objects and count
// how many are marked as done.

// TODO: Create an array named tasks
// Each task should have: title (string), done (boolean)

/// An array is a list that stores multiple values in order.

const tasks = [
  { title: 'Install dependencies', done: true },
  { title: 'Run dev server', done: true },
  { title: 'Complete the demo', done: false },
];

/// tasks is an array, It holds multiple items, Each item represents one task
/// An object groups related data using key–value pairs.
/// Why objects?: Because one task has multiple attributes, not just one value.
/// Array of Objects (Very Common Pattern): 
/// Each array element is a complete task, You can add more properties later:
/// { title: "Study JS", done: false, priority: "high" }

// TODO: Use a loop to count completed tasks

let completedCount = 0;

for (const task of tasks) {
  if (task.done) completedCount++;
}

// TODO: Display: "Completed: X of Y"

output.innerHTML +=`Completed: ${completedCount} of ${tasks.length}`;

/*
btnRun.addEventListener("click", () => {
output.innerHTML +=`Completed: ${completedCount} of ${tasks.length}`;
});

*/


// --------------------------------------------------
// STEP 5: Problem solving – build HTML from data
// --------------------------------------------------


// Build a function that converts the tasks array
// into an HTML list using a loop.

// TODO: Create a function renderTaskList(items)
// - Start with '<ul>'
// - Loop over items
// - Add <li> elements with a class of 'done' or 'todo'
// - Close the list and return the string
function renderTaskList(items) {
  let html = '<ul>';
  for (const item of items) {
    const status = item.done ? 'done' : 'todo';
    html += `<li class="${status}">${item.title}</li>`;
  }
  html += '</ul>';
  return html;
}
// TODO: Render the task list inside the list container
list.innerHTML = renderTaskList(tasks);


/// Separation of concerns means: Each part of your code has one clear responsibility.
/// What this function does: Takes data (items), Converts data into HTML, Returns HTML as a string
/// It adapts automatically when data changes

// --------------------------------------------------
// STEP 6: DOM manipulation with createElement
// --------------------------------------------------
// Create and append elements instead of using innerHTML.
// This avoids innerHTML and is safer for dynamic content

// TODO: Create a function addMessage(message)
// - Create a <p> element
// - Set its textContent
// - Append it to the output element
function addMessage(message) {
  const p = document.createElement('p');
  p.textContent = message;
  output.appendChild(p);
}


/// createElement() builds real DOM nodes, 
// textContent is safer than innerHTML
// Used when content is user-generated
//  Thumb rule: User input → textContent, Static / trusted HTML → innerHTML
// Using innerHTML with user input is like: letting a stranger write on your website’s wall
// Using textContent is like: printing their message inside quotes
///





// TODO: Test the addMessage function
addMessage('This message was appended with createElement');



// --------------------------------------------------
// STEP 7: Events – connect UI to behavior
// --------------------------------------------------
// Wire the buttons to functions that update the UI.


// TODO: Create a function runDemo()
// - Clear output
// - Add a few messages
// - Render the task list


function runDemo() {
  output.innerHTML = '';
  addMessage('Running demo...');
  let X =  `Course: ${course} | Topic: ${topic}`;
  addMessage(X);
  addMessage(formatResult('5 + 8', add(5, 8)));
  list.innerHTML = renderTaskList(tasks);
}



// TODO: Create a function clearUI()
// - Clear both output and todo list containers
function clearUI() {
  output.innerHTML = '';
  list.innerHTML = '';
}


// TODO: Add click listeners for btnRun and btnClear


btnRun.addEventListener('click', runDemo);///One button → one main function → many actions
btnClear.addEventListener('click', clearUI);


// --------------------------------------------------
// STEP 8: Mini extension – Adding tasks
// --------------------------------------------------


const txtTask = document.getElementById('txt-task');
const btnAdd = document.getElementById('btn-add');

btnAdd.addEventListener('click', () => {
  const title = txtTask.value.trim();
  if (!title) return;

  tasks.push({ title, done: false });
  list.innerHTML = renderTaskList(tasks);
  //txtTask.value = '';
});
// --------------------------------------------------
// STEP 9: Student Exercise
// --------------------------------------------------
// Complete these AFTER the demo:

// 1. Create a function toggleDone(title)
//    - Find a task by title
//    - Flip its done value (true/false)

// 2. Update renderTaskList() to show '(done)' or '(todo)'

// 3. Add event delegation to the <ul>
//    - When a list item is clicked:
//      * Toggle the task
//      * Re-render the list

// 4. Stretch goals:
//    - Display a chekcbox next to each task to represent done/todo 
//      (checking/unchecking it toggles the state)
//    - Update the UI so that pressing enter in the text input adds 
//      the task (notice we aren't using a form
//    - Display a summary line above the list
//      e.g. "Completed: 2 of 3"
