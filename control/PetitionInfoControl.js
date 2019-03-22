const SearchResult = require('../model/SearchResult')
const usersQuery = require("../model/usersQuery");
const request = require('request');
const querystring = require('querystring');
const ubuntuUrl = 'http://192.168.1.5:8000'
const testUrl = 'http://192.168.1.6:8000'
 class DetailInfo {
    constructor(){

    }
    getPetition(req,res){
        request({
            url : ubuntuUrl + '/apis/entire',
            json : true,
            
        }, (error,response, body)=>{
            const PetitionData = body
         
            res.status(200).json(PetitionData)
        })
        //let data = [ ] 
        //data.push(SearchResult)
        //res.status(200).json(data)
    }
    getSearch(req,res){
        request.get({
            url : ubuntuUrl+'/apis/keyword',
            qs : req.query,
            json : true
        }, (error,response, body)=>{
            const PetitionData = body
           
            res.status(200).json([PetitionData])
            
        })
        //let data = [] 
        //data.push(SearchResult)
        //res.status(200).json(data)
    }
    postHistory(req,res){
        const petitionId = req.body.ID
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
                    //let testID = ['214435','314212','19313','531647','294032']
                    console.log(recentPageID)
                    request.get({
                        url : ubuntuUrl +'/apis/history',
                        qs : recentPageID,
                        json : true
                    }, (error,response, body)=>{
                        const PetitionData = body
                        res.status(200).json(PetitionData)
                        if(error){
                            res.status(401).json({message : "Error"})
                        }
                    })   
                  })
                 
    }
    postRecommend(req,res) {
        const petitionId = req.body.petitionID
        const userEmail = req.body.email
        console.log(petitionId)
        usersQuery.postRecommend(userEmail,petitionId)
    }

}

module.exports = DetailInfo
