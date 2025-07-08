const express=require('express')
const app=express()

app.use(express.urlencoded({extends:true}))
app.use(express.static('Public'))
app.set('view engine','ejs')

let Students=[];

app.get('/',(req,res)=>{
    res.render('index',{Students});
});
app.get('/add',(req,res)=>{
    res.render('add_student');
});
app.post('/Register',(req,res)=>{
    const Stud={
        id:Students.length+1,
        ...req.body
    };
    Students.push(Stud);
    res.redirect('/');
});
app.get('/delete/:id',(req,res)=>{
    const Id=parseInt(req.params.id);
    Students=Students.filter(s=>s.id!=Id);
    res.redirect('/');
});
app.get('/edit/:id',(req,res)=>{
    const st=Students.find(s=>s.id==parseInt(req.params.id));
    res.render('Edit',{st});
});
app.post('/update/:id',(req,res)=>{
    const id=parseInt(req.params.id);
    Students=Students.map(s=>s.id==id?{...s,...req.body}:s);
    res.redirect('/');
});
const PORT=3000;
app.listen(PORT,()=>{
 console.log(`Server running on http://localhost:${PORT}`);});

