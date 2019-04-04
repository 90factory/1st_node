import axios from 'axios'

//const DOMAIN = '/api'
//const DOMAIN = 'https://localhost:3000'
const DOMAIN = 'https://192.168.1.9:3000'

const api = (method, url, data) => {
    return axios({
        method,
        url : DOMAIN + url,
        data
    }).then(result => result.data)
      
}

export const User = {

    fetch (petitionID) {
        return axios.get(DOMAIN+'/detail',{params : { petitionID : petitionID}})
    }
}
export const Register = {
    fetch (email,password,sex,age,area,nickname) {
        return axios.post(DOMAIN+'/register', {
            email : email,
            password : password,
            sex : sex,
            age : age,
            area : area,
            nickname : nickname
        })
    },
    fetchSns (email,type,sex,age,area,nickname) {
        return axios.post(DOMAIN+'/register/sns', {
            email : email,
            type : type,
            sex : sex,
            age : age,
            area : area,
            nickname : nickname
        })
    }
}
export const Login = {
    fetch (loginObj) {
        return axios.post(DOMAIN+'/login', {
            email : loginObj.email,
            password : loginObj.password
           })
    },
    getSnsMember (email) {
      
        return axios.get(DOMAIN+'/facebook/privateInfo',{params : { email : email}})
     
    },
    session () {
        return axios.get(DOMAIN+'/session')
    }
}

export const UserInfo = {
    fetch (email,nickname,Sex,Area,Age,password) {
        return axios.post(DOMAIN+'/revise', {
            email : email,
            nickname : nickname,
            sex : Sex,
            area : Area,
            age : Age,
            password : password
        })
    },
    revise (email,password) {
        return axios.post(DOMAIN+'/password',{
            email : email,
            password : password
        })
    },
    delete(email,password) {
        return axios.post(DOMAIN+'/delete',{
            email : email,
            password : password
        })
    },
    deleteSnsMember(email) {
        return axios.post(DOMAIN+'/delete/sns',{email : email})
    },
    addHistory(ID) {

        return axios.post(
            DOMAIN+'/history',
            {
            ID : ID,
            email : sessionStorage.getItem('email')
            })
    },
    getHistory() {
        return axios.get(DOMAIN+'/history',{
           params:{ email : sessionStorage.getItem('email')}
        })
    }
}

export const Petitions = {

    fetch () {
        
        return api('get','/petitions')
    },
    postRecommend(petitionID) {

        return axios.post(DOMAIN+'/recommend',{
            petitionID : petitionID,
            email : sessionStorage.getItem('email')
        })
    }
 
}

export const Search = {

    
    fetch (keyward) {
     
       return axios.get(DOMAIN+'/search',{params : { keyward : keyward}})
            
    }
}


export const Token = {
    
    getNewToken () {
        const refreshToken = sessionStorage.getItem('refresh-token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${refreshToken}`
        return axios.get(DOMAIN+'/refreshtoken')
    }
}


    
