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
    }, 1000); // Match this with the duration of slide animation in CSS
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
    }, 1000); // Match this with the duration of slide animation in CSS
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
    }, 1000); // Match this with the duration of slide animation in CSS
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
    }, 1000); // Match this with the duration of slide animation in CSS
}

function fontChangeAnim() {
    document.getElementById('reverie-title').classList.add('animated');
    document.getElementById('reverie-title').classList.add('fontalicious');
    setTimeout(function() {
        console.log("After 2 seconds");
        
        // Continue with the rest of your function logic
        document.getElementById('reverie-title').classList.remove('animated');
        document.getElementById('reverie-title').classList.remove('fontalicious');
    
        // Call the callback to signal that the function has completed
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

var individualEchoesStoryModal = document.getElementById('echoes-individual-story');
var individualEchoesCharacterModal = document.getElementById('echoes-individual-character');

var individualHalcyonStoryModal = document.getElementById('halcyon-individual-story');
var individualHalcyonCharacterModal = document.getElementById('halcyon-individual-character');

var individualAflenStoryModal = document.getElementById('aflen-individual-story');
var individualAflenCharacterModal = document.getElementById('aflen-individual-character');

var individualCourseModal = document.getElementById('individual-course-modal');


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
                    tempParagraph.textContent = lines[i].slice(1,-1);
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
            // Now you can do something with the file content
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
            // Now you can do something with the file content
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

function closeIndividualEchoesCharacterModal() {
    individualEchoesCharacterModal.style.display = 'none';
}

function closeIndividualEchoesStoryModal() {
    individualEchoesStoryModal.style.display = 'none';
    let contentDiv = document.getElementById('story-content');
    contentDiv.innerHTML = '';
}

function closeIndividualHalcyonCharacterModal() {
    individualHalcyonCharacterModal.style.display = 'none';
}

function closeIndividualHalcyonStoryModal() {
    individualHalcyonStoryModal.style.display = 'none';
    let contentDiv = document.getElementById('story-content');
    contentDiv.innerHTML = '';
}

function closeIndividualAflenCharacterModal() {
    individualAflenCharacterModal.style.display = 'none';
}

function closeIndividualAflenStoryModal() {
    individualAflenModal.style.display = 'none';
    let contentDiv = document.getElementById('story-content');
    contentDiv.innerHTML = '';
}

var aboutMeModal = document.getElementById('about-me-modal');
var aboutMeModalInner = document.getElementById('about-me-modal-inner');
var skillsModal = document.getElementById('skills-modal');
var skillsModalInner = document.getElementById('skills-modal-inner');
var projectsModal = document.getElementById('my-projects-modal');
var projectsModalInner = document.getElementById('my-projects-modal-inner');

function openAboutMeModal() {
    aboutMeModal.style.display = 'flex';
    aboutMeModalInner.classList.add('slide-in-blurred-bottom');
}

function closeAboutMeModal() {
    aboutMeModal.style.display = 'none';
    aboutMeModalInner.classList.remove('slide-in-blurred-bottom');
}

function openProjectsModal() {
    projectsModal.style.display = 'flex';
    projectsModalInner.classList.add('slide-in-blurred-bottom');
    projectsModalInner.scrollTop = 0;
}

function closeProjectsModal () {
    projectsModal.style.display = 'none';
    projectsModalInner.classList.remove('slide-in-blurred-bottom');
}

function openSkillsModal() {
    skillsModal.style.display = 'flex';
    skillsModalInner.classList.add('slide-in-blurred-bottom');
    skillsModalInner.scrollTop = 0;
}

function closeSkillsModal() {
    skillsModal.style.display = 'none';
    skillsModalInner.classList.remove('slide-in-blurred-bottom');
}

var echoesStoryModal = document.getElementById('echoes-story-modal');
var echoesInnerStoryModal = document.getElementById('echoes-story-modal-inner');
var echoesLocationModal = document.getElementById('echoes-location-modal');
var echoesInnerLocationModal = document.getElementById('echoes-location-modal-inner');
var echoesCharacterModal = document.getElementById('echoes-character-modal');
var echoesInnerCharacterModal = document.getElementById('echoes-character-modal-inner');

var empyreanLocationModal = document.getElementById('empyrean-location-modal');
var empyreanLocationModalInner = document.getElementById('empyrean-location-modal-inner');

var mortalLocationModal = document.getElementById('mortal-location-modal');
var mortalLocationModalInner = document.getElementById('mortal-location-modal-inner');

var tempterLocationModal = document.getElementById('tempter-location-modal');
var tempterLocationModalInner = document.getElementById('tempter-location-modal-inner');

var coreLocationModal = document.getElementById('core-location-modal');
var coreLocationModalInner = document.getElementById('core-location-modal-inner');

var liminalLocationModal = document.getElementById('liminal-location-modal');
var liminalLocationModalInner = document.getElementById('liminal-location-modal-inner');

var halcyonStoryModal = document.getElementById('halcyon-story-modal');
var halcyonLocationModal = document.getElementById('halcyon-location-modal');
var halcyonCharacterModal = document.getElementById('halcyon-character-modal');

function openEchoesStoryModal() {
    echoesStoryModal.style.display = 'flex';
    echoesInnerStoryModal.classList.add('slide-in-blurred-bottom');
    echoesInnerStoryModal.scrollTop = 0;
}

function openEchoesLocationModal() {
    echoesLocationModal.style.display = 'flex';
    echoesInnerLocationModal.classList.add('slide-in-blurred-bottom');
}

function openEchoesCharacterModal() {
    echoesCharacterModal.style.display = 'flex';
    echoesInnerCharacterModal.classList.add('slide-in-blurred-bottom');
    echoesInnerCharacterModal.scrollTop = 0;
}

function openEmpyreanLocationModal() {
    empyreanLocationModal.style.display = 'flex';
    empyreanLocationModalInner.classList.add('slide-in-blurred-bottom');
}

function closeEmpyreanLocationModal() {
    empyreanLocationModal.style.display = 'none';
    empyreanLocationModalInner.classList.remove('slide-in-blurred-bottom');
}

function openMortalLocationModal() {
    mortalLocationModal.style.display = 'flex';
    mortalLocationModalInner.classList.add('slide-in-blurred-bottom');
}

function closeMortalLocationModal() {
    mortalLocationModal.style.display = 'none';
    mortalLocationModalInner.classList.remove('slide-in-blurred-bottom');
}

function openTempterLocationModal() {
    tempterLocationModal.style.display = 'flex';
    tempterLocationModalInner.classList.add('slide-in-blurred-bottom');
}

function closeTempterLocationModal() {
    tempterLocationModal.style.display = 'none';
    tempterLocationModalInner.classList.remove('slide-in-blurred-bottom');
}

function openCoreLocationModal() {
    coreLocationModal.style.display = 'flex';
    coreLocationModalInner.classList.add('slide-in-blurred-bottom');
}

function closeCoreLocationModal() {
    coreLocationModal.style.display = 'none';
    coreLocationModalInner.classList.remove('slide-in-blurred-bottom');
}

function openLiminalLocationModal() {
    liminalLocationModal.style.display = 'flex';
    liminalLocationModalInner.classList.add('slide-in-blurred-bottom');
}

function closeLiminalLocationModal() {
    liminalLocationModal.style.display = 'none';
    liminalLocationModalInner.classList.remove('slide-in-blurred-bottom');
}

function closeEchoesStoryModal() {
    echoesStoryModal.style.display = 'none';
    echoesInnerStoryModal.classList.remove('slide-in-blurred-bottom');
}

function closeEchoesLocationModal() {
    echoesLocationModal.style.display = 'none';
    echoesInnerLocationModal.classList.remove('slide-in-blurred-bottom');
}

function closeEchoesCharacterModal() {
    echoesCharacterModal.style.display = 'none';
    echoesInnerCharacterModal.classList.remove('slide-in-blurred-bottom');
}

function openHalcyonStoryModal() {
    halcyonStoryModal.style.display = 'flex';
}

function openHalcyonLocationModal() {
    halcyonLocationModal.style.display = 'flex';
}

function openHalcyonCharacterModal() {
    halcyonCharacterModal.style.display = 'flex';
}

function closeHalcyonStoryModal() {
    halcyonStoryModal.style.display = 'none';
}

function closeHalcyonLocationModal() {
    halcyonLocationModal.style.display = 'none';
}

function closeHalcyonCharacterModal() {
    halcyonCharacterModal.style.display = 'none';
}

function closeIndividualCourseModal() {
    individualCourseModal.style.display = 'none';
}


window.onclick = function(event) {
    if (event.target == echoesStoryModal) {
        closeEchoesStoryModal();
    } else if (event.target == echoesLocationModal) {
        closeEchoesLocationModal();
    } else if (event.target == echoesCharacterModal) {
        closeEchoesCharacterModal();
    } else if (event.target == individualEchoesStoryModal) {
        closeIndividualEchoesStoryModal();
    } else if (event.target == individualEchoesCharacterModal) {
        closeIndividualEchoesCharacterModal();
    } else if (event.target == halcyonStoryModal) {
        closeHalcyonStoryModal();
    } else if (event.target == halcyonLocationModal) {
        closeHalcyonLocationModal();
    } else if (event.target == halcyonCharacterModal) {
        closeHalcyonCharacterModal();
    } else if (event.target == individualHalcyonCharacterModal) {
        closeIndividualHalcyonCharacterModal();
    } else if (event.target == individualHalcyonStoryModal) {
        closeIndividualHalcyonStoryModal();
    } else if (event.target == empyreanLocationModal) {
        closeEmpyreanLocationModal();
    } else if (event.target == aboutMeModal) {
        closeAboutMeModal();
    } else if (event.target == skillsModal) {
        closeSkillsModal();
    } else if (event.target == individualCourseModal) {
        closeIndividualCourseModal();
    } else if (event.target == projectsModal) {
        closeProjectsModal();
    } else if (event.target == mortalLocationModal) {
        closeMortalLocationModal();
    } else if (event.target == tempterLocationModal) {
        closeTempterLocationModal();
    } else if (event.target == coreLocationModal) { 
        closeCoreLocationModal();
    } else if (event.target == liminalLocationModal) {
        closeLiminalLocationModal();
    }
}
