exports.handler = async function (event) {
    console.log("Lambda invoked", event)
    return {
        statusCode: 200,
        body: JSON.stringify({message: "Hello from lambda"})
    }
}