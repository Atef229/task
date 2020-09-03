import React from 'react';
import { Card,Container,Row,Col,Form ,Button} from 'react-bootstrap';
import {Input} from 'reactstrap';
import {connect} from 'react-redux';
import Header from '../../../containers/DefaultLayout/DefaultHeader';
import {AppHeader} from '@coreui/react';
import axios from 'axios';
import PropTypes from 'prop-types'


class UserProfile extends React.Component {
    constructor(props){
        super(props);
        this.state={
            Image: '',
            errors: {}
        }

        //this.onSubmit = this.onSubmit.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onChange = this.onChange.bind(this);
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
          this.setState({ errors: nextProps.errors });
        }
    
        // if (nextProps.profile.profile) {
        //   const profile = nextProps.profile.profile;
        //   this.setState({
        //     Image: profile.Image
        //   });
          
        // }
        }
    
      onChangeHandler=event=>{
        this.setState({
          Image: event.target.files[0],
          loaded: 0,
        })
      }
    onChange(e) {
        this.setState({ [e.target.files]: e.target.value });
        console.log(e.target.files);
        axios.put(`/api/user/uploadphoto/${e.target.value}`)
        .then(res => {
          this.setState({
            Image:res.data
          });
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        })
        console.log(e.target.value);
      }

render(){

    const { isAuthenticated, user } = this.props.auth;

    var style = {
        marginTop:"150px"
      }

    return (
        <div>
        <AppHeader> 
         <Header />
      </AppHeader> 
      <div>
        <Container>
        <Row className="justify-content-center">

        <Col md="5">
            <Card className="mx-4" style={style}>
            <Card.Header>
            <h2>User Profile</h2>
            </Card.Header>
    <Col xs={6} md={4}>
      <Card.Img variant="top" src={this.state.Image} onChange={this.onChangeHandler} roundedCircle   />
      <Input 
        type="file"  
        name="Image" 
         onChange={this.onChangeHandler}
        />
    </Col>
    <Card.Body>
      
      <Form.Label><div><h2>Name: {user.name}</h2></div></Form.Label>
      <br></br>
      <Form.Label><h3>Description: {user.description}</h3></Form.Label>
      
    </Card.Body>
  </Card>
   </Col>

       </Row>
        </Container>
        </div>
        </div>
    )
}
}

const mapStatetoProps=(state)=>{
    return{
    //     user_id:state.user.userDetails.userid,
    //     username:state.user.userDetails.username,
    //    email:state.user.email,
    //    profileImage: state.user.profileImage,
    //    msg:state.user.msg,
       auth: state.auth,
       image: PropTypes.string
    }
   }
   
   

   export default connect(mapStatetoProps)(UserProfile);
   //export default UserProfile;