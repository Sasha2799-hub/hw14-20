function Student(name, surname, birthday) {
    this.name = name;
    this.surname = surname;
    this.birthday = birthday;
    this.grades = [];
    this.getPresence = [];

    this.present = function () {
        if (this.getPresence.length < 25) {
            this.getPresence.push(true);
        }
    }
    this.absent = function () {
        if (this.getPresence.length < 25) {
            this.getPresence.push(false);
        }
    }
    this.getAge = function () {
        const currentYear = new Date().getFullYear()
        return currentYear - this.birthday
    }
    this.averageGrade = function () {
        if (this.grades.length === 0) return 0;
        const sum = this.grades.reduce((acc, grade) => acc + grade, 0)
        return sum / this.grades.length;
    }
    this.summary = function () {
        const avgGrade = this.averageGrade();
        const attendance = this.getPresence.filter(presence => presence).length / this.getPresence.length

        if (avgGrade > 90 && attendance > 0.9) {
            return "Молодець!"
        } else if (avgGrade > 90 || attendance > 0.9) {
            return "Добре, але можна краще"
        } else {
            return "Редиска!"
        }
    }
}

const student1 = new Student('Igor', 'Ivanov', 2000);
student1.grades.push(95, 93, 97)
console.log(student1.getAge());          
console.log(student1.averageGrade());    
console.log(student1.summary());          

const student2 = new Student('Anna', 'Ivanova', 2002);
student2.grades.push(60, 75, 80);
for (let i = 0; i < 20; i++) student2.absent();
console.log(student2.summary());   
