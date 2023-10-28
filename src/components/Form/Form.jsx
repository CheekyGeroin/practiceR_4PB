import { useState } from 'react';
import { FormContainer, Label, Input, Button } from './Form.styled';

export const Form = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = e => {
    const { name, value } = e.currentTarget;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };
  const reset = () => {
    setName('');
    setNumber('');
  };

  const submitForm = e => {
    e.preventDefault();
    onSubmit(name, number);
    reset();
  };

  return (
    <FormContainer onSubmit={submitForm}>
      <Label>
        Name
        <Input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={handleChange}
          value={name}
        />
      </Label>
      <Label>
        Number
        <Input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={handleChange}
          value={number}
        />
      </Label>
      <Button type="submit">Add contact</Button>
    </FormContainer>
  );
};
// export class Form extends Component {
//   state = {
//     name: '',
//     number: '',
//   };
//   handleChange = e => {
//     const { name, value } = e.currentTarget;
//     this.setState({
//       [name]: value,
//     });
//   };
//   submitForm = e => {
//     e.preventDefault();

//     this.props.onSubmit(this.state);

//     this.reset();
//   };
//   reset = () => {
//     this.setState({
//       name: ' ',
//       number: ' ',
//     });
//   };
//   render() {
//     const { name, number } = this.state;
//
//   }
// }
