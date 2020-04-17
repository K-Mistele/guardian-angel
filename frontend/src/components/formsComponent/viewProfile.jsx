import React from 'react';
import parseJwt from '../parsejwt';
import axios from 'axios';

class ViewProfile extends React.Component {

    config = {
        headers: {
            Authorization: 'Bearer '
        }
    }

    state = {

    }

    async createAuthToken() {
        var profileToken = await localStorage.getItem('bearer_token');
        console.log('|' + profileToken + '|');
        this.config.headers.Authorization = this.config.headers.Authorization.concat(profileToken);
    }

    async componentDidMount() {
        //decode id token
        await this.createAuthToken();
        console.log("Created token");
        var token = this.config.headers.Authorization.substring(7); //substring 7 to remove "Bearer " from token
        //get details from decoding id token
        var params = parseJwt(token);
        console.log(JSON.stringify(this.config));
        await axios.get(`http://localhost:8000/api/private/users/${params.id}`, this.config)
        .then((res) => {
            console.log(res);
            this.setState(res.data);
        })
        .catch((e) => {
            alert(e + ": Error, you don't have a profile yet!")
        //otherwise (error) display a "you don't have a profile yet"
        })
    }

    render() {
    
        return <>
        <div className="container-fluid">
            {/*Why is profile classes not working?*/}
            <div className="card">
                <h3 className="btn-light">My Profile:</h3>
                <div className="card-body">
                    <img className="img-fluid float-left rounded" src={this.state.img_url} height="100" width="100"></img>
                     <div className="badge badge-primary">{this.state.firstname + this.state.lastname + "(" + 
                    (this.state.roleid==1 ? "Admin" : "Reporter") +")"} </div>
                    <button className="btn btn-secondary">Edit Profile</button>
                </div>
            </div>
            <div className="clearfix"></div>
            <div className="card-footer"></div>

        </div>
        {/*edit button --> editprofile view */}
        </>

    }

    componentWillUnmount() {
        this.setState({email: '', firstname: '', lastname: '', id: '', img_url: '', roleid: ''})
    }

}

export default ViewProfile;