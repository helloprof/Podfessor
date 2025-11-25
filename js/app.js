let { courses, courseNotes, semesters } = window

let generateSemesterButtons = (semesters) => {

    let semesterContainer = document.querySelector("#semesterContainer")
    semesters.forEach((semester) => {
        let semesterButton = document.createElement("button")
        semesterButton.className = "button"
        semesterButton.textContent = semester.name

        semesterButton.addEventListener("click", () => {
            // console.log(`You clicked on semester: ${semester.semesterID}`)  
            // filter courses based on semesterID
            let filteredCourses = courses.filter((course) => {
                return course.semesterID === semester.semesterID
            })
            // console.log(filteredCourses)
            generateCourseCards(filteredCourses)

        })
        semesterContainer.appendChild(semesterButton)
    })

    let newCourseCardForm = document.createElement("form")
    newCourseCardForm.id = "newCourseCardForm"
    // newCourseCardForm.action = "http://httpbin.org/post"
    // newCourseCardForm.method = "POST"
    
    let courseNameInput = document.createElement("input")
    courseNameInput.type = "text"
    courseNameInput.placeholder = "Course Name"
    courseNameInput.id = "courseNameInput"
    courseNameInput.name = "courseName"

    let courseCodeInput = document.createElement("input")
    courseCodeInput.type = "text"
    courseCodeInput.placeholder = "Course Code"
    courseCodeInput.id = "courseCodeInput"
    courseCodeInput.name = "courseCode"

    let courseImageInput = document.createElement("input")
    courseImageInput.type = "text"
    courseImageInput.placeholder = "Course Image URL"
    courseImageInput.id = "courseImageInput"
    courseImageInput.name = "courseImage"

    let courseTopicsInput = document.createElement("input")
    courseTopicsInput.type = "text"
    courseTopicsInput.placeholder = "Course Topics (comma separated)"
    courseTopicsInput.id = "courseTopicsInput"
    courseTopicsInput.name = "courseTopics"

    let addCourseButton = document.createElement("button")
    addCourseButton.type = "submit"
    addCourseButton.textContent = "Add Course"
    addCourseButton.className = "button"

    newCourseCardForm.appendChild(courseNameInput)
    newCourseCardForm.appendChild(courseCodeInput)
    newCourseCardForm.appendChild(courseImageInput)
    newCourseCardForm.appendChild(courseTopicsInput)
    newCourseCardForm.appendChild(addCourseButton)

    newCourseCardForm.addEventListener("submit", (event) => {
        event.preventDefault()
        let newCourse = {
            name: courseNameInput.value,
            code: courseCodeInput.value,
            image: courseImageInput.value,
            topics: courseTopicsInput.value.split(",").map(topic => topic.trim()),
        }
        console.log("New Course to add:", newCourse)
        generateCourseCards([newCourse])
    })
    
    semesterContainer.appendChild(newCourseCardForm)
}



let generateCourseCards = (courses) => {
    // clear previous cards
    let cardsContainer = document.querySelector("#cardsContainer")
    cardsContainer.innerHTML = ""
    courses.forEach((course) => {
        console.log(course.name)
        // div
        let newCard = document.createElement("div")
        newCard.onclick = () => {
            open(course.outlineURL, "_blank", "noopener,noreferrer")
        }

        // img
        let newCardImg = document.createElement("img")
        newCardImg.src = course.image
        
        // h4 title
        let newCardTitle = document.createElement("h4")
        newCardTitle.textContent = course.name

        // button
        let newCardButton = document.createElement("button")
        // newCardButton.onclick = () => {
        //     open(course.outlineURL, "_blank", "noopener,noreferrer")
        // }
        newCardButton.className = "button"
        newCardButton.textContent = course.code  

        // text / paragraph
        let newCardP = document.createElement("p")
        newCardP.textContent = course.topics.join(", ")

        // append children to card
        newCard.appendChild(newCardImg)
        newCard.appendChild(newCardTitle)
        newCard.appendChild(newCardButton)
        newCard.appendChild(newCardP)

        // styling the card
        newCard.className = "card"

        // appending to body
        let cardsContainer = document.querySelector("#cardsContainer")
        cardsContainer.appendChild(newCard)
    })
}

document.addEventListener("DOMContentLoaded", (event) => {
    console.log("DOM fully loaded and parsed");
    console.log("Courses:", courses)
    console.log("Course Notes:", courseNotes)
    console.log("Semesters:", semesters)

    // let generateButton = document.querySelector("#generateButton")

    generateSemesterButtons(semesters)
    // generateButton.addEventListener("click", () => {
    //     console.log("you clicked me!")
    //     generateCourseCards(courses)
    // })

    // 
});


// let { courses } = require('./courses')
// let { courseNotes } = require('./courseNotes')

// console.log("Courses:", courses)

// courses.forEach((course) => {
//     console.log(`Course: ${course.code} - ${course.name}`)
// })

// courseNotes.forEach((note) => {
//     let notesArray = note.notes.split(" ")
//     console.log(`Course: ${note.code} - Notes Word Count: ${notesArray.length}`)
// })

// consider elevenLabs API for text to speech 

// fetch("https://api.openai.com/v1/audio/speech", {
//     method: 'POST',
//     headers: {
//         "Content-Type": "application/json",
//         "Authorization": "Bearer $OPEN_AI_API_KEY" 
//     },
//     body: JSON.stringify(chatInputs)
// TODO: add chatInputs 
// }) .then(res => res.blob()) // audio comes back as binary
//   .then(blob => {
//     // Turn it into a playable audio element
//     const audioUrl = URL.createObjectURL(blob);
//     const audio = new Audio(audioUrl);
//     audio.play();
//   })
//   .catch(err => console.error(err));

