(function(){

    'use strict';

    const verbsEnds =      ['учи','ючи','ачи','ячи','вши','ать','ять','уть','ють','емо','ємо','ете','єте','ить','їть','имо','їмо','ите','їте','мем','ти','му','ме','ий','но','то','еш','єш','иш','їш','ся','сь','ть','ла','ло','ли','ює','е','є','в','у','ю',];
    const verbs =          ['можна','є'];
    const adjectivesEnds = ['ську','ому','ний','вий','кий',];
    const adverbsEnds =    ['-небудь','вкруги','вколо','багато','краще','-таки','чно','-то','ше','че'];
    const adverbsPref =    ['хтозна-','казна-','бозна-','будь-','по-'];
    const adverbs =        ['напризволяще','упродовж','переді','передо','обабіч','верхи','крізь','понад','перед','після','через','поміж','також','поза','піді','підо','крім','наді','надо','біля','далі','з-під','під','при','для','без','уві','від','вже','уже','над','тут','з-за','ув','по','на','за','зі','зо','до','об','тд','в','у','з'];
    const nounsEnds =      ['нти',];
    const numeratorsPref = ['перш','друг','трет','четверт','п\'ят','шост','сьом','восьм','дев\'ят','десят','сороков','дев\'яност'];
    const numeratorsEnds = ['мільйонний','мільйони','тисячний','тисяч','десятий','десяти','десята','дцятий','дцята','дцяти','дцять','десят','теро','меро','веро','сотий','сто','ста','сот','ьох'];
    const numerators =     ['один','одного','два','дві','двоє','двух','три','троє','чотири','четверо','п\'ять','шість','шести','сім','семи','сімох','вісім','вісьмох','сорок','сто','сотні','сотень','двісті','тисяча','тисячі','тисяч','мільйон','мільйони','мільйона','мільйонів'];
    const conjunctives =   ['неначебто','немовбито','оскільки','мовбито','начебто','немовби','причому','притому','неначе','тільки','нібито','притім','причім','себто','цебто','тобто','також','однак','проте','також','ледве','щойно','немов','мовби','начеб','абощо','адже','аніж','коли','втім','зате','якщо','якже','якби','щоби','наче','ніби','доки','отже','отож','тощо','теж','хоч','хай','щоб','аби','або','але','ані','так','мов','ніж','та','то','бо','як','що','чи','ні','і','й','а'];
    const particles =      ['справді','лишень','навіть','аякже','авжеж','нехай','бодай','невже','якраз','атож','егеж','хіба','лише','саме','онде','таки','годі','хай','ані','еге','ось','оце','ото','ген','лиш','аж','не','ну','но','це','би','ой','от','он','ще','же','ж','б','о'];

    //consts for analyzing
    const separators = /(?<!\w\.\w.)(?<![А-ЯЄ][а-яє]\.)(?<=\.|\?)\s+(?=[А-ЯЄ])/u;
    const button = document.querySelector('#analyze');
    const inputField = document.querySelector('#text');

    //consts for page content
    const contents = document.querySelectorAll('.content');
    const select = document.querySelector('#mode');

    //function which defines a part of speech
    button.addEventListener('click',function(){

        const text = inputField.value;
        let myDiv = document.querySelector('#output');
        myDiv.innerHTML = '';

        const sentences = text.split(separators).filter(Boolean);
        console.log(sentences);

        const wordArrays = sentences.map(sentence => sentence.split(' '));
        console.log(wordArrays);

        const condition = (partOfSpeech) => (word) => (compareWith) => { 
            const cleanWord = word.replace(/^[^\wА-Яа-яіІїЇєЄ]+|[^\wА-Яа-яіІїЇєЄ]+$/g, '').toLowerCase();
            let truly = null;
            switch (compareWith) {
                case 'ending':
                    if(partOfSpeech.some(element => cleanWord.endsWith(element) && (element.length < cleanWord.length))){
                        truly = true;
                    };
                    break;
                case 'whole':
                    if(partOfSpeech.includes(cleanWord)){
                        truly = true;
                    };
                    break;
                case 'prefix':
                    if(partOfSpeech.some(element => cleanWord.startsWith(element) && (element.length < cleanWord.length))){
                        truly = true;
                    };
                    break;
            };
            return truly;
        };

        const output = (partOfSpeech) => (word) => (myClass) => {
            if(partOfSpeech){
                console.log(`Слово "${word}" це ${partOfSpeech}`);
                myDiv.innerHTML += `<span class=${myClass}>${word} </span>`
            }
            else{
                console.log(`Слово "${word}" не относится к одной из частей речи`); 
                myDiv.innerHTML += `<span class=${myClass}>${word} </span>`
            }
        };

        wordArrays.forEach((words) => {
            words.forEach((word) => {
                switch (true) {
                    case !isNaN(parseFloat(word)):
                        output ('числівник')(word)('numerator');
                        break;
                    case condition (verbs)(word)('whole'):
                        output ('дієслово')(word)('verb');
                        break;
                    case condition (adverbs)(word)('whole'):
                        output ('прислівник')(word)('adverb');
                        break;
                    case condition (particles)(word)('whole'):
                        output ('частка')(word)('particle');
                        break;
                    case condition (conjunctives)(word)('whole'):
                        output ('сполучник')(word)('conjunctive');
                        break;
                    case condition (numerators)(word)('whole'):
                        output ('числівник')(word)('numerator');
                        break;
                    case condition (adverbsPref)(word)('prefix'):
                        output ('прислівник')(word)('adverb');
                        break;
                    case condition (numeratorsPref)(word)('prefix'):
                        output ('числівник')(word)('numerator');
                        break;    
                    case condition (numeratorsEnds)(word)('ending'):
                        output ('числівник')(word)('numerator');
                        break;
                    case condition (adjectivesEnds)(word)('ending'):
                        output ('прикметник')(word)('adjective');
                        break;
                    case condition (adverbsEnds)(word)('ending'):
                        output ('прислівник')(word)('adverb');
                        break;
                    case condition (nounsEnds)(word)('ending'):
                        output ('іменник')(word)('noun');
                        break;
                    case condition (verbsEnds)(word)('ending'):
                        output ('дієслово')(word)('verb');
                        break;
                    default:
                        output (null)(word)('undefined');
                        break;
                }
            });
        });
    });

    //function which activates the function above, when the key "enter" is pressed
    inputField.addEventListener('keypress', function(event) {
        if (event.keyCode === 13) {
          button.click();
        }
    });

    //page content
    select.addEventListener('change', function() {
        if (this.value === 'light') {
          contents.forEach(element => {
            element.classList.add('light-mode');
          });
        } else {
          contents.forEach(element => {
            element.classList.remove('light-mode');
          });
        }
    });
})()