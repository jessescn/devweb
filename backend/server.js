const app = require('./src/config/custom-express')

app.listen(8080, () => {
  console.log('Server is listening on port 8080')
})