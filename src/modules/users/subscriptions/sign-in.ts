import { ContextGraphql } from "../../../model";
import { CONSTANTS  } from "../../../config";

const {PUB_SUB_VARS : {SIGNIN}} = CONSTANTS ; 

const signInSubscription =  {
  subscribe: (_: unknown, __: unknown, context: ContextGraphql) =>
  context.pubsub.asyncIterator(SIGNIN), 
}

export {signInSubscription} ; 