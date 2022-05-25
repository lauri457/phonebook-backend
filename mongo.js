const mongoose = require('mongoose')

if (process.argv.length < 3) {
	console.log('please provide the password as an argument: node mongo.js <password>')
	process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.mygro.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
	name: String,
	number: String
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
	name: process.argv[3],
	number: process.argv[4]
})

if (process.argv.length === 5) {
	person.save().then(() => {
		console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
		mongoose.connection.close()
	})
}

else if (process.argv.length === 3) {
	Person.find({}).then(result => {
		console.log('phonebook:')
		result.forEach(person => {
			console.log(person.name, person.number)
		})
		mongoose.connection.close()
	})
}
else {
	console.log('provide correct amount of arguments')
	mongoose.connection.close()
}