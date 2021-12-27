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

  // if there are no results, let the user know
  var results = document.getElementById("results");
  if (results.childElementCount == 0) {
    writeToModal("No results found :(", "result");
  } 
  
  // toggle modal
  $('#myModal').modal('toggle');
  $(".modal-backdrop").remove();

}

function calculateResults(a, b, c, d) {

  // a . b . c . d
  // writeToModal("Sitch 1 (for testing purposes)", "result");
  sitchOne([a, b, c, d], 1, a, a);

  // a . b . c . d
  // writeToModal("Sitch 1 (negative) (for testing purposes)", "result");
  sitchOne([-a, b, c, d], 1, `-${a}`, -a);
  
  // a . (b . c) . d
  // writeToModal("Sitch 2 (for testing purposes)", "result");
  sitchTwo([a, (b+c), d], 0, `(${b} + ${c})`, b+c);
  sitchTwo([a, (b*c), d], 0, `(${b} x ${c})`, b*c);
  sitchTwo([a, (b-c), d], 0, `(${b} - ${c})`, b-c);
  if (c != 0) {
    sitchTwo([a, (b/c), d], 0, `(${b} / ${c})`, b/c);
  }
  
  // a . b . (c . d)
  // writeToModal("Sitch 3 (for testing purposes)", "results");
  sitchThree([a, b, (c+d)], 0, "", 0, `(${c} + ${d})`);
  sitchThree([a, b, (c*d)], 0, "", 0, `(${c} x ${d})`);
  sitchThree([a, b, (c-d)], 0, "", 0, `(${c} - ${d})`);
  if (c != 0) {
    sitchThree([a, b, (c/d)], 0, "", 0, `(${c} / ${d})`);
  }
  
  // a . ((b . c) . d)
  // writeToModal("Sitch 4 (for testing purposes)", "results");
  sitchFour([a, (b+c), d], 0, `(${b} + ${c})`, 0);
  sitchFour([a, (b*c), d], 0, `(${b} x ${c})`, 0);
  sitchFour([a, (b-c), d], 0, `(${b} - ${c})`, 0);
  if (c != 0) {
    sitchFour([a, (b/c), d], 0, `(${b} / ${c})`, 0);
  }

}

// a . b . c . d
function sitchOne(nums, iter, string, ans) {

  if (iter == 4) {
    if (ans == 10) {

      // console.log(string);
      writeToModal(string, "result");

    } else {

      return;
    }

  } else {

    sitchOne(nums, iter+1, `(${string} + ${nums[iter]})`, ans + nums[iter]);
    sitchOne(nums, iter+1, `(${string} - ${nums[iter]})`, ans - nums[iter]);
    sitchOne(nums, iter+1, `(${string} x ${nums[iter]})`, ans * nums[iter]);

    if (nums[iter] != 0) {
      sitchOne(nums, iter+1, `(${string} / ${nums[iter]})`, ans / nums[iter]);
    }
  }
}

// a . (b . c) . d
function sitchTwo(nums, iter, string, ans) {

  // a to b . c
  if (iter == 0) {

    sitchTwo(nums, iter+1, `(${nums[0]} + ${string})`, nums[0] + ans);
    sitchTwo(nums, iter+1, `(${nums[0]} - ${string})`, nums[0] - ans);
    sitchTwo(nums, iter+1, `(${nums[0]} x ${string})`, nums[0] * ans);

    if (nums[iter] != 0) {
      sitchTwo(nums, iter+1, `(${nums[0]} / ${string})`, nums[0] / ans);
    }

  // a . (b . c) to d
  } else if (iter == 1) {

    sitchTwo(nums, iter+1, `(${string} + ${nums[2]})`, ans + nums[2]);
    sitchTwo(nums, iter+1, `(${string} - ${nums[2]})`, ans - nums[2]);
    sitchTwo(nums, iter+1, `(${string} x ${nums[2]})`, ans * nums[2]);

    if (nums[iter] != 0) {
      sitchTwo(nums, iter+1, `(${string} / ${nums[2]})`, ans / nums[2]);
    }

  } else {

    if (ans == 10) {
      writeToModal(string, "result");

    } else {
      return;

    }
  }
}

// a . b . (c . d)
function sitchThree(nums, iter, string, ans, endString) {

   // a to b
   if (iter == 0) {

    sitchThree(nums, iter+1, `(${nums[0]} + ${nums[1]})`, nums[0] + nums[1], endString);
    sitchThree(nums, iter+1, `(${nums[0]} - ${nums[1]})`, nums[0] - nums[1], endString);
    sitchThree(nums, iter+1, `(${nums[0]} x ${nums[1]})`, nums[0] * nums[1], endString);

    if (nums[iter+1] != 0) {
      sitchThree(nums, iter+1, `(${nums[0]} / ${nums[1]})`, nums[0] / nums[1], endString);
    }

  // a . b to (c . d)
  } else if (iter == 1) {

    var endVal = nums[2];

    sitchThree(nums, iter+1, `(${string} + ${endString})`, ans + endVal, endString);
    sitchThree(nums, iter+1, `(${string} - ${endString})`, ans - endVal, endString);
    sitchThree(nums, iter+1, `(${string} x ${endString})`, ans * endVal, endString);

    if (endVal != 0) {
      sitchThree(nums, iter+1, `(${string} / ${endString})`, ans / endVal, endString);
    }

  } else {

    if (ans == 10) {
      writeToModal(string, "result");

    } else {
      // console.log(`Sitch 3 failed at ${ans}`);
      return;

    }
  }

}

// sitchFour([a, (b+c), d], 0, `(${b} + ${c})`, 0);
// sitchFour([a, (b*c), d], 0, `(${b} x ${c})`, 0);
// sitchFour([a, (b-c), d], 0, `(${b} - ${c})`, 0);
// if (c != 0) {
//   sitchFour([a, (b/c), d], 0, `(${b} / ${c})`, 0);
// }

// // a . ((b . c) . d)
function sitchFour(nums, iter, string, ans) {

  // (b . c) to d
  if (iter == 0) {

    sitchFour(nums, iter+1, `(${string} + ${nums[2]})`, nums[1] + nums[2]);
    sitchFour(nums, iter+1, `(${string} - ${nums[2]})`, nums[1] - nums[2]);
    sitchFour(nums, iter+1, `(${string} x ${nums[2]})`, nums[1] * nums[2]);

    if (nums[2] != 0) {
      sitchFour(nums, iter+1, `(${string} / ${nums[2]})`, nums[1] / nums[2]);
    }

  // a to (b . c) . d
  } else if (iter == 1) {

    sitchFour(nums, iter+1, `(${nums[0]} + ${string})`, nums[0] + ans);
    sitchFour(nums, iter+1, `(${nums[0]} - ${string})`, nums[0] - ans);
    sitchFour(nums, iter+1, `(${nums[0]} x ${string})`, nums[0] * ans);

    if (ans != 0) {
      sitchFour(nums, iter+1, `(${nums[0]} / ${string})`, nums[0] / ans);
    }

  } else {

    
    if (ans == 10) {
      writeToModal(string, "result");

    } else {
      // console.log(`Sitch 4 failed at ${ans}`);
      return;
    }

  }
}