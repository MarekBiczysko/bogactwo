import React, { Fragment } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class AddDataItemForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currency: '',
      value: 0,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.handleSave(this.state);

    //clear inputs
    this.setState({
      currency: '',
      value: 0,
    })
  };

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  };

  render() {
    return (
      <React.Fragment>
        <h3>Create new currency data item</h3>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label>Currency</Label>
            <Input onChange={this.handleInputChange} name={'currency'} type={'text'} value={this.state.currency}/>
          </FormGroup>
          <FormGroup>
            <Label>Value</Label>
            <Input onChange={this.handleInputChange} name={'value'} type={'number'} value={this.state.value}/>
          </FormGroup>
          <Button color={'success'}>Save</Button>
        </Form>
      </React.Fragment>
    )
  }
}

export default AddDataItemForm;