DragElement(document.getElementById("welcome"));
function DragElement(element) {
    var initialX=0;
    var initialY=0;
    var currentX=0;
    var currentY=0;
    if (document.getElementById(element.id + "header")) {
        document.getElementById(element.id + "header").onmousedown= startDragging;
    } else {
        element.onmousedown= startDragging;
    }  
    function startDragging(e) {
        e= e || window.event;
        e.preventDefault();
        initialX= e.clientX;
        initialY= e.clientY;
        document.onmouseup= stopDragging;
        document.onmousemove= moveElement;
    }
    function moveElement(e) {
        e= e || window.event;
        e.preventDefault();
        currentX= initialX - e.clientX;
        currentY= initialY - e.clientY;
        initialX= e.clientX;
        initialY= e.clientY;
        element.style.top= (element.offsetTop - currentY) + "px";
        element.style.left= (element.offsetLeft - currentX) + "px";
    }
    function stopDragging() {
        document.onmouseup= null;
        document.onmousemove= null;
    }
}
var welcomeScreen = document.querySelector("#welcome")
function closeWindow(element) {
  element.style.display = "none"
}
function openWindow(element) {
    element.style.display = "block"
    }
var welcomeScreenClose = document.querySelector("#welcomeclose")

var welcomeScreenOpen = document.querySelector("#welcomeopen")
welcomeScreenClose.addEventListener("click", function() {
    closeWindow(welcomeScreen);
});
welcomeScreenOpen.addEventListener("click", function() {
    openWindow(welcomeScreen);
});

var selectedIcon = undefined;
function selectIcon(element) {
    element.classList.add("selected");
    selectedIcon = element;
}
function deselectIcon(element) {
    element.classList.remove("selected");
    if (selectedIcon === element) {
    selectedIcon = undefined;
}
}
function handleIconTap(element) {
    if (selectedIcon === element) {
        deselectIcon(element);
    } else {
        if (selectedIcon) {
            deselectIcon(selectedIcon);
        }
        selectIcon(element);
    }
}
var notesScreen = document.querySelector("#notes")
var notesScreenClose = document.querySelector("#notesclose")

if (notesScreen) {
    DragElement(notesScreen);
}
window.openNoteswindow = function() {
    openWindow(notesScreen);

}
if (notesScreenClose) {
    notesScreenClose.addEventListener("click", function() {
        closeWindow(notesScreen);
    });
}
var clockScreen = document.querySelector("#clock")
var clockScreenClose = document.querySelector("#clockclose")
if (clockScreen) {
    DragElement(clockScreen);
}
window.openClockwindow = function() {
    openWindow(clockScreen);
}
if (clockScreenClose) {
    clockScreenClose.addEventListener("click", function() {
        closeWindow(clockScreen);
    });
}
function updateAppClock() {
    var now = new Date();
    var timestring = now.toLocaleTimeString();
    var dateString = now.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' });

    var clockDisplay = document.querySelector("#appDigitalClock");
    var dateDisplay = document.querySelector("#appDigitalDate");
    if (clockDisplay) clockDisplay.innerText = timestring;
    if (dateDisplay) dateDisplay.innerText = dateString;
}
setInterval(updateAppClock, 1000);
updateAppClock();

var alarmTimeout=null;
window.setAppAlarm = function() {
    var secondsInput = document.querySelector("#alarmSeconds");
    var statusText = document.querySelector("#alarmStatus");
    if(!secondsInput || !statusText) return;
    var seconds = parseInt(secondsInput.value);
    if (isNaN(seconds) || seconds <= 0) {
        statusText.innerText = "Please enter a valid number of seconds.";
        return;
    }
    if (alarmTimeout) {
        clearTimeout(alarmTimeout);
    }
    statusText.innerText = "Alarm set for " + seconds + " seconds !";
    secondsInput.value = "";
    alarmTimeout = setTimeout(function() {
        statusText.innerText = "Alarm!";
        alert("Alarm!");
    }, seconds * 1000);
};

 