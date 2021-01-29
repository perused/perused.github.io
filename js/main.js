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

  // not working, why not?
  // add numbers to modal title
  // document.getElementById("myModalLabel").value = "Results for " + cur.num0.value + ", " + cur.num1.value + ", " + cur.num2.value + ", " + cur.num3.value; 

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

  // calculate results
  calculateResults(a, b, c, d);
  
  // toggle modal
  $('#myModal').modal('toggle');
  $(".modal-backdrop").remove();

}

function calculateResults(a, b, c, d) {

  // a . b . c . d
  writeToModal("Sitch 1 (for testing purposes)", "result");
  sitchOne([a, b, c, d], 1, a, a);
  
  // a . (b . c) . d
  writeToModal("Sitch 2 (for testing purposes)", "result");
  sitchTwo([a, (b+c), d], 0, `(${b} + ${c})`, b+c);
  sitchTwo([a, (b*c), d], 0, `(${b} * ${c})`, b*c);
  sitchTwo([a, (b-c), d], 0, `(${b} - ${c})`, b-c);
  if (c != 0) {
    sitchTwo([a, (b/c), d], 0, `(${b} / ${c})`, b/c);
  }
  
  // a . b . (c . d)
  writeToModal("Sitch 3 (for testing purposes)", "results");
  sitchThree([a, b, (c+d)], 0, "", 0, `(${c} + ${d})`, c+d);
  sitchThree([a, b, (c*d)], 0, "", 0, `(${c} * ${d})`, c*d);
  sitchThree([a, b, (c-d)], 0, "", 0, `(${c} - ${d})`, c-d);
  if (c != 0) {
    sitchThree([a, b, (c/d)], 0, "", 0, `(${c} / ${d})`, c/d);
  }
  
  // a . ((b . c) . d)
  // writeToModal("Sitch 4 (for testing purposes)", "results");
  // sitchFour(nums, 0, "", 0);

}

// a . b . c . d
function sitchOne(nums, i, string, ans) {

  if (i == 4) {
    if (ans == 10) {

      // console.log(string);
      writeToModal(string, "result");

    } else {

      return;
    }

  } else {

    sitchOne(nums, i+1, `(${string} + ${nums[i]})`, ans + nums[i]);
    sitchOne(nums, i+1, `(${string} - ${nums[i]})`, ans - nums[i]);
    sitchOne(nums, i+1, `(${string} x ${nums[i]})`, ans * nums[i]);

    if (nums[i] != 0) {
      sitchOne(nums, i+1, `(${string} / ${nums[i]})`, ans / nums[i]);
    }
  }
}

// a . (b . c) . d
function sitchTwo(nums, i, string, ans) {

  // a to b . c
  if (i == 0) {

    sitchTwo(nums, i+1, `(${nums[i]} + ${string})`, nums[i] + ans);
    sitchTwo(nums, i+1, `(${nums[i]} - ${string})`, nums[i] - ans);
    sitchTwo(nums, i+1, `(${nums[i]} x ${string})`, nums[i] * ans);

    if (nums[i] != 0) {
      sitchTwo(nums, i+1, `(${nums[i]} / ${string})`, nums[i] / ans);
    }

  // a . (b . c) to d
  } else if (i == 1) {

    sitchTwo(nums, i+1, `(${string} + ${nums[i]})`, ans + nums[i]);
    sitchTwo(nums, i+1, `(${string} - ${nums[i]})`, ans - nums[i]);
    sitchTwo(nums, i+1, `(${string} x ${nums[i]})`, ans * nums[i]);

    if (nums[i] != 0) {
      sitchTwo(nums, i+1, `(${string} / ${nums[i]})`, ans / nums[i]);
    }

  } else {

    if (ans == 10) {
      writeToModal(string, "result");

    } else {
      return;

    }
  }
}

// // a . b . (c . d)
function sitchThree(nums, i, string, ans, endString, endVal) {

   // a to b
   if (i == 0) {

    sitchThree(nums, i+1, `(${nums[i]} + ${nums[i+1]})`, nums[i] + nums[i+1], endString, endVal);
    sitchThree(nums, i+1, `(${nums[i]} - ${nums[i+1]})`, nums[i] - nums[i+1], endString, endVal);
    sitchThree(nums, i+1, `(${nums[i]} x ${nums[i+1]})`, nums[i] * nums[i+1], endString, endVal);

    if (nums[i] != 0) {
      sitchThree(nums, i+1, `(${nums[i]} / ${nums[i+1]})`, nums[i] / nums[i+1], endString, endVal);
    }

  // a . b to (c . d)
  } else if (i == 1) {

    sitchThree(nums, i+1, `(${string} + ${endString})`, ans + endVal, endString, endVal);
    sitchThree(nums, i+1, `(${string} - ${endString})`, ans - endVal, endString, endVal);
    sitchThree(nums, i+1, `(${string} x ${endString})`, ans * endVal, endString, endVal);

    if (nums[i] != 0) {
      sitchThree(nums, i+1, `(${string} / ${endString})`, ans / endVal, endString, endVal);
    }

  } else {

    if (ans == 10) {
      writeToModal(string, "result");

    } else {
      return;

    }
  }

}

// // a . ((b . c) . d)
// function sitchFour(nums, i, string, ans) {

//   if (i == 4) {
//     if (ans == 10) {

//       // console.log(string);
//       writeToModal(string, "result");

//     } else {

//       return;
//     }

//   } else {

//     sitchFour(nums, i+1, `(${string} + ${nums[i]})`, ans + nums[i]);
//     sitchFour(nums, i+1, `(${string} - ${nums[i]})`, ans - nums[i]);
//     sitchFour(nums, i+1, `(${string} x ${nums[i]})`, ans * nums[i]);

//     if (nums[i] != 0) {
//       sitchFour(nums, i+1, `(${string} / ${nums[i]})`, ans / nums[i]);
//     }
//   }

// }