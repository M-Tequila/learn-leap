# TODO
- Agora LiveStream
- Paystack Integration
- Media files uploads and streaming
- OTP workflow
- Wallet system for instructors
- Documentation




# Project Overview


## Entities:

### Users:
This table stores information about all the users of the platform, including students, instructors, and administrators.
Fields: UserID (Primary Key), Username, Email, Password, Role (Student, Instructor, Admin), Profile information, etc.

### Courses:
This table contains information about the courses available on the platform.
Fields: CourseID (Primary Key), Title, Description, InstructorID (Foreign Key), Creation Date, etc.
### Enrollments:
This table tracks the enrollment of students in various courses.
Fields: EnrollmentID (Primary Key), CourseID (Foreign Key), StudentID (Foreign Key), Enrollment Date, etc.


### Chapters:
This table stores information about the lectures within each course (for live or recorded sessions).
Fields: LectureID (Primary Key), CourseID (Foreign Key), Title, Description, Date and Time, Video URL (if recorded), etc.

### Course Materials:
This table contains various materials associated with a course, such as lecture notes, presentations, etc.
Fields: MaterialID (Primary Key), CourseID (Foreign Key), Title, Description, File URL, Upload Date, etc.

### Assignments:
This table manages the assignments given to students in a course.
Fields: AssignmentID (Primary Key), CourseID (Foreign Key), Title, Description, Due Date, Max  Score, etc.

### Submissions:
This table stores the submissions made by students for their assignments.
Fields: SubmissionID (Primary Key), AssignmentID (Foreign Key), StudentID (Foreign Key), Submission Date, File URL, Score, Feedback, etc.

### Quizzes:
This table contains details about quizzes associated with courses.
Fields: QuizID (Primary Key), CourseID (Foreign Key), Title, Description, Time Limit, etc.

### Questions:
This table stores individual questions for quizzes.
Fields: QuestionID (Primary Key), QuizID (Foreign Key), Question Text, Options, Correct Answer, etc.


### Quiz Attempts:
This table tracks the attempts made by students in quizzes.
Fields: AttemptID (Primary Key), QuizID (Foreign Key), StudentID (Foreign Key), Attempt Date, Score, etc.


## Relationships:
- One user can have multiple enrollments in different courses.
- Each course is associated with one instructor, but an instructor can have multiple courses.
- Courses have multiple lectures and course materials.
- Each course can have multiple assignments and quiz sets.
- Students can submit multiple assignments.
- Each quiz can have multiple questions, and students can attempt quizzes multiple times.


