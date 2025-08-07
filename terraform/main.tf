#Creates the lambda function and uploads the zip package
resource "aws_lambda_function" "example" {
  function_name = "lambda-from-terraform"
  filename = "../src/job/lambda.zip"
  handler = "index.handler"
  runtime = "nodejs20.x"
  role = aws_iam_role.lambda_exec.arn
}

#Define IAM role Lambda assume to execute code
resource "aws_iam_role" "lambda_exec" {
  name = "lambda_exec_role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
        {
            Effect = "Allow",
            Principal = {
                Service = "lambda.amazonaws.com" 
            },
            Action = "sts:AssumeRole"
        }
    ]
    })
}

#Attach a policy to the Lambda role
resource "aws_iam_role_policy_attachment" "lambda_loggin" {
  role = aws_iam_role.lambda_exec.name
  policy_arn =  "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}
