const currentYear = new Date().getFullYear();
document.getElementById('current-year').textContent = currentYear;
const currentDate = new Date();
const formattedDate = currentDate.toLocaleString();
document.querySelector('.last-modified').textContent = `Last Access: ${formattedDate}`;

const menuButton = document.querySelector('#menu');
const nav = document.querySelector('#animeteme');

menuButton.addEventListener('click', () => {
  nav.classList.toggle('open'); 
  menuButton.classList.toggle('open'); 
});

const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming...',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web...',
        technology: ['HTML', 'CSS'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized...',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes...',
        technology: ['C#'],
        completed: false
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience...',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience...',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: false
    }
];

const allCoursesButton = document.querySelector('#all-courses');
const cseCoursesButton = document.querySelector('#cse-courses');
const wddCoursesButton = document.querySelector('#wdd-courses');
const courseListContainer = document.querySelector('.course-buttons');
const totalCreditsElement = document.querySelector('#total-credits');


function updateCourseList(filteredCourses) {
  
    courseListContainer.innerHTML = '';

  
    filteredCourses.forEach(course => {
        const courseButton = document.createElement('button');
        courseButton.textContent = `${course.subject} ${course.number}`;
        courseButton.id = `course-${course.number}`;


        if (course.completed) {
            courseButton.classList.add('completed');
        } else {
            courseButton.classList.add('not-completed');
        }

     
        courseListContainer.appendChild(courseButton);
    });


    const totalCredits = filteredCourses.reduce((total, course) => total + course.credits, 0);
    totalCreditsElement.textContent = totalCredits; 
}


allCoursesButton.addEventListener('click', () => {
    const allCourses = courses;
    updateCourseList(allCourses);
});

cseCoursesButton.addEventListener('click', () => {
    const cseCourses = courses.filter(course => course.subject === 'CSE');
    updateCourseList(cseCourses);
});

wddCoursesButton.addEventListener('click', () => {
    const wddCourses = courses.filter(course => course.subject === 'WDD');
    updateCourseList(wddCourses);
});

updateCourseList(courses);
