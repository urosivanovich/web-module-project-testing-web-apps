import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { getByRole, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';


// const typeFirst  = () =>  screen.getByLabelText(/first name*/i);
// const typeLast = () => screen.getByLabelText(/last name*/i);
// const typeEmail = () => screen.getByLabelText(/email*/i);
// const typeMessage = () => screen.getByLabelText(/message/i);
// const button = () => screen.getByRole('button')


// const error = () => screen.getByTestId(/error/);
// const errors = () => screen.getAllByTestId(/error/);

// const firstDisplay = () => screen.queryByTestId(/firstnameDisplay/)
// const lastDisplay = () => screen.queryByTestId(/lastnameDisplay/)
// const emailDisplay = () => screen.queryByTestId(/emailDisplay/)
// const messageDisplay = () => screen.queryByTestId(/messageDisplay/)

 



// test('renders without errors', ()=>{
//     render(<ContactForm />)
// });

// test('renders the contact form header', ()=> {
//     render(<ContactForm />)
//     const header = screen.queryByText(/contact form/i);
//     expect(header).toBeInTheDocument();
//     expect(header).toBeTruthy();
//     expect(header).toHaveTextContent(/contact form/i);

// });

// test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
//     render(<ContactForm />)
//     userEvent.type(typeFirst(), 'Uros')
//     expect(error()).toBeInTheDocument();    

// });

// test('renders THREE error messages if user enters no values into any fields.', async () => {
//     render(<ContactForm />)
//     userEvent.click(button());
//     errors().forEach(item => {
//         expect(item).toBeInTheDocument();
//     })
    
// });

// test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
//     render(<ContactForm />)
//     userEvent.type(typeFirst(), 'Bugsy')
//     userEvent.type(typeLast(), 'Ivanovich')
//     userEvent.click(button())
//     expect(error()).toBeInTheDocument()
// });

// test('renders "email must be a valid email address" if an invalid email is entered', async () => {
//     render(<ContactForm />)
//     userEvent.type(typeEmail(), 'asdfasd')
//     expect(error()).toBeInTheDocument()
// });

// test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
//     render(<ContactForm />)
//     userEvent.type(typeFirst(), 'Bugsy')
//     userEvent.type(typeEmail(), 'bugsy123@hotmail.com')
//     userEvent.click(button())
//     expect(error()).toBeInTheDocument()
// });

// test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
//     render(<ContactForm />)
//     userEvent.type(typeFirst(), 'Bugsy')
//     userEvent.type(typeLast(), 'Ivanovich')
//     userEvent.type(typeEmail(), 'bugsy123@hotmail.com')
//     userEvent.click(button())

//     expect(firstDisplay()).toBeInTheDocument()
//     expect(lastDisplay()).toBeInTheDocument()
//     expect(emailDisplay()).toBeInTheDocument()
//     expect(messageDisplay()).not.toBeInTheDocument()
    
// });

// test('renders all fields text when all fields are submitted.', async () => {
//     render(<ContactForm />)
//     userEvent.type(typeFirst(), 'Bugsy')
//     userEvent.type(typeLast(), 'Ivanovich')
//     userEvent.type(typeEmail(), 'bugsy123@hotmail.com')
//     userEvent.type(typeMessage(), 'Boston Terrier')
//     userEvent.click(button())

//     expect(firstDisplay()).toBeInTheDocument()
//     expect(lastDisplay()).toBeInTheDocument()
//     expect(emailDisplay()).toBeInTheDocument()
//     expect(messageDisplay()).toBeInTheDocument()
// });

test('renders without errors', () => {
    render(<ContactForm />)
});

test('render the contact form header', () => {
    render(<ContactForm />)
    const header = screen.queryByText(/contact form/i);
    expect(header).toBeInTheDocument();
    expect(header).toBeTruthy();
    expect(header).toHaveTextContent(/contact form/i);

});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />)
    
    const firstType = screen.getByLabelText(/first name*/i);
    userEvent.type(firstType, '123');

    const errorMessages = await screen.findAllByTestId('error');
    expect(errorMessages).toHaveLength(1);
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />);

    const button = screen.getByRole('button');
    userEvent.click(button);

    await waitFor(() => {
        const errorMessages = screen.queryAllByTestId('error');
        expect(errorMessages).toHaveLength(3);
    })
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />)

    const firstType = screen.getByLabelText(/first name*/i)
    userEvent.type(firstType, 'Bugsy');

    const lastType = screen.getByLabelText(/last name*/i)
    userEvent.type(lastType, 'Bugs');

    const button = screen.getByRole('button');
    userEvent.click(button);

    const errorMessages = await screen.getAllByTestId('error')
    expect(errorMessages).toHaveLength(1)



});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />)

    const emailType = screen.getByLabelText(/email*/i)
    userEvent.type(emailType, 'bugsy123@hotmail')

    const errorMessages = await screen.findByText(/email must be a valid email address/i);
    expect(errorMessages).toBeInTheDocument();

});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />)

    const button = screen.getByRole('button')
    userEvent.click(button);

    const errorMessages = await screen.findByText(/lastName is a required field/i);
    expect(errorMessages).toBeInTheDocument()

});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm />)

    const typeFirst = screen.getByLabelText(/first name*/i)
    const typeLast = screen.getByLabelText(/last name*/i)
    const typeEmail = screen.getByLabelText(/email*/i)

    userEvent.type(typeFirst, 'Bugsy')
    userEvent.type(typeLast, 'Bugs')
    userEvent.type(typeEmail, 'bugsy123@hotmail.com')

    const button = screen.getByRole('button')
    userEvent.click(button)

    await waitFor(() => {

        const firstDisplay = screen.queryByText('Bugsy')
        const lastDisplay = screen.queryByText('Bugs')
        const emailDisplay =  screen.queryByText('bugsy123@hotmail.com')
        const messageDisplay = screen.queryByTestId('messageDisplay')

        expect(firstDisplay).toBeInTheDocument()
        expect(lastDisplay).toBeInTheDocument()
        expect(emailDisplay).toBeInTheDocument()
        expect(messageDisplay).not.toBeInTheDocument()
    })
});

test('render all fields text when all fields are submitted.', async () => {
    render(<ContactForm />)

    const typeFirst = screen.getByLabelText(/first name*/i)
    const typeLast = screen.getByLabelText(/last name*/i)
    const typeEmail = screen.getByLabelText(/email*/i)
    const typeMessage = screen.getByLabelText(/message/i)

    userEvent.type(typeFirst, 'Bugsy')
    userEvent.type(typeLast, 'Bugs')
    userEvent.type(typeEmail, 'bugsy123@hotmail.com')
    userEvent.type(typeMessage, 'Boston Terrier')

    const button = screen.getByRole('button')
    userEvent.click(button)

    await waitFor(() => {

        const firstDisplay = screen.queryByText('Bugsy')
        const lastDisplay = screen.queryByText('Bugs')
        const emailDisplay =  screen.queryByText('bugsy123@hotmail.com')
        const messageDisplay = screen.queryByText('Boston Terrier')

        expect(firstDisplay).toBeInTheDocument()
        expect(lastDisplay).toBeInTheDocument()
        expect(emailDisplay).toBeInTheDocument()
        expect(messageDisplay).toBeInTheDocument()
    })
})