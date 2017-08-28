(function(){
//variables for page to work
  let submitButton = $("#submit-button");
  let skipButton = $("#skip-button");
  let questionButton = $(".question");
  let rnd1Button = $("#rnd1-button");
  let rnd2Button = $("#rnd2-button");
  let rnd3Button = $("#rnd3-button");
  let inputWindow = $("#info");
  let questionNum = 0;
  let score = 0;
  let tempQuestion = "";
  let tempAnswer = "";
  let tempValue = 0;
  let createId = "";
  let category1, category2, category3, category4, category5, category6, category7, category8, category9, category10, category11, category12, category13, category14, category15;

//Subjects hold information about category in order to do http calls and updates
  function Subject(name, index, num) {
    this.name=name;
    this.num=num;
    this.index=index;
    this.apiUrl="http://jservice.io/api/clues?count=5&category=" + index;
  }
  //these are the initial categories for the game
  category1 = new Subject("Herbs & Spice Girls", 3764,1);//creates new Subject object
      $("#cat1").html(category1.name);//set category name on board
  category2 = new Subject("British Fictional Characters", 3723, 2);
      $("#cat2").html(category2.name);
  category3 = new Subject("Let Your Geek Flag Fly", 10270, 3);
      $("#cat3").html(category3.name);
  category4 = new Subject("Super Heroes", 58, 4);
      $("#cat4").html(category4.name);
  category5 = new Subject("'90s Movie Lines", 7363, 5);
      $("#cat5").html(category5.name);
  categories = [category1, category2, category3, category4, category5];
  rnd1Button.attr("disabled", "disabled");//disable button for future use
  rnd3Button.attr("disabled", "disabled");//disable button until rnd 2 is selected

//extra categories for second and third rounds
category6 = new Subject("On My Dog's Ipod", 13717, 6);
category7 = new Subject("Tv's Comic Book Heroes", 4902, 7);
category8 = new Subject("Movie Heroes", 1882, 8);
category9 = new Subject("Marvelous Marvel", 9546, 9);
category10 = new Subject("That's So '90s", 7300, 10);
category11 = new Subject("No. 1 Hits Of The '90s", 4177, 11);
category12 = new Subject("'90s Sitcoms", 5489, 12);
category13 = new Subject("Films Of The '90s", 1012, 13);
category14 = new Subject("British Bands", 11891, 14);
category15 = new Subject("British Fictional Characters", 3723, 15);

  //return subject based off of question category selected
  function getSubject(tempNum) {
    for(let i = 0; i < categories.length; i++){
      if(categories[i].num==tempNum){
        return categories[i];
      }
    }
  }


  $(function(){


    //hit the api endpoint and put the question in the div with the id of question and answer
    questionButton.click(function(){
      let temp=this.id.slice();
      //get category and question indexes based on question selected
      if(temp.length==5){//for items in category 10+
          createId=this.id.slice();
          categoryNum=$currentCheck=this.id.slice(1,3);
          questionNum=$currentCheck=this.id.slice(-1);
      }else{//foritems in cateogories 1-9
        createId = "#" + this.id.slice();
        categoryNum=$currentCheck=this.id.slice(1,2);
        questionNum=$currentCheck=this.id.slice(-1);
      }

      let tempSubject = getSubject(categoryNum);
      //console.log(tempSubject.name);
      //call request for question and set variables
      $.get(tempSubject.apiUrl, function(data){//get question info from api
        tempQuestion = data[questionNum-1].question;
        $(createId).html(tempQuestion);
        $("#question").val(tempQuestion);//question from api updated to page
        $("#currentCategory").html(tempSubject.name);//category based on question selected
        tempAnswer = (data[questionNum-1].answer);
        cleanAnswer();
        tempValue = questionNum*100;//update value to jeopardy values (to be in hundreds)
        $("#currentValue").html(tempValue);//update value on page
        // console.log(tempValue);
      })
      setItems();//update formatting of question selected
    })

    submitButton.click(function(){
      //get input from user
      let userInput = $("#input").val();
      userInput = userInput.toLowerCase();
      if(userInput == tempAnswer) {
        score = score + tempValue;//if answer is correct
        $("#score").html(score);//update score on page
        $("#question").val(($("#question").val()+ "    Your Answer: " + $("#input").val() + " was correct."));//update question with result appended
        console.log("Answer was Correct!");
        $("#input").val("");//make textbox blank for next question
        } else {
          $("#question").val(($("#question").val()+ "    Your Answer: " + $("#input").val() + " was incorrect. The correct answer was: " + tempAnswer));//update question with result appended
          console.log("Answer was Incorrect");
          $("#input").val("");
        }
    })

    skipButton.click(function(){
      //reset window
      $("#question").val("Question Skipped");//update question value to show question was skipped
      $("#input").val("");//make textbox blank for next question
    })

    function updateQuestions (old, temp) {//update questions being used on page
      let oldId="";
      let newId="";
      let tempVal = 0;
      for(let i = 1; i < 6; i++){
        oldId="#c" + old + "q";//recreate old id base
        newId="c" + temp + "q";//create new id base
        oldId=oldId+i;//add question number to end of id base
        newId=newId+i;//add question number to end of id base
        $(oldId).attr("id", newId);//change old id to new id
        newId = "#" + newId;//add notation to beginning id base
        tempVal = i*100;//update values on page for questions being loaded
        $(newId).html(tempVal);//update values on page
        $(".question").removeClass('populated');//update formatting back to initial state
      }
    }

    rnd2Button.click(function(){
      //reset window
      rnd2Button.attr("disabled", "disabled");//disable button once clicked
      rnd3Button.removeAttr("disabled");//enable round three button
      $("#cat1").attr("id", "cat6");//update id on container for questions and category
        $("#cat6").html(category6.name);//update category name
        updateQuestions(1,6);//update questions
      $("#cat2").attr("id", "cat7");
        $("#cat7").html(category7.name);
        updateQuestions(2,7);
      $("#cat3").attr("id", "cat8");
        $("#cat8").html(category8.name);
        updateQuestions(3,8);
      $("#cat4").attr("id", "cat9");
        $("#cat9").html(category9.name);
        updateQuestions(4,9);
      $("#cat5").attr("id", "cat10");
        $("#cat10").html(category10.name);
        updateQuestions(5,10);
      categories = [category6, category7, category8, category9, category10];
    })

    rnd3Button.click(function(){
      //reset window
      rnd3Button.attr("disabled", "disabled");//disable button once clicked
      $("#cat6").attr("id", "cat11");
        $("#cat11").html(category11.name);
        updateQuestions(6,11);
      $("#cat7").attr("id", "cat12");
        $("#cat12").html(category12.name);
        updateQuestions(7,12);
      $("#cat8").attr("id", "cat13");
        $("#cat13").html(category13.name);
        updateQuestions(8,13);
      $("#cat9").attr("id", "cat14");
        $("#cat14").html(category14.name);
        updateQuestions(9,14);
      $("#cat10").attr("id", "cat15");
        $("#cat15").html(category15.name);
        updateQuestions(10,15);
      categories = [category11, category12, category13, category14, category15];
    })
    //clears textbox for entry
    inputWindow.click(function(){
      $("#info").val("");
    })

    //make question appear and change color so user can tell question was selected
    function setItems() {
      $(createId).addClass('populated');
    }

    //text validation for question and answer from api
    function cleanAnswer() {
      tempAnswer=tempAnswer.replace(/<(?:.|\n\i)*?>/gm, '');
      tempAnswer = tempAnswer.replace(/\\/g, "");
      tempAnswer = tempAnswer.replace('"', "");
      tempAnswer = tempAnswer.replace('"', "");
      tempAnswer = tempAnswer.replace('(', "");
      tempAnswer = tempAnswer.replace(')', "");
      tempAnswer = tempAnswer.toLowerCase();
    }
  })//end of functions that run after page loads

})()
