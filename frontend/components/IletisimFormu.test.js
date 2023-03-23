import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import IletisimFormu from './IletisimFormu';


test('hata olmadan render ediliyor', () => {
    render(<IletisimFormu/>);
});

test('iletişim formu headerı render ediliyor', () => {
    render(<IletisimFormu/>);
    const headerForm = screen.getByTestId('header-h1');
    expect(headerForm).toBeInTheDocument();
});

test('kullanıcı adını 5 karakterden az girdiğinde BİR hata mesajı render ediyor.', async () => {
    render(<IletisimFormu/>);
    const isimInput = screen.getByTestId('input-name');
    userEvent.type(isimInput, 'fat');
    const errorMessage = await screen.findByTestId('error');
    expect(errorMessage).toBeInTheDocument();
});

test('kullanıcı inputları doldurmadığında ÜÇ hata mesajı render ediliyor.', async () => {
    render(<IletisimFormu/>);
    const buttonForm = screen.getByTestId('submit');
    userEvent.click(buttonForm);
    const errorMessages = await screen.findAllByTestId('error');
    expect(errorMessages.length).toBe(3);

});

test('kullanıcı doğru ad ve soyad girdiğinde ama email girmediğinde BİR hata mesajı render ediliyor.', async () => {
    render(<IletisimFormu />);
    const isimInput = screen.getByTestId('input-name');
    const soyisimInput = screen.getByTestId('input-surname');
    const buttonForm = screen.getByTestId('submit')
    userEvent.type(isimInput,'Fatih');
    userEvent.type(soyisimInput,'Erik');
    userEvent.click(buttonForm);
    await waitFor(() => {
        expect(screen.getByTestId('error')).toHaveTextContent('Hata: email geçerli bir email adresi olmalıdır.');
      });

});

test('geçersiz bir mail girildiğinde "email geçerli bir email adresi olmalıdır." hata mesajı render ediliyor', async () => {
    render(<IletisimFormu />);
const isimInput = screen.getByTestId('input-name')
const soyisimInput = screen.getByTestId('input-surname')
const emailInput = screen.getByTestId('input-email')
const buttonForm = screen.getByTestId('submit')
userEvent.type(isimInput,'Fatih')
userEvent.type(soyisimInput,'Erik')
userEvent.type(emailInput,'mfefundamentals')
userEvent.click(buttonForm)

await waitFor(() => {
    expect(screen.getByTestId('error')).toHaveTextContent('Hata: email geçerli bir email adresi olmalıdır.')
})

});

test('soyad girilmeden gönderilirse "soyad gereklidir." mesajı render ediliyor', async () => {
    render(<IletisimFormu />);
    const isimInput = screen.getByTestId('input-name')
    const emailInput = screen.getByTestId('input-email')
    const buttonForm = screen.getByTestId('submit')
    userEvent.type(isimInput,"Eylül")
    userEvent.type(emailInput,'mfefundamentals@gmail.com')
    userEvent.click(buttonForm)

    const errors = await screen.findAllByTestId("error");
    expect(errors).toHaveLength(1);
});

test('ad,soyad, email render ediliyor. mesaj bölümü doldurulmadığında hata mesajı render edilmiyor.', async () => {
    render(<IletisimFormu />);
    const isimInput = screen.getByTestId('input-name')
    const soyisimInput = screen.getByTestId('input-surname')
    const emailInput = screen.getByTestId('input-email')
    const buttonForm = screen.getByTestId('submit')
    userEvent.type(isimInput,"Eylül")
    userEvent.type(soyisimInput,"Ekim")
    userEvent.type(emailInput,'mfefundamentals@gmail.com')
    userEvent.click(buttonForm)

    const errors = screen.queryAllByTestId("error");
    expect(errors).toHaveLength(0);


});

test('form gönderildiğinde girilen tüm değerler render ediliyor.', async () => {
    render(<IletisimFormu />);
    const isimInput = await screen.findByTestId("input-name");
    userEvent.type(isimInput, "Ilhan");
    const soyisimInput = await screen.findByTestId("input-surname");
    userEvent.type(soyisimInput, "Mansiz");
    const emailInput = await screen.findByTestId("input-email");
    userEvent.type(emailInput, "yuzyilingolcusu@hotmail.com");
    const messageInput = await screen.findByTestId("input-message");
    userEvent.type(messageInput, "En buyuk golcu benim");
    const submitButton = await screen.findByRole("button", "submit");
    userEvent.click(submitButton);
    expect(screen.getByTestId("firstnameDisplay")).toHaveTextContent("Ilhan");
    expect(screen.getByTestId("lastnameDisplay")).toHaveTextContent("Mansiz");
    expect(screen.getByTestId("emailDisplay")).toHaveTextContent(
      "yuzyilingolcusu@hotmail.com"
    );
    expect(screen.getByTestId("messageDisplay")).toHaveTextContent(
      "En buyuk golcu benim"
    );
  
});
