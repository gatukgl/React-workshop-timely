This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
### Get all tasks

**URL:** `http://ec2-13-250-104-160.ap-southeast-1.compute.amazonaws.com:8000/tasks`

**Method:** GET

**Response example:**

```json
[
  {
    "id": "1",
    "name": "Learn about React",
    "category": "Study",
    "started_at": "2020-05-04T10:14:35+07:00",
    "ended_at": "2020-05-04T13:14:35+07:00",
    "username": "yourusername"
  },
  {
    "id": "2",
    "name": "Go to gym",
    "category": "Workout",
    "started_at": "2020-05-04T12:14:35+07:00",
    "ended_at": "2020-05-04T13:14:35+07:00",
    "username": "yourusername"
  }
]
```

### Create a task

**URL:** `http://ec2-13-250-104-160.ap-southeast-1.compute.amazonaws.com:8000/tasks`

**Method:** POST

**Request payload**:

```json
{
  "id": "18",
  "name": "Attend yoga class",
  "category": "Workout",
  "started_at": "2020-05-03T07:10:35+07:00",
  "ended_at": "2020-05-03T08:10:35+07:00",
  "username": "yourusername"
}
```

**Response example:**

```json
{
  "id": "18",
  "name": "Attend yoga class",
  "category": "Workout",
  "started_at": "2020-05-03T07:10:35+07:00",
  "ended_at": "2020-05-03T08:10:35+07:00",
  "username": "yourusername"
}
```

### Remove a task

**URL:** `http://ec2-13-250-104-160.ap-southeast-1.compute.amazonaws.com:8000/tasks/<id>`

**Method:** DELETE
