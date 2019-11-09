const path = require('path')
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geo');
const forecast = require('./utils/forecast')

const app = express();
const port = process.env.PORT || 3000

const publicDirPath = path.join(__dirname,'../public')
const viewsPath =(path.join(__dirname,'../templates/views'))

const partialsPath = path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')

app.set('views', viewsPath)

hbs.registerPartials(partialsPath)


app.use(express.static(publicDirPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Ishkhan'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me ',
        name:'Vazgen'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        name:'Ishkhan',
        title:'Help me',
        name:'Bardugimeos'
    })
})


app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"you most provide search"
        })
    }
    geocode(req.query.address,(error,{lat,long,location}={})=>{
        if (error){
         return   res.send({error})
        }
        forecast(lat,long,(error,foreCastData)=>{
         if(error){
             return res.send({error})
         }
    
         res.send({
            forecast:foreCastData.forecast,
            location:foreCastData.timezone,
            address:req.query.address
        })
        })

    })
})

app.get('/products',(req,res)=>{

    if(!req.query.search){
        return res.send({
            error:"you most provide search"
        })
    }

    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('help404',{
        name:'Babo'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        name:'Vrdo'
    })
})


app.listen(port,()=>{
    console.log('Server started!!!' + port)
})