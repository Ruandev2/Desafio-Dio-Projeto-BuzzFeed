import { Component, OnInit } from '@angular/core';
import quizz_questions from "../../../assets/data/quizz_questions.json"

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent  implements OnInit{

title: string = "";

questions:any;
questionSelected:any;
quizSelected:any


answers:string[] = [];
answerSelected:any;

questionIndex:number = 0;
questionMaxIndex:number = 0;

herois:string = ""
volta = this.answers.length > 0 ? true : false
finished: boolean = false;
bnc:string = ""

ngOnInit():void {
  if(quizz_questions){
    this.finished = false
    this.title = quizz_questions.title

    this.questions = quizz_questions.questions
    this.questionSelected = this.questions[this.questionIndex]

    this.questionIndex = 0
    this.questionMaxIndex = this.questions.length

    this.volta = false;

    console.log(this.questionIndex)
    console.log(this.questionMaxIndex)

  }

}
playerChoose(value: string) {
  this.answers.push(value)
  this.nextStep()
  }

  async nextStep(){
    this.questionIndex+=1

    if(this.questionMaxIndex > this.questionIndex){
        this.questionSelected = this.questions[this.questionIndex]
    }else{

      const finalAnswer:string = await this.checkResult(this.answers)
      this.finished = true

      this.answerSelected = quizz_questions.results[finalAnswer as keyof typeof quizz_questions.results ]
     if(finalAnswer === "A"){
        this.herois = './assets/imgs/seiya.png'
        this.bnc = "griff"
        document.body.classList.toggle('griffindor')
     }else if(finalAnswer === "B"){
        this.herois = './assets/imgs/shiryu.png'
        this.bnc = "sly"
        document.body.classList.toggle('slytherin')
     }else if(finalAnswer === "C"){
        this.herois = './assets/imgs/hyoga.png'
        this.bnc = "huff"
        document.body.classList.toggle('hufflepuff')
     }else if(finalAnswer === "D"){
        this.herois = './assets/imgs/shun.png'
        this.bnc = "griff"
        document.body.classList.toggle('griffindor')
     }else {
        this.herois = './assets/imgs/ikki.png'
         this.bnc = "griff"
        document.body.classList.toggle('griffindor')
     }
    }

  }

  async checkResult(anwsers:string[]){

    const result = anwsers.reduce((previous, current, i, arr)=>{
        if(
          arr.filter(item => item === previous).length >
          arr.filter(item => item === current).length
        ){
          return previous
        }else{
          return current
        }
    })

    return result
  }
  reset(){
    this.finished = false;
    this.title = this.questionSelected.title


    this.questionIndex = 0;
    this.herois = "";

    this.questions = this.quizSelected.questions

    this.answers = [];
    this.answerSelected = "";
  }

}
