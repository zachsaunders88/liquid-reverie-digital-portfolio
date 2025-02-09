function slideToNext(currentDivId, nextDivId) {
    var currentDiv = document.getElementById(currentDivId);
    var nextDiv = document.getElementById(nextDivId);

    currentDiv.classList.add('slide-out');
    nextDiv.classList.remove('hidden');
    nextDiv.classList.add('slide-in');

    setTimeout(function() {
        currentDiv.classList.add('hidden');
        currentDiv.classList.remove('slide-out');

        nextDiv.classList.remove('slide-in');
    }, 1000); 
}

function slideToPrior(currentDivId, nextDivId) {
    var currentDiv = document.getElementById(currentDivId);
    var nextDiv = document.getElementById(nextDivId);

    currentDiv.classList.add('slide-out2');
    nextDiv.classList.remove('hidden');
    nextDiv.classList.add('slide-in2');

    setTimeout(function() {
        currentDiv.classList.add('hidden');
        currentDiv.classList.remove('slide-out2');

        nextDiv.classList.remove('slide-in2');
    }, 1000);
}

function invertColours(corner) {
     document.getElementById(corner).style.filter = 'invert(100%)';
}

function revertColours(corner) {
    document.getElementById(corner).style.filter = 'invert(0%)';
}

function slideToRight(currentDivId, rightDivId) {
    var currentDiv = document.getElementById(currentDivId);
    var rightDiv = document.getElementById(rightDivId);

    currentDiv.classList.add('slide-out-left');
    rightDiv.classList.remove('hidden');
    rightDiv.classList.add('slide-in-right');

    setTimeout(function() {
        currentDiv.classList.add('hidden');
        currentDiv.classList.remove('slide-out-right');

        rightDiv.classList.remove('slide-in-right');
    }, 1000); 
}

function slideToLeft(currentDivId, leftDivId) {
    var currentDiv = document.getElementById(currentDivId);
    var leftDiv = document.getElementById(leftDivId);

    currentDiv.classList.add('slide-out-right');
    leftDiv.classList.remove('hidden');
    leftDiv.classList.add('slide-in-left');

    setTimeout(function() {
        currentDiv.classList.add('hidden');
        currentDiv.classList.remove('slide-out-right');

        leftDiv.classList.remove('slide-out-left');
        leftDiv.classList.remove('slide-in-left');
    }, 1000); 
}

function fontChangeAnim() {
    document.getElementById('reverie-title').classList.add('animated');
    document.getElementById('reverie-title').classList.add('fontalicious');
    setTimeout(function() {
        console.log("After 2 seconds");
        
        document.getElementById('reverie-title').classList.remove('animated');
        document.getElementById('reverie-title').classList.remove('fontalicious');
    
        if (typeof callback === 'function') {
          callback();
        }
      }, 4000);
}

function revealText(name) {
    var textId1 = name + "-text1";
    var textId2 = name + "-text2";
    var textId3 = name + "-text3";
    var backgroundId = name + "-background";
    let text1 = document.getElementById(textId1);
    let text2 = document.getElementById(textId2);
    let text3 = document.getElementById(textId3);
    let background = document.getElementById(backgroundId);

    if (text1.style.display == 'none' || text1.style.display == 'text-blur-out') {

        background.style.display = 'inline';
        background.classList.add('slide-in-blurred-bottom');

        text1.style.display = 'inline';
        text2.style.display = 'inline';
        text3.style.display = 'inline';

        text1.classList.add('text-focus-in');
        text2.classList.add('text-focus-in');
        text3.classList.add('text-focus-in');

        console.log("GOOD");
    } else {
        text1.classList.add('text-blur-out')
        text2.classList.add('text-blur-out')
        text3.classList.add('text-blur-out')

        setTimeout(function() {
            console.log("After 1.5 seconds");

            background.classList.add('slide-out-blurred-bottom');

            if (typeof callback === 'function') {
                callback();
            }
        }, 600);

        console.log("BAD");
        setTimeout(function() {
            console.log("After 1.5 seconds");

            text1.style.display = 'none';
            text2.style.display = 'none';
            text3.style.display = 'none';
            background.style.display = 'none';

            text1.classList.remove('text-blur-out');
            text2.classList.remove('text-blur-out');
            text3.classList.remove('text-blur-out');
            background.classList.remove('slide-out-blurred-bottom');

            if (typeof callback === 'function') {
                callback();
            }
        }, 1200);
    }
}

var individualEchoesStoryModal = document.getElementById('echoes-individual-story-modal');
var individualEchoesCharacterModal = document.getElementById('echoes-individual-character-modal');
var individualStoryModal = document.getElementById('individual-story-modal')
var individualCourseModal = document.getElementById('individual-course-modal');

function openIndividualStory(book) {
    individualStoryModal.style.display = 'flex'
    const filePath = './stories/' + book + '.txt';
    var bookTitle;

    switch(book) {
        case 'btf':
            bookTitle = 'Blood Tempted Fate';
            break;
        case 'gm':
            bookTitle = 'Goldfield Massacre';
            break;
        case 'pog':
            bookTitle = 'Paragon of Guilt';
            break;
        case 'hos':
            bookTitle = 'Hospital of Stars';
            break;
        case 'bc':
            bookTitle = 'Blighted Contingent';
            break;
        case 'ck':
            bookTitle = 'Cruel Kindness';
            break;
        case 'lwc':
            bookTitle = 'Lick Wet Carrion';
            break;
        case 'poa':
            bookTitle = 'Price of Avarice';
            break;
        case 'ttp':
            bookTitle = 'The Temper\'s Province';
            break;
    }

    let titleElement = document.getElementById('story-title');
    titleElement.textContent = bookTitle;

    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch file: ${response.statusText}');
            }
            return response.text();
        })
        .then(fileContent => {
            console.log('File Content:', fileContent);

            const lines = fileContent.split('\n');
            let contentDiv = document.getElementById('story-content');
            contentDiv.innerHTML = "";
            let lineNeeded = false;

            for (i=0 ; i<lines.length; i++) {
                let tempLine = document.createElement('hr');
                tempLine.style.width = '92.5%';
                lineNeeded = false;
                let tempParagraph = document.createElement('p');
                tempParagraph.style.paddingLeft = '30px';
                tempParagraph.style.paddingRight = '30px';
                if (lines[i][0] == '_') {
                    tempParagraph.style.fontStyle = 'italic';
                    tempParagraph.textContent = lines[i].slice(1,-2);
                } else if (lines[i][0] == '#') {
                    tempParagraph = document.createElement('h2');
                    tempParagraph.textContent = lines[i].slice(1, (lines[i].length));
                    tempParagraph.style.textAlign = 'center';
                    lineNeeded = true;
                } else {
                    tempParagraph.textContent = lines[i];
                }
                contentDiv.appendChild(tempParagraph);
                if (lineNeeded == true) {
                    contentDiv.appendChild(tempLine);
                }
            }

            console.log("Lines:", lines);
        })
        .catch(error => {
            console.error('Error fetching file:', error);
        });
}

function openIndividualEchoesStoryModal(book) {
    individualEchoesStoryModal.style.display = 'flex';
    const filePath = './stories/' + book + '.txt';
    var bookTitle;

    switch(book) {
        case 'btf':
            bookTitle = 'Blood Tempted Fate';
            break;
        case 'gm':
            bookTitle = 'Goldfield Massacre';
            break;
        case 'pog':
            bookTitle = 'Paragon of Guilt';
            break;
        case 'hos':
            bookTitle = 'Hospital of Stars';
            break;
        case 'bc':
            bookTitle = 'Blighted Contingent';
            break;
        case 'ck':
            bookTitle = 'Cruel Kindness';
            break;
        case 'lwc':
            bookTitle = 'Lick Wet Carrion';
            break;
        case 'poa':
            bookTitle = 'Price of Avarice';
            break;
        case 'ttp':
            bookTitle = 'The Temper\'s Province';
            break;
    }

    let titleElement = document.getElementById('story-title');
    titleElement.textContent = bookTitle;

    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch file: ${response.statusText}');
            }
            return response.text();
        })
        .then(fileContent => {
            console.log('File Content:', fileContent);

            const lines = fileContent.split('\n');
            let contentDiv = document.getElementById('story-content');
            contentDiv.innerHTML = "";
            let lineNeeded = false;

            for (i=0 ; i<lines.length; i++) {
                let tempLine = document.createElement('hr');
                tempLine.style.width = '92.5%';
                lineNeeded = false;
                let tempParagraph = document.createElement('p');
                tempParagraph.style.paddingLeft = '30px';
                tempParagraph.style.paddingRight = '30px';
                if (lines[i][0] == '_') {
                    tempParagraph.style.fontStyle = 'italic';
                    tempParagraph.textContent = lines[i].slice(1,-2);
                } else if (lines[i][0] == '#') {
                    tempParagraph = document.createElement('h2');
                    tempParagraph.textContent = lines[i].slice(1, (lines[i].length));
                    tempParagraph.style.textAlign = 'center';
                    lineNeeded = true;
                } else {
                    tempParagraph.textContent = lines[i];
                }
                contentDiv.appendChild(tempParagraph);
                if (lineNeeded == true) {
                    contentDiv.appendChild(tempLine);
                }
            }

            console.log("Lines:", lines);
        })
        .catch(error => {
            console.error('Error fetching file:', error);
        });
}

function openIndividualEchoesCharacterModal(name) {
    individualEchoesCharacterModal.style.display = 'flex';

    let characterName = document.getElementById('character-name');
    let characterImage = document.getElementById('character-image');
    let characterTag = document.getElementById('character-tag');
    let characterContent = document.getElementById('character-content');

    const filePath = './characters/' + name + '.txt';

    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch file: ${response.statusText}');
            }
            return response.text();
        })
        .then(fileContent => {
            console.log('File Content:', fileContent);

            const lines = fileContent.split('\n');
            characterImage.src = './images/' + name + '.png';

            for (i=0 ; i<lines.length; i++) {
                if (lines[i][0] == '#') {
                    characterName.textContent = lines[i].slice(1, -1);
                } else if (lines[i][0] == '_') {
                    characterTag.textContent = lines[i].slice(1, -1);
                } else if (lines[i][0] == '+') {
                    characterContent.textContent = lines[i].slice(1, -1);
                }
            }
        })
        .catch(error => {
            console.error('Error fetching file:', error);
        });

}

function openIndividualCourseModal(name) {

    individualCourseModal.style.display = 'flex';

    let courseTitle = document.getElementById('course-title');
    let courseGrade = document.getElementById('course-grade');
    let courseSkills = document.getElementById('course-skills');
    let courseIframe = document.getElementById('course-iframe');

    const filePath = './personal/' + name + '.txt';
    courseIframe.src = '../../src/' + name + '.pdf';

    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch file: ${response.statusText}');
            }
            return response.text();
        })
        .then(fileContent => {
            console.log('File Content:', fileContent);

            const lines = fileContent.split('\n');

            for (i=0 ; i<lines.length; i++) {
                if (lines[i][0] == '#') {
                    courseTitle.textContent = lines[i].slice(1, -1);
                } else if (lines[i][0] == '_') {
                    courseSkills.textContent = lines[i].slice(1, -1);
                } else if (lines[i][0] == '+') {
                    courseGrade.textContent = lines[i].slice(1, -1);
                }
            }
        })

}

function openModal(modalName) {
    var modalTitle = modalName;
    var tempModal = document.getElementById(modalTitle);
    var tempModalInner = document.getElementById(modalTitle + "-inner");
    tempModal.style.display = 'flex';
    tempModalInner.classList.add('slide-in-blurred-bottom');
    tempModalInner.scrollTop = 0;
}

function closeModal(modalName) {
    var modalTitle = modalName;
    var tempModal = document.getElementById(modalTitle);
    var tempModalInner = document.getElementById(modalTitle + "-inner");
    tempModal.style.display = 'none';
    tempModalInner.classList.remove('slide-in-blurred-bottom');
}

window.onclick = function(event) {
    if (event.target.id.includes('modal')) {
        closeModal(event.target.id);
    }
};
