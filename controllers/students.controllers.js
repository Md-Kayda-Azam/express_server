const fs = require('fs');
const path = require('path');


/// studemts data model
const students = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/student.json')).toString());


/// students latest id 

const getLatestID = () => {

    if( students.length > 0){
        return students[students.length -1].id + 1;
    }else{
     return 1;
    }
}

/// Get All Students
const getAllStudents = (req, res) => {
    
    if( students.length > 0 ){
        res.status(200).json(students);
    }else{
       res.status(404).json({
        MSG : "Students data not found"
       })
    }
   

}


const getSingleStudents = (req, res) => {

    let id = req.params.id;

    if( students.some(data => data.id == id) ){
        res.status(200).json(students.find(data => data.id == id));
    }else{
        res.status(200).json({
            MSG : "This students data not found"
        });
    }


}
const CreateStudents = (req, res) => {


    if( req.body.name != '' ||  req.body.age != '' ||  req.body.skill != '' ){
        students.push({
            id : getLatestID(), 
            name : req.body.name,
            age : req.body.age,
            skill : req.body.skill
        });
    
        fs.writeFileSync(path.join(__dirname, '../data/student.json'), JSON.stringify(students));
    
        res.status(400).json({
            MSG : "Students Data Created success"
        })
    }else{

    }
    

}

const getUpdateStudents = (req, res) => {

    let id = req.params.id;

    if( !students.some(data => data.id == id ) ){
        res.status(404).json({
            MSG : "Data not found"
        })
    }

    if( req.body.name == '' ||  req.body.age == '' ||  req.body.skill == ''){
        res.status(400).json({
            MSG : "Field must not be empty"
        })
    }else{
        students[students.findIndex(data => data.id == id)] ={
            id : id,
            name : req.body.name,
            age : req.body.age,
            skill : req.body.skill,
        }
        
        
        fs.writeFileSync(path.join(__dirname, '../data/student.json'), JSON.stringify(students));
        res.status(201).json({
            MSG : "Students data Updated"
        })

    }

   

}

const getDelteStudents = (req, res) => {

 let id = req.params.id;

 if( students.some( data => data.id == id)){

    let updated_data = students.filter( data => data.id != id);

    fs.writeFileSync(path.join(__dirname, '../data/student.json'), JSON.stringify(updated_data));
    res.status(201).json({
        MSG : "Students data deleted"
    })

 }else{
    res.status(400).json({
        MSG : "Students not found"
    })
 }

   

}

module.exports = {
    getAllStudents,
    getSingleStudents,
    CreateStudents,
    getUpdateStudents,
    getDelteStudents
}