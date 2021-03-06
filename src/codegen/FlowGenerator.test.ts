import * as fs from 'fs'
import * as path from 'path'
import { buildSchema } from 'graphql'
import { FlowGenerator } from './FlowGenerator'
import test from 'ava'

const typeDefs = fs.readFileSync(
  path.join(__dirname, '../../src/codegen/fixtures/schema.graphql'),
  'utf-8',
)
test('flow generator', t => {
  const schema = buildSchema(typeDefs)
  const generator = new FlowGenerator({
    schema,
    inputSchemaPath: 'src/schema.js',
    outputBindingPath: 'src/generated/binding.js',
    isDefaultExport: false,
  })
  const result = generator.render()
  t.snapshot(result)
})
