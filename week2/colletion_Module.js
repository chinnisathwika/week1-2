/* 

Project story:
-------------
“We are building the data engine of an online learning platform(like Udemy / Coursera / company LMS).Frontend and backend will later consume THIS logic.”

Data setup:
-----------
const users = [
  { id: 1, name: "Ravi", role: "student", active: true },
  { id: 2, name: "Anil", role: "admin", active: true },
  { id: 3, name: "Suman", role: "student", active: false }
];

const courses = [
  { id: 101, title: "JavaScript", price: 999, published: true },
  { id: 102, title: "React", price: 1499, published: false },
  { id: 103, title: "Node", price: 1299, published: true }
];

const cart = [
  { courseId: 101, qty: 1 },
  { courseId: 103, qty: 2 }
];

const roles = {
  admin: ["create", "update", "delete", "view"],
  student: ["view"]
};


TASKS
------
MODULE-1 :USER PROCESSING ENGINE
  -> Get only active users
  -> Extract names of active users
  -> Check if any admin exists
  -> Find user by id
  -> Deactivate a user immutably



MODULE 2: COURSE CATALOG ENGINE
  -> Get published courses
  -> Sort courses by price (high → low)
  -> Extract { title, price } only
  -> Calculate total value of published courses
  -> Add a new course immutably



MODULE 3: SHOPPING CART ENGINE 
  -> Merge cart with courses to get full course info
  -> Calculate total cart amount
  -> Increase quantity of a course (immutably)
  -> Remove a course from cart
  -> Check if all cart items are paid courses


  
MODULE 4: ROLE & PERMISSION ENGINE
  -> Get all role names
  -> Check if student can delete
  -> Create a flat list of all unique permissions
  -> Add new role moderator immutably

*/


const users = [
  { id: 1, name: "Ravi", role: "student", active: true },
  { id: 2, name: "Anil", role: "admin", active: true },
  { id: 3, name: "Suman", role: "student", active: false }
];

const courses = [
  { id: 101, title: "JavaScript", price: 999, published: true },
  { id: 102, title: "React", price: 1499, published: false },
  { id: 103, title: "Node", price: 1299, published: true }
];

const cart = [
  { courseId: 101, qty: 1 },
  { courseId: 103, qty: 2 }
];

const roles = {
  admin: ["create", "update", "delete", "view"],
  student: ["view"]
};

export { users, courses, cart, roles };


/*module1*/
import { users } from './master_Project_on_Collections.js'

/* 

MODULE-1 :USER PROCESSING ENGINE
  -> Get only active users
  -> Extract names of active users
  -> Check if any admin exists
  -> Find user by id
  -> Deactivate a user immutably

*/


function getActiveUsers() {
    return users.filter(user => user.active);
}

function namesOfActiveUsers() {
    let activeUsers = getActiveUsers();
    return activeUsers.map(user => user.name);
}

function getAdmins() {
    return users.filter(user => user.role === 'admin');
}

function getUserById(id) {
    if(id >= users.length) {
        return "Invalid Id";
    }
    return users.find(user => user.id === id);
}

function deactivateUser(id) {
    if(id >= users.length) {
        return "Invalid Id";
    }

    users.find(user => user.id === id).active = false;
    return "Deactivated user successfully";
}

export { getActiveUsers, namesOfActiveUsers, getAdmins, getUserById, deactivateUser };

/*module2*/
import { courses } from "./master_Project_on_Collections.js";

/* 

MODULE 2: COURSE CATALOG ENGINE
  -> Get published courses
  -> Sort courses by price (high → low)
  -> Extract { title, price } only
  -> Calculate total value of published courses
  -> Add a new course immutably

*/

function getPublishedCourses() {
    return courses.filter(course => course.published);
}

function sortCourses() {
    courses.sort((a, b) => b.price - a.price);
    return courses;
}

function extractTitleAndPrice() {
    return courses.map(course => {
        return { title: course.title, price: course.price };
    });
}

function totalValueOfPublishedCourses() {
    let publishedCourses = getPublishedCourses();
    return publishedCourses.reduce((total, course) => total + course.price, 0);
}

function addNewCourse(newCourse) {
    courses.push(newCourse);
    return "Added course successfully";
}

export { getPublishedCourses, sortCourses, extractTitleAndPrice, totalValueOfPublishedCourses, addNewCourse };

/*module3*/
import { cart } from "./master_Project_on_Collections.js";

/* 

MODULE 3: SHOPPING CART ENGINE 
  -> Merge cart with courses to get full course info
  -> Calculate total cart amount
  -> Increase quantity of a course (immutably)
  -> Remove a course from cart
  -> Check if all cart items are paid courses


*/

function mergeCartWithCourses(courses) {
    return cart.map(cartItem => {
        let course = courses.find(course => course.id === cartItem.courseId);
        return { ...cartItem, courseTitle: course.title, coursePrice: course.price, paid: course.paid };
    });
}

function totalCartAmount(courses) {
    let mergedCart = mergeCartWithCourses(courses);
    return mergedCart.reduce((total, item) => total + (item.coursePrice * item.quantity), 0);
}

function increaseCourseQuantity(courseId) {
    let cartItem = cart.find(item => item.courseId === courseId);
    if (!cartItem) {
        return "Course not found in cart";
    }
    cartItem.quantity += 1;
    return "Increased quantity successfully";
}

function removeCourseFromCart(courseId) {
    let index = cart.findIndex(item => item.courseId === courseId);
    if (index === -1) {
        return "Course not found in cart";
    }
    cart.splice(index, 1);
    return "Removed course from cart successfully";
}

function areAllCartItemsPaid(courses) {
    let mergedCart = mergeCartWithCourses(courses);
    return mergedCart.every(item => item.paid);
}

export { mergeCartWithCourses, totalCartAmount, increaseCourseQuantity, removeCourseFromCart, areAllCartItemsPaid };

/*module4*/
import { roles } from "./master_Project_on_Collections.js";

/* 

MODULE 4: ROLE & PERMISSION ENGINE
  -> Get all role names
  -> Check if student can delete
  -> Create a flat list of all unique permissions
  -> Add new role moderator immutably

*/


function getAllRoleNames() {
    return Object.keys(roles);
}

function canStudentDelete() {
    return roles.student.includes("delete");
}

function getAllUniquePermissions() {
    let allPermissions = Object.values(roles).flat();
    return [...new Set(allPermissions)];
}

function addModeratorRole() {
    roles.moderator = ["update", "view"];
    return "Added moderator role successfully";
}

export { getAllRoleNames, canStudentDelete, getAllUniquePermissions, addModeratorRole };