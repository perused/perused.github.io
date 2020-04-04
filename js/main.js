// using .onkeydown, go to previous input box
function goBack(cur, prevNo) {
  var key = event.keyCode || event.charCode;

  var curLength = cur.value.length;

  if (curLength == 1) {
    cur.value = "";

  } else if( (key == 8 || key == 46) && prevNo != -1 ) {
    // focus on previous input box
    document.getElementById("num" + prevNo).focus();
  }

  return;
}

// using .onKeyUp, validate input and go to next input box
function validate(cur, nextNo) {

  var focusNext = true;

  if (cur.value == "." || cur.value == "-" || cur.value == null) {
    cur.value = "";
    focusNext = false;
  }

  cur.value = cur.value.substring(0, 1);

  if (cur.value.length == 1 && focusNext == true) {
    document.getElementById("num" + nextNo).focus();
  }

  return;
}

function submitNums(cur) {

  var a = parseInt(cur.num0.value);
  var b = parseInt(cur.num0.value);
  var c = parseInt(cur.num0.value);
  var d = parseInt(cur.num0.value);


  console.log(cur);

}