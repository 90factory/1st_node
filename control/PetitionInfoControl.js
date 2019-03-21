const SearchResult = require('../model/SearchResult')
const usersQuery = require("../model/usersQuery");
const request = require('request');
const querystring = require('querystring');

 class DetailInfo {
    constructor(){

    }
    getPetition(req,res){
        request({
            url : 'http://192.168.1.2:8000/apis/entire',
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
            url : 'http://192.168.1.2:8000/apis/keyword',
            qs : req.query,
            json : true
        }, (error,response, body)=>{
            const PetitionData = body
           
            //res.status(200).json([PetitionData])
            
        })
        let data = [] 
        data.push(SearchResult)
        res.status(200).json(data)
    }
    postHistory(req,res){
        const petitionId = req.body.petitionID
        const userEmail = req.body.email
        usersQuery.addHistory(userEmail,petitionId)
                  .then(() => {res.status(200).json({})})
                  .catch(() =>{res.status(401).json({})})
                  
    }
    getHistory(req,res){
        const email = req.query.email
        usersQuery.findHistory(email)
                  .then((data) => {
                    
                    const historyInfo = data[0]
                    let temp = []

                    historyInfo.forEach(data => {
                        temp.push(data.DocumentID)
                    })
                    
                    let idList = temp.reduce((a,b) => {
                        if( a.indexOf(b) < 0){
                            a.push(b)
                        }
                        return a;
                    },[])
                   
                    return idList
                  })
                  .then((data) => {
                    
                    let recentPageID = []
                    let lastIndex = data.length - 1;
                    for(let i = lastIndex; i >lastIndex-5 ;i-- ){
                        recentPageID.push(data[i])
                    }
                    
                    request.get({
                        url : 'http://192.168.1.2:8000/apis/history',
                        qs : recentPageID,
                        json : true
                    }, (error,response, body)=>{
                        const PetitionData = body
                        res.status(200).json([PetitionData])
                    })   
                  })
                 
    }
    postRecommend(req,res) {
        const petitionId = req.body.petitionID
        const userEmail = req.body.email
        usersQuery.postRecommend(userEmail,petitionId)
    }

}

module.exports = DetailInfo
