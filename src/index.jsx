/** @jsx createElement */
import {createElement, compile} from 'elliptical'
import {inspect} from 'util'

// Some data to work with
const countryData = [
  {text: "China (People's Republic of)", value: 'CN'},
  {text: 'Ireland', value: 'IE'},
  {text: 'Macedonia (the former Yugoslav Republic of)', value: 'MK'},
  {text: 'United Kingdom of Great Britain and Northern Ireland', value: 'IE'},
  {text: 'United States', value: 'US'}
]

// Define a Phrase
const Country = {
  describe () {
    return (
      <placeholder argument='Country'>
        <list items={countryData} strategy='fuzzy' />
      </placeholder>
    )
  }
}

// Build our grammar out of Elements
const grammar = (
  <sequence>
    <literal text='flights ' />
    <choice id='direction'>
      <literal text='from ' value='from' />
      <literal text='to ' value='to' />
    </choice>
    <Country id='country' />
  </sequence>
)

// Obtain a parse function from our grammar
console.log('Compiling!')
const parse = compile(grammar)

// Parse based upon a given query
console.log('Parsing!')
const outputs = parse('flights to irela')
console.log(inspect(outputs, {depth: 10}))

/*
[ { text: null,
    words:
     [ { text: 'flights ', input: true },
       { text: 'to ', input: true },
       { text: 'Irela', input: true },
       { text: 'nd', input: false } ],
    qualifiers: [],
    annotations: [],
    categories: [],
    arguments: [ { value: 'Country', start: 2, end: 4 } ],
    score: 1,
    result: { direction: 'to', country: 'IE' } },
  { text: null,
    words:
     [ { text: 'flights ', input: true },
       { text: 'to ', input: true },
       { text: 'United Kingdom of Great Britain and Northern ',
         input: false },
       { text: 'Irela', input: true },
       { text: 'nd', input: false } ],
    qualifiers: [],
    annotations: [],
    categories: [],
    arguments: [ { value: 'Country', start: 2, end: 5 } ],
    score: 0.5673076923076923,
    result: { direction: 'to', country: 'IE' } },
  { text: null,
    words:
     [ { text: 'flights ', input: true },
       { text: 'to ', input: true },
       { text: 'Macedon', input: false },
       { text: 'i', input: true },
       { text: 'a (the fo', input: false },
       { text: 'r', input: true },
       { text: 'm', input: false },
       { text: 'e', input: true },
       { text: 'r Yugos', input: false },
       { text: 'l', input: true },
       { text: 'a', input: true },
       { text: 'v Republic of)', input: false } ],
    qualifiers: [],
    annotations: [],
    categories: [],
    arguments: [ { value: 'Country', start: 2, end: 12 } ],
    score: 0.024999999999999998,
    result: { direction: 'to', country: 'MK' } } ]
*/