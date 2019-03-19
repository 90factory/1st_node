const SearchResult = require('../model/SearchResult')
const request = require('request');

 class DetailInfo {
    constructor(){

    }
    getPetition(req,res){
        request({
            url : 'http://192.168.1.8:8000/apis/entire',
            json : true,
            
        }, (error,response, body)=>{
            const PetitionData = body
         
            //res.status(200).json(PetitionData)
        })
        let data = [ ] 
        data.push(SearchResult)
        res.status(200).json(data)
    }
    getSearch(req,res){
        request.get({
            url : 'http://192.168.1.8:8000/apis/keyword',
            qs : req.query,
            json : true
        }, (error,response, body)=>{
            const PetitionData = body
           
            //res.status(200).json(PetitionData)
            
        })
        let data = [] 
        data.push(SearchResult)
        res.status(200).json(data)
    }

}

module.exports = DetailInfo
/*
exports.getPetition =(req,res) => {
    

    request({
        url : 'http://192.168.1.8:8000/apis/entire',
        json : true,
        
    }, (error,response, body)=>{
        const PetitionData = body
     
        //res.status(200).json(PetitionData)
    })
    let data = [] 
    data.push(SearchResult)
    res.status(200).json(data)
}
exports.getSearch = (req,res) => {
    
    request.get({
        url : 'http://192.168.1.8:8000/apis/keyword',
        qs : req.query,
        json : true
    }, (error,response, body)=>{
        const PetitionData = body
       
        //res.status(200).json(PetitionData)
        
    })
    let data = [] 
    data.push(SearchResult)
    res.status(200).json(data)
}*/