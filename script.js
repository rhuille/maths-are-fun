

// random utils //
function randomInt(min=0, max=10) {
  return min+Math.floor(Math.random() * Math.floor(max-min));
}

function randomBool(){
    return Math.random() > 0.5
}

function randomTableDe11(){
    const a = randomInt(10)
    const b = randomInt(11, 12)
    return [a*b, a]
}
// ------ //

// QUESTION_GENERATOR //

const QUESTION_GENERATOR = [
    () => {
        let question, answer;
        a = randomInt(2, 20);
        b = randomBool()? 11 : 12;
        if(randomBool()){
            question = `${a} x ${b} =`;
            answer = a*b;
        } else {
            question = `${a*b} / ${a} =`;
            answer = b;
        }
        return [question, answer];
    },
    () => {
        let question, answer;
        a = randomInt(2, 20);
        b = randomBool()? 2 : 3;
        if(randomBool()){
            question = `${a} ^ ${b} =`;
            answer = a**b;
        } else {
            question = `racine ${b == 2 ? 'square':'cubic'} of ${a**b} =`;
            answer = a;
        }
        return [question, answer];
    },
    () => {
        const fac=n=>(n<2)?1:fac(n-1)*n;
        let question, answer;
        a = randomInt(2, 10);
        b = fac(a);
        if(randomBool()){
            question = `${a}! =`;
            answer = b;
        } else {
            question = `${b} is the factorial of...`;
            answer = a;
        }
        return [question, answer];
    },
    () => {
        const frac = [
            [1, 2],[3, 2],
            [1, 4],[3, 4],[5, 4],[7, 4],
            [1, 8],[3, 8],[5, 8],[7, 8],
            [1, 5],[2, 5],[3, 5],[4, 5],
            [1, 3],[2, 3],[4, 3],
            [1,6], [5, 6], [1,9],
            [1, 100], [1, 50], [1, 25], [1, 20],
        ];
        const compute = {
            Fraction: (a)=> (`${a[0]}/${a[1]}`),
            Percentage: (a)=> (`${a[0]/a[1]*100}`.substring(0, 5)+'%'),
            Decimal: (a)=> (`${a[0]/a[1]}`.substring(0, 5))
        };
        const types = [['Fraction', 'Decimal'], ['Fraction', 'Percentage'], ['Percentage', 'Decimal']];

        const type = types[randomInt(0, 3)];
        const q = randomBool()?0:1;
        type1 = type[q];
        type2 = type[1-q];

        currentFrac = frac[randomInt(0, frac.length)]

        question = `${type1} of ${compute[type2](currentFrac)} is...`
        answer = compute[type1](currentFrac)
        return [question, answer];
    }
];

Question = class {
    constructor(){
        [this.question, this.answer] = QUESTION_GENERATOR[randomInt(0, QUESTION_GENERATOR.length)]()
    }
}
// ----------- //
function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this,
            args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

isResponseCorrect = debounce((response) => {
    if(response === '') {
        document.getElementsByTagName('body')[0].className = 'neutral'
    }
    else if(response == currentQuestion.answer) {
        document.getElementsByTagName('body')[0].className = 'correct'
        score+=100;
        bestScore=Math.max(score, bestScore)
        setTimeout(main, 500)
    }
    else {
        document.getElementsByTagName('body')[0].className = 'uncorrect'
        score=0;
        setTimeout(main, 500)
    }
}, 500)

let currentQuestion, score = 0, bestScore = 0;
function main(){
    currentQuestion = new Question();

    document.getElementById("question").innerText = currentQuestion.question;

    document.getElementById("response").value = '';
    document.getElementById("response").focus();
    document.getElementsByTagName('body')[0].className = 'neutral';
    document.getElementById("score").innerText = 'score: '+score+' pts';
    document.getElementById("best").innerText = 'best: '+bestScore+' pts';
}

main();