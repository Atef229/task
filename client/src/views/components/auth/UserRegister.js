import React, { Component } from 'react';
import {Label, FormGroup, FormFeedback, Button, Card, CardBody, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUsers } from '../../actions/authActions';
import Header from '../../../containers/DefaultLayout/DefaultHeader';
import {
  AppHeader,
  AppBreadcrumb2 as AppBreadcrumb,
  AppSidebarNav2 as AppSidebarNav,
} from '@coreui/react';

class Register extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: '',
      description: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }


  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password,
      name: this.state.name,
      description: this.state.description
    };
this.props.registerUsers(userData, this.props.history);

}


  render() {
    const { errors } = this.state;

    var style = {
      marginTop:"250px"
    }

    return (
      <div>
      <AppHeader fixed> 
       <Header />
    </AppHeader>
      <div className="align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="5">
              <Card className="mx-4" style={style}>
                <CardBody className="p-4">
                  <Form noValidate onSubmit={this.onSubmit}>
                   
                    <h4 className="text">Create User Account</h4>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input 
                     type="text" 
                     placeholder="email"
                     name="email" 
                     value={this.state.email}
                     onChange={this.onChange}
                     invalid={errors.email}
                     valid={this.state.email}
                        />
                        <FormFeedback>{errors.email}</FormFeedback>
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input 
                     type="password" 
                     placeholder="Password"
                     name="password" 
                     value={this.state.password}
                     onChange={this.onChange}
                     invalid={errors.password}
                     valid={this.state.password}
                        />
                        <FormFeedback>{errors.password}</FormFeedback>
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input 
                     type="text" 
                     placeholder="name"
                     name="name" 
                     value={this.state.name}
                     onChange={this.onChange}
                     invalid={errors.name}
                     valid={this.state.name}
                        />
                        <FormFeedback>{errors.name}</FormFeedback>
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                        <i className="cil-script"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                    <Input 
                     type="textarea" 
                     placeholder="Description"
                     name="description" 
                     value={this.state.description}
                     onChange={this.onChange}
                     invalid={errors.description}
                     valid={this.state.description}
                        />
                    <FormFeedback>{errors.description}</FormFeedback>
                    </InputGroup>
                <Button type="submit" color="success" block >Create Account</Button>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUsers: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { registerUsers })(withRouter(Register));