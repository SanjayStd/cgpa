// Grade to value mapping
const gradeToValue = {
    O: 10,
    "A+": 9,
    A: 8,
    "B+": 7,
    B: 6,
    C: 5,
    P: 4,
    UA: 0,
};

// Credits mapping for each semester
const creditsMapping = {
    1: [3, 4, 3, 3, 3, 1, 2, 2, 1],
    2: [2, 4, 3, 3, 4, 1, 2, 2, 2],
    3: [4, 3, 3, 4, 3, 3, 2, 1, 2],
    4: [3, 4, 3, 3, 3, 2, 2, 2],
    5: [4, 3, 3, 3, 3, 1, 2],
    6: [4, 3, 3, 3, 3, 3, 2, 2],
    7: [3, 3, 2, 3, 3, 3, 3, 2, 1],
};

// Subjects with codes for each semester
const subjectsMapping = {
    1: [
        { name: "Professional English", code: "HS3152" },
        { name: "Matrices and Calculus", code: "MA3151" },
        { name: "Engineering Physics", code: "PH3151" },
        { name: "Engineering Chemistry", code: "CY3151" },
        { name: "Python Programming", code: "GE3151" },
        { name: "Heritage of Tamils", code: "GE3152" },
        { name: "Python Lab", code: "GE3171" },
        { name: "English Lab", code: "GE3172" },
        { name: "Physics & Chemistry Lab", code: "BS3171" },
    ],
    2: [
        { name: "Professional English-II", code: "HS3251" },
        { name: "Statistics & Numerical Methods", code: "MA3251" },
        { name: "Materials Science", code: "PH3251" },
        { name: "Basic Electrical & Electronics", code: "BE3251" },
        { name: "Engineering Graphics", code: "GE3251" },
        { name: "Tamils & Technology", code: "GE3252" },
        { name: "Engineering Practices Lab", code: "GE3271" },
        { name: "Communication Lab", code: "GE3272" },
        { name: "Electrical Lab", code: "BE3271" },
    ],
    3: [
        { name: "Transforms and Partial Differential Equations", code: "MA3351" },
        { name: "Engineering Mechanics", code: "ME3351" },
        { name: "Engineering Thermodynamics", code: "ME3391" },
        { name: "Fluid Mechanics and Machinery", code: "CE3391" },
        { name: "Engineering Materials and Metallurgy", code: "ME3392" },
        { name: "Manufacturing Processes", code: "ME3393" },
        { name: "CAD Drawing", code: "ME3381" },
        { name: "Professional Development", code: "GE3361" },
        { name: "Manufacturing Technology", code: "ME3382" },
    ],
    4: [
        { name: "Theory of Machines", code: "ME3491" },
        { name: "Thermal Engineering", code: "ME3451" },
        { name: "Hydraulics and Pneumatics", code: "ME3492" },
        { name: "Manufacturing Technology", code: "ME3493" },
        { name: "Strength of Materials", code: "CE3491" },
        { name: "Environmental Sciences and Sustainability", code: "GE3451" },
        { name: "Strength of Materials Lab", code: "CE3481" },
        { name: "Thermal Engineering Lab", code: "ME3461" },
    ],
    5: [
        { name: "Design of Machine Elements", code: "ME3591" },
        { name: "Metrology and Measurements", code: "ME3551" },
        { name: "Professional Elective I", code: "PE3511" },
        { name: "Professional Elective II", code: "PE3521" },
        { name: "Professional Elective III", code: "PE3531" },
        { name: "Summer Internship", code: "IN3511" },
        { name: "Metrology Lab", code: "ME3561" },
    ],
    6: [
        { name: "Heat and Mass Transfer", code: "ME3651" },
        { name: "Professional Elective IV", code: "PE3611" },
        { name: "Professional Elective V", code: "PE3621" },
        { name: "Professional Elective VI", code: "PE3631" },
        { name: "Open Elective I", code: "OE3611" },
        { name: "CAD/CAM Lab", code: "ME3661" },
        { name: "Heat Transfer Lab", code: "ME3662" },
    ],
    7: [
        { name: "Mechatronics and IoT", code: "ME3751" },
        { name: "Computer Integrated Manufacturing", code: "ME3752" },
        { name: "Human Values and Ethics", code: "HS3711" },
        { name: "Industrial Management", code: "ME3753" },
        { name: "Open Elective II", code: "OE3711" },
        { name: "Open Elective III", code: "OE3721" },
        { name: "Mechatronics Lab", code: "ME3761" },
        { name: "Summer Internship", code: "IN3711" },
    ],
};

const gradeInputsContainer = document.getElementById("grade-inputs");

// Dynamically generate inputs based on selected semester
document.getElementById("semester").addEventListener("change", function () {
    const semester = this.value;
    gradeInputsContainer.innerHTML = "";

    if (semester in subjectsMapping) {
        subjectsMapping[semester].forEach((subject, index) => {
            const label = document.createElement("label");
            label.textContent = `${subject.name} (${subject.code}, ${creditsMapping[semester][index]} credits): `;
            const input = document.createElement("input");
            input.type = "text";
            input.name = subject.code;
            input.placeholder = "Enter grade (O, A+, A, etc.)";
            gradeInputsContainer.appendChild(label);
            gradeInputsContainer.appendChild(input);
            gradeInputsContainer.appendChild(document.createElement("br"));
        });
    }
});

// Calculate CGPA
function calculateCGPA() {
    const semester = document.getElementById("semester").value;

    if (!semester || semester === "0") {
        document.getElementById("result").textContent = "Please select a valid semester.";
        return;
    }

    const inputs = gradeInputsContainer.querySelectorAll("input");
    const credits = creditsMapping[semester];
    let totalPoints = 0;
    let totalCredits = 0;

    inputs.forEach((input, index) => {
        const grade = input.value.trim().toUpperCase();
        if (grade in gradeToValue) {
            const gradeValue = gradeToValue[grade];
            totalPoints += gradeValue * credits[index];
            totalCredits += credits[index];
        }
    });

    const cgpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : 0;
    document.getElementById("result").textContent = `Your CGPA is: ${cgpa}`;
}
