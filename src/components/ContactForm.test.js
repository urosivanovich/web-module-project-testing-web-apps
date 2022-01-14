import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';



const typeFirst = () => screen.getByLabelText(/first name*/i);
const typeLast = () => screen.getByLabelText(/last name*/i);
const typeEmail = () => screen.getByLabelText(/email*/i);
const typeMessage = () => screen.getByLabelText(/message/i);
const button = () => screen.getByRole('button')


const error = () => screen.getByTestId(/error/);
const errors = () => screen.getAllByTestId(/error/);

const firstDisplay = () => screen.queryByTestId(/firstnameDisplay/)
const lastDisplay = () => screen.queryByTestId(/lastnameDisplay/)
const emailDisplay = () => screen.queryByTestId(/emailDisplay/)
const messageDisplay = () => screen.queryByTestId(/messageDisplay/)

 



test('renders without errors', ()=>{
    render(<ContactForm />)
});

test('renders the contact form header', ()=> {
    render(<ContactForm />)
    const header = screen.queryByText(/contact form/i);
    expect(header).toBeInTheDocument();
    expect(header).toBeTruthy();
    expect(header).toHaveTextContent(/contact form/i);

});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />)
    userEvent.type(typeFirst(), 'Uros')
    expect(error()).toBeInTheDocument();    

});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />)
    userEvent.click(button());
    errors().forEach(item => {
        expect(item).toBeInTheDocument();
    })
    
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />)
    userEvent.type(typeFirst(), 'Bugsy')
    userEvent.type(typeLast(), 'Ivanovich')
    userEvent.click(button())
    expect(error()).toBeInTheDocument()
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />)
    userEvent.type(typeEmail(), 'asdfasd')
    expect(error()).toBeInTheDocument()
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />)
    userEvent.type(typeFirst(), 'Bugsy')
    userEvent.type(typeEmail(), 'bugsy123@hotmail.com')
    userEvent.click(button())
    expect(error()).toBeInTheDocument()
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm />)
    userEvent.type(typeFirst(), 'Bugsy')
    userEvent.type(typeLast(), 'Ivanovich')
    userEvent.type(typeEmail(), 'bugsy123@hotmail.com')
    userEvent.click(button())

    expect(firstDisplay()).toBeInTheDocument()
    expect(lastDisplay()).toBeInTheDocument()
    expect(emailDisplay()).toBeInTheDocument()
    expect(messageDisplay()).not.toBeInTheDocument()
    
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm />)
    userEvent.type(typeFirst(), 'Bugsy')
    userEvent.type(typeLast(), 'Ivanovich')
    userEvent.type(typeEmail(), 'bugsy123@hotmail.com')
    userEvent.type(typeMessage(), 'Boston Terrier')
    userEvent.click(button())

    expect(firstDisplay()).toBeInTheDocument()
    expect(lastDisplay()).toBeInTheDocument()
    expect(emailDisplay()).toBeInTheDocument()
    expect(messageDisplay()).toBeInTheDocument()
});