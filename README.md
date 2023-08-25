[![readme_header](https://github.com/muhammad-avicena/profile/assets/49929404/b7b89034-8e25-4f25-a1a2-5665aa66448c)](https://avicena.dev/)

<h1 align="center">Fancy to see you here <img src="https://raw.githubusercontent.com/muhammad-avicena/profile/master/wave.gif" width="30px" height="30px" /> </h1>

hi, I'm Muhammad Avicena. In this repo, I build The Financial Tracker application implemented role-based access using Node.js, Express.js, OpenAPI specification, Jest and Swagger. It's designed to help users manage and track their transfer request.

I am committed to staying up-to-date with industry trends and using the latest tools to develop innovative solutions that surpass expectations.
Interested to have collaboration ? Find me on:

[![Linkedin Badge](https://img.shields.io/badge/-Muhammad_Avicena-blue?style=flat-square&logo=Linkedin&logoColor=white)](https://www.linkedin.com/in/muhammad-avicena/)
[![Youtube Badge](https://img.shields.io/badge/-Muhammad_Avicena-darkred?style=flat-square&logo=youtube&logoColor=white)](https://www.youtube.com/@MuhammadAvicena)
[![Instagram Badge](https://img.shields.io/badge/-ryuhideaki.dev-purple?style=flat-square&logo=instagram&logoColor=white)](https://www.instagram.com/ryuhideaki.dev/)
[![Gmail Badge](https://img.shields.io/badge/-cenarahmant.dev@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white)](mailto:cenarahmant.dev@gmail.com)

## INGREDIENTS I USE 📜
- Node.js & Express.js
- OpenAPI Spec
- Jest 
- Swagger UI
## KEY FEATURES 🌟

- Auth 
    - Login (JWT Auth) -> return a token for authorization
    - Register 
- Transfer 
    - Create a transfer -> require user authentication
    - Get list of all transfer -> require user authentication
    - Get transfer by ID -> require user authentication
    - Update transfer status -> require approver/admin role
- History
    - Get history transfer by querry -> require admin role
    - Delete history transfer -> require admin role
- User
    - Get list of all user -> require admin role

**Available Account** :
```
{
  "username": "avicena.dev",
  "password": "avicena2023"

  "role": "admin"
}
```
```
{
  "username": "avicena.user",
  "password": "avicena2023"

  "role": "maker"
}
```

## AVAILABLE API 📰

**Back-end endpoint:** [https://transfer-api.avicena.dev](https://transfer-api.avicena.dev) 
 
| Name  | HTTP Method | Endpoint | Requirements
| ----------- | ----------- | ----------- | ----------- |
| **Login User** | `POST` | [/api/v1/auth/login](https://transfer-api.api.avicena.dev/api/v1/auth/login) | Request Body: `username: string, password: string`
| **Register User** | `POST` | [/api/v1/auth/register](https://transfer-api.api.avicena.dev/api/auth/login) | Request Body: `username: string, password: string, role: string`
| **List All User** | `GET` | [/api/v1/users](https://transfer-api.api.avicena.dev/)
| **List All Transfer** | `GET` | [/api/v1/transfers](https://transfer-api.avicena.dev/api/transaction)
| **List Transfer by ID** | `GET` | [/api/v1/transfer/:id](https://transfer-api.avicena.dev/api/user/1) | Request Params: `id: number`
| **Create Transfer** | `POST` | [/api/v1/transfer](https://transfer-api.avicena.dev/api/transaction) | Request Body: `bank: string, amount: number, toUser: string, desc: string`
| **Update Transfer Status by ID** | `PATCH` | [/api/v1/transfer/:id](https://transfer-api.avicena.dev/api/transaction/1) | Request Body: `status: string`
| **Find History Transfer by querry** | `GET` | [/api/v1/transfer](https://transfer-api.avicena.dev/api/transaction) | Request Body: `startDate: string, endDate: string, status: string, status: string` -> could find by multiple status
| **Delete Transfer by ID** | `DELETE` | [/api/v1/transfer/:id](https://transfer-api.avicena.dev/api/transaction/1) | Request Params: `id: number`


## DEPLOYMENT ⚙️

The project has been successfully deployed using Netlify. You can access the production version of the website by following this link: [https://transfer-api.avicena.dev](https://transfer-api.avicena.dev).

Feel free to explore the website and try out the different features. I appreciate any feedback and suggestions to further improve the user experience.
