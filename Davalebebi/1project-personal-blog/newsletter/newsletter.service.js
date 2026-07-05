const newsletterModel = require("./newsletter.model.js")

exports.subscribeWithEmail = async (email) => {
    const existingSubscription = await newsletterModel.findOne({email})
    if(existingSubscription){
        if(existingSubscription.isSubscribed === false){
            existingSubscription.isSubscribed = true
            await existingSubscription.save()
            return existingSubscription
        }
        return "ALREADY_SUBSCRIBED"
    }

    const newSubscription = await newsletterModel.create({email})
    return newSubscription
}

exports.UnSubscribeWithEmail = async (email) => {
    const subscription = await newsletterModel.findOne({email})

    if(!subscription){
        return "NOT_FOUND"
    }
    if(!subscription.isSubscribed){
        return "ALREADY_UNSUBSCRIBED"
    }

    subscription.isSubscribed = false
    await subscription.save()
    return subscription
}