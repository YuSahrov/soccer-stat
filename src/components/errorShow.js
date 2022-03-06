import React from 'react';

export default function ErrorShow(props) {
  let { messageError, errorCode } = props
  const errDesc = {
    400: "Не правильный запрос",
    401: "Не верный пароль",
    403: "Доступ ограничен",
    429: "Попробуйте обновить страницу через минуту",
    404: "Источник данных не найден"
  }
  let errorText = errDesc.hasOwnProperty(errorCode) ? errDesc[errorCode] : messageError;
  return (<div style={{ textAlign: "center" }}>
    <h1>Что-то пошло не так!</h1>
    <h3>{errorText}</h3>
  </div>);


}
