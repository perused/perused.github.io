// using .onkeydown, go to previous input box
function goBack(cur, prevNo) {
  var key = event.keyCode || event.charCode;

  var curLength = cur.value.length;

  if (curLength == 1) {
    cur.value = "";
    // return;

  } else if (prevNo == -1) {
    return;

  } else if( key == 8 || key == 46 ) {
    // focus on previous input box
    var prevId = "num" + prevNo;
    var prev = document.getElementById(prevId);
    prev.focus();
  }
}

function validate(cur, nextNo) {

  var focusNext = true;

  if (cur.value == "." || cur.value == "-" || cur.value == null) {
    cur.value = "";
    focusNext = false;
  }

  cur.value = cur.value.substring(0, 1);

  var curLength = cur.value.length;

  if (curLength == 1 && focusNext == true) {
    nextFocus(cur, nextNo);
  }

  return;
}

function nextFocus(cur, nextNo) {

  nextNo = parseInt(nextNo);
  var nextId;
  var next;

  nextId = "num" + nextNo; // submit is num4
  next = document.getElementById(nextId);
  next.focus();

}