import { SchemaDirectiveVisitor } from 'apollo-server-express'
import { defaultFieldResolver } from 'graphql'
import { ensureSignedIn } from '../auth'

class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition (field) {
    const { resolve = defaultFieldResolver } = field

    field.resolve = function (root, args, context, info) {
      ensureSignedIn(context.req)

      return resolve.apply(this, [root, args, context, info])
    }
  }
}

export default AuthDirective
