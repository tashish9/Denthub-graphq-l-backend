import { signInSubscription } from "./sign-in";

const usersSubscriptionsResolver = {
  Subscription: {
    signIn: signInSubscription 
  },
}

export {usersSubscriptionsResolver} ; 