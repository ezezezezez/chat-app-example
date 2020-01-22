
import { SchemaDirectiveVisitor } from 'apollo-server-express'
import { defaultFieldResolver } from 'graphql'
import { ensureSignedOut } from '../auth'

class GuestDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition (field) {
    const { resolve = defaultFieldResolver } = field

    field.resolve = function (root, args, context, info) {
      ensureSignedOut(context.req)

      return resolve.apply(this, [root, args, context, info])
    }
  }
}

export default GuestDirective
