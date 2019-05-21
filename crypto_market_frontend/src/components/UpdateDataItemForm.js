import React, { Fragment } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class UpdateDataItemForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currency: this.props.item.currency,
      value: this.props.item.value,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.handleSave(this.props.item.id, this.state);
  };

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  };

  componentDidUpdate(prevProps) {
    if (prevProps.item !== this.props.item) {
      this.setState({currency: this.props.item.currency, value: this.props.item.value});
    }
  }

  render() {
    const item = this.props.item;

    return (
      <React.Fragment>
        <h3>{`Update currency data item with id: ${item.id}`}</h3>
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

export default UpdateDataItemForm;