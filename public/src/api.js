import axios from 'axios'


const DOMAIN = 'http://192.168.1.4:3000'
const api = (method, url, data) => {
    return axios({
        method,
        url : DOMAIN + url,
        data
    }).then(result => result.data)
      
}

export const User = {

    fetch () {
        return axios.get('http://192.168.1.4:3000/detail')
    }
}
export const Register = {
    fetch (email,password,sex,age,area,nickname) {
        return axios.post('http://192.168.1.4:3000/register', {
            email : email,
            password : password,
            sex : sex,
            age : age,
            area : area,
            nickname : nickname
        })
    }
}
export const Login = {
    fetch (loginObj) {
        return axios.post('http://192.168.1.4:3000/login', {
            email : loginObj.email,
            password : loginObj.password
           })
    }
}

export const UserInfo = {
    fetch (email,nickname,Sex,Area,Age,password) {
        return axios.post('http://192.168.1.4:3000/revise', {
            email : email,
            nickname : nickname,
            sex : Sex,
            area : Area,
            age : Age,
            password : password
        })
    },
    revise (email,password) {
        return axios.post('http://192.168.1.4:3000/password',{
            email : email,
            password : password
        })
    },
    delete(email,password) {
        return axios.post('http:///192.168.1.4:3000/delete',{
            email : email,
            password : password
        })
    }
}

export const Petitions = {

    fetch () {
        
        return api('get','/petitions')
    }
 
}

export const Search = {

    
    fetch (keyward) {
     
       return axios.get(DOMAIN+'/search',{params : { keyward : keyward}})
            
    }
}


export const Token = {
    
    getNewToken () {
        const refreshToken = localStorage.getItem('refresh-token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${refreshToken}`
        return axios.get('http://192.168.1.4:3000/refreshtoken')
    }
}