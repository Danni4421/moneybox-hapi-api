# Moneybox

Moneybox merupakan RESTful API yang berguna untuk mencatat riwayat menabung mandiri sehingga dapat terstruktur dengan baik dalam tempat yang tepat.

## API Reference

#### Create Users

```http
  POST /users
```

| Payload     | Description                                                 |
| :---------- | :---------------------------------------------------------- |
| `username`  | **Required**. Type String                                   |
| `firstName` | **Required**. Type String                                   |
| `lastName`  | **Required**. Type String, _"Optional you can add or not"_  |
| `password`  | **Required**. Type String, **min**: 8 **max**: 20 character |
| `email`     | **Required**. Type String with valid email format           |
| `address`   | **Required**. Type String                                   |

#### Delete Users

```http
  DELETE /users/{id}
```

| Parameter | Type     | Description                    |
| :-------- | :------- | :----------------------------- |
| `id`      | `string` | **Required**. UserId from User |

_note: you will get your id when you have created user_

#### Savings

```http
  POST /save/{userId}
```

| Payload      | Description               |
| :----------- | :------------------------ |
| `balance`    | **Required**. Type Number |
| `savingGoal` | **Required**. Type String |
| `target`     | **Required**. Type Date   |

#### Add Balance

```http
  PUT /save/{mbId}
```

| Payload  | Description               |
| :------- | :------------------------ |
| `amount` | **Required**. Type Number |

_note: add amount of your money that you want to save_

#### Delete Saving

```http
  DELETE /save/{mbId}
```

#### Export Saving Details

```http
  POST /export/save/{mbId}
```

---

## Postman Unit Test

- ### Collection

  <a id="raw-url" href="./unit_test/Moneybox API Test.postman_collection.json" download>Download Moneybox Postman Collection Test here</a>

- ### Environment

  <a id="raw-url" href="./unit_test/Moneybox API.postman_environment.json" download>Download Moneybox Postman Environment Test here</a>
