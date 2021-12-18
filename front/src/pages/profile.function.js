import React, { useState, useEffect } from "react";
import bookService from "../services/book.service";

const [books, setBooks] = useState([]);

const retrieveBooks = () => {
    bookService.getAll()
        .then(response => {
            setBooks(response.data);
            // console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
};

useEffect(() => {
    retrieveBooks();
}, []);

const getBook = (id) => {
    let title = "";
    for(let i = 0; i < books.length; i++){
        if(books[i].id === id){
            title = books[i].title;
            break
        }
    }
    return title
};

const KST = (utc) => {
    const KST = new Date(utc);

    let year = KST.getFullYear();
    let month = ('0' + (KST.getMonth() + 1)).slice(-2);
    let day = ('0' + KST.getDate()).slice(-2);
    let dateString = year + '년' + month  + '월' + day +"일 ";
    let hours = ('0' + KST.getHours()).slice(-2);
    let minutes = ('0' + KST.getMinutes()).slice(-2);
    let seconds = ('0' + KST.getSeconds()).slice(-2);
    let timeString = hours + '시' + minutes  + '분' + seconds + "초";

    return dateString + timeString;
};