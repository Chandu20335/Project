import React, {  useState } from 'react'
import './App.css'

const App = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [courseType, setCourseType] = useState('');
  const [courseCategory, setCourseCategory] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [students, setStudents] = useState([]);
  const [existingCourses, setExistingCourses] = useState([
    { id: 1, name: 'Hindi', type: 'Individual' },
    { id: 2, name: 'English', type: 'Group' },
    { id: 3, name: 'Urdu', type: 'Special' },
   
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [editCourseId, setEditCourseId] = useState(null);
  const [editedCourseName, setEditedCourseName] = useState('');
  const [editedCourseType, setEditedCourseType] = useState('');
  const handSubmit=(e)=>{
    e.preventDefault();
    if(!name||!email||!age||!courseType||!courseCategory||!selectedCourse)
    {
      alert("Please fill the registration form")
      return;
    }
  
  const newStudent={name,age,courseType,courseCategory,selectedCourse}
    setStudents([...students,newStudent])
    setName('')
    setEmail('')
    setSelectedCourse('')
    setAge('')
    setCourseCategory('')
    setCourseType('')
    
  };
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditCourseId(null);
    setEditedCourseName('');
    setEditedCourseType('');
  };

  const handleditCourse=(courseId)=>{
    const courseToEdit=existingCourses.find((course)=>course.id===courseId)
    if(courseToEdit){
      setEditedCourseName(courseToEdit.name)
      setEditedCourseType(courseToEdit.Type)
      setEditCourseId(courseToEdit.courseId)
      setIsEditing(true)
    }

  }
  const handleSaveCourse=()=>{
    const updatedCourse=existingCourses.map((course)=>{
      if(course.id===editCourseId){
        return { ...course, name: editedCourseName, type: editedCourseType };

      }
      return course;
    })
    setExistingCourses(updatedCourse);
    setIsEditing(false);
    setEditCourseId(null);
    setEditedCourseName('');
    setEditedCourseType('');
  }
  const handleDeleteCourse = (courseId) => {
    const updatedCourses = existingCourses.filter((course) => course.id !== courseId);
    setExistingCourses(updatedCourses);
  };

  const filteredCourses = existingCourses.filter((course) => course.type === courseCategory);

  return (
    <div className="App">
    <h1>Student Registration</h1>

    {/* Registration Form */}
    <form onSubmit={handSubmit}>
      <div>
        <label>Student Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter student name"
        />
      </div>
      <div>
        <label>Age:</label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Enter student age"
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter student email"
        />
      </div>
      <div>
        <label>Course Type:</label>
        <select
          value={courseType}
          onChange={(e) => setCourseType(e.target.value)}
        >
          <option value="">Select Course Type</option>
          <option value="Full-Time">Full-Time</option>
          <option value="Part-Time">Part-Time</option>
          <option value="Online">Online</option>
          <option value="Distance Learning">Distance Learning</option>
          <option value="Specialization">Specialization</option>
        </select>
      </div>

      <div>
        <label>Course Category:</label>
        <select
          value={courseCategory}
          onChange={(e) => setCourseCategory(e.target.value)}
        >
          <option value="">Select Course Category</option>
          <option value="Individual">Individual</option>
          <option value="Group">Group</option>
        </select>
      </div>

      {courseCategory && (
        <div>
          <label>Select Existing Course:</label>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
          >
            <option value="">Select a course</option>
            {filteredCourses.map((course) => (
              <option key={course.id} value={course.name}>
                {course.name}
              </option>
            ))}
          </select>
        </div>
      )}

      <button type="submit">Register Student</button>
    </form>

    <h2>Registered Students</h2>
    <ul>
      {students.map((student, index) => (
        <li key={index}>
          {student.name} - {student.age} years old - {student.email} - 
          {student.courseType} - {student.courseCategory} - {student.selectedCourse}
        </li>
      ))}
    </ul>

    <h2>Existing Courses</h2>
    <ul>
      {existingCourses.map((course) => (
        <li key={course.id}>
          {isEditing && editCourseId === course.id ? (
            <div>
              <input
                type="text"
                value={editedCourseName}
                onChange={(e) => setEditedCourseName(e.target.value)}
              />
              <select
                value={editedCourseType}
                onChange={(e) => setEditedCourseType(e.target.value)}
              >
                <option value="Individual">Individual</option>
                <option value="Group">Group</option>
              </select>
              <button onClick={handleSaveCourse}>Save</button>
              <button onClick={handleCancelEdit}>Cancel</button>
            </div>
          ) : (
            <div>
              {course.name} - {course.type}
              <button onClick={() => handleditCourse(course.id)}>Edit</button>
              <button onClick={() => handleDeleteCourse(course.id)}>Delete</button>
            </div>
          )}
        </li>
      ))}
    </ul>
    </div>
  )
}
export default App