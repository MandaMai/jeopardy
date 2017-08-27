(function(){
  // let tempQ="";
  // let tempA="";
  let submitButton = $("#submit-button");
  let skipButton = $("#skip-button");
  let questionButton = $(".question");
  let rnd1Button = $("#rnd1-button");
  let rnd2Button = $("#rnd2-button");
  let rnd3Button = $("#rnd3-button");
  let inputWindow = $("#info");
  // let categoryButton = $(".category");//change category when clicked? out of scope for this project
  let categoryNum = 0;
  let questionNum = 0;
  let score = 0;
  let tempQuestion = "";
  let tempAnswer = "";
  let tempValue = 0;
  let createId = "";
  let category1, category2, category3, category4, category5, category6, category7, category8, category9, category10, category11, category12, category13, category14, category15;

  function Subject(name, index, num) {
    this.name=name;
    this.num=num;
    this.index=index;
    this.apiUrl="http://jservice.io/api/clues?count=5&category=" + index;
  }

  category1 = new Subject("Herbs & Spice Girls", 3764,1);
      $("#cat1").html(category1.name);
  category2 = new Subject("British Fictional Characters", 3723, 2);
      $("#cat2").html(category2.name);
  category3 = new Subject("Let Your Geek Flag Fly", 10270, 3);
      $("#cat3").html(category3.name);
  category4 = new Subject("Super Heroes", 58, 4);
      $("#cat4").html(category4.name);
  category5 = new Subject("'90s Movie Lines", 7363, 5);
      $("#cat5").html(category5.name);
  categories = [category1, category2, category3, category4, category5];
  rnd1Button.attr("disabled", "disabled");
  rnd3Button.attr("disabled", "disabled");

//extra categories
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


  function getSubject(tempNum) {
    for(let i = 0; i < categories.length; i++){
      if(categories[i].num==tempNum){
        return categories[i];
      }
    }
  }

  function setItems() {
    $(createId).addClass('populated');
  }

  function resetItems() {

  }

  function cleanAnswer() {
    tempAnswer=tempAnswer.replace(/<(?:.|\n\i)*?>/gm, '');
    tempAnswer = tempAnswer.replace(/\\/g, "");
    tempAnswer = tempAnswer.replace('"', "");
    tempAnswer = tempAnswer.replace('"', "");
    tempAnswer = tempAnswer.replace('(', "");
    tempAnswer = tempAnswer.replace(')', "");
    tempAnswer = tempAnswer.toLowerCase();
  }

  $(function(){


    //hit the api endpoint and put the question in the div with the id of question and answer
    questionButton.click(function(){
      let temp=this.id.slice();
      console.log(temp);
      console.log(temp.length);
      if(temp.length==5){
          createId=this.id.slice();
          categoryNum=$currentCheck=this.id.slice(1,3);
          questionNum=$currentCheck=this.id.slice(-1);
      }else{
        createId = "#" + this.id.slice();
        categoryNum=$currentCheck=this.id.slice(1,2);
        questionNum=$currentCheck=this.id.slice(-1);
      }
      console.log(categoryNum);
      console.log(questionNum);
      console.log(createId);

      let tempSubject = getSubject(categoryNum);
      console.log(tempSubject.name);
      //call request for question and set variables
      $.get(tempSubject.apiUrl, function(data){
        tempQuestion = data[questionNum-1].question;
        $(createId).html(tempQuestion);
        $("#question").val(tempQuestion);
        $("#currentCategory").html(tempSubject.name);
        // console.log(tempQuestion);
        tempAnswer = (data[questionNum-1].answer);
        cleanAnswer();
        console.log(tempAnswer);
        tempValue = questionNum*100;
        $("#currentValue").html(tempValue);
        // console.log(tempValue);
      })
      setItems();
    })

    submitButton.click(function(){
      //get input from user
      let userInput = $("#input").val();
      userInput = userInput.toLowerCase();
      console.log(userInput);
      console.log(tempAnswer);
      if(userInput == tempAnswer) {
        score = score + tempValue;
        $("#score").html(score);
        $("#question").val(($("#question").val()+ "    Your Answer: " + $("#input").val() + " was correct."));
        console.log("Answer was Correct!");
        $("#input").val("");
        } else {
          console.log("Answer doesn't match");
          $("#question").val(($("#question").val()+ "    Your Answer: " + $("#input").val() + " was incorrect."));
          console.log("Answer was Incorrect");
          $("#input").val("");
        }
    })

    skipButton.click(function(){
      //reset window
      $("#question").val("Question Skipped");
      $("#input").val("");
    })

    function updateQuestions (old, temp) {
      let oldId="";
      let newId="";
      let tempVal = 0;
      for(let i = 1; i < 6; i++){
        oldId="#c" + old + "q";
        newId="c" + temp + "q";
        oldId=oldId+i;
        newId=newId+i;
        console.log($(oldId).attr("id", newId));
        $(oldId).attr("id", newId);
        console.log("Old id: " + oldId + " New id: " + newId);
        newId = "#" + newId;
        tempVal = i*100;
        $(newId).html(tempVal);
        $(".question").removeClass('populated');
      }
    }

    rnd2Button.click(function(){
      //reset window
      rnd2Button.attr("disabled", "disabled");
      rnd3Button.removeAttr("disabled");
      $("#cat1").attr("id", "cat6");
        $("#cat6").html(category6.name);
        updateQuestions(1,6);
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
      rnd3Button.attr("disabled", "disabled");
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

    inputWindow.click(function(){
      $("#info").val(" ");
    })
  })//end of functions that run after page loads

})()
