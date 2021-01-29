// $(window).on('load',function(){
//   $('#exampleModalCenter').modal('show');
// });

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

function initForm() {

  $("#trainForm").submit(function(e) {
    e.preventDefault();
  });

}

function writeToModal(string, classOfString) {

  var newResult = document.createElement("li");
  newResult.className = classOfString;
  var newResultValue = document.createTextNode(string);
  newResult.appendChild(newResultValue);
  var results = document.getElementById("results");
  results.appendChild(newResult);

}

// after the form is submitted, this function retrieves the numbers from the form and then clears the numbers from the form, clears previously filled in results from the modal, calls the calculating functions to print the numbers in the modal and then toggles the modal on.  
function submitNums(cur) {

  // clear any previous results in modal
  var modalList = document.getElementById("results");
  var children = modalList.children;
  while (children.length > 0) {
    children[0].remove();
  }

  // retrieve numbers from form
  var a = parseInt(cur.num0.value);
  var b = parseInt(cur.num1.value);
  var c = parseInt(cur.num2.value);
  var d = parseInt(cur.num3.value);

  // clear numbers from form
  document.getElementById("num0").value = null;
  document.getElementById("num1").value = null;
  document.getElementById("num2").value = null;
  document.getElementById("num3").value = null;

  // add numbers to modal title?

  // calculate results
  var nums = [a, b, c, d];
  sitch_one(nums, 1, a, a);
  // sitch_two(nums, 0, "", 0);
  // sitch_three(nums, 0, "", 0);
  // sitch_four(nums, 0, "", 0);
  
  // toggle modal
  $('#myModal').modal('toggle');
  $(".modal-backdrop").remove();

}

// a . b . c . d
function sitch_one(nums, i, string, ans) {

  if (i == 4) {
    if (ans == 10) {

      // console.log(string);
      writeToModal(string, "result");

    } else {

      return;
    }

  } else {

    sitch_one(nums, i+1, `${string} + ${nums[i]}`, ans + nums[i]);
    sitch_one(nums, i+1, `${string} - ${nums[i]}`, ans - nums[i]);
    sitch_one(nums, i+1, `${string} x ${nums[i]}`, ans * nums[i]);

    if (nums[i] != 0) {
      sitch_one(nums, i+1, `${string} / ${nums[i]}`, ans / nums[i]);
    }
  }
}

// // a . (b . c) . d -->
// function sitch_two(nums, i, string, cur) {
//
// }
//
// // a . b . (c . d)
// function sitch_three(nums, i, string, cur) {
//
// }
//
// // a . ((b . c) . d)
// function sitch_four(nums, i, string, cur) {
//
// }